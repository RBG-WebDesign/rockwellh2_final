# Mobile Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the squeezed-down desktop layout on mobile with a purpose-built mobile design that activates at ≤900px, with a dark navy hero and alternating white/grey sections.

**Architecture:** All mobile styles live in a single `@media (max-width: 900px)` block appended to `style.css`. Mobile-only HTML (simplified container diagram, mobile hero content) is added to each page with `.mobile-only` / `.desktop-only` utility classes that toggle visibility. Desktop layout (>900px) is untouched.

**Tech Stack:** Pure HTML/CSS, no build tools. Verify in browser at 390px (iPhone) and 768px (iPad portrait). Serve with `python -m http.server 8000` from the project root.

---

## File Map

| File | Changes |
|---|---|
| `base.css` | Add `.mobile-only` / `.desktop-only` utility classes |
| `style.css` | Remove old 768px/480px layout rules; add full `@media (max-width: 900px)` block |
| `index.html` | Add mobile hero variant; add `.desktop-only` to video/hero-right/complex diagrams |
| `solar.html` | Add `.desktop-only` to complex spec tables; mobile page hero |
| `biomass.html` | Same as solar.html |
| `calculator.html` | Minimal — form already stacks; fix overflow |
| `contact.html` | Minimal — form already single column; fix overflow |

---

## Task 1: Add utility classes to base.css

**Files:**
- Modify: `base.css`

- [ ] **Step 1: Add mobile/desktop toggle utilities**

Open `base.css` and append at the end:

```css
/* ============================================================
   VISIBILITY UTILITIES
   ============================================================ */
.mobile-only  { display: none !important; }
.desktop-only { display: block !important; }
```

- [ ] **Step 2: Verify at 390px**

Open `index.html` in browser, resize to 390px. Nothing should visually change yet — these classes aren't applied to anything.

- [ ] **Step 3: Commit**

```bash
git add base.css
git commit -m "feat: add mobile-only/desktop-only utility classes"
```

---

## Task 2: Remove old responsive rules from style.css

**Files:**
- Modify: `style.css` (lines ~1966–1981 and ~2535 and ~3656)

The old 768px and 480px breakpoints will be replaced entirely by the new 900px block. Remove them now so they don't conflict.

- [ ] **Step 1: Remove the 768px layout block (lines ~1966–1976)**

Find and delete this entire block from `style.css`:

```css
@media (max-width: 768px) {
  .nav-links, .nav-right .btn { display: none; }
  .nav-hamburger { display: flex; }
  .trust-layout, .modular-content, .contact-layout { grid-template-columns: 1fr; }
  .trust-visual { order: -1; }
  .footer-grid { grid-template-columns: 1fr 1fr; }
  .form-row { grid-template-columns: 1fr; }
  .calc-equivalents { grid-template-columns: 1fr 1fr; }
  .calc-projection-results { grid-template-columns: 1fr 1fr; }
  .hero-stats { gap: var(--space-6); }
}
```

- [ ] **Step 2: Remove the 480px layout block (lines ~1978–1981)**

Find and delete:

```css
@media (max-width: 480px) {
  .footer-grid { grid-template-columns: 1fr; }
  .calc-equivalents { grid-template-columns: 1fr 1fr; }
}
```

- [ ] **Step 3: Find and remove the other 768px block (~line 2535)**

Search `style.css` for the second `@media (max-width: 768px)` block. It contains `.pathways-header`, `.pathways-grid` rules. Delete the entire block.

- [ ] **Step 4: Find and remove the third 768px block (~line 3656)**

Search for the third `@media (max-width: 768px)` near the bottom of the file. Delete it entirely.

- [ ] **Step 5: Verify desktop is intact**

Open `index.html` at 1200px width. Desktop layout should look exactly the same as before.

- [ ] **Step 6: Commit**

```bash
git add style.css
git commit -m "refactor: remove old 768px/480px breakpoints (replaced by 900px mobile block)"
```

---

## Task 3: Add the mobile CSS foundation block

**Files:**
- Modify: `style.css` (append at end)

- [ ] **Step 1: Append the mobile foundation to style.css**

