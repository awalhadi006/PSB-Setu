import type { APIRoute } from 'astro';

// Emitted as /robots.txt at build time so the sitemap URL always matches
// `site` in astro.config.mjs (no hand-edited domain to forget).
export const GET: APIRoute = ({ site }) => {
  const sitemapUrl = new URL('sitemap-index.xml', site).toString();

  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${sitemapUrl}`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
