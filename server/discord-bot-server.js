// Discord Bot Server for Real VC Detection
// Deploy this to Vercel, Heroku, or your own server

const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');

const app = express();
app.use(express.json());
app.use(require('cors')());

// Discord Configuration
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const GUILD_ID = '1408508528846704794';
const INSTRUCTOR_ROLE_ID = '1485034990906638542';

// Initialize Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers
  ]
});

// Bot ready event
client.once('ready', () => {
  console.log(`Bot logged in as ${client.user.tag}`);
});

// Login to Discord
if (DISCORD_BOT_TOKEN) {
  client.login(DISCORD_BOT_TOKEN).catch(console.error);
}

// API endpoint to check voice channel status
app.get('/api/discord/voice-status/:channelId', async (req, res) => {
  try {
    const { channelId } = req.params;
    
    if (!DISCORD_BOT_TOKEN) {
      return res.status(500).json({ error: 'Discord bot token not configured' });
    }

    // Get guild
    const guild = client.guilds.cache.get(GUILD_ID);
    if (!guild) {
      return res.status(404).json({ error: 'Guild not found' });
    }

    // Wait for guild to be ready
    if (!guild.ready) {
      await guild.fetch();
    }

    // Get voice states
    const voiceStates = guild.voiceStates.cache;
    
    // Enrich voice states with member data
    const enrichedStates = [];
    
    for (const [userId, voiceState] of voiceStates) {
      if (voiceState.channelId === channelId) {
        const member = await guild.members.fetch(userId).catch(() => null);
        
        enrichedStates.push({
          user: voiceState.user,
          member: member,
          channelId: voiceState.channelId,
          mute: voiceState.mute,
          selfMute: voiceState.selfMute,
          deaf: voiceState.deaf,
          selfDeaf: voiceState.selfDeaf,
          speaking: voiceState.speaking
        });
      }
    }

    res.json({ 
      voiceStates: enrichedStates,
      channelId,
      timestamp: Date.now()
    });

  } catch (error) {
    console.error('Error checking voice status:', error);
    res.status(500).json({ 
      error: 'Failed to check voice status',
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    botReady: client.isReady(),
    guilds: client.guilds.cache.size
  });
});

// For Vercel deployment
module.exports = app;

// For local development
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
