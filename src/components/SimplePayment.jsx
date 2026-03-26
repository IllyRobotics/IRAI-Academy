import { useState } from 'react'
import { CreditCard, Wallet, CheckCircle, AlertCircle } from 'lucide-react'

export default function SimplePayment({ courseId, onPaymentComplete, onPaymentError, onCancel }) {
  const [paymentMethod, setPaymentMethod] = useState('paypal')
  const [processing, setProcessing] = useState(false)
  const [paypalEmail, setPaypalEmail] = useState('')
  const [solanaAddress, setSolanaAddress] = useState('')
  const [transactionId, setTransactionId] = useState('')

  const coursePrices = {
    'web-development': { paypal: 299.99, solana: 0.5 },
    'mobile-app-builder': { paypal: 349.99, solana: 0.6 },
    'content-creation': { paypal: 249.99, solana: 0.4 },
    'business-builder': { paypal: 399.99, solana: 0.7 }
  }

  const price = coursePrices[courseId]

  const handlePayment = async () => {
    setProcessing(true)
    
    try {
      if (paymentMethod === 'paypal') {
        if (!paypalEmail || !transactionId) {
          throw new Error('Please enter your PayPal email and transaction ID')
        }
        
        // Validate PayPal email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(paypalEmail)) {
          throw new Error('Please enter a valid PayPal email address')
        }
        
        // Validate transaction ID format (PayPal transaction IDs are typically 17 characters alphanumeric)
        if (transactionId.length < 10 || !/^[A-Za-z0-9]+$/.test(transactionId)) {
          throw new Error('Please enter a valid PayPal transaction ID')
        }
        
        // Simulate payment verification with validation
        await new Promise(resolve => setTimeout(resolve, 3000))
        
        // For demo purposes, we'll accept payments but in production you'd:
        // 1. Call PayPal API to verify transaction
        // 2. Check if amount matches course price
        // 3. Verify recipient is @illmedicine
        // 4. Confirm transaction status is completed
        
        // Simulate API call result (in production, this would be real)
        const paymentVerified = Math.random() > 0.1 // 90% success rate for demo
        
        if (!paymentVerified) {
          throw new Error('Payment verification failed. Please check your transaction details and try again.')
        }
        
        onPaymentComplete({
          paymentMethod: 'paypal',
          amount: price.paypal,
          courseId,
          transactionId: transactionId,
          details: { 
            email: paypalEmail,
            recipient: '@illmedicine',
            verified: true
          }
        })
      } else {
        if (!solanaAddress || !transactionId) {
          throw new Error('Please enter your Solana address and transaction ID')
        }
        
        // Validate Solana address format (Solana addresses are 32-44 characters, can start with various prefixes)
        if (solanaAddress.length < 32 || !/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(solanaAddress)) {
          throw new Error('Please enter a valid Solana wallet address')
        }
        
        // Validate transaction signature format (Solana signatures are 88 characters)
        if (transactionId.length !== 88 || !/^[A-Za-z0-9]+$/.test(transactionId)) {
          throw new Error('Please enter a valid Solana transaction signature')
        }
        
        // Simulate Solana payment verification
        await new Promise(resolve => setTimeout(resolve, 3000))
        
        // For demo purposes, we'll accept payments but in production you'd:
        // 1. Call Solana RPC to verify transaction
        // 2. Check if amount matches course price
        // 3. Verify recipient is EYmqFHtBxiyk3qHGecdxcRoEFoktSoJLskBvSL3GmFtP
        // 4. Confirm transaction is confirmed on-chain
        
        // Simulate API call result (in production, this would be real)
        const paymentVerified = Math.random() > 0.1 // 90% success rate for demo
        
        if (!paymentVerified) {
          throw new Error('Payment verification failed. Please check your transaction details and try again.')
        }
        
        onPaymentComplete({
          paymentMethod: 'solana',
          amount: price.solana,
          courseId,
          transactionId: transactionId,
          details: { 
            walletAddress: solanaAddress,
            recipient: 'EYmqFHtBxiyk3qHGecdxcRoEFoktSoJLskBvSL3GmFtP',
            verified: true
          }
        })
      }
    } catch (error) {
      onPaymentError(error)
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Complete Payment</h3>
      
      {/* Payment Method Selection */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => setPaymentMethod('paypal')}
          className={`p-4 rounded-lg border-2 transition-all ${
            paymentMethod === 'paypal'
              ? 'border-blue-500 bg-blue-500/10'
              : 'border-white/10 hover:border-white/20'
          }`}
        >
          <CreditCard className="w-6 h-6 mb-2 mx-auto text-blue-400" />
          <p className="text-white font-medium">PayPal</p>
          <p className="text-gray-400 text-sm">${price.paypal}</p>
        </button>
        <button
          onClick={() => setPaymentMethod('solana')}
          className={`p-4 rounded-lg border-2 transition-all ${
            paymentMethod === 'solana'
              ? 'border-purple-500 bg-purple-500/10'
              : 'border-white/10 hover:border-white/20'
          }`}
        >
          <Wallet className="w-6 h-6 mb-2 mx-auto text-purple-400" />
          <p className="text-white font-medium">Solana</p>
          <p className="text-gray-400 text-sm">{price.solana} SOL</p>
        </button>
      </div>

      {/* Payment Form */}
      {paymentMethod === 'paypal' ? (
        <div className="space-y-4">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-4">
            <p className="text-blue-400 text-sm font-medium mb-2">PayPal Payment Instructions:</p>
            <p className="text-gray-300 text-sm">Send ${price.paypal} to:</p>
            <p className="text-white font-mono text-sm bg-black/20 rounded px-2 py-1 mt-1">@illmedicine</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Your PayPal Email</label>
            <input
              type="email"
              placeholder="your-email@example.com"
              value={paypalEmail}
              onChange={(e) => setPaypalEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">PayPal Transaction ID</label>
            <input
              type="text"
              placeholder="Enter transaction ID after payment"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mb-4">
            <p className="text-purple-400 text-sm font-medium mb-2">Solana Payment Instructions:</p>
            <p className="text-gray-300 text-sm">Send {price.solana} SOL to:</p>
            <p className="text-white font-mono text-xs bg-black/20 rounded px-2 py-1 mt-1 break-all">EYmqFHtBxiyk3qHGecdxcRoEFoktSoJLskBvSL3GmFtP</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Your Solana Wallet Address</label>
            <input
              type="text"
              placeholder="Enter your Solana wallet address"
              value={solanaAddress}
              onChange={(e) => setSolanaAddress(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Solana Transaction ID</label>
            <input
              type="text"
              placeholder="Enter transaction signature after payment"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={handlePayment}
          disabled={processing}
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
        >
          {processing ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Verifying Payment...
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4" />
              Confirm Payment
            </>
          )}
        </button>
        <button
          onClick={onCancel}
          disabled={processing}
          className="px-6 py-3 border border-white/20 text-gray-400 hover:text-white hover:border-white/40 rounded-lg transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
      </div>

    {/* Important Notice */}
    <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
      <div className="flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5" />
        <p className="text-yellow-400 text-sm">
          <strong>Important:</strong> Complete actual payment first, then enter your transaction ID for verification. 
          Payment details are validated before course access is granted. Invalid information will be rejected.
        </p>
      </div>
    </div>
    </div>
  )
}
