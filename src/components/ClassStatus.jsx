import { Users, Wifi, WifiOff, ExternalLink, RefreshCw } from 'lucide-react'

export default function ClassStatus({ courseId, status, loading, onRefresh }) {
  // Early return if courseId is not provided
  if (!courseId) {
    return null
  }

  const getChannelUrl = () => {
    const channels = {
      'web-development': '1486317240885186620',
      'mobile-app-builder': '1486317304663773224',
      'business-builder': '1486317480644317265',
      'content-creation': '1486317601830469712'
    }
    const channelId = channels[courseId]
    return channelId ? `https://discord.com/channels/1408508528846704794/${channelId}` : null
  }

  const getStatusInfo = () => {
    if (loading) {
      return {
        text: 'Checking...',
        color: 'text-gray-400',
        bgColor: 'bg-gray-500/10',
        borderColor: 'border-gray-500/30',
        icon: RefreshCw
      }
    }

    if (!status || status.error) {
      return {
        text: status?.error || 'Status unavailable',
        color: 'text-red-400',
        bgColor: 'bg-red-500/10',
        borderColor: 'border-red-500/30',
        icon: WifiOff
      }
    }

    if (status.isActive) {
      return {
        text: `Class Live (${status.participantCount || 0} participant${(status.participantCount || 0) !== 1 ? 's' : ''})`,
        color: 'text-green-400',
        bgColor: 'bg-green-500/10',
        borderColor: 'border-green-500/30',
        icon: Wifi
      }
    }

    return {
      text: 'Class not active',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30',
      icon: WifiOff
    }
  }

  const statusInfo = getStatusInfo()
  const Icon = statusInfo.icon

  return (
    <div className={`${statusInfo.bgColor} ${statusInfo.borderColor} border rounded-lg p-4`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${status?.isActive ? 'bg-green-500/20' : loading ? 'bg-gray-500/20' : 'bg-yellow-500/20'} ${statusInfo.pulseColor}`}>
            <Icon className={`w-5 h-5 ${statusInfo.color} ${loading ? 'animate-spin' : ''}`} />
          </div>
          <div className="flex-1">
            <p className={`font-medium ${statusInfo.color}`}>{statusInfo.text}</p>
            {status?.isActive && status.participants?.length > 0 && (
              <div className="mt-3 space-y-2">
                <div className="flex flex-wrap gap-2">
                  {status.participants.slice(0, 6).map((participant, index) => (
                    <div 
                      key={participant.userId || index} 
                      className="flex items-center gap-2 bg-black/20 rounded-full px-3 py-1.5 border border-white/10"
                    >
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                        <span className="text-xs text-white font-medium">
                          {participant.displayName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm text-gray-300 font-medium">
                        {participant.displayName}
                      </span>
                      <div className="flex items-center gap-1">
                        {participant.isMuted ? (
                          <MicOff className="w-3 h-3 text-red-400" title="Muted" />
                        ) : (
                          <Mic className="w-3 h-3 text-green-400" title="Speaking" />
                        )}
                        {participant.isDeafened && (
                          <Headphones className="w-3 h-3 text-yellow-400" title="Deafened" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {status.participants.length > 6 && (
                  <p className="text-xs text-gray-400 mt-2">
                    +{status.participants.length - 6} more participant{status.participants.length - 6 !== 1 ? 's' : ''} in voice channel
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={onRefresh}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            title="Refresh status"
          >
            <RefreshCw className="w-4 h-4 text-gray-400" />
          </button>
          
          {status?.isActive && (
            <a
              href={getChannelUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 transition-colors text-blue-400 text-sm font-medium"
              title="Join Discord Voice Channel"
            >
              <Volume2 className="w-4 h-4" />
              Join VC
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
