import { useState } from 'react'
import { Link } from 'react-router-dom'

const ADMIN_EMAIL = 'demarkuswilsone@gmail.com'
const PAYPAL_BUSINESS = 'demarkuswilsone@gmail.com'
const COURSE_PRICE = '299.00'
const SOL_WALLET = import.meta.env.VITE_SOL_WALLET || ''

const COURSES = [
  { id: 'web-development', name: 'Web Development', icon: '🌐', price: '$299' },
  { id: 'mobile-app-builder', name: 'Mobile App Builder', icon: '📱', price: '$299' },
  { id: 'content-creation', name: 'Content Creation', icon: '🎬', price: '$299' },
  { id: 'business-builder', name: 'Business Builder', icon: '💼', price: '$299' },
]

export default function NoAccessPage({ user, logout }) {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState(null)
  const [solSubmitted, setSolSubmitted] = useState(false)

  const userDisplay = user?.global_name || user?.username || 'Student'
  const userId = user?.id || ''

  function handlePayPal(course) {
    // Construct PayPal payment link
    const itemName = encodeURIComponent(`IRAI Academy - ${course.name} Course`)
    const custom = encodeURIComponent(`discord:${userId}|course:${course.id}`)
    const returnUrl = encodeURIComponent(window.location.href)
    const notifyUrl = encodeURIComponent(`mailto:${ADMIN_EMAIL}`)

    window.open(
      `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${encodeURIComponent(PAYPAL_BUSINESS)}&item_name=${itemName}&amount=${COURSE_PRICE}&currency_code=USD&custom=${custom}&return=${returnUrl}&cancel_return=${returnUrl}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  function handleSolPayment(course) {
    setSolSubmitted(true)
    // Trigger mailto to admin for SOL payment verification
    const subject = encodeURIComponent(`IRAI Academy SOL Payment - ${course.name}`)
    const body = encodeURIComponent(
      `Discord User: ${userDisplay} (ID: ${userId})\n` +
      `Course: ${course.name}\n` +
      `Payment Method: SOL (Solana)\n` +
      `Amount: $${COURSE_PRICE} equivalent in SOL\n\n` +
      `Please verify payment and assign the appropriate Discord role.\n` +
      `SOL Wallet for payment: ${SOL_WALLET || '(Contact admin for wallet address)'}`
    )
    window.location.href = `mailto:${ADMIN_EMAIL}?subject=${subject}&body=${body}`
  }

  return (
    <main>
      <nav className="fixed top-20 left-0 right-0 z-40 border-b border-white/10 bg-dark/95 backdrop-blur-sm">
        <div className="container py-4 flex justify-between items-center">
          <Link to="/" className="text-gray hover:text-light transition-colors flex items-center gap-2">
            <span>←</span>
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {user?.avatar ? (
                <img
                  src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=32`}
                  alt=""
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold">
                  {userDisplay[0]?.toUpperCase()}
                </div>
              )}
              <span className="text-sm text-gray-300 hidden sm:inline">{userDisplay}</span>
            </div>
            <button onClick={logout} className="text-gray-400 hover:text-red-400 transition-colors text-sm">
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <section className="min-h-screen pt-44 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-red-600 rounded-full blur-3xl opacity-10 top-0 left-1/4" />
          <div className="absolute w-96 h-96 bg-orange-600 rounded-full blur-3xl opacity-10 bottom-0 right-1/4" />
        </div>

        <div className="container relative z-10 max-w-4xl mx-auto">
          {/* No Access Message */}
          <div className="text-center mb-12">
            <div className="inline-block text-6xl mb-6">🔒</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-space-grotesk text-white">
              Access Required
            </h1>
            <p className="text-xl text-gray mb-4">
              You do not have access to the IRAI Student Portal.
            </p>
            <p className="text-gray-500">
              Signed in as <span className="text-gray-300 font-semibold">{userDisplay}</span> — your Discord account does not have an assigned student role in the IRAI Academy server.
            </p>
          </div>

          {/* Enrollment Options */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold font-space-grotesk text-white mb-2 text-center">
              Enroll in a Course
            </h2>
            <p className="text-gray text-center mb-8">
              Choose a course track to get started. After payment, an IRAI admin will assign your role and grant portal access.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {COURSES.map(course => (
                <button
                  key={course.id}
                  onClick={() => { setSelectedCourse(course); setPaymentMethod(null); setSolSubmitted(false); }}
                  className={`text-left p-6 rounded-xl border transition-all ${
                    selectedCourse?.id === course.id
                      ? 'bg-indigo-600/20 border-indigo-500/50 shadow-lg shadow-indigo-500/10'
                      : 'bg-white/5 border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="text-3xl mb-3">{course.icon}</div>
                  <div className="font-bold text-white mb-1">{course.name}</div>
                  <div className="text-gray text-sm mb-2">12 weeks • 4 projects</div>
                  <div className="text-indigo-400 font-bold text-lg">{course.price}</div>
                </button>
              ))}
            </div>

            {/* Payment Options */}
            {selectedCourse && (
              <div className="border-t border-white/10 pt-8">
                <h3 className="text-lg font-bold text-white mb-4 text-center">
                  Payment for: {selectedCourse.icon} {selectedCourse.name}
                </h3>

                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
                  <button
                    onClick={() => { setPaymentMethod('paypal'); setSolSubmitted(false); }}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                      paymentMethod === 'paypal'
                        ? 'bg-[#0070BA] text-white shadow-lg'
                        : 'bg-white/5 border border-white/10 text-gray-300 hover:border-white/30'
                    }`}
                  >
                    💳 Pay with PayPal
                  </button>
                  <button
                    onClick={() => { setPaymentMethod('sol'); setSolSubmitted(false); }}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                      paymentMethod === 'sol'
                        ? 'bg-gradient-to-r from-purple-600 to-green-500 text-white shadow-lg'
                        : 'bg-white/5 border border-white/10 text-gray-300 hover:border-white/30'
                    }`}
                  >
                    ◎ Pay with SOL
                  </button>
                </div>

                {paymentMethod === 'paypal' && (
                  <div className="text-center">
                    <p className="text-gray text-sm mb-4">
                      You will be redirected to PayPal to complete your ${COURSE_PRICE} payment. After payment, an IRAI admin will verify and assign your course role.
                    </p>
                    <button
                      onClick={() => handlePayPal(selectedCourse)}
                      className="bg-[#0070BA] hover:bg-[#003087] px-8 py-3 rounded-xl font-bold text-white transition-all inline-flex items-center gap-2"
                    >
                      💳 Complete PayPal Payment — ${COURSE_PRICE}
                    </button>
                  </div>
                )}

                {paymentMethod === 'sol' && !solSubmitted && (
                  <div className="text-center">
                    <p className="text-gray text-sm mb-2">
                      Send <span className="text-white font-semibold">${COURSE_PRICE} equivalent in SOL</span> to the wallet below:
                    </p>
                    {SOL_WALLET ? (
                      <div className="bg-black/30 border border-white/10 rounded-lg px-4 py-3 mb-4 font-mono text-sm text-indigo-300 break-all select-all">
                        {SOL_WALLET}
                      </div>
                    ) : (
                      <p className="text-gray-400 text-sm mb-4 italic">Contact IRAI admin for the SOL wallet address.</p>
                    )}
                    <p className="text-gray text-sm mb-4">
                      After sending SOL, click below to notify the admin for verification and role assignment.
                    </p>
                    <button
                      onClick={() => handleSolPayment(selectedCourse)}
                      className="bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-700 hover:to-green-600 px-8 py-3 rounded-xl font-bold text-white transition-all inline-flex items-center gap-2"
                    >
                      ◎ I've Sent SOL — Notify Admin
                    </button>
                  </div>
                )}

                {paymentMethod === 'sol' && solSubmitted && (
                  <div className="text-center bg-green-500/10 border border-green-500/20 rounded-xl p-6">
                    <div className="text-3xl mb-2">✅</div>
                    <p className="text-green-400 font-semibold mb-2">Payment notification sent!</p>
                    <p className="text-gray text-sm">
                      An admin at IRAI Academy has been notified. Your course role will be assigned once payment is verified. Check back soon!
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Already Paid / Need Help */}
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              Already paid?{' '}
              <a
                href={`mailto:${ADMIN_EMAIL}?subject=${encodeURIComponent('IRAI Student Portal - Role Assignment Request')}&body=${encodeURIComponent(`Hi,\n\nI've already paid for my IRAI Academy course but don't have portal access yet.\n\nDiscord Username: ${userDisplay}\nDiscord ID: ${userId}\n\nPlease assign my student role.\n\nThank you!`)}`}
                className="text-indigo-400 hover:text-indigo-300 underline"
              >
                Contact IRAI Admin
              </a>
              {' '}to get your role assigned.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
