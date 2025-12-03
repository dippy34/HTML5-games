const express = require('express');
const cors = require('cors');
const path = require('path');
const { createServer } = require('http');
const fs = require('fs');

// Load environment variables
// Load .env first (for shared/default values)
require('dotenv').config();

// Load .env.local if it exists (for local overrides - not in git)
// This allows each developer to have their own local environment
if (fs.existsSync('.env.local')) {
    require('dotenv').config({ path: '.env.local', override: true });
    console.log('[Config] Loaded local environment variables from .env.local');
}

// Interstellar/BARE server imports
const { createBareServer } = require('@nebula-services/bare-server-node');

const db = require('./database');
const auth = require('./auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Create BARE server for Interstellar proxy (Mathematics/Ultraviolet)
const bare = createBareServer('/ca/', {
    logErrors: true,
    blockLocal: false,
});

// Create HTTP server to handle BARE and WebSocket upgrades
const server = createServer();

// Handle BARE requests with performance logging
server.on('request', (req, res) => {
    const startTime = Date.now();
    const originalEnd = res.end;
    
    res.end = function(...args) {
        const duration = Date.now() - startTime;
        if (duration > 100) { // Log slow requests (>100ms)
            console.log(`[PERF] ${req.method} ${req.url} - ${duration}ms`);
        }
        originalEnd.apply(this, args);
    };
    
    if (bare.shouldRoute(req)) {
        const bareStart = Date.now();
        bare.routeRequest(req, res);
        const bareDuration = Date.now() - bareStart;
        if (bareDuration > 50) {
            console.log(`[BARE] Routing ${req.url} - ${bareDuration}ms`);
        }
    } else {
        app(req, res);
    }
});

// Handle WebSocket upgrades for BARE
server.on('upgrade', (req, socket, head) => {
    if (bare.shouldRoute(req)) {
        bare.routeUpgrade(req, socket, head);
    } else {
        socket.end();
    }
});

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'Range'],
    exposedHeaders: ['Content-Range', 'Content-Length', 'Accept-Ranges']
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());

// Set proper MIME types and headers for Unity and other game files
app.use((req, res, next) => {
    // Set CORS headers for all requests
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Range');
    res.header('Access-Control-Expose-Headers', 'Content-Range, Content-Length, Accept-Ranges');
    
    // Set proper MIME types
    if (req.url.endsWith('.unityweb')) {
        res.type('application/octet-stream');
        res.header('Content-Type', 'application/octet-stream');
    } else if (req.url.endsWith('.wasm')) {
        res.type('application/wasm');
        res.header('Content-Type', 'application/wasm');
    } else if (req.url.endsWith('.data')) {
        res.type('application/octet-stream');
        res.header('Content-Type', 'application/octet-stream');
    } else if (req.url.endsWith('.json')) {
        res.type('application/json');
    }
    
    // Enable range requests for Unity files (important for large files)
    if (req.url.match(/\.(unityweb|wasm|data)$/)) {
        res.header('Accept-Ranges', 'bytes');
    }
    
    next();
});

// Custom handler for Unity files to ensure proper range request support
app.get(/\/games\/.*\.(unityweb|wasm|data)$/, (req, res, next) => {
    // Remove /games prefix for file path
    const filePath = path.join(__dirname, req.path.replace(/^\/games/, ''));
    
    if (!fs.existsSync(filePath)) {
        return next();
    }
    
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;
    
    // Set headers
    res.set({
        'Content-Type': req.path.endsWith('.wasm') ? 'application/wasm' : 'application/octet-stream',
        'Accept-Ranges': 'bytes',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Expose-Headers': 'Content-Range, Content-Length, Accept-Ranges'
    });
    
    if (range) {
        // Handle range request
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(filePath, { start, end });
        
        res.status(206); // Partial Content
        res.set({
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Content-Length': chunksize
        });
        
        file.pipe(res);
    } else {
        // Full file request
        res.set('Content-Length', fileSize);
        const file = fs.createReadStream(filePath);
        file.pipe(res);
    }
});

