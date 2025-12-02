// Helper script to generate password hashes for admin accounts
// Usage: node generate-admin-hash.js <password>

const bcrypt = require('bcrypt');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function hashPassword(plainPassword) {
    const saltRounds = 10;
    return bcrypt.hashSync(plainPassword, saltRounds);
}

// Get password from command line argument or prompt
const password = process.argv[2];

if (password) {
    // Password provided as argument
    const hash = hashPassword(password);
    console.log('\n=== Admin Password Hash Generator ===\n');
    console.log('Password:', password);
    console.log('Hash:', hash);
    console.log('\nCopy the hash above and add it to admin-accounts.js\n');
    process.exit(0);
} else {
    // Prompt for password
    console.log('=== Admin Password Hash Generator ===\n');
    rl.question('Enter password to hash: ', (password) => {
        if (!password) {
            console.log('No password provided. Exiting.');
            rl.close();
            process.exit(1);
        }
        
        const hash = hashPassword(password);
        console.log('\n✓ Password hashed successfully!\n');
        console.log('Password:', password);
        console.log('Hash:', hash);
        console.log('\nCopy the hash above and add it to admin-accounts.js\n');
        console.log('Example account entry:');
        console.log('{');
        console.log('    email: \'your-email@example.com\',');
        console.log(`    passwordHash: '${hash}',`);
        console.log('    name: \'Your Name\',');
        console.log('    role: \'admin\',');
        console.log('    createdAt: new Date().toISOString(),');
        console.log('    active: true');
        console.log('}\n');
        
        rl.close();
        process.exit(0);
    });
}

