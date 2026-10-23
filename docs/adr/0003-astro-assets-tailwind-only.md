# ADR-0003: Astro Assets + Tailwind-only CSS

## Status
Accepted

## Context
The project needs image optimization and a consistent styling approach.

## Decision
- Images: Use Astro Assets (`<Image />` / `getImage()`) for automatic WebP conversion, width/height attributes, lazy loading. Placeholder images use inline SVG (see ADR-0001).
- CSS: Tailwind-only with `@layer components` in `src/styles/global.css`
  - No custom CSS files beyond `global.css`
  - Component classes defined in `@layer components` (e.g., `.btn-primary`, `.card`, `.section-title`)
  - Utility-first for one-off styles
  - No CSS modules, no Styled Components, no PostCSS plugins beyond Tailwind

## Consequences
- Consistent design tokens via Tailwind config
- Automatic vendor prefixing, purging
- Component classes reusable across Astro components
- Small CSS output (only used utilities + component classes)
- No runtime CSS-in-JS overhead

## Alternatives Considered
- CSS Modules: adds build complexity, no benefit for static site
- Styled Components / Emotion: runtime overhead, overkill
- Plain CSS + Tailwind: duplication of tokens