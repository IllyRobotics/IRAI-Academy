// Serverless function for Discord VC status
// This would be deployed to Vercel, Netlify, or similar

const { Client, GatewayIntentBits } = require('discord.js');

// Discord Bot Configuration
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const GUILD_ID = '1408508528846704794';

// Course voice channel mappings
const COURSE_VOICE_CHANNELS = {
  'web-development': '1486317240885186620',
  'mobile-app-builder': '1486317304663773224',
  'business-builder': '1486317480644317265',
  'content-creation': '1486317601830469712'
};

// Initialize Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers
  ]
});

// Cache for voice states to reduce API calls
const voiceStateCache = new Map();
const CACHE_DURATION = 10000; // 10 seconds

// Connect to Discord
client.login(DISCORD_BOT_TOKEN).catch(console.error);

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { courseId, channelId } = req.query;

  if (!channelId && !courseId) {
    return res.status(400).json({ error: 'channelId or courseId required' });
  }

  const targetChannelId = channelId || COURSE_VOICE_CHANNELS[courseId];

  if (!targetChannelId) {
    return res.status(400).json({ error: 'Invalid course or channel ID' });
  }

  try {
    // Check cache first
    const cacheKey = targetChannelId;
    const cached = voiceStateCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return res.json(cached.data);
    }

    // Get the guild
    const guild = client.guilds.cache.get(GUILD_ID);
    if (!guild) {
      return res.status(404).json({ error: 'Guild not found' });
    }

    // Get voice states for the channel
    const voiceStates = guild.voiceStates.cache;
    const channelStates = voiceStates.filter(state => 
      state.channelId === targetChannelId && !state.user?.bot
    );

    // Format participant data
    const participants = channelStates.map(state => {
      const member = guild.members.cache.get(state.user.id);
      return {
        userId: state.user.id,
        username: state.user.username,
        displayName: member?.nickname || state.user.globalName || state.user.username,
        isMuted: state.mute || state.selfMute,
        isDeafened: state.deaf || state.selfDeaf,
        isSpeaking: state.speaking,
        avatar: state.user.displayAvatarURL({ size: 64 })
      };
    });

    const result = {
      isActive: participants.length > 0,
      participantCount: participants.length,
      participants,
      channelId: targetChannelId,
      timestamp: Date.now()
    };

    // Cache the result
    voiceStateCache.set(cacheKey, {
      data: result,
      timestamp: Date.now()
    });

    res.json(result);

  } catch (error) {
    console.error('Discord API error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch Discord data',
      details: error.message 
    });
  }
}

// For Vercel deployment
module.exports = handler;
