# Discord Bot Server for IRAI Academy

This server provides real-time Discord voice channel detection for IRAI Academy.

## 🚀 Quick Setup

### 1. Create Discord Bot
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create New Application → Bot
3. Click "Add Bot"
4. Get your **Bot Token**

### 2. Set Bot Permissions
Add these permissions to your bot:
- **Connect to voice channels**
- **View voice channel states** 
- **Read guild member info**

### 3. Invite Bot to Server
1. Go to OAuth2 → URL Generator
2. Select scopes: `bot`
3. Select permissions from step 2
4. Copy URL and paste in browser
5. Invite bot to your Discord server

### 4. Deploy to Vercel (Easiest)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd server
vercel --prod
```

When prompted, set the environment variable:
- `DISCORD_BOT_TOKEN`: Your bot token from step 1

### 5. Update Frontend

In `src/services/discordBotService.js`, update:
```javascript
const BACKEND_API_URL = 'https://your-vercel-app.vercel.app'
```

## 🔧 Alternative Deployments

### Heroku
```bash
# Install Heroku CLI
heroku create your-app-name
heroku config:set DISCORD_BOT_TOKEN=your_bot_token
git push heroku main
```

### Self-hosted
```bash
cd server
npm install
DISCORD_BOT_TOKEN=your_token npm start
```

## 📱 How It Works

1. **Bot joins your Discord server**
2. **Monitors voice channels** in real-time
3. **Detects instructor role** (`1485034990906638542`)
4. **Returns live status** to frontend

## 🔍 API Endpoints

### Get Voice Channel Status
```
GET /api/discord/voice-status/:channelId
```

Response:
```json
{
  "voiceStates": [
    {
      "user": { "id": "123", "username": "instructor" },
      "member": { "roles": ["1485034990906638542"] },
      "channelId": "1486317240885186620",
      "mute": false,
      "speaking": true
    }
  ],
  "channelId": "1486317240885186620",
  "timestamp": 1640995200000
}
```

### Health Check
```
GET /api/health
```

## 🛠️ Troubleshooting

### Bot not showing in server?
- Check bot has correct permissions
- Make sure bot is online
- Verify bot token is correct

### API returning errors?
- Check environment variables
- Verify GUILD_ID is correct
- Ensure bot is in the right server

### Instructor not detected?
- Verify role ID: `1485034990906638542`
- Check if instructor has the role
- Make sure instructor is in voice channel

## 📋 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DISCORD_BOT_TOKEN` | Your Discord bot token | ✅ |
| `GUILD_ID` | Discord server ID | ✅ |
| `INSTRUCTOR_ROLE_ID` | Instructor role ID | ✅ |

## 🔐 Security Notes

- **Never expose your bot token** in frontend code
- Use environment variables for secrets
- Limit API endpoints to your domain
- Monitor bot permissions regularly
