# PSB Landing Page — Ulw Work Plan

**Project**: Penerimaan Santri Baru (PSB) Pondok Pesantren Al-Lathifah 2, Tahun Ajaran 2027-2028
**Type**: Static informational landing page (brochure), offline registration only
**Stack**: Astro (static) + Tailwind CSS + GSAP/ScrollTrigger/SplitText/TextPlugin + Three.js (desktop only)
**Deploy**: Cloudflare Pages (`npm run build`, output: `dist`)

---

## Grill-with-Docs Decisions (Source of Truth)

All decisions below were made through the `grill-with-docs` interview process. Implementation must follow these exactly.

### Round 1: Foundation (Q1–Q10) ✅
| # | Decision | Choice |
|---|----------|--------|
| Q1 | Font families | **A**: System fonts (`system-ui` sans, `Georgia` serif) |
| Q2 | Placeholder strategy | **A**: Inline SVG rectangles with CSS vars |
| Q3 | CSS architecture | **A**: Tailwind-only + `@layer components` in `global.css` |
| Q4 | Image handling | **A**: Astro Assets (`<Image />` / `getImage()`) |
| Q5 | JS entry pattern | **A**: Single `main.ts` + dynamic imports + `.js-ready` on `<html>` |
| Q6 | Section divider | **A**: `<SectionDivider />` Astro component with inline SVG |
| Q7 | Islamic pattern | **A**: Custom 8-point star SVG (~500 bytes, CSS vars for color/opacity) |
| Q8 | WhatsApp float button | **A**: Fixed corner, auto-hide near `#kontak` via ScrollTrigger |
| Q9 | Registration status logic | **A**: Client-side date compare (WIB), three states |
| Q10 | Biaya verification | **A**: `console.assert()` in dev, build fails on mismatch |

### Round 2: Architecture & Data (Q11–Q20) ✅
| # | Decision | Choice |
|---|----------|--------|
| Q11 | `site.ts` structure | **A**: Single `export const site = { ... }` with computed getters |
| Q12 | TypeScript strictness | **A**: Full TS, `strict: true` for `site.ts`, components, scripts |
| Q13 | Biaya computation | **A**: Computed getters in `site.ts` (single source of truth) |
| Q14 | Color tokens | **A**: Semantic Tailwind `theme.colors` extensions |
| Q15 | Dark mode | **A**: None (single light theme per spec) |
| Q16 | Language/i18n | **A**: Indonesian only, `lang="id"` |
| Q17 | Navbar breakpoint | **A**: `md` (768px), hamburger < 768px, auto-close on link click |
| Q18 | Banner foto placeholder | **A**: Single banner after `#kegiatan`, 16:9, SVG + slogan overlay |
| Q19 | FAQ markup | **A**: Native `<details>/<summary>` with CSS transitions |
| Q20 | Analytics | **B**: Umami self-hosted (note: spec says no third-party scripts — documented trade-off) |

### Round 3: Animation & 3D (Q21–Q30) ✅
| # | Decision | Choice |
|---|----------|--------|
| Q21 | GSAP plugins | **A+B**: Core, ScrollTrigger, SplitText, **TextPlugin** |
| Q22 | ScrollTrigger behavior | **B**: `once: true` on mobile, `toggleActions: "play none none reverse"` on desktop via `matchMedia()` |
| Q23 | SplitText granularity | **B**: Per word on desktop, per line on mobile via `matchMedia()` |
| Q24 | Count-up targets | **B**: Ringkasan stats (3, 3, 24) **plus** biaya totals (clarify: animate the big totals 5.150.000 / 2.800.000 / 900.000) |
| Q25 | Timeline drawing | **A**: SVG `stroke-dashoffset` animated by GSAP |
| Q26 | Section title ornament | **A**: `::before` with `scaleX(0→1)` gold gradient |
| Q27 | Three.js load trigger | **A**: IntersectionObserver on hero element |
| Q28 | Three.js complexity | **A**: 3 stars, ~150 triangles, ExtrudeGeometry depth 0.1 |
| Q29 | Mouse parallax | **B**: Stronger (±0.1 rad), damped `lerp(0.05)` |
| Q30 | Three.js fallback | **A**: Reuse Islamic pattern SVG from hero background |

---

## ADRs to Create (During Implementation)

