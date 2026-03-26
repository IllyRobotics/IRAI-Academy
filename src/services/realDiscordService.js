// Real Discord API service for fetching actual voice channel data
// This would connect to a backend API that uses a Discord bot token

const GUILD_ID = '1408508528846704794'

// Course voice channel mappings
const COURSE_VOICE_CHANNELS = {
  'web-development': '1486317240885186620',
  'mobile-app-builder': '1486317304663773224',
  'business-builder': '1486317480644317265',
  'content-creation': '1486317601830469712'
}

// Backend API endpoint (you would need to create this)
const BACKEND_API_URL = 'https://your-backend-api.com/discord'

// Real Discord API function (requires backend)
export async function getVoiceChannelStatus(channelId) {
  try {
    // In production, this would call your backend API
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
    
    return {
      isActive: data.activeUsers?.length > 0,
      participantCount: data.activeUsers?.length || 0,
      participants: data.activeUsers?.map(state => ({
        userId: state.user?.id,
        username: state.user?.username,
        displayName: state.member?.nick || state.user?.username,
        isMuted: state.mute,
        isDeafened: state.deaf,
        isSpeaking: state.speaking
      })) || [],
      channelId
    }
  } catch (error) {
    console.error('Error fetching real Discord data:', error)
    // Fallback to mock data
    return getMockVoiceChannelStatus(channelId)
  }
}

// Mock function as fallback
async function getMockVoiceChannelStatus(channelId) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // More realistic mock data
    const mockUsers = [
      { userId: '123456789', username: 'instructor', displayName: 'Prof. Smith', isMuted: false, isDeafened: false, isSpeaking: true },
      { userId: '987654321', username: 'student1', displayName: 'Alex Johnson', isMuted: true, isDeafened: false, isSpeaking: false },
      { userId: '456789123', username: 'student2', displayName: 'Sarah Chen', isMuted: false, isDeafened: false, isSpeaking: false },
      { userId: '789123456', username: 'student3', displayName: 'Mike Wilson', isMuted: true, isDeafened: true, isSpeaking: false },
      { userId: '321654987', username: 'student4', displayName: 'Emma Davis', isMuted: false, isDeafened: false, isSpeaking: false },
    ]
    
    // Randomly determine if class is active (50% chance)
    const isActive = Math.random() > 0.5
    
    if (isActive) {
      const participantCount = Math.floor(Math.random() * mockUsers.length) + 1
      const participants = mockUsers
        .sort(() => Math.random() - 0.5) // Shuffle
        .slice(0, participantCount)
        .map(user => ({
          ...user,
          isSpeaking: Math.random() > 0.7 // 30% chance of speaking
        }))
      
      return {
        isActive: true,
        participantCount,
        participants,
        channelId
      }
    }
    
    return {
      isActive: false,
      participantCount: 0,
      participants: [],
      channelId
    }
  } catch (error) {
    console.error('Error in mock voice channel status:', error)
    return {
      isActive: false,
      participantCount: 0,
      participants: [],
      error: error.message,
      channelId
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

// Instructions for setting up real Discord integration:
/*
To get real Discord VC data, you need to:

1. Create a Discord Bot:
   - Go to https://discord.com/developers/applications
   - Create New Application → Bot
   - Get bot token

2. Give Bot Permissions:
   - Connect to voice channels
   - View voice channel states
   - Read guild member info

3. Create Backend API (Node.js example):
   ```javascript
   const express = require('express');
   const { Client, GatewayIntentBits } = require('discord.js');
   
   const app = express();
   const client = new Client({
     intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates]
   });
   
   client.login('YOUR_BOT_TOKEN');
   
   app.get('/discord/voice-status/:channelId', (req, res) => {
     const channel = client.channels.cache.get(req.params.channelId);
     const voiceStates = channel?.guild?.voiceStates?.cache || new Map();
     
     const activeUsers = voiceStates
       .filter(state => state.channelId === req.params.channelId && !state.user?.bot)
       .map(state => ({
         user: state.user,
         member: state.member,
         mute: state.mute,
         deaf: state.deaf,
         speaking: state.speaking
       }));
     
     res.json({ activeUsers });
   });
   ```

4. Deploy backend and update BACKEND_API_URL above
*/
