(function(){
  'use strict';

  function isInternalLink(a){
    if(!a || !a.href) return false;
    try{
      var url = new URL(a.href, location.href);
      return url.origin === location.origin;
    }catch(e){return false}
  }

  function shouldHandleClick(e, a){
    if (e.defaultPrevented) return false;
    if (a.target && a.target !== '' && a.target !== '_self') return false;
    if (a.hasAttribute('download')) return false;
    if (a.getAttribute('href').indexOf('#') === 0) return false;
    if (a.href.indexOf('mailto:') === 0) return false;
    if (!isInternalLink(a)) return false;
    return true;
  }

  function execScripts(parent, doc){
    // Execute only scripts inside the pjax container of the fetched doc
    var scripts = [];
    try{
      var container = doc.querySelector && doc.querySelector('#pjax-container');
      scripts = container ? container.querySelectorAll('script') : doc.querySelectorAll('script');
    }catch(e){ scripts = doc.querySelectorAll('script') }
    scripts.forEach(function(s){
      try{
        var ns = document.createElement('script');
        if (s.src){
          ns.src = s.src;
          ns.async = false;
        } else {
          ns.textContent = s.textContent || s.innerHTML;
        }
        parent.appendChild(ns);
      }catch(e){console.error('pjax execScript', e)}
    });
  }

  function swapBody(newDoc, url, replace){
    // Prefer swapping only the #pjax-container to avoid repaint/flash from replacing the whole body
    var newContainer = newDoc.querySelector && newDoc.querySelector('#pjax-container');
    var curContainer = document.querySelector('#pjax-container');
    if (newContainer && curContainer){
      curContainer.innerHTML = newContainer.innerHTML;
      // Update title
      if (newDoc.title) document.title = newDoc.title;
      // Execute scripts inside the swapped container
      execScripts(curContainer, newDoc);
      // Reinit page behaviors
      if (window.__reinitPage) try{ window.__reinitPage(); }catch(e){console.error(e)}
    } else {
      // Fallback: replace whole body
      document.body.innerHTML = newDoc.body.innerHTML;
      if (newDoc.title) document.title = newDoc.title;
      execScripts(document.body, newDoc);
      if (window.__reinitPage) try{ window.__reinitPage(); }catch(e){console.error(e)}
    }

    if (replace) history.replaceState({pjax:true}, '', url);
    else history.pushState({pjax:true}, '', url);

    window.scrollTo(0,0);
    // remove loading class when swap finished
    try{ document.body.classList.remove('pjax-loading'); }catch(e){}
  }

  function fetchAndSwap(url, replace){
    // show overlay + add loading class to limit repaint
    var overlay = document.getElementById('pjax-overlay');
    try{ document.body.classList.add('pjax-loading'); }catch(e){}
    if (overlay) overlay.classList.add('visible');

    return fetch(url, {credentials: 'same-origin', headers: {'X-PJAX': 'true'}})
      .then(function(resp){ if (!resp.ok) throw new Error('Network response not ok'); return resp.text(); })
      .then(function(text){
        var parser = new DOMParser();
        var doc = parser.parseFromString(text, 'text/html');
        // if target container exists, preload images inside it before swapping
        try{
          var newContainer = doc.querySelector && doc.querySelector('#pjax-container');
          if (newContainer){
            var imgs = Array.prototype.slice.call(newContainer.querySelectorAll('img'))
              .map(function(i){ return i.getAttribute('src') || i.getAttribute('data-src'); })
              .filter(Boolean);
            // preload images with timeout fallback
            var loaders = imgs.map(function(src){
              return new Promise(function(res){
                var img = new Image();
                var done = function(){ res(true); }
                img.onload = done; img.onerror = done; img.src = src;
                // timeout to avoid hanging on slow resources
                setTimeout(done, 700);
              });
            });
            return Promise.all(loaders).then(function(){ swapBody(doc, url, replace); });
          }
        }catch(e){ console.warn('preload failed', e) }
        // fallback: swap immediately
        swapBody(doc, url, replace);
      }).then(function(){
        // ensure overlay hides after swap
        try{ if (overlay){ setTimeout(function(){ overlay.classList.remove('visible'); }, 60); } }catch(e){}
      }).catch(function(err){
        console.error('PJAX load failed, falling back to full load', err);
        try{ document.body.classList.remove('pjax-loading'); }catch(e){}
        if (overlay) overlay.classList.remove('visible');
        window.location.href = url;
      });
  }

  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('a');
    if (!a) return;
    if (!shouldHandleClick(e, a)) return;
    var href = a.href;
    // ignore same-document anchors
    var cur = location.href.split('#')[0];
    if (href.split('#')[0] === cur) return;
    e.preventDefault();
    fetchAndSwap(href, false);
  });

  window.addEventListener('popstate', function(e){
    // on back/forward, load the location
    fetchAndSwap(location.href, true);
  });

})();