Add the following at the very end of `style.css`:

```css
/* ============================================================
   MOBILE LAYOUT — ≤900px
   Completely separate design from desktop. Do not edit for
   desktop fixes — use the sections above this block.
   ============================================================ */
@media (max-width: 900px) {

  /* --- UTILITIES --- */
  .mobile-only  { display: block !important; }
  .desktop-only { display: none !important; }

  /* --- GLOBAL --- */
  body {
    overflow-x: hidden;
  }

  .container {
    padding-inline: 20px;
  }

  /* --- NAV --- */
  .nav-links,
  .nav-right .btn { display: none; }
  .nav-hamburger  { display: flex; }

  /* Nav is transparent over hero; scrolled state already handled */
  .site-header {
    background: transparent !important;
    border-bottom: none !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
  }

  /* --- HERO --- */
  /* Hide video on mobile */
  .hero-video { display: none !important; }

  /* Replace the gradient overlay with a solid navy background */
  .hero-bg-overlay {
    background: #0d1b2e !important;
  }

  .hero {
    min-height: 100svh;
    align-items: flex-end !important;
  }

  .hero-content--split {
    grid-template-columns: 1fr !important;
    padding: 100px 20px 36px !important;
    gap: 0 !important;
    align-items: flex-start !important;
    width: 100% !important;
    max-width: 100% !important;
  }

  .hero-right { display: none !important; }

  .hero-left h1 {
    font-size: clamp(2.4rem, 10vw, 3.5rem);
    line-height: 1.0;
    letter-spacing: -0.03em;
    max-width: none;
  }

  .hero-sub {
    font-size: 0.9rem;
    max-width: 100%;
    margin-bottom: 24px;
  }

  .hero-actions {
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 28px;
  }

  .hero-actions .btn {
    flex: 1 1 140px;
    text-align: center;
    justify-content: center;
  }

  /* 2×2 stat grid */
  .hero-stats {
    display: grid !important;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    flex-wrap: unset;
    border-top: 1px solid rgba(255,255,255,0.1) !important;
    padding-top: 20px;
  }

  .hero-stats > div {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    padding: 10px 12px;
    white-space: normal;
  }

  .hero-stat-value {
    font-size: 1.4rem;
  }

  .hero-stat-label {
    font-size: 0.65rem;
  }

  /* --- SECTION BASE --- */
  .section {
    padding: 40px 20px;
  }

  .section-heading {
    font-size: clamp(1.5rem, 6vw, 2rem);
  }

  /* --- PATHWAYS --- */
  .pathways-section {
    background: #ffffff;
    padding: 40px 20px;
  }

  .pathways-inner {
    padding: 0;
    max-width: 100%;
  }

  .pathways-header {
    grid-template-columns: 1fr;
    gap: 12px;
    margin-bottom: 24px;
  }

  .pathways-header .section-heading {
    font-size: clamp(1.4rem, 5vw, 1.8rem);
  }

  /* Hide desktop pathway flow columns; show mobile cards */
  .pathways-grid { display: none !important; }
  .pathway-divider { display: none !important; }

  /* Mobile pathway cards (injected via .mobile-only in HTML) */
  .m-pathway-card {
    border: 1px solid #e2e8f0;
    border-radius: 14px;
    overflow: hidden;
    margin-bottom: 12px;
  }
  .m-pathway-card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
  }
  .m-pathway-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    flex-shrink: 0;
  }
  .m-pathway-name { font-size: 0.95rem; font-weight: 700; color: #0d1b2e; }
  .m-pathway-tag  { font-size: 0.7rem; color: #64748b; margin-top: 2px; }
  .m-pathway-body { padding: 0 16px 16px; }
  .m-pathway-desc { font-size: 0.8rem; color: #475569; line-height: 1.55; margin-bottom: 12px; }
  .m-pathway-pills { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 10px; }
  .m-spec-pill {
    background: #f1f5f9;
    border-radius: 6px;
    padding: 4px 10px;
    font-size: 0.7rem;
    color: #334155;
    font-weight: 600;
  }
  .m-pathway-link { font-size: 0.8rem; font-weight: 700; color: #1a9c3e; text-decoration: none; }

  /* --- MODULAR SECTION --- */
  .modular-section {
    background: #f5f6f8 !important;
    padding: 40px 20px;
  }

  .modular-inner { padding: 0; }

  /* Hide the desktop container chain; show mobile version */
  .container-chain { display: none !important; }

  /* Mobile container chain (.mobile-only) */
  .m-container-row {
    display: flex;
    gap: 6px;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
    overflow-x: auto;
  }
  .m-container-box {
    background: #0d1b2e;
    border: 1px solid rgba(57,211,83,0.3);
    border-radius: 8px;
    padding: 10px 8px;
    text-align: center;
    flex: 1;
    min-width: 72px;
    max-width: 88px;
  }
  .m-container-num  { font-size: 0.55rem; color: rgba(255,255,255,0.4); margin-bottom: 4px; font-family: monospace; }
  .m-container-name { font-size: 0.65rem; font-weight: 700; color: #fff; line-height: 1.3; }
  .m-container-accent { color: #39d353; }
  .m-connector { color: #39d353; font-size: 1rem; flex-shrink: 0; }

  .m-modular-points { margin-top: 16px; }
  .m-modular-point {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    padding: 10px 0;
    border-bottom: 1px solid #e8ecf0;
  }
  .m-modular-point:last-child { border-bottom: none; }
  .m-modular-dot {
    width: 7px;
    height: 7px;
    background: #39d353;
    border-radius: 50%;
    margin-top: 6px;
    flex-shrink: 0;
  }
  .m-modular-text { font-size: 0.85rem; color: #334155; line-height: 1.5; }

  /* Hide desktop modular content grid */
  .modular-content { display: none !important; }
  .modular-footnote { display: none !important; }

  /* --- PRODUCTS --- */
  .products-section {
    background: #ffffff;
    padding: 40px 20px;
  }

  .products-inner { padding: 0; }

  .products-header {
    grid-template-columns: 1fr;
    margin-bottom: 24px;
  }

  /* Hide desktop product rows, show mobile cards */
  .product-rows { display: none !important; }

  .m-product-list { display: flex; flex-direction: column; gap: 10px; }
  .m-product-card {
    background: #fff;
    border: 1px solid #e8ecf0;
    border-radius: 14px;
    padding: 16px;
    display: flex;
    gap: 14px;
    align-items: flex-start;
    text-decoration: none;
  }
  .m-product-num  { font-size: 0.7rem; font-weight: 800; color: #39d353; width: 28px; flex-shrink: 0; margin-top: 2px; }
  .m-product-name { font-size: 0.9rem; font-weight: 700; color: #0d1b2e; margin-bottom: 3px; }
  .m-product-desc { font-size: 0.75rem; color: #64748b; line-height: 1.45; margin-bottom: 8px; }
  .m-product-badge {
    display: inline-block;
    background: rgba(57,211,83,0.1);
    color: #1a9c3e;
    font-size: 0.65rem;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: 20px;
  }

  /* --- INDUSTRIES --- */
  .industries-list-section {
    background: #f5f6f8;
    padding: 40px 20px;
  }

  /* Hide desktop ruled list, show mobile grid */
  .industries-list { display: none !important; }

  .m-industries-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-top: 16px;
  }
  .m-industry-tile {
    background: #fff;
    border-radius: 12px;
    padding: 14px 12px;
    border: 1px solid #e8ecf0;
  }
  .m-industry-icon { font-size: 1.4rem; margin-bottom: 6px; }
  .m-industry-name { font-size: 0.75rem; font-weight: 700; color: #0d1b2e; }
  .m-industry-sub  { font-size: 0.65rem; color: #94a3b8; margin-top: 2px; line-height: 1.35; }

  /* --- TRUST --- */
  .trust {
    background: #ffffff;
    padding: 40px 20px;
  }

  /* Hide the visual card on mobile */
  .trust-visual { display: none !important; }

  .trust-layout { grid-template-columns: 1fr; gap: 0; }

  /* Hide desktop trust points, show mobile stat rows */
  .trust-points { display: none !important; }

  .m-trust-stats { margin-top: 16px; }
  .m-trust-stat {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 0;
    border-bottom: 1px solid #f1f5f9;
  }
  .m-trust-stat:last-child { border-bottom: none; }
  .m-trust-num   { font-size: 1.75rem; font-weight: 800; color: #39d353; min-width: 58px; }
  .m-trust-label { font-size: 0.8rem; color: #334155; line-height: 1.4; }

  /* --- CTA BANNER --- */
  .cta-banner {
    padding: 40px 20px;
    text-align: center;
  }

  .cta-h2-watermark { display: none !important; }

  .cta-banner-content h2 {
    font-size: clamp(1.4rem, 5.5vw, 1.8rem);
    margin-bottom: 10px;
  }

  .cta-banner-actions {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }

  .cta-banner-actions .btn {
    width: 100%;
    text-align: center;
    justify-content: center;
  }

  /* --- FOOTER --- */
  .site-footer { padding: 32px 20px; }
  .footer-grid { grid-template-columns: 1fr 1fr; gap: 24px; }
  .footer-col-title { font-size: 0.75rem; }
  .footer-links li { margin-bottom: 6px; }
  .footer-links a { font-size: 0.8rem; }
  .footer-bottom { flex-direction: column; gap: 6px; text-align: center; }

  /* --- SECTION DIVIDERS --- */
  .section-divider { display: none; }

} /* end @media (max-width: 900px) */
```

