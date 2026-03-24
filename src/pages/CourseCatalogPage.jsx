import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Lock, CheckCircle, CreditCard, Wallet } from 'lucide-react'
import { useDiscordAuth } from '../context/DiscordAuthContext'
import { usePayment } from '../context/PaymentContext'
import { curriculumData } from '../data/curriculumData'
import CourseEnrollment from '../components/CourseEnrollment'
import PaymentModal from '../components/PaymentModal'

export default function CourseCatalogPage() {
  const { isAuthenticated, login } = useDiscordAuth()
  const { isEnrolled } = usePayment()
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const handleEnrollClick = (courseId) => {
    if (!isAuthenticated) {
      login()
      return
    }
    setSelectedCourse(courseId)
    setShowPaymentModal(true)
  }

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false)
    setSelectedCourse(null)
  }

  return (
    <main>
      {/* Header */}
      <section className="pt-44 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-10 top-0 left-1/4" />
          <div className="absolute w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-10 bottom-0 right-1/4" />
        </div>

        <div className="container relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-space-grotesk bg-gradient-to-r from-white via-purple-300 to-pink-500 bg-clip-text text-transparent">
              COURSE CATALOG
            </h1>
            <p className="text-gray text-lg max-w-2xl mx-auto">
              Explore our comprehensive courses and enroll in the ones that match your career goals. 
              Pay with PayPal or Solana cryptocurrency.
            </p>
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="pb-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            {Object.values(curriculumData).map(course => {
              const enrolled = isEnrolled(course.id)
              
              return (
                <div key={course.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all">
                  {/* Course Header */}
                  <div className={`p-6 bg-gradient-to-r ${course.bgClass}`}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl bg-white/20">
                        {course.icon}
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-white mb-1">{course.title}</h2>
                        <p className="text-white/80 text-sm">{course.roleName}</p>
                      </div>
                      {enrolled && (
                        <div className="bg-green-500/20 p-2 rounded-full">
                          <CheckCircle className="w-6 h-6 text-green-400" />
                        </div>
                      )}
                    </div>
                    <p className="text-white/90">{course.subtitle}</p>
                  </div>

                  {/* Course Content */}
                  <div className="p-6">
                    {/* Pricing */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white/5 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <CreditCard className="w-5 h-5 text-blue-400" />
                          <span className="text-white font-medium">PayPal</span>
                        </div>
                        <p className="text-xl font-bold text-white">${course.price}</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Wallet className="w-5 h-5 text-purple-400" />
                          <span className="text-white font-medium">Solana</span>
                        </div>
                        <p className="text-xl font-bold text-white">{course.solanaPrice} SOL</p>
                      </div>
                    </div>

                    {/* Course Stats */}
                    <div className="flex flex-wrap gap-3 mb-6">
                      <span className="bg-white/5 px-3 py-1 rounded-full text-gray-300 text-sm">
                        📅 12 Weeks
                      </span>
                      <span className="bg-white/5 px-3 py-1 rounded-full text-gray-300 text-sm">
                        🏗️ {course.projects.length} Projects
                      </span>
                      <span className="bg-white/5 px-3 py-1 rounded-full text-gray-300 text-sm">
                        📚 {course.phases.length} Phases
                      </span>
                    </div>

                    {/* Status & Action */}
                    {enrolled ? (
                      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-green-400 font-medium">Enrolled</span>
                        </div>
                        <p className="text-gray-300 text-sm mb-3">
                          You have full access to this course
                        </p>
                        <Link 
                          to="/student-portal"
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors inline-block"
                        >
                          Access Course →
                        </Link>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEnrollClick(course.id)}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
                      >
                        <Lock className="w-5 h-5" />
                        Enroll Now
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Payment Modal */}
      {selectedCourse && (
        <PaymentModal
          courseId={selectedCourse}
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </main>
  )
}
