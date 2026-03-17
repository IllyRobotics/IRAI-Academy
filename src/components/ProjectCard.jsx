export default function ProjectCard({ icon, title, description }) {
  return (
    <div 
      className="rounded-xl p-8 transition-all duration-500 cursor-pointer relative"
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
        e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
        e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.2)';
      }}
    >
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-3 font-space-grotesk">
        {title}
      </h3>
      <p className="text-gray leading-relaxed">
        {description}
      </p>
    </div>
  )
}
