import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  const { publicKey } = useWallet()

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Solana Swap dApp
          </div>
          <p className="mt-2 text-gray-500">
            Connect your wallet and start swapping tokens
          </p>
          <div className="mt-4">
            <WalletMultiButton />
          </div>
          {publicKey && (
            <p className="mt-4 text-sm text-gray-600">
              Connected: {publicKey.toBase58().slice(0, 8)}...
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home