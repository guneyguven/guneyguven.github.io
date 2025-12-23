/* 
Template Name   : Solopreneur, a personal website template.
Author           : Jorge Perez
Version          : 1.0.0
Updated          : May 2023
File Description : Main JavaScript file for the template.  */

/* Converted to vanilla JS (removed jQuery dependency) */
(function() {
    "use strict";

    function fadeOut(el, duration = 400) {
        if (!el) return;
        el.style.transition = `opacity ${duration}ms`;
        el.style.opacity = 1;
        requestAnimationFrame(() => el.style.opacity = 0);
        setTimeout(() => { try { el.style.display = 'none'; } catch(e){} }, duration);
    }

    function fadeIn(el, duration = 400, display = 'block') {
        if (!el) return;
        el.style.opacity = 0;
        el.style.display = display;
        el.style.transition = `opacity ${duration}ms`;
        requestAnimationFrame(() => el.style.opacity = 1);
    }

    class Solopreneur {
        constructor() { }
        // PreLoader
        initPreLoader() {
            const status = document.getElementById('status');
            const preloader = document.getElementById('preloader');
            if (status) status.style.display = 'none';
            if (preloader) preloader.style.display = 'none';
            document.body.style.overflow = 'visible';
        }
        // sticky menu
        initStickyMenu() {
            const navbar = document.querySelector('nav');
            if (!navbar) return;
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 30) {
                    navbar.classList.add('stickyadd');
                } else {
                    navbar.classList.remove('stickyadd');
                }
            });
        }
        // Scrollspy (bootstrap 5 API)
        initScrollspy() {
            if (window.bootstrap && bootstrap.ScrollSpy) {
                new bootstrap.ScrollSpy(document.body, {
                    target: '#main_nav',
                    offset: 70
                });
            }
        }
        // Back To Top
        initBackToTop() {
            const backTop = document.querySelectorAll('.back_top');
            function onScroll() {
                const show = window.scrollY > 100;
                backTop.forEach(el => {
                    if (show) fadeIn(el, 200, 'inline-block');
                    else fadeOut(el, 200);
                });
            }
            window.addEventListener('scroll', onScroll);
            // initial check
            onScroll();

            backTop.forEach(el => {
                el.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    return false;
                });
            });
        // Hamburger Toggle
        initHamburgerToggle() {
            window.toggleMenu = () => {
                const collapse = document.querySelector('#navbarNav');
                const toggler = document.querySelector('.navbar-toggler');
                if (!collapse || !toggler) return;
                const isExpanded = collapse.classList.contains('show');
                collapse.classList.toggle('show');
                toggler.setAttribute('aria-expanded', !isExpanded);
            };
        }
        init() {
            this.initPreLoader();
            this.initStickyMenu();
            this.initScrollspy();
            this.initBackToTop();
            this.initHamburgerToggle();
        }
    }

    // Expose and initialize after DOM ready
    window.Solopreneur = new Solopreneur();
    document.addEventListener('DOMContentLoaded', () => {
        window.Solopreneur.init();
    });

})();