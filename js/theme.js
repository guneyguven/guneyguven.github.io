/* Site-wide light/dark theme manager. */
(function () {
  'use strict';

  function getCookie(name) {
    try {
      var m = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
      return m ? decodeURIComponent(m.pop()) : null;
    } catch (e) { return null; }
  }

  function saveCookie(name, value) {
    try {
      document.cookie = name + '=' + encodeURIComponent(value) + '; path=/; max-age=31536000; SameSite=Lax';
    } catch (e) {}
  }

  function getInitialTheme() {
    var t = null;
    try { t = localStorage.getItem('theme') || localStorage.getItem('siteTheme'); } catch (e) {}
    if (!t) t = getCookie('siteTheme');
    if (t !== 'dark' && t !== 'light') {
      try { t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; }
      catch (e) { t = 'light'; }
    }
    return t === 'dark' ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    var html = document.documentElement;
    var body = document.body;
    if (!html || !body) return;

    html.setAttribute('data-bs-theme', theme);
    html.setAttribute('data-theme', theme);
    body.classList.toggle('dark-mode', theme === 'dark');
    body.classList.toggle('light-mode', theme === 'light');

    var checkbox = document.getElementById('flexSwitchCheckDefault');
    if (checkbox) checkbox.checked = theme === 'dark';

    var link = document.getElementById('style1');
    if (!link) {
      link = document.createElement('link');
      link.id = 'style1';
      link.rel = 'stylesheet';
      link.type = 'text/css';
      document.head.appendChild(link);
    }
    link.href = 'css/colors/' + (theme === 'dark' ? 'dark-mode.css' : 'light-mode.css');

    try { localStorage.setItem('theme', theme); } catch (e) {}
    saveCookie('siteTheme', theme);
  }

  window.setTheme = function (theme) {
    if (theme !== 'dark' && theme !== 'light') return;
    applyTheme(theme);
  };

  window.toggleTheme = function () {
    var current = document.documentElement.getAttribute('data-bs-theme') || 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  };

  /* Backward compatibility with older pages using onchange="toggle()". */
  window.toggle = window.toggleTheme;

  /* Apply immediately and again after DOM is ready so every page gets the same state. */
  var initial = getInitialTheme();
  try {
    document.documentElement.setAttribute('data-bs-theme', initial);
    document.documentElement.setAttribute('data-theme', initial);
  } catch (e) {}

  if (document.body) applyTheme(initial);
  else document.addEventListener('DOMContentLoaded', function () { applyTheme(initial); }, { once: true });
})();
