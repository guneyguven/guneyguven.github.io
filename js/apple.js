(function () {
  'use strict';

  const root = document.documentElement;
  const themeButton = document.querySelector('[data-theme-toggle]');
  const menuButton = document.querySelector('[data-menu]');
  const desktopNav = document.querySelector('header .nav-links');
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

  setTheme(getStoredTheme() || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

  themeButton?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    saveTheme(next);
  });

  const closeMenu = () => {
    if (!menuButton || !mobileNav) return;
    mobileNav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  };

  if (desktopNav && mobileNav && menuButton) {
    mobileNav.innerHTML = desktopNav.innerHTML;
    mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

    menuButton.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });

    document.addEventListener('click', (event) => {
      if (mobileNav.classList.contains('open') && !mobileNav.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }

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