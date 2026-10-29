# ADR-0011: Inlined Stylesheets

## Status
Accepted

## Context
Astro can emit the Tailwind bundle as an external file (`inlineStylesheets:
'never'`) or inline it into the HTML (`'always'`). The usual argument against
inlining is caching: every page repeats the CSS.

This site is a single page. A visitor loads `index.html` once; there is no second
page to reuse a cached `.css` file, and no client-side navigation.

## Decision
`astro.config.mjs` sets `build.inlineStylesheets: 'always'`, so `dist/` contains
no CSS files at all and the HTML carries one `<style>` block.

## Consequences
Measured with Brotli at quality 11 on the same content:

| Variant | Brotli bytes | Requests before paint |
|---------|--------------|-----------------------|
| External CSS | 28,988 | 2 (HTML + CSS) |
| Inlined CSS | 28,664 | 1 (HTML) |

- One render-blocking round trip removed, at slightly *fewer* compressed bytes.
- FCP difference measured on the throttled profile was within noise
  (~1004 ms vs ~1032 ms), so this is a small win, not a headline one.
- HTML is ~183 KB uncompressed; it is served compressed, and the browser caches
  the whole document.

## Alternatives Considered
- `inlineStylesheets: 'auto'`: inlines only small sheets; this sheet is large
  enough that Astro would externalize it, which is what we are avoiding.
- Critical-CSS extraction: more build machinery for a single page.
- External CSS with `media="print" onload` trick: delays FOUC-free styling and
  is worse for a page whose CSS is needed immediately.
