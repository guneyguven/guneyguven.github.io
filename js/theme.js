/* Site-wide light/dark theme manager. */
(function () {
  'use strict';

  function getCookie(name) {
    try {
      var m = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
      return m ? decodeURIComponent(m.pop()) : null;
    } catch (e) { return null; }
  }

  function saveTheme(theme) {
    try { localStorage.setItem('theme', theme); } catch (e) {}
    try { localStorage.setItem('siteTheme', theme); } catch (e) {}
    try { document.cookie = 'siteTheme=' + encodeURIComponent(theme) + '; path=/; max-age=31536000; SameSite=Lax'; } catch (e) {}
  }

  function getInitialTheme() {
    var t = null;
    try { t = localStorage.getItem('theme') || localStorage.getItem('siteTheme'); } catch (e) {}
    if (!t) t = getCookie('siteTheme');
    if (t !== 'dark' && t !== 'light') {
      try { t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; } catch (e) { t = 'light'; }
    }
    return t === 'dark' ? 'dark' : 'light';
  }

  function applyTheme(theme, persist) {
    var html = document.documentElement;
    var body = document.body;
    if (!html) return;

    html.setAttribute('data-bs-theme', theme);
    html.setAttribute('data-theme', theme);
    html.style.colorScheme = theme;

    if (body) {
      body.classList.toggle('dark-mode', theme === 'dark');
      body.classList.toggle('light-mode', theme === 'light');
    }

    var checkbox = document.getElementById('flexSwitchCheckDefault');
    if (checkbox) checkbox.checked = theme === 'dark';
    if (persist) saveTheme(theme);
  }

  window.setTheme = function (theme) {
    if (theme !== 'dark' && theme !== 'light') return;
    applyTheme(theme, true);
  };

  window.toggleTheme = function () {
    var current = document.documentElement.getAttribute('data-bs-theme') || getInitialTheme();
    applyTheme(current === 'dark' ? 'light' : 'dark', true);
  };

  /* Backward compatibility with older pages using onchange="toggle()". */
  window.toggle = window.toggleTheme;

  var initial = getInitialTheme();
  applyTheme(initial, false);
  document.addEventListener('DOMContentLoaded', function () {
    applyTheme(initial, false);
  }, { once: true });
})();