- [ ] **Step 2: Verify at 390px — no horizontal scroll**

Open `index.html` at 390px. The page should now have no horizontal scroll. Sections will look unstyled/basic for now — HTML additions come next.

- [ ] **Step 3: Commit**

```bash
git add style.css
git commit -m "feat: add mobile CSS foundation block at 900px breakpoint"
```

---

## Task 4: Add mobile HTML to index.html — Pathways section

**Files:**
- Modify: `index.html`

The desktop `.pathways-grid` is hidden on mobile. We add a `.mobile-only` div with pathway cards right after it.

- [ ] **Step 1: Mark the desktop pathways grid as desktop-only**

In `index.html`, find `<div class="pathways-grid">` and add the class `desktop-only`:

```html
<div class="pathways-grid desktop-only">
```

- [ ] **Step 2: Add mobile pathway cards after the pathways-grid closing tag**

After `</div><!-- end pathways-grid -->` and before `</div><!-- end pathways-inner -->`, insert:

```html
<!-- MOBILE: Pathway cards -->
<div class="mobile-only" style="margin-top: 0;">
  <div class="m-pathway-card">
    <div class="m-pathway-card-header">
      <div class="m-pathway-icon" style="background:#fef9c3;">☀️</div>
      <div>
        <div class="m-pathway-name">Solar to Hydrogen</div>
        <div class="m-pathway-tag">Electrolysis</div>
      </div>
    </div>
    <div class="m-pathway-body">
      <p class="m-pathway-desc">Solar panels power an electrolyzer that splits water into hydrogen. Zero emissions, no waste stream required.</p>
      <div class="m-pathway-pills">
        <span class="m-spec-pill">90–225 kg/day</span>
        <span class="m-spec-pill">Grid-optional</span>
      </div>
      <a href="./solar.html" class="m-pathway-link">Solar pathway details →</a>
    </div>
  </div>
  <div class="m-pathway-card">
    <div class="m-pathway-card-header">
      <div class="m-pathway-icon" style="background:#dcfce7;">🌿</div>
      <div>
        <div class="m-pathway-name">Biomass to Hydrogen</div>
        <div class="m-pathway-tag">Thermolysis</div>
      </div>
    </div>
    <div class="m-pathway-body">
      <p class="m-pathway-desc">Your organic waste — crop residue, manure, food processing byproducts — converted to hydrogen via thermolysis. Biochar is a second revenue stream.</p>
      <div class="m-pathway-pills">
        <span class="m-spec-pill">90 kg/day</span>
        <span class="m-spec-pill">+ Biochar output</span>
      </div>
      <a href="./biomass.html" class="m-pathway-link">Biomass pathway details →</a>
    </div>
  </div>
</div>
```

