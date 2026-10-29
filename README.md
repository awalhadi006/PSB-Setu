# PSB Landing Page — Pondok Pesantren Al-Lathifah 2

Static informational landing page for Penerimaan Santri Baru (PSB) Tahun Ajaran 2027–2028.

**Stack:** Astro (static) + Tailwind CSS + GSAP/ScrollTrigger (bundled, loaded after paint)  
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
│   └── site.ts           # Reference data + computed getters (single source of truth)
├── components/           # Astro components (14 sections + UI)
│   └── Icon.astro        # Inline SVG icon set (no icon webfont)
├── layouts/
│   └── BaseLayout.astro  # HTML shell, meta, fonts, favicons, hero preload
├── pages/
│   └── index.astro       # Main page: sections + page scripts (bundled by Vite)
├── styles/
│   └── global.css        # Tailwind + @layer components
└── utils/
    └── hero-image.ts     # Hero renditions shared by <img> and <link rel=preload>
```

---

## Editing Content

`src/data/site.ts` holds the **structured reference data** (single source of
truth for anything used in more than one place):

- Pondok name, tagline, address, tahun ajaran
- Contact block: two WhatsApp numbers with pre-filled messages, website, email,
  social links, Maps link
- Biaya Pendidikan (3 categories: Umum/Dhuafa/Yatim with line items) and the
  computed totals

Long-form copy (profil, kegiatan, pengajar, jadwal, syarat, alur, FAQ, galeri)
lives in the component that renders it: `src/components/<Section>.astro`.

### Biaya Totals (Auto-Computed)
Do NOT hardcode totals. They are computed getters:
```typescript
get biayaUmumTotal() { return this.biaya.umum.items.reduce((a,b)=>a+b.nominal,0) } // 5,150,000
get biayaDhuafaTotal() { return this.biaya.dhuafa.items.reduce((a,b)=>a+b.nominal,0) } // 2,800,000
get biayaYatimTotal() { return this.biaya.yatim.items.reduce((a,b)=>a+b.nominal,0) } // 900,000
```
Edit line items; totals update automatically. Dev builds `console.assert()` the
three totals so a drift shows up immediately.

### Syarat Items
The list and its "Khusus Yatim"/"Khusus Dhuafa" badges are in
`src/components/Syarat.astro`. Edit the item markup there (`.badge-khusus`).

### Section IDs
The header has no navigation menu (single long-scroll page). Section `id`s
(`#beranda` ... `#kontak`) are only used by in-page links and buttons, so if you
rename one, search the components for the old id.

---

## Deployment (Cloudflare Pages)

1. **Connect repository** to Cloudflare Pages
2. **Build settings:**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node version: 22+ (`engines` in `package.json` requires `>=22.22.0`)
3. **Deploy** — Cloudflare runs build on every push to main

`public/_headers` ships the security headers (CSP, HSTS-less, cache policy) with
the build; it allows Google Fonts only, no CDN script origin.

### Environment Variables (Optional)
| Variable | Description |
|----------|-------------|
| `NODE_VERSION` | 22 (matches `engines`) |

---

## Key Features

| Feature | Implementation |
|---------|----------------|
| **Progressive Enhancement** | All content is server-rendered HTML; scripts only add polish |
| **Mobile-First** | Base styles mobile; `md:` (768px) + `lg:` (1024px) enhancements |
| **Animations** | GSAP + ScrollTrigger in a code-split chunk fetched after `load`; `prefers-reduced-motion` respected |
| **Icons** | Inline `<svg>` from `Icon.astro` (~34 paths) — no icon webfont request |
| **Offline Registration** | No forms, no DB — only WhatsApp links & Maps button |
| **Accessibility** | Semantic HTML, native `<details>` FAQ, focus-visible, ARIA labels, WCAG AA contrast |
| **Performance** | Inlined CSS, responsive hero `<img>` with `srcset` + `fetchpriority="high"`, WebP gallery via `<Image>`, zero third-party requests |

---

## Tech Decisions (ADRs)

See `docs/adr/` for Architecture Decision Records:
- 0001: Google Fonts (text only) + Inline SVG Placeholders
- 0002: Single Bundled Entry Script + Lazy GSAP Chunk
- 0003: Astro Assets + Tailwind-only CSS
- 0004: Single site.ts with Computed Biaya Totals
- 0005: Semantic Tailwind Color Tokens, No Dark Mode
- 0006: Native `<details>` FAQ, `md` Navbar, Single Banner
- 0007: Umami Analytics Trade-off (not included)
- 0008: GSAP + matchMedia Desktop/Mobile Split
- 0009: Three.js 3D Hero — **Rejected** (not implemented)
- 0010: Inline SVG Icons Instead of an Icon Font
- 0011: Inlined Stylesheets (single-page site)
- 0012: Hero Photo as a Responsive `<img>` (LCP)

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
- [ ] Network tab: only first-party requests (no CDN, no icon font)
- [ ] Icons render as inline SVG (check a few, not just the count)
- [ ] FAQ icon rotates, gallery arrows change slide, biaya tabs switch
- [ ] JS disabled: all content visible
- [ ] `prefers-reduced-motion`: all content visible, no animation

---

## License

Internal use — Pondok Pesantren Al-Lathifah 2