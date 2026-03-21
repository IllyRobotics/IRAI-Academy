import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Navigation() {
  const location = useLocation()
  const navigate = useNavigate()

  const scrollToSection = (e, id) => {
    e.preventDefault()
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/#' + id)
    }
  }

  return (
    <nav className="fixed top-0 w-full bg-dark/95 backdrop-blur-md border-b border-white/10 z-50">
      <div className="container flex justify-between items-center h-20">
        <Link to="/" className="flex items-center gap-4">
          <img 
            src={import.meta.env.BASE_URL + 'IRAILOGO.jpg'} 
            alt="IRAI Academy" 
            className="h-12 w-auto cursor-pointer"
          />
          <div className="text-2xl font-bold font-space-grotesk bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            IRAI ACADEMY
          </div>
        </Link>
        
        <div className="hidden md:flex gap-8 items-center">
          <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="text-gray-400 hover:text-light transition-colors cursor-pointer">About</a>
          <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="text-gray-400 hover:text-light transition-colors cursor-pointer">Features</a>
          <a href="#courses" onClick={(e) => scrollToSection(e, 'courses')} className="text-gray-400 hover:text-light transition-colors cursor-pointer">Courses</a>
          <a href="https://discord.gg/badyP2uTXP" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-indigo-500/30 transition-all">
            Join Discord
          </a>
        </div>
      </div>
    </nav>
  )
}