- [ ] **Step 3: Verify at 390px**

At 390px the pathways section should show two stacked cards with icons, descriptions, pills, and links. At 901px+ only the desktop flow columns should be visible.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: add mobile pathway cards to index.html"
```

---

## Task 5: Add mobile HTML to index.html — Modular section

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Mark the desktop container chain as desktop-only**

Find `<div class="container-chain reveal">` and add `desktop-only`:

```html
<div class="container-chain reveal desktop-only">
```

- [ ] **Step 2: Add mobile container chain after the chain's closing div**

After `</div><!-- end container-chain -->` and before `<p class="modular-footnote reveal">`, insert:

```html
<!-- MOBILE: Simplified container chain -->
<div class="mobile-only">
  <div class="m-container-row">
    <div class="m-container-box">
      <div class="m-container-num">01</div>
      <div class="m-container-name"><span class="m-container-accent">Power</span> Pack</div>
    </div>
    <div class="m-connector">→</div>
    <div class="m-container-box">
      <div class="m-container-num">02</div>
      <div class="m-container-name"><span class="m-container-accent">Power</span> Bank</div>
    </div>
    <div class="m-connector">→</div>
    <div class="m-container-box">
      <div class="m-container-num">03</div>
      <div class="m-container-name"><span class="m-container-accent">Power</span> OnDemand</div>
    </div>
    <div class="m-connector" style="opacity:0.35;">→</div>
    <div class="m-container-box" style="border-style: dashed; opacity: 0.5;">
      <div class="m-container-name" style="color:rgba(57,211,83,0.6);">+ Scale</div>
    </div>
  </div>
  <div class="m-modular-points">
    <div class="m-modular-point"><div class="m-modular-dot"></div><div class="m-modular-text">Drop on a pad, connect to grid and water — you're running.</div></div>
    <div class="m-modular-point"><div class="m-modular-dot"></div><div class="m-modular-text">No civil engineering. No custom infrastructure.</div></div>
    <div class="m-modular-point"><div class="m-modular-dot"></div><div class="m-modular-text">Scale up by adding another container when ready.</div></div>
  </div>
