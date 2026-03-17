import CourseCard from '../components/CourseCard'

export default function HomePage({ showCourse }) {
  const courses = [
    {
      id: 'web-development',
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
      icon: '📱',
      title: 'MOBILE APP BUILDER',
      subtitle: 'Cross-platform mobile development',
      features: [
        'React Native expertise',
        'Native device integration',
        'App store optimization',
        'Performance tuning'
      ]
    },
    {
      id: 'business-builder',
      icon: '💼',
      title: 'BUSINESS BUILDER',
      subtitle: 'Turn ideas into profitable products',
      features: [
        'No-code development',
        'Business model validation',
        'Growth strategies',
        'Funding preparation'
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
      <section className="section bg-white/[0.02]" id="about">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">About IRAI ACADEMY</h2>
            <p className="section-subtitle">Powered by Illy Robotic Instruments • Buffalo, NY</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6 text-gray text-lg">
            <p>
              IRAI Academy is a next-generation learning platform designed for the AI era. We combine hands-on project-based learning with cutting-edge AI tools to accelerate your development journey.
            </p>
            <p>
              Our courses are built with industry professionals and cover real-world technologies used by top companies. Every project in our curriculum is designed to be portfolio-ready and employer-impressive.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section" id="features">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">Why Choose IRAI?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🤖',
                title: 'AI-Powered Learning',
                description: 'Learn to work alongside AI tools like GitHub Copilot and ChatGPT for faster, smarter development.'
              },
              {
                icon: '🎯',
                title: 'Real Projects',
                description: 'Build portfolio-worthy projects from day one that will impress employers and clients.'
              },
              {
                icon: '👥',
                title: 'Community Support',
                description: 'Join our Discord community of developers, get feedback, and collaborate with peers.'
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/8 transition-all">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 font-space-grotesk">{feature.title}</h3>
                <p className="text-gray">{feature.description}</p>
              </div>
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

          <div className="grid md:grid-cols-3 gap-8">
            {courses.map(course => (
              <CourseCard
                key={course.id}
                icon={course.icon}
                title={course.title}
                subtitle={course.subtitle}
                features={course.features}
                onClick={() => showCourse(course.id)}
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
