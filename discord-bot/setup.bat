@echo off
echo 🤖 IRAI Academy Instructor Bot Setup
echo =========================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 16+ first.
    pause
    exit /b 1
)

echo ✅ Node.js is installed

REM Install dependencies
echo 📦 Installing dependencies...
npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully

REM Create .env file if it doesn't exist
if not exist .env (
    echo 📝 Creating .env file...
    copy .env.example .env >nul
    echo ✅ .env file created. Please edit it with your bot token and role IDs.
    echo 📝 Open .env and add your DISCORD_BOT_TOKEN
    echo 📝 Make sure INSTRUCTOR_ROLE_ID is set to: 1485034990906638542
    echo 📝 Add course role IDs for student filtering
) else (
    echo ✅ .env file already exists
)

REM Check if .env has been configured
findstr "your_bot_token_here" .env >nul 2>&1
if %errorlevel% equ 0 (
    echo ⚠️  WARNING: Please configure your .env file with actual values!
    echo 📝 Edit .env and replace placeholder values:
    echo    - DISCORD_BOT_TOKEN: Your actual bot token
    echo    - INSTRUCTOR_ROLE_ID: 1485034990906638542
    echo    - Course role IDs for student filtering
) else (
    echo ✅ .env file appears to be configured
)

echo.
echo 🚀 Setup Complete!
echo ==========================
echo.
echo 🎓 Instructor Bot Features:
echo    • Only instructors (role ID: 1485034990906638542) can access commands
echo    • Course-specific student data filtering
echo    • Payment status tracking
echo    • Attendance monitoring
echo.
echo 📋 Available Commands:
echo    =dashboard - Main overview
echo    =web-development - Web Development students
echo    =app-builder - App Builder students  
echo    =content-creator - Content Creator students
echo    =business-builder - Business Builder students
echo    =help - Show help
echo.
echo Next steps:
echo 1. Configure your .env file with Discord bot token
echo 2. Start bot with: npm start
echo 3. Test commands in Discord server
echo.
echo 🤖 Ready to manage IRAI Academy students!
pause
