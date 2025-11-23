# Quick Start Guide

## Step 1: Install Node.js

**Option A - Download Installer (Recommended):**
1. Go to https://nodejs.org/
2. Download the **LTS** (Long Term Support) version
3. Run the installer
4. Restart your terminal/PowerShell

**Option B - Using Windows Package Manager:**
```powershell
winget install OpenJS.NodeJS.LTS
```

**Option C - Using Chocolatey (if installed):**
```powershell
choco install nodejs-lts
```

## Step 2: Run Setup Script

Open PowerShell in the `HTML5-games-1` folder and run:

```powershell
.\setup.ps1
```

This will:
- Check if Node.js is installed
- Install all required dependencies
- Create a `.env` file with default settings

## Step 3: Start the Server

```powershell
npm start
```

## Step 4: Access Nova Hub

- **Main Site**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **Default Password**: `admin`

## Manual Setup (if script doesn't work)

1. Install dependencies:
   ```powershell
   npm install
   ```

2. Create `.env` file (optional):
   ```
   ADMIN_PASSWORD=your_secure_password
   PORT=3000
   ```

3. Start server:
   ```powershell
   npm start
   ```

## Troubleshooting

**"npm is not recognized"**
- Node.js is not installed or not in PATH
- Restart terminal after installing Node.js
- Check installation: `node --version`

**"Port 3000 already in use"**
- Another server is running on port 3000
- Stop the other server or change PORT in `.env`

**"Cannot find module"**
- Run `npm install` to install dependencies

**Admin panel shows 404**
- Make sure you're running `npm start` (not `npx serve`)
- Check that server.js is running

