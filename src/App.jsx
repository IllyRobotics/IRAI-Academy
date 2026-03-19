import { useState } from 'react'
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import WebDevelopmentPage from './pages/WebDevelopmentPage'
import MobileAppBuilderPage from './pages/MobileAppBuilderPage'
import BusinessBuilderPage from './pages/BusinessBuilderPage'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const showCourse = (courseType) => {
    setCurrentPage(courseType)
    window.scrollTo(0, 0)
  }

  const showHome = () => {
    setCurrentPage('home')
    window.scrollTo(0, 0)
  }

  // Expose functions to global scope for external access if needed
  window.showCourse = showCourse
  window.showHome = showHome

  return (
    <div className="bg-dark text-light min-h-screen relative">
      {/* Persistent IRAI Logo Watermark */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0" aria-hidden="true">
        <img 
          src="./IRAILOGO.jpg"
          alt=""
          className="w-[600px] h-[600px] md:w-[700px] md:h-[700px] lg:w-[800px] lg:h-[800px] object-contain opacity-[0.04] select-none"
          draggable="false"
        />
      </div>

      <div className="relative z-10">
        <Navigation currentPage={currentPage} showCourse={showCourse} showHome={showHome} />
        
        {currentPage === 'home' && <HomePage showCourse={showCourse} />}
        {currentPage === 'web-development' && <WebDevelopmentPage showHome={showHome} />}
        {currentPage === 'mobile-app-builder' && <MobileAppBuilderPage showHome={showHome} />}
        {currentPage === 'business-builder' && <BusinessBuilderPage showHome={showHome} />}
      </div>
    </div>
  )
}

export default App
