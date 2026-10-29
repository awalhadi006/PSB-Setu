// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    // Generates /sitemap-index.xml + /sitemap-0.xml at build time.
    // `site` below is the single source of truth for every absolute URL
    // (canonical, Open Graph, JSON-LD, robots.txt).
    sitemap(),
  ],
  site: 'https://psb.smpallathifah.my.id',
  output: 'static',
  build: {
    // Single-page site: inlining the stylesheet removes one render-blocking
    // round trip (HTML -> CSS -> paint becomes HTML -> paint). There is no
    // second page to benefit from a cached .css file, so the trade-off is free.
    inlineStylesheets: 'always',
  },
});
