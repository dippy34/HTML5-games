// Google Analytics 4 Data API Integration
// Fetches realtime and historical data from GA4

const https = require('https');
const http = require('http');
const { GoogleAuth } = require('google-auth-library');
const fs = require('fs');
const path = require('path');

// Configuration from environment variables
const GA4_PROPERTY_ID = process.env.GA4_PROPERTY_ID || ''; // Format: properties/123456789
const GA4_SERVICE_ACCOUNT_KEY = process.env.GA4_SERVICE_ACCOUNT_KEY || ''; // Service account JSON key (REQUIRED - JSON string or base64 encoded)
const GA4_SERVICE_ACCOUNT_PATH = process.env.GA4_SERVICE_ACCOUNT_PATH || ''; // Path to service account JSON file (for local dev only)
const GA4_MEASUREMENT_ID = process.env.GA4_MEASUREMENT_ID || 'G-GGK2QKXDXW';
// Note: OAuth tokens (GA4_ACCESS_TOKEN) are no longer supported - use service account only

// Google Auth client (for service account)
let authClient = null;

/**
 * Initialize Google Auth client with service account
 */
async function initializeAuth() {
    if (authClient) {
        return authClient;
    }

    // Try service account JSON from environment variable (base64 or JSON string)
    if (GA4_SERVICE_ACCOUNT_KEY) {
        try {
            let keyData;
            // Try parsing as JSON string first
            try {
                keyData = JSON.parse(GA4_SERVICE_ACCOUNT_KEY);
                console.log('[GA4] Parsed service account key as JSON string');
            } catch (e) {
                // If not JSON, try base64 decode
                try {
                    keyData = JSON.parse(Buffer.from(GA4_SERVICE_ACCOUNT_KEY, 'base64').toString());
                    console.log('[GA4] Parsed service account key as base64');
                } catch (e2) {
                    throw new Error(`Failed to parse service account key: ${e.message} (JSON) or ${e2.message} (base64)`);
                }
            }
            
            // Validate key structure
            if (!keyData.client_email || !keyData.private_key || !keyData.project_id) {
                throw new Error('Service account key missing required fields (client_email, private_key, project_id)');
            }
            
            console.log('[GA4] Service account email:', keyData.client_email);
            console.log('[GA4] Service account project:', keyData.project_id);
            
            authClient = new GoogleAuth({
                credentials: keyData,
                scopes: ['https://www.googleapis.com/auth/analytics.readonly']
            });
            console.log('[GA4] Initialized with service account from environment variable');
            return authClient;
        } catch (error) {
            console.error('[GA4] Failed to parse service account key from env:', error.message);
            console.error('[GA4] Key length:', GA4_SERVICE_ACCOUNT_KEY.length);
            console.error('[GA4] Key starts with:', GA4_SERVICE_ACCOUNT_KEY.substring(0, 50));
        }
    } else {
        console.log('[GA4] GA4_SERVICE_ACCOUNT_KEY not set in environment');
    }

    // Try service account file path (for local development)
    if (GA4_SERVICE_ACCOUNT_PATH && fs.existsSync(GA4_SERVICE_ACCOUNT_PATH)) {
        try {
            authClient = new GoogleAuth({
                keyFile: GA4_SERVICE_ACCOUNT_PATH,
                scopes: ['https://www.googleapis.com/auth/analytics.readonly']
            });
            console.log('[GA4] Initialized with service account from file:', GA4_SERVICE_ACCOUNT_PATH);
            return authClient;
        } catch (error) {
            console.warn('[GA4] Failed to load service account from file:', error.message);
        }
    }

    // Service account not available
    console.warn('[GA4] Service account not configured. GA4_SERVICE_ACCOUNT_KEY is required.');
    console.warn('[GA4] OAuth tokens are no longer supported. Please set up service account authentication.');

    return null;
}

/**
 * Get access token (ONLY uses service account - no OAuth fallback)
 */
async function getAccessToken() {
    // ONLY use service account - no fallback to OAuth
    const auth = await initializeAuth();
    if (!auth) {
        throw new Error('Service account not configured. Set GA4_SERVICE_ACCOUNT_KEY in environment variables. OAuth tokens are no longer supported.');
    }

    try {
        const client = await auth.getClient();
        const tokenResponse = await client.getAccessToken();
        console.log('[GA4] Using service account token (auto-refreshing, never expires)');
        return tokenResponse.token;
    } catch (error) {
        console.error('[GA4] Failed to get token from service account:', error.message);
        console.error('[GA4] Error details:', error);
        throw new Error(`Service account authentication failed: ${error.message}. Make sure the service account has access to GA4 property and Google Analytics Data API is enabled.`);
    }
}

