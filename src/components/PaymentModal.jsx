import { useState } from 'react'
import { X, CreditCard, Wallet } from 'lucide-react'
import SimplePayment from './SimplePayment'
import { curriculumData } from '../data/curriculumData'

export default function PaymentModal({ courseId, isOpen, onClose, onPaymentSuccess }) {
  const [paymentComplete, setPaymentComplete] = useState(false)
  const [paymentError, setPaymentError] = useState(null)

  if (!isOpen) return null

  const course = curriculumData[courseId]
  if (!course) return null

  const handlePaymentComplete = (paymentDetails) => {
    setPaymentComplete(true)
    setPaymentError(null)
    setTimeout(() => {
      onPaymentSuccess(paymentDetails)
      onClose()
    }, 2000)
  }

  const handlePaymentError = (error) => {
    setPaymentError(error.message || 'Payment failed')
  }

  const handleCancel = () => {
    setPaymentError(null)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-dark border border-white/10 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h2 className="text-2xl font-bold text-white">Complete Your Enrollment</h2>
            <p className="text-gray-400 mt-1">{course.title} Course</p>
          </div>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Course Info */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-start gap-4">
            <div className="text-4xl">{course.icon}</div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white mb-2">{course.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{course.subtitle}</p>
              <div className="flex flex-wrap gap-2">
                {course.phases.map((phase, index) => (
                  <span key={index} className="bg-white/5 border border-white/10 px-2 py-1 rounded text-xs text-gray-400">
                    {phase.weeks}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="p-6">
          {paymentComplete ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Payment Successful!</h3>
              <p className="text-gray-400">You now have access to the {course.title} course.</p>
            </div>
          ) : (
            <SimplePayment
              courseId={courseId}
              onPaymentComplete={handlePaymentComplete}
              onPaymentError={handlePaymentError}
              onCancel={handleCancel}
            />
          )}
        </div>

        {/* Error Display */}
        {paymentError && (
          <div className="p-6 border-t border-white/10">
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-400">{paymentError}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
