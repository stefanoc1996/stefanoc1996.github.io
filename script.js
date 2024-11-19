document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded');
    const button = document.getElementById('myButton');
    button.addEventListener('click', () => {
        window.location.href = 'seconda_pagina.html';
    });
});