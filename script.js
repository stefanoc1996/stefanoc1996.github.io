document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded');
    const button = document.getElementById('myButton');
    button.addEventListener('click', () => {
        window.location.href = 'test.html';
    });
});