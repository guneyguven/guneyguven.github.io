/* Rewritten Vanilla Simple Text Rotator - robust and plugin-like
   - API: SimpleTextRotator.init(selector, { separator, speed, duration, animation })
   - Animations: 'fade' (default), 'slide', 'flipUp'
   - Reads from `data-rotate` attribute if present, otherwise uses element textContent
*/
(function(){
  const DEFAULTS = { separator: ',', speed: 2000, duration: 400, animation: 'fade' };

  function makeStyles(duration){
    if (document.getElementById('str-styles')) return;
    const css = `
      .str-item{display:inline-block;opacity:0;transform:translateY(6px);transition:opacity ${duration}ms ease,transform ${duration}ms ease}
      .str-item.active{opacity:1;transform:translateY(0)}
      .str-slide{transform:translateY(8px)}
      .str-flip{display:inline-block;backface-visibility:hidden;transform-origin:center;transform:rotateX(90deg);transition:transform ${duration}ms ease,opacity ${duration}ms ease}
      .str-flip.active{transform:rotateX(0deg);opacity:1}
    `;
    const s = document.createElement('style'); s.id = 'str-styles'; s.appendChild(document.createTextNode(css)); document.head.appendChild(s);
  }

  function readSource(el){
    const data = el.getAttribute('data-rotate');
    if (data && data.trim()) return data.trim();
    // fallback to textContent (trimmed)
    return (el.textContent || '').trim();
  }

  function buildItems(el, items, animation){
    el.innerHTML = '';
    items.forEach((it, i) => {
      const span = document.createElement('span');
      span.className = 'str-item';
      if (animation === 'flipUp') span.classList.add('str-flip');
      span.innerHTML = it; // allow simple HTML inside items
      if (i === 0) span.classList.add('active');
      el.appendChild(span);
    });
  }

  function startRotation(el, items, opts){
    makeStyles(opts.duration);
    buildItems(el, items, opts.animation);
    let idx = 0;
    const tick = () => {
      const nodes = el.querySelectorAll('.str-item');
      if (!nodes.length) return;
      const cur = nodes[idx];
      const nextIdx = (idx + 1) % nodes.length;
      const next = nodes[nextIdx];
      // swap classes
      cur.classList.remove('active');
      next.classList.add('active');
      idx = nextIdx;
    };
    // clear existing handle if any
    if (el._strHandle) { clearInterval(el._strHandle); el._strHandle = null; }
    el._strHandle = setInterval(tick, opts.speed);
    return el._strHandle;
  }

  function init(selector, options){
    const opts = Object.assign({}, DEFAULTS, options || {});
    const els = document.querySelectorAll(selector);
    els.forEach(el => {
      // clear any previous interval
      if (el._strHandle){ clearInterval(el._strHandle); el._strHandle = null; }
      const src = readSource(el);
      if (!src) return;
      const items = src.split(opts.separator).map(s => s.trim()).filter(Boolean);
      if (!items.length) return;
      startRotation(el, items, opts);
    });
  }

  window.SimpleTextRotator = window.SimpleTextRotator || {};
  window.SimpleTextRotator.init = init;
})();
