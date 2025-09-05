import axios from 'axios';
import { config } from './config';

export interface JupiterQuote {
  inputMint: string;
  outputMint: string;
  amount: string;
  otherAmountThreshold: string;
  swapMode: string;
  slippageBps: number;
  platformFee?: {
    fee: number;
    feeBps: number;
  };
  priceImpactPct: string;
  routePlan: any[];
  contextSlot: number;
  timeTaken: number;
}

export interface JupiterSwapResponse {
  swapTransaction: string;
}

const API_BASE = config.jupiter.apiBase;
const DEFAULT_SLIPPAGE = config.jupiter.defaultSlippageBps;

export const jupiterService = {
  /**
   * Fetch swap quote from Jupiter
   */
  async getQuote(
    inputMint: string,
    outputMint: string,
    amount: string,
    slippageBps: number = DEFAULT_SLIPPAGE
  ): Promise<JupiterQuote> {
    const response = await axios.get(`${API_BASE}/quote`, {
      params: {
        inputMint,
        outputMint,
        amount,
        slippageBps,
      },
    });

    return response.data as JupiterQuote;
  },

  /**
   * Create swap transaction from quote
   */
  async createSwapTransaction(
    quoteResponse: JupiterQuote,
    userPublicKey: string,
    wrapAndUnwrapSol: boolean = true,
    feeAccount?: string
  ): Promise<JupiterSwapResponse> {
    const response = await axios.post(`${API_BASE}/swap`, {
      quoteResponse,
      userPublicKey,
      wrapAndUnwrapSol,
      feeAccount,
    });

    return response.data as JupiterSwapResponse;
  },
};