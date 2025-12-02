// Google Forms Data Fetcher
// Handles fetching data from Google Forms/Sheets

const config = require('./google-forms-config');
const https = require('https');
const http = require('http');

// Helper function to make HTTP requests (Node.js compatible)
function makeRequest(url) {
    return new Promise((resolve, reject) => {
        const urlObj = new URL(url);
        const client = urlObj.protocol === 'https:' ? https : http;
        
        const options = {
            hostname: urlObj.hostname,
            port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
            path: urlObj.pathname + urlObj.search,
            method: 'GET',
            headers: {
                'User-Agent': 'Nova-Hub-Admin/1.0'
            }
        };
        
        const req = client.request(options, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    try {
                        const jsonData = JSON.parse(data);
                        resolve(jsonData);
                    } catch (e) {
                        reject(new Error('Failed to parse JSON response'));
                    }
                } else {
                    reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
                }
            });
        });
        
        req.on('error', (error) => {
            reject(error);
        });
        
        req.setTimeout(10000, () => {
            req.destroy();
            reject(new Error('Request timeout'));
        });
        
        req.end();
    });
}

/**
 * Fetch form responses using Google Apps Script (recommended method)
 * This requires you to deploy a Google Apps Script as a web app
 */
async function fetchFromAppScript() {
    if (!config.appScriptUrl) {
        // Return empty responses instead of throwing error
        console.warn('[Google Forms] Apps Script URL not configured. Set GOOGLE_FORMS_APPSCRIPT_URL in .env.local');
        return getEmptyResponses();
    }
    
    try {
        const data = await makeRequest(config.appScriptUrl);
        return data || getEmptyResponses();
    } catch (error) {
        console.error('Error fetching from Google Apps Script:', error);
        // Return empty responses instead of throwing - allows admin panel to load
        return getEmptyResponses(error.message);
    }
}

/**
 * Get empty responses structure for when integration is not configured
 */
function getEmptyResponses(errorMessage = null) {
    const results = {};
    for (const form of config.forms) {
        if (form.enabled) {
            results[form.name] = {
                formName: form.name,
                formUrl: form.formUrl,
                responses: [],
                error: errorMessage || 'Not configured - see setup instructions',
                configured: false
            };
        }
    }
    return results;
}

/**
 * Fetch form responses using Google Sheets API
 */
async function fetchFromSheets() {
    if (!config.googleSheetsApiKey) {
        throw new Error('Google Sheets API key not configured');
    }
    
    const results = {};
    
    for (const form of config.forms) {
        if (!form.enabled || !form.sheetId) {
            continue;
        }
        
        try {
            // Google Sheets API v4 endpoint
            const url = `https://sheets.googleapis.com/v4/spreadsheets/${form.sheetId}/values/A1:Z1000?key=${config.googleSheetsApiKey}`;
            
            const data = await makeRequest(url);
            if (data.values && data.values.length > 0) {
                // Parse sheet data into structured format
                const headers = data.values[0];
                const rows = data.values.slice(1);
                
                results[form.name] = {
                    formName: form.name,
                    formUrl: form.formUrl,
                    responses: rows.map(row => {
                        const responseObj = {};
                        headers.forEach((header, index) => {
                            responseObj[header] = row[index] || '';
                        });
                        return responseObj;
                    })
                };
            }
        } catch (error) {
            console.error(`Error fetching sheet for ${form.name}:`, error);
        }
    }
    
    return results;
}

/**
 * Fetch form responses using the configured method
 */
async function fetchFormResponses() {
    try {
        switch (config.method) {
            case 'appscript':
                return await fetchFromAppScript();
            case 'sheets':
                return await fetchFromSheets();
            default:
                console.warn(`[Google Forms] Unknown method: ${config.method}. Using empty responses.`);
                return getEmptyResponses(`Unknown method: ${config.method}`);
        }
    } catch (error) {
        console.error('Error fetching form responses:', error);
        // Return empty responses instead of throwing
        return getEmptyResponses(error.message);
    }
}

/**
 * Get responses for a specific form
 */
async function getFormResponses(formName) {
    const allResponses = await fetchFormResponses();
    return allResponses[formName] || { formName, responses: [] };
}

/**
 * Get all form responses
 */
async function getAllFormResponses() {
    return await fetchFormResponses();
}

module.exports = {
    fetchFormResponses,
    getFormResponses,
    getAllFormResponses,
    config
};

