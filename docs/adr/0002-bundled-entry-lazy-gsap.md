# ADR-0002: One Bundled Entry Script + Lazy GSAP Chunk

## Status
Accepted (replaces "dynamic imports from a CDN + .js-ready")

## Context
The page needs a small amount of JavaScript: a FAQ accordion, a biaya tab
switcher, a count-up animation, a header auto-hide on scroll, a gallery slider,
a WhatsApp overlay, and GSAP-driven decoration.

The first implementation split this across `src/scripts/main.ts`,
`src/scripts/gsap-animations.ts` and a `three-hero.ts` (never used), loaded GSAP
from `cdn.jsdelivr.net` through an `<script type="importmap">`, and toggled a
`.js-ready` class that no stylesheet ever referenced.

Measurements on a throttled profile (390px, 1.6 Mbps, 150 ms latency, 4x CPU)
showed:
- The CDN import map cost roughly 200 ms of LCP (third-party DNS/TLS/hops).
- A single eager 119 KB GSAP bundle cost roughly 570 ms of LCP, because it
  competed with the hero photo for bandwidth and main thread.
- The `.js-ready` class was dead: nothing in the CSS depended on it.

## Decision
- One `<script>` per page, written inline in `src/pages/index.astro` and bundled
  by Vite. No `src/scripts/` folder, no import map, no CDN.
- GSAP is imported **dynamically inside the animation function**, so Vite emits
  it as separate chunks (`index.<hash>.js` ~70 KB + `ScrollTrigger.<hash>.js`
  ~44 KB). The entry chunk stays ~5 KB.
- The dynamic import is triggered on `load`, then deferred with
  `requestIdleCallback(..., { timeout: 2000 })`. Decoration therefore starts
  *after* the hero photo has been painted, and never delays LCP.
- No `.js-ready` handshake. Server-rendered HTML is the source of truth; scripts
  only add behaviour on top of it.
- The hero *content* has a CSS-only entrance (staggered opacity/translate that
  starts at first paint, no JS, no network). The hero *photo* is never animated:
  it is the LCP element, and fading it in would delay the largest contentful
  paint.

## Consequences
- Zero third-party script requests; CSP no longer needs `cdn.jsdelivr.net`.
- LCP is unaffected by JavaScript: measured 1.29 s median vs 1.28 s baseline,
  while total transfer dropped from ~530 KB to ~466 KB.
- Animations begin ~1 s after load on slow connections. Because they only target
  below-the-fold content, this is invisible in practice.
- Two extra chunk requests after load, both cached immutably (`_headers`).

## Alternatives Considered
- GSAP from a CDN import map: extra origin, breaks when the CDN is blocked.
- One eager bundle: measured 570 ms LCP regression (see Context).
- Rewriting the remaining tweens in CSS: would remove ~115 KB of JS, but changes
  the scroll-scrubbed jadwal timeline. Revisit if the motion set shrinks further.
