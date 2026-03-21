import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import PhaseCard from '../components/PhaseCard'

export default function ContentCreationPage() {
  return (
    <main>
      {/* Back Navigation */}
      <nav className="fixed top-20 left-0 right-0 z-40 border-b border-white/10 bg-dark/95 backdrop-blur-sm">
        <div className="container py-4">
          <Link to="/" className="text-gray hover:text-light transition-colors flex items-center gap-2">
            <span>←</span>
            <span>Back to Home</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-40 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-rose-600 rounded-full blur-3xl opacity-10" />
          <div className="absolute w-96 h-96 bg-amber-600 rounded-full blur-3xl opacity-10 bottom-0 right-0 animate-pulse" />
        </div>

        <div className="container relative z-10 text-center">
          <div className="inline-block text-6xl mb-6">🎬</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-space-grotesk bg-gradient-to-r from-white via-purple-300 to-pink-500 bg-clip-text text-transparent">
            CONTENT CREATION
          </h1>
          <p className="text-xl text-gray mb-12 max-w-2xl mx-auto">
            Master content creation, streaming, and audience building with AI-driven workflows and modern tools
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '12', label: 'Weeks' },
              { number: '4', label: 'Hands-on Projects' },
              { number: '$299', label: 'Total Investment' },
              { number: 'Real-World', label: 'Skills' }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/8 transition-all">
                <div className="text-2xl font-bold text-rose-500 mb-1">{stat.number}</div>
                <div className="text-gray text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Create */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">What You'll Create</h2>
            <p className="section-subtitle">Real-world projects designed to showcase your creative skills and build a professional content brand.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <ProjectCard icon="🎥" title="YouTube Channel Launch" description="Plan, produce, and publish your first series of high-quality videos. Learn scripting, filming techniques, editing workflows, and YouTube SEO to grow your channel from zero." />
            <ProjectCard icon="📡" title="Live Streaming Setup" description="Build a professional streaming environment on Twitch or YouTube Live. Master OBS, overlays, alerts, audience interaction, and monetization strategies for live content." />
            <ProjectCard icon="📸" title="Social Media Brand" description="Create a cohesive personal brand across Instagram, TikTok, and Twitter. Learn content calendars, graphic design with AI tools, copywriting, and analytics-driven growth." />
            <ProjectCard icon="🎙️" title="Podcast Production" description="Launch a professional podcast from concept to distribution. Learn audio recording, editing, guest booking, show notes, and multi-platform publishing strategies." />
          </div>
        </div>
      </section>

      {/* Learning Journey Timeline */}
      <section className="section bg-white/[0.02]">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">12-Week Learning Journey</h2>
            <p className="section-subtitle">From beginner to professional content creator</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <PhaseCard phase="1" title="Creator Foundations" items={['Content strategy & niche selection', 'Camera, lighting & audio basics', 'Video editing fundamentals (Premiere/DaVinci)', 'AI tools for content ideation & scripting', 'Project: Launch your YouTube channel']} />
            <PhaseCard phase="2" title="Streaming Mastery" items={['OBS Studio setup & scene design', 'Custom overlays, alerts & chatbots', 'Audience engagement & community building', 'AI-assisted stream highlights & clips', 'Project: Go live on Twitch/YouTube']} />
            <PhaseCard phase="3" title="Brand & Growth" items={['Social media strategy & scheduling', 'Graphic design with Canva & AI generators', 'Copywriting & storytelling techniques', 'Analytics, SEO & algorithm optimization', 'Project: Build your social media brand']} />
            <PhaseCard phase="4" title="Monetization & Scale" items={['Sponsorship outreach & media kits', 'Merchandise & digital product creation', 'Multi-platform distribution & repurposing', 'AI-driven content automation & scaling', 'Project: Launch your podcast & monetize']} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container text-center">
          <h2 className="section-title mb-6">Ready to Become a Content Creator?</h2>
          <p className="section-subtitle mb-12">Join hundreds of creators who've built thriving audiences and turned their passion into a career</p>
          <a href="https://discord.gg/bBGfF5uq9K" target="_blank" rel="noopener noreferrer" className="btn btn-primary inline-flex">
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
