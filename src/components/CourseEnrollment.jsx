import { useState } from 'react'
import { Lock, CreditCard, Wallet, CheckCircle } from 'lucide-react'
import { usePayment } from '../context/PaymentContext'
import { curriculumData } from '../data/curriculumData'
import PaymentModal from './PaymentModal'

export default function CourseEnrollment({ courseId }) {
  const { isEnrolled } = usePayment()
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [enrollmentSuccess, setEnrollmentSuccess] = useState(false)

  const course = curriculumData[courseId]
  const enrolled = isEnrolled(courseId)

  if (!course) return null

  const handlePaymentSuccess = (paymentDetails) => {
    setEnrollmentSuccess(true)
    setTimeout(() => setEnrollmentSuccess(false), 3000)
  }

  if (enrolled) {
    return (
      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle className="w-6 h-6 text-green-500" />
          <h3 className="text-lg font-semibold text-green-400">Course Unlocked</h3>
        </div>
        <p className="text-gray-300 mb-4">
          You have full access to the {course.title} course. Start learning anytime!
        </p>
        <div className="flex flex-wrap gap-2">
          {course.phases.map((phase, index) => (
            <span key={index} className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
              {phase.phase}: {phase.title}
            </span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="bg-white/5 border border-white/10 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Lock className="w-6 h-6 text-yellow-500" />
          <h3 className="text-lg font-semibold text-white">Enroll to Access</h3>
        </div>
        
        <div className="mb-6">
          <h4 className="text-xl font-bold text-white mb-2">{course.title}</h4>
          <p className="text-gray-400 mb-4">{course.subtitle}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white/5 rounded p-4">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-5 h-5 text-blue-400" />
                <span className="text-white font-medium">PayPal</span>
              </div>
              <p className="text-2xl font-bold text-white">${course.price}</p>
              <p className="text-gray-400 text-sm">Pay with credit/debit card</p>
            </div>
            
            <div className="bg-white/5 rounded p-4">
              <div className="flex items-center gap-2 mb-2">
                <Wallet className="w-5 h-5 text-purple-400" />
                <span className="text-white font-medium">Solana</span>
              </div>
              <p className="text-2xl font-bold text-white">{course.solanaPrice} SOL</p>
              <p className="text-gray-400 text-sm">Pay with cryptocurrency</p>
            </div>
          </div>

          <div className="space-y-3">
            <h5 className="text-white font-medium">What you'll get:</h5>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-gray-300">
                <span className="text-green-400 mt-1">✓</span>
                <span className="text-sm">Access to all {course.phases.length} course phases</span>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <span className="text-green-400 mt-1">✓</span>
                <span className="text-sm">Hands-on projects and assignments</span>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <span className="text-green-400 mt-1">✓</span>
                <span className="text-sm">Instructor support and community access</span>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <span className="text-green-400 mt-1">✓</span>
                <span className="text-sm">Certificate upon completion</span>
              </li>
            </ul>
          </div>
        </div>

        <button
          onClick={() => setShowPaymentModal(true)}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
        >
          <Lock className="w-5 h-5" />
          Enroll Now - Unlock Course
        </button>
      </div>

      <PaymentModal
        courseId={courseId}
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {enrollmentSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Successfully enrolled in {course.title}!
        </div>
      )}
    </>
  )
}
