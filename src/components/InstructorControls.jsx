import { useState } from 'react'
import { Play, Square, Users, Settings } from 'lucide-react'
import { startClass, endClass, updateParticipants, getInstructorControls } from '../services/manualClassStatus'

export default function InstructorControls({ courseId, courseTitle, onStatusUpdate }) {
  const [isStarting, setIsStarting] = useState(false)
  const [isEnding, setIsEnding] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [instructorName, setInstructorName] = useState('')
  const [participantCount, setParticipantCount] = useState(1)
  
  const controls = getInstructorControls(courseId)

  const handleStartClass = async () => {
    if (!instructorName.trim()) {
      alert('Please enter your name')
      return
    }

    setIsStarting(true)
    try {
      startClass(courseId, instructorName, participantCount)
      setShowSettings(false)
      if (onStatusUpdate) onStatusUpdate()
    } catch (error) {
      console.error('Error starting class:', error)
      alert('Failed to start class')
    } finally {
      setIsStarting(false)
    }
  }

  const handleEndClass = async () => {
    setIsEnding(true)
    try {
      endClass(courseId)
      if (onStatusUpdate) onStatusUpdate()
    } catch (error) {
      console.error('Error ending class:', error)
      alert('Failed to end class')
    } finally {
      setIsEnding(false)
    }
  }

  if (controls.isClassActive) {
    return (
      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-green-500/20 animate-pulse">
              <Users className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-green-400 font-medium">Class is Live</p>
              <p className="text-sm text-gray-400">{courseTitle}</p>
            </div>
          </div>
          
          <button
            onClick={handleEndClass}
            disabled={isEnding}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors disabled:opacity-50"
          >
            {isEnding ? (
              <>
                <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></div>
                Ending...
              </>
            ) : (
              <>
                <Square className="w-4 h-4" />
                End Class
              </>
            )}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-blue-500/20">
            <Play className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <p className="text-blue-400 font-medium">Start Class Session</p>
            <p className="text-sm text-gray-400">{courseTitle}</p>
          </div>
        </div>
        
        <button
          onClick={() => setShowSettings(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors"
        >
          <Settings className="w-4 h-4" />
          Start Class
        </button>
      </div>

      {showSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-dark border border-white/20 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-white mb-4">Start Class Session</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  value={instructorName}
                  onChange={(e) => setInstructorName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Expected Participants
                </label>
                <input
                  type="number"
                  value={participantCount}
                  onChange={(e) => setParticipantCount(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  max="50"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleStartClass}
                disabled={isStarting || !instructorName.trim()}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
              >
                {isStarting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block mr-2"></div>
                    Starting...
                  </>
                ) : (
                  'Start Class'
                )}
              </button>
              
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 border border-white/20 text-gray-400 hover:text-white hover:border-white/40 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
