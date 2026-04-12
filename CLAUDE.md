# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static multi-page website for **Rockwell H2 Systems**, a hydrogen energy company. No build tools, frameworks, or package manager — pure HTML/CSS/JS opened directly in a browser or served with any static file server.

## Development

No build step. Open any `.html` file in a browser, or serve locally:

```bash
# Python
python -m http.server 8000

# Node (npx)
npx serve .
```

No tests, linter, or CI pipeline.

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Homepage — hero video, dual pathways, modular products, industries, trust signals, CTA |
| `solar.html` | Solar-to-Hydrogen solution page |
| `biomass.html` | Biomass-to-Hydrogen solution page |
| `calculator.html` | Interactive H₂ production calculator |
| `contact.html` | Contact form |
| `industries.html` | Industry verticals overview |

## File Architecture

Every page follows the same structure:
1. Load `base.css` then `style.css` in `<head>`
2. Copy the shared header/nav markup (no server-side includes — it's duplicated across all 6 pages)
3. Copy the shared footer markup
4. Load `app.js` at end of `<body>`
5. Page-specific `<script>` blocks inline after `app.js` (modals, calculator logic, etc.)

**`base.css`** (112 lines) — CSS reset and universal element defaults (box-sizing, typography, `prefers-reduced-motion`, `.sr-only`, etc.)

**`style.css`** (~4900 lines) — Everything else: design tokens (CSS custom properties), layout utilities, component styles, dark mode overrides via `[data-theme='dark']`. Organized with `/* === SECTION NAME === */` comment banners.

**`app.js`** (207 lines) — Shared behavior for all pages: theme toggle, sticky header with `data-nav-dark`/`data-nav-light` awareness, mobile menu with focus trap, nav dropdowns with keyboard support, scroll reveal (`.reveal` → `.visible`), and hero parallax.

### Header/Nav Duplication — Critical

The nav HTML (including mobile menu, dropdown Solutions menu, and "Talk to Our Team" button) is **copy-pasted identically in all 6 HTML files**. Any nav change must be replicated across: `index.html`, `solar.html`, `biomass.html`, `calculator.html`, `contact.html`, `industries.html`.

### Modal Pattern

Pages use a `data-open-modal` / `data-close-modal` attribute convention for contact and estimate modals. The modal markup (`.modal-overlay` > `.modal-card`) is embedded in each page's HTML. Modal open/close JS is in inline `<script>` blocks per page, not in `app.js`.

### Adaptive Nav Coloring

Sections marked `data-nav-dark` or `data-nav-light` trigger automatic header text color changes via IntersectionObserver in `app.js`. The header gets `.site-header--over-dark` or `.site-header--over-light` classes.

## Design Tokens

All tokens are CSS custom properties defined in `style.css` on `:root, [data-theme='light']` with overrides under `[data-theme='dark']`.

- **Brand colors**: Navy `#0d1b2e` (`--color-navy`) + Electric Green `#39d353` (`--color-accent`) / `#1a9c3e` (`--color-primary`)
- **Type scale**: fluid clamp-based scale from `--text-xs` through `--text-hero`
- **Spacing**: `--space-1` through `--space-32` (4px increments)
- **Fonts**: Cabinet Grotesk (headings) + Satoshi (body) loaded from Fontshare CDN

## Key Conventions

- **Dark mode**: Toggle is `data-theme-toggle` attribute. `<html>` carries `data-theme="light|dark"`. All dark-mode overrides live in `[data-theme='dark']` blocks in `style.css`.
- **Scroll reveal**: Add class `reveal` (or `reveal-slide-up`, `reveal-scale`, `reveal-stagger-children`) to any element; `app.js` adds `visible` on scroll. Respects `prefers-reduced-motion`.
- **Nav active state**: Set `aria-current="page"` on the active `<a>` in each page's nav.
- **Container**: Use class `container` for max-width centered layout.
- **Buttons**: `.btn` base class + `.btn-primary` / `.btn-secondary` / `.btn-outline` / `.btn-white` / `.btn-lg` modifiers.
- **Inline scripts**: Page-specific JS (modal handlers, calculator, form validation) lives in `<script>` blocks at the bottom of each HTML file, after the `app.js` include.
