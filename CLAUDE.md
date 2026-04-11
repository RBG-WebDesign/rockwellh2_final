# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static multi-page website for **Rockwell H2 Systems**, a hydrogen energy company. No build tools, frameworks, or package manager — pure HTML/CSS/JS opened directly in a browser or served with any static file server.

## Pages

- `index.html` — Homepage (hero video, features, trust signals)
- `solar.html` — Solar to Hydrogen solution page
- `biomass.html` — Biomass to Hydrogen solution page
- `calculator.html` — Interactive H₂ production calculator
- `contact.html` — Contact form

## File Architecture

Every page follows the same structure:
1. Load `base.css` then `style.css` in `<head>`
2. Copy the shared header/nav markup (no server-side includes — it's duplicated across files)
3. Copy the shared footer markup
4. Load `app.js` at end of `<body>`

**`base.css`** — CSS reset and universal element defaults (box-sizing, typography, `prefers-reduced-motion`, `.sr-only`, etc.)

**`style.css`** — Everything else: design tokens (CSS custom properties), layout utilities, component styles, dark mode overrides via `[data-theme='dark']`. Organized with section comments.

**`app.js`** — Shared behavior for all pages: theme toggle (light/dark, persists via `data-theme` on `<html>`), sticky header, mobile menu, nav dropdowns, and scroll reveal (`.reveal` → `.visible`).

## Design Tokens

All tokens are CSS custom properties defined in `style.css` on `:root, [data-theme='light']` with overrides under `[data-theme='dark']`.

- **Brand colors**: Navy `#0d1b2e` (`--color-navy`) + Electric Green `#39d353` (`--color-accent`) / `#1a9c3e` (`--color-primary`)
- **Type scale**: fluid clamp-based scale from `--text-xs` through `--text-hero`
- **Spacing**: `--space-1` through `--space-32` (4px increments)
- **Fonts**: Cabinet Grotesk (headings) + Satoshi (body) loaded from Fontshare CDN

## Development

No build step. Open any `.html` file in a browser, or serve locally:

```bash
# Python
python -m http.server 8000

# Node (npx)
npx serve .
```

## Key Conventions

- **Dark mode**: Toggle is `data-theme-toggle` attribute. The `<html>` element carries `data-theme="light|dark"`. All dark-mode overrides live in `[data-theme='dark']` blocks in `style.css`.
- **Scroll reveal**: Add class `reveal` to any element; `app.js` adds `visible` on scroll. Animations are defined in `style.css` on `.reveal` / `.reveal.visible`.
- **Nav active state**: Set `aria-current="page"` on the active `<a>` in each page's nav.
- **Header duplication**: The nav HTML (including mobile menu) is copy-pasted in every `.html` file — changes must be made in all pages.
- **Container**: Use class `container` for max-width centered layout.
- **Buttons**: `.btn` base class + `.btn-primary` / `.btn-secondary` / `.btn-outline` modifiers.
