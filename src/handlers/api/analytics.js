/**
 * Analytics API Handler for Cloudflare Workers
 * Uses D1 Database for data storage
 */

export async function handleAnalytics(request, env, ctx) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const method = request.method;

  // Ensure database is initialized
  if (env.DB) {
    await initDatabase(env.DB);
  }

  // Track visit
  if (pathname === '/api/visit' && method === 'POST') {
    const body = await request.json();
    const { sessionId, timestamp, duration } = body;

    if (!sessionId || !timestamp) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (env.DB) {
      try {
        await env.DB.prepare(
          'INSERT INTO visits (session_id, timestamp, duration) VALUES (?, ?, ?)'
        ).bind(sessionId, timestamp, duration || 0).run();

        await env.DB.prepare(
          'INSERT OR REPLACE INTO sessions (session_id, start_time, last_active, total_duration) VALUES (?, ?, ?, ?)'
        ).bind(sessionId, timestamp, timestamp, duration || 0).run();

        return new Response(JSON.stringify({ success: true }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error) {
        console.error('Error recording visit:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Track game play
  if (pathname === '/api/game-play' && method === 'POST') {
    const body = await request.json();
    const { gameName, sessionId, timestamp, duration } = body;

    if (!gameName || !sessionId || !timestamp) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (env.DB) {
      try {
        await env.DB.prepare(
          'INSERT INTO game_plays (game_name, session_id, timestamp, duration) VALUES (?, ?, ?, ?)'
        ).bind(gameName, sessionId, timestamp, duration || 0).run();

        return new Response(JSON.stringify({ success: true }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error) {
        console.error('Error recording game play:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Get statistics
  if (pathname.startsWith('/api/stats/') && method === 'GET') {
    const timeframe = pathname.split('/').pop();
    // TODO: Implement stats query based on timeframe
    return new Response(JSON.stringify({
      uniqueVisitors: 0,
      averageDuration: 0,
      totalGamePlays: 0,
      activeSessions: 0
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Bug report
  if (pathname === '/api/bug-report' && method === 'POST') {
    const body = await request.json();
    const { description, pageUrl } = body;
    const userAgent = request.headers.get('User-Agent') || 'Unknown';

    if (!description || !description.trim()) {
      return new Response(JSON.stringify({ error: 'Description is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (env.DB) {
      try {
        await env.DB.prepare(
          'INSERT INTO bugs (description, page_url, user_agent, status) VALUES (?, ?, ?, ?)'
        ).bind(description.trim(), pageUrl || 'Unknown', userAgent, 'pending').run();

        return new Response(JSON.stringify({ success: true, message: 'Bug reported successfully' }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error) {
        console.error('Error reporting bug:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Get bugs (admin only)
  if (pathname === '/api/bugs' && method === 'GET') {
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

    if (env.DB) {
      try {
        const statusParam = url.searchParams.get('status');
        let query = 'SELECT * FROM bugs';
        let result;
        
        if (statusParam) {
          query += ' WHERE status = ?';
          result = await env.DB.prepare(query).bind(statusParam).all();
        } else {
          result = await env.DB.prepare(query).all();
        }
        
        return new Response(JSON.stringify(result.results || []), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error) {
        console.error('Error fetching bugs:', error);
        return new Response(JSON.stringify([]), {
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    return new Response(JSON.stringify([]), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response('Analytics endpoint not found', { status: 404 });
}

async function initDatabase(db) {
  // Create tables if they don't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS visits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT NOT NULL,
      timestamp INTEGER NOT NULL,
      duration INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS game_plays (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      game_name TEXT NOT NULL,
      session_id TEXT NOT NULL,
      timestamp INTEGER NOT NULL,
      duration INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS sessions (
      session_id TEXT PRIMARY KEY,
      start_time INTEGER NOT NULL,
      last_active INTEGER NOT NULL,
      total_duration INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS bugs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT NOT NULL,
      page_url TEXT,
      user_agent TEXT,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

