/* ==========================================================================
   KCW Pay — Product Website Scripts
   ========================================================================== */

(function () {
  'use strict';

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
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => {
    revealObserver.observe(el);
  });

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

    mobile.querySelectorAll('.header__mobile-link').forEach((link) => {
      link.addEventListener('click', () => {
        mobile.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        const spans = toggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      });
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
        const h = document.querySelector('.header').offsetHeight;
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - h - 20, behavior: 'smooth' });
      }
    });
  });

  // ── Header Background on Scroll ──────────────────────────────────────────
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.style.background = window.scrollY > 50 ? 'rgba(5,8,16,0.95)' : 'rgba(5,8,16,0.8)';
  }, { passive: true });

  // ── FAQ Accordion ────────────────────────────────────────────────────────
  document.querySelectorAll('.faq-item__trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.faq-item');
      const wasActive = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.faq-item.active').forEach((open) => {
        open.classList.remove('active');
        open.querySelector('.faq-item__trigger').setAttribute('aria-expanded', 'false');
      });

      // Open clicked if it wasn't already open
      if (!wasActive) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

})();
