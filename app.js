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
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  });
  mobileClose.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
  // Close on outside click
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

// ============================================================
// NAV DROPDOWN
// ============================================================
document.querySelectorAll('.nav-dropdown').forEach(dd => {
  dd.addEventListener('mouseenter', () => dd.classList.add('open'));
  dd.addEventListener('mouseleave', () => dd.classList.remove('open'));
  dd.querySelector('.nav-dropdown-toggle')?.addEventListener('click', () => {
    dd.classList.toggle('open');
  });
});

// ============================================================
// SCROLL REVEAL
// ============================================================
function activateReveals() {
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
    el.classList.add('visible');
  });
}
// Fire immediately on DOMContentLoaded, then again on scroll for any missed
activateReveals();
document.addEventListener('scroll', activateReveals, { passive: true, once: true });
