import { useState } from 'react'

export default function TeacherCard({ teacher }) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  // Get the correct image filename based on teacher name
  const getImagePath = (teacherName) => {
    const nameMap = {
      'ILLYMEDS': 'illymeds-1.jpg',
      'BABIX': 'babix-1.png',
      'RUSH': 'rush.jpg'
    }
    return `./${nameMap[teacherName] || `${teacherName.toLowerCase()}.jpg`}`
  }

  return (
    <div className="relative h-[500px] perspective-1000 flex-shrink-0 w-[420px]">
      <div 
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front Box */}
        <div className={`absolute w-full h-full backface-hidden bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-indigo-600/10 border-2 border-indigo-500/50 shadow-2xl transition-all duration-500 overflow-hidden ${
          isFlipped ? '' : 'hover:border-indigo-400/70 hover:shadow-[0_20px_40px_rgba(99,102,241,0.3),0_10px_20px_rgba(99,102,241,0.2)] hover:translate-y-[-2px]'
        }`}>
          {/* Box Top Edge */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-indigo-500/40 to-purple-500/40 border-b border-indigo-400/30"></div>
          
          {/* Box Content */}
          <div className="h-full p-6 flex flex-col">
            {/* Top section with teacher info */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-lg"></div>
                <img 
                  src={getImagePath(teacher.name)}
                  alt={teacher.name}
                  className="relative w-24 h-24 rounded-full object-cover border-4 border-indigo-500/60 shadow-xl"
                  onError={(e) => {
                    e.target.src = `https://picsum.photos/seed/${teacher.name}/120/120.jpg`
                  }}
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-2xl font-bold text-white font-space-grotesk tracking-wider truncate drop-shadow-lg">{teacher.name}</h3>
                <p className="text-indigo-300 text-sm font-medium line-clamp-2 drop-shadow">{teacher.title}</p>
              </div>
            </div>
            
            {/* Know More Button */}
            <div className="flex-1 flex items-end">
              <button 
                className="bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white px-8 py-3 rounded-xl text-base font-bold transition-all duration-200 transform hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/30 w-full border border-indigo-400/30"
                onClick={handleFlip}
              >
                Know More
              </button>
            </div>
          </div>
          
          {/* Box Bottom Edge */}
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-indigo-600/40 to-purple-600/40 border-t border-indigo-400/30"></div>
        </div>

        {/* Back Box */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-purple-600/30 via-pink-500/20 to-indigo-600/30 border-2 border-purple-500/50 shadow-2xl overflow-hidden">
          {/* Box Top Edge */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-purple-500/40 to-pink-500/40 border-b border-purple-400/30"></div>
          
          <div className="h-full p-6 overflow-hidden">
            <div className="space-y-4 h-full flex flex-col">
              <div className="bg-white/5 rounded-xl p-6 h-64 overflow-hidden border border-purple-400/20">
                <p className="text-gray text-base leading-relaxed">{teacher.bio}</p>
              </div>
              
              <div className="flex-shrink-0">
                <h4 className="text-white font-bold mb-3 text-sm drop-shadow">Expertise:</h4>
                <div className="flex flex-wrap gap-2">
                  {teacher.expertise.map((skill, idx) => (
                    <span 
                      key={idx} 
                      className="bg-gradient-to-r from-purple-600/40 to-indigo-600/40 text-purple-100 px-3 py-1 rounded-full text-xs font-bold border border-purple-400/30 shadow-lg"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <button 
                className="mt-4 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white px-8 py-3 rounded-xl text-base font-bold transition-all duration-200 transform hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 w-full border border-purple-400/30"
                onClick={handleFlip}
              >
                ← Back
              </button>
            </div>
          </div>
          
          {/* Box Bottom Edge */}
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-purple-600/40 to-pink-600/40 border-t border-purple-400/30"></div>
        </div>
      </div>
    </div>
  )
}
