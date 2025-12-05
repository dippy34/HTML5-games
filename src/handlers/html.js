/**
 * HTML Route Handler for Cloudflare Workers
 */

export async function handleHTML(request, env, ctx, pathname) {
  const htmlFiles = {
    '/': 'interstellar-static/index.html',
    '/a': 'interstellar-static/games.html',
    '/b': 'interstellar-static/apps.html',
    '/c': 'interstellar-static/settings.html',
    '/d': 'interstellar-static/tabs.html',
    '/selenite': 'interstellar-static/selenite.html',
    '/admin': 'admin.html',
    '/rx': 'interstellar-static/rx.html',
    '/updates.html': 'interstellar-static/updates.html',
    '/bug-reports.html': 'interstellar-static/bug-reports.html',
    '/game-requests.html': 'interstellar-static/game-requests.html',
  };

  const filePath = htmlFiles[pathname] || pathname.replace(/^\//, '');

  // Try to get HTML from KV
  if (env.STATIC_FILES) {
    try {
      let html = await env.STATIC_FILES.get(filePath);
      if (html) {
        // Inject GA4 Measurement ID if configured
        const ga4Id = env.GA4_MEASUREMENT_ID || '';
        if (ga4Id) {
          html = html.replace(
            /<meta name="ga4-measurement-id" content="" \/>/,
            `<meta name="ga4-measurement-id" content="${ga4Id}" />`
          );
          if (!html.includes('window.GA4_MEASUREMENT_ID')) {
            html = html.replace(
              '</head>',
              `<script>window.GA4_MEASUREMENT_ID = '${ga4Id}';</script>\n</head>`
            );
          }
        }

        // Inject domain for API calls
        const domain = 'https://buh-avon.bestboymg1.workers.dev';
        html = html.replace(
          /window\.API_BASE_URL\s*=\s*['"][^'"]*['"]/,
          `window.API_BASE_URL = '${domain}'`
        );

        return new Response(html, {
          headers: {
            'Content-Type': 'text/html',
            'Cross-Origin-Opener-Policy': 'same-origin',
            'Cross-Origin-Embedder-Policy': 'require-corp',
          },
        });
      }
    } catch (error) {
      console.error('Error reading HTML from KV:', error);
    }
  }

  return new Response('Page not found', { status: 404 });
}

