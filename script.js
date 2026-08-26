/* ==========================================================================
   KCW Pay — Mockup Presentation Scripts
   ========================================================================== */

(function () {
  'use strict';

  // ── Theme Toggle ──────────────────────────────────────────────────────────
  const THEME_KEY = 'kcw-theme';
  const root = document.documentElement;
  const body = document.body;

  function applyTheme(theme) {
    body.classList.add('theme-transitioning');
    root.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    updateScrollHeader();
    setTimeout(() => body.classList.remove('theme-transitioning'), 350);
  }

  function toggleTheme() {
    const current = root.getAttribute('data-theme') || 'dark';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  }

  const saved = localStorage.getItem(THEME_KEY);
  if (saved) root.setAttribute('data-theme', saved);

  document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);

  // ── Scroll Reveal ────────────────────────────────────────────────────────
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => {
    revealObserver.observe(el);
  });

  // ── Header Scroll ────────────────────────────────────────────────────────
  const header = document.getElementById('header');

  function updateScrollHeader() {
    const isLight = root.getAttribute('data-theme') === 'light';
    const scrolled = window.scrollY > 50;
    if (header) {
      if (isLight) {
        header.style.background = scrolled ? 'rgba(245,246,250,0.95)' : 'rgba(245,246,250,0.85)';
      } else {
        header.style.background = scrolled ? 'rgba(10,11,15,0.95)' : 'rgba(10,11,15,0.85)';
      }
    }
  }

  window.addEventListener('scroll', updateScrollHeader, { passive: true });
  updateScrollHeader();

  // ── Mobile Navigation ────────────────────────────────────────────────────
  const toggle = document.getElementById('headerToggle');
  const mobile = document.getElementById('headerMobile');

  if (toggle && mobile) {
    toggle.addEventListener('click', () => {
      const open = mobile.classList.toggle('active');
      toggle.setAttribute('aria-expanded', open);
      const spans = toggle.querySelectorAll('span');
      if (open) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
  }

  // ── Smooth Scroll ────────────────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const h = header ? header.offsetHeight : 0;
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - h - 20, behavior: 'smooth' });
      }
    });
  });

})();
