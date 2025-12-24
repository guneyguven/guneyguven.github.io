/* 
Template Name   : Solopreneur, a personal website template.
Author           : Jorge Perez
Version          : 1.0.0
Updated          : May 2023
File Description : Main JavaScript file for the template.  */

/* Converted to Vanilla JS */
"use strict";

class Solopreneur {
    constructor() { }

    // helper: fade out element
    fadeOut(el, duration = 400) {
        if (!el) return;
        el.style.transition = `opacity ${duration}ms`;
        el.style.opacity = 0;
        setTimeout(() => {
            if (el.parentNode) el.style.display = 'none';
        }, duration);
    }

    // Preloader
    initPreLoader() {
        const status = document.getElementById('status');
        const preloader = document.getElementById('preloader');
        if (status) this.fadeOut(status, 200);
        if (preloader) setTimeout(() => this.fadeOut(preloader, 600), 350);
        setTimeout(() => { document.body.style.overflow = 'visible'; }, 700);
    }

    // Sticky menu
    initStickyMenu() {
        const navbar = document.querySelector('nav');
        window.addEventListener('scroll', () => {
            if (!navbar) return;
            if (window.pageYOffset > 30) navbar.classList.add('stickyadd');
            else navbar.classList.remove('stickyadd');
        });
    }

    // Scrollspy (Bootstrap)
    initScrollspy() {
        if (window.bootstrap && bootstrap.ScrollSpy) {
            new bootstrap.ScrollSpy(document.body, { target: '#main_nav', offset: 70 });
        }
    }

    // Back to top
    initBackToTop() {
        const backElems = document.querySelectorAll('.back_top');
        const onScroll = () => {
            const show = window.scrollY > 100;
            backElems.forEach(el => {
                el.style.display = show ? 'block' : 'none';
                el.style.opacity = show ? '1' : '0';
            });
        };
        window.addEventListener('scroll', onScroll);
        onScroll();

        backElems.forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });
    }

    // Footer sizing: set CSS variable --navbar-height so footer can be sized to 2x navbar
    initFooterSizing() {
        const setVar = () => {
            const navbar = document.querySelector('nav');
            if (!navbar) return;
            const h = navbar.offsetHeight || 56;
            document.documentElement.style.setProperty('--navbar-height', h + 'px');
        };
        // set now and update on resize (debounced)
        setVar();
        let t;
        window.addEventListener('resize', () => {
            clearTimeout(t);
            t = setTimeout(setVar, 120);
        });
    }

    init() {
        this.initPreLoader();
        this.initStickyMenu();
        this.initScrollspy();
        this.initBackToTop();
        this.initFooterSizing();
    }
}

// initialize on DOMContentLoaded
window.__reinitPage = function(){
    try{
        const app = new Solopreneur();
        app.init();
    }catch(e){console.error('reinit Solopreneur',e)}

    try{
        if (typeof Typed !== 'undefined'){
            document.querySelectorAll('.demo4 .rotate').forEach(function(el){
                var src = el.getAttribute('data-rotate') || el.textContent || '';
                var strings = src.split(',').map(function(s){ return s.trim(); }).filter(Boolean);
                if (!strings.length) return;
                el.textContent = '';
                new Typed(el, { strings: strings, typeSpeed: 60, backSpeed: 40, backDelay: 1500, loop: true, showCursor: false, smartBackspace: true });
            });
        }
    }catch(e){console.error('reinit Typed',e)}
};

document.addEventListener('DOMContentLoaded', () => {
    window.__reinitPage();
});