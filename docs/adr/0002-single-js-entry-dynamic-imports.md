# ADR-0002: Single JS Entry + Dynamic Imports + .js-ready

## Status
Accepted

## Context
The landing page needs progressive enhancement: core content must work without JavaScript, animations and 3D enhance the experience when JS is available.

## Decision
Single entry point `src/scripts/main.ts` with:
1. `.js-ready` class added to `<html>` on `DOMContentLoaded` — hides nothing critical, only enables enhancements
2. Dynamic imports for heavy modules:
   - GSAP + plugins (ScrollTrigger, SplitText, TextPlugin) loaded after DOM ready
   - Three.js loaded conditionally (desktop only, IntersectionObserver trigger)
3. All imports use Vite's code splitting — separate chunks for GSAP and Three.js

## Consequences
- Initial HTML + CSS loads fast, no JS blocking
- GSAP chunk (~50KB gzipped) loads after DOM
- Three.js chunk (~100KB gzipped) loads only on desktop matching criteria
- Mobile never downloads Three.js
- `.js-ready` pattern enables CSS-only fallbacks (e.g., `.wa-float.hidden` shown via `.js-ready .wa-float { display: block }`)

## Alternatives Considered
- Multiple entry points: complicates build, no benefit
- Inline scripts: breaks CSP, harder to maintain
- No dynamic imports: mobile downloads Three.js unnecessarily