</div>
```

- [ ] **Step 3: Verify at 390px**

The modular section should show the simplified container row + 3 bullet points on grey background. Desktop chain diagram hidden.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: add mobile modular container section to index.html"
```

---

## Task 6: Add mobile HTML to index.html — Products, Industries, Trust

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Mark desktop product rows as desktop-only**

Find `<div class="product-rows">` and add `desktop-only`:

```html
<div class="product-rows desktop-only">
```

- [ ] **Step 2: Add mobile product cards after product-rows closing tag**

After `</div><!-- end product-rows -->` and before `</div><!-- end products-inner -->`, insert:

```html
<!-- MOBILE: Product cards -->
<div class="mobile-only m-product-list">
  <a href="./solar.html" class="m-product-card">
    <div class="m-product-num">01</div>
    <div>
      <div class="m-product-name">Power Pack 200</div>
      <div class="m-product-desc">200 kW electrolyzer. Produces 90 kg of clean hydrogen per day.</div>
      <span class="m-product-badge">90 kg H₂/day</span>
    </div>
  </a>
  <a href="./solar.html" class="m-product-card">
    <div class="m-product-num">02</div>
    <div>
      <div class="m-product-name">Power Pack 500</div>
      <div class="m-product-desc">500 kW electrolyzer. Scales production to 225 kg per day.</div>
      <span class="m-product-badge">225 kg H₂/day</span>
    </div>
  </a>
  <a href="./solar.html" class="m-product-card">
    <div class="m-product-num">03</div>
    <div>
      <div class="m-product-name">Power Bank</div>
      <div class="m-product-desc">Hydrogen storage system. 300 kg capacity at 350 bar, outdoor certified.</div>
      <span class="m-product-badge">300 kg storage</span>
    </div>
  </a>
  <a href="./solar.html" class="m-product-card">
    <div class="m-product-num">04</div>
    <div>
      <div class="m-product-name">Power OnDemand</div>
      <div class="m-product-desc">Fuel cell output system. 60 kW or 300 kW clean electricity on tap.</div>
      <span class="m-product-badge">60–300 kW output</span>
    </div>
  </a>
</div>
```

