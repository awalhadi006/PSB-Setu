# Glossary

Consolidated domain and implementation terms for the PSB landing page.

---

## A

**Astro Assets** - Astro's built-in image pipeline (`<Image />`, `getImage()`).
Handles WebP conversion, `srcset` generation, width/height attributes and lazy
loading. Used for the gallery, the map placeholder and the hero renditions.

---

## B

**Biaya Computed Getters** - TypeScript getters in `site.ts` that sum line-item
nominals per category (Umum/Dhuafa/Yatim). Single source of truth for totals:
5,150,000 / 2,800,000 / 900,000.

**Bundled Entry Script** - The one `<script>` written in `index.astro`. Vite
compiles it to `/_astro/index.<hash>.js` (about 5 KB). It contains the FAQ,
biaya tabs, count-up, header scroll behaviour, gallery wiring, WhatsApp overlay
and the bootstrap for GSAP. See ADR-0002.

---

## C

**Count-up** - `animateBiayaTotal()`: `requestAnimationFrame` loop that eases the
nominal from 0 to its target when a biaya tab is opened, using the
`.biaya-total-value` element and a `data-target` cache.

---

## F

**FAQ Accordion** - `<button class="faq-trigger" aria-expanded aria-controls>`
toggling `.hidden` on the answer panel and rotating `.faq-icon` 180 degrees.
Driven by `window.toggleFaq`, not by `<details>`. See ADR-0006.

**Font Stack** - Google Fonts, text subsets only, `display=swap`:
`Noto Serif` for display/headline text, `Plus Jakarta Sans` for body/label text.
Declared once in `tailwind.config.mjs`. See ADR-0001.

---

## G

**GSAP** - Animation engine, code-split into its own chunk and fetched only after
`load` + `requestIdleCallback`. Only `gsap` core and `ScrollTrigger` are used;
`SplitText` and `TextPlugin` were removed. See ADR-0008.

**gsap.matchMedia()** - Responsive animation API. Creates separate contexts for
`(max-width: 767px)` and `(min-width: 768px)` and cleans up tweens when the media
query stops matching.

---

## H

**Hero Photo** - The LCP element. Rendered as a real `<img>` with WebP `srcset`
(480/800/1200/1600w), `sizes="100vw"`, explicit `width`/`height`,
`fetchpriority="high"`, plus a matching `<link rel="preload" imagesrcset>`.
Renditions come from `src/utils/hero-image.ts`. See ADR-0012.

---

## I

**Icon Component** - `src/components/Icon.astro`. Holds the 34 Material paths the
site uses and renders `<svg class="icon">` with `fill="currentColor"` and
`aria-hidden="true"`. Replaced the 3.9 MB Material Symbols webfont. See
ADR-0010.

**Inline Stylesheets** - `build.inlineStylesheets: 'always'` in
`astro.config.mjs`. The single page ships zero `.css` files; the Tailwind bundle
is inside `index.html`. See ADR-0011.

---

## J

**Jadwal Status** - `site.statusPendaftaran` getter compares "now" in WIB against
`jadwal.tanggalBuka` / `tanggalTutup` and returns `Akan Datang`,
`Sedang Dibuka` or `Selesai`. Computed at build time, rendered in the Jadwal
component.

**Jadwal Timeline** - The vertical line behind the jadwal steps. Its top/height
are calculated in `layoutJadwalLine()` from the first and last step number, so it
stays aligned regardless of text length. Recalculated on `load`, `resize` and
`document.fonts.ready`.

---

## K

**Khusus Badge** - "Khusus Yatim" / "Khusus Dhuafa" pill, class `.badge-khusus`,
on the syarat items whose indices are listed in `site.syarat.khususIndices`.

---

## M

**Mobile-First** - Base styles target mobile; `md:` (768px+) and `lg:` (1024px+)
add desktop enhancements. The layout is a single long-scroll page with no
hamburger menu.

---

## P

**Placeholder Strategy** - Decorative art is inline `<svg>` (Islamic geometry,
arch shapes). Photographs are real assets optimized at build time. No external
placeholder service and no image request for decoration.

**Progressive Enhancement** - All content is server-rendered HTML. Scripts add
the accordion, tabs, slider, overlay and scroll animation; with JS disabled every
section is still readable. There is no `.js-ready` handshake class.

---

## S

**ScrollTrigger** - GSAP plugin for scroll-linked animation. Used for the jadwal
steps (`scrub: 0.5`) only. Dead triggers (`.container` section reveal,
`.timeline-path` draw, `.animate-in`, `.scrolled`) were deleted.

**Section Divider** - `.section-divider` element inside each section header: a
short gold gradient rule under the title. Pure CSS, no component.

**Semantic Color Tokens** - Tailwind theme extensions (`primary`,
`secondary-container`, `surface-container-*`, `on-surface`, `wa-green`, ...).
Components use tokens, not raw hex. No dark mode. See ADR-0005.

**Site.ts (Single Source)** - `src/data/site.ts` exports `site` (spec data plus
computed getters such as `biayaUmumTotal` and `statusPendaftaran`). Only data
file in the project.

---

## T

**Tailwind-only CSS** - All styling via Tailwind utilities plus `@layer
components` in `src/styles/global.css`. No CSS modules, no CSS-in-JS, no second
stylesheet.

**Three.js 3D Hero** - Cancelled. No `three` dependency, no `three-hero.ts`, no
canvas. The hero is a photo with an SVG pattern. See ADR-0009 (Rejected).

---

## W

**WA FAB** - Floating WhatsApp button (bottom-right). Pulsing scale animation via
GSAP; opens `#wa-overlay`, a panel with two contact links that locks body scroll
and closes on Escape or backdrop click.
