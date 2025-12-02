/**
 * GOOGLE APPS SCRIPT CODE
 * 
 * INSTRUCTIONS:
 * 1. Go to script.google.com
 * 2. Create a new project
 * 3. Paste this code
 * 4. Replace FORM_ID_1 and FORM_ID_2 with your actual form IDs
 * 5. Deploy as a web app:
 *    - Click "Deploy" > "New deployment"
 *    - Choose type: "Web app"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 *    - Click "Deploy"
 * 6. Copy the web app URL
 * 7. Add it to your .env file as: GOOGLE_FORMS_APPSCRIPT_URL=your_url_here
 */

// Replace these with your actual Google Form IDs
const FORMS = {
  'Bug Reports': {
    formId: 'SLo4cgDbHH1rNRdJ9',
    sheetId: 'YOUR_SHEET_ID_HERE' // Get this from the linked Google Sheet
  },
  'Game Requests': {
    formId: 'NUSFG88PLRvadHwn6',
    sheetId: 'YOUR_SHEET_ID_HERE' // Get this from the linked Google Sheet
  }
};

/**
 * Main function to return all form responses as JSON
 */
function doGet() {
  const results = {};
  
  for (const [formName, formInfo] of Object.entries(FORMS)) {
    try {
      if (formInfo.sheetId) {
        // Fetch from linked Google Sheet (recommended)
        const sheet = SpreadsheetApp.openById(formInfo.sheetId);
        const dataSheet = sheet.getActiveSheet();
        
        const range = dataSheet.getDataRange();
        const values = range.getValues();
        
        if (values.length > 0) {
          const headers = values[0];
          const rows = values.slice(1);
          
          results[formName] = {
            formName: formName,
            formId: formInfo.formId,
            responses: rows.map(row => {
              const responseObj = {};
              headers.forEach((header, index) => {
                responseObj[header] = row[index] || '';
              });
              return responseObj;
            }),
            count: rows.length,
            lastUpdated: new Date().toISOString()
          };
        }
      }
    } catch (error) {
      results[formName] = {
        formName: formName,
        error: error.toString(),
        responses: []
      };
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify(results))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Optional: Create a POST endpoint for more advanced features
 */
function doPost(e) {
  // Add any POST handling here if needed
  return doGet();
}

