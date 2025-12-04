// Admin Accounts Configuration File
// Add your admin accounts here with email and password
// Passwords should be stored as bcrypt hashes for security

const bcrypt = require('bcrypt');

// Admin accounts configuration
// You can add/edit/remove accounts here
const ADMIN_ACCOUNTS = [
    {
        email: 'aaravharjani@icloud.com',
        passwordHash: '$2b$10$visuuYLmZdccVuu/awavYOQL3gIDj42ZWbKDRNmiV7sFOGL7ov/Sq', // Hashed password for 
        role: 'super_admin', // super_admin, admin, moderator
        createdAt: new Date().toISOString(),
        active: true
    }
    // Add more admin accounts below:
    // {
    //     email: 'another@admin.com',
    //     passwordHash: '$2b$10$...', // Use hashPassword() function or generate-admin-hash.js to generate
    //     name: 'Another Admin',
    //     role: 'admin',
    //     createdAt: new Date().toISOString(),
    //     active: true
    // }
];

// Helper function to hash a password (use this to generate password hashes)
async function hashPassword(plainPassword) {
    const saltRounds = 10;
    return await bcrypt.hash(plainPassword, saltRounds);
}

// Get all active admin accounts
function getAdminAccounts() {
    return ADMIN_ACCOUNTS.filter(account => account.active);
}

// Find admin account by email
function findAdminByEmail(email) {
    return ADMIN_ACCOUNTS.find(account => 
        account.email.toLowerCase() === email.toLowerCase() && account.active
    );
}

// Verify admin credentials
async function verifyAdminCredentials(email, password) {
    const account = findAdminByEmail(email);
    if (!account) {
        return null;
    }
    
    const isValid = await bcrypt.compare(password, account.passwordHash);
    if (!isValid) {
        return null;
    }
    
    // Return account info without password hash
    return {
        email: account.email,
        name: account.name,
        role: account.role
    };
}

module.exports = {
    getAdminAccounts,
    findAdminByEmail,
    verifyAdminCredentials,
    hashPassword,
    ADMIN_ACCOUNTS
};

