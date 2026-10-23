# ADR-0004: Single site.ts with Computed Biaya Totals

## Status
Accepted

## Context
The PSB landing page has complex cost data with three categories (Umum, Dhuafa, Yatim) each with multiple line items and totals. The spec requires exact totals: 5,150,000 / 2,800,000 / 900,000.

## Decision
Single `src/data/site.ts` exporting `const site = { ... }` containing ALL spec data plus computed getters:
- `biayaUmumTotal`: sums `site.biaya.umum.items` nominal values
- `biayaDhuafaTotal`: sums `site.biaya.dhuafa.items` nominal values
- `biayaYatimTotal`: sums `site.biaya.yatim.items` nominal values
- `registrationStatus`: computes from current WIB date vs `jadwal` dates (three states: 'Akan Datang' | 'Sedang Dibuka' | 'Selesai')
- `sloganFotoGaleri`: "Bersama Al-Lathifah, Mengukir Prestasi!"

All components import from `@/data/site` (path alias). No duplicate data.

## Consequences
- Single source of truth — totals always match line items
- Build-time verification: `console.assert()` in dev, TypeScript ensures types
- Easy content updates: edit one file
- Computed getters are reactive in Astro (re-evaluated per build)

## Alternatives Considered
- Multiple data files: risk of inconsistency
- Hardcoded totals in components: drift from line items
- External CMS: overkill for static brochure site