- [ ] **Step 3: Mark desktop industries list as desktop-only**

Find `<div class="industries-list">` and add `desktop-only`:

```html
<div class="industries-list desktop-only">
```

- [ ] **Step 4: Add mobile industries grid after industries-list closing tag**

After `</div><!-- end industries-list -->` and before `</div><!-- end container -->`, insert:

```html
<!-- MOBILE: Industries grid -->
<div class="mobile-only m-industries-grid">
  <div class="m-industry-tile"><div class="m-industry-icon">🍇</div><div class="m-industry-name">Wineries &amp; Vineyards</div><div class="m-industry-sub">Power crush season from solar or pomace waste</div></div>
  <div class="m-industry-tile"><div class="m-industry-icon">🐄</div><div class="m-industry-name">Dairies</div><div class="m-industry-sub">24/7 refrigeration &amp; operations</div></div>
  <div class="m-industry-tile"><div class="m-industry-icon">🏭</div><div class="m-industry-name">Food Processing</div><div class="m-industry-sub">Turn crop waste into hydrogen + biochar</div></div>
  <div class="m-industry-tile"><div class="m-industry-icon">🏙️</div><div class="m-industry-name">Municipal</div><div class="m-industry-sub">Facilities, fleet fueling &amp; city operations</div></div>
  <div class="m-industry-tile"><div class="m-industry-icon">💧</div><div class="m-industry-name">Water Treatment</div><div class="m-industry-sub">Use on-site solar to make hydrogen on-site</div></div>
  <div class="m-industry-tile"><div class="m-industry-icon">🚛</div><div class="m-industry-name">Fleet &amp; Logistics</div><div class="m-industry-sub">Refuel on-site — no charging windows</div></div>
</div>
```

- [ ] **Step 5: Mark desktop trust-points as desktop-only**

Find `<div class="trust-points">` and add `desktop-only`:

```html
<div class="trust-points desktop-only">
```

- [ ] **Step 6: Add mobile trust stat rows after trust-points closing tag**

After `</div><!-- end trust-points -->` and before the outer `</div>`, insert:

```html
<!-- MOBILE: Trust stat rows -->
<div class="mobile-only m-trust-stats">
  <div class="m-trust-stat"><div class="m-trust-num">30+</div><div class="m-trust-label">Years of hands-on experience in hydrogen systems</div></div>
  <div class="m-trust-stat"><div class="m-trust-num">2</div><div class="m-trust-label">Complete pathways — solar electrolysis and biomass thermolysis</div></div>
  <div class="m-trust-stat"><div class="m-trust-num">100%</div><div class="m-trust-label">Modular ISO-containerized systems — no custom civil work required</div></div>
  <div class="m-trust-stat"><div class="m-trust-num">Zero</div><div class="m-trust-label">Emissions output from either production pathway</div></div>
</div>
```

- [ ] **Step 7: Verify all three sections at 390px**

- Products section: 4 stacked cards on white background
- Industries section: 2-column tile grid on grey background
- Trust section: 4 stat rows (big green number + text) on white background

- [ ] **Step 8: Commit**

```bash
git add index.html
git commit -m "feat: add mobile product cards, industries grid, trust stats to index.html"
```

---

## Task 7: Mobile hero — hide video, fix layout on index.html

**Files:**
- Modify: `index.html`

The video is hidden via CSS already. But the hero-right (showcase cards) needs `desktop-only` and the section needs `data-nav-dark` to keep the nav transparent correctly.

- [ ] **Step 1: Mark hero-right as desktop-only**

Find `<div class="hero-right" aria-hidden="true">` and add `desktop-only`:

```html
<div class="hero-right desktop-only" aria-hidden="true">
```

- [ ] **Step 2: Verify hero at 390px**

