# ADR-0008: GSAP + ScrollTrigger, matchMedia Split

## Status
Accepted (scope reduced - see Context)

## Context
The page originally registered four GSAP plugins: core, ScrollTrigger, SplitText
and TextPlugin. Two of them were never actually used:
- `SplitText` is a paid Club GSAP plugin and no `SplitText` call existed; the
  hero heading is animated as a single block.
- `TextPlugin` was registered but no tween used the `text:` property.

Several tweens were also dead because their selectors matched nothing:
- section reveal targeted `.container`, a class that does not exist in any
  component;
- the timeline draw targeted `#cara-mendaftar .timeline-path`, also absent;
- `.animate-in` and `.scrolled` classes were toggled but never styled.

## Decision
Register only what runs, and keep a single responsive split:

| Animation | Mobile (<768px) | Desktop (>=768px) |
|-----------|-----------------|-------------------|
| Hero entrance | CSS only: staggered `opacity`/`translateY`, starts at first paint | same |
| Jadwal steps | `scrub: 0.5`, steps 2-4 pre-hidden | same |
| Card hover / tap lift | `touchstart`/`touchend` lift | `mouseenter`/`mouseleave` lift |
| Biaya figures | spin through random digits, then lock on the real value (2 s) | same |
| WhatsApp FAB | infinite `yoyo` pulse | same |

- The hero entrance is deliberately **not** GSAP: waiting for a ~40 KB chunk
  fetched after `load` would make the title appear, disappear and re-animate.
  CSS keyframes start at first paint with zero requests. Only the text, badges,
  arch photo and CTA animate - never the background photo, which is the LCP
  element (see ADR-0012).
- Card lift covers `.syarat-item`, `.step-card` (alur pendaftaran),
  `.card-elevated*`, `.card-surface-low`, `.narahubung-card`, `.biaya-content`,
  `.misi-card`, `.galeri-card`.
- Biaya figures run on one `IntersectionObserver` per panel, not on `#biaya`:
  the section header and tabs sit above the figures, so a section-level
  threshold fired while the numbers were still below the fold.
  Each figure spins through random digits for 1.2 s, then its digits lock from
  left to right over 0.8 s and land on the exact value rendered in the HTML.
  It is deliberately not a 0-to-value count: the figure keeps its length and
  separators, so the row never changes width and nothing is implied about the
  amount until it resolves.
  The scramble plays **once per category per page load** (`biayaPlayed`).
  `switchBiayaTab()` settles an already-played panel instead of replaying it, so
  someone comparing categories never has to wait; a reload replays everything.
- `prefers-reduced-motion: reduce` returns before any tween is created, so the
  final state is whatever the HTML says (no hidden content).
- Dead tweens (section reveal, timeline draw) were deleted rather than fixed:
  re-adding `.container` wrappers to 10 components would change layout.
- GSAP itself is code-split and only fetched after `load` (see ADR-0002).

## Consequences
- ~115 KB of JS (pre-gzip) at most, and only after the page is usable.
- Fewer moving parts: three tweens instead of eight, one plugin registration.
- The scroll-scrubbed jadwal timeline is the only genuinely scroll-linked
  animation left; everything else could be done in CSS if GSAP is ever dropped.
- Reduced-motion users see a fully painted page with no hidden sections.

## Alternatives Considered
- Keep SplitText/TextPlugin "in case they are needed": they cannot be used
  without a license (SplitText) and were dead weight at runtime.
- Replace GSAP with CSS + IntersectionObserver: attractive (~115 KB saved) but
  loses the scrubbed timeline. Deferred, not rejected.
