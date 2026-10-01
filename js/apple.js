(function () {
  'use strict';

  const root = document.documentElement;
  const themeButton = document.querySelector('[data-theme-toggle]');
  const menuButton = document.querySelector('[data-menu]');
  const mobileNav = document.querySelector('[data-mobile-nav]');

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
      themeButton.setAttribute('aria-pressed', String(dark));
      themeButton.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    }
  };

  setTheme(getStoredTheme() || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

  if (themeButton) {
    themeButton.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      setTheme(next);
      saveTheme(next);
    });
  }

  const closeMenu = () => {
    if (!menuButton || !mobileNav) return;
    mobileNav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  };

  if (menuButton && mobileNav) {
    menuButton.addEventListener('click', (event) => {
      event.stopPropagation();
      const open = mobileNav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });

    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (event) => {
      if (mobileNav.classList.contains('open') &&
          !mobileNav.contains(event.target) &&
          !menuButton.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  // Close the native mobile menu when tapping outside it.
  document.addEventListener('click', (event) => {
    const mobileMenu = document.querySelector('.mobile-menu[open]');
    if (mobileMenu && !mobileMenu.contains(event.target)) {
      mobileMenu.removeAttribute('open');
    }
  });

    const reveal = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('on');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveal.forEach((element) => observer.observe(element));
  } else {
    reveal.forEach((element) => element.classList.add('on'));
  }
}());