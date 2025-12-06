/**
 * Cloudflare Workers Entry Point for Nova Hub
 * Domain: novahub.pages.dev
 */

// Import handlers
import { handleAPI } from './handlers/api.js';
import { handleStatic } from './handlers/static.js';
import { handleHTML } from './handlers/html.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // CORS headers for all responses
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // API routes
      if (pathname.startsWith('/api/')) {
        const response = await handleAPI(request, env, ctx);
        // Add CORS headers to API responses
        Object.entries(corsHeaders).forEach(([key, value]) => {
          response.headers.set(key, value);
        });
        return response;
      }

      // HTML routes (interstellar pages)
      if (pathname === '/' || 
          pathname === '/a' || 
          pathname === '/b' || 
          pathname === '/c' || 
          pathname === '/d' || 
          pathname === '/selenite' ||
          pathname === '/admin' ||
          pathname.endsWith('.html')) {
        const response = await handleHTML(request, env, ctx, pathname);
        Object.entries(corsHeaders).forEach(([key, value]) => {
          response.headers.set(key, value);
        });
        return response;
      }

      // Static files (CSS, JS, images, etc.)
      const staticResponse = await handleStatic(request, env, ctx, pathname);
      if (staticResponse) {
        Object.entries(corsHeaders).forEach(([key, value]) => {
          staticResponse.headers.set(key, value);
        });
        return staticResponse;
      }

      // 404 Not Found
      return new Response('404 Not Found', { 
        status: 404,
        headers: corsHeaders 
      });

    } catch (error) {
      console.error('Worker error:', error);
      return new Response(`Error: ${error.message}`, {
        status: 500,
        headers: corsHeaders
      });
    }
  },
};

