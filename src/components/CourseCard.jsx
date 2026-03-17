export default function CourseCard({ icon, title, subtitle, features, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-300 cursor-pointer group"
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
        e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.4)';
        e.currentTarget.style.boxShadow = '0 41px 120px rgba(99, 102, 241, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Gradient overlay */}
      <div 
        className="h-48 relative" 
        style={{
          background: 'linear-gradient(to right, rgba(99, 102, 241, 0.1), rgba(147, 51, 234, 0.1))',
        }}
      />
      
      {/* Content */}
      <div className="px-8 pt-8 pb-6 relative">
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-6 relative z-10" style={{
          background: 'linear-gradient(to right, #4f46e5, #6366f1)',
        }}>
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
