import { useState } from 'react'

export default function CurriculumView({ curriculum, isInstructor }) {
  const [expandedPhase, setExpandedPhase] = useState(null)

  const togglePhase = (phaseNum) => {
    setExpandedPhase(expandedPhase === phaseNum ? null : phaseNum)
  }

  return (
    <div className="mb-16">
      {/* Course Header */}
      <div className={`bg-white/5 border border-white/10 rounded-2xl p-8 mb-8 hover:border-white/20 transition-all`}>
        <div className="flex items-start gap-6 flex-wrap md:flex-nowrap">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 bg-gradient-to-r ${curriculum.bgClass}`}>
            {curriculum.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-3xl font-bold font-space-grotesk text-white mb-2">{curriculum.title}</h2>
            <p className="text-gray mb-4">{curriculum.subtitle}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="bg-white/5 px-3 py-1 rounded-full text-gray-300">📅 12 Weeks</span>
              <span className="bg-white/5 px-3 py-1 rounded-full text-gray-300">🏗️ 4 Projects</span>
              <span className="bg-white/5 px-3 py-1 rounded-full text-gray-300">📚 {curriculum.phases.reduce((acc, p) => acc + p.assignments.length, 0)} Assignments</span>
              {isInstructor && (
                <span className="bg-yellow-500/10 px-3 py-1 rounded-full text-yellow-400 border border-yellow-500/20">
                  👁️ Instructor View
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="mb-8">
        <h3 className="text-xl font-bold font-space-grotesk text-white mb-4 flex items-center gap-2">
          <span className={curriculum.colorClass}>▸</span> Projects & Deliverables
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {curriculum.projects.map((project, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all">
              <div className="text-3xl mb-3">{project.icon}</div>
              <h4 className="text-lg font-bold text-white mb-2">{project.title}</h4>
              <p className="text-gray text-sm mb-4">{project.description}</p>
              <div className="space-y-1.5">
                {project.deliverables.map((d, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span className={`${curriculum.colorClass} text-xs`}>✦</span>
                    <span className="text-gray-300">{d}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Phase Timeline */}
      <div>
        <h3 className="text-xl font-bold font-space-grotesk text-white mb-4 flex items-center gap-2">
          <span className={curriculum.colorClass}>▸</span> 12-Week Learning Journey
        </h3>
        <div className="space-y-4">
          {curriculum.phases.map((phase) => {
            const isExpanded = expandedPhase === phase.phase
            return (
              <div key={phase.phase} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all">
                <button
                  onClick={() => togglePhase(phase.phase)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm bg-gradient-to-r ${curriculum.bgClass}`}>
                      {phase.phase}
                    </div>
                    <div>
                      <div className="font-bold text-white font-space-grotesk">{phase.title}</div>
                      <div className="text-gray text-sm">{phase.weeks}</div>
                    </div>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 border-t border-white/5">
                    {/* Learning Topics */}
                    <div className="mt-4 mb-6">
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Topics Covered</h4>
                      <ul className="space-y-2">
                        {phase.items.map((item, idx) => (
                          <li key={idx} className="text-gray-300 text-sm flex items-start gap-2">
                            <span className={`${curriculum.colorClass} mt-0.5`}>•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Assignments */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Assignments</h4>
                      <div className="space-y-2">
                        {phase.assignments.map((assignment, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-3">
                            <div className="flex items-center gap-3">
                              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                                assignment.type === 'project'
                                  ? 'bg-purple-500/20 text-purple-400'
                                  : 'bg-blue-500/20 text-blue-400'
                              }`}>
                                {assignment.type === 'project' ? '🏗️ Project' : '📝 Exercise'}
                              </span>
                              <span className="text-gray-200 text-sm">{assignment.title}</span>
                            </div>
                            <span className="text-gray-500 text-xs">Due: {assignment.due}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Resources */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Resources</h4>
                      <div className="flex flex-wrap gap-2">
                        {phase.resources.map((resource, idx) => (
                          <span key={idx} className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-xs text-gray-300">
                            📖 {resource}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
