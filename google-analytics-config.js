// Google Analytics 4 Configuration
// Set your GA4 Measurement ID here
// Format: G-XXXXXXXXXX

module.exports = {
    // Your Google Analytics 4 Measurement ID
    // Get this from: https://analytics.google.com/
    // Example: 'G-XXXXXXXXXX'
    GA4_MEASUREMENT_ID: process.env.GA4_MEASUREMENT_ID || '', // Leave empty if not configured yet
    
    // Optional: Enable debug mode (logs events to console)
    DEBUG: process.env.NODE_ENV !== 'production',
    
    // Optional: Respect Do Not Track header
    RESPECT_DNT: true
};

