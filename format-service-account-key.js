#!/usr/bin/env node
/**
 * Helper script to format service account JSON key for Render
 * 
 * Usage:
 *   node format-service-account-key.js path/to/service-account-key.json
 * 
 * This will output:
 *   1. A single-line JSON string (for GA4_SERVICE_ACCOUNT_KEY)
 *   2. A base64 encoded version (alternative)
 */

const fs = require('fs');
const path = require('path');

const keyFile = process.argv[2];

if (!keyFile) {
    console.log('❌ Error: Please provide the path to your service account JSON key file');
    console.log('');
    console.log('Usage:');
    console.log('  node format-service-account-key.js path/to/service-account-key.json');
    console.log('');
    console.log('Example:');
    console.log('  node format-service-account-key.js ./nova-hub-ga4-key.json');
    process.exit(1);
}

if (!fs.existsSync(keyFile)) {
    console.log(`❌ Error: File not found: ${keyFile}`);
    process.exit(1);
}

try {
    // Read and parse JSON to validate it
    const jsonContent = fs.readFileSync(keyFile, 'utf8');
    const jsonData = JSON.parse(jsonContent);
    
    // Validate it's a service account key
    if (!jsonData.client_email || !jsonData.private_key) {
        console.log('❌ Error: This does not appear to be a valid service account key file');
        console.log('   Expected fields: client_email, private_key');
        process.exit(1);
    }
    
    console.log('✅ Valid service account key file found!');
    console.log(`   Service account email: ${jsonData.client_email}`);
    console.log('');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📋 OPTION 1: JSON String (Recommended for Render)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('Copy this entire value and paste it as GA4_SERVICE_ACCOUNT_KEY in Render:');
    console.log('');
    console.log(JSON.stringify(jsonData));
    console.log('');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📋 OPTION 2: Base64 Encoded (Alternative)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('Or use this base64 encoded version:');
    console.log('');
    const base64 = Buffer.from(jsonContent).toString('base64');
    console.log(base64);
    console.log('');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📝 Next Steps:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('1. Copy the JSON string above (Option 1)');
    console.log('2. Go to Render Dashboard → Your Service → Environment tab');
    console.log('3. Add new variable: GA4_SERVICE_ACCOUNT_KEY');
    console.log('4. Paste the JSON string as the value');
    console.log('5. Save and redeploy');
    console.log('');
    console.log('⚠️  IMPORTANT: Grant this service account access to your GA4 property:');
    console.log(`   Email: ${jsonData.client_email}`);
    console.log('   Role: Viewer');
    console.log('   Location: Google Analytics → Admin → Property access management');
    console.log('');
    
} catch (error) {
    console.log(`❌ Error reading/parsing JSON file: ${error.message}`);
    process.exit(1);
}

