// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  site: 'https://www.yayasanallathifah.com',
  output: 'static',
  build: {
    // Single-page site: inlining the stylesheet removes one render-blocking
    // round trip (HTML -> CSS -> paint becomes HTML -> paint). There is no
    // second page to benefit from a cached .css file, so the trade-off is free.
    inlineStylesheets: 'always',
  },
});
