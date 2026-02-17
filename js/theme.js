/* Persistent theme toggle: saves selection in localStorage and cookie
   Defines global `toggle()` used by the inline checkbox `onchange` handlers.
*/
/* Modern theme manager
   - Stores chosen theme in localStorage ('theme') and cookie ('siteTheme')
   - Applies dataset attribute on <html> immediately and updates the theme stylesheet
   - Exposes `toggleTheme()` and `setTheme(theme)` globals
*/
(function(){
  'use strict';

  function setCookie(name, value, days){
    try{ var cookie = name+'='+encodeURIComponent(value)+'; path=/'; if(days) cookie+='; max-age='+ (days*24*60*60); cookie+='; SameSite=Lax'; document.cookie = cookie; }catch(e){}
  }

  function getCookie(name){ try{ var m=document.cookie.match('(^|;)\\s*'+name+'\\s*=\\s*([^;]+)'); return m?decodeURIComponent(m.pop()):null }catch(e){return null} }

  function applyThemeToDOM(theme){
    try{ document.documentElement.setAttribute('data-bs-theme', theme); }catch(e){}
    var checkbox = document.getElementById('flexSwitchCheckDefault');
    if(checkbox) checkbox.checked = (theme === 'dark');
    var link = document.getElementById('style1');
    if(link) link.href = 'css/colors/' + (theme === 'dark' ? 'dark-mode.css' : 'light-mode.css');
  }

  window.setTheme = function(theme){
    if(theme !== 'dark' && theme !== 'light') return;
    try{ localStorage.setItem('theme', theme); }catch(e){}
    setCookie('siteTheme', theme, 365);
    applyThemeToDOM(theme);
  };

  window.toggleTheme = function(){
    var cur = document.documentElement.getAttribute('data-bs-theme') || 'light';
    var next = cur === 'dark' ? 'light' : 'dark';
    window.setTheme(next);
  };

  // keep legacy `toggle` name for existing inline handlers
  window.toggle = window.toggleTheme;

  // initialization: prefer localStorage -> cookie -> prefers-color-scheme -> light
  (function init(){
    var t = null;
    try{ t = localStorage.getItem('theme') || localStorage.getItem('siteTheme'); }catch(e){}
    if(!t) t = getCookie('siteTheme');
    if(!t){ try{ t = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light' }catch(e){ t='light' } }
    applyThemeToDOM(t);
  })();

})();
