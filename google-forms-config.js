// Google Forms Configuration
// Add your Google Form IDs and Sheet IDs here

// To find your Form ID: Look at the form URL
// Example: https://forms.gle/SLo4cgDbHH1rNRdJ9
// Form ID: SLo4cgDbHH1rNRdJ9

// To find your Sheet ID: 
// 1. Open your Google Form
// 2. Click "Responses" tab
// 3. Click the green Sheets icon (or create linked sheet)
// 4. The Sheet ID is in the URL: https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit

module.exports = {
    forms: [
        {
            name: 'Bug Reports',
            formId: 'SLo4cgDbHH1rNRdJ9',
            formUrl: 'https://forms.gle/SLo4cgDbHH1rNRdJ9',
            sheetId: null, // Add Sheet ID here if you want to use Sheets API
            enabled: true
        },
        {
            name: 'Game Requests',
            formId: 'NUSFG88PLRvadHwn6',
            formUrl: 'https://forms.gle/NUSFG88PLRvadHwn6',
            sheetId: null, // Add Sheet ID here if you want to use Sheets API
            enabled: true
        }
    ],
    
    // API method: 'sheets' or 'forms' or 'appscript'
    // 'sheets' - Use Google Sheets API (requires Sheet ID and API key)
    // 'forms' - Use Google Forms API (requires OAuth)
    // 'appscript' - Use Google Apps Script web app (recommended - see instructions below)
    method: 'appscript',
    
    // For Google Sheets API method:
    googleSheetsApiKey: process.env.GOOGLE_SHEETS_API_KEY || null,
    
    // For Google Apps Script method (recommended):
    // Create a Google Apps Script web app that returns JSON
    // See google-forms-appscript.js for the script code
    get appScriptUrl() {
        return process.env.GOOGLE_FORMS_APPSCRIPT_URL || null;
    }
};

