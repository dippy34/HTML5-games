/**
 * API Route Handler for Cloudflare Workers
 */

import { handleGA4 } from './api/ga4.js';
import { handleAdmin } from './api/admin.js';
import { handleAnalytics } from './api/analytics.js';
import { handleGoogleForms } from './api/google-forms.js';

export async function handleAPI(request, env, ctx) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // GA4 API routes
  if (pathname.startsWith('/api/ga4/')) {
    return handleGA4(request, env, ctx);
  }

  // Admin API routes
  if (pathname.startsWith('/api/admin/')) {
    return handleAdmin(request, env, ctx);
  }

  // Analytics API routes (visits, sessions, games)
  if (pathname.startsWith('/api/visit') || 
      pathname.startsWith('/api/session') || 
      pathname.startsWith('/api/game-play') ||
      pathname.startsWith('/api/stats') ||
      pathname.startsWith('/api/top-games') ||
      pathname.startsWith('/api/chart') ||
      pathname.startsWith('/api/active-sessions') ||
      pathname.startsWith('/api/visited-url') ||
      pathname.startsWith('/api/top-domains') ||
      pathname.startsWith('/api/visited-urls') ||
      pathname.startsWith('/api/bug-report') ||
      pathname.startsWith('/api/bugs')) {
    return handleAnalytics(request, env, ctx);
  }

  // Google Forms API routes
  if (pathname.startsWith('/api/google-forms')) {
    return handleGoogleForms(request, env, ctx);
  }

  return new Response('API endpoint not found', { status: 404 });
}

