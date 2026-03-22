import { useState } from 'react'

export default function TeacherCard({ teacher }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="group relative w-full max-w-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect behind card */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${teacher.accentGradient || 'from-indigo-500 via-purple-500 to-pink-500'} rounded-2xl blur-lg transition-opacity duration-500 ${isHovered ? 'opacity-40' : 'opacity-0'}`} />
      
      <div className="relative bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 rounded-2xl border border-white/10 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-white/20">
        {/* Animated top accent bar */}
        <div className={`h-1 bg-gradient-to-r ${teacher.accentGradient || 'from-indigo-500 via-purple-500 to-pink-500'} transition-all duration-500 ${isHovered ? 'h-1.5' : ''}`} />
        
        {/* Header section */}
        <div className="p-6 pb-4">
          <div className="flex items-start gap-5">
            {/* Profile image with animated ring */}
            <div className="relative flex-shrink-0">
              <div className={`absolute -inset-1 bg-gradient-to-r ${teacher.accentGradient || 'from-indigo-500 via-purple-500 to-pink-500'} rounded-full transition-all duration-500 ${isHovered ? 'opacity-100 animate-spin-slow' : 'opacity-60'}`} style={{ animationDuration: '8s' }} />
              <img 
                src={teacher.image}
                alt={teacher.name}
                className="relative w-20 h-20 rounded-full object-cover border-2 border-slate-800 shadow-xl"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${teacher.name}&background=6366f1&color=fff&size=160`
                }}
              />
              {/* Online indicator */}
              <div className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-500 rounded-full border-2 border-slate-800 shadow-lg">
                <div className="w-full h-full bg-emerald-400 rounded-full animate-ping opacity-75" />
              </div>
            </div>
            
            {/* Name & Title */}
            <div className="flex-1 min-w-0 pt-1">
              <h3 className="text-xl font-bold text-white font-space-grotesk tracking-wide">{teacher.name}</h3>
              <p className={`text-sm font-medium mt-1 bg-gradient-to-r ${teacher.accentGradient || 'from-indigo-400 to-purple-400'} bg-clip-text text-transparent leading-snug`}>
                {teacher.title}
              </p>
            </div>
          </div>
        </div>

        {/* Course Badges */}
        <div className="px-6 pb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${teacher.accentGradient || 'from-indigo-500 to-purple-500'}`} />
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Courses</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {teacher.courses.map((course, idx) => (
              <span 
                key={idx}
                className="inline-flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-gray-200 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 cursor-default"
              >
                <span>{course.icon}</span>
                <span>{course.label}</span>
              </span>
            ))}
          </div>
        </div>
        
        {/* Bio Summary - Expandable */}
        <div className="px-6 pb-4">
          <div className={`relative bg-white/[0.03] rounded-xl border border-white/5 p-4 transition-all duration-500 ${isExpanded ? 'max-h-[400px]' : 'max-h-[120px]'} overflow-hidden`}>
            <p className="text-gray-400 text-sm leading-relaxed">{teacher.bio}</p>
            {!isExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-slate-900/90 to-transparent pointer-events-none rounded-b-xl" />
            )}
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`mt-2 text-xs font-semibold transition-all duration-300 bg-gradient-to-r ${teacher.accentGradient || 'from-indigo-400 to-purple-400'} bg-clip-text text-transparent hover:opacity-80`}
          >
            {isExpanded ? '← Show Less' : 'Read More →'}
          </button>
        </div>

        {/* Expertise Tags */}
        <div className="px-6 pb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${teacher.accentGradient || 'from-indigo-500 to-purple-500'}`} />
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Expertise</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {teacher.expertise.map((skill, idx) => (
              <span 
                key={idx} 
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border transition-all duration-300 hover:scale-105 cursor-default ${
                  idx % 3 === 0 ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20 hover:bg-indigo-500/20' :
                  idx % 3 === 1 ? 'bg-purple-500/10 text-purple-300 border-purple-500/20 hover:bg-purple-500/20' :
                  'bg-pink-500/10 text-pink-300 border-pink-500/20 hover:bg-pink-500/20'
                }`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom accent */}
        <div className={`h-0.5 bg-gradient-to-r ${teacher.accentGradient || 'from-indigo-500 via-purple-500 to-pink-500'} opacity-30`} />
      </div>
    </div>
  )
}
