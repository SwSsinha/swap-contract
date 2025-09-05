import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useJupiter } from '../hooks/useJupiter';
import { config } from '../lib/config';

const TOKEN_LIST = config.app.supportedTokens;

const SwapWidget: React.FC = () => {
  const { publicKey } = useWallet();
  const { quote, loading, error, getQuote, executeSwap } = useJupiter();

  const [inputMint, setInputMint] = useState('So11111111111111111111111111111111111111112'); // SOL
  const [outputMint, setOutputMint] = useState('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'); // USDC
  const [amount, setAmount] = useState('1000000'); // 0.001 SOL

  const handleGetQuote = async () => {
    if (inputMint && outputMint && amount) {
      await getQuote(inputMint, outputMint, amount);
    }
  };

  const handleSwap = async () => {
    if (quote) {
      const txid = await executeSwap(quote);
      if (txid) {
        alert(`Swap successful! Transaction: ${txid}`);
      }
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '20px auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Jupiter Swap</h2>

      <div style={{ marginBottom: '15px' }}>
        <label>Input Token:</label>
        <select
          value={inputMint}
          onChange={(e) => setInputMint(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            marginTop: '5px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px'
          }}
        >
          {TOKEN_LIST.map((token) => (
            <option key={token.mint} value={token.mint}>
              {token.symbol}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Output Token:</label>
        <select
          value={outputMint}
          onChange={(e) => setOutputMint(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            marginTop: '5px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px'
          }}
        >
          {TOKEN_LIST.map((token) => (
            <option key={token.mint} value={token.mint}>
              {token.symbol}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Amount (lamports):</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            marginTop: '5px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <button
          onClick={handleGetQuote}
          disabled={loading || !publicKey}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Loading...' : 'Get Quote'}
        </button>
      </div>

      {quote && (
        <div style={{
          marginBottom: '15px',
          padding: '10px',
          backgroundColor: '#f8f9fa',
          borderRadius: '4px'
        }}>
          <p>Expected Output: {quote.otherAmountThreshold}</p>
          <p>Price Impact: {Math.round(parseFloat(quote.priceImpactPct) * 10000) / 100}%</p>
          <p>Slippage: {(quote.slippageBps / 100).toFixed(2)}%</p>
        </div>
      )}

      {quote && (
        <button
          onClick={handleSwap}
          disabled={loading || !publicKey}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: loading ? '#ccc' : '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px'
          }}
        >
          {loading ? 'Executing Swap...' : 'Execute Swap'}
        </button>
      )}

      {error && (
        <div style={{
          marginTop: '15px',
          padding: '10px',
          backgroundColor: '#f8d7da',
          color: '#721c24',
          borderRadius: '4px'
        }}>
          Error: {error}
        </div>
      )}

      {!publicKey && (
        <div style={{
          marginTop: '15px',
          padding: '10px',
          backgroundColor: '#fff3cd',
          color: '#856404',
          borderRadius: '4px'
        }}>
          Please connect your wallet to continue.
        </div>
      )}
    </div>
  );
};

export default SwapWidget;