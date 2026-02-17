/* 
Template Name   : Solopreneur, a personal website template.
Author           : Jorge Perez
Version          : 1.0.0
Updated          : May 2023
File Description : Contact.js file.
This is needed for the form to work */

// Contact - converted to Vanilla JS
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('working_form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const action = form.getAttribute('action') || window.location.href;

        const messageEl = document.getElementById('message');
        if (messageEl) {
            messageEl.style.display = 'none';
        }

        const submitBtn = document.getElementById('submit');
        if (submitBtn) {
            const loader = document.createElement('img');
            loader.className = 'gif_loader';
            loader.src = '';
            submitBtn.parentNode.insertBefore(loader, submitBtn);
            submitBtn.setAttribute('disabled', 'disabled');
        }

        const formData = new FormData(form);

        fetch(action, {
            method: 'POST',
            body: formData,
        })
            .then(response => response.text())
            .then(data => {
                if (messageEl) {
                    messageEl.innerHTML = data;
                    messageEl.style.display = 'block';
                }

                // remove loader
                const loader = form.querySelector('img.gif_loader');
                if (loader) loader.remove();

                if (submitBtn) submitBtn.removeAttribute('disabled');

                if (data && data.indexOf('success') !== -1) {
                    const cform = document.getElementById('cform');
                    if (cform) cform.style.display = 'none';
                }
            })
            .catch(err => {
                if (messageEl) {
                    messageEl.innerHTML = 'An error occurred. Please try again later.';
                    messageEl.style.display = 'block';
                }
                const loader = form.querySelector('img.gif_loader');
                if (loader) loader.remove();
                if (submitBtn) submitBtn.removeAttribute('disabled');
                console.error('Contact form error:', err);
            });
    });
});