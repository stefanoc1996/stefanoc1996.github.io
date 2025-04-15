// Dati della caccia al tesoro
let treasureHuntData = {
    chapters: []
};

// Array di immagini di sfondo
const backgroundImages = [
    'HorizontalImages/foto2.webp',
    'HorizontalImages/foto3.webp',
    'HorizontalImages/foto4.webp',
    'HorizontalImages/foto5.webp',
    'HorizontalImages/foto6.webp',
    'HorizontalImages/IMG_0135.webp',
    'HorizontalImages/IMG_0159.webp',
    'HorizontalImages/IMG_0195.webp',
    'HorizontalImages/IMG_0215.webp',
    'HorizontalImages/IMG_0224.webp'
];

let currentBackgroundIndex = 0;
let backgroundInterval;

// Funzione per cambiare l'immagine di sfondo
function changeBackground() {
    const prevBgElement = document.querySelector('.background-fade.active');
    if (prevBgElement) {
        prevBgElement.classList.remove('active');
        setTimeout(() => {
            prevBgElement.remove();
        }, 2500); // Attesa per la fine della transizione
    }
    
    // Crea un nuovo elemento di sfondo
    const newBgElement = document.createElement('div');
    newBgElement.className = 'background-fade';
    newBgElement.style.backgroundImage = `url(${backgroundImages[currentBackgroundIndex]})`;
    
    // Aggiungi il nuovo elemento al container
    const bgContainer = document.querySelector('.background-container');
    if (bgContainer) {
        bgContainer.appendChild(newBgElement);
        
        // Attiva la transizione
        setTimeout(() => {
            newBgElement.classList.add('active');
        }, 50);
        
        // Passa alla prossima immagine
        currentBackgroundIndex = (currentBackgroundIndex + 1) % backgroundImages.length;
    }
}

