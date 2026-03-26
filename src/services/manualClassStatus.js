// Manual class status service for real-time updates
// Instructors can manually update class status when they start teaching

const GUILD_ID = '1408508528846704794'

// Course voice channel mappings
const COURSE_VOICE_CHANNELS = {
  'web-development': '1486317240885186620',
  'mobile-app-builder': '1486317304663773224', 
  'business-builder': '1486317480644317265',
  'content-creation': '1486317601830469712'
}

// Local storage key for manual status
const MANUAL_STATUS_KEY = 'irai_manual_class_status'

// Get manual class status from localStorage
function getManualStatus() {
  try {
    const stored = localStorage.getItem(MANUAL_STATUS_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch (error) {
    console.error('Error reading manual status:', error)
    return {}
  }
}

// Save manual class status to localStorage
function saveManualStatus(status) {
  try {
    localStorage.setItem(MANUAL_STATUS_KEY, JSON.stringify(status))
  } catch (error) {
    console.error('Error saving manual status:', error)
  }
}

// Get voice channel status
export async function getVoiceChannelStatus(channelId) {
  try {
    // Get manual status first
    const manualStatus = getManualStatus()
    const courseId = Object.keys(COURSE_VOICE_CHANNELS).find(key => 
      COURSE_VOICE_CHANNELS[key] === channelId
    )
    
    const courseStatus = manualStatus[courseId]
    
    if (courseStatus && courseStatus.isActive) {
      // Check if status is recent (within last 2 hours)
      const statusAge = Date.now() - courseStatus.timestamp
      const maxAge = 2 * 60 * 60 * 1000 // 2 hours
      
      if (statusAge < maxAge) {
        return {
          isActive: true,
          participantCount: courseStatus.participantCount || 1,
          participants: courseStatus.participants || [{
            userId: 'instructor',
            username: 'instructor',
            displayName: courseStatus.instructorName || 'Instructor',
            isMuted: false,
            isDeafened: false,
            isSpeaking: true
          }],
          channelId,
          isManual: true,
          lastUpdated: courseStatus.timestamp
        }
      }
    }
    
    // Fallback to checking if anyone is in the Discord server
    const serverActive = await checkServerActivity()
    
    return {
      isActive: serverActive,
      participantCount: 0,
      participants: [],
      channelId,
      note: 'No active class detected. Instructors can start a class manually.'
    }
  } catch (error) {
    console.error('Error fetching voice channel status:', error)
    return {
      isActive: false,
      participantCount: 0,
      participants: [],
      error: error.message,
      channelId
    }
  }
}

// Check server activity using Discord widget
async function checkServerActivity() {
  try {
    const response = await fetch(`https://discord.com/api/guilds/${GUILD_ID}/widget.json`)
    
    if (!response.ok) {
      return false
    }
    
    const data = await response.json()
    return (data.presences?.length || 0) > 0
  } catch (error) {
    console.error('Error checking server activity:', error)
    return false
  }
}

// Manual status update functions
export function startClass(courseId, instructorName, participantCount = 1) {
  const manualStatus = getManualStatus()
  
  manualStatus[courseId] = {
    isActive: true,
    instructorName,
    participantCount,
    participants: [{
      userId: 'instructor',
      username: 'instructor',
      displayName: instructorName,
      isMuted: false,
      isDeafened: false,
      isSpeaking: true
    }],
    timestamp: Date.now()
  }
  
  saveManualStatus(manualStatus)
}

export function endClass(courseId) {
  const manualStatus = getManualStatus()
  
  if (manualStatus[courseId]) {
    manualStatus[courseId].isActive = false
    manualStatus[courseId].timestamp = Date.now()
    saveManualStatus(manualStatus)
  }
}

export function updateParticipants(courseId, participants) {
  const manualStatus = getManualStatus()
  
  if (manualStatus[courseId]) {
    manualStatus[courseId].participants = participants
    manualStatus[courseId].participantCount = participants.length
    manualStatus[courseId].timestamp = Date.now()
    saveManualStatus(manualStatus)
  }
}

export async function getAllCourseStatuses() {
  const statuses = {}
  
  for (const [courseId, channelId] of Object.entries(COURSE_VOICE_CHANNELS)) {
    statuses[courseId] = await getVoiceChannelStatus(channelId)
  }
  
  return statuses
}

export function getDiscordChannelUrl(courseId) {
  const channelId = COURSE_VOICE_CHANNELS[courseId]
  return channelId ? `https://discord.com/channels/${GUILD_ID}/${channelId}` : null
}

// Instructor control functions
export function getInstructorControls(courseId) {
  const manualStatus = getManualStatus()
  const courseStatus = manualStatus[courseId]
  
  return {
    isClassActive: courseStatus?.isActive || false,
    canStartClass: !courseStatus?.isActive,
    canEndClass: courseStatus?.isActive || false
  }
}