// Route for local games redirect (rx) - must be before static middleware
app.get('/rx', (req, res) => {
    res.sendFile(path.join(__dirname, 'interstellar-static', 'rx.html'));
});

// Interstellar routes - must be before static middleware
app.get('/d', (req, res) => {
    const filePath = path.join(__dirname, 'interstellar-static', 'tabs.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error serving /d:', err);
            res.status(404).send('File not found');
        }
    });
});

app.get('/d/', (req, res) => {
    const filePath = path.join(__dirname, 'interstellar-static', 'tabs.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error serving /d/:', err);
            res.status(404).send('File not found');
        }
    });
});

// Serve Interstellar static files (proxy UI)
app.use('/ca', cors({ origin: true }));
app.use(express.static(path.join(__dirname, 'interstellar-static'), {
    setHeaders: (res) => {
        res.set('Cross-Origin-Opener-Policy', 'same-origin');
        res.set('Cross-Origin-Embedder-Policy', 'require-corp');
    }
}));

// Middleware to inject panic button into game HTML files
app.use('/e', (req, res, next) => {
    let filePath;
    
    // Handle explicit HTML files
    if (req.path.endsWith('.html')) {
        const gamePath = req.path.replace(/^\/e\//, '');
        filePath = path.join(__dirname, 'html5', gamePath);
    } 
    // Handle directory requests (will serve index.html)
    else if (req.path.endsWith('/')) {
        const gamePath = req.path.replace(/^\/e\//, '').replace(/\/$/, '');
        filePath = path.join(__dirname, 'html5', gamePath, 'index.html');
    } 
    // Not an HTML request, skip
    else {
        return next();
    }
    
    // Check if file exists and is a file
    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            // File doesn't exist or isn't a file, let static middleware handle it
            return next();
        }
        
        // Read and inject panic button
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return next();
            }
                
                // Inject panic button script before </body> or at the end
                const panicButtonScript = `
<!-- Panic Button Injection -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
<style>
/* Static background - no animations */
body {
   background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
   background-attachment: fixed;
   min-height: 100vh;
}

body::before {
   content: '';
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background: 
      radial-gradient(circle at 20% 50%, rgba(74, 158, 255, 0.1) 0%, transparent 60%),
      radial-gradient(circle at 80% 80%, rgba(138, 43, 226, 0.1) 0%, transparent 60%),
      radial-gradient(circle at 40% 20%, rgba(74, 158, 255, 0.08) 0%, transparent 60%);
   opacity: 1;
   pointer-events: none;
   z-index: 0;
}

.panic-button {
   position: fixed;
   right: 16px;
   bottom: 16px;
   width: 60px;
   height: 60px;
   border-radius: 12px;
   border: 3px solid #ff4444;
   background: linear-gradient(135deg, #ff3333 0%, #cc0000 100%);
   color: #ffffff;
   display: flex;
   align-items: center;
   justify-content: center;
   cursor: pointer;
   z-index: 99999;
   box-shadow: 0 6px 20px rgba(255, 68, 68, 0.6), 0 0 20px rgba(255, 68, 68, 0.4);
   transition: all 0.2s ease;
   font-size: 24px;
   font-weight: bold;
}
.panic-button:hover {
   background: linear-gradient(135deg, #ff5555 0%, #dd1111 100%);
   transform: translateY(-3px) scale(1.05);
   box-shadow: 0 8px 25px rgba(255, 68, 68, 0.8), 0 0 30px rgba(255, 68, 68, 0.6);
   border-color: #ff6666;
}
.panic-button:active {
   transform: translateY(-1px) scale(0.98);
}
</style>
<script>
(function() {
  function initPanicButton() {
    try {
      const panicEnabled = localStorage.getItem("panicButtonEnabled") === "true";
      let panicUrl = localStorage.getItem("panicButtonUrl");

      // Ensure URL has a protocol
      if (panicUrl && !panicUrl.match(/^https?:\/\//i)) {
        panicUrl = "https://" + panicUrl;
        localStorage.setItem("panicButtonUrl", panicUrl);
      }

      if (panicEnabled && panicUrl) {
        let existing = document.querySelector(".panic-button");
        if (!existing) {
          const btn = document.createElement("button");
          btn.className = "panic-button";
          btn.id = "panic-button";
          btn.title = "Panic Button - Click to escape";
          btn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>';
          btn.addEventListener("click", () => {
            window.location.href = panicUrl;
          });
          document.body.appendChild(btn);
        } else {
          // Update URL if button exists
          existing.onclick = () => {
            window.location.href = panicUrl;
          };
        }
      } else {
        const existing = document.querySelector(".panic-button");
        if (existing) {
          existing.remove();
        }
      }
    } catch (e) {
      console.error("Error initialising panic button", e);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPanicButton);
  } else {
    initPanicButton();
  }

  // Listen for storage changes to update instantly
  window.addEventListener("storage", (e) => {
    if (e.key === "panicButtonEnabled" || e.key === "panicButtonUrl") {
      initPanicButton();
    }
  });

  // Also listen for custom storage events (for same-tab updates)
  window.addEventListener("panicButtonUpdate", () => {
    initPanicButton();
  });

  setTimeout(initPanicButton, 500);
  setTimeout(initPanicButton, 1000);
  setTimeout(initPanicButton, 2000);
})();
</script>
`;
                
                let modifiedData = data;
                if (data.includes('</body>')) {
                    modifiedData = data.replace('</body>', panicButtonScript + '</body>');
                } else {
                    modifiedData = data + panicButtonScript;
                }
                
                res.set('Content-Type', 'text/html');
                res.send(modifiedData);
            });
        });
});

