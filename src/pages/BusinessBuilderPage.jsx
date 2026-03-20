import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import PhaseCard from '../components/PhaseCard'

export default function BusinessBuilderPage() {
  return (
    <main>
      {/* Back Navigation */}
      <nav className="fixed top-20 left-0 right-0 z-40 border-b border-white/10 bg-dark/95 backdrop-blur-sm">
        <div className="container py-4">
          <Link 
            to="/"
            className="text-gray hover:text-light transition-colors flex items-center gap-2"
          >
            <span>←</span>
            <span>Back to Home</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-40 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-cyan-600 rounded-full blur-3xl opacity-10" />
          <div className="absolute w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-10 bottom-0 right-0 animate-pulse" />
        </div>

        <div className="container relative z-10 text-center">
          <div className="inline-block text-6xl mb-6">💼</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-space-grotesk bg-gradient-to-r from-white via-purple-300 to-pink-500 bg-clip-text text-transparent">
            BUSINESS BUILDER
          </h1>
          <p className="text-xl text-gray mb-12 max-w-2xl mx-auto">
            Master entrepreneurship with AI-driven strategies and cutting-edge business tools
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '12', label: 'Weeks' },
              { number: '4', label: 'Hands-on Projects' },
              { number: '$299', label: 'Total Investment' },
              { number: 'Real-World', label: 'Skills' }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/8 transition-all">
                <div className="text-2xl font-bold text-cyan-500 mb-1">
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

      {/* What You'll Launch */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">What You'll Launch</h2>
            <p className="section-subtitle">Real-world businesses designed to showcase your entrepreneurial skills and make your career stand out to investors.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <ProjectCard
              icon="💡"
              title="Validated Business Concept"
              description="Research and validate your business idea through market analysis, customer interviews, and competitive analysis. Create a compelling business model canvas ready for investors."
            />
            <ProjectCard
              icon="🚀"
              title="Launchable MVP"
              description="Build your minimum viable product using no-code platforms and AI tools. Design user experience, integrate payments, and prepare for your first customers."
            />
            <ProjectCard
              icon="👥"
              title="First 100 Users"
              description="Execute growth strategies to acquire your first paying customers. Learn digital marketing, community building, and user acquisition tactics to grow your user base."
            />
            <ProjectCard
              icon="💰"
              title="Sustainable Business"
              description="Build a sustainable business model with recurring revenue. Learn funding strategies, team building, and scaling operations for long-term success."
            />
          </div>
        </div>
      </section>

      {/* Learning Journey Timeline */}
      <section className="section bg-white/[0.02]">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">12-Week Learning Journey</h2>
            <p className="section-subtitle">From idea to launching your business</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <PhaseCard
              phase="1"
              title="Foundation Mastery"
              items={[
                'Market research & competitor analysis',
                'Customer discovery & interviews',
                'Business model canvas creation',
                'AI tools for business planning',
                'Project: Validated business concept'
              ]}
            />
            <PhaseCard
              phase="2"
              title="MVP Excellence"
              items={[
                'No-code platform mastery',
                'Product design & UX principles',
                'Payment integration & monetization',
                'AI-assisted product development',
                'Project: Build your MVP'
              ]}
            />
            <PhaseCard
              phase="3"
              title="Growth Architecture"
              items={[
                'Digital marketing & SEO strategies',
                'User acquisition & conversion optimization',
                'Analytics & data-driven decisions',
                'AI-powered growth hacking',
                'Project: Launch with 100 users'
              ]}
            />
            <PhaseCard
              phase="4"
              title="Production Scaling"
              items={[
                'Funding & investment strategies',
                'Team building & delegation',
                'Business automation & processes',
                'Operations & scaling for growth',
                'Project: Scale your sustainable business'
              ]}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container text-center">
          <h2 className="section-title mb-6">Ready to Become a Business Builder?</h2>
          <p className="section-subtitle mb-12">Join hundreds of entrepreneurs who've transformed their ideas into successful businesses</p>
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
