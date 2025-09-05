# Solana Swap dApp

A modern decentralized application (dApp) for token swapping on the Solana blockchain using the Jupiter DEX aggregator.

## Features

- 🔄 Real-time token swaps with Jupiter aggregator
- 👛 Support for multiple Solana wallets (Phantom, Solflare)
- 🛡️ Secure transaction signing and validation
- 📊 Live price quotes and slippage calculations
- 🎨 Modern, responsive UI
- ⚙️ Environment-based configuration

## Supported Tokens

- SOL (So11111111111111111111111111111111111111112)
- USDC (EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v)
- USDT (Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB)
- RAY (4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R)
- BONK (DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263)

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- A Solana wallet (Phantom or Solflare recommended)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd solana-swap-dapp
```

2. Install dependencies:
```bash
npm install
```

3. Environment Configuration:
```bash
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`:
```env
# Solana Network (mainnet-beta, devnet, testnet)
SOLANA_NETWORK=mainnet-beta

# Jupiter API Configuration
JUPITER_API_BASE=https://quote-api.jup.ag/v6
JUPITER_SLIPPAGE_BPS=50

# Application Settings
NODE_ENV=development
```

### Running the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `SOLANA_NETWORK` | Solana network to connect to | mainnet-beta |
| `JUPITER_API_BASE` | Jupiter aggregator API endpoint | https://quote-api.jup.ag/v6 |
| `JUPITER_SLIPPAGE_BPS` | Default slippage tolerance in basis points | 50 |
| `NODE_ENV` | Application environment | development |

## Project Structure

```
├── components/          # React components
│   ├── SwapWidget.tsx   # Main swap interface
│   └── ...
├── lib/                 # Utility libraries
│   ├── jupiter.ts       # Jupiter API service
│   ├── config.ts        # Configuration management
│   └── ...
├── hooks/               # Custom React hooks
│   ├── useJupiter.tsx   # Jupiter integration hook
│   └── ...
├── pages/               # Next.js pages
│   ├── _app.tsx         # App wrapper with wallet providers
│   ├── index.tsx        # Main page
│   └── ...
├── styles/              # Global styles
└── public/              # Static assets
```

## Security Features

- 🔐 **Wallet Security**: Private keys never leave the browser
- 🛡️ **Environment Validation**: Configuration validation on startup
- 🚫 **XSS Protection**: Content Security Policy headers
- 🔒 **Request Validation**: Secure API interactions
- 🧩 **Non-custodial**: DeFi principles - you control your funds

## Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Type checking and linting
npm run lint
```

## Testing

### Unit Tests
```bash
npm run test
```

### Integration Tests
Test wallet connection and swap flows in the browser.

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository
2. Add environment variables in Vercel dashboard
3. Deploy automatically

### Other Platforms

Make sure to:
- Set all environment variables
- Use a production RPC endpoint
- Enable HTTPS

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This application is for educational purposes. Always verify transactions before signing, and never share your private keys. Crypto investments carry risk.