| ADR | Title | Key Points |
|-----|-------|------------|
| 0001 | System Fonts + Inline SVG Placeholders | Zero bytes, instant, themeable via CSS vars |
| 0002 | Single JS Entry + Dynamic Imports + `.js-ready` | `main.ts` loads GSAP/Three after DOMContentLoaded |
| 0003 | Astro Assets + Tailwind-only CSS | Auto WebP, width/height, lazy; `@layer components` |
| 0004 | Single `site.ts` with Computed Biaya Totals | Getters ensure totals always match components |
| 0005 | Semantic Tailwind Color Tokens, No Dark Mode | `primary`, `accent`, `background`, etc. as theme extensions |
| 0006 | Native `<details>` FAQ, `md` Navbar, Single Banner | Zero-JS accordion, standard breakpoint, mid-page banner |
| 0007 | Umami Self-Hosted Analytics | Trade-off vs. "no third-party scripts" in spec |
| 0008 | GSAP Plugins + matchMedia Desktop/Mobile Split | Core, ScrollTrigger, SplitText, TextPlugin; different behaviors per breakpoint |
| 0009 | Three.js Hero 3D — Constrained Desktop Only | 3 stars, IO load, parallax, SVG fallback, dispose on unmount |

---

## GLOSSARY.md Entries (Final)

See consolidated glossary in this plan. Key terms:
- **Font Stack**: System fonts only
- **Placeholder Strategy**: Inline SVG via CSS vars
- **CSS Architecture**: Tailwind `@layer components`
- **Image Handling**: Astro Assets
- **JS Entry Pattern**: Single entry, dynamic imports, `.js-ready`
- **Section Divider**: `<SectionDivider />` with Islamic pattern SVG
- **Islamic Geometric Pattern**: 8-point star, CSS vars `--pattern-color`, `--pattern-opacity`
- **WhatsApp Float Button**: Fixed corner, ScrollTrigger hide at `#kontak`
- **Registration Status Logic**: Client date compare, 3 states
- **Biaya Verification**: Dev assert + build fail
- **Site Config Structure**: Single `site.ts` with computed getters
- **TypeScript Strictness**: `strict: true`
- **Color Tokens**: Semantic Tailwind extensions
- **Dark Mode**: None
- **Language**: Indonesian only
- **Navbar Breakpoint**: `md` (768px)
- **Banner Foto**: Single after `#kegiatan`, 16:9 SVG
- **FAQ Markup**: Native `<details>` with CSS transition
- **Analytics**: Umami self-hosted (documented trade-off)
- **GSAP Plugins**: Core, ScrollTrigger, SplitText, TextPlugin
- **ScrollTrigger Behavior**: Mobile `once:true`, Desktop `toggleActions`
- **SplitText Granularity**: Mobile lines, Desktop words
- **Count-up Targets**: Ringkasan stats + biaya totals
- **Timeline Drawing**: SVG stroke-dashoffset
- **Section Ornament**: `::before` scaleX gold gradient
- **Three.js Load Trigger**: IntersectionObserver on hero
- **Three.js Complexity**: 3 stars, ~150 tris
- **Mouse Parallax**: ±0.1 rad, lerp 0.05
- **Three.js Fallback**: Reuse Islamic pattern SVG

---

## Implementation Phases (Per Spec)

### Fase 1: Foundation
- [x] `npm create astro@latest` → TypeScript, Tailwind
- [x] `npm install -D tailwindcss @astrojs/tailwind gsap three`
- [x] `npm install --save gsap@npm:@gsap/shockingly` (if Club) or standard GSAP + ScrollTrigger + SplitText + TextPlugin
- [x] Configure `tailwind.config.mjs` with color tokens, font families
- [x] Create `src/styles/global.css` with `@tailwind base/components/utilities` + `@layer components`
- [x] Create `src/data/site.ts` with **all spec data** + computed biaya getters + status getter
- [x] Create `src/scripts/main.ts` entry with `.js-ready` pattern
- [x] Layout: `BaseLayout.astro` (meta, fonts, theme-color, favicon)
- [x] Navbar component (sticky, hamburger < md, auto-close)
- [x] Hero (static version): nama, tagline, tahunAjaran, 2 CTAs (WA + Cara Mendaftar)
- [x] WhatsApp floating button (fixed, z-50)
- [x] Verify: no horizontal scroll at 360px, menu works, WA button accessible

