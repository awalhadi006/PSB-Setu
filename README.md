# PSB Landing Page — Pondok Pesantren Al-Lathifah 2

Static informational landing page for Penerimaan Santri Baru (PSB) Tahun Ajaran 2027–2028.

**Stack:** Astro (static) + Tailwind CSS + GSAP/ScrollTrigger/SplitText/TextPlugin + Three.js (desktop only)  
**Deploy:** Cloudflare Pages (`npm run build` → `dist/`)

---

## Quick Start

```bash
# Install dependencies
npm install

# Development server (localhost:4321)
npm run dev

# Production build
npm run build

# Preview build locally
npm run preview
```

---

## Project Structure

```
src/
├── data/
│   └── site.ts           # ALL content + computed getters (SINGLE SOURCE OF TRUTH)
├── components/           # Astro components (14 sections + UI)
├── layouts/
│   └── BaseLayout.astro  # HTML shell, meta, fonts, favicon
├── pages/
│   └── index.astro       # Main page assembling all sections
├── scripts/
│   ├── main.ts           # JS entry: .js-ready, dynamic imports
│   ├── gsap-animations.ts # All GSAP/ScrollTrigger logic
│   └── three-hero.ts     # Three.js 3D hero (desktop only)
├── styles/
│   └── global.css        # Tailwind + @layer components
└── utils/
    └── format.ts         # Intl.NumberFormat helpers
```

---

## Editing Content

**All content lives in `src/data/site.ts`.** Edit this file to update:

- Pondok name, tagline, tahun ajaran
- Sistem pendidikan, visi, misi, motto
- Ringkasan stats (3 Tahun SMP, 3 Tahun Aliyah, 24 Jam)
- Kegiatan (5 cards)
- Pengajar campuses (5 entries)
- Jadwal Penerimaan (dates, stages, keterangan)
- Syarat Pendaftaran (10 items, indices 7-9 = Khusus)
- Biaya Pendidikan (3 categories: Umum/Dhuafa/Yatim with line items)
- Alur Pendaftaran (5 steps)
- FAQ (6 Q&A)
- Kontak (2 WhatsApp, website, email, media sosial)
- Slogan foto galeri

### Biaya Totals (Auto-Computed)
Do NOT hardcode totals. They are computed getters:
```typescript
get biayaUmumTotal() { return this.biaya.umum.items.reduce((a,b)=>a+b.nominal,0) } // 5,150,000
get biayaDhuafaTotal() { return this.biaya.dhuafa.items.reduce((a,b)=>a+b.nominal,0) } // 2,800,000
get biayaYatimTotal() { return this.biaya.yatim.items.reduce((a,b)=>a+b.nominal,0) } // 900,000
```
Edit line items; totals update automatically.

### Adding/Removing Syarat Items
1. Add/remove string in `site.syarat.items` array
2. Update `site.syarat.khususIndices` (0-based indices for "Khusus" badge)

### Bidirectional Data
Navbar links and section IDs are synchronized via `navLinks` array in `Navbar.astro` and `id` attributes on sections. Keep them in sync.

---

## Deployment (Cloudflare Pages)

1. **Connect repository** to Cloudflare Pages
2. **Build settings:**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node version: 20+ (set in Pages dashboard → Settings → Environment variables)
3. **Deploy** — Cloudflare runs build on every push to main

### Environment Variables (Optional)
| Variable | Description |
|----------|-------------|
| `NODE_VERSION` | 20 (recommended) |

---

## Key Features

| Feature | Implementation |
|---------|----------------|
| **Progressive Enhancement** | `.js-ready` pattern; content works without JS |
| **Mobile-First** | Base styles mobile; `md:` (768px) + `lg:` (1024px) enhancements |
| **Animations** | GSAP + ScrollTrigger + SplitText + TextPlugin; `prefers-reduced-motion` respected |
| **3D Hero** | Three.js chunk loads ONLY on desktop (min-width 1024px, hover, fine pointer, no reduced motion, WebGL) |
| **Offline Registration** | No forms, no DB — only WhatsApp links & Maps button |
| **Accessibility** | Semantic HTML, native `<details>` FAQ, focus-visible, ARIA labels, WCAG AA contrast |
| **Performance** | Dynamic imports, code splitting, `setPixelRatio(min(dpr,1.5))`, `ScrollTrigger.refresh()` on load |

---

## Tech Decisions (ADRs)

See `docs/adr/` for Architecture Decision Records:
- 0001: System Fonts + Inline SVG Placeholders
- 0002: Single JS Entry + Dynamic Imports + .js-ready
- 0003: Astro Assets + Tailwind-only CSS
- 0004: Single site.ts with Computed Biaya Totals
- 0005: Semantic Tailwind Color Tokens, No Dark Mode
- 0006: Native `<details>` FAQ, `md` Navbar, Single Banner
- 0007: Umami Analytics Trade-off (not included)
- 0008: GSAP Plugins + matchMedia Desktop/Mobile Split
- 0009: Three.js Hero 3D — Constrained Desktop Only

---

## Glossary

See `GLOSSARY.md` for consolidated domain terms.

---

## Verification Checklist

Before deploying, verify:
- [ ] `npm run build` succeeds without warnings
- [ ] All 10 section IDs match navbar links (`#beranda` through `#kontak`)
- [ ] Biaya totals: 5,150,000 / 2,800,000 / 900,000 exactly
- [ ] Mobile: no horizontal scroll at 360px, tap targets ≥44px
- [ ] Mobile menu: opens/closes, auto-closes on link click
- [ ] WA float doesn't cover footer/#kontak
- [ ] Animations smooth at 4x CPU throttling (DevTools)
- [ ] Mobile Network tab: no Three.js chunk loaded
- [ ] Desktop: 3D works, pauses when off-screen
- [ ] JS disabled: all content visible
- [ ] `prefers-reduced-motion`: all content visible, no animation

---

## License

Internal use — Pondok Pesantren Al-Lathifah 2