// Centralized configuration with type safety
export interface AppConfig {
  solana: {
    network: 'mainnet-beta' | 'devnet' | 'testnet'
    rpcUrl: string
  }
  jupiter: {
    apiBase: string
    defaultSlippageBps: number
  }
  app: {
    environment: 'development' | 'production' | 'test'
    supportedTokens: Array<{ symbol: string; mint: string }>
  }
}

// Default configuration
const defaultConfig: AppConfig = {
  solana: {
    network: 'mainnet-beta',
    rpcUrl: 'https://api.mainnet-beta.solana.com',
  },
  jupiter: {
    apiBase: 'https://quote-api.jup.ag/v6',
    defaultSlippageBps: 50,
  },
  app: {
    environment: 'development',
    supportedTokens: [
      { symbol: 'SOL', mint: 'So11111111111111111111111111111111111111112' },
      { symbol: 'USDC', mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v' },
      { symbol: 'USDT', mint: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB' },
      { symbol: 'RAY', mint: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R' },
      { symbol: 'BONK', mint: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263' },
    ],
  },
}

// Load configuration from environment variables
export const config: AppConfig = {
  solana: {
    network: (process.env.SOLANA_NETWORK as AppConfig['solana']['network']) || defaultConfig.solana.network,
    rpcUrl:
      process.env.SOLANA_NETWORK === 'devnet'
        ? 'https://api.devnet.solana.com'
        : process.env.SOLANA_NETWORK === 'testnet'
        ? 'https://api.testnet.solana.com'
        : 'https://api.mainnet-beta.solana.com',
  },
  jupiter: {
    apiBase: process.env.JUPITER_API_BASE || defaultConfig.jupiter.apiBase,
    defaultSlippageBps: parseInt(process.env.JUPITER_SLIPPAGE_BPS || '') || defaultConfig.jupiter.defaultSlippageBps,
  },
  app: {
    environment: (process.env.NODE_ENV as AppConfig['app']['environment']) || defaultConfig.app.environment,
    supportedTokens: defaultConfig.app.supportedTokens,
  },
};

// Validation
export function validateConfig(): string[] {
  const errors: string[] = []

  if (!config.solana.network) {
    errors.push('SOLANA_NETWORK is required')
  }

  if (!config.jupiter.apiBase) {
    errors.push('JUPITER_API_BASE is required')
  }

  if (!config.jupiter.defaultSlippageBps || config.jupiter.defaultSlippageBps < 0 || config.jupiter.defaultSlippageBps > 10000) {
    errors.push('JUPITER_SLIPPAGE_BPS must be between 0 and 10000')
  }

  return errors
}

export default config