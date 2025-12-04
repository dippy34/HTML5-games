// Google Analytics 4 Data API Integration
// Fetches realtime and historical data from GA4

const https = require('https');
const http = require('http');
const { GoogleAuth } = require('google-auth-library');
const fs = require('fs');
const path = require('path');

// Configuration from environment variables
const GA4_PROPERTY_ID = process.env.GA4_PROPERTY_ID || ''; // Format: properties/123456789
const GA4_ACCESS_TOKEN = process.env.GA4_ACCESS_TOKEN || ''; // OAuth access token (expires after 1 hour)
const GA4_SERVICE_ACCOUNT_KEY = process.env.GA4_SERVICE_ACCOUNT_KEY || ''; // Service account JSON key (base64 encoded or JSON string)
const GA4_SERVICE_ACCOUNT_PATH = process.env.GA4_SERVICE_ACCOUNT_PATH || ''; // Path to service account JSON file (for local dev)
const GA4_MEASUREMENT_ID = process.env.GA4_MEASUREMENT_ID || 'G-GGK2QKXDXW';

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
            } catch (e) {
                // If not JSON, try base64 decode
                keyData = JSON.parse(Buffer.from(GA4_SERVICE_ACCOUNT_KEY, 'base64').toString());
            }
            authClient = new GoogleAuth({
                credentials: keyData,
                scopes: ['https://www.googleapis.com/auth/analytics.readonly']
            });
            console.log('[GA4] Initialized with service account from environment variable');
            return authClient;
        } catch (error) {
            console.warn('[GA4] Failed to parse service account key from env:', error.message);
        }
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

    // Service account not available - will fall back to OAuth if configured
    if (GA4_ACCESS_TOKEN) {
        console.log('[GA4] Service account not configured. Will use OAuth access token (expires after ~1 hour).');
        console.log('[GA4] Recommendation: Set up service account (GA4_SERVICE_ACCOUNT_KEY) for permanent solution.');
    }

    return null;
}

/**
 * Get access token (ALWAYS prefers service account over OAuth token)
 */
async function getAccessToken() {
    // ALWAYS try service account first (preferred method - doesn't expire)
    const auth = await initializeAuth();
    if (auth) {
        try {
            const client = await auth.getClient();
            const tokenResponse = await client.getAccessToken();
            console.log('[GA4] Using service account token (auto-refreshing, never expires)');
            return tokenResponse.token;
        } catch (error) {
            console.error('[GA4] Failed to get token from service account:', error.message);
            // Don't fall back to OAuth if service account is configured but failing
            // This ensures we always prefer service account when available
            if (GA4_SERVICE_ACCOUNT_KEY || GA4_SERVICE_ACCOUNT_PATH) {
                throw new Error(`Service account configured but failed: ${error.message}`);
            }
        }
    }

    // Only fall back to OAuth token if service account is NOT configured
    if (GA4_ACCESS_TOKEN) {
        if (GA4_SERVICE_ACCOUNT_KEY || GA4_SERVICE_ACCOUNT_PATH) {
            console.warn('[GA4] WARNING: Service account is configured but failed. Falling back to OAuth token (will expire).');
        } else {
            console.log('[GA4] Using OAuth access token (expires after ~1 hour). Consider setting up service account for permanent solution.');
        }
        return GA4_ACCESS_TOKEN;
    }

    throw new Error('No valid authentication method configured. Set either GA4_SERVICE_ACCOUNT_KEY or GA4_ACCESS_TOKEN');
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
                    reject(new Error(`GA4 API error ${res.statusCode}: ${data.substring(0, 200)}`));
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
                error: 'GA4 API not configured. Set GA4_PROPERTY_ID and either GA4_ACCESS_TOKEN or GA4_SERVICE_ACCOUNT_KEY in .env.local'
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

