// IRAI Academy Discord Bot - Instructor Dashboard with Course-Specific Student Data
// Only instructors (role ID: 1485034990906638542) can access dashboard commands

const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const CONFIG = {
  GUILD_ID: '1408508528846704794',
  INSTRUCTOR_ROLE_ID: '1485034990906638542',
  COURSE_ROLES: {
    'web-development': {
      roleId: '1485030740155433171',
      name: 'Web Development',
      color: '#0099FF'
    },
    'app-builder': {
      roleId: '1485030833080504480', 
      name: 'App Builder',
      color: '#00D9FF'
    },
    'content-creator': {
      roleId: '1485030998457712731',
      name: 'Content Creator',
      color: '#FF6B6B'
    },
    'business-builder': {
      roleId: '1485030898696192064',
      name: 'Business Builder',
      color: '#4ECDC4'
    }
  }
};

// Student data storage
const STUDENT_DATA_FILE = path.join(__dirname, 'students.json');

// Initialize Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Load student data
async function loadStudentData() {
  try {
    const data = await fs.readFile(STUDENT_DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // Return default data if file doesn't exist
    return getDefaultStudentData();
  }
}

// Save student data
async function saveStudentData(data) {
  await fs.writeFile(STUDENT_DATA_FILE, JSON.stringify(data, null, 2));
}

// Get default student data
function getDefaultStudentData() {
  return [
    {
      discordId: '123456789',
      discordName: 'Alex Johnson',
      courses: ['web-development'],
      enrolledDate: '2024-01-15',
      paymentStatus: 'paid',
      paymentMethod: 'paypal',
      transactionId: 'PAYPAL_TX_123456',
      attendance: 85,
      roleReceivedDate: '2024-01-15'
    },
    {
      discordId: '987654321',
      discordName: 'Sarah Chen',
      courses: ['web-development', 'content-creator'],
      enrolledDate: '2024-02-01',
      paymentStatus: 'paid',
      paymentMethod: 'solana',
      transactionId: 'SOL_TX_789012',
      attendance: 92,
      roleReceivedDate: '2024-02-01'
    },
    {
      discordId: '456789123',
      discordName: 'Mike Wilson',
      courses: ['app-builder'],
      enrolledDate: '2024-01-20',
      paymentStatus: 'unpaid',
      paymentMethod: null,
      transactionId: null,
      attendance: 45,
      roleReceivedDate: '2024-01-20'
    },
    {
      discordId: '789123456',
      discordName: 'Emma Davis',
      courses: ['business-builder'],
      enrolledDate: '2024-02-10',
      paymentStatus: 'paid',
      paymentMethod: 'paypal',
      transactionId: 'PAYPAL_TX_654321',
      attendance: 78,
      roleReceivedDate: '2024-02-10'
    },
    {
      discordId: '321654987',
      discordName: 'Ryan Park',
      courses: ['content-creator'],
      enrolledDate: '2024-03-01',
      paymentStatus: 'unpaid',
      paymentMethod: null,
      transactionId: null,
      attendance: 12,
      roleReceivedDate: '2024-03-01'
    }
  ];
}

// Bot ready event
client.once('ready', async () => {
  console.log(`🤖 IRAI Bot is online as ${client.user.tag}!`);
  console.log(`👥 Ready to manage students for instructors`);
  client.user.setActivity('IRAI Academy | =dashboard', { type: 'WATCHING' });
});

// Message handler
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  // Check if user has instructor role
  const isInstructor = message.member.roles.cache.has(CONFIG.INSTRUCTOR_ROLE_ID);
  
  // Only instructors can use dashboard commands
  if (!isInstructor) {
    return message.reply({
      embeds: [createErrorEmbed('❌ Access Denied', 'Only instructors can use dashboard commands!')]
    });
  }

  // Handle dashboard commands
  if (message.content.toLowerCase().startsWith('=dashboard')) {
    await handleDashboardCommand(message);
  } else if (message.content.toLowerCase().startsWith('=web-development')) {
    await handleCourseOverview(message, 'web-development');
  } else if (message.content.toLowerCase().startsWith('=app-builder')) {
    await handleCourseOverview(message, 'app-builder');
  } else if (message.content.toLowerCase().startsWith('=content-creator')) {
    await handleCourseOverview(message, 'content-creator');
  } else if (message.content.toLowerCase().startsWith('=business-builder')) {
    await handleCourseOverview(message, 'business-builder');
  } else if (message.content.toLowerCase().startsWith('=help')) {
    await handleHelpCommand(message);
  }
});

// Main dashboard command
async function handleDashboardCommand(message) {
  const students = await loadStudentData();
  
  const embed = new EmbedBuilder()
    .setTitle('🎓 IRAI Academy Instructor Dashboard')
    .setColor('#9B59B6')
    .setDescription('Welcome to the instructor dashboard! Select a course to view student data.')
    .setTimestamp()
    .setFooter({ text: 'IRAI Academy • Only instructors can access' });

  // Add course overview stats
  Object.entries(CONFIG.COURSE_ROLES).forEach(([courseKey, courseInfo]) => {
    const courseStudents = students.filter(student => 
      student.courses.includes(courseKey)
    );
    
    const paidStudents = courseStudents.filter(s => s.paymentStatus === 'paid').length;
    const totalStudents = courseStudents.length;
    
    embed.addFields({
      name: `📚 ${courseInfo.name}`,
      value: `**Students:** ${totalStudents}\n**Paid:** ${paidStudents}\n**Unpaid:** ${totalStudents - paidStudents}\n\`=${courseKey}\` to view details`,
      inline: true
    });
  });

  embed.addFields({
    name: '📋 Available Commands',
    value: '`=web-development` • `=app-builder` • `=content-creator` • `=business-builder`',
    inline: false
  });

  message.reply({ embeds: [embed] });
}

