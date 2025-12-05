/**
 * Google Forms API Handler for Cloudflare Workers
 */

export async function handleGoogleForms(request, env, ctx) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const method = request.method;

  // Verify admin token
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token || !env.SESSIONS) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const sessionData = await env.SESSIONS.get(token);
  if (!sessionData) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Get all form responses
  if (pathname === '/api/google-forms' && method === 'GET') {
    const appScriptUrl = env.GOOGLE_FORMS_APPSCRIPT_URL;
    
    if (!appScriptUrl) {
      return new Response(JSON.stringify({
        configured: false,
        error: 'Google Forms not configured. Set GOOGLE_FORMS_APPSCRIPT_URL in Workers environment variables.'
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    try {
      const response = await fetch(appScriptUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Google Forms API error: ${response.status}`);
      }

      const data = await response.json();
      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('Error fetching Google Forms:', error);
      return new Response(JSON.stringify({
        configured: true,
        error: error.message
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  // Get specific form responses
  if (pathname.startsWith('/api/google-forms/') && method === 'GET') {
    const formName = pathname.split('/').pop();
    // Similar implementation to above
    return new Response(JSON.stringify({
      formName,
      responses: [],
      configured: false
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response('Google Forms endpoint not found', { status: 404 });
}