// Serve local games from html5 directory at /e/ path
app.use('/e', express.static(path.join(__dirname, 'html5'), {
    index: 'index.html',
    setHeaders: (res, filePath) => {
        res.set('Access-Control-Allow-Origin', '*');
        
        // Set MIME types for JavaScript files
        if (filePath.endsWith('.js')) {
            res.set('Content-Type', 'application/javascript');
        }
        // Set MIME type for JSON files
        if (filePath.endsWith('.json')) {
            res.set('Content-Type', 'application/json');
        }
        // Set MIME type for SWF files
        if (filePath.endsWith('.swf')) {
            res.set('Content-Type', 'application/x-shockwave-flash');
        }
        // Set MIME types for audio files
        if (filePath.endsWith('.mp3')) {
            res.set('Content-Type', 'audio/mpeg');
        }
        if (filePath.endsWith('.ogg') || filePath.endsWith('.flac')) {
            res.set('Content-Type', filePath.endsWith('.ogg') ? 'audio/ogg' : 'audio/flac');
        }
        // Set MIME types for 3D model files
        if (filePath.endsWith('.glb') || filePath.endsWith('.gltf')) {
            res.set('Content-Type', 'model/gltf-binary');
        }
        // Enable range requests for Unity files
        if (filePath.match(/\.(unityweb|wasm|data)$/)) {
            res.set('Accept-Ranges', 'bytes');
            res.set('Content-Type', filePath.endsWith('.wasm') ? 'application/wasm' : 'application/octet-stream');
        }
    }
}));

// Route for all.min.js (proxy script used by games)
app.get('/js/all.min.js', (req, res) => {
    res.set('Content-Type', 'application/javascript');
    res.set('Access-Control-Allow-Origin', '*');
    // Return empty script - games use this as a proxy/loader
    res.send('// Proxy script');
});

// Serve Nova Hub games and static files (HIDDEN - kept for future use)
// app.use('/games', express.static(__dirname, {
//     setHeaders: (res, filePath) => {
//         // Set CORS headers for static files
//         res.set('Access-Control-Allow-Origin', '*');
//         
//         // Enable range requests for Unity files
//         if (filePath.match(/\.(unityweb|wasm|data)$/)) {
//             res.set('Accept-Ranges', 'bytes');
//             res.set('Content-Type', filePath.endsWith('.wasm') ? 'application/wasm' : 'application/octet-stream');
//         }
//     }
// }));

