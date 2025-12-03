// Test script to debug Google Forms integration
// Run with: node test-google-forms.js

require('dotenv').config();

// Load .env.local if it exists
const fs = require('fs');
if (fs.existsSync('.env.local')) {
    require('dotenv').config({ path: '.env.local', override: true });
    console.log('[Test] Loaded .env.local');
}

const googleForms = require('./google-forms');

async function test() {
    console.log('\n=== Google Forms Integration Test ===\n');
    
    // Check configuration
    console.log('1. Checking configuration...');
    console.log('   Method:', googleForms.config.method);
    console.log('   Apps Script URL:', googleForms.config.appScriptUrl || 'NOT SET');
    console.log('   Forms configured:', googleForms.config.forms.length);
    
    if (!googleForms.config.appScriptUrl) {
        console.error('\n❌ ERROR: GOOGLE_FORMS_APPSCRIPT_URL is not set in .env.local');
        console.log('\nTo fix:');
        console.log('1. Open .env.local');
        console.log('2. Add: GOOGLE_FORMS_APPSCRIPT_URL=your_url_here');
        console.log('3. Restart the server');
        process.exit(1);
    }
    
    console.log('\n2. Testing Apps Script connection...');
    try {
        const responses = await googleForms.getAllFormResponses();
        
        console.log('\n✅ Successfully fetched responses!');
        console.log('\n3. Response structure:');
        console.log(JSON.stringify(responses, null, 2));
        
        // Check each form
        console.log('\n4. Form status:');
        Object.entries(responses).forEach(([formName, formData]) => {
            if (formData.error) {
                console.log(`   ❌ ${formName}: ERROR - ${formData.error}`);
            } else if (!formData.responses || formData.responses.length === 0) {
                console.log(`   ⚠️  ${formName}: No responses found`);
            } else {
                console.log(`   ✅ ${formName}: ${formData.responses.length} responses`);
            }
        });
        
    } catch (error) {
        console.error('\n❌ ERROR:', error.message);
        console.error('\nStack:', error.stack);
        
        console.log('\nTroubleshooting:');
        console.log('1. Verify your Apps Script URL is correct');
        console.log('2. Make sure the Apps Script is deployed as a web app');
        console.log('3. Check that "Who has access" is set to "Anyone"');
        console.log('4. Test the URL directly in your browser - it should return JSON');
        console.log('5. Make sure Sheet IDs are configured in the Apps Script');
        
        process.exit(1);
    }
}

test().catch(console.error);

