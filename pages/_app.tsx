import '../styles/globals.css'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import { useMemo } from 'react'
import type { AppProps } from 'next/app'
import { config } from '../lib/config'

// Removed conflicting Tailwind import for now

function MyApp({ Component, pageProps }: AppProps) {
  const network = (config.solana.network === 'devnet' ? WalletAdapterNetwork.Devnet :
                   config.solana.network === 'testnet' ? WalletAdapterNetwork.Testnet :
                   WalletAdapterNetwork.Mainnet)
  const endpoint = useMemo(() => config.solana.rpcUrl, [])

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    [network]
  )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Component {...pageProps} />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default MyApp