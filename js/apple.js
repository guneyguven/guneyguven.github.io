(function () {
  'use strict';

  const root = document.documentElement;
  const themeButton = document.querySelector('[data-theme-toggle]');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav a');

  const getStoredTheme = () => {
    try { return localStorage.getItem('siteTheme') || localStorage.getItem('theme'); }
    catch (_) { return null; }
  };

  const saveTheme = (theme) => {
    try {
      localStorage.setItem('siteTheme', theme);
      localStorage.setItem('theme', theme);
    } catch (_) {}
  };

  const setTheme = (theme) => {
    const value = theme === 'dark' ? 'dark' : 'light';
    root.dataset.theme = value;
    if (themeButton) {
      const dark = value === 'dark';
      themeButton.textContent = dark ? '☼' : '◐';
      themeButton.setAttribute('aria-pressed', String(dark));
      themeButton.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    }
  };

  const stored = getStoredTheme();
  setTheme(stored || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

  if (themeButton) {
    themeButton.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      setTheme(next);
      saveTheme(next);
    });
  }

  const closeMenu = () => {
    if (mobileMenu) mobileMenu.removeAttribute('open');
  };

  mobileLinks.forEach((link) => link.addEventListener('click', closeMenu));

  document.addEventListener('click', (event) => {
    if (mobileMenu && mobileMenu.hasAttribute('open') && !mobileMenu.contains(event.target)) {
      closeMenu();
    }
  }, true);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  // Page-load reveal with staggered timing, without changing existing typography.
  const revealTargets = [
    ...document.querySelectorAll('.reveal'),
    ...document.querySelectorAll('.section > .eyebrow:not(.reveal)'),
    ...document.querySelectorAll('.section > .display:not(.reveal)'),
    ...document.querySelectorAll('.section > .intro:not(.reveal)')
  ];

  revealTargets.forEach((element, index) => {
    if (!element.classList.contains('reveal')) element.classList.add('reveal');
    element.style.setProperty('--delay', Math.min(index * 70, 420) + 'ms');
  });

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('on');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    revealTargets.forEach((element) => observer.observe(element));
  } else {
    revealTargets.forEach((element) => element.classList.add('on'));
  }

  // Subtle scroll depth on the main visual only.
  const parallaxImages = [
    ...document.querySelectorAll('.hero-media img'),
    ...document.querySelectorAll('.media-wide img')
  ];

  let ticking = false;
  const updateParallax = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduced) {
      parallaxImages.forEach((image) => {
        const rect = image.parentElement.getBoundingClientRect();
        const center = window.innerHeight / 2;
        const distance = (rect.top + rect.height / 2 - center) / window.innerHeight;
        const y = Math.max(-18, Math.min(18, distance * -18));
        image.style.transform = 'translate3d(0,' + y.toFixed(2) + 'px,0) scale(1.045)';
      });
    }
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
  updateParallax();

  // Smooth multi-page transition. Links remain real HTML pages.
  const shouldTransition = (link) => {
    if (!link || !link.href) return false;
    if (link.target === '_blank' || link.hasAttribute('download')) return false;
    if (link.origin !== window.location.origin) return false;
    if (link.href.includes('#')) return false;
    return true;
  };

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!shouldTransition(link)) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    event.preventDefault();
    closeMenu();
    document.body.classList.remove('page-enter');
    document.body.classList.add('page-leave');

    window.setTimeout(() => {
      window.location.href = link.href;
    }, 560);
  });

  document.body.classList.add('page-enter');
}());