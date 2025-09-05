import type { NextPage } from 'next'

const Home: NextPage = () => {
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
          <button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home