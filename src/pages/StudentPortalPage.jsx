import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDiscordAuth } from '../context/DiscordAuthContext'
import { usePayment } from '../context/PaymentContext'
import { curriculumData, roleToCurriculum } from '../data/curriculumData'
import CurriculumView from '../components/CurriculumView'
import CourseEnrollment from '../components/CourseEnrollment'
import ClassStatus from '../components/ClassStatus'
import InstructorControls from '../components/InstructorControls'
import NoAccessPage from '../components/NoAccessPage'
import { useClassStatus } from '../hooks/useClassStatus'

export default function StudentPortalPage() {
  const {
    user,
    loading,
    error,
    isAuthenticated,
    isInstructor,
    hasAccess,
    studentRoles,
    login,
    logout,
    ROLE_IDS,
    ROLE_LABELS,
  } = useDiscordAuth()

  const { isEnrolled } = usePayment()
  const [activeFilter, setActiveFilter] = useState('all')

  // Get enrolled course IDs for class status tracking
  const enrolledCourseIds = studentRoles
    .map(roleId => roleToCurriculum[roleId])
    .filter(Boolean)

  const { classStatuses, loading: statusLoading, error: statusError, refreshStatuses } = useClassStatus(enrolledCourseIds)

  // Determine which curricula to show
  function getVisibleCurricula() {
    if (isInstructor) {
      if (activeFilter === 'all') {
        return Object.values(curriculumData)
      }
      const key = roleToCurriculum[activeFilter]
      return key ? [curriculumData[key]] : Object.values(curriculumData)
    }

    // Student: show their assigned curricula plus available courses to enroll in
    const assignedCurricula = studentRoles
      .map(roleId => roleToCurriculum[roleId])
      .filter(Boolean)
      .map(key => curriculumData[key])

    // Add all available courses for enrollment
    const availableCourses = Object.values(curriculumData).filter(course => 
      !assignedCurricula.some(assigned => assigned.id === course.id)
    )

    return [...assignedCurricula, ...availableCourses]
  }

  // --- Loading State ---
  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <p className="text-gray text-lg">Authenticating with Discord...</p>
        </div>
      </main>
    )
  }

  // --- Not Authenticated ---
  if (!isAuthenticated) {
    return (
      <main>
        <nav className="fixed top-20 left-0 right-0 z-40 border-b border-white/10 bg-dark/95 backdrop-blur-sm">
          <div className="container py-4">
            <Link to="/" className="text-gray hover:text-light transition-colors flex items-center gap-2">
              <span>←</span>
              <span>Back to Home</span>
            </Link>
          </div>
        </nav>

        <section className="min-h-screen flex items-center pt-40 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-10 top-0 left-1/4" />
            <div className="absolute w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-10 bottom-0 right-1/4" />
          </div>

          <div className="container relative z-10 text-center max-w-2xl mx-auto">
            <div className="inline-block text-6xl mb-6">🎓</div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-space-grotesk bg-gradient-to-r from-white via-purple-300 to-pink-500 bg-clip-text text-transparent">
              STUDENT PORTAL
            </h1>
            <p className="text-xl text-gray mb-12">
              Access your personalized IRAI Academy coursework, curriculum, and projects. Sign in with your Discord account to get started.
            </p>

            <button
              onClick={login}
              className="bg-[#5865F2] hover:bg-[#4752C4] px-8 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-lg hover:shadow-[#5865F2]/30 inline-flex items-center gap-3"
            >
              <svg width="24" height="24" viewBox="0 0 71 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.6882 44.9542 17.0423 44.6886 17.3802 44.4202C17.443 44.3699 17.5286 44.3585 17.6025 44.3897C29.2721 49.6979 41.8345 49.6979 53.3723 44.3897C53.4462 44.3557 53.5318 44.3671 53.5974 44.4174C53.9353 44.6858 54.2894 44.9542 54.6464 45.2082C54.7952 45.304 54.784 45.5041 54.645 45.5858C52.8764 46.6197 51.0376 47.4931 49.1067 48.2228C48.9808 48.2707 48.9248 48.4172 48.9864 48.5383C50.0502 50.6034 51.2676 52.5699 52.6105 54.435C52.6693 54.5139 52.7672 54.5477 52.8624 54.5195C58.6835 52.7249 64.5662 50.0174 70.6391 45.5576C70.6918 45.5182 70.7258 45.459 70.7314 45.3914C72.2317 30.0791 68.2352 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1627 26.2532 30.1099 30.1693C30.1099 34.1136 27.2802 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.937 34.1136 40.937 30.1693C40.937 26.225 43.7636 23.0133 47.3178 23.0133C50.8999 23.0133 53.7546 26.2532 53.7018 30.1693C53.7018 34.1136 50.8999 37.3253 47.3178 37.3253Z" fill="currentColor"/>
              </svg>
              Sign in with Discord
            </button>

            {error && (
              <p className="text-red-400 mt-6 text-sm">{error}</p>
            )}

            <p className="text-gray-500 text-sm mt-8">
              You must be a member of the IRAI Academy Discord server with an assigned student role to access coursework.
            </p>
          </div>
        </section>
      </main>
    )
  }

  // --- Authenticated but No Access ---
  if (!hasAccess) {
    return <NoAccessPage user={user} logout={logout} />
  }

  // --- Authenticated with Access ---
  const visibleCurricula = getVisibleCurricula()

  return (
    <main>
      {/* Sub Navigation */}
      <nav className="fixed top-20 left-0 right-0 z-40 border-b border-white/10 bg-dark/95 backdrop-blur-sm">
        <div className="container py-4 flex justify-between items-center">
          <Link to="/" className="text-gray hover:text-light transition-colors flex items-center gap-2">
            <span>←</span>
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {user.avatar ? (
                <img
                  src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=32`}
                  alt=""
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold">
                  {user.username?.[0]?.toUpperCase()}
                </div>
              )}
              <span className="text-sm text-gray-300 hidden sm:inline">{user.global_name || user.username}</span>
            </div>
            <button
              onClick={logout}
              className="text-gray-400 hover:text-red-400 transition-colors text-sm"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* Portal Header */}
      <section className="pt-44 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-10 top-0 left-1/4" />
          <div className="absolute w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-10 bottom-0 right-1/4" />
        </div>

        <div className="container relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-space-grotesk bg-gradient-to-r from-white via-purple-300 to-pink-500 bg-clip-text text-transparent">
              {isInstructor ? 'INSTRUCTOR DASHBOARD' : 'MY STUDENT PORTAL'}
            </h1>
            <p className="text-gray text-lg">
              {isInstructor
                ? 'View and manage all course curricula across all student tracks'
                : 'Your personalized coursework and curriculum'}
            </p>
          </div>

          {/* Role badges */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {isInstructor && (
              <span className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-3 py-1 rounded-full text-sm font-semibold">
                🎓 IRAI Instructor
              </span>
            )}
            {studentRoles.map(roleId => {
              const key = roleToCurriculum[roleId]
              if (!key) return null
              const c = curriculumData[key]
              return (
                <span key={roleId} className={`bg-white/5 border ${c.borderClass} px-3 py-1 rounded-full text-sm ${c.colorClass}`}>
                  {c.icon} {c.roleName}
                </span>
              )
            })}
          </div>

          {/* Instructor Course Filter */}
          {isInstructor && (
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeFilter === 'all'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                    : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/30'
                }`}
              >
                All Courses
              </button>
              {Object.entries(roleToCurriculum).map(([roleId, key]) => {
                const c = curriculumData[key]
                return (
                  <button
                    key={roleId}
                    onClick={() => setActiveFilter(roleId)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      activeFilter === roleId
                        ? `bg-gradient-to-r ${c.bgClass} text-white shadow-lg`
                        : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/30'
                    }`}
                  >
                    {c.icon} {c.title}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Curriculum Content */}
      <section className="pb-20">
        <div className="container">
          {visibleCurricula.map(curriculum => {
            const isAssignedToStudent = studentRoles.some(roleId => roleToCurriculum[roleId] === curriculum.id)
            const hasEnrolled = isEnrolled(curriculum.id)
            const canAccess = isAssignedToStudent || hasEnrolled

            return (
              <div key={curriculum.id} className="mb-16">
                {canAccess ? (
                  <>
                    {/* Instructor Controls */}
                    {isInstructor && (
                      <div className="mb-6">
                        <InstructorControls 
                          courseId={curriculum.id}
                          courseTitle={curriculum.title}
                          onStatusUpdate={refreshStatuses}
                        />
                      </div>
                    )}
                    
                    {/* Class Status for enrolled courses */}
                    {isAssignedToStudent && (
                      <div className="mb-6">
                        <ClassStatus 
                          courseId={curriculum.id}
                          status={classStatuses[curriculum.id]}
                          loading={statusLoading}
                          onRefresh={() => refreshStatuses()}
                        />
                      </div>
                    )}
                    
                    <CurriculumView 
                      curriculum={curriculum} 
                      isInstructor={isInstructor} 
                    />
                  </>
                ) : (
                  <CourseEnrollment courseId={curriculum.id} />
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="container text-center">
          <div className="text-xl font-bold mb-2 font-space-grotesk">IRAI ACADEMY</div>
          <p className="text-gray">Buffalo, NY • Remote-Friendly • Powered by Illy Robotic Instruments</p>
        </div>
      </footer>
    </main>
  )
}
