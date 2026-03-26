import { useState, useEffect } from 'react'
import { Users, DollarSign, Calendar, CheckCircle, XCircle, Clock, CreditCard, Wallet, BookOpen, TrendingUp } from 'lucide-react'
import { useDiscordAuth } from '../context/DiscordAuthContext'
import { usePayment } from '../context/PaymentContext'

export default function InstructorDashboard() {
  const { user } = useDiscordAuth()
  const { payments } = usePayment()
  const [selectedCourse, setSelectedCourse] = useState('all')
  const [studentsData, setStudentsData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Course configuration
  const courses = {
    'web-development': {
      name: 'Web Development',
      roleId: '1485030740155433171',
      color: '#0099FF',
      icon: '🌐'
    },
    'app-builder': {
      name: 'App Builder',
      roleId: '1485030833080504480',
      color: '#00D9FF',
      icon: '📱'
    },
    'content-creator': {
      name: 'Content Creator',
      roleId: '1485030998457712731',
      color: '#FF6B6B',
      icon: '🎬'
    },
    'business-builder': {
      name: 'Business Builder',
      roleId: '1485030898696192064',
      color: '#4ECDC4',
      icon: '💼'
    }
  }

  // Fetch Discord student data
  useEffect(() => {
    fetchStudentData()
  }, [selectedCourse])

  const fetchStudentData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const API_URL = 'https://illyrobotics.github.io/IRAI-Academy/api/discord-students'
      
      let response
      if (selectedCourse === 'all') {
        response = await fetch(`${API_URL}?action=all`)
      } else {
        response = await fetch(`${API_URL}?action=course&course=${selectedCourse}`)
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch student data')
      }

      setStudentsData(data)
    } catch (error) {
      console.error('Error fetching student data:', error)
      setError(error.message)
      
      // Fallback to mock data if API fails
      setStudentsData(getMockData())
    } finally {
      setLoading(false)
    }
  }

  // Mock data fallback
  const getMockData = () => {
    const mockStudents = [
      {
        discordId: '123456789',
        discordName: 'Alex Johnson',
        displayName: 'Alex Johnson',
        avatar: 'https://cdn.discordapp.com/avatars/123456789/avatar.png',
        courses: ['web-development'],
        enrolledDate: '2024-01-15',
        paymentStatus: 'paid',
        paymentMethod: 'paypal',
        transactionId: 'PAYPAL_TX_123456',
        attendance: 85,
        roleReceivedDate: '2024-01-15',
        joinedAt: '2024-01-10'
      },
      {
        discordId: '987654321',
        discordName: 'Sarah Chen',
        displayName: 'Sarah Chen',
        avatar: 'https://cdn.discordapp.com/avatars/987654321/avatar.png',
        courses: ['web-development', 'content-creator'],
        enrolledDate: '2024-02-01',
        paymentStatus: 'paid',
        paymentMethod: 'solana',
        transactionId: 'SOL_TX_789012',
        attendance: 92,
        roleReceivedDate: '2024-02-01',
        joinedAt: '2024-01-25'
      },
      {
        discordId: '456789123',
        discordName: 'Mike Wilson',
        displayName: 'Mike Wilson',
        avatar: 'https://cdn.discordapp.com/avatars/456789123/avatar.png',
        courses: ['app-builder'],
        enrolledDate: '2024-01-20',
        paymentStatus: 'unpaid',
        paymentMethod: null,
        transactionId: null,
        attendance: 45,
        roleReceivedDate: '2024-01-20',
        joinedAt: '2024-01-15'
      },
      {
        discordId: '789123456',
        discordName: 'Emma Davis',
        displayName: 'Emma Davis',
        avatar: 'https://cdn.discordapp.com/avatars/789123456/avatar.png',
        courses: ['business-builder'],
        enrolledDate: '2024-02-10',
        paymentStatus: 'paid',
        paymentMethod: 'paypal',
        transactionId: 'PAYPAL_TX_654321',
        attendance: 78,
        roleReceivedDate: '2024-02-10',
        joinedAt: '2024-02-05'
      },
      {
        discordId: '321654987',
        discordName: 'Ryan Park',
        displayName: 'Ryan Park',
        avatar: 'https://cdn.discordapp.com/avatars/321654987/avatar.png',
        courses: ['content-creator'],
        enrolledDate: '2024-03-01',
        paymentStatus: 'unpaid',
        paymentMethod: null,
        transactionId: null,
        attendance: 12,
        roleReceivedDate: '2024-03-01',
        joinedAt: '2024-02-28'
      }
    ]

    if (selectedCourse === 'all') {
      return {
        success: true,
        students: mockStudents,
        total: mockStudents.length,
        paid: mockStudents.filter(s => s.paymentStatus === 'paid').length,
        unpaid: mockStudents.filter(s => s.paymentStatus === 'unpaid').length
      }
    } else {
      const courseStudents = mockStudents.filter(s => s.courses.includes(selectedCourse))
      return {
        success: true,
        students: courseStudents,
        course: selectedCourse,
        courseInfo: courses[selectedCourse],
        total: courseStudents.length,
        paid: courseStudents.filter(s => s.paymentStatus === 'paid').length,
        unpaid: courseStudents.filter(s => s.paymentStatus === 'unpaid').length
      }
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'text-green-400 bg-green-500/10'
      case 'unpaid':
        return 'text-yellow-400 bg-yellow-500/10'
      case 'failed':
        return 'text-red-400 bg-red-500/10'
      default:
        return 'text-gray-400 bg-gray-500/10'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid':
        return CheckCircle
      case 'unpaid':
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

  const averageAttendance = studentsData?.students?.length 
    ? Math.round(studentsData.students.reduce((sum, s) => sum + s.attendance, 0) / studentsData.students.length)
    : 0

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
          <p className="text-gray-400">Loading Discord student data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 mb-4">⚠️ Error loading data</div>
          <p className="text-gray-400 mb-4">{error}</p>
          <button 
            onClick={fetchStudentData}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Instructor Dashboard</h1>
        <p className="text-gray-400">Manage your students and track their progress</p>
        {error && (
          <div className="mt-2 p-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-400 text-sm">
            ⚠️ Using fallback data - Discord API unavailable
          </div>
        )}
      </div>

      {/* Course Selection */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setSelectedCourse('all')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              selectedCourse === 'all' 
                ? 'bg-purple-500 text-white' 
                : 'bg-white/10 text-gray-400 hover:bg-white/20'
            }`}
          >
            All Courses
          </button>
          {Object.entries(courses).map(([key, course]) => (
            <button
              key={key}
              onClick={() => setSelectedCourse(key)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                selectedCourse === key 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
              }`}
            >
              <span>{course.icon}</span>
              {course.name}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 text-blue-400" />
            <span className="text-2xl font-bold text-white">{studentsData?.total || 0}</span>
          </div>
          <p className="text-gray-400 text-sm">Total Students</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-8 h-8 text-green-400" />
            <span className="text-2xl font-bold text-white">{studentsData?.paid || 0}</span>
          </div>
          <p className="text-gray-400 text-sm">Paid Students</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-8 h-8 text-yellow-400" />
            <span className="text-2xl font-bold text-white">{studentsData?.unpaid || 0}</span>
          </div>
          <p className="text-gray-400 text-sm">Unpaid Students</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">{averageAttendance}%</span>
          </div>
          <p className="text-gray-400 text-sm">Avg Attendance</p>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-semibold text-white mb-2">
            {selectedCourse === 'all' ? 'All Students' : `${courses[selectedCourse].name} Students`}
          </h2>
          {selectedCourse !== 'all' && (
            <p className="text-gray-400 text-sm">
              Showing students with Discord role ID: {courses[selectedCourse].roleId}
            </p>
          )}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Discord ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {studentsData?.students?.map(student => (
                <tr key={student.discordId} className="hover:bg-white/5">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img 
                        src={student.avatar || `https://ui-avatars.com/api/?name=${student.discordName}&background=6366f1&color=fff`} 
                        alt={student.displayName}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <div className="text-sm font-medium text-white">{student.displayName}</div>
                        <div className="text-xs text-gray-400">@{student.discordName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {student.courses.map(course => (
                        <span key={course} className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                          {courses[course]?.icon || '📚'} {courses[course]?.name || course}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${getStatusColor(student.paymentStatus)}`}>
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
                      {student.paymentMethod && (
                        <div className="text-xs text-gray-400">
                          {student.paymentMethod.toUpperCase()}
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
                  <td className="px-6 py-4 text-xs text-gray-400 font-mono">
                    {student.discordId}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Refresh Button */}
      <div className="mt-6 text-center">
        <button
          onClick={fetchStudentData}
          className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 mx-auto"
        >
          <BookOpen className="w-4 h-4" />
          Refresh Discord Data
        </button>
      </div>
    </div>
  )
}
