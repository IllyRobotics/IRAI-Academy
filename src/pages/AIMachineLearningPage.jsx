import ProjectCard from '../components/ProjectCard'
import PhaseCard from '../components/PhaseCard'

export default function AIMachineLearningPage({ showHome }) {
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
          <div className="inline-block text-6xl mb-6">🤖</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-space-grotesk bg-gradient-to-r from-white via-purple-300 to-pink-500 bg-clip-text text-transparent">
            AI & MACHINE LEARNING
          </h1>
          <p className="text-xl text-gray mb-12 max-w-2xl mx-auto">
            Master cutting-edge AI technologies and build intelligent systems that learn and adapt
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '12', label: 'Weeks' },
              { number: '6', label: 'AI Projects' },
              { number: '$299', label: 'Total Investment' },
              { number: '100%', label: 'Job Ready' }
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
            <p className="section-subtitle">AI-powered applications that solve real-world problems</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <ProjectCard
              icon="🧠"
              title="Chatbot Assistant"
              description="Build an intelligent conversational AI that can answer questions, provide recommendations, and assist users with natural language processing."
            />
            <ProjectCard
              icon="🎯"
              title="Predictive Analytics Dashboard"
              description="Create a machine learning dashboard that analyzes data patterns and provides actionable insights for business intelligence."
            />
            <ProjectCard
              icon="🖼️"
              title="Image Recognition System"
              description="Develop a computer vision system that can identify objects, faces, and scenes in real-time with deep learning models."
            />
            <ProjectCard
              icon="📊"
              title="Recommendation Engine"
              description="Build a collaborative filtering system that suggests content based on user behavior and preferences using ML algorithms."
            />
          </div>
        </div>
      </section>

      {/* Learning Journey Timeline */}
      <section className="section bg-white/[0.02]">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">12-Week AI Learning Journey</h2>
            <p className="section-subtitle">From basics to advanced AI applications</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <PhaseCard
              phase="1"
              title="Foundation Mastery"
              items={[
                'Python & TensorFlow fundamentals',
                'Neural networks & deep learning basics',
                'Data preprocessing & feature engineering',
                'AI ethics & responsible development',
                'Project: Basic chatbot prototype'
              ]}
            />
            <PhaseCard
              phase="2"
              title="Advanced AI Skills"
              items={[
                'Computer vision with OpenCV',
                'Natural language processing with transformers',
                'Reinforcement learning algorithms',
                'Model deployment & optimization',
                'Project: Image recognition system'
              ]}
            />
            <PhaseCard
              phase="3"
              title="AI Specialization"
              items={[
                'Advanced neural architectures',
                'Transfer learning & fine-tuning',
                'AI safety & bias mitigation',
                'Edge AI & mobile deployment',
                'Project: Complete AI portfolio'
              ]}
            />
            <PhaseCard
              phase="4"
              title="AI Career Launch"
              items={[
                'Industry-ready AI applications',
                'Research & innovation skills',
                'AI product development',
                'Ethical AI leadership',
                'Project: Capstone AI system'
              ]}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container text-center">
          <h2 className="section-title mb-6">Ready to Shape the Future with AI?</h2>
          <p className="section-subtitle mb-12">Join the next generation of AI engineers and innovators</p>
          <a
            href="https://discord.gg/badyP2uTXP"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary inline-flex"
          >
            Join Our AI Community
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
