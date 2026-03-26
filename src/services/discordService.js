// Discord API service for checking voice channel status
// Using Discord bot for real instructor detection

import { 
  getVoiceChannelStatus as getBotStatus,
  getAllCourseStatuses as getAllBotStatuses,
  getDiscordChannelUrl
} from './discordBotService.js'

// Export bot functions
export const getVoiceChannelStatus = getBotStatus
export const getAllCourseStatuses = getAllBotStatuses
export { getDiscordChannelUrl }
