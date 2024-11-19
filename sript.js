document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded');
    const button = document.getElementById('myButton');
    button.addEventListener('click', () => {
        alert('Hai cliccato il pulsante!');
    });
});