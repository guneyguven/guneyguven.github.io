/* Vanilla JS masonry gallery lightbox */
(function(){
  const gallery = document.getElementById('masonry-gallery');
  if (!gallery) return;

  const items = Array.from(gallery.querySelectorAll('.masonry-item img'));
  const lightbox = document.getElementById('lightbox');
  const lbImg = lightbox && lightbox.querySelector('.lb-img');
  const lbCaption = lightbox && lightbox.querySelector('.lb-caption');
  const btnClose = lightbox && lightbox.querySelector('.lb-close');
  const btnPrev = lightbox && lightbox.querySelector('.lb-prev');
  const btnNext = lightbox && lightbox.querySelector('.lb-next');

  let current = -1;

  function openAt(index){
    if (!lightbox) return;
    current = (index + items.length) % items.length;
    const src = items[current].getAttribute('src');
    const alt = items[current].getAttribute('alt') || '';
    lbImg.src = src;
    lbImg.alt = alt;
    lbCaption.textContent = alt;
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }

  function close(){
    if (!lightbox) return;
    lightbox.classList.remove('show');
    lightbox.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }

  function prev(){ openAt(current - 1); }
  function next(){ openAt(current + 1); }

  items.forEach((img, i) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', (e) => { e.preventDefault(); openAt(i); });
  });

  if (btnClose) btnClose.addEventListener('click', close);
  if (btnPrev) btnPrev.addEventListener('click', prev);
  if (btnNext) btnNext.addEventListener('click', next);

  // click backdrop to close
  const backdrop = lightbox && lightbox.querySelector('[data-lb="backdrop"]');
  if (backdrop) backdrop.addEventListener('click', close);

  // keyboard navigation
  document.addEventListener('keydown', function(e){
    if (!lightbox || lightbox.classList.contains('show') === false) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });

})();
