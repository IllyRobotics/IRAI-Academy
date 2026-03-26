// Discord Bot service for real VC detection
// This would connect to a backend that has a Discord bot

const INSTRUCTOR_ROLE_ID = '1485034990906638542'
const GUILD_ID = '1408508528846704794'

// Course voice channel mappings
const COURSE_VOICE_CHANNELS = {
  'web-development': '1486317240885186620',
  'mobile-app-builder': '1486317304663773224', 
  'business-builder': '1486317480644317265',
  'content-creation': '1486317601830469712'
}

// Backend API endpoint (you need to deploy this)
const BACKEND_API_URL = 'https://your-backend-url.com/api/discord'

// Check if instructor is in voice channel
export async function getVoiceChannelStatus(channelId) {
  try {
    // Call your backend API that has the Discord bot
    const response = await fetch(`${BACKEND_API_URL}/voice-status/${channelId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    
    // Check if any user with instructor role is in VC
    const instructorInVC = data.voiceStates?.some(state => 
      state.channelId === channelId && 
      state.member?.roles?.includes(INSTRUCTOR_ROLE_ID) &&
      !state.user?.bot
    )

    // Get all participants in the channel
    const participants = data.voiceStates
      ?.filter(state => state.channelId === channelId && !state.user?.bot)
      ?.map(state => ({
        userId: state.user.id,
        username: state.user.username,
        displayName: state.member?.nick || state.user.globalName || state.user.username,
        isMuted: state.mute || state.selfMute,
        isDeafened: state.deaf || state.selfDeaf,
        isSpeaking: state.speaking,
        isInstructor: state.member?.roles?.includes(INSTRUCTOR_ROLE_ID),
        avatar: state.user.displayAvatarURL({ size: 64 })
      })) || []

    return {
      isActive: instructorInVC,
      participantCount: participants.length,
      participants,
      channelId,
      instructorInVC,
      timestamp: Date.now()
    }
  } catch (error) {
    console.error('Error fetching Discord VC status:', error)
    // Fallback to checking if anyone is online (less accurate)
    return await getFallbackStatus(channelId)
  }
}

// Fallback: Use Discord widget API (limited but no bot required)
async function getFallbackStatus(channelId) {
  try {
    const response = await fetch(`https://discord.com/api/guilds/${GUILD_ID}/widget.json`)
    
    if (!response.ok) {
      throw new Error('Widget API unavailable')
    }

    const data = await response.json()
    const onlineMembers = data.presences?.length || 0

    // Since we can't check specific VC or roles, we'll show offline
    return {
      isActive: false,
      participantCount: 0,
      participants: [],
      channelId,
      instructorInVC: false,
      note: 'Unable to verify instructor presence - showing offline',
      onlineMembers
    }
  } catch (error) {
    return {
      isActive: false,
      participantCount: 0,
      participants: [],
      error: error.message,
      channelId,
      instructorInVC: false
    }
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

// Backend implementation guide:
/*
To implement the backend API, create a Node.js server with Discord.js:

1. Install dependencies:
   npm install discord.js express cors

2. Create server:
   const express = require('express');
   const { Client, GatewayIntentBits } = require('discord.js');
   
   const app = express();
   app.use(cors());
   
   const client = new Client({
     intents: [
       GatewayIntentBits.Guilds,
       GatewayIntentBits.GuildVoiceStates,
       GatewayIntentBits.GuildMembers
     ]
   });
   
   client.login('YOUR_BOT_TOKEN');
   
   app.get('/api/discord/voice-status/:channelId', (req, res) => {
     const guild = client.guilds.cache.get('1408508528846704794');
     const voiceStates = guild.voiceStates.cache;
     
     const enrichedStates = voiceStates.map(state => ({
       ...state,
       member: guild.members.cache.get(state.user.id)
     }));
     
     res.json({ voiceStates: enrichedStates });
   });
   
   app.listen(3000);

3. Deploy to Vercel, Heroku, or similar
4. Update BACKEND_API_URL above
*/