// Dati dei personaggi che raccontano la storia
const characters = [
    {
        id: "mario",
        name: "Mario il Minatore",
        role: "Antico minatore di Tolfa",
        image: "images/characters/9.webp",
        stories: {
            intro: "Benvenuti alla caccia al tesoro di Tolfa! Io sono Mario, ho lavorato nelle miniere per tutta la vita. Queste colline nascondono molti segreti...",
            progress: "State andando bene! Le miniere di allume erano la ricchezza di Tolfa nel passato. Proseguite nella vostra ricerca!",
            hint: "Un suggerimento: cerca vicino ai luoghi delle antiche miniere, ci sono indizi nascosti nei dettagli più piccoli.",
            chapter1: "La Rocca di Tolfa custodisce secoli di storia. Esploratela con attenzione per svelare i suoi segreti!",
            chapter2: "Le miniere di allume hanno fatto la fortuna di Tolfa. Scoprite chi le ha trovate e come hanno cambiato la storia del territorio!",
            chapter3: "Le tradizioni di Tolfa sono ancora vive oggi. I butteri, le feste e l'artigianato raccontano l'anima vera di questo territorio!"
        }
    },
    {
        id: "lucia",
        name: "Lucia la Contadina",
        role: "Contadina e custode delle tradizioni",
        image: "images/characters/10.webp",
        stories: {
            intro: "Ciao avventurieri! Sono Lucia, conosco ogni sentiero di queste terre. La tradizione agricola di Tolfa è antica quanto le sue colline.",
            progress: "Ottimo progresso! Sapevate che le tradizioni gastronomiche di Tolfa risalgono a centinaia di anni fa? I piatti tipici raccontano la nostra storia.",
            hint: "Prestate attenzione alle piante locali, potrebbero indicarvi la strada giusta per il prossimo indizio.",
            chapter1: "La Rocca domina il paesaggio di Tolfa da secoli. Pensate a quante storie potrebbero raccontare quelle mura!",
            chapter2: "Le antiche miniere di allume hanno portato ricchezza a queste terre. Il lavoro era duro, ma la comunità ne ha tratto grande beneficio!",
            chapter3: "Le tradizioni di Tolfa sono il nostro tesoro più prezioso. I butteri, le feste e l'artigianato sono ancora parte della nostra identità!"
        }
    },
    {
        id: "carlo",
        name: "Carlo il Cavaliere",
        role: "Membro della Compagnia dei Butteri",
        image: "images/characters/9.webp",
        stories: {
            intro: "Salve, amici! Sono Carlo, un buttero della Maremma Laziale. I nostri cavalli conoscono ogni angolo di questa terra meravigliosa.",
            progress: "State cavalcando bene attraverso questa avventura! I butteri hanno sempre protetto queste terre, così come voi state proteggendo il vostro percorso.",
            hint: "Il tesoro potrebbe essere vicino ai luoghi dove i butteri si riunivano in passato. Cercate i segni della tradizione equestre!",
            chapter1: "La Rocca ha visto passare cavalieri e nobili per secoli. Trovate i segni lasciati dal tempo sulle sue mura!",
            chapter2: "I minatori lavoravano duramente nelle cave di allume. La loro storia è ancora viva nelle rocce di Tolfa!",
            chapter3: "Noi butteri portiamo avanti tradizioni antiche. La bardella, la nostra sella tipica, è unica al mondo!"
        }
    },
    {
        id: "elena",
        name: "Elena la Castellana",
        role: "Nobildonna della Rocca",
        image: "images/characters/10.webp",
        stories: {
            intro: "Vi do il benvenuto, visitatori! Sono Elena, dalla mia Rocca ho osservato secoli di storia di Tolfa. Venite a scoprire i nostri segreti.",
            progress: "Proseguite con coraggio! La Rocca ha visto passare molti cercatori di tesori, ma solo i più astuti hanno trovato ciò che cercavano.",
            hint: "Guardate ai dettagli architettonici della Rocca, ogni pietra può nascondere un indizio sul vostro cammino.",
            chapter1: "La Rocca dei Frangipane ha dominato queste terre per secoli. Esplorate ogni angolo per scoprirne i segreti!",
            chapter2: "L'allume ha cambiato il destino di Tolfa. Era così prezioso che il Papato ne ottenne il monopolio!",
            chapter3: "Le tradizioni di Tolfa sono custodite con cura dai suoi abitanti. Scoprite la festa di Sant'Egidio e gli antichi mestieri!"
        }
    },
    {
        id: "antonio",
        name: "Antonio l'Artigiano",
        role: "Maestro del cuoio tolfetano",
        image: "images/characters/9.webp",
        stories: {
            intro: "Buongiorno esploratori! Sono Antonio, lavoro il cuoio come si faceva nei secoli passati. L'artigianato racconta la vera anima di Tolfa.",
            progress: "State procedendo come abili artigiani! Ricordate che ogni creazione richiede pazienza e attenzione ai dettagli, proprio come la vostra caccia.",
            hint: "Le botteghe artigiane potrebbero custodire segreti importanti. Osservate gli strumenti tradizionali, potrebbero indicarvi la via.",
            chapter1: "La Rocca è stata costruita con grande maestria dai Frangipane. Osservate la tecnica costruttiva delle sue mura!",
            chapter2: "Le miniere di allume hanno attirato artigiani da tutta l'Italia. Con quel minerale si tingevano i tessuti e si preparavano medicinali!",
            chapter3: "La catana è la borsa tipica di Tolfa, un capolavoro dell'artigianato in cuoio che realizziamo ancora oggi secondo metodi antichi!"
        }
    }
];

// Variabili globali
let currentChapter = null;
let currentQuestion = null;
let questionIdx = 0;
let userAnswers = {};
let completedChapters = {};
let map = null;
let markers = [];
let html5QrCode = null;
let currentCharacter = null;
let storyProgressChapters = [];
let unlockedChapters = [0]; // Il primo capitolo è sempre sbloccato

// Inizializzazione quando il documento è pronto
document.addEventListener('DOMContentLoaded', function() {
    // Inizializza l'immagine di sfondo
    changeBackground();
    
    // Imposta un intervallo per cambiare lo sfondo ogni 15 secondi
    backgroundInterval = setInterval(changeBackground, 15000);
    
    // Carica i dati della caccia al tesoro
    fetch('data/treasure-hunt-data.json')
        .then(response => response.json())
        .then(data => {
            treasureHuntData = data;
            setupChapters();
            
            // Carica lo stato salvato
            loadSavedProgress();
        })
        .catch(error => {
            console.error('Errore nel caricamento dei dati:', error);
            // Usa dati di esempio in caso di errore
            setupChapters();
        });

    // Event listeners per i pulsanti
    document.getElementById('submit-answer').addEventListener('click', checkAnswer);
    document.getElementById('answer-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });

    // Inizializza scanner QR se esiste l'elemento
    const qrScannerContainer = document.getElementById('qr-scanner-container');
    if (qrScannerContainer) {
        document.getElementById('start-scanner').addEventListener('click', startQRScanner);
        document.getElementById('stop-scanner').addEventListener('click', stopQRScanner);
        document.getElementById('submit-manual-code').addEventListener('click', checkManualCode);
    }
    
    // Event listener per codice di sblocco
    const unlockContainer = document.getElementById('unlock-chapter-container');
    if (unlockContainer) {
        document.getElementById('submit-unlock-code').addEventListener('click', checkUnlockCode);
        document.getElementById('unlock-code-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkUnlockCode();
            }
        });
    }
    
    // Inizializza la mappa subito
    initializeTreasureMap();
});

