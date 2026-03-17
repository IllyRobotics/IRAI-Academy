import ProjectCard from '../components/ProjectCard'
import PhaseCard from '../components/PhaseCard'

export default function MobileAppBuilderPage({ showHome }) {
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
          <div className="absolute w-96 h-96 bg-pink-600 rounded-full blur-3xl opacity-10" />
          <div className="absolute w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-10 bottom-0 right-0 animate-pulse" />
        </div>

        <div className="container relative z-10 text-center">
          <div className="inline-block text-6xl mb-6">📱</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-space-grotesk bg-gradient-to-r from-white via-purple-300 to-pink-500 bg-clip-text text-transparent">
            MOBILE APP BUILDER
          </h1>
          <p className="text-xl text-gray mb-12 max-w-2xl mx-auto">
            Master cross-platform mobile development with AI-driven workflows and cutting-edge technologies
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '12', label: 'Weeks' },
              { number: '4', label: 'Hands-on Projects' },
              { number: '$299', label: 'Total Investment' },
              { number: 'Real-World', label: 'Skills' }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/8 transition-all">
                <div className="text-2xl font-bold text-pink-500 mb-1">
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
            <p className="section-subtitle">Real-world projects designed to showcase your skills and make your portfolio stand out to employers.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <ProjectCard
              icon="✅"
              title="Todo App"
              description="Create a beautiful todo app with animations, notifications, and data persistence. Learn core React Native components and state management fundamentals."
            />
            <ProjectCard
              icon="💬"
              title="Social Media App"
              description="Build a real-time social platform with user profiles, posts, comments, and messaging. Learn authentication, real-time databases, and complex UI patterns."
            />
            <ProjectCard
              icon="🏃"
              title="Fitness Tracker"
              description="Build a comprehensive fitness tracking app with GPS integration, health data logging, and analytics. Learn native device integration and performance optimization."
            />
            <ProjectCard
              icon="📸"
              title="Photo Sharing App"
              description="Create a photo sharing platform with camera integration, filters, and cloud storage. Learn image processing, upload management, and app store deployment."
            />
          </div>
        </div>
      </section>

      {/* Learning Journey Timeline */}
      <section className="section bg-white/[0.02]">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">12-Week Learning Journey</h2>
            <p className="section-subtitle">From zero to mobile expert</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <PhaseCard
              phase="1"
              title="Mobile Foundations"
              items={[
                'React Native setup & environment',
                'Core components & navigation',
                'Mobile UI/UX principles',
                'AI tools for mobile development',
                'Project: Todo app with animations'
              ]}
            />
            <PhaseCard
              phase="2"
              title="Advanced Features"
              items={[
                'State management & data handling',
                'API integration & authentication',
                'Real-time databases & sync',
                'AI-assisted development patterns',
                'Project: Social media app'
              ]}
            />
            <PhaseCard
              phase="3"
              title="Native Integration"
              items={[
                'Camera, GPS & sensor integration',
                'Push notifications & background tasks',
                'Offline storage & data persistence',
                'AI-powered testing & debugging',
                'Project: Fitness tracking app'
              ]}
            />
            <PhaseCard
              phase="4"
              title="Production Deployment"
              items={[
                'App Store & Play Store publishing',
                'Performance optimization & monitoring',
                'Monetization & analytics',
                'AI-driven user acquisition',
                'Project: Launch your app'
              ]}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container text-center">
          <h2 className="section-title mb-6">Ready to Become a Mobile Dev Expert?</h2>
          <p className="section-subtitle mb-12">Join hundreds of students who've transformed their careers</p>
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
