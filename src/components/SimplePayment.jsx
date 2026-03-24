import { useState } from 'react'
import { CreditCard, Wallet, CheckCircle, AlertCircle } from 'lucide-react'

export default function SimplePayment({ courseId, onPaymentComplete, onPaymentError, onCancel }) {
  const [paymentMethod, setPaymentMethod] = useState('paypal')
  const [processing, setProcessing] = useState(false)
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  })
  const [solanaAddress, setSolanaAddress] = useState('')

  const coursePrices = {
    'web-development': { paypal: 299.99, solana: 0.5 },
    'mobile-app-builder': { paypal: 349.99, solana: 0.6 },
    'content-creation': { paypal: 249.99, solana: 0.4 },
    'business-builder': { paypal: 399.99, solana: 0.7 }
  }

  const price = coursePrices[courseId]

  const handlePayment = async () => {
    setProcessing(true)
    
    // Simulate payment processing
    setTimeout(() => {
      if (paymentMethod === 'paypal') {
        if (cardDetails.number && cardDetails.expiry && cardDetails.cvv && cardDetails.name) {
          onPaymentComplete({
            paymentMethod: 'paypal',
            amount: price.paypal,
            courseId,
            transactionId: `paypal_${Date.now()}`,
            details: { ...cardDetails, number: '****-****-****-' + cardDetails.number.slice(-4) }
          })
        } else {
          onPaymentError(new Error('Please fill in all card details'))
        }
      } else {
        if (solanaAddress) {
          onPaymentComplete({
            paymentMethod: 'solana',
            amount: price.solana,
            courseId,
            transactionId: `solana_${Date.now()}`,
            details: { walletAddress: solanaAddress.slice(0, 8) + '...' + solanaAddress.slice(-8) }
          })
        } else {
          onPaymentError(new Error('Please enter your Solana wallet address'))
        }
      }
      setProcessing(false)
    }, 2000)
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
          <p className="text-white font-medium">PayPal/Card</p>
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
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Card Number</label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              value={cardDetails.number}
              onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Expiry</label>
              <input
                type="text"
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">CVV</label>
              <input
                type="text"
                placeholder="123"
                value={cardDetails.cvv}
                onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Name on Card</label>
            <input
              type="text"
              placeholder="John Doe"
              value={cardDetails.name}
              onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Solana Wallet Address</label>
            <input
              type="text"
              placeholder="Enter your Solana wallet address"
              value={solanaAddress}
              onChange={(e) => setSolanaAddress(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
            />
            <p className="text-gray-400 text-sm mt-1">
              Send {price.solana} SOL to: IRAI-Academy-Wallet.sol
            </p>
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
              Processing...
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4" />
              Pay {paymentMethod === 'paypal' ? `$${price.paypal}` : `${price.solana} SOL`}
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

      {/* Security Notice */}
      <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-blue-400 mt-0.5" />
          <p className="text-blue-400 text-sm">
            This is a demo payment system. In production, this would integrate with real payment processors.
          </p>
        </div>
      </div>
    </div>
  )
}
