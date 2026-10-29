# ADR-0010: Inline SVG Icons Instead of an Icon Font

## Status
Accepted

## Context
The template loaded Google's `Material Symbols` icon webfont and used ligature
names (`school`, `expand_more`, ...) as text content. That font is ~3.9 MB on
disk, is requested on first paint, and every icon waits for it to download and
parse before it can be seen. On a slow connection the hero badge could render the
literal word "school" before the ligature resolved.

## Decision
- A single `src/components/Icon.astro` holds the 34 paths actually used.
- Icons render as inline `<svg class="icon">` with `fill="currentColor"`, sized
  through a `.icon` utility in `global.css` (and `text-[20px]`-style overrides).
- No icon font, no icon CDN, no ligature text nodes.
- Decorative icons are `aria-hidden`; meaningful ones carry a `title`/aria label
  at the call site.

## Consequences
- Removes a ~3.9 MB asset and a render-blocking font request entirely.
- Icons inherit colour and can no longer "flash" a word while loading.
- The SVG markup is inlined per use (a few hundred bytes each), so the HTML grows
  slightly; gzip brings that close to zero because the paths repeat.
- Adding an icon means adding a path to `Icon.astro`, not editing a font.

## Alternatives Considered
- Keep the webfont with `font-display: block`: still 3.9 MB for ~34 glyphs.
- Subset the webfont: build-tool complexity for the same bytes as inline SVG.
- Icon sprite sheet: one request, but an extra round trip for the first paint.
