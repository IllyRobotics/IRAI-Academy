// Discord Students API - Fetch student data from Discord via bot
// This API endpoint fetches Discord member data and filters by course roles

const { Client, GatewayIntentBits } = require('discord.js');

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

// Initialize Discord client
let client = null;
let isReady = false;

// Initialize bot connection
async function initializeBot() {
  if (client && isReady) return;

  try {
    client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
      ]
    });

    client.once('ready', () => {
      console.log('Discord bot ready for student data fetching');
      isReady = true;
    });

    client.login(process.env.DISCORD_BOT_TOKEN);
    
    // Wait for bot to be ready
    await new Promise(resolve => {
      if (isReady) return resolve();
      client.once('ready', resolve);
    });
    
  } catch (error) {
    console.error('Failed to initialize Discord bot:', error);
    throw error;
  }
}

// Mock student payment data (in production, this would come from your database)
const mockPaymentData = {
  '123456789': {
    paymentStatus: 'paid',
    paymentMethod: 'paypal',
    transactionId: 'PAYPAL_TX_123456',
    enrollmentDate: '2024-01-15',
    attendance: 85
  },
  '987654321': {
    paymentStatus: 'paid',
    paymentMethod: 'solana',
    transactionId: 'SOL_TX_789012',
    enrollmentDate: '2024-02-01',
    attendance: 92
  },
  '456789123': {
    paymentStatus: 'unpaid',
    paymentMethod: null,
    transactionId: null,
    enrollmentDate: '2024-01-20',
    attendance: 45
  },
  '789123456': {
    paymentStatus: 'paid',
    paymentMethod: 'paypal',
    transactionId: 'PAYPAL_TX_654321',
    enrollmentDate: '2024-02-10',
    attendance: 78
  },
  '321654987': {
    paymentStatus: 'unpaid',
    paymentMethod: null,
    transactionId: null,
    enrollmentDate: '2024-03-01',
    attendance: 12
  }
};

// Fetch students by course role from Discord
async function fetchStudentsByCourse(courseKey) {
  try {
    await initializeBot();
    
    const guild = client.guilds.cache.get(CONFIG.GUILD_ID);
    if (!guild) {
      throw new Error('Guild not found');
    }

    const courseInfo = CONFIG.COURSE_ROLES[courseKey];
    if (!courseInfo) {
      throw new Error('Invalid course');
    }

    // Fetch all members with the specific course role
    const members = await guild.members.fetch();
    const courseMembers = members.filter(member => 
      member.roles.cache.has(courseInfo.roleId)
    );

    // Convert to student data format
    const students = [];
    
    for (const [memberId, member] of courseMembers) {
      const paymentData = mockPaymentData[memberId] || {
        paymentStatus: 'unpaid',
        paymentMethod: null,
        transactionId: null,
        enrollmentDate: new Date().toISOString().split('T')[0],
        attendance: 0
      };

      students.push({
        discordId: memberId,
        discordName: member.user.username,
        displayName: member.displayName || member.user.username,
        avatar: member.user.displayAvatarURL(),
        courses: [courseKey],
        enrolledDate: paymentData.enrollmentDate,
        paymentStatus: paymentData.paymentStatus,
        paymentMethod: paymentData.paymentMethod,
        transactionId: paymentData.transactionId,
        attendance: paymentData.attendance,
        roleReceivedDate: paymentData.enrollmentDate,
        joinedAt: member.joinedAt.toISOString().split('T')[0]
      });
    }

    return {
      success: true,
      course: courseKey,
      courseInfo,
      students,
      total: students.length,
      paid: students.filter(s => s.paymentStatus === 'paid').length,
      unpaid: students.filter(s => s.paymentStatus === 'unpaid').length
    };

  } catch (error) {
    console.error('Error fetching students:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Fetch all students across all courses
async function fetchAllStudents() {
  try {
    const allCoursesData = {};
    
    for (const courseKey of Object.keys(CONFIG.COURSE_ROLES)) {
      const courseData = await fetchStudentsByCourse(courseKey);
      if (courseData.success) {
        allCoursesData[courseKey] = courseData;
      }
    }

    // Combine all students
    const allStudents = [];
    const seenStudents = new Set();
    
    Object.values(allCoursesData).forEach(courseData => {
      courseData.students.forEach(student => {
        if (!seenStudents.has(student.discordId)) {
          seenStudents.add(student.discordId);
          allStudents.push(student);
        } else {
          // Add course to existing student's course list
          const existingStudent = allStudents.find(s => s.discordId === student.discordId);
          if (existingStudent && !existingStudent.courses.includes(courseData.course)) {
            existingStudent.courses.push(courseData.course);
          }
        }
      });
    });

    return {
      success: true,
      students: allStudents,
      courses: allCoursesData,
      total: allStudents.length,
      paid: allStudents.filter(s => s.paymentStatus === 'paid').length,
      unpaid: allStudents.filter(s => s.paymentStatus === 'unpaid').length
    };

  } catch (error) {
    console.error('Error fetching all students:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Vercel serverless function handler
module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { course, action } = req.query;
    
    switch (action) {
      case 'course':
        if (!course) {
          return res.status(400).json({ 
            success: false, 
            error: 'Course parameter is required' 
          });
        }
        
        const courseData = await fetchStudentsByCourse(course);
        return res.status(200).json(courseData);

      case 'all':
        const allData = await fetchAllStudents();
        return res.status(200).json(allData);

      case 'courses':
        return res.status(200).json({
          success: true,
          courses: CONFIG.COURSE_ROLES
        });

      default:
        return res.status(400).json({
          success: false,
          error: 'Invalid action. Use: course, all, or courses'
        });
    }

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};
