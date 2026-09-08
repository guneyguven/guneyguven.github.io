(function(){const root=document.documentElement;let theme=localStorage.getItem('siteTheme')||localStorage.getItem('theme')||'light';root.dataset.theme=theme==='dark'?'dark':'light';const btn=document.querySelector('[data-theme-toggle]');if(btn){btn.setAttribute('aria-label','Toggle dark mode');btn.addEventListener('click',()=>{const next=root.dataset.theme==='dark'?'light':'dark';root.dataset.theme=next;localStorage.setItem('siteTheme',next);localStorage.setItem('theme',next);});}const menu=document.querySelector('[data-menu]'),links=document.querySelector('[data-mobile-nav]');if(menu&&links){menu.addEventListener('click',()=>{const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',open);});links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')))}const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('on')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(e=>io.observe(e));})();

/* BACKGROUND VIDEO OPTION — intentionally hidden from the frontend.
   To enable later, place /media/background.mp4 in the repository and add:
   <video class="background-video" autoplay muted loop playsinline aria-hidden="true">
     <source src="media/background.mp4" type="video/mp4">
   </video>
   Then use CSS to position it behind the page content. There is deliberately
   no video control or video UI in the frontend.
*/