/*
 * simple-text-rotator.js
 * Vanilla JS replacement for the jQuery plugin
 * Exposes `textrotator(selector, options)` on window.
 */
(function(){
  const defaults = {
    animation: 'flipUp',
    separator: ',',
    speed: 2000
  };

  function merge(defaults, options){
    const out = {};
    for (const k in defaults) out[k] = defaults[k];
    for (const k in (options||{})) out[k] = options[k];
    return out;
  }

  function fadeText(el, nextText, duration){
    el.style.transition = `opacity ${Math.min(duration,500)}ms`;
    el.style.opacity = '0';
    setTimeout(()=>{
      el.textContent = nextText;
      el.style.opacity = '1';
    }, Math.min(duration,500));
  }

  function simpleRotate(el, array, settings){
    let idx = 0;
    el.textContent = array[0];
    setInterval(()=>{
      idx = (idx + 1) % array.length;
      fadeText(el, array[idx], Math.max(200, settings.speed/4));
    }, settings.speed);
  }

  function prepareArray(text, sep){
    return text.split(sep).map(s=>s.trim()).filter(s=>s.length>0);
  }

  window.textrotator = function(selector, options){
    const settings = merge(defaults, options);
    const nodes = typeof selector === 'string' ? document.querySelectorAll(selector) : (selector instanceof NodeList ? selector : [selector]);
    nodes.forEach(node => {
      const arr = prepareArray(node.textContent || '', settings.separator);
      if (arr.length > 0) simpleRotate(node, arr, settings);
    });
  };

})();

