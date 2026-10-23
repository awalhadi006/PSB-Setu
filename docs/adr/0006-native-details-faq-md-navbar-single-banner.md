# ADR-0006: Native `<details>` FAQ, `md` Navbar, Single Banner

## Status
Accepted

## Context
The spec requires FAQ, responsive navbar, and a banner foto placeholder.

## Decision
- FAQ: Native `<details>`/`<summary>` elements with CSS transitions (no JS accordion)
  - Zero-JS functionality
  - Smooth open/close via `max-height` transition
  - Chevron rotation via `[open]` selector
  - Accessible by default
- Navbar: `md` breakpoint (768px)
  - Desktop: horizontal links
  - Mobile (<768px): hamburger menu, slide-in panel
  - Auto-close on link click, Escape key, resize to desktop, backdrop click
- Banner Foto: Single placeholder after `#kegiatan`
  - 16:9 aspect ratio (`aspect-video`)
  - Islamic pattern background
  - Slogan overlay: "Bersama Al-Lathifah, Mengukir Prestasi!"
  - No multiple banners, no carousel

## Consequences
- FAQ works without JS, enhanced with CSS
- Navbar accessible, standard breakpoint
- Single banner keeps page lightweight

## Alternatives Considered
- JS accordion: unnecessary complexity
- Multiple breakpoints: `md` is standard, sufficient
- Multiple banners / carousel: spec says single, adds JS