// Funzione per impostare i capitoli della caccia al tesoro
function setupChapters() {
    const chapterContainer = document.querySelector('.chapter-buttons');
    if (!chapterContainer) {
        console.error('Elemento .chapter-buttons non trovato');
        return;
    }
    
    chapterContainer.innerHTML = '';
    
    // Crea un pulsante per ogni capitolo disponibile
    treasureHuntData.chapters.forEach((chapter, idx) => {
        const button = document.createElement('button');
        button.className = 'chapter-btn';
        
        // Imposta l'aspetto del capitolo in base allo stato di sblocco
        if (!unlockedChapters.includes(idx)) {
            button.className += ' locked';
            button.disabled = true;
        }
        
        button.textContent = `Capitolo ${idx + 1}: ${chapter.title}`;
        button.setAttribute('data-chapter', idx);
        button.addEventListener('click', function() {
            if (!button.disabled) {
                selectChapter(parseInt(this.getAttribute('data-chapter')));
            }
        });
        
        // Controlla se il capitolo è stato completato
        if (completedChapters[idx]) {
            button.classList.add('completed');
        }
        
        chapterContainer.appendChild(button);
    });
    
    // Mostra l'introduzione all'avventura
    showWelcome();
}

// Funzione per mostrare il messaggio di benvenuto
function showWelcome() {
    // Seleziona un personaggio casuale
    const randomIndex = Math.floor(Math.random() * characters.length);
    currentCharacter = characters[randomIndex];
    
    const introContainer = document.createElement('div');
    introContainer.className = 'intro-container';
    introContainer.innerHTML = `
        <div class="intro-message">
            <h2>Benvenuti alla Caccia al Tesoro di Tolfa!</h2>
            <p>State per iniziare un'avventura alla scoperta della storia e delle tradizioni di Tolfa.</p>
            <p>Completate i capitoli, rispondete alle domande e seguite la mappa per trovare il tesoro!</p>
            <button id="start-adventure" class="btn btn-primary">Inizia l'avventura</button>
        </div>
    `;
    
    // Solo se non ci sono capitoli completati, mostra l'introduzione
    if (Object.keys(completedChapters).length === 0) {
        document.querySelector('.content').insertBefore(introContainer, document.querySelector('.chapter-container'));
        
        // Mostra un personaggio che introduce l'avventura
        showRandomCharacter('intro');
        
        // Nascondi temporaneamente la selezione dei capitoli
        document.querySelector('.chapter-container').style.display = 'none';
        
        // Aggiungi l'event listener per il pulsante di inizio
        document.getElementById('start-adventure').addEventListener('click', function() {
            introContainer.remove();
            document.querySelector('.chapter-container').style.display = 'block';
        });
    }
}

