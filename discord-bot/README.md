# 🤖 IRAI Academy Instructor Discord Bot

Discord bot for instructors to manage students and view course-specific data with role-based access control.

## 🔐 Access Control

**Only instructors** with role ID `1485034990906638542` can access dashboard commands.

## 📚 Course Role IDs

The bot recognizes these student role IDs:

| Course | Role ID | Command |
|---------|----------|----------|
| Web Development | `1485030740155433171` | `=web-development` |
| App Builder | `1485030833080504480` | `=app-builder` |
| Content Creator | `1485030998457712731` | `=content-creator` |
| Business Builder | `1485030898696192064` | `=business-builder` |

## 🎯 Commands

### 🎓 Dashboard Commands (Instructor Only)

| Command | Description | Access |
|---------|-------------|---------|
| `=dashboard` | Show overview of all courses and student counts | Instructors only |
| `=web-development` | View all Web Development students | Instructors only |
| `=app-builder` | View all App Builder students | Instructors only |
| `=content-creator` | View all Content Creator students | Instructors only |
| `=business-builder` | View all Business Builder students | Instructors only |
| `=help` | Show help message | Instructors only |

## 📊 Student Information Displayed

For each course, instructors see:

### 👤 **Student Details**
- **Discord Name** - Student's Discord username
- **Course Enrolled** - Based on student's role ID
- **Payment Status** - ✅ Paid / ❌ Unpaid
- **Payment Method** - PayPal / Solana / None
- **Transaction ID** - Payment confirmation ID
- **Enrollment Date** - When student received the role
- **Attendance** - Percentage (you can update later)

### 📈 **Course Statistics**
- **Total Students** - Number of enrolled students
- **Paid Students** - Students with completed payment
- **Unpaid Students** - Students awaiting payment
- **Average Attendance** - Course-wide attendance percentage

## 🚀 Quick Setup

### 1. Create Discord Bot

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. **New Application** → Name: "IRAI Academy Instructor Bot"
3. **Bot Tab** → **Add Bot**
4. **Enable Intents:**
   - ✅ Server Members Intent
   - ✅ Message Content Intent
5. **Copy Bot Token**

### 2. Invite Bot to Server

1. **OAuth2 → URL Generator**
2. **Scopes:** `bot`
3. **Permissions:**
   - ✅ Manage Roles
   - ✅ Send Messages
   - ✅ Embed Links
   - ✅ Read Message History
   - ✅ View Channels
4. **Copy URL** → Open in browser → Select your server

### 3. Setup Bot Files

```bash
cd discord-bot
npm install
cp .env.example .env
```

### 4. Configure Environment

Edit `.env` file:

```env
DISCORD_BOT_TOKEN=your_actual_bot_token_here
GUILD_ID=1408508528846704794
INSTRUCTOR_ROLE_ID=1485034990906638542
WEB_DEVELOPMENT_ROLE_ID=1485030740155433171
APP_BUILDER_ROLE_ID=1485030833080504480
CONTENT_CREATOR_ROLE_ID=1485030998457712731
BUSINESS_BUILDER_ROLE_ID=1485030898696192064
```

### 5. Start Bot

```bash
npm start
```

## 📱 Usage Examples

### View Main Dashboard
```
=dashboard
```

**Shows:**
- Overview of all 4 courses
- Student counts per course
- Payment statistics
- Available commands

### View Web Development Students
```
=web-development
```

**Shows all students with role ID `1485030740155433171`:**
```
1. ✅ Alex Johnson
👤 Name: Alex Johnson
📚 Course: Web Development
💰 Payment: PAID
💳 Method: PAYPAL | ID: PAYPAL_TX_123456
📅 Enrolled: 2024-01-15
📊 Attendance: 85%

2. ❌ Mike Wilson
👤 Name: Mike Wilson
📚 Course: Web Development
💰 Payment: UNPAID
💳 Method: No payment info
📅 Enrolled: 2024-01-20
📊 Attendance: 45%
```

### View Other Courses
```
=app-builder
=content-creator
=business-builder
```

## 🔧 How It Works

### Role-Based Filtering
1. **Instructor checks** - Bot verifies user has instructor role (`1485034990906638542`)
2. **Course filtering** - Bot filters students by specific role IDs
3. **Payment status** - Students with course role = Paid, others = Unpaid
4. **Data display** - Shows comprehensive student information

### Student Data Logic
- **Paid students** = Have the course role AND payment status = "paid"
- **Unpaid students** = Have the course role BUT payment status = "unpaid"
- **Enrollment date** = When student received the role
- **Payment method** = PayPal/Solana (if paid)
- **Transaction ID** = Payment confirmation (if paid)

## 🛡️ Security Features

### Access Control
- ✅ **Instructor-only commands** - Role ID validation
- ✅ **Permission checks** - Every command validates instructor role
- ✅ **Safe role handling** - No unauthorized access

### Data Protection
- ✅ **Local data storage** - Students.json file
- ✅ **Environment variables** - Sensitive data in .env
- ✅ **Error handling** - Graceful failure handling

## 📊 Student Data Structure

```json
[
  {
    "discordId": "123456789",
    "discordName": "Alex Johnson",
    "courses": ["web-development"],
    "enrolledDate": "2024-01-15",
    "paymentStatus": "paid",
    "paymentMethod": "paypal",
    "transactionId": "PAYPAL_TX_123456",
    "attendance": 85,
    "roleReceivedDate": "2024-01-15"
  }
]
```

## 🔍 Troubleshooting

### "Access Denied" Error
**Cause:** User doesn't have instructor role
**Fix:** Assign instructor role (`1485034990906638542`) to user

### "No Students Found"
**Cause:** No students have the course role
**Fix:** Assign course roles to students first

### Bot Not Responding
**Cause:** Bot token incorrect or bot offline
**Fix:** 
1. Check bot token in `.env`
2. Verify bot is online
3. Check Discord server status

## 📈 Deployment Options

### Local Development
```bash
cd discord-bot
npm install
npm start
```

### Production Hosting
```bash
# Using PM2 for process management
npm install -g pm2
pm2 start index.js --name "irai-instructor-bot"
pm2 save
```

## 🔄 Updating Student Data

### Manual Updates
Edit `students.json` file:
```json
{
  "discordId": "new_student_id",
  "discordName": "Student Name",
  "courses": ["web-development"],
  "enrolledDate": "2024-03-27",
  "paymentStatus": "unpaid",
  "paymentMethod": null,
  "transactionId": null,
  "attendance": 0,
  "roleReceivedDate": "2024-03-27"
}
```

### Automatic Updates
When you assign roles in Discord:
1. Bot detects role changes
2. Updates student data automatically
3. Shows updated information in commands

## 📞 Support

### Common Issues
1. **Permission denied** - Check instructor role assignment
2. **Role IDs wrong** - Verify with Discord server settings
3. **Bot offline** - Check hosting and restart
4. **Data not updating** - Check file permissions

### Get Help
- 📚 Check this README
- 📚 Verify role IDs match your Discord server
- 📚 Check Discord bot permissions

---

**🎓 IRAI Academy Instructor Bot v1.0**

*Secure course-specific student management for instructors*