// Course-specific overview command
async function handleCourseOverview(message, courseKey) {
  const students = await loadStudentData();
  const courseInfo = CONFIG.COURSE_ROLES[courseKey];
  
  if (!courseInfo) {
    return message.reply({
      embeds: [createErrorEmbed('❌ Invalid Course', 'Course not found!')]
    });
  }

  // Filter students by course role
  const courseStudents = students.filter(student => 
    student.courses.includes(courseKey)
  );

  if (courseStudents.length === 0) {
    const embed = new EmbedBuilder()
      .setTitle(`📚 ${courseInfo.name} - No Students`)
      .setColor(courseInfo.color)
      .setDescription('No students are currently enrolled in this course.')
      .setTimestamp();
    
    return message.reply({ embeds: [embed] });
  }

  const embed = new EmbedBuilder()
    .setTitle(`📚 ${courseInfo.name} - Student Overview`)
    .setColor(courseInfo.color)
    .setDescription(`**${courseStudents.length}** students enrolled in ${courseInfo.name}`)
    .setTimestamp();

  // Add each student's details
  courseStudents.forEach((student, index) => {
    const paymentStatusEmoji = student.paymentStatus === 'paid' ? '✅' : '❌';
    const paymentMethodInfo = student.paymentMethod 
      ? `${student.paymentMethod.toUpperCase()} | ID: ${student.transactionId || 'N/A'}`
      : 'No payment info';
    
    embed.addFields({
      name: `${index + 1}. ${paymentStatusEmoji} ${student.discordName}`,
      value: `**👤 Name:** ${student.discordName}\n**📚 Course:** ${courseInfo.name}\n**💰 Payment:** ${student.paymentStatus.toUpperCase()}\n**💳 Method:** ${paymentMethodInfo}\n**📅 Enrolled:** ${student.enrolledDate}\n**📊 Attendance:** ${student.attendance}%`,
      inline: false
    });
  });

  // Add summary statistics
  const paidCount = courseStudents.filter(s => s.paymentStatus === 'paid').length;
  const unpaidCount = courseStudents.length - paidCount;
  const avgAttendance = Math.round(
    courseStudents.reduce((sum, s) => sum + s.attendance, 0) / courseStudents.length
  );

  embed.addFields(
    {
      name: '📊 Course Statistics',
      value: `**Total Students:** ${courseStudents.length}\n**Paid Students:** ${paidCount}\n**Unpaid Students:** ${unpaidCount}\n**Average Attendance:** ${avgAttendance}%`,
      inline: false
    }
  );

  message.reply({ embeds: [embed] });
}

// Help command for instructors
async function handleHelpCommand(message) {
  const embed = new EmbedBuilder()
    .setTitle('🤖 IRAI Academy Instructor Bot Help')
    .setColor('#3498DB')
    .setDescription('Commands for managing students and viewing course data')
    .setTimestamp()
    .setFooter({ text: 'IRAI Academy • Instructor Access Only' });

  embed.addFields(
    { 
      name: '🎓 Dashboard Commands', 
      value: '`=dashboard` - Show overview of all courses\n`=web-development` - View Web Development students\n`=app-builder` - View App Builder students\n`=content-creator` - View Content Creator students\n`=business-builder` - View Business Builder students',
      inline: false 
    },
    { 
      name: '📊 Student Information', 
      value: 'Each course command shows:\n• Discord Name\n• Course Enrollment\n• Payment Status (Paid/Unpaid)\n• Payment Method & Transaction ID\n• Enrollment Date\n• Attendance Percentage',
      inline: false 
    },
    { 
      name: '🔐 Access Control', 
      value: 'Only users with instructor role (ID: 1485034990906638542) can access these commands.',
      inline: false 
    },
    { 
      name: '❓ Help', 
      value: '`=help` - Show this help message',
      inline: false 
    }
  );

  message.reply({ embeds: [embed] });
}

// Helper function to create error embeds
function createErrorEmbed(title, description) {
  return new EmbedBuilder()
    .setTitle(title)
    .setColor('#FF0000')
    .setDescription(description)
    .setTimestamp();
}

// Error handling
client.on('error', (error) => {
  console.error('Discord client error:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error);
});

// Bot login
const TOKEN = process.env.DISCORD_BOT_TOKEN;
if (!TOKEN) {
  console.error('❌ ERROR: DISCORD_BOT_TOKEN environment variable is required!');
  console.log('📝 Create a .env file with your Discord bot token');
  process.exit(1);
}

client.login(TOKEN).catch(error => {
  console.error('❌ Failed to login to Discord:', error.message);
  process.exit(1);
});

module.exports = client;
