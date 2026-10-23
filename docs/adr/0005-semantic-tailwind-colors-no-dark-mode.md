# ADR-0005: Semantic Tailwind Color Tokens, No Dark Mode

## Status
Accepted

## Context
The spec defines exact colors: primary #0B3D2E (dark green), accent #C9A227 (gold), background #FBF7EE (cream), surface #FFFFFF (white). No dark mode required.

## Decision
Extend Tailwind `theme.colors` with semantic tokens in `tailwind.config.mjs`:
- `primary`, `primary-light`, `primary-dark`
- `accent`, `accent-soft`
- `background`
- `surface`
- `text`, `text-muted`
- `border`
- `wa-green` (for WhatsApp buttons)

All components use semantic tokens (e.g., `text-primary`, `bg-accent`, `bg-surface`). No hardcoded hex values in component classes.

No dark mode implementation — single light theme per spec.

## Consequences
- Consistent color usage across all components
- Easy global color changes via config
- Semantic names improve readability (`bg-primary` vs `bg-[#0B3D2E]`)
- No dark mode complexity (no `dark:` variants, no theme switching JS)

## Alternatives Considered
- Hardcoded hex in classes: fragile, hard to update
- CSS custom properties only: less Tailwind integration
- Dark mode: spec doesn't require it, adds complexity