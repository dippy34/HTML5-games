/**
 * Admin API Handler for Cloudflare Workers
 */

export async function handleAdmin(request, env, ctx) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const method = request.method;

  // Login
  if (pathname === '/api/admin/login' && method === 'POST') {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email and password required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // TODO: Verify credentials using Workers-compatible bcrypt alternative
    // For now, placeholder
    const account = await verifyAdminCredentials(env, email, password);

    if (account) {
      const token = generateToken();
      // Store session in KV
      if (env.SESSIONS) {
        await env.SESSIONS.put(token, JSON.stringify({
          email: account.email,
          name: account.name,
          role: account.role,
          expiresAt: Date.now() + (24 * 60 * 60 * 1000)
        }), { expirationTtl: 86400 }); // 24 hours
      }

      return new Response(JSON.stringify({
        success: true,
        token,
        user: {
          email: account.email,
          name: account.name,
          role: account.role
        }
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      return new Response(JSON.stringify({ error: 'Invalid email or password' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  // Verify session
  if (pathname === '/api/admin/verify' && method === 'GET') {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return new Response(JSON.stringify({ error: 'No token provided' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (env.SESSIONS) {
      const sessionData = await env.SESSIONS.get(token);
      if (sessionData) {
        const session = JSON.parse(sessionData);
        if (session.expiresAt > Date.now()) {
          return new Response(JSON.stringify({ valid: true, user: session }), {
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }
    }

    return new Response(JSON.stringify({ valid: false }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Logout
  if (pathname === '/api/admin/logout' && method === 'POST') {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (token && env.SESSIONS) {
      await env.SESSIONS.delete(token);
    }
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response('Admin endpoint not found', { status: 404 });
}

async function verifyAdminCredentials(env, email, password) {
  // TODO: Load admin accounts from KV or environment
  // TODO: Use Web Crypto API for password verification (bcrypt alternative)
  // Placeholder implementation
  return null;
}

function generateToken() {
  // Use Web Crypto API for Workers
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