The hero should show: eyebrow text → H1 → sub copy → 2 CTA buttons → 2×2 stat grid. No horizontal overflow. The whole thing sits on a dark navy background (the solid overlay covers where video would be).

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: hide hero-right on mobile, clean up hero layout"
```

---

## Task 8: Inner pages — solar.html and biomass.html

**Files:**
- Modify: `solar.html`, `biomass.html`

Inner pages use a `page-hero` section. On mobile: dark background, title, sub, CTA. Content sections below need overflow fixes and spec table simplification.

- [ ] **Step 1: Add mobile CSS for inner page heroes**

Append to the `@media (max-width: 900px)` block in `style.css`:

```css
  /* --- INNER PAGE HEROES --- */
  .page-hero {
    background: #0d1b2e !important;
    padding: 100px 20px 40px !important;
    min-height: auto !important;
  }

  .page-hero-content {
    max-width: 100% !important;
    grid-template-columns: 1fr !important;
  }

  .page-hero h1 {
    font-size: clamp(1.8rem, 7vw, 2.5rem);
  }

  /* Hide complex spec grids on mobile — shown as stacked cards via .mobile-only */
  .spec-grid,
  .spec-table,
  .modular-content { display: none !important; }

  /* Section padding for inner pages */
  .section--feature,
  .section--specs,
  .section--process { padding: 36px 20px; }
```

- [ ] **Step 2: Add desktop-only to complex sections in solar.html**

Open `solar.html`. For any section with a multi-column spec grid or diagram, add `desktop-only` to the complex inner element (NOT the whole section — keep the section heading). Specifically find elements with class `spec-grid` or `spec-table` and add `desktop-only`.

- [ ] **Step 3: Add equivalent for biomass.html**

Repeat step 2 for `biomass.html`.

- [ ] **Step 4: Verify solar.html and biomass.html at 390px**

Page heroes should be dark navy. Content sections should stack cleanly with no horizontal overflow.

- [ ] **Step 5: Commit**

```bash
git add style.css solar.html biomass.html
git commit -m "feat: mobile layout for solar and biomass inner pages"
```

---

## Task 9: Inner pages — calculator.html and contact.html

**Files:**
- Modify: `style.css`, `calculator.html`, `contact.html`

- [ ] **Step 1: Add calculator and contact mobile CSS**

Append to the `@media (max-width: 900px)` block in `style.css`:

```css
  /* --- CALCULATOR --- */
  .calc-layout {
    grid-template-columns: 1fr !important;
    gap: 24px;
  }

  .calc-equivalents {
    grid-template-columns: 1fr 1fr;
  }

  .calc-projection-results {
    grid-template-columns: 1fr 1fr;
  }

  /* --- CONTACT --- */
  .contact-layout {
    grid-template-columns: 1fr !important;
    gap: 32px;
  }

  .form-row {
    grid-template-columns: 1fr !important;
  }
```

- [ ] **Step 2: Verify calculator.html at 390px**

Form inputs should stack vertically. Results grid should be 2 columns. No horizontal overflow.

- [ ] **Step 3: Verify contact.html at 390px**

Form should be single column. No horizontal overflow.

- [ ] **Step 4: Commit**

```bash
git add style.css calculator.html contact.html
git commit -m "feat: mobile layout for calculator and contact pages"
```

---

## Task 10: Final verification across all pages and breakpoints

- [ ] **Step 1: Test all 5 pages at 390px (iPhone 14)**

For each page open in browser at 390px. Check:
- No horizontal scrollbar
- No content clipped or overflowing
- Dark navy hero visible
- All sections readable and well-spaced
- CTAs visible and tappable (min 44px tap target)

Pages: `index.html`, `solar.html`, `biomass.html`, `calculator.html`, `contact.html`

- [ ] **Step 2: Test all 5 pages at 768px (iPad portrait)**

Mobile layout should still be active (≤900px). Sections should have comfortable padding and not feel too narrow.

- [ ] **Step 3: Test all 5 pages at 901px (desktop breakpoint)**

Desktop layout should be fully active. No mobile-only elements visible. No layout regressions.

- [ ] **Step 4: Test mobile menu**

At 390px: tap hamburger → dark navy overlay appears with all links. Tap close → menu dismisses. Logo displays correctly inline.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: complete mobile redesign — all 5 pages verified at 390px, 768px, 901px"
```
