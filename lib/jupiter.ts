import axios from 'axios';

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

const JUPITER_API_BASE = 'https://quote-api.jup.ag/v6';

export const jupiterService = {
  /**
   * Fetch swap quote from Jupiter
   */
  async getQuote(
    inputMint: string,
    outputMint: string,
    amount: string,
    slippageBps: number = 50
  ): Promise<JupiterQuote> {
    const response = await axios.get(`${JUPITER_API_BASE}/quote`, {
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
    const response = await axios.post(`${JUPITER_API_BASE}/swap`, {
      quoteResponse,
      userPublicKey,
      wrapAndUnwrapSol,
      feeAccount,
    });

    return response.data as JupiterSwapResponse;
  },
};