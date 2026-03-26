import { useState, useEffect } from 'react'
import { Users, DollarSign, Calendar, CheckCircle, XCircle, Clock, CreditCard, Wallet } from 'lucide-react'
import { useDiscordAuth } from '../context/DiscordAuthContext'
import { usePayment } from '../context/PaymentContext'

export default function InstructorDashboard() {
  const { user } = useDiscordAuth()
  const { payments } = usePayment()
  const [enrolledStudents, setEnrolledStudents] = useState([])
  const [loading, setLoading] = useState(true)

  // Mock enrolled students data - in production this would come from your backend
  useEffect(() => {
    // Simulate fetching enrolled students data
    const mockStudents = [
      {
        id: '1',
        name: 'Alex Johnson',
        avatar: 'A',
        email: 'alex@example.com',
        courses: ['web-development'],
        enrolledDate: '2024-01-15',
        paymentStatus: 'completed',
        paymentMethod: 'paypal',
        transactionId: 'PAYPAL_TX_123456',
        attendance: 85,
        lastSeen: '2024-03-20'
      },
      {
        id: '2', 
        name: 'Sarah Chen',
        avatar: 'S',
        email: 'sarah@example.com',
        courses: ['web-development', 'content-creation'],
        enrolledDate: '2024-02-01',
        paymentStatus: 'completed',
        paymentMethod: 'solana',
        transactionId: 'SOL_TX_789012',
        attendance: 92,
        lastSeen: '2024-03-25'
      },
      {
        id: '3',
        name: 'Mike Wilson',
        avatar: 'M',
        email: 'mike@example.com',
        courses: ['mobile-app-builder'],
        enrolledDate: '2024-01-20',
        paymentStatus: 'pending',
        paymentMethod: null,
        transactionId: null,
        attendance: 45,
        lastSeen: '2024-03-18'
      },
      {
        id: '4',
        name: 'Emma Davis',
        avatar: 'E',
        email: 'emma@example.com',
        courses: ['business-builder'],
        enrolledDate: '2024-02-10',
        paymentStatus: 'completed',
        paymentMethod: 'paypal',
        transactionId: 'PAYPAL_TX_654321',
        attendance: 78,
        lastSeen: '2024-03-22'
      },
      {
        id: '5',
        name: 'Ryan Park',
        avatar: 'R',
        email: 'ryan@example.com',
        courses: ['content-creation'],
        enrolledDate: '2024-03-01',
        paymentStatus: 'failed',
        paymentMethod: 'paypal',
        transactionId: 'PAYPAL_TX_FAILED',
        attendance: 12,
        lastSeen: '2024-03-19'
      }
    ]

    // Filter students based on instructor's courses
    const instructorCourses = ['web-development', 'mobile-app-builder', 'business-builder', 'content-creation']
    const filteredStudents = mockStudents.filter(student => 
      student.courses.some(course => instructorCourses.includes(course))
    )

    setEnrolledStudents(filteredStudents)
    setLoading(false)
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-400 bg-green-500/10'
      case 'pending':
        return 'text-yellow-400 bg-yellow-500/10'
      case 'failed':
        return 'text-red-400 bg-red-500/10'
      default:
        return 'text-gray-400 bg-gray-500/10'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return CheckCircle
      case 'pending':
        return Clock
      case 'failed':
        return XCircle
      default:
        return Clock
    }
  }

  const getPaymentIcon = (method) => {
    switch (method) {
      case 'paypal':
        return CreditCard
      case 'solana':
        return Wallet
      default:
        return DollarSign
    }
  }

  const getAttendanceColor = (percentage) => {
    if (percentage >= 90) return 'text-green-400'
    if (percentage >= 75) return 'text-yellow-400'
    if (percentage >= 50) return 'text-orange-400'
    return 'text-red-400'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Instructor Dashboard</h1>
        <p className="text-gray-400">Manage your students and track their progress</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 text-blue-400" />
            <span className="text-2xl font-bold text-white">{enrolledStudents.length}</span>
          </div>
          <p className="text-gray-400 text-sm">Total Students</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-8 h-8 text-green-400" />
            <span className="text-2xl font-bold text-white">
              {enrolledStudents.filter(s => s.paymentStatus === 'completed').length}
            </span>
          </div>
          <p className="text-gray-400 text-sm">Paid Students</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-8 h-8 text-yellow-400" />
            <span className="text-2xl font-bold text-white">
              {enrolledStudents.filter(s => s.paymentStatus === 'pending').length}
            </span>
          </div>
          <p className="text-gray-400 text-sm">Pending Payment</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <XCircle className="w-8 h-8 text-red-400" />
            <span className="text-2xl font-bold text-white">
              {enrolledStudents.filter(s => s.paymentStatus === 'failed').length}
            </span>
          </div>
          <p className="text-gray-400 text-sm">Failed Payment</p>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-semibold text-white mb-4">Enrolled Students</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Courses</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Payment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Enrolled</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Attendance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Last Seen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {enrolledStudents.map(student => (
                <tr key={student.id} className="hover:bg-white/5">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                        {student.avatar}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-white">{student.name}</div>
                        <div className="text-xs text-gray-400">{student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {student.courses.map(course => (
                        <span key={course} className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                          {course.replace('-', ' ').toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(student.paymentStatus)}`}>
                        {(() => {
                          const Icon = getStatusIcon(student.paymentStatus)
                          return <Icon className="w-3 h-3" />
                        })()}
                        <span>{student.paymentStatus.toUpperCase()}</span>
                      </div>
                      {student.transactionId && (
                        <div className="text-xs text-gray-400">
                          ID: {student.transactionId.slice(0, 8)}...
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {new Date(student.enrolledDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`font-semibold ${getAttendanceColor(student.attendance)}`}>
                        {student.attendance}%
                      </div>
                      <div className="w-16 bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getAttendanceColor(student.attendance).replace('text-', 'bg-')}`}
                          style={{ width: `${student.attendance}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {new Date(student.lastSeen).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
