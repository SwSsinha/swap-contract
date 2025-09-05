import { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { VersionedTransaction } from '@solana/web3.js';
import { jupiterService, JupiterQuote, JupiterSwapResponse } from '../lib/jupiter';

export function useJupiter() {
  const { connection } = useConnection();
  const { publicKey, signTransaction } = useWallet();
  const [quote, setQuote] = useState<JupiterQuote | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getQuote = async (
    inputMint: string,
    outputMint: string,
    amount: string,
    slippageBps: number = 50
  ) => {
    try {
      setLoading(true);
      setError(null);
      const quoteResponse = await jupiterService.getQuote(
        inputMint,
        outputMint,
        amount,
        slippageBps
      );
      setQuote(quoteResponse);
      return quoteResponse;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch quote');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const executeSwap = async (quoteResponse: JupiterQuote): Promise<string | null> => {
    if (!publicKey || !signTransaction) {
      setError('Wallet not connected');
      return null;
    }

    try {
      setLoading(true);
      setError(null);

      // Get swap transaction from Jupiter
      const swapResponse: JupiterSwapResponse = await jupiterService.createSwapTransaction(
        quoteResponse,
        publicKey.toString()
      );

      // Decode and sign the transaction
      const swapTransactionBuf = Buffer.from(swapResponse.swapTransaction, 'base64');
      const transaction = VersionedTransaction.deserialize(swapTransactionBuf);

      const latestBlockHash = await connection.getLatestBlockhash();
      const txid = await connection.sendRawTransaction(transaction.serialize(), {
        skipPreflight: true,
        maxRetries: 2,
      });

      await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: txid,
      });

      return txid;
    } catch (err: any) {
      setError(err.message || 'Swap execution failed');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    quote,
    loading,
    error,
    getQuote,
    executeSwap,
  };
}