# ADR-0012: Hero Photo as a Responsive `<img>` (LCP)

## Status
Accepted

## Context
The hero used a CSS `background-image` pointing at one 1247x830 WebP. That had
three problems:

1. A CSS background is invisible to the preload scanner, so the request started
   late.
2. There was exactly one rendition, so a 390px phone downloaded (and decoded, on
   a throttled CPU) the same pixels as a 1600px desktop.
3. Because it was decoration in CSS, it was impossible to give it
   `fetchpriority="high"` or an `imagesrcset`.

On a throttled profile (390px viewport, 1.6 Mbps, 150 ms RTT, 4x CPU) LCP sat at
~3.4 s, and the LCP element was this image. Chrome DevTools-style diagnostics
showed the delay was image decode + late discovery, not fonts and not the CDN.

## Decision
- `src/utils/hero-image.ts` is the single source of truth: it renders WebP
  renditions at 480/800/1200/1600w via `getImage()` and exports `heroSrc`,
  `heroSrcset`, `heroSizes`.
- `Hero.astro` renders a real `<img>` with `srcset`/`sizes`, `width`/`height`
  (prevents CLS), `fetchpriority="high"`, `decoding="async"`, `alt=""` and
  `aria-hidden="true"` since it is decorative.
- The tint gradient moved to a sibling overlay `<div>`, so the photo stays a
  separate, cacheable, preloadable resource.
- `BaseLayout.astro` preloads exactly the same URL set with `imagesrcset` and
  `imagesizes`, so the preload and the `<img>` resolve to one download.
- The gallery and the map placeholder follow the same rule: astro `<Image>`
  with WebP, `srcset` and explicit dimensions. Original JPEG/PNG files are no
  longer emitted to `dist/`.

## Consequences
- LCP: 3.39 s -> 1.28 s median on the throttled profile (same measurement
  script), CLS 0.
- A phone now downloads the 480w/800w rendition instead of a 1600w one.
- `heroSrc` is used as the `<img src>` fallback and as the preload `href`, so the
  two can never disagree (that mismatch would cause a double download).
- If the photo is replaced, only `hero-image.ts` needs updating.

## Alternatives Considered
- Keep CSS background + `<link rel="preload">` with a fixed rendition: still one
  size for all screens and no `imagesrcset` negotiation.
- Art direction via `<picture>` + AVIF: AVIF encode time is high and WebP was
  already within budget; revisit if LCP needs another 100 ms.
- Lazy-load the hero image: wrong for the LCP element.
