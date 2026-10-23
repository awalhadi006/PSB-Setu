# ADR-0001: System Fonts + Inline SVG Placeholders

## Status
Accepted

## Context
The PSB landing page needs fonts and placeholder images. External font files add download bytes and render-blocking requests. Placeholder images from external services add latency and privacy concerns.

## Decision
Use system fonts only:
- Sans-serif: `system-ui` (native OS font)
- Serif: `Georgia` (widely available system font)

For placeholder images, use inline SVG data URIs with CSS variables for theming:
- Islamic geometric pattern as repeating background
- 16:9 banner placeholder with slogan overlay
- All placeholders generated inline, zero external requests

## Consequences
- Zero font download bytes
- Instant text rendering (no FOIT/FOUT)
- Placeholders work offline
- Themeable via CSS custom properties (`--pattern-color`, `--pattern-opacity`)
- Slightly limited typographic expressiveness (acceptable for content-focused site)

## Alternatives Considered
- Google Fonts / self-hosted web fonts: adds ~20-50KB, render-blocking
- External placeholder services (placehold.co, etc.): privacy, latency, offline failure
- Astro Assets with real images: requires actual image files, not available per spec