/**
 * Make a request to Google Analytics Data API
 */
async function makeGA4Request(endpoint, body = null) {
    if (!GA4_PROPERTY_ID) {
        // Return empty data if not configured
        return Promise.resolve({});
    }

    try {
        // Get access token (from service account or OAuth)
        const accessToken = await getAccessToken();
        
        if (!accessToken) {
            return Promise.reject(new Error('No access token available'));
        }

        return new Promise((resolve, reject) => {
            const url = `https://analyticsdata.googleapis.com/v1beta/${GA4_PROPERTY_ID}${endpoint}`;
            const urlObj = new URL(url);
            
            const options = {
                hostname: urlObj.hostname,
                port: 443,
                path: urlObj.pathname + urlObj.search,
                method: body ? 'POST' : 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            };

        const req = https.request(options, (res) => {
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
                        reject(new Error(`Failed to parse GA4 response: ${e.message}`));
                    }
                } else {
                    // Enhanced error logging for 401 errors
                    if (res.statusCode === 401) {
                        console.error('[GA4] 401 Unauthorized - Authentication failed');
                        console.error('[GA4] Response:', data.substring(0, 500));
                        console.error('[GA4] Check:');
                        console.error('[GA4]   1. Service account key is correctly formatted in Render');
                        console.error('[GA4]   2. Service account email has Viewer access in GA4');
                        console.error('[GA4]   3. Google Analytics Data API is enabled in Google Cloud');
                        console.error('[GA4]   4. Property ID is correct:', GA4_PROPERTY_ID);
                    }
                    reject(new Error(`GA4 API error ${res.statusCode}: ${data.substring(0, 500)}`));
                }
            });
        });
        
        req.on('error', (error) => {
            reject(error);
        });
        
        if (body) {
            req.write(JSON.stringify(body));
        }
        
            req.setTimeout(20000, () => {
                req.destroy();
                reject(new Error('GA4 API request timeout'));
            });
            
            req.end();
        });
    } catch (error) {
        return Promise.reject(error);
    }
}

/**
 * Get realtime active users
 */
async function getRealtimeUsers() {
    try {
        if (!GA4_PROPERTY_ID) {
            return { activeUsers: 0, error: 'GA4 not configured' };
        }

        const response = await makeGA4Request(':runRealtimeReport', {
            dimensions: [],
            metrics: [
                { name: 'activeUsers' }
            ]
        });

        console.log('[GA4] Realtime API response:', JSON.stringify(response).substring(0, 500));

        if (response.rows && response.rows.length > 0 && response.rows[0].metricValues && response.rows[0].metricValues.length > 0) {
            const value = parseInt(response.rows[0].metricValues[0].value) || 0;
            console.log('[GA4] Realtime active users:', value);
            return { activeUsers: value };
        }
        
        console.log('[GA4] No realtime data in response');
        return { activeUsers: 0 };
    } catch (error) {
        console.error('[GA4] Error fetching realtime users:', error.message);
        return { activeUsers: 0, error: error.message };
    }
}

/**
 * Get unique users for a date range
 */
async function getUniqueUsers(startDate, endDate = 'today') {
    try {
        if (!GA4_PROPERTY_ID) {
            return { uniqueUsers: 0, error: 'GA4 not configured' };
        }

        const response = await makeGA4Request(':runReport', {
            dateRanges: [
                {
                    startDate: startDate,
                    endDate: endDate
                }
            ],
            dimensions: [],
            metrics: [
                { name: 'activeUsers' }
            ]
        });

        console.log('[GA4] Unique users API response:', JSON.stringify(response).substring(0, 500));

        if (response.rows && response.rows.length > 0 && response.rows[0].metricValues && response.rows[0].metricValues.length > 0) {
            const value = parseInt(response.rows[0].metricValues[0].value) || 0;
            console.log('[GA4] Unique users:', value);
            return { uniqueUsers: value };
        }
        
        console.log('[GA4] No unique users data in response');
        return { uniqueUsers: 0 };
    } catch (error) {
        console.error('[GA4] Error fetching unique users:', error.message);
        return { uniqueUsers: 0, error: error.message };
    }
}

/**
 * Get total sessions/visits for a date range
 */
