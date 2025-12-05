/**
 * Static File Handler for Cloudflare Workers
 * Serves files from Workers KV or R2
 */

export async function handleStatic(request, env, ctx, pathname) {
  // Remove leading slash
  const filePath = pathname.startsWith('/') ? pathname.slice(1) : pathname;

  // Try to get from KV namespace (STATIC_FILES binding)
  if (env.STATIC_FILES) {
    try {
      const file = await env.STATIC_FILES.get(filePath);
      if (file) {
        // Determine content type
        const contentType = getContentType(filePath);
        return new Response(file, {
          headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=31536000', // 1 year cache
          },
        });
      }
    } catch (error) {
      console.error('Error reading from KV:', error);
    }
  }

  // Try to get from R2 bucket (GAMES_BUCKET binding) for large files
  if (env.GAMES_BUCKET && (filePath.startsWith('html5/') || filePath.startsWith('games/'))) {
    try {
      const object = await env.GAMES_BUCKET.get(filePath);
      if (object) {
        const contentType = getContentType(filePath);
        return new Response(object.body, {
          headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=31536000',
          },
        });
      }
    } catch (error) {
      console.error('Error reading from R2:', error);
    }
  }

  // If not found in KV or R2, return null (will result in 404)
  return null;
}

function getContentType(filePath) {
  const ext = filePath.split('.').pop().toLowerCase();
  const types = {
    'html': 'text/html',
    'css': 'text/css',
    'js': 'application/javascript',
    'json': 'application/json',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'gif': 'image/gif',
    'svg': 'image/svg+xml',
    'ico': 'image/x-icon',
    'woff': 'font/woff',
    'woff2': 'font/woff2',
    'ttf': 'font/ttf',
    'wasm': 'application/wasm',
    'unityweb': 'application/octet-stream',
    'data': 'application/octet-stream',
    'mp3': 'audio/mpeg',
    'ogg': 'audio/ogg',
    'swf': 'application/x-shockwave-flash',
  };
  return types[ext] || 'application/octet-stream';
}

