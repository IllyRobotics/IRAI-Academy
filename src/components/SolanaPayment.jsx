import { useState, useMemo } from 'react'
import { 
  Connection, 
  PublicKey, 
  Transaction, 
  SystemProgram,
  LAMPORTS_PER_SOL 
} from '@solana/web3.js'
import { 
  useWallet, 
  WalletProvider,
  ConnectionProvider,
} from '@solana/wallet-adapter-react'
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import { usePayment } from '../context/PaymentContext'

// Solana network configuration
const SOLANA_NETWORK = 'devnet' // Change to 'mainnet-beta' for production
const RPC_URL = `https://api.${SOLANA_NETWORK}.solana.com`

// Wallet adapters
const wallets = [
  new PhantomWalletAdapter(),
  new SolflareWalletAdapter(),
]

export default function SolanaPayment({ courseId, onPaymentComplete, onPaymentError, onCancel }) {
  const { getCoursePrice, startPayment, completePayment, failPayment } = usePayment()
  const [processing, setProcessing] = useState(false)
  const [paymentId, setPaymentId] = useState(null)
  const [error, setError] = useState(null)

  const amount = getCoursePrice(courseId, 'solana')
  if (!amount) {
    return <div className="text-red-400">Course pricing not available</div>
  }

  const lamports = useMemo(() => amount * LAMPORTS_PER_SOL, [amount])

  const handlePayment = async () => {
    if (!wallet.connected) {
      setError('Please connect your wallet first')
      return
    }

    try {
      setProcessing(true)
      setError(null)
      
      const paymentId = await startPayment(courseId, 'solana')
      setPaymentId(paymentId)

      const connection = new Connection(RPC_URL)
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: new PublicKey('11111111111111111111111111111112'), // Replace with your actual Solana wallet address
          lamports,
        })
      )

      const signature = await wallet.sendTransaction(transaction, connection)
      
      // Wait for confirmation
      const confirmation = await connection.confirmTransaction(signature, 'confirmed')
      
      if (confirmation.value.err) {
        throw new Error('Transaction failed')
      }

      setProcessing(false)
      completePayment(paymentId, {
        signature,
        amount,
        courseId,
        confirmation
      })
      
      onPaymentComplete({
        paymentMethod: 'solana',
        amount,
        courseId,
        transactionId: signature,
        confirmation
      })
    } catch (err) {
      setProcessing(false)
      setError(err.message)
      if (paymentId) {
        failPayment(paymentId, err)
      }
      onPaymentError(err)
    }
  }

  return (
    <ConnectionProvider endpoint={RPC_URL}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <SolanaPaymentContent 
            processing={processing}
            error={error}
            amount={amount}
            lamports={lamports}
            onPayment={handlePayment}
            onCancel={onCancel}
          />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

function SolanaPaymentContent({ processing, error, amount, lamports, onPayment, onCancel }) {
  const { connected, publicKey } = useWallet()

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white mb-2">Solana Payment</h3>
        <p className="text-gray-400">
          Amount: <span className="text-white font-medium">{amount} SOL</span>
        </p>
        <p className="text-gray-500 text-sm">
          (~${(amount * 150).toFixed(2)} USD) {/* Approximate conversion */}
        </p>
      </div>

      {!connected ? (
        <div className="text-center py-4">
          <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700" />
          <p className="text-gray-400 text-sm mt-2">Connect your wallet to continue</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-white/5 rounded p-3">
            <p className="text-sm text-gray-400">Connected wallet:</p>
            <p className="text-white font-mono text-sm">
              {publicKey?.toString().slice(0, 8)}...{publicKey?.toString().slice(-8)}
            </p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {processing ? (
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
              <span className="ml-3 text-gray-400">Processing transaction...</span>
            </div>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={onPayment}
                disabled={processing}
                className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Pay {amount} SOL
              </button>
              <button
                onClick={onCancel}
                disabled={processing}
                className="px-4 py-2 border border-white/20 text-gray-400 hover:text-white hover:border-white/40 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