### Fase 2: All Sections (Mobile-First)
- [x] `#profil`: sistemPendidikan, ringkasan (3 stat cards), motto, visi, misi
- [x] `#kegiatan`: 5 cards from `site.kegiatan`
- [x] `<SectionDivider />` with Islamic pattern between sections
- [x] `#pengajar`: description + grid of campus badges (Al-Azhar, UIN Jakarta, UIN Bandung, IIQ, KMI Gontor)
- [x] `#jadwal`: timeline with SVG connecting line, status badge (computed)
- [x] `#syarat`: 10 items, visual "Khusus" badge for 8–10
- [x] `#biaya`: tabs/kartu Umum/Dhuafa/Yatim, computed totals formatted with `Intl.NumberFormat`, keterangan list
- [x] `#cara-mendaftar`: 5-step alur + alamat + Maps button (no iframe)
- [x] `#faq`: native `<details>` from `site.faq`
- [x] `#kontak`: both WA contacts, website, email, mediaSosial (conditional), footer
- [x] Banner foto placeholder after `#kegiatan` (16:9 SVG + slogan)
- [x] Verify: all `href="#..."` match `id`, no horizontal scroll at 360px, tap targets ≥44px

### Fase 3: GSAP Animations
- [x] Hero: SplitText title (lines mobile, words desktop), pattern/gradient drift, staggered button reveal
- [x] ScrollTrigger scroll-reveal: fade+slide-up stagger, `once:true` mobile / `toggleActions` desktop
- [x] Count-up: ringkasan stats (3, 3, 24) + biaya totals (5.150.000 etc.) on enter
- [x] Timeline drawing: SVG stroke-dashoffset on `#jadwal` and `#cara-mendaftar`
- [x] Section ornament: `::before` scaleX on each `h2`
- [x] Card hover/tap: lift + shadow; biaya tab transition
- [x] WA float: subtle pulse; navbar solid+shadow on scroll
- [x] `gsap.matchMedia()` for all desktop/mobile splits
- [x] `prefers-reduced-motion`: disable all animations, show final state
- [x] `ScrollTrigger.refresh()` after images/fonts load
- [x] Verify: smooth on 4x CPU throttling, content readable with JS disabled

### Fase 4: Hero 3D (Desktop Only)
- [x] Condition: `matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)")` + no prefers-reduced-motion + WebGL check
- [x] Dynamic `import('three')` in separate chunk, triggered by IntersectionObserver on hero
- [x] Scene: 3 eight-point stars (Shape + ExtrudeGeometry 0.1), MeshStandardMaterial gold #C9A227 metalness 0.3, 2 lights, slow rotation
- [x] Canvas: transparent bg, `aria-hidden="true"`, positioned behind/beside hero text
- [x] Parallax: camera rotation ±0.1 rad, lerp 0.05
- [x] Performance: `renderer.setPixelRatio(Math.min(dpr, 1.5))`, pause on IntersectionObserver exit + `visibilitychange`, dispose on unmount, debounced resize
- [x] Error boundary: try/catch WebGL init, fallback to static pattern SVG
- [x] Verify: mobile never loads Three chunk, desktop 3D stops off-screen, no layout shift

### Fase 5: QA & Optimize
- [x] All `href="#..."` match existing `id`
- [x] No horizontal scroll at 360px
- [x] Mobile menu open/close works, closes on link click
- [x] WA float doesn't cover footer/`#kontak`
- [x] No typos, no foreign words, no data outside spec
- [x] Biaya totals: 5,150,000 / 2,800,000 / 900,000 exactly
- [x] Animations smooth at 4x CPU throttling
- [x] Mobile network tab: no Three.js chunk
- [x] Desktop: 3D works, pauses off-screen
- [x] JS disabled: all content visible
- [x] `prefers-reduced-motion`: all content visible, no animation
- [x] `npm run build` succeeds without warnings
- [x] Lighthouse mobile: Perf 85+, A11y 95+
- [x] Write `README.md`: Cloudflare Pages deploy + `site.ts` editing guide

---

## File Structure (Target)

