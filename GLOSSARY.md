# Glossary

Consolidated domain terms for PSB Landing Page project.

---

## A

**Astro Assets** — Astro's built-in image optimization pipeline (`<Image />`, `getImage()`). Handles WebP conversion, width/height, lazy loading.

---

## B

**Biaya Computed Getters** — TypeScript getters in `site.ts` that sum line-item nominals per category (Umum/Dhuafa/Yatim). Single source of truth for totals: 5,150,000 / 2,800,000 / 900,000.

---

## C

**CSS Custom Properties** — Tailwind-integrated CSS variables for theming placeholders: `--pattern-color` (default `#C9A227`), `--pattern-opacity` (default `0.05`).

---

## D

**Dynamic Import** — Vite code-splitting via `import('./module')`. Creates separate chunks loaded on demand. Used for GSAP plugins and Three.js.

---

## F

**Font Stack** — System fonts only: `system-ui` (sans-serif), `Georgia` (serif). Zero download bytes, instant render.

---

## G

**GSAP Plugins** — Four plugins used:
- Core: tweening engine
- ScrollTrigger: scroll-linked animations
- SplitText: text splitting (lines/words/chars)
- TextPlugin: number counting animations

**gsap.matchMedia()** — Responsive animation API. Defines conditional contexts (mobile/desktop) with different behaviors per breakpoint.

---

## H

**Hero 3D (Three.js)** — Desktop-only decorative 3D: three 8-point stars (ExtrudeGeometry), gold material, parallax ±0.1 rad. Loads only on desktop matching criteria.

---

## I

**Inline SVG Placeholders** — Zero-request placeholder images via data URIs. Islamic geometric pattern, 16:9 banner. Themeable via CSS variables.

---

## J

**Jadwal Status** — Client-side computed registration status per timeline item. Compares current WIB date with `tanggalMulai`/`tanggalSelesai`. Three states: `Akan Datang`, `Sedang Dibuka`, `Selesai`.

**JS-Ready Pattern** — Progressive enhancement: `.js-ready` class added to `<html>` on `DOMContentLoaded`. CSS uses it to show/hide enhancement-only elements (e.g., WA float button).

---

## K

**Khusu Badge** — Visual indicator for syarat items 8–10 (indices 7–9). Class `.khusus-badge` (green pill with "Khusus" text).

---

## M

**Mobile-First** — Base styles target mobile; `md:` (768px+) and `lg:` (1024px+) add desktop enhancements. Navbar hamburger at `md` breakpoint.

---

## N

**Navbar Breakpoint** — `md` (768px). Desktop: horizontal links. Mobile: hamburger → slide-in panel with auto-close on link click, Escape, resize, backdrop click.

---

## P

**Placeholder Strategy** — Inline SVG rectangles/patterns via CSS variables. No external image requests. Works offline.

---

## R

**Registration Status Logic** — See "Jadwal Status". Computed in `site.ts` getter, used in Jadwal component for badges.

---

## S

**ScrollTrigger Behavior** — Mobile: `once: true` (animation runs once). Desktop: `toggleActions: "play none none reverse"` (reverses on scroll back).

**Section Divider** — `<SectionDivider />` component with inline Islamic pattern SVG. Placed between major sections.

**Section Title Ornament** — Gold gradient bar under `h2.section-title` via `::before` pseudo-element. Animated via `.animate-in` class (scaleX 0→1).

**Semantic Color Tokens** — Tailwind theme extensions: `primary`, `accent`, `background`, `surface`, `text`, `text-muted`, `border`, `wa-green`. No hardcoded hex in components.

**Site.ts (Single Source)** — `src/data/site.ts` exports `const site = { ... }` with ALL spec data + computed getters. Only data file in project.

**SplitText Granularity** — Mobile: per-line. Desktop: per-word. Configured via `gsap.matchMedia()`.

---

## T

**Tailwind-only CSS** — All styling via Tailwind utilities + `@layer components` in `global.css`. No CSS modules, no CSS-in-JS, no custom CSS files.

**Three.js Chunk** — Separate Vite chunk (~100KB gzipped). Loads only on desktop matching: `min-width: 1024px`, `hover: hover`, `pointer: fine`, no reduced motion, WebGL support.

**Timeline Drawing** — SVG `stroke-dashoffset` animation on `.timeline-path` in `#jadwal` and `#cara-mendaftar`. GSAP animates from 100→0 on scroll enter.

---

## W

**WA Float Button** — Fixed WhatsApp button (bottom-right, z-50). Hidden until `.js-ready`, then subtle pulse animation. Auto-hides near `#kontak` via ScrollTrigger.

**WebGL Check** — Runtime detection before Three.js init. Creates temporary canvas, checks `getContext('webgl')`. Falls back to static pattern SVG on failure.