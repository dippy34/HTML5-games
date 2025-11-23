const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'analytics.db');

// Initialize database
function initDatabase() {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error('Error opening database:', err);
                reject(err);
                return;
            }
            console.log('Connected to SQLite database');
        });

        // Create tables
        db.serialize(() => {
            // Visits table
            db.run(`CREATE TABLE IF NOT EXISTS visits (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                session_id TEXT NOT NULL,
                timestamp INTEGER NOT NULL,
                duration INTEGER DEFAULT 0,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )`);

            // Game plays table
            db.run(`CREATE TABLE IF NOT EXISTS game_plays (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                game_name TEXT NOT NULL,
                session_id TEXT NOT NULL,
                timestamp INTEGER NOT NULL,
                duration INTEGER DEFAULT 0,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )`);

            // Sessions table
            db.run(`CREATE TABLE IF NOT EXISTS sessions (
                session_id TEXT PRIMARY KEY,
                start_time INTEGER NOT NULL,
                last_active INTEGER NOT NULL,
                total_duration INTEGER DEFAULT 0,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )`);

            // Create indexes for better query performance
            db.run(`CREATE INDEX IF NOT EXISTS idx_visits_timestamp ON visits(timestamp)`);
            db.run(`CREATE INDEX IF NOT EXISTS idx_game_plays_timestamp ON game_plays(timestamp)`);
            db.run(`CREATE INDEX IF NOT EXISTS idx_game_plays_name ON game_plays(game_name)`);
            db.run(`CREATE INDEX IF NOT EXISTS idx_sessions_start_time ON sessions(start_time)`);

            resolve(db);
        });
    });
}

// Get database instance
let dbInstance = null;

async function getDatabase() {
    if (!dbInstance) {
        dbInstance = await initDatabase();
    }
    return dbInstance;
}

// Record a visit
function recordVisit(sessionId, timestamp, duration = 0) {
    return new Promise(async (resolve, reject) => {
        const db = await getDatabase();
        db.run(
            'INSERT INTO visits (session_id, timestamp, duration) VALUES (?, ?, ?)',
            [sessionId, timestamp, duration],
            function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            }
        );
    });
}

// Record a game play
function recordGamePlay(gameName, sessionId, timestamp, duration = 0) {
    return new Promise(async (resolve, reject) => {
        const db = await getDatabase();
        db.run(
            'INSERT INTO game_plays (game_name, session_id, timestamp, duration) VALUES (?, ?, ?, ?)',
            [gameName, sessionId, timestamp, duration],
            function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            }
        );
    });
}

// Update or create session
function updateSession(sessionId, startTime, lastActive, totalDuration) {
    return new Promise(async (resolve, reject) => {
        const db = await getDatabase();
        db.run(
            `INSERT INTO sessions (session_id, start_time, last_active, total_duration)
             VALUES (?, ?, ?, ?)
             ON CONFLICT(session_id) DO UPDATE SET
             last_active = excluded.last_active,
             total_duration = excluded.total_duration`,
            [sessionId, startTime, lastActive, totalDuration],
            function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            }
        );
    });
}

// Get statistics for a timeframe
function getStats(timeframe) {
    return new Promise(async (resolve, reject) => {
        const db = await getDatabase();
        const now = Date.now();
        let startTime = 0;

        switch (timeframe) {
            case '1hour':
                startTime = now - (60 * 60 * 1000);
                break;
            case '12hours':
                startTime = now - (12 * 60 * 60 * 1000);
                break;
            case 'day':
                startTime = now - (24 * 60 * 60 * 1000);
                break;
            case '3days':
                startTime = now - (3 * 24 * 60 * 60 * 1000);
                break;
            case 'week':
                startTime = now - (7 * 24 * 60 * 60 * 1000);
                break;
            case '2weeks':
                startTime = now - (14 * 24 * 60 * 60 * 1000);
                break;
            case 'month':
                startTime = now - (30 * 24 * 60 * 60 * 1000);
                break;
            case '6months':
                startTime = now - (180 * 24 * 60 * 60 * 1000);
                break;
            case 'year':
                startTime = now - (365 * 24 * 60 * 60 * 1000);
                break;
            case 'total':
                startTime = 0;
                break;
            default:
                startTime = now - (24 * 60 * 60 * 1000);
        }

        // Get unique visitors
        db.get(
            `SELECT COUNT(DISTINCT session_id) as unique_visitors,
                    COUNT(*) as total_visits,
                    AVG(duration) as avg_duration
             FROM visits
             WHERE timestamp >= ?`,
            [startTime],
            (err, visitStats) => {
                if (err) {
                    reject(err);
                    return;
                }

                // Get total game plays
                db.get(
                    `SELECT COUNT(*) as total_plays
                     FROM game_plays
                     WHERE timestamp >= ?`,
                    [startTime],
                    (err, gameStats) => {
                        if (err) {
                            reject(err);
                            return;
                        }

                        // Convert avg_duration from milliseconds to seconds
                        const avgDurationMs = visitStats.avg_duration || 0;
                        const avgDurationSeconds = Math.round(avgDurationMs / 1000);
                        
                        resolve({
                            uniqueVisitors: visitStats.unique_visitors || 0,
                            totalVisits: visitStats.total_visits || 0,
                            avgDuration: avgDurationSeconds,
                            totalGamePlays: gameStats.total_plays || 0
                        });
                    }
                );
            }
        );
    });
}

