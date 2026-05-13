# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # Production build to dist/
npm run preview   # Preview production build locally
```

No test suite or linter is configured.

## Architecture

Single-page portfolio website for a film/TV directing graduate. **No framework** — vanilla HTML, CSS, and JS built with Vite. GSAP (ScrollTrigger) for scroll animations.

```
index.html              # All 4 sections in one file
src/css/style.css       # All styles (CSS custom properties, no preprocessor)
src/js/main.js          # Navigation, portfolio cards, modal, GSAP animations
src/assets/images/      # Profile photo + portfolio cover images
```

**Page sections (in order):** Hero (fullscreen video bg) → About (photo + bio grid) → Portfolio (card grid, JS-rendered) → Contact (display-only info).

**Key patterns:**
- `index.html` is the single HTML file — all section markup is inline, portfolio cards are injected by JS
- CSS uses custom properties defined on `:root` for theming (colors, fonts, max-width)
- `src/js/main.js` imports GSAP via ES modules (`import gsap from 'gsap'`) — GSAP is an npm dependency, NOT loaded from CDN
- Portfolio data (`portfolioData` array in `main.js`) is hardcoded — each entry has title, desc, role, cover image path, and Bilibili embed URL
- Modal opens when a portfolio card is clicked, loads video via iframe
- Right-side vertical dot navigation syncs with scroll position, moves to bottom bar on mobile (<768px)
- Vite base path is `/portfolio/` (configured in `vite.config.js`)

**GSAP usage:** All ScrollTrigger animations are in `main.js`. Section titles, about grid, portfolio cards, and contact items have scroll-triggered entrance animations. Hero content has a scrub-based parallax effect.
