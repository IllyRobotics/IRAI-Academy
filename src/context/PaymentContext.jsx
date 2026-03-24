import { createContext, useContext, useState, useEffect } from 'react'
import { useDiscordAuth } from './DiscordAuthContext'
import { curriculumData } from '../data/curriculumData'

const PaymentContext = createContext()

export function PaymentProvider({ children }) {
  const { user } = useDiscordAuth()
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [paymentStatus, setPaymentStatus] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Load enrolled courses from localStorage on mount
  useEffect(() => {
    if (user?.id) {
      const stored = localStorage.getItem(`enrolled_courses_${user.id}`)
      if (stored) {
        setEnrolledCourses(JSON.parse(stored))
      }
      
      const paymentStatusStored = localStorage.getItem(`payment_status_${user.id}`)
      if (paymentStatusStored) {
        setPaymentStatus(JSON.parse(paymentStatusStored))
      }
    }
  }, [user])

  // Save enrolled courses to localStorage whenever they change
  useEffect(() => {
    if (user?.id && enrolledCourses.length > 0) {
      localStorage.setItem(`enrolled_courses_${user.id}`, JSON.stringify(enrolledCourses))
    }
  }, [enrolledCourses, user])

  // Save payment status to localStorage whenever it changes
  useEffect(() => {
    if (user?.id && Object.keys(paymentStatus).length > 0) {
      localStorage.setItem(`payment_status_${user.id}`, JSON.stringify(paymentStatus))
    }
  }, [paymentStatus, user])

  // Check if user is enrolled in a course
  const isEnrolled = (courseId) => {
    return enrolledCourses.includes(courseId)
  }

  // Get course pricing
  const getCoursePrice = (courseId, paymentMethod) => {
    const course = curriculumData[courseId]
    if (!course) return null
    
    return paymentMethod === 'paypal' ? course.price : course.solanaPrice
  }

  // Start payment process
  const startPayment = async (courseId, paymentMethod) => {
    if (!user?.id) {
      throw new Error('User must be authenticated to make a payment')
    }

    if (isEnrolled(courseId)) {
      throw new Error('Already enrolled in this course')
    }

    setLoading(true)
    setError(null)
    
    try {
      // Generate unique payment ID
      const paymentId = `payment_${Date.now()}_${user.id}_${courseId}`
      
      // Set initial payment status
      setPaymentStatus(prev => ({
        ...prev,
        [paymentId]: {
          courseId,
          paymentMethod,
          status: 'pending',
          timestamp: Date.now(),
          userId: user.id
        }
      }))

      return paymentId
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Complete successful payment
  const completePayment = (paymentId, paymentDetails) => {
    const payment = paymentStatus[paymentId]
    if (!payment) {
      throw new Error('Payment not found')
    }

    // Update payment status
    setPaymentStatus(prev => ({
      ...prev,
      [paymentId]: {
        ...prev[paymentId],
        status: 'completed',
        completedAt: Date.now(),
        paymentDetails
      }
    }))

    // Enroll user in course
    if (!enrolledCourses.includes(payment.courseId)) {
      setEnrolledCourses(prev => [...prev, payment.courseId])
    }

    // Store payment record
    const paymentRecord = {
      paymentId,
      courseId: payment.courseId,
      paymentMethod: payment.paymentMethod,
      userId: user.id,
      amount: getCoursePrice(payment.courseId, payment.paymentMethod),
      completedAt: Date.now(),
      paymentDetails
    }
    
    const existingPayments = JSON.parse(localStorage.getItem(`payments_${user.id}`) || '[]')
    existingPayments.push(paymentRecord)
    localStorage.setItem(`payments_${user.id}`, JSON.stringify(existingPayments))
  }

  // Handle payment failure
  const failPayment = (paymentId, error) => {
    setPaymentStatus(prev => ({
      ...prev,
      [paymentId]: {
        ...prev[paymentId],
        status: 'failed',
        failedAt: Date.now(),
        error: error.message || 'Payment failed'
      }
    }))
  }

  // Get payment history
  const getPaymentHistory = () => {
    if (!user?.id) return []
    return JSON.parse(localStorage.getItem(`payments_${user.id}`) || '[]')
  }

  // Get pending payments
  const getPendingPayments = () => {
    return Object.entries(paymentStatus)
      .filter(([_, payment]) => payment.status === 'pending')
      .map(([id, payment]) => ({ id, ...payment }))
  }

  const value = {
    enrolledCourses,
    paymentStatus,
    loading,
    error,
    isEnrolled,
    getCoursePrice,
    startPayment,
    completePayment,
    failPayment,
    getPaymentHistory,
    getPendingPayments
  }

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  )
}

export function usePayment() {
  const context = useContext(PaymentContext)
  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider')
  }
  return context
}
