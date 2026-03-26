import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import WebDevelopmentPage from './pages/WebDevelopmentPage'
import MobileAppBuilderPage from './pages/MobileAppBuilderPage'
import BusinessBuilderPage from './pages/BusinessBuilderPage'
import ContentCreationPage from './pages/ContentCreationPage'
import StudentPortalPage from './pages/StudentPortalPage'
import CourseCatalogPage from './pages/CourseCatalogPage'
import InstructorDashboard from './components/InstructorDashboard'
import { DiscordAuthProvider } from './context/DiscordAuthContext'
import { PaymentProvider } from './context/PaymentContext'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
      }, 0)
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  return null
}

function App() {
  return (
    <DiscordAuthProvider>
      <PaymentProvider>
        <div className="bg-dark text-light min-h-screen relative">
          {/* Persistent IRAI Logo Watermark */}
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0" aria-hidden="true">
            <img 
              src={`${import.meta.env.BASE_URL}IRAILOGO.jpg`}
              alt=""
              className="w-[600px] h-[600px] md:w-[700px] md:h-[700px] lg:w-[800px] lg:h-[800px] object-contain opacity-[0.04] select-none"
              draggable="false"
            />
          </div>

          <ScrollToTop />
          <div className="relative z-10">
            <Navigation />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/Web-Development" element={<WebDevelopmentPage />} />
              <Route path="/Mobile-App-Builder" element={<MobileAppBuilderPage />} />
              <Route path="/Business-Builder" element={<BusinessBuilderPage />} />
              <Route path="/Content-Creation" element={<ContentCreationPage />} />
              <Route path="/student-portal" element={<StudentPortalPage />} />
              <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
              <Route path="/courses" element={<CourseCatalogPage />} />
            </Routes>
          </div>
        </div>
      </PaymentProvider>
    </DiscordAuthProvider>
  )
}

export default App
