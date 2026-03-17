export default function Navigation({ currentPage, showHome }) {
  return (
    <nav className="fixed top-0 w-full bg-dark/95 backdrop-blur-md border-b border-white/10 z-50">
      <div className="container flex justify-between items-center h-20">
        <div className="flex items-center gap-4">
          <img 
            src="./IRAILOGO.jpg" 
            alt="IRAI Academy" 
            className="h-12 w-auto cursor-pointer"
            onClick={showHome}
          />
          <div className="text-2xl font-bold font-space-grotesk bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            IRAI ACADEMY
          </div>
        </div>
        
        <div className="hidden md:flex gap-8 items-center">
          <a href="#about" className="text-gray-400 hover:text-light transition-colors">About</a>
          <a href="#features" className="text-gray-400 hover:text-light transition-colors">Features</a>
          <a href="#courses" className="text-gray-400 hover:text-light transition-colors">Courses</a>
          <a href="https://discord.gg/badyP2uTXP" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-indigo-500/30 transition-all">
            Join Discord
          </a>
        </div>
      </div>
    </nav>
  )
}
