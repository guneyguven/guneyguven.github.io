(function(){const root=document.documentElement;let theme='light';try{theme=localStorage.getItem('siteTheme')||localStorage.getItem('theme')||'light'}catch(e){}root.dataset.theme=theme==='dark'?'dark':'light';const btn=document.querySelector('[data-theme-toggle]');if(btn)btn.addEventListener('click',()=>{const next=root.dataset.theme==='dark'?'light':'dark';root.dataset.theme=next;try{localStorage.setItem('siteTheme',next);localStorage.setItem('theme',next)}catch(e){}});const menu=document.querySelector('[data-menu]'),desktop=document.querySelector('.nav-links');if(menu&&desktop){const mobile=desktop.cloneNode(true);mobile.classList.add('mobile-nav');mobile.removeAttribute('data-mobile-nav');desktop.parentElement.appendChild(mobile);menu.addEventListener('click',()=>{const open=mobile.classList.toggle('open');menu.setAttribute('aria-expanded',open)});mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobile.classList.remove('open')))}const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('on')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(e=>io.observe(e));})();

/* BACKGROUND VIDEO OPTION — intentionally hidden from the frontend.
   To enable later, place /media/background.mp4 in the repository and add:
   <video class="background-video" autoplay muted loop playsinline aria-hidden="true">
     <source src="media/background.mp4" type="video/mp4">
   </video>
   There is deliberately no video control or video UI in the frontend.
*/