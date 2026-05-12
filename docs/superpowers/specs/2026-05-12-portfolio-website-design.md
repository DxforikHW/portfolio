# Portfolio Website Design Spec

**Date:** 2026-05-12
**Topic:** Personal portfolio/blog website for film/TV directing graduate

## Overview

A single-page portfolio website for a recent film/TV directing graduate to showcase their profile and video works. The site serves as an online resume and portfolio for job hunting in the film/TV directing industry.

## Tech Stack

- **Build tool:** Vite
- **Languages:** HTML, CSS, vanilla JavaScript
- **Animation:** GSAP (ScrollTrigger plugin)
- **Deployment:** Vercel or GitHub Pages (static hosting)

## Visual Style: Dark Cinema

- **Background:** Deep black (#0a0a0f)
- **Primary accent:** Gold (#c9a84c) for navigation, title accents
- **Emphasis:** Dark red (#8b1a1a) for highlights
- **Typography:** Serif for headings, sans-serif for body text
- **Overall feel:** Cinematic, bold, high-contrast

## Page Structure

Single-page scroll site with 4 sections, navigated via a right-side vertical dot navigation.

### Section 1: Hero (Full Screen)
- Full-viewport video background (representative work clip, muted, looped)
- Name and role title overlaid on video
- Subtle scroll-down arrow indicator

### Section 2: About Me
- Profile photo
- Name
- Education (university, major)
- Skills list (directing, editing, screenwriting, color grading, etc.)
- Awards and internship experience
- Short personal introduction paragraph

### Section 3: Portfolio
- 4-6 video works displayed as cover card grid
- Each card: cover image, title, short description, role
- Click a card to open full-screen modal with embedded video player (Bilibili/YouTube)
- Hover effect: gold border glow on cards

### Section 4: Contact
- Email, WeChat, phone number, social media links
- Display only (no form submission)

### Navigation
- Right-side fixed vertical gold line with 3 dots representing sections
- Active dot scales up and brightens on scroll
- Smooth scroll-to-section on click

## Animation & Interaction

- GSAP ScrollTrigger for section entrance animations (fade in, slide up)
- Navigation dots highlight in sync with scroll position
- Portfolio card hover: gold border glow effect
- Responsive: navigation moves to bottom bar on mobile, cards stack to single column

## Content Source

- Video works: embedded from external platforms (Bilibili, YouTube)
- All content is static — no CMS or database

## Responsive Design

- Desktop: side navigation, multi-column card grid
- Mobile (<768px): bottom navigation bar, single-column layout
- Hero video falls back to static poster image on mobile

## Files Structure

Single HTML page with all 4 sections in one file. CSS and JS in `src/` directory.

```
/
├── index.html              # Single page with all sections
├── src/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js         # GSAP animations, navigation, modal
│   └── assets/
│       └── images/         # Profile photo, portfolio cover images
├── vite.config.js
└── package.json
```
