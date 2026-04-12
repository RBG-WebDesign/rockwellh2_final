// app.js — Rockwell H2 Systems — Shared JS

// ============================================================
// THEME TOGGLE
// ============================================================
(function() {
  const t = document.querySelector('[data-theme-toggle]');
  const r = document.documentElement;
  let d = r.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');
  r.setAttribute('data-theme', d);
  function updateIcon() {
    if (!t) return;
    t.innerHTML = d === 'dark'
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
  updateIcon();
  if (t) {
    t.addEventListener('click', () => {
      d = d === 'dark' ? 'light' : 'dark';
      r.setAttribute('data-theme', d);
      t.setAttribute('aria-label', 'Switch to ' + (d === 'dark' ? 'light' : 'dark') + ' mode');
      updateIcon();
    });
  }
})();

// ============================================================
// STICKY HEADER + DARK-SECTION NAV
// ============================================================
const header = document.getElementById('site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('site-header--scrolled', window.scrollY > 20);
  }, { passive: true });

  // Watch any section marked data-nav-dark="true".
  // While the header overlaps it, add --over-dark; remove it once past.
  const darkSections = document.querySelectorAll('[data-nav-dark]');
  if (darkSections.length && 'IntersectionObserver' in window) {
    const navHeight = header.offsetHeight;
    let darkCount = 0;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        darkCount += e.isIntersecting ? 1 : -1;
      });
      header.classList.toggle('site-header--over-dark', darkCount > 0);
    }, {
      rootMargin: `-${navHeight}px 0px 0px 0px`,
      threshold: 0
    });

    darkSections.forEach(s => obs.observe(s));
  }

  // Watch sections marked data-nav-light — flip nav text dark when over them
  const lightSections = document.querySelectorAll('[data-nav-light]');
  if (lightSections.length && 'IntersectionObserver' in window) {
    const navHeight = header.offsetHeight;
    let lightCount = 0;

    const lightObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        lightCount += e.isIntersecting ? 1 : -1;
      });
      header.classList.toggle('site-header--over-light', lightCount > 0);
    }, {
      rootMargin: `-${navHeight}px 0px 0px 0px`,
      threshold: 0
    });

    lightSections.forEach(s => lightObs.observe(s));
  }
}

// ============================================================
// MOBILE MENU
// ============================================================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileClose = document.getElementById('mobile-close');
if (hamburger && mobileMenu && mobileClose) {
  const FOCUSABLE = 'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

  function openMobileMenu() {
    mobileMenu.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    mobileClose.focus();
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    hamburger.focus();
  }

  hamburger.addEventListener('click', openMobileMenu);
  mobileClose.addEventListener('click', closeMobileMenu);

  // Focus trap + Escape
  document.addEventListener('keydown', (e) => {
    if (!mobileMenu.classList.contains('open')) return;
    if (e.key === 'Escape') { closeMobileMenu(); return; }
    if (e.key !== 'Tab') return;
    const focusable = Array.from(mobileMenu.querySelectorAll(FOCUSABLE));
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  });
}

// ============================================================
// NAV DROPDOWN — mouse + full keyboard support
// ============================================================
document.querySelectorAll('.nav-dropdown').forEach(dd => {
  const toggle = dd.querySelector('.nav-dropdown-toggle');
  const items  = Array.from(dd.querySelectorAll('.nav-dropdown-item'));

  function openDD()  { dd.classList.add('open');    toggle && toggle.setAttribute('aria-expanded', 'true');  }
  function closeDD() { dd.classList.remove('open'); toggle && toggle.setAttribute('aria-expanded', 'false'); }

  dd.addEventListener('mouseenter', openDD);
  dd.addEventListener('mouseleave', closeDD);

  if (toggle) {
    toggle.addEventListener('click', () => dd.classList.contains('open') ? closeDD() : openDD());

    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        dd.classList.contains('open') ? closeDD() : openDD();
        if (dd.classList.contains('open') && items.length) items[0].focus();
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        openDD();
        if (items.length) items[0].focus();
      }
      if (e.key === 'Escape') { closeDD(); toggle.focus(); }
    });
  }

  items.forEach((item, i) => {
    item.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); items[i + 1]?.focus(); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); i > 0 ? items[i - 1].focus() : toggle?.focus(); }
      if (e.key === 'Escape')    { closeDD(); toggle?.focus(); }
      if (e.key === 'Tab' && !e.shiftKey && i === items.length - 1) closeDD();
    });
  });
});

// ============================================================
// SCROLL REVEAL
// ============================================================
const revealEls = document.querySelectorAll('.reveal, .reveal-slide-up, .reveal-scale, .reveal-stagger-children');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('visible'));
}

// ============================================================
// HERO PARALLAX
// ============================================================
(function() {
  const heroVideo = document.querySelector('.hero-video');
  const heroLeft  = document.querySelector('.hero-left');
  if (!heroVideo || !heroLeft) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  heroVideo.style.willChange = 'transform';
  heroLeft.style.willChange  = 'transform';

  const hero = document.querySelector('.hero');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const heroH   = hero ? hero.offsetHeight : window.innerHeight;
        if (scrollY < heroH) {
          heroVideo.style.transform = `translateY(${scrollY * 0.4}px)`;
          heroLeft.style.transform  = `translateY(${scrollY * 0.12}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();
