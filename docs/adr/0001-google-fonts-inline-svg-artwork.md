# ADR-0001: Google Fonts (text only) + Inline SVG Artwork

## Status
Accepted (supersedes the original "system fonts" decision)

## Context
The page was originally planned with system fonts only. In practice the design
calls for a serif display face (Noto Serif) and a sans body face (Plus Jakarta
Sans), and the build was later found to still be loading Google Fonts. This ADR
records what the site actually does today.

## Decision
Fonts:
- Loaded from Google Fonts with `display=swap`, text subsets only:
  - `Noto Serif` (600, 700, italic 400) for display/headline text
  - `Plus Jakarta Sans` (400-700) for body/label text
- `preconnect` to `fonts.googleapis.com` and `fonts.gstatic.com`
- Families are declared once in `tailwind.config.mjs` (`fontFamily`), so
  components never name a font directly.

Artwork / placeholders:
- Islamic geometric patterns and decorative fills are inline `<svg>` in the
  components, not downloaded images.
- No external placeholder services (placehold.co etc.).
- Photographs are real files under `src/assets/`, optimized at build time by
  Astro Assets (see ADR-0003 and ADR-0012).

## Consequences
- Typography matches the design brief.
- Two extra connections are needed for fonts; both are preconnected, and
  `display=swap` means text is never invisible while they load.
- No icon webfont: icons are inline SVG (see ADR-0010), which removes the
  multi-hundred-KB `Material Symbols` font the template originally used.
- Decorative artwork costs no HTTP requests and themes through `currentColor`.

## Alternatives Considered
- System fonts only: no serif display face, design loses its character.
- Self-hosted font files: removes the Google dependency but adds ~4 woff2 files
  to the repo and its own cache/versioning burden. Revisit if third-party
  requests become a hard requirement.
- Icon webfont: rejected - a single 3.9 MB font request for ~34 glyphs.