// Initialize database (non-blocking - server will start even if DB fails)
db.getDatabase().catch(err => {
    console.error('Failed to initialize database:', err);
    console.warn('Server will continue without database. Analytics will not be saved.');
    // Don't exit - let the server start anyway
});

// API Routes

// Track visit
app.post('/api/visit', async (req, res) => {
    try {
        const { sessionId, timestamp, duration } = req.body;
        
        if (!sessionId || !timestamp) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        await db.recordVisit(sessionId, timestamp, duration || 0);
        await db.updateSession(sessionId, timestamp, timestamp, duration || 0);
        
        res.json({ success: true });
    } catch (error) {
        console.error('Error recording visit:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Track game play
app.post('/api/game-play', async (req, res) => {
    try {
        const { gameName, sessionId, timestamp, duration } = req.body;
        
        if (!gameName || !sessionId || !timestamp) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        await db.recordGamePlay(gameName, sessionId, timestamp, duration || 0);
        
        res.json({ success: true });
    } catch (error) {
        console.error('Error recording game play:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update session
app.post('/api/session', async (req, res) => {
    try {
        const { sessionId, startTime, lastActive, totalDuration } = req.body;
        
        if (!sessionId || !startTime || !lastActive) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        await db.updateSession(sessionId, startTime, lastActive, totalDuration || 0);
        
        res.json({ success: true });
    } catch (error) {
        console.error('Error updating session:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get statistics
app.get('/api/stats/:timeframe', async (req, res) => {
    try {
        const { timeframe } = req.params;
        const stats = await db.getStats(timeframe);
        res.json(stats);
    } catch (error) {
        console.error('Error getting stats:', error);
        // Return empty stats if database is unavailable
        res.json({
            uniqueVisitors: 0,
            averageDuration: 0,
            totalGamePlays: 0,
            activeSessions: 0
        });
    }
});

// Get top games
app.get('/api/top-games', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const topGames = await db.getTopGames(limit);
        res.json(topGames);
    } catch (error) {
        console.error('Error getting top games:', error);
        // Return empty array if database is unavailable
        res.json([]);
    }
});

// Get chart data
app.get('/api/chart/:timeframe', async (req, res) => {
    try {
        const { timeframe } = req.params;
        const chartData = await db.getChartData(timeframe);
        res.json(chartData);
    } catch (error) {
        console.error('Error getting chart data:', error);
        // Return empty chart data if database is unavailable
        res.json({ labels: [], data: [] });
    }
});

// Get active sessions
app.get('/api/active-sessions', async (req, res) => {
    try {
        const activeSessions = await db.getActiveSessions();
        res.json({ activeSessions });
    } catch (error) {
        console.error('Error getting active sessions:', error);
        // Return empty sessions if database is unavailable
        res.json({ activeSessions: 0 });
    }
});

// Admin authentication
app.post('/api/admin/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password required' });
        }

        const account = await auth.verifyAdminCredentials(email, password);
        
        if (account) {
            const token = auth.createSession(account);
            console.log(`Admin login successful: ${account.email} (${account.role})`);
            res.json({ 
                success: true, 
                token,
                user: {
                    email: account.email,
                    name: account.name,
                    role: account.role
                }
            });
        } else {
            console.log(`Failed login attempt for email: ${email}`);
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Verify admin session
app.get('/api/admin/verify', (req, res) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const isValid = auth.verifySession(token);
        const user = auth.getSessionUser(token);
        
        if (isValid && user) {
            res.json({ valid: true, user });
        } else {
            res.status(401).json({ valid: false });
        }
    } catch (error) {
        console.error('Error verifying session:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Admin logout
app.post('/api/admin/logout', (req, res) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (token) {
            auth.removeSession(token);
        }
        res.json({ success: true });
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Serve Interstellar proxy at root
app.get('/', (req, res) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    res.sendFile(path.join(__dirname, 'interstellar-static', 'index.html'));
});

// Interstellar routes (apps, games, settings, tabs)
app.get('/b', (req, res) => {
    res.sendFile(path.join(__dirname, 'interstellar-static', 'apps.html'));
});

app.get('/a', (req, res) => {
    res.sendFile(path.join(__dirname, 'interstellar-static', 'games.html'));
});

app.get('/selenite', (req, res) => {
    res.sendFile(path.join(__dirname, 'interstellar-static', 'selenite.html'));
});

app.get('/play.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'interstellar-static', 'games.html'));
});

app.get('/c', (req, res) => {
    res.sendFile(path.join(__dirname, 'interstellar-static', 'settings.html'));
});

app.get('/updates.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'interstellar-static', 'updates.html'));
});

// Serve Nova Hub games at /games
app.get('/games', (req, res) => {
    res.sendFile(path.join(__dirname, 'interstellar-static', 'games.html'));
});

// Serve admin.html
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Bug report API (public - anyone can report bugs)
app.post('/api/bug-report', async (req, res) => {
    try {
        const { description, pageUrl } = req.body;
        const userAgent = req.headers['user-agent'] || 'Unknown';
        
        if (!description || !description.trim()) {
            return res.status(400).json({ error: 'Description is required' });
        }

        // Ensure database is initialized
        await db.getDatabase();
        await db.reportBug(description.trim(), pageUrl || req.headers.referer || 'Unknown', userAgent);
        res.json({ success: true, message: 'Bug reported successfully' });
    } catch (error) {
        console.error('Error reporting bug:', error);
        console.error('Error stack:', error.stack);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

// Get bugs (admin only)
app.get('/api/bugs', async (req, res) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token || !auth.verifySession(token)) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Ensure database is initialized
        await db.getDatabase();
        const { status } = req.query;
        const bugs = await db.getBugs(status || null);
        res.json(bugs);
    } catch (error) {
        console.error('Error fetching bugs:', error);
        console.error('Error stack:', error.stack);
        // Return empty array if database is unavailable
        res.json([]);
    }
});

// Update bug status (admin only)
app.post('/api/bugs/:id/status', async (req, res) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token || !auth.verifySession(token)) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const { id } = req.params;
        const { status } = req.body;
        
        if (!['pending', 'in-progress', 'resolved', 'closed'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        // Ensure database is initialized
        await db.getDatabase();
        await db.updateBugStatus(parseInt(id), status);
        res.json({ success: true });
    } catch (error) {
        console.error('Error updating bug status:', error);
        console.error('Error stack:', error.stack);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Google Forms integration
const googleForms = require('./google-forms');

// Get Google Forms responses (admin only)
app.get('/api/google-forms', async (req, res) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token || !auth.verifySession(token)) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const responses = await googleForms.getAllFormResponses();
        // Always return a response, even if empty/not configured
        res.json(responses || {});
    } catch (error) {
        console.error('Error fetching Google Forms responses:', error);
        // Return empty structure instead of error to allow admin panel to load
        res.json({});
    }
});

// Get specific form responses (admin only)
app.get('/api/google-forms/:formName', async (req, res) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token || !auth.verifySession(token)) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const { formName } = req.params;
        const responses = await googleForms.getFormResponses(formName);
        // Always return a response, even if empty/not configured
        res.json(responses || { formName, responses: [], configured: false });
    } catch (error) {
        console.error(`Error fetching Google Forms responses for ${req.params.formName}:`, error);
        // Return empty structure instead of error
        res.json({ 
            formName: req.params.formName, 
            responses: [], 
            configured: false,
            error: error.message 
        });
    }
});

// Start server
server.listen(PORT, () => {
    console.log(`Starting Nova Hub Server (v5) - Proxy Edition...`);
    console.log(`Server running on port ${PORT}`);
    console.log(`Nova Hub Proxy: http://localhost:${PORT}/`);
    // Games and Admin panel are hidden but code is preserved for future use
});

