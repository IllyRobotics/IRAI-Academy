import { useState } from 'react'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { usePayment } from '../context/PaymentContext'

export default function PayPalPayment({ courseId, onPaymentComplete, onPaymentError, onCancel }) {
  const { getCoursePrice, startPayment, completePayment, failPayment } = usePayment()
  const [processing, setProcessing] = useState(false)
  const [paymentId, setPaymentId] = useState(null)

  const amount = getCoursePrice(courseId, 'paypal')
  if (!amount) {
    return <div className="text-red-400">Course pricing not available</div>
  }

  const initialOptions = {
    'client-id': 'test', // Replace with your actual PayPal client ID
    currency: 'USD',
    intent: 'capture',
  }

  const handleCreateOrder = async (data, actions) => {
    try {
      setProcessing(true)
      const paymentId = await startPayment(courseId, 'paypal')
      setPaymentId(paymentId)
      
      return actions.order.create({
        purchase_units: [
          {
            description: `IRAI Academy - ${courseId.replace('-', ' ').toUpperCase()} Course`,
            amount: {
              currency_code: 'USD',
              value: amount.toFixed(2),
            },
          },
        ],
      })
    } catch (error) {
      setProcessing(false)
      onPaymentError(error)
      throw error
    }
  }

  const handleOnApprove = async (data, actions) => {
    try {
      const details = await actions.order.capture()
      setProcessing(false)
      
      completePayment(paymentId, {
        paypalOrderId: data.orderID,
        paypalDetails: details,
        amount: amount
      })
      
      onPaymentComplete({
        paymentMethod: 'paypal',
        amount,
        courseId,
        transactionId: data.orderID,
        details
      })
    } catch (error) {
      setProcessing(false)
      failPayment(paymentId, error)
      onPaymentError(error)
    }
  }

  const handleOnError = (err) => {
    setProcessing(false)
    if (paymentId) {
      failPayment(paymentId, err)
    }
    onPaymentError(err)
  }

  const handleOnCancel = () => {
    setProcessing(false)
    onCancel()
  }

  return (
    <div className="w-full">
      <PayPalScriptProvider options={initialOptions}>
        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white mb-2">PayPal Payment</h3>
            <p className="text-gray-400">
              Amount: <span className="text-white font-medium">${amount.toFixed(2)} USD</span>
            </p>
          </div>
          
          {processing ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-gray-400">Processing payment...</span>
            </div>
          ) : (
            <PayPalButtons
              style={{
                layout: 'vertical',
                color: 'blue',
                shape: 'rect',
                label: 'paypal',
              }}
              createOrder={handleCreateOrder}
              onApprove={handleOnApprove}
              onError={handleOnError}
              onCancel={handleOnCancel}
              disabled={processing}
            />
          )}
        </div>
      </PayPalScriptProvider>
    </div>
  )
}
