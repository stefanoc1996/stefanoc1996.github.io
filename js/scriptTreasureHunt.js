function ribadisci() {
    alert("E allora sei capatosta!!\nNon è ancora disponibile, torna nei prossimi giorni");
}

function changeBackgrounds() {
    if (window.innerWidth < window.innerHeight) {
        window.backgrounds = [ 
            './images/mobile.webp',
            './images/1.webp',
            './images/2.webp',
            './images/3.webp',
            './images/4.webp',
            './images/5.webp',
            './images/6.webp',
            './images/7.webp',
            './images/8.webp',
            './images/9.webp',
            './images/10.webp',
            './images/11.webp',
            './images/12.webp',
            './images/13.webp',
            './images/14.webp',
            './images/15.webp',
            './images/16.webp',
            './images/17.webp',
            './images/18.webp',
            './images/19.webp',
            './images/20.webp',
            './images/22.webp'
        ];
    } else {
        window.backgrounds = [
            './HorizontalImages/foto2.webp',
            './HorizontalImages/foto3.webp',
            './HorizontalImages/foto4.webp',
            './HorizontalImages/foto5.webp',
            './HorizontalImages/foto6.webp',
            './HorizontalImages/IMG_0135.webp',
            './HorizontalImages/IMG_0159.webp',
            './HorizontalImages/IMG_0195.webp',
            './HorizontalImages/IMG_0215.webp',
            './HorizontalImages/IMG_0224.webp',
            './HorizontalImages/IMG_0380.webp',
            './HorizontalImages/IMG_0499.webp',
            './HorizontalImages/IMG_0583.webp',
            './HorizontalImages/IMG_2602.webp'
        ];
    }
    return window.backgrounds;
}

function preloadImages() {
    return Promise.all(backgrounds.map(img => new Promise((resolve) => {
        const preloader = new Image();
        preloader.src = img;
        preloader.onload = () => resolve();
        preloader.onerror = () => resolve();
    })));
}

function getRandomBackground() {
    return backgrounds[Math.floor(Math.random() * backgrounds.length)];
}

function changeBackground() {
    const container = document.querySelector('.background-container');
    const currentActive = container.querySelector('.background-fade.active');
    const newBackground = document.createElement('div');
    
    newBackground.className = 'background-fade';
    newBackground.style.backgroundImage = `url('${getRandomBackground()}')`;
    container.appendChild(newBackground);
    
    setTimeout(() => {
        newBackground.classList.add('active');
        if (currentActive) {
            currentActive.classList.remove('active');
            setTimeout(() => currentActive.remove(), 1500);
        }
    }, 100);
}

// Inizializzazione
document.addEventListener('DOMContentLoaded', async () => {
    changeBackgrounds();
    window.addEventListener('resize', changeBackgrounds);

    try {
        await preloadImages();
        const initialBg = document.querySelector('.background-fade');
        initialBg.style.backgroundImage = `url('${getRandomBackground()}')`;
        setTimeout(() => initialBg.classList.add('active'), 100);
        setInterval(changeBackground, 7000);
        
        document.querySelector('.content').style.opacity = '1';
    } catch (error) {
        console.error('Errore inizializzazione:', error);
    }
});