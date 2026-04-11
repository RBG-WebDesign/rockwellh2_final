# Mobile Redesign — Rockwell H2 Systems

**Date:** 2026-04-10  
**Scope:** All 5 pages (index, solar, biomass, calculator, contact)

---

## Goal

Replace the current "squeezed desktop" mobile layout with a purpose-built mobile design that activates at ≤900px. Desktop (>900px) and mobile (≤900px) have completely different designs — no shared layout code beyond the CSS custom properties and base tokens.

---

## Breakpoint Strategy

| Viewport | Layout |
|---|---|
| > 900px | Desktop — existing layout, unchanged |
| ≤ 900px | Mobile — new purpose-built layout |

The 900px breakpoint replaces the existing 768px and 480px breakpoints for layout purposes. All existing `@media (max-width: 768px)` and `@media (max-width: 480px)` layout rules are removed and replaced with a single `@media (max-width: 900px)` block containing the full mobile design.

---

## Visual Direction

**Dark navy hero → white and light grey alternating sections.**

- Hero section: dark navy (`#0d1b2e`) with white text and green accent
- Content sections alternate: `#ffffff` (white) and `#f5f6f8` (light grey)
- CTA banner: dark navy
- Footer: near-black (`#080f1a`)
- No section tries to replicate the desktop's complex multi-column layouts — everything is single-column, card-based, and scrollable

---

## Mobile Nav

- Logo (hexagon mark + "ROCKWELL H2") on the left — same as desktop
- Hamburger icon on the right
- Nav is transparent over the hero, transitions to dark frosted on scroll (same `site-header--scrolled` behavior already implemented)
- Mobile menu (already implemented as dark navy overlay) — no changes needed

---

## Homepage (index.html) — Section by Section

### 1. Hero
- Full-width dark navy background (no video on mobile — video is decorative and slow to load; use a CSS gradient instead)
- Eyebrow: "On-site hydrogen production"
- H1 headline: "Your waste becomes your fuel." — large, bold, tight leading
- Sub copy: 1–2 sentences
- Two CTA buttons: "See How It Works" (primary green) + "H₂ Calculator" (outline)
- 2×2 stat grid: 30+ Years / 90 kg H₂/Day / Zero Emissions / 2 Pathways

### 2. Pathways — white background
- Eyebrow + section title: "Pick your energy source."
- Two stacked cards (Solar, Biomass), each with:
  - Icon + name + tag (Electrolysis / Thermolysis)
  - 2-sentence description
  - Spec pills (output, key feature)
  - "Learn more →" link

### 3. Modular System — grey background (`#f5f6f8`)
- Eyebrow + section title: "Four containers. Complete system."
- Simplified horizontal container chain (3 boxes with → connectors, scaled to fit 375px)
- 3 bullet points (dot + text): drop-and-run, no civil work, add another to scale

### 4. Products — white background
- Eyebrow + section title: "The complete system."
- 4 stacked product cards, each with:
  - Number (01–04) in green
  - Product name + 1-sentence description
  - Output badge (green pill)

### 5. Industries — grey background
- Eyebrow + section title: "Operations that can't afford energy surprises."
- 2-column grid of 6 industry tiles: emoji icon + name + 1-line description
  - Vineyards, Dairies, Food Processing, Municipal, Industrial, Agriculture

### 6. Trust — white background
- Eyebrow + section title: "Family-owned. 30+ years in the field."
- 4 stacked stat rows: large number in green + label text
  - 30+ years / 2 pathways / 100% modular / Zero emissions

### 7. CTA Banner — dark navy
- Headline: "See if hydrogen makes sense for your operation."
- Sub: 1 sentence
- Single primary CTA button: "Talk to Our Team"

### 8. Footer — near-black
- Logo + tagline paragraph
- 2-column link grid (6 links)
- Copyright line

---

## Inner Pages — Shared Mobile Pattern

All inner pages (solar, biomass, calculator, contact) follow the same pattern:

**Page Hero** (dark navy):
- Eyebrow label
- H1 page title
- 1–2 sentence description
- Single CTA or breadcrumb

**Content sections** alternate white/grey as they do on the homepage. Existing section content is preserved but reformatted as single-column, card-based layouts. No complex diagrams, no multi-column spec tables — replace with stacked cards or simple lists.

**Calculator page specifically:**
- Form stacks vertically (already mostly works)
- Results/equivalents grid: 2-column (already handled at 480px)
- No changes to calculator JS logic

**Contact page:**
- Form is already single-column — minimal changes needed

---

## Implementation Approach

All mobile styles live inside a single `@media (max-width: 900px)` block at the bottom of `style.css`. Mobile-specific HTML elements (e.g., replacing the desktop hero with a mobile hero) are handled via `display: none` / `display: block` toggling — no separate HTML files.

Where a section's desktop HTML is too complex to restyle for mobile (e.g., the ISO container chain diagram), a simplified mobile-only version is added to the HTML with class `mobile-only` (shown at ≤900px) and the desktop version gets class `desktop-only` (hidden at ≤900px).

### New utility classes
```css
/* Added to base.css or top of mobile media query */
.mobile-only { display: none; }
.desktop-only { display: block; }

@media (max-width: 900px) {
  .mobile-only { display: block; }
  .desktop-only { display: none; }
}
```

---

## What Doesn't Change

- All CSS custom properties / design tokens
- `app.js` behavior (theme toggle, sticky header, mobile menu, scroll reveal)
- Desktop layout (>900px) — untouched
- Mobile menu overlay (already dark navy, already working)
- The `base.css` reset

---

## Success Criteria

- [ ] At 390px (iPhone 14), no horizontal scroll, no content overflow
- [ ] At 768px (iPad portrait), mobile layout is active and looks intentional
- [ ] At 901px, desktop layout kicks in cleanly
- [ ] All 5 pages pass the mobile layout check
- [ ] Video hero hidden on mobile (performance)
- [ ] Navigation and mobile menu work correctly at all breakpoints
