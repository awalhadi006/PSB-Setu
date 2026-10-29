# ADR-0006: Lightweight FAQ Accordion, Fixed Header, Single Banner

## Status
Accepted (rewritten to match the implementation)

## Context
The page needs an FAQ, a header, and one banner photo. Earlier revisions of this
ADR described a native `<details>` FAQ and a mobile hamburger menu; neither
exists in the code, so the record is corrected here.

## Decision
- **FAQ**: a `<button class="faq-trigger" aria-expanded aria-controls>` per item,
  toggling `hidden` on the answer panel and rotating the chevron icon.
  - No `<details>` element: the design needs the icon on the right and a
    specific open animation, which native disclosure triangles fight.
  - `aria-expanded` / `aria-controls` / `role="region"` keep it accessible.
  - The function is exposed as `window.toggleFaq` for the inline `onclick`.
  - Without JS, all answers stay closed but the questions remain readable.
- **Header**: one fixed bar, no hamburger and no slide-in menu.
  - Hidden while `scrollY <= 4`, revealed on scroll, translated away when
    scrolling down past 100px so it does not cover content.
  - Tapping the header scrolls back to top.
  - Logo uses `<picture>`: WebP first, PNG fallback, `fetchpriority="low"` so it
    never competes with the hero photo.
- **Banner**: a single banner after `#kegiatan` with a photo and a slogan
  overlay. No carousel, no second banner.

## Consequences
- One small JS function drives the whole FAQ; no library, no layout shift.
- No mobile menu means no focus-trap, no backdrop, no resize synchronisation to
  maintain - the page is long-scroll by design.
- Header behaviour is a few `classList` calls on scroll, no animation library.
- Dead `.nav-modal*`, `.btn-nav-trigger` and `.btn-nav-close` styles were deleted
  together with this decision.

## Alternatives Considered
- Native `<details>`: zero JS, but styling the summary marker consistently
  across browsers costs more CSS than the ~10 lines of JS it replaces.
- Hamburger menu + modal: the page has 10 sections and a floating WhatsApp
  button; a menu adds a trap-prone layer for little gain.
- Carousel banner: extra JS and images for one decorative slot.