async function getTotalSessions(startDate, endDate = 'today') {
    try {
        if (!GA4_PROPERTY_ID) {
            return { totalSessions: 0, error: 'GA4 not configured' };
        }

        const response = await makeGA4Request(':runReport', {
            dateRanges: [
                {
                    startDate: startDate,
                    endDate: endDate
                }
            ],
            dimensions: [],
            metrics: [
                { name: 'sessions' }
            ]
        });

        console.log('[GA4] Total sessions API response:', JSON.stringify(response).substring(0, 500));

        if (response.rows && response.rows.length > 0 && response.rows[0].metricValues && response.rows[0].metricValues.length > 0) {
            const value = parseInt(response.rows[0].metricValues[0].value) || 0;
            console.log('[GA4] Total sessions:', value);
            return { totalSessions: value };
        }
        
        console.log('[GA4] No sessions data in response');
        return { totalSessions: 0 };
    } catch (error) {
        console.error('[GA4] Error fetching total sessions:', error.message);
        return { totalSessions: 0, error: error.message };
    }
}

/**
 * Get all GA4 stats (realtime, unique users, total sessions)
 */
async function getGA4Stats(timeframe = 'total') {
    try {
        // Check configuration first
        if (!GA4_PROPERTY_ID) {
            console.log('[GA4] Not configured - Property ID:', GA4_PROPERTY_ID ? 'Set' : 'Missing');
            return {
                realtimeActiveUsers: 0,
                uniqueUsers: 0,
                totalSessions: 0,
                configured: false,
                error: 'GA4 API not configured. Set GA4_PROPERTY_ID and GA4_SERVICE_ACCOUNT_KEY in environment variables'
            };
        }

        if (!GA4_SERVICE_ACCOUNT_KEY && !GA4_SERVICE_ACCOUNT_PATH) {
            console.log('[GA4] Service account not configured');
            return {
                realtimeActiveUsers: 0,
                uniqueUsers: 0,
                totalSessions: 0,
                configured: false,
                error: 'Service account required. Set GA4_SERVICE_ACCOUNT_KEY in environment variables. OAuth tokens are no longer supported.'
            };
        }

        console.log('[GA4] Fetching stats for timeframe:', timeframe);
        console.log('[GA4] Property ID:', GA4_PROPERTY_ID);

        // Map timeframe to date range
        let startDate = '2020-01-01'; // Default to all time
        const endDate = 'today';

        const now = new Date();
        switch (timeframe) {
            case '1hour':
            case '12hours':
            case 'day':
                startDate = 'yesterday';
                break;
            case '3days':
                const threeDaysAgo = new Date(now);
                threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
                startDate = formatDate(threeDaysAgo);
                break;
            case 'week':
                const weekAgo = new Date(now);
                weekAgo.setDate(weekAgo.getDate() - 7);
                startDate = formatDate(weekAgo);
                break;
            case '2weeks':
                const twoWeeksAgo = new Date(now);
                twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
                startDate = formatDate(twoWeeksAgo);
                break;
            case 'month':
                const monthAgo = new Date(now);
                monthAgo.setMonth(monthAgo.getMonth() - 1);
                startDate = formatDate(monthAgo);
                break;
            case '6months':
                const sixMonthsAgo = new Date(now);
                sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
                startDate = formatDate(sixMonthsAgo);
                break;
            case 'year':
                const yearAgo = new Date(now);
                yearAgo.setFullYear(yearAgo.getFullYear() - 1);
                startDate = formatDate(yearAgo);
                break;
            case 'total':
            default:
                startDate = '2020-01-01';
                break;
        }

        console.log('[GA4] Date range:', startDate, 'to', endDate);

        // Fetch all data in parallel
        const [realtime, uniqueUsers, totalSessions] = await Promise.all([
            getRealtimeUsers(),
            getUniqueUsers(startDate, endDate),
            getTotalSessions(startDate, endDate)
        ]);

        console.log('[GA4] Results:', {
            realtime: realtime.activeUsers,
            uniqueUsers: uniqueUsers.uniqueUsers,
            totalSessions: totalSessions.totalSessions,
            errors: {
                realtime: realtime.error,
                uniqueUsers: uniqueUsers.error,
                totalSessions: totalSessions.error
            }
        });

        return {
            realtimeActiveUsers: realtime.activeUsers || 0,
            uniqueUsers: uniqueUsers.uniqueUsers || 0,
            totalSessions: totalSessions.totalSessions || 0,
            configured: true,
            error: realtime.error || uniqueUsers.error || totalSessions.error || null
        };
    } catch (error) {
        console.error('[GA4] Error getting stats:', error);
        return {
            realtimeActiveUsers: 0,
            uniqueUsers: 0,
            totalSessions: 0,
            configured: false,
            error: error.message
        };
    }
}

/**
 * Format date as YYYY-MM-DD for GA4 API
 */
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

module.exports = {
    getRealtimeUsers,
    getUniqueUsers,
    getTotalSessions,
    getGA4Stats
};

