import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import type { NextPage } from 'next'
import SwapWidget from '../components/SwapWidget'

const Home: NextPage = () => {
  const { publicKey } = useWallet()

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px'
    }}>
      {/* Header with wallet connection */}
      <div style={{
        maxWidth: '400px',
        marginBottom: '20px',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h1 style={{
          margin: '0 0 10px 0',
          color: '#4CAF50',
          fontSize: '24px'
        }}>Solana Swap dApp</h1>
        <p style={{ margin: '0 0 20px 0', color: '#666' }}>
          Connect your wallet and start swapping tokens using Jupiter
        </p>
        <div style={{ margin: '10px 0' }}>
          <WalletMultiButton />
        </div>
        {publicKey && (
          <p style={{
            margin: '10px 0 0 0',
            color: '#666',
            fontSize: '14px'
          }}>
            Connected: {publicKey.toBase58().slice(0, 8)}...
          </p>
        )}
      </div>

      {/* Swap Widget */}
      {publicKey ? <SwapWidget /> : (
        <div style={{
          maxWidth: '400px',
          padding: '20px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <p>Please connect your wallet to access the swap functionality.</p>
        </div>
      )}
    </div>
  )
}

export default Home