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

**Biaya Counters** - `animateBiayaPanel(tab)`: `requestAnimationFrame` loop that
eases **every** rupiah figure in a panel from 0 to its target over 1.7 s
(ease-out). Line items and the total run at the same time and settle together, so
the panel reads as one movement. Targets are cached in `data-target` from the
rendered HTML, so there is no second source of truth; `GRATIS` rows are skipped.
The first run is triggered by an `IntersectionObserver` on the active panel
(threshold 0.45) — watching the whole `#biaya` section fired while the figures
were still below the fold. Tab switches re-run it.
`prefers-reduced-motion: reduce` lands on the final numbers without counting.

**Bundled Entry Script** - The one `<script>` written in `index.astro`. Vite
compiles it to `/_astro/index.<hash>.js` (about 5 KB). It contains the FAQ,
biaya tabs and counters, header visibility, gallery wiring, WhatsApp overlay and
the bootstrap for GSAP. See ADR-0002.

---

## C

**Card Lift** - Hover (desktop) / tap (touch) micro-interaction applied to
`.card-elevated*`, `.card-surface-low`, `.syarat-item`, `.step-card` (alur
pendaftaran), `.narahubung-card`, `.biaya-content`, `.misi-card`, `.galeri-card`:
a 4px rise via GSAP, disabled under `prefers-reduced-motion`.

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

**Header Pinning** - `updateHeader()` toggles the `hidden` class only when
`scrollY <= 4`, so the bar is invisible at the very top of the page and stays
pinned for the whole scroll. The old `-translate-y-full` auto-hide on scroll-down
was removed. In-page jumps clear the bar because `section[id]` carries
`scroll-margin-top: 5rem`.

**Hero Entrance** - CSS-only keyframes (`hero-rise`) staggered from the status
chip to the CTA: `.hero-status` 0 ms, `.hero-badge` 70 ms, `.hero-title` 140 ms,
`.slogan-box` 210 ms, `.arch-photo` 280 ms, `.hero-buttons` 350 ms; 0.62 s on
`cubic-bezier(0.22, 1, 0.36, 1)`. Runs at first paint with no JS and no request.
The background `<img>` is never animated because it is the LCP element. See
ADR-0002 and ADR-0012.

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

**WA FAB** - Floating WhatsApp button (bottom-right). Its anchor sits 1.5 rem
(24 px) from the corner on mobile and 2 rem on desktop, plus
`env(safe-area-inset-*)` so it clears the iOS home indicator. Pulsing scale
animation via GSAP; opens `#wa-overlay`, a panel with two contact links that
locks body scroll and closes on Escape or backdrop click. The footer copyright
keeps a right padding on mobile so the FAB never covers it.
