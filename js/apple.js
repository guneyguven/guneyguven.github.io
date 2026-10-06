(function(){'use strict';

const root=document.documentElement;
const themeButton=document.querySelector('[data-theme-toggle]');
const mobileMenu=document.querySelector('.mobile-menu');
const mobileLinks=document.querySelectorAll('.mobile-nav a');

const getStoredTheme=()=>{try{return localStorage.getItem('siteTheme')||localStorage.getItem('theme')}catch(_){return null}};
const saveTheme=t=>{try{localStorage.setItem('siteTheme',t);localStorage.setItem('theme',t)}catch(_){}};

const setTheme=t=>{
  const v=t==='dark'?'dark':'light';
  root.dataset.theme=v;
  if(themeButton){
    const dark=v==='dark';
    themeButton.textContent=dark?'☼':'◐';
    themeButton.setAttribute('aria-pressed',String(dark));
    themeButton.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');
  }
};

setTheme(getStoredTheme()||(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'));

if(themeButton){
  themeButton.addEventListener('click',()=>{
    const n=root.dataset.theme==='dark'?'light':'dark';
    setTheme(n);
    saveTheme(n);
  });
}

const closeMenu=()=>{if(mobileMenu)mobileMenu.removeAttribute('open')};
mobileLinks.forEach(l=>l.addEventListener('click',closeMenu));
document.addEventListener('click',e=>{
  if(mobileMenu&&mobileMenu.hasAttribute('open')&&!mobileMenu.contains(e.target))closeMenu();
},true);
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});

/* Navigation becomes slightly smaller and denser after scrolling. */
let scrollTicking=false;
const updateNav=()=>{
  document.body.classList.toggle('nav-scrolled',window.scrollY>24);
  scrollTicking=false;
};
addEventListener('scroll',()=>{
  if(!scrollTicking){requestAnimationFrame(updateNav);scrollTicking=true}
},{passive:true});
updateNav();

/* Staggered scroll reveal. */
const targets=[
  ...document.querySelectorAll('.reveal'),
  ...document.querySelectorAll('.section > .eyebrow:not(.reveal)'),
  ...document.querySelectorAll('.section > .display:not(.reveal)'),
  ...document.querySelectorAll('.section > .intro:not(.reveal)')
];
targets.forEach((el,i)=>{
  if(!el.classList.contains('reveal'))el.classList.add('reveal');
  el.style.setProperty('--delay',Math.min(i*70,420)+'ms');
});

if('IntersectionObserver'in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  const ob=new IntersectionObserver((entries,o)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('on');
        o.unobserve(e.target);
      }
    });
  },{threshold:.12,rootMargin:'0px 0px -5% 0px'});
  targets.forEach(e=>ob.observe(e));
}else targets.forEach(e=>e.classList.add('on'));

/* Section-aware image parallax. */
const sections=[...document.querySelectorAll('main > section')];
sections.forEach((section,i)=>{
  section.dataset.section=i+1;
  section.style.setProperty('--section-index',i);
});

const parallax=[
  ...document.querySelectorAll('.hero-media img'),
  ...document.querySelectorAll('.media-wide img'),
  ...document.querySelectorAll('.project img')
];
let parallaxTicking=false;

const updateParallax=()=>{
  if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    parallax.forEach(img=>{
      const r=img.parentElement.getBoundingClientRect();
      const d=(r.top+r.height/2-window.innerHeight/2)/window.innerHeight;
      const y=Math.max(-16,Math.min(16,d*-10));
      img.style.setProperty('--parallax-y',y.toFixed(2)+'px');
    });
  }
  parallaxTicking=false;
};

addEventListener('scroll',()=>{
  if(!parallaxTicking){requestAnimationFrame(updateParallax);parallaxTicking=true}
},{passive:true});
updateParallax();

/* Seamless page transitions for internal navigation. */
const transitionable=l=>l&&l.href&&l.origin===location.origin&&l.target!=='_blank'&&!l.hasAttribute('download')&&!l.href.includes('#');

document.addEventListener('click',e=>{
  const l=e.target.closest('a');
  if(!transitionable(l)||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
  e.preventDefault();
  closeMenu();
  document.body.classList.remove('page-enter');
  document.body.classList.add('page-leave');
  setTimeout(()=>location.href=l.href,520);
});

document.body.classList.add('page-enter');

/* Art exhibition lightbox. Works with the existing gallery without changing its content. */
const galleryImages=[...document.querySelectorAll('.gallery figure img')];
if(galleryImages.length){
  const lightbox=document.createElement('div');
  lightbox.className='art-lightbox';
  lightbox.setAttribute('role','dialog');
  lightbox.setAttribute('aria-modal','true');
  lightbox.setAttribute('aria-label','Artwork viewer');
  lightbox.innerHTML='<button type="button" class="lightbox-close" aria-label="Close artwork viewer">×</button><img alt=""><span class="lightbox-count"></span>';
  document.body.appendChild(lightbox);

  const image=lightbox.querySelector('img');
  const count=lightbox.querySelector('.lightbox-count');
  const closeButton=lightbox.querySelector('.lightbox-close');
  let current=0;

  const showImage=index=>{
    current=(index+galleryImages.length)%galleryImages.length;
    const source=galleryImages[current];
    image.src=source.currentSrc||source.src;
    image.alt=source.alt||'Artwork';
    count.textContent=(current+1)+' / '+galleryImages.length;
  };

  const close=()=>{
    lightbox.classList.remove('is-open');
    document.body.style.overflow='';
  };

  galleryImages.forEach((img,index)=>{
    img.parentElement.addEventListener('click',()=>{
      showImage(index);
      lightbox.classList.add('is-open');
      document.body.style.overflow='hidden';
    });
  });

  closeButton.addEventListener('click',close);
  lightbox.addEventListener('click',e=>{if(e.target===lightbox)close()});

  document.addEventListener('keydown',e=>{
    if(!lightbox.classList.contains('is-open'))return;
    if(e.key==='Escape')close();
    if(e.key==='ArrowRight')showImage(current+1);
    if(e.key==='ArrowLeft')showImage(current-1);
  });
}

/* Keep the copyright year current automatically. */
document.querySelectorAll('[data-current-year]').forEach(el=>{
  el.textContent=new Date().getFullYear();
});

})();