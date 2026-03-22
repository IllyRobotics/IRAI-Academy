import { Link } from 'react-router-dom'
import CourseCard from '../components/CourseCard'
import TeacherCard from '../components/TeacherCard'
import WebDevelopmentPage from './WebDevelopmentPage'
import MobileDevelopmentPage from './MobileDevelopmentPage'
import AIMachineLearningPage from './AIMachineLearningPage'

export default function HomePage() {
  const courses = [
    {
      id: 'web-development',
      path: '/Web-Development',
      icon: '🌐',
      title: 'WEB DEVELOPMENT',
      subtitle: 'Modern web apps with AI assistance',
      features: [
        'React.js & Next.js mastery',
        'AI-powered debugging',
        'Cloud deployment',
        'Full-stack architecture'
      ]
    },
    {
      id: 'mobile-app-builder',
      path: '/Mobile-App-Builder',
      icon: '📱',
      title: 'MOBILE DEVELOPMENT',
      subtitle: 'Cross-platform mobile applications',
      features: [
        'React Native expertise',
        'Native device integration',
        'App store optimization',
        'Performance tuning'
      ]
    },
    {
      id: 'ai-machine-learning',
      icon: '🤖',
      title: 'AI & MACHINE LEARNING',
      subtitle: 'Build intelligent systems that learn and adapt',
      features: [
        'Neural networks & deep learning',
        'Computer vision & NLP',
        'Predictive analytics',
        'AI ethics & safety'
      ]
    },
    {
      id: 'business-builder',
      path: '/Business-Builder',
      icon: '💼',
      title: 'BUSINESS BUILDER',
      subtitle: 'Turn ideas into profitable products',
      features: [
        'No-code development',
        'Business model validation',
        'Growth strategies',
        'Funding preparation'
      ]
    },
    {
      id: 'content-creation',
      path: '/Content-Creation',
      icon: '🎬',
      title: 'CONTENT CREATION',
      subtitle: 'Build your audience and brand',
      features: [
        'Video production & editing',
        'Live streaming mastery',
        'Social media branding',
        'Monetization strategies'
      ]
    }
  ]

  return (
    <main>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-20 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-10 top-0 left-1/4 animate-float" />
          <div className="absolute w-96 h-96 bg-pink-600 rounded-full blur-3xl opacity-10 bottom-0 right-1/4" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block bg-indigo-600/10 border border-indigo-600/30 px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
              <span className="text-indigo-500 font-semibold text-sm">The Future of Developer Education</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-space-grotesk bg-gradient-to-r from-white via-purple-300 to-pink-500 bg-clip-text text-transparent">
              AI-DRIVEN DEVELOPMENT REVOLUTION
            </h1>

            <p className="text-xl text-gray mb-12 max-w-2xl mx-auto">
              Master modern development with cutting-edge AI tools. From web apps to mobile solutions to complete businesses—launch your career with real-world projects.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {[
                { number: '12', label: 'Weeks' },
                { number: '4', label: 'Real Projects' },
                { number: '$299', label: 'Investment' },
                { number: '100%', label: 'Guaranteed' }
              ].map((stat, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-all">
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button 
              onClick={() => document.getElementById('courses').scrollIntoView({ behavior: 'smooth' })}
              className="btn btn-primary"
            >
              <span>Start Your Journey</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 relative overflow-hidden" id="about">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-32 h-32 bg-indigo-500 rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500 rounded-full blur-2xl animate-pulse delay-1000" />
        </div>
        
        <div className="container relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
              <span className="text-indigo-400 font-semibold text-sm uppercase tracking-wider">About</span>
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
            </div>
            <h2 className="section-title bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              About IRAI ACADEMY
            </h2>
            <p className="section-subtitle flex items-center justify-center gap-2 mt-4">
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                Powered by Illy Robotic Instruments
              </span>
              <span className="text-gray-600">•</span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-500" />
                Buffalo, NY
              </span>
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                <p className="text-gray-300 text-lg leading-relaxed">
                  IRAI Academy is a next-generation learning platform designed for the AI era. We combine hands-on project-based learning with cutting-edge AI tools to accelerate your development journey. Our courses are built with industry professionals and cover real-world technologies used by top companies. Every project in our curriculum is designed to be portfolio-ready and employer-impressive.
                </p>
              </div>
              <div className="flex justify-center md:justify-end">
                <img 
                  src="./img2.jpg" 
                  alt="IRAI Academy" 
                  className="rounded-2xl max-w-full h-auto shadow-2xl"
                  style={{ maxHeight: '400px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section relative" id="features">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.5) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        <div className="container relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
              <span className="text-purple-400 font-semibold text-sm uppercase tracking-wider">Features</span>
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
            </div>
            <h2 className="section-title bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
              Why Choose IRAI?
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Discover the advantages that set our learning platform apart from traditional education
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-3">AI-Powered Learning</h3>
              <p className="text-gray-300 mb-4">
                Learn to work alongside AI tools like GitHub Copilot and ChatGPT for faster, smarter development.
              </p>
              <div className="text-gray-400 space-y-1 text-sm">
                <p>GitHub Copilot</p>
                <p>ChatGPT Integration</p>
                <p>AI Code Review</p>
                <p>Smart Suggestions</p>
              </div>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-3">Real Projects</h3>
              <p className="text-gray-300 mb-4">
                Build portfolio-worthy projects from day one that will impress employers and clients.
              </p>
              <div className="text-gray-400 space-y-1 text-sm">
                <p>Portfolio Ready</p>
                <p>Live Deployment</p>
                <p>Client Projects</p>
                <p>Open Source</p>
              </div>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-3">Community Support</h3>
              <p className="text-gray-300 mb-4">
                Join our Discord community of developers, get feedback, and collaborate with peers.
              </p>
              <div className="text-gray-400 space-y-1 text-sm">
                <p>24/7 Discord</p>
                <p>Code Reviews</p>
                <p>Pair Programming</p>
                <p>Mentorship</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Instructors Section */}
      <section className="section bg-white/[0.02] relative overflow-hidden" id="teachers">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-0 w-72 h-72 bg-indigo-600 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-purple-600 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
              <span className="text-indigo-400 font-semibold text-sm uppercase tracking-wider">Our Team</span>
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
            </div>
            <h2 className="section-title bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Meet the Instructors
            </h2>
            <p className="section-subtitle mt-4">The minds behind IRAI Academy's cutting-edge curriculum</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                name: 'ILLYMEDS',
                title: 'Founder, Illy Robotic Instruments',
                image: './illymeds-1.jpg',
                bio: 'Visionary founder of Illy Robotic Instruments and the driving force behind IRAI Academy. A pioneering full-stack developer with deep expertise in AI-powered applications, React, Node.js, and cloud architecture. Illymeds built IRAI Academy to revolutionize developer education by combining hands-on project-based learning with cutting-edge AI tools, empowering the next generation of developers to build portfolio-ready, real-world applications from day one.',
                courses: [
                  { icon: '🌐', label: 'Web Development' },
                  { icon: '🎬', label: 'Content Creator Training' }
                ],
                expertise: ['React.js', 'Node.js', 'AI/ML', 'Cloud Architecture', 'Full-Stack', 'DevOps'],
                accentGradient: 'from-indigo-500 via-blue-500 to-cyan-500'
              },
              {
                name: 'BABIX',
                title: 'IRAI Chief Architect & Course Instructor',
                image: './babix.jpg',
                bio: 'IRAI\'s Chief Architect and a versatile software engineer specializing in full-stack development, mobile applications, and UX design. Babix is the creative engine behind IRAI\'s course content — curating all demonstration videos, hands-on coursework, and help materials that power the academy. Beyond coding, he teaches aspiring creators how to stream, build an audience, and become professional content creators. His mission is making development accessible through clear, engaging instruction.',
                courses: [
                  { icon: '🌐', label: 'Web Development' },
                  { icon: '⚛️', label: 'React.js' },
                  { icon: '🟢', label: 'Node.js' },
                  { icon: '📡', label: 'Streaming' },
                  { icon: '🎬', label: 'Content Creator' }
                ],
                expertise: ['React.js', 'Node.js', 'Web Dev', 'Streaming', 'Content Creator'],
                accentGradient: 'from-purple-500 via-pink-500 to-rose-500'
              },
              {
                name: 'RUSH',
                title: 'Chief Architect, Illy Rush Gaming (IRG) & Web3 Course Instructor',
                image: './rush.jpg',
                bio: 'Chief Architect and engineer of Illy Rush Gaming (IRG), Rush spearheads the design and development of next-generation Web3 gaming experiences. A seasoned Web3 developer with expertise in blockchain technology, smart contracts, and decentralized applications, Rush brings real-world industry experience to the classroom. As IRAI\'s Web3 course instructor, he guides students through the rapidly evolving landscape of decentralized development, tokenomics, and building on-chain applications.',
                courses: [
                  { icon: '⛓️', label: 'Web3 Development' },
                  { icon: '🎮', label: 'Blockchain Gaming' }
                ],
                expertise: ['Web3', 'Solidity', 'Smart Contracts', 'DApps', 'Blockchain', 'Game Architecture'],
                accentGradient: 'from-emerald-500 via-teal-500 to-cyan-500'
              }
            ].map((teacher, idx) => (
              <TeacherCard key={idx} teacher={teacher} />
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="section" id="courses">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">Choose Your Path</h2>
            <p className="section-subtitle">Specialized tracks for different career goals</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {courses.map(course => (
              <CourseCard
                key={course.id}
                icon={course.icon}
                title={course.title}
                subtitle={course.subtitle}
                features={course.features}
                to={course.path}
              />
            ))}
          </div>
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