// Funzione per mostrare un personaggio casuale con un testo specifico
function showRandomCharacter(messageType, chapterIndex = null) {
    // Seleziona un personaggio casuale se non è già definito
    if (!currentCharacter) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        currentCharacter = characters[randomIndex];
    }
    
    const charactersContainer = document.getElementById('characters-container');
    
    // Determina il messaggio in base al tipo
    let message = '';
    if (chapterIndex !== null && messageType === 'chapter') {
        message = currentCharacter.stories[`chapter${chapterIndex+1}`] || currentCharacter.stories.hint;
    } else {
        message = currentCharacter.stories[messageType] || currentCharacter.stories.intro;
    }
    
    charactersContainer.innerHTML = `
        <div class="character-container character-enter">
            <div class="character-bubble">
                <div class="character-info">
                    <h5>${currentCharacter.name}</h5>
                    <p class="character-role">${currentCharacter.role}</p>
                </div>
                <div class="speech-bubble">
                    <p>${message}</p>
                    <div class="speech-bubble-arrow"></div>
                </div>
            </div>
            <div class="character-image-container">
                <img src="${currentCharacter.image}" alt="${currentCharacter.name}">
            </div>
        </div>
    `;
    
    // Mostra il personaggio
    charactersContainer.style.display = 'block';
    
    // Rimuovi il personaggio dopo 10 secondi
    setTimeout(() => {
        const characterElement = document.querySelector('.character-container');
        if (characterElement) {
            characterElement.classList.remove('character-enter');
            characterElement.classList.add('character-exit');
            
            setTimeout(() => {
                charactersContainer.style.display = 'none';
            }, 1000);
        }
    }, 10000);
    
    // Cambia il personaggio per la prossima volta
    const randomIndex = Math.floor(Math.random() * characters.length);
    currentCharacter = characters[randomIndex];
}

// Funzione per selezionare un capitolo
function selectChapter(chapterIdx) {
    currentChapter = chapterIdx;
    const chapter = treasureHuntData.chapters[chapterIdx];
    
    if (!chapter) {
        console.error('Capitolo non trovato:', chapterIdx);
        return;
    }
    
    // Aggiorna interfaccia
    document.querySelector('.chapter-container').style.display = 'none';
    
    // Mostra il personaggio che introduce il capitolo
    showRandomCharacter('chapter', chapterIdx);
    
    // Controlla se è richiesta la scansione di un codice QR
    if (chapter.qrCode && !completedChapters[chapterIdx]) {
        // Mostra lo scanner QR
        document.getElementById('qr-scanner-container').style.display = 'block';
    } else {
        // Mostra direttamente le domande
        showQuestionsContainer(chapter);
    }
}

// Funzione per mostrare il container delle domande
function showQuestionsContainer(chapter) {
    document.querySelector('.questions-container').style.display = 'block';
    document.getElementById('chapter-title').textContent = `Capitolo ${currentChapter + 1}: ${chapter.title}`;
    
    // Inizializza la prima domanda
    questionIdx = 0;
    showCurrentQuestion();
}

// Funzione per mostrare la domanda corrente
function showCurrentQuestion() {
    const questions = treasureHuntData.chapters[currentChapter].questions;
    currentQuestion = questions[questionIdx];
    
    document.getElementById('question-number').textContent = `${questionIdx + 1}/${questions.length}`;
    document.getElementById('question-text').textContent = currentQuestion.text;
    
    // Aggiorna il testo della storia, mostrando le parti già sbloccate
    updateStoryText();
    
    // Reset del campo di input e feedback
    document.getElementById('answer-input').value = '';
    document.getElementById('answer-feedback').innerHTML = '';
}

// Funzione per aggiornare il testo della storia
function updateStoryText() {
    const chapter = treasureHuntData.chapters[currentChapter];
    const storyContainer = document.getElementById('story-text');
    
    let storyText = '';
    // Mostra le parti di storia fino alla domanda corrente
    for (let i = 0; i <= questionIdx; i++) {
        if (i < questionIdx || userAnswers[`chapter${currentChapter}_question${i}`]) {
            storyText += chapter.questions[i].storyPart + ' ';
        }
    }
    
    // Aggiungi alla storia complessiva che sta emergendo
    if (!storyProgressChapters.includes(currentChapter) && questionIdx > 0) {
        storyProgressChapters.push(currentChapter);
    }
    
    storyContainer.textContent = storyText || 'La storia verrà svelata man mano che rispondi alle domande...';
}

// Funzione per verificare la risposta
function checkAnswer() {
    const userAnswer = document.getElementById('answer-input').value.trim().toLowerCase();
    const correctAnswer = currentQuestion.answer.toLowerCase();
    
    const feedbackElement = document.getElementById('answer-feedback');
    
    if (userAnswer === correctAnswer) {
        // Risposta corretta
        feedbackElement.innerHTML = '<div class="alert alert-success">Risposta corretta! Continua così!</div>';
        
        // Salva la risposta corretta
        userAnswers[`chapter${currentChapter}_question${questionIdx}`] = true;
        
        // Salva lo stato
        saveProgress();
        
        // Aggiorna il testo della storia
        updateStoryText();
        
        // Mostra un personaggio che si congratula
        showRandomCharacter('progress');
        
        // Se non è l'ultima domanda, passa alla domanda successiva
        if (questionIdx < treasureHuntData.chapters[currentChapter].questions.length - 1) {
            setTimeout(() => {
                questionIdx++;
                showCurrentQuestion();
            }, 2000);
        } else {
            // Capitolo completato
            completeChapter();
        }
    } else {
        // Risposta errata
        feedbackElement.innerHTML = '<div class="alert alert-danger">Risposta errata. Riprova!</div>';
    }
}

