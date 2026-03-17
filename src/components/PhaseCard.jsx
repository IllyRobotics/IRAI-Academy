export default function PhaseCard({ phase, title, items }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-indigo-500/30 transition-all">
      <div className="text-indigo-500 font-bold text-sm mb-3 font-space-grotesk">
        Phase {phase}
      </div>
      <h3 className="text-xl font-bold text-white mb-4 font-space-grotesk">
        {title}
      </h3>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="text-gray text-sm flex items-start gap-2">
            <span className="text-indigo-500 mt-1">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