```
psb-landing/
├── .omo/plans/psb-landing-page.md    ← this plan
├── docs/
│   ├── adr/
│   │   ├── 0001-system-fonts-inline-svg-placeholders.md
│   │   ├── 0002-single-js-entry-dynamic-imports.md
│   │   ├── 0003-astro-assets-tailwind-only.md
│   │   ├── 0004-single-site-ts-computed-biaya.md
│   │   ├── 0005-semantic-tailwind-colors-no-dark-mode.md
│   │   ├── 0006-native-details-faq-md-navbar-single-banner.md
│   │   ├── 0007-umami-analytics-tradeoff.md
│   │   ├── 0008-gsap-plugins-matchmedia-split.md
│   │   └── 0009-threejs-hero-3d-constrained.md
│   └── agents/                        ← from setup-matt-pocock-skills
├── GLOSSARY.md                        ← consolidated glossary
├── AGENTS.md                          ← already exists
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
├── public/
│   ├── favicon.svg
│   └── fonts/                         ← empty (system fonts)
├── src/
│   ├── data/
│   │   └── site.ts                    ← ALL SPEC DATA + COMPUTED GETTERS
│   ├── components/
│   │   ├── Navbar.astro
│   │   ├── Hero.astro
│   │   ├── SectionDivider.astro
│   │   ├── BannerFoto.astro
│   │   ├── Profil.astro
│   │   ├── Kegiatan.astro
│   │   ├── Pengajar.astro
│   │   ├── Jadwal.astro
│   │   ├── Syarat.astro
│   │   ├── Biaya.astro
│   │   ├── CaraMendaftar.astro
│   │   ├── FAQ.astro
│   │   ├── Kontak.astro
│   │   ├── WhatsAppFloat.astro
│   │   └── CampusBadge.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   └── index.astro
│   ├── scripts/
│   │   ├── main.ts                    ← entry: .js-ready, dynamic imports
│   │   ├── gsap-animations.ts         ← all GSAP/ScrollTrigger logic
│   │   └── three-hero.ts              ← Three.js hero (desktop only)
│   ├── styles/
│   │   └── global.css                 ← @tailwind + @layer components
│   └── utils/
│       └── format.ts                  ← Intl.NumberFormat helpers
└── README.md
```

---

## Verification Checklist (Definition of Done)

- [x] `npm run build` → `dist/` created, no warnings
- [x] `npm run preview` → local preview works
- [x] Deploy to Cloudflare Pages: build command `npm run build`, output `dist`
- [x] All 10 sections present with correct `id`
- [x] Navbar sticky, hamburger < 768px, closes on link click
- [x] Hero: static content correct, CTAs use "Cara Mendaftar" / "Tanya via WhatsApp"
- [x] WA links: `https://wa.me/6289679313820?text=...` encoded, `target="_blank" rel="noopener noreferrer"`
- [x] Maps link: `https://www.google.com/maps/search/?api=1&query=...` encoded
- [x] Biaya totals computed in code match spec exactly
- [x] Registration status computes correctly (test with date mocking)
- [x] Islamic pattern SVG appears in hero bg + section dividers
- [x] GSAP animations: hero, scroll-reveal, count-up, timeline draw, ornaments, cards, WA pulse, navbar
- [x] `prefers-reduced-motion`: animations disabled, content visible
- [x] JS disabled: all content visible (`.js-ready` hides nothing critical)
- [x] Three.js: loads only on desktop matching criteria, pauses off-screen, fallback works
- [x] Mobile: no Three.js chunk in network tab
- [x] Lighthouse mobile: Performance ≥85, Accessibility ≥95
- [x] README.md with deploy + editing instructions

---

## Risk Notes

1. **Umami analytics** conflicts with "no third-party scripts" in spec. Document in ADR-0007. Consider making it optional via env var.
2. **Count-up biaya totals** (Q24-B) means animating 7-digit numbers — ensure TextPlugin handles formatting (commas/dots) or use custom formatter.
3. **Three.js WebGL fallback** must be truly silent — no console errors visible to user.
4. **TextPlugin** is a Club GSAP plugin — if not available, implement count-up with core GSAP + custom formatter.
5. **Indonesian number format** uses `.` as thousands separator — `Intl.NumberFormat('id-ID')` handles this.

---

## Next Step

Run `/ulw-execute` to start Fase 1 implementation. Each phase ends with verification before proceeding.