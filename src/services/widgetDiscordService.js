// Discord Widget API service for real VC data
// Uses Discord's public widget API (no bot token required)

const GUILD_ID = '1408508528846704794'

// Course voice channel mappings
const COURSE_VOICE_CHANNELS = {
  'web-development': '1486317240885186620',
  'mobile-app-builder': '1486317304663773224', 
  'business-builder': '1486317480644317265',
  'content-creation': '1486317601830469712'
}

// Discord Widget API endpoint
const WIDGET_API_URL = `https://discord.com/api/guilds/${GUILD_ID}/widget.json`

// Cache for widget data
const widgetCache = new Map()
const CACHE_DURATION = 15000 // 15 seconds

// Fetch Discord widget data
async function getWidgetData() {
  try {
    // Check cache first
    const cached = widgetCache.get('widget')
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data
    }

    const response = await fetch(WIDGET_API_URL)
    
    if (!response.ok) {
      throw new Error(`Widget API error: ${response.status}`)
    }

    const data = await response.json()
    
    // Cache the result
    widgetCache.set('widget', {
      data,
      timestamp: Date.now()
    })

    return data
  } catch (error) {
    console.error('Error fetching Discord widget:', error)
    return null
  }
}

// Get voice channel status using widget data
export async function getVoiceChannelStatus(channelId) {
  try {
    const widgetData = await getWidgetData()
    
    if (!widgetData) {
      throw new Error('Unable to fetch Discord widget data')
    }

    // Widget API doesn't provide voice channel details directly
    // We'll need to use a different approach or show limited info
    
    // For now, show if anyone is online in the server
    const onlineMembers = widgetData.presences?.length || 0
    
    // Since we can't get specific VC data from widget, we'll show server activity
    return {
      isActive: onlineMembers > 0,
      participantCount: 0, // Widget doesn't provide VC participant count
      participants: [], // Widget doesn't provide VC participant details
      channelId,
      note: 'Widget API shows server activity but not specific VC data',
      onlineMembers
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

// Alternative: Use Discord's Oauth2 API to get user presence
export async function getUserPresence(userId) {
  try {
    // This would require user's OAuth token
    // Not implemented for security reasons
    return null
  } catch (error) {
    return null
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

// Instructions for getting real VC data:
/*
To get actual Discord VC participant data, you have several options:

1. **Discord Widget API** (Current approach):
   - Shows server activity but not specific VC data
   - No bot token required
   - Limited information

2. **Discord Bot + Backend API** (Recommended):
   - Create a Discord bot with voice state permissions
   - Deploy a backend API (Node.js/Python)
   - Bot fetches VC data and provides via API
   - Most accurate and real-time

3. **Discord OAuth2 + Voice API**:
   - Users authorize with OAuth2
   - Use their token to check voice states
   - Complex but doesn't require bot

4. **Third-party services**:
   - Use services like Discord RPC
   - WebSocket connections for real-time data

For the most accurate real-time VC data, option 2 (Bot + Backend) is recommended.
*/