// Get top games
function getTopGames(limit = 10) {
    return new Promise(async (resolve, reject) => {
        const db = await getDatabase();
        db.all(
            `SELECT game_name, COUNT(*) as play_count
             FROM game_plays
             GROUP BY game_name
             ORDER BY play_count DESC
             LIMIT ?`,
            [limit],
            (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            }
        );
    });
}

// Get chart data for a timeframe
function getChartData(timeframe) {
    return new Promise(async (resolve, reject) => {
        const db = await getDatabase();
        const now = Date.now();
        let startTime = 0;
        let interval = 3600000; // Default 1 hour intervals

        switch (timeframe) {
            case '1hour':
                startTime = now - (60 * 60 * 1000);
                interval = 600000; // 10 minutes
                break;
            case '12hours':
                startTime = now - (12 * 60 * 60 * 1000);
                interval = 3600000; // 1 hour
                break;
            case 'day':
                startTime = now - (24 * 60 * 60 * 1000);
                interval = 3600000; // 1 hour
                break;
            case '3days':
                startTime = now - (3 * 24 * 60 * 60 * 1000);
                interval = 21600000; // 6 hours
                break;
            case 'week':
                startTime = now - (7 * 24 * 60 * 60 * 1000);
                interval = 86400000; // 1 day
                break;
            case '2weeks':
                startTime = now - (14 * 24 * 60 * 60 * 1000);
                interval = 172800000; // 2 days
                break;
            case 'month':
                startTime = now - (30 * 24 * 60 * 60 * 1000);
                interval = 259200000; // 3 days
                break;
            case '6months':
                startTime = now - (180 * 24 * 60 * 60 * 1000);
                interval = 604800000; // 1 week
                break;
            case 'year':
                startTime = now - (365 * 24 * 60 * 60 * 1000);
                interval = 2592000000; // 30 days
                break;
            case 'total':
                startTime = 0;
                interval = 2592000000; // 30 days
                break;
        }

        // Get visits grouped by interval (optimized query)
        db.all(
            `SELECT 
                CAST((timestamp / ?) AS INTEGER) * ? as time_bucket,
                COUNT(DISTINCT session_id) as unique_visitors,
                COUNT(*) as total_visits
             FROM visits
             WHERE timestamp >= ?
             GROUP BY CAST((timestamp / ?) AS INTEGER)
             ORDER BY time_bucket`,
            [interval, interval, startTime, interval],
            (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    // Fill in missing time buckets for better chart visualization
                    const chartData = [];
                    if (rows.length > 0) {
                        const firstBucket = rows[0].time_bucket;
                        const lastBucket = rows[rows.length - 1].time_bucket;
                        let currentBucket = firstBucket;
                        let rowIndex = 0;
                        
                        while (currentBucket <= lastBucket) {
                            if (rowIndex < rows.length && rows[rowIndex].time_bucket === currentBucket) {
                                chartData.push({
                                    time: rows[rowIndex].time_bucket,
                                    uniqueVisitors: rows[rowIndex].unique_visitors,
                                    totalVisits: rows[rowIndex].total_visits
                                });
                                rowIndex++;
                            } else {
                                chartData.push({
                                    time: currentBucket,
                                    uniqueVisitors: 0,
                                    totalVisits: 0
                                });
                            }
                            currentBucket += interval;
                        }
                    }
                    resolve(chartData);
                }
            }
        );
    });
}

// Get current active sessions (last 5 minutes)
function getActiveSessions() {
    return new Promise(async (resolve, reject) => {
        const db = await getDatabase();
        const fiveMinutesAgo = Date.now() - (5 * 60 * 1000);
        db.get(
            `SELECT COUNT(DISTINCT session_id) as active_sessions
             FROM sessions
             WHERE last_active >= ?`,
            [fiveMinutesAgo],
            (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row.active_sessions || 0);
                }
            }
        );
    });
}

module.exports = {
    getDatabase,
    recordVisit,
    recordGamePlay,
    updateSession,
    getStats,
    getTopGames,
    getChartData,
    getActiveSessions
};

