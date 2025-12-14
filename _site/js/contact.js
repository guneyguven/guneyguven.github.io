/* 
Template Name   : Solopreneur, a personal website template.
Author           : Jorge Perez
Version          : 1.0.0
Updated          : May 2023
File Description : Contact.js file.
This is needed for the form to work */

// Contact (vanilla JS)
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('working_form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const action = form.getAttribute('action') || '';
        const messageEl = document.getElementById('message');

        if (messageEl) {
            messageEl.style.display = 'none';
        }

        const submitBtn = document.getElementById('submit');
        // insert loader
        let loader = document.createElement('img');
        loader.className = 'gif_loader';
        loader.src = '';
        if (submitBtn && submitBtn.parentNode) submitBtn.parentNode.insertBefore(loader, submitBtn);
        if (submitBtn) submitBtn.setAttribute('disabled', 'disabled');

        // prepare form data
        const postData = new URLSearchParams();
        postData.append('name', (document.getElementById('name') || {}).value || '');
        postData.append('email', (document.getElementById('email') || {}).value || '');
        postData.append('comments', (document.getElementById('comments') || {}).value || '');

        fetch(action, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: postData.toString()
        }).then(response => response.text())
        .then(data => {
            if (messageEl) {
                messageEl.innerHTML = data;
                messageEl.style.display = 'block';
            }
            // remove loader
            if (loader && loader.parentNode) loader.parentNode.removeChild(loader);
            if (submitBtn) submitBtn.removeAttribute('disabled');
            // if response contains 'success', hide the form
            if (data && data.indexOf('success') !== -1) {
                form.style.display = 'none';
            }
        }).catch(err => {
            if (messageEl) {
                messageEl.innerHTML = 'An error occurred. Please try again.';
                messageEl.style.display = 'block';
            }
            if (loader && loader.parentNode) loader.parentNode.removeChild(loader);
            if (submitBtn) submitBtn.removeAttribute('disabled');
        });

        return false;
    });
});