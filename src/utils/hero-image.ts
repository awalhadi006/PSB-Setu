// Single source of truth for the hero photo renditions.
//
// Both the <head> preload (BaseLayout) and the rendered <img> (Hero) must agree
// on the exact URLs, otherwise the browser downloads the image twice.
import { getImage } from 'astro:assets';
import gerbang from '@/assets/gerbang.jpg';

const WIDTHS = [480, 800, 1200, 1600];

const renditions = await Promise.all(
  WIDTHS.map((width) => getImage({ src: gerbang, width, format: 'webp', quality: 68 }))
);

export const heroSrcset = renditions
  .map((img, i) => `${img.src} ${WIDTHS[i]}w`)
  .join(', ');

// Fallback for browsers without srcset support: the mid-size rendition.
export const heroSrc = renditions[1].src;

// The hero photo is a full-bleed background.
export const heroSizes = '100vw';
