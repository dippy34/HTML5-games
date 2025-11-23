const bcrypt = require('bcrypt');
require('dotenv').config();

// Default password hash (for 'Matusha2013' password)
// This is a pre-computed hash for 'Matusha2013' with salt rounds 10
const DEFAULT_PASSWORD_HASH = '$2b$10$VX8JaKt4Jfc6DYhakk.lM.iek9Y4Lhv4qAut7f/PgGuClSLFopq82';

// Get password hash from environment or use default
function getPasswordHash() {
    const envHash = process.env.ADMIN_PASSWORD_HASH;
    if (envHash) {
        return envHash;
    }
    
    // If ADMIN_PASSWORD is set, hash it
    const plainPassword = process.env.ADMIN_PASSWORD;
    if (plainPassword) {
        return bcrypt.hashSync(plainPassword, 10);
    }
    
    // Default to hashed 'admin' password
    return DEFAULT_PASSWORD_HASH;
}

// Hash a password
async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

// Verify password
async function verifyPassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

// Verify admin password
async function verifyAdminPassword(password) {
    const storedHash = getPasswordHash();
    return await verifyPassword(password, storedHash);
}

// Generate session token
function generateToken() {
    return require('crypto').randomBytes(32).toString('hex');
}

// Store active sessions (in-memory for simplicity)
// In production, use Redis or database
const activeSessions = new Map();

// Create admin session
function createSession() {
    const token = generateToken();
    const expiresAt = Date.now() + (24 * 60 * 60 * 1000); // 24 hours
    activeSessions.set(token, { expiresAt });
    
    // Clean up expired sessions
    cleanupExpiredSessions();
    
    return token;
}

// Verify session token
function verifySession(token) {
    cleanupExpiredSessions();
    const session = activeSessions.get(token);
    if (!session) {
        return false;
    }
    if (session.expiresAt < Date.now()) {
        activeSessions.delete(token);
        return false;
    }
    return true;
}

// Remove session
function removeSession(token) {
    activeSessions.delete(token);
}

// Clean up expired sessions
function cleanupExpiredSessions() {
    const now = Date.now();
    for (const [token, session] of activeSessions.entries()) {
        if (session.expiresAt < now) {
            activeSessions.delete(token);
        }
    }
}

module.exports = {
    hashPassword,
    verifyAdminPassword,
    createSession,
    verifySession,
    removeSession,
    getPasswordHash
};

