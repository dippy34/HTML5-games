/**
 * GA4 API Handler for Cloudflare Workers
 */

export async function handleGA4(request, env, ctx) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Test endpoint
  if (pathname === '/api/ga4/test') {
    return new Response(JSON.stringify({ 
      status: 'ok', 
      message: 'GA4 API route is working' 
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Stats endpoint
  if (pathname.startsWith('/api/ga4/stats/')) {
    const timeframe = pathname.split('/').pop() || 'total';
    
    try {
      // Import GA4 module (needs to be adapted for Workers)
      // For now, return placeholder
      const stats = await getGA4Stats(env, timeframe);
      return new Response(JSON.stringify(stats), {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('GA4 API error:', error);
      return new Response(JSON.stringify({
        realtimeActiveUsers: 0,
        uniqueUsers: 0,
        totalSessions: 0,
        configured: false,
        error: error.message
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  return new Response('GA4 endpoint not found', { status: 404 });
}

async function getGA4Stats(env, timeframe) {
  // TODO: Implement GA4 API calls using Workers-compatible fetch
  // The google-analytics-api.js needs to be adapted for Workers
  // (no Node.js modules like 'google-auth-library')
  
  const serviceAccountKey = env.GA4_SERVICE_ACCOUNT_KEY;
  const propertyId = env.GA4_PROPERTY_ID;

  if (!serviceAccountKey || !propertyId) {
    return {
      realtimeActiveUsers: 0,
      uniqueUsers: 0,
      totalSessions: 0,
      configured: false,
      error: 'GA4 not configured. Set GA4_SERVICE_ACCOUNT_KEY and GA4_PROPERTY_ID in Workers environment variables.'
    };
  }

  // Placeholder - actual implementation needed
  return {
    realtimeActiveUsers: 0,
    uniqueUsers: 0,
    totalSessions: 0,
    configured: true,
    error: 'GA4 API integration for Workers not yet implemented'
  };
}

