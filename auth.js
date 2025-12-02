const bcrypt = require('bcrypt');
const adminAccounts = require('./admin-accounts');
require('dotenv').config();

// Hash a password
async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

// Verify password
async function verifyPassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

// Verify admin credentials (email and password)
async function verifyAdminCredentials(email, password) {
    try {
        const account = await adminAccounts.verifyAdminCredentials(email, password);
        return account; // Returns account info or null
    } catch (error) {
        console.error('Error verifying admin credentials:', error);
        return null;
    }
}

// Legacy function for backward compatibility (deprecated)
async function verifyAdminPassword(password) {
    // Try default admin account
    const defaultAccount = adminAccounts.findAdminByEmail('admin@novahub.com');
    if (defaultAccount) {
        const isValid = await verifyPassword(password, defaultAccount.passwordHash);
        return isValid;
    }
    return false;
}

// Generate session token
function generateToken() {
    return require('crypto').randomBytes(32).toString('hex');
}

// Store active sessions (in-memory for simplicity)
// In production, use Redis or database
const activeSessions = new Map();

// Create admin session with user info
function createSession(userInfo = {}) {
    const token = generateToken();
    const expiresAt = Date.now() + (24 * 60 * 60 * 1000); // 24 hours
    activeSessions.set(token, { 
        expiresAt,
        email: userInfo.email,
        name: userInfo.name,
        role: userInfo.role
    });
    
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

// Get session user info
function getSessionUser(token) {
    const session = activeSessions.get(token);
    if (!session || session.expiresAt < Date.now()) {
        return null;
    }
    return {
        email: session.email,
        name: session.name,
        role: session.role
    };
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
    verifyAdminPassword, // Legacy support
    verifyAdminCredentials,
    createSession,
    verifySession,
    removeSession,
    getSessionUser
};