// Funzione per completare un capitolo
function completeChapter() {
    // Segna il capitolo come completato
    completedChapters[currentChapter] = true;
    
    // Salva lo stato
    saveProgress();
    
    // Aggiungi un marker sulla mappa per la posizione di questo capitolo
    const chapter = treasureHuntData.chapters[currentChapter];
    if (chapter.mapLocation) {
        addMarkerToMap(chapter.mapLocation);
    }
    
    // Se non è l'ultimo capitolo, sblocca il prossimo e mostra il codice di sblocco
    let unlockCodeToShow = "";
    let isLastChapter = currentChapter >= treasureHuntData.chapters.length - 1;
    
    if (!isLastChapter) {
        // Genera il codice di sblocco per il prossimo capitolo
        unlockCodeToShow = chapter.generatedUnlockCode || generateUnlockCode(currentChapter);
        
        // Aggiungi un marker per la posizione del prossimo capitolo
        if (chapter.nextLocation) {
            setTimeout(() => {
                addMarkerToMap(chapter.nextLocation);
            }, 1000); // Aggiungi il marker del prossimo punto con un po' di ritardo
        }
    } else {
        // È l'ultimo capitolo, mostra la posizione finale del tesoro
        if (chapter.finalLocation) {
            setTimeout(() => {
                addMarkerToMap(chapter.finalLocation, true);
            }, 1000);
        }
    }
    
    // Aggiorna il messaggio del modal in base al capitolo
    document.getElementById('chapter-completed-message').textContent = 
        !isLastChapter
            ? 'Hai completato questo capitolo! Un nuovo punto è apparso sulla mappa per guidarti al prossimo indizio.'
            : 'Congratulazioni! Hai completato l\'intera caccia al tesoro! Segui l\'ultimo punto sulla mappa per trovare il tuo premio!';
    
    // Mostra o nascondi il codice di sblocco nel modal
    const unlockCodeDisplay = document.getElementById('unlock-code-display');
    if (unlockCodeDisplay) {
        if (!isLastChapter) {
            unlockCodeDisplay.style.display = 'block';
            document.getElementById('unlock-code').textContent = unlockCodeToShow;
        } else {
            unlockCodeDisplay.style.display = 'none';
        }
    }
    
    // Mostra il modal di completamento
    const modal = new bootstrap.Modal(document.getElementById('chapter-completed-modal'));
    modal.show();
    
    // Quando il modal viene chiuso, torna alla selezione dei capitoli
    document.getElementById('chapter-completed-modal').addEventListener('hidden.bs.modal', function() {
        document.querySelector('.questions-container').style.display = 'none';
        document.querySelector('.chapter-container').style.display = 'block';
        
        // Aggiorna lo stato dei pulsanti dei capitoli
        updateChaptersButtons();
        
        // Mostra la mappa sempre dopo aver completato un capitolo
        document.getElementById('treasure-map-container').style.display = 'block';
    }, { once: true });
}

// Funzione per controllare il codice di sblocco
function checkUnlockCode() {
    const codeInput = document.getElementById('unlock-code-input');
    const code = codeInput.value.trim().toUpperCase();
    const feedbackElement = document.getElementById('unlock-feedback');
    
    // Cerca il capitolo che corrisponde a questo codice
    let chapterToUnlock = -1;
    
    treasureHuntData.chapters.forEach((chapter, idx) => {
        if (chapter.unlockCode === code) {
            chapterToUnlock = idx;
        }
    });
    
    if (chapterToUnlock !== -1) {
        // Codice corretto
        feedbackElement.innerHTML = '<div class="alert alert-success">Codice corretto! Capitolo sbloccato!</div>';
        
        // Sblocca il capitolo
        if (!unlockedChapters.includes(chapterToUnlock)) {
            unlockedChapters.push(chapterToUnlock);
            saveProgress();
        }
        
        // Aggiorna i pulsanti
        updateChaptersButtons();
        
        // Chiudi il pannello di sblocco dopo un breve ritardo
        setTimeout(() => {
            document.getElementById('unlock-chapter-container').style.display = 'none';
            document.querySelector('.chapter-container').style.display = 'block';
        }, 1500);
    } else {
        // Codice errato
        feedbackElement.innerHTML = '<div class="alert alert-danger">Codice errato! Riprova.</div>';
    }
    
    // Reset del campo input
    codeInput.value = '';
}

