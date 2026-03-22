import ProjectCard from '../components/ProjectCard'
import PhaseCard from '../components/PhaseCard'

export default function MobileDevelopmentPage({ showHome }) {
  return (
    <main>
      {/* Back Navigation */}
      <nav className="fixed top-20 left-0 right-0 z-40 border-b border-white/10 bg-dark/95 backdrop-blur-sm">
        <div className="container py-4">
          <button 
            onClick={showHome}
            className="text-gray hover:text-light transition-colors flex items-center gap-2"
          >
            <span>←</span>
            <span>Back to Home</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-40 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-10 top-0 left-1/4 animate-float" />
          <div className="absolute w-96 h-96 bg-pink-600 rounded-full blur-3xl opacity-10 bottom-0 right-0 animate-pulse" />
        </div>

        <div className="container relative z-10 text-center">
          <div className="inline-block text-6xl mb-6">📱</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-space-grotesk bg-gradient-to-r from-white via-purple-300 to-pink-500 bg-clip-text text-transparent">
            MOBILE DEVELOPMENT
          </h1>
          <p className="text-xl text-gray mb-12 max-w-2xl mx-auto">
            Build native and cross-platform mobile applications with modern frameworks and AI-powered development tools
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '12', label: 'Weeks' },
              { number: '3', label: 'Mobile Apps' },
              { number: '$299', label: 'Total Investment' },
              { number: '100%', label: 'App Store Ready' }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/8 transition-all">
                <div className="text-2xl font-bold text-indigo-500 mb-1">
                  {stat.number}
                </div>
                <div className="text-gray text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Build */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">What You'll Build</h2>
            <p className="section-subtitle">Cross-platform mobile applications that work seamlessly on iOS and Android</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <ProjectCard
              icon="📱"
              title="Fitness Tracking App"
              description="Build a comprehensive fitness app with workout tracking, progress monitoring, and social features. Learn React Native, state management, and mobile-first design principles."
            />
            <ProjectCard
              icon="🛍"
              title="Recipe Discovery Platform"
              description="Create a mobile-first recipe app with image recognition, meal planning, and nutritional tracking. Master API integration and offline functionality."
            />
            <ProjectCard
              icon="💬"
              title="Language Learning App"
              description="Develop an interactive language learning application with speech recognition, flashcards, and progress tracking. Learn mobile UX patterns and educational app design."
            />
          </div>
        </div>
      </section>

      {/* Learning Journey Timeline */}
      <section className="section bg-white/[0.02]">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">12-Week Mobile Development Journey</h2>
            <p className="section-subtitle">From concept to App Store deployment</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <PhaseCard
              phase="1"
              title="Foundation Mastery"
              items={[
                'React Native fundamentals & Expo setup',
                'Mobile-first design principles',
                'Navigation & state management',
                'Platform-specific optimizations',
                'Project: Fitness tracking app prototype'
              ]}
            />
            <PhaseCard
              phase="2"
              title="Advanced Mobile Skills"
              items={[
                'Native module integration',
                'Push notifications & background services',
                'Camera & sensor integration',
                'Performance optimization',
                'Project: Recipe discovery platform'
              ]}
            />
            <PhaseCard
              phase="3"
              title="Production Deployment"
              items={[
                'App Store optimization & submission',
                'Cross-platform testing strategies',
                'Analytics & crash reporting',
                'Monetization & in-app purchases',
                'Project: Language learning app'
              ]}
            />
            <PhaseCard
              phase="4"
              title="Mobile Expert Launch"
              items={[
                'Advanced animations & gestures',
                'Offline-first architecture',
                'Security & data protection',
                'AI-powered mobile features',
                'Project: Complete mobile portfolio'
              ]}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container text-center">
          <h2 className="section-title mb-6">Ready to Become a Mobile Dev Expert?</h2>
          <p className="section-subtitle mb-12">Join hundreds of students who've launched successful mobile apps</p>
          <a
            href="https://discord.gg/badyP2uTXP"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary inline-flex"
          >
            Join Our Discord Community
          </a>
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
