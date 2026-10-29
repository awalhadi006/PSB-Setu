# ADR-0009: Three.js 3D Hero - Rejected

## Status
**Rejected** - not implemented. No Three.js code, dependency or documentation
claim survives in the repository.

## Context
An earlier design explored a decorative WebGL hero: three 8-point stars built
with `ExtrudeGeometry`, shown only on large screens, loaded through a dynamic
`import('three')` chunk with an IntersectionObserver trigger, a WebGL capability
check, a `prefers-reduced-motion` check, pause-on-hidden and disposal logic.

A prototype entry point existed (`src/scripts/three-hero.ts`) but was never
imported by any component. The `three` package was still listed as a dependency,
so it shipped to `node_modules` and inflated install/CI time for a feature that
rendered nothing.

## Decision
Drop the 3D hero entirely:
- `three` removed from `package.json` (`npm uninstall three`).
- `src/scripts/three-hero.ts` deleted.
- Hero decoration stays 2D: inline SVG arabesque pattern plus the photo overlay.
- No WebGL capability sniffing, no canvas, no third-party 3D bytes.

## Consequences
- Roughly 100 KB (gzipped) of potential JavaScript is gone from the project.
- The hero has one LCP element (the photo `<img>`, see ADR-0012) instead of a
  canvas competing with images for the main thread.
- Mobile and desktop now render the same hero; there is no capability branch to
  test, document, or maintain.
- If a 3D hero is ever revisited, it should be a new ADR: a canvas in the LCP
  area has a direct cost on perceived load speed, not just a bundle cost.

## Alternatives Considered
- Keep the code behind a flag: dead code that still needs to compile, test and
  be documented.
- CSS 3D transforms: cheap, but the desired look needed real geometry/lighting.
- Pre-rendered video or image sequence: heavy, and not needed for a decorative
  element.
