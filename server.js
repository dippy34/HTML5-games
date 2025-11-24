const express = require('express');
const cors = require('cors');
const path = require('path');
const { createServer } = require('http');
require('dotenv').config();

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
const fs = require('fs');

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

// Serve Interstellar static files (proxy UI)
app.use('/ca', cors({ origin: true }));
app.use(express.static(path.join(__dirname, 'interstellar-static'), {
    setHeaders: (res) => {
        res.set('Cross-Origin-Opener-Policy', 'same-origin');
        res.set('Cross-Origin-Embedder-Policy', 'require-corp');
    }
}));

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
        const { password } = req.body;
        
        if (!password) {
            return res.status(400).json({ error: 'Password required' });
        }

        const isValid = await auth.verifyAdminPassword(password);
        
        // Debug logging
        console.log('Login attempt - Password provided:', password ? 'Yes' : 'No');
        console.log('Password valid:', isValid);
        
        if (isValid) {
            const token = auth.createSession();
            res.json({ success: true, token });
        } else {
            res.status(401).json({ error: 'Invalid password' });
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
        
        if (isValid) {
            res.json({ valid: true });
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

app.get('/play.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'interstellar-static', 'games.html'));
});

app.get('/c', (req, res) => {
    res.sendFile(path.join(__dirname, 'interstellar-static', 'settings.html'));
});

app.get('/d', (req, res) => {
    res.sendFile(path.join(__dirname, 'interstellar-static', 'tabs.html'));
});

// Serve Nova Hub games at /games (HIDDEN - kept for future use)
// app.get('/games', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

// Serve admin.html (HIDDEN - kept for future use)
// app.get('/admin', (req, res) => {
//     res.sendFile(path.join(__dirname, 'admin.html'));
// });

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

// Start server
server.listen(PORT, () => {
    console.log(`Starting Nova Hub Server (v5) - Proxy Edition...`);
    console.log(`Server running on port ${PORT}`);
    console.log(`Nova Hub Proxy: http://localhost:${PORT}/`);
    // Games and Admin panel are hidden but code is preserved for future use
});

