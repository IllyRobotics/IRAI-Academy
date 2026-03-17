export default function CourseCard({ icon, title, subtitle, features, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-300 cursor-pointer hover:translate-y-[-12px] hover:scale-105 hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/20 group"
    >
      {/* Gradient overlay */}
      <div className="h-48 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 relative" />
      
      {/* Content */}
      <div className="px-8 pt-8 pb-6 relative">
        <div className="w-20 h-20 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-2xl flex items-center justify-center text-4xl mb-6 relative z-10">
          {icon}
        </div>
        
        <h3 className="text-2xl font-bold mb-2 text-light font-space-grotesk">
          {title}
        </h3>
        
        <p className="text-gray mb-6">
          {subtitle}
        </p>
        
        <ul className="space-y-2 mb-6">
          {features.map((feature, idx) => (
            <li key={idx} className="text-gray flex items-center gap-3">
              <span className="text-indigo-500 font-bold">✓</span>
              {feature}
            </li>
          ))}
        </ul>
        
        <div className="flex items-center gap-2 text-indigo-500 font-semibold group-hover:gap-4 transition-all">
          <span>Explore Track</span>
          <span>→</span>
        </div>
      </div>
    </div>
  )
}
