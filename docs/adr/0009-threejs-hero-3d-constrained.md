# ADR-0009: Three.js Hero 3D — Constrained Desktop Only

## Status
Accepted

## Context
Hero section has a decorative 3D element (three 8-point stars) for desktop enhancement only.

## Decision
Three.js loads ONLY when ALL conditions met:
- `min-width: 1024px`
- `hover: hover`
- `pointer: fine`
- No `prefers-reduced-motion`
- WebGL support detected

Implementation:
- Dynamic `import('three')` in separate chunk
- IntersectionObserver on `#beranda` triggers load
- Scene: 3 stars, ExtrudeGeometry depth 0.1, ~150 triangles total
- Material: MeshStandardMaterial, color #C9A227, metalness 0.3
- Lights: Ambient (0.6) + Directional (gold, 0.8)
- Parallax: camera rotation ±0.1 rad, lerp 0.05
- Performance: `renderer.setPixelRatio(Math.min(dpr, 1.5))`, pause on IO exit + `visibilitychange`, dispose on unmount, debounced resize
- Error boundary: try/catch init, fallback to static pattern SVG (reuses hero background)
- Canvas: transparent, `aria-hidden="true"`, positioned behind hero text

## Consequences
- Mobile: zero Three.js bytes downloaded
- Desktop: ~100KB gzipped chunk, loads after hero visible
- Graceful degradation: pattern SVG always visible
- No layout shift: canvas absolutely positioned

## Alternatives Considered
- Always load Three.js: wastes mobile bandwidth
- CSS 3D transforms: limited, no WebGL quality
- Lottie: larger file, less interactive