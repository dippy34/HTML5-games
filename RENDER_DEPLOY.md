# Render Deployment Guide

## ✅ Your Setup is Render-Ready!

Your Nova Hub is already configured to work with Render. Here's what's set up:

### Current Configuration:
- ✅ **Procfile**: `web: node server.js` (correct for Render)
- ✅ **package.json**: Has `start` script and dependencies
- ✅ **Server Port**: Uses `process.env.PORT` (Render provides this automatically)
- ✅ **Node.js Version**: Specified in `engines.node` (>=14.0.0)

## Deployment Steps:

### 1. Push to GitHub
Make sure your code is pushed to a GitHub repository.

### 2. Create Render Web Service
1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select your repository

### 3. Configure Build Settings
Render will auto-detect Node.js, but verify:
- **Build Command**: `npm install` (auto-detected)
- **Start Command**: `npm start` (auto-detected)
- **Environment**: `Node`

### 4. Set Environment Variables
In Render dashboard, go to "Environment" tab and add:

```
ADMIN_PASSWORD=your_secure_password_here
```

**OR** (more secure):
```
ADMIN_PASSWORD_HASH=your_bcrypt_hash_here
```

To generate a bcrypt hash:
```bash
node -e "const bcrypt=require('bcrypt');bcrypt.hash('yourpassword',10).then(h=>console.log(h))"
```

### 5. Deploy
Click "Create Web Service" and Render will:
- Install dependencies
- Build your app
- Start the server
- Provide a URL (e.g., `nova-hub.onrender.com`)

## Important Notes:

### Database Persistence
⚠️ **SQLite Database**: Render uses an **ephemeral filesystem**, meaning files are deleted when the service restarts.

**Solutions:**
1. **Use Render Disk** (Recommended for production):
   - In Render dashboard → "Disks" → Add Disk
   - Mount to `/opt/render/project/src/data`
   - Update `database.js` to use the disk path

2. **Use External Database** (Better for production):
   - PostgreSQL (Render offers free PostgreSQL)
   - Update `database.js` to use PostgreSQL instead of SQLite

3. **Accept Data Loss** (For testing):
   - Analytics data will reset on each deploy/restart
   - Fine for testing, not for production

### Port Configuration
✅ Your server already uses `process.env.PORT` which Render provides automatically. No changes needed!

### Static Files
✅ Your Express server serves static files with `app.use(express.static(__dirname))`, so all your games and assets will be served correctly.

## After Deployment:

- **Main Site**: `https://your-app.onrender.com`
- **Admin Panel**: `https://your-app.onrender.com/admin`
- **API Endpoints**: `https://your-app.onrender.com/api/*`

## Troubleshooting:

**Build Fails:**
- Check that all dependencies are in `package.json`
- Verify Node.js version compatibility

**Server Crashes:**
- Check Render logs
- Verify environment variables are set
- Check database file permissions (if using disk)

**404 on Admin Panel:**
- Make sure you're using the Render URL, not localhost
- Verify the server is running (check logs)

## Free Tier Limitations:

- Services spin down after 15 minutes of inactivity
- First request after spin-down takes ~30 seconds
- 750 hours/month free (enough for always-on if you upgrade)

## Recommended: Upgrade to Keep-Alive

To prevent spin-downs, you can:
1. Upgrade to paid plan
2. Use a free uptime monitor (e.g., UptimeRobot) to ping your site every 5 minutes