// Funzione per generare un codice di sblocco
function generateUnlockCode(chapterIdx) {
    // Usa il codice predefinito se disponibile
    const chapter = treasureHuntData.chapters[chapterIdx];
    if (chapter && chapter.generatedUnlockCode) {
        return chapter.generatedUnlockCode;
    }
    
    // Altrimenti genera un codice basato sul capitolo
    const prefixes = ['TOLFA', 'ROCCA', 'ALLUME', 'TRADIZIONE'];
    const prefix = prefixes[chapterIdx % prefixes.length];
    const number = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}${number}`;
}

// Funzione per aggiornare i pulsanti dei capitoli
function updateChaptersButtons() {
    const chapterButtons = document.querySelectorAll('.chapter-btn');
    
    treasureHuntData.chapters.forEach((chapter, idx) => {
        const button = chapterButtons[idx];
        if (!button) return;
        
        // Segna i capitoli completati
        if (completedChapters[idx]) {
            button.classList.add('completed');
        }
        
        // Sblocca i capitoli sbloccati
        if (unlockedChapters.includes(idx) && button.classList.contains('locked')) {
            button.classList.remove('locked');
            button.disabled = false;
            
            // Effetto di sblocco
            button.classList.add('unlocking');
            setTimeout(() => {
                button.classList.remove('unlocking');
            }, 2000);
        }
    });
    
    // Mostra il bottone per inserire il codice di sblocco se ci sono capitoli bloccati
    // e almeno un capitolo è stato completato
    const hasCompletedChapters = Object.keys(completedChapters).length > 0;
    const hasLockedChapters = treasureHuntData.chapters.some((chapter, idx) => 
        !unlockedChapters.includes(idx) && idx > 0
    );
    
    const unlockContainer = document.getElementById('unlock-chapter-container');
    if (unlockContainer) {
        if (hasCompletedChapters && hasLockedChapters) {
            // Aggiungi un pulsante nella selezione dei capitoli per mostrare il pannello di sblocco
            const chapterContainer = document.querySelector('.chapter-buttons');
            if (chapterContainer && !document.getElementById('show-unlock-btn')) {
                const unlockBtn = document.createElement('button');
                unlockBtn.id = 'show-unlock-btn';
                unlockBtn.className = 'unlock-chapter-btn';
                unlockBtn.textContent = 'Inserisci codice di sblocco';
                unlockBtn.addEventListener('click', () => {
                    document.querySelector('.chapter-container').style.display = 'none';
                    unlockContainer.style.display = 'block';
                });
                chapterContainer.appendChild(unlockBtn);
            }
        }
    }
}

// Funzione per inizializzare la mappa del tesoro
function initializeTreasureMap() {
  try {
    // Verifica che il container della mappa esista
    const mapContainer = document.getElementById('treasure-map');
    if (!mapContainer) {
      console.error('Errore: Elemento #treasure-map non trovato');
      return;
    }

    // Stile personalizzato per la mappa
    const mapStyles = [
      {
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#ffffff' }]
      },
      {
        featureType: 'all',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#000000' }, { lightness: 13 }]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#0e1626' }]
      },
      {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [{ color: '#193341' }]
      },
      {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{ color: '#223946' }]
      },
      {
        featureType: 'poi',
        elementType: 'labels.icon',
        stylers: [{ hue: '#0088ff' }, { saturation: 50 }]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#0c212f' }, { lightness: 16 }]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{ color: '#182731' }]
      },
    ];

    // Centro della mappa su Tolfa
    const center = { lat: 42.149224, lng: 11.93406 };
    
    // Creazione della mappa con impostazioni ottimizzate
    const mapOptions = {
      zoom: isMobile() ? 14.5 : 15, // Zoom leggermente più largo su mobile
      center: center,
      mapTypeId: 'roadmap',
      mapId: '414892f452311cd1',
      styles: mapStyles,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      zoomControl: true,
      gestureHandling: 'greedy', // Permette zoom con un dito su mobile
      zoomControlOptions: {
        position: isMobile() ? google.maps.ControlPosition.RIGHT_CENTER : google.maps.ControlPosition.RIGHT_BOTTOM
      }
    };
    
    // Inizializza la mappa vuota (senza marker predefiniti)
    map = new google.maps.Map(document.getElementById('treasure-map'), mapOptions);
    
    // Mostra la mappa se ci sono capitoli completati
    if (Object.keys(completedChapters).length > 0) {
        document.getElementById('treasure-map-container').style.display = 'block';
    }
    
    console.log('Mappa inizializzata correttamente');
  } catch (error) {
    console.error('Errore durante l\'inizializzazione della mappa:', error);
  }
}

// Funzione per aggiungere un marker alla mappa
function addMarkerToMap(location, isFinal = false) {
  try {
    // Verifica che la mappa sia stata inizializzata
    if (!map) {
      console.error('Errore: Mappa non inizializzata');
      return;
    }
    
    // Verifica che la location abbia coordinate valide
    if (!location || !location.lat || !location.lng) {
      console.error('Errore: Coordinate del marker non valide', location);
      return;
    }
    
    // Se stiamo usando Google Maps
    if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
      // Ottieni un personaggio casuale per il popup
      const characterIndex = Math.floor(Math.random() * characters.length);
      const character = characters[characterIndex];
      
      // Crea marker con animazione
      const marker = new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: map,
        title: location.title || 'Punto scoperto',
        icon: {
          url: isFinal ? 'iconmap/premiazione.png' : 'iconmap/point.png',
          scaledSize: new google.maps.Size(isFinal ? 40 : 30, isFinal ? 50 : 40)
        },
        animation: google.maps.Animation.DROP
      });
      
      // Crea contenuto finestra info con stile della caccia al tesoro
      const contentString = `<div class="map-popup">
        <h6>${location.title || 'Punto scoperto'}</h6>
        <p>${location.description || 'Hai scoperto un nuovo punto!'}</p>
        <div class="map-popup-character">
          <div class="character-image">
            <img src="${character.image}" alt="Personaggio">
          </div>
          <div class="character-speech-bubble">
            <div class="character-name">${character.name}</div>
            <div class="character-text">${location.hint || character.stories.progress}</div>
          </div>
        </div>
        <div style="text-align: center; margin-top: 10px;">
          <a href="https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}" 
             class="btn btn-primary map-navigate-btn" target="_blank">
             <img src="iconmap/nav.png" alt="Naviga" width="16" height="16" style="margin-right: 4px; vertical-align: middle;"> Naviga
          </a>
        </div>
      </div>`;
      
      // Crea finestra info
      const infoWindow = new google.maps.InfoWindow({
        content: contentString,
        ariaLabel: location.title || 'Punto scoperto'
      });
      
      // Aggiungi listener per click sul marker
      marker.addListener("click", () => {
        infoWindow.open({
          anchor: marker,
          map
        });
      });
      
      // Centra la mappa sul nuovo marker
      map.panTo(marker.getPosition());
      
      // Salva il riferimento al marker
      markers.push(marker);
      
      // Se è il marker finale, fai un'animazione speciale
      if (isFinal) {
        // Aggiungi un effetto di pulsazione
        const bounceTimer = setInterval(() => {
            if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
            }
        }, 2000);
        
        // Ferma l'animazione dopo 10 secondi
        setTimeout(() => {
            clearInterval(bounceTimer);
            marker.setAnimation(null);
        }, 10000);
      }
      
      console.log('Marker aggiunto con successo:', location.title);
      return marker;
    }
  } catch (error) {
    console.error('Errore durante l\'aggiunta del marker:', error);
  }
}

// Funzioni per lo scanner QR
function startQRScanner() {
  const scannerContainer = document.getElementById('reader');
  document.getElementById('start-scanner').style.display = 'none';
  document.getElementById('stop-scanner').style.display = 'inline-block';
  document.getElementById('scanner-feedback').innerHTML = '<div class="alert alert-info">Scanner avviato. Punta la fotocamera verso un codice QR.</div>';
  
  if (html5QrCode) {
    html5QrCode.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: 250 },
      onQRCodeSuccess,
      onQRCodeError
    );
  } else {
    html5QrCode = new Html5Qrcode("reader");
    html5QrCode.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: 250 },
      onQRCodeSuccess,
      onQRCodeError
    );
  }
}

function stopQRScanner() {
  if (html5QrCode && html5QrCode.isScanning) {
    html5QrCode.stop().then(() => {
      document.getElementById('start-scanner').style.display = 'inline-block';
      document.getElementById('stop-scanner').style.display = 'none';
      console.log('Scanner QR fermato');
    }).catch(err => {
      console.error('Errore durante l\'arresto dello scanner:', err);
    });
  }
}

function onQRCodeSuccess(decodedText, decodedResult) {
  // Ferma lo scanner dopo una scansione riuscita
  stopQRScanner();
  
  // Verifica il codice QR
  checkQRCode(decodedText);
}

function onQRCodeError(errorMessage) {
  // Non mostrare errori per ogni frame non riuscito
  console.log('Ricerca codice QR...');
}

function checkQRCode(code) {
  const feedbackElement = document.getElementById('scanner-feedback');
  
  // Controlla se il codice corrisponde a quello atteso per questo capitolo
  const chapter = treasureHuntData.chapters[currentChapter];
  if (chapter && chapter.qrCode && code === chapter.qrCode) {
    // Codice QR corretto
    feedbackElement.innerHTML = '<div class="alert alert-success">Codice QR corretto! Sblocco del capitolo...</div>';
    
    // Passa alla visualizzazione delle domande
    setTimeout(() => {
      document.getElementById('qr-scanner-container').style.display = 'none';
      showQuestionsContainer(chapter);
    }, 1500);
  } else {
    // Codice QR errato
    feedbackElement.innerHTML = '<div class="alert alert-danger">Codice QR errato! Riprova o inserisci il codice manualmente.</div>';
  }
}

function checkManualCode() {
  const code = document.getElementById('manual-code-input').value.trim();
  if (code) {
    checkQRCode(code);
  } else {
    document.getElementById('scanner-feedback').innerHTML = '<div class="alert alert-warning">Inserisci un codice valido.</div>';
  }
}

// Utility per rilevare dispositivi mobili
function isMobile() {
  return window.innerWidth <= 768 || 
         /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Funzioni per salvare e caricare i progressi
function saveProgress() {
  try {
    const progress = {
      completedChapters,
      userAnswers,
      unlockedChapters,
      lastUpdate: new Date().toISOString()
    };
    localStorage.setItem('treasureHuntProgress', JSON.stringify(progress));
  } catch (e) {
    console.error('Errore nel salvataggio dei progressi:', e);
  }
}

function loadSavedProgress() {
  try {
    const savedProgress = localStorage.getItem('treasureHuntProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      
      // Ripristina lo stato salvato
      if (progress.completedChapters) completedChapters = progress.completedChapters;
      if (progress.userAnswers) userAnswers = progress.userAnswers;
      if (progress.unlockedChapters) unlockedChapters = progress.unlockedChapters;
      
      // Aggiorna l'interfaccia
      updateChaptersButtons();
      
      // Aggiungi marker alla mappa per i capitoli completati
      if (map && Object.keys(completedChapters).length > 0) {
        Object.keys(completedChapters).forEach(chapterIdx => {
          const idx = parseInt(chapterIdx);
          const chapter = treasureHuntData.chapters[idx];
          
          if (chapter && chapter.mapLocation) {
            addMarkerToMap(chapter.mapLocation);
          }
          
          // Se non è l'ultimo capitolo completato, mostra anche il punto successivo
          if (idx < treasureHuntData.chapters.length - 1 && chapter.nextLocation) {
            addMarkerToMap(chapter.nextLocation);
          }
        });
        
        // Se l'ultimo capitolo è completato, mostra il punto finale
        const lastIdx = treasureHuntData.chapters.length - 1;
        if (completedChapters[lastIdx]) {
          const lastChapter = treasureHuntData.chapters[lastIdx];
          if (lastChapter && lastChapter.finalLocation) {
            addMarkerToMap(lastChapter.finalLocation, true);
          }
        }
        
        // Mostra la mappa
        document.getElementById('treasure-map-container').style.display = 'block';
      }
    }
  } catch (e) {
    console.error('Errore nel caricamento dei progressi:', e);
  }
}

// Funzione placeholder per inizializzare Google Maps
function initMapPlaceholder() {
  // Non fare nulla, questa funzione viene chiamata dal callback di Google Maps
}