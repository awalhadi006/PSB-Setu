# ADR-0008: GSAP Plugins + matchMedia Desktop/Mobile Split

## Status
Accepted

## Context
Animations need different behavior on mobile vs desktop per spec and design decisions.

## Decision
GSAP Core + ScrollTrigger + SplitText + TextPlugin (4 plugins).
Responsive splits via `gsap.matchMedia()`:

| Animation | Mobile | Desktop |
|-----------|--------|---------|
| SplitText | lines | words |
| ScrollTrigger | `once: true` | `toggleActions: "play none none reverse"` |
| Hero buttons | stagger 0.15s | stagger 0.1s |

All animations disabled via `prefers-reduced-motion` media query — show final state immediately.

## Consequences
- Tailored UX per device capability
- Mobile: lighter animations, no scroll jank
- Desktop: richer animations, reversible
- Accessibility: respects user motion preference

## Alternatives Considered
- Same animation everywhere: poor mobile performance
- CSS-only animations: insufficient for SplitText, count-up, timeline drawing
- Framer Motion: larger bundle, GSAP better for scroll-linked animations