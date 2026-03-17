export default function ProjectCard({ icon, title, description }) {
  return (
    <div className="hollow-card">
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
