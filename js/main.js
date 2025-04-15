// Gestione dinamica dello sfondo
let backgrounds = [];
let loadedImages = {}; // Cache delle immagini precaricate
let lastIndex = -1; // Per evitare di mostrare lo stesso sfondo consecutivamente
let transitionInProgress = false; // Previene transizioni simultanee

function changeBackgrounds() {
  if (window.innerWidth < window.innerHeight) {
    backgrounds = [ //Foto verticali
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
    ]
  }
  else {
    backgrounds=[ //Foto orizzontali
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
    ]
  }
  window.backgrounds = backgrounds; // Mantiene accessibilità globale
  // Pulisci la cache quando cambia l'orientamento
  loadedImages = {};
  return backgrounds;
}

// Inizializzazione durante il caricamento
changeBackgrounds();

// Ricarica sfondi quando cambia l'orientamento
window.addEventListener("resize", function () {
  changeBackgrounds();
});

// Precaricamento avanzato delle immagini
function preloadImages() {
  console.log("Precaricamento immagini avanzato...");
  
  // Precarica tutte le immagini con priorità e tracking
  return Promise.all(backgrounds.map((img, index) => new Promise((resolve) => {
    // Salta se già caricata
    if (loadedImages[img]) {
      console.log(`✓ ${img} già in cache`);
      return resolve(img);
    }
    
    const preloader = new Image();
    
    // Alta priorità per le prime immagini
    if (index < 3) {
      preloader.fetchPriority = "high";
    }
    
    preloader.src = img;
    
    preloader.onload = () => {
      // Salva in cache
      loadedImages[img] = true;
      console.log(`✅ Caricata (${index + 1}/${backgrounds.length}): ${img}`);
      resolve(img);
    };
    
    preloader.onerror = () => {
      console.error(`❌ Errore nel caricamento (${index + 1}/${backgrounds.length}): ${img}`);
      resolve(null); // Risolve con null per continuare
    };
  })));
}

// Precarica le prossime n immagini in base all'indice attuale
function preloadNextImages(currentIndex, count = 2) {
  for (let i = 1; i <= count; i++) {
    const nextIndex = (currentIndex + i) % backgrounds.length;
    const nextImage = backgrounds[nextIndex];
    
    if (!loadedImages[nextImage]) {
      const img = new Image();
      img.src = nextImage;
      img.onload = () => {
        loadedImages[nextImage] = true;
        console.log(`✓ Precaricata successiva: ${nextImage}`);
      };
    }
  }
}

// Ottiene uno sfondo casuale, evitando ripetizioni consecutive e preferendo immagini già caricate
function getRandomBackground() {
  // Crea un array di indici disponibili
  let availableIndices = [];
  
  // Prima cerca tra le immagini già caricate (per velocità)
  for (let i = 0; i < backgrounds.length; i++) {
    if (i !== lastIndex && loadedImages[backgrounds[i]]) {
      availableIndices.push(i);
    }
  }
  
  // Se non ci sono immagini caricate disponibili, considera tutte tranne l'ultima usata
  if (availableIndices.length === 0) {
    for (let i = 0; i < backgrounds.length; i++) {
      if (i !== lastIndex) {
        availableIndices.push(i);
      }
    }
  }
  
  // Seleziona un indice casuale
  const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
  lastIndex = randomIndex;
  
  // Precarica le prossime immagini per mantenere fluida l'esperienza
  preloadNextImages(randomIndex);
  
  return backgrounds[randomIndex];
}

// Cambia lo sfondo con una transizione fluida e ottimizzata
function changeBackground() {
  if (transitionInProgress) return; // Previene transizioni simultanee
  
  transitionInProgress = true;
  const container = document.querySelector('.background-container');
  const currentActive = container.querySelector('.background-fade.active');
  const newBackground = document.createElement('div');
  
  newBackground.className = 'background-fade';
  const bgImage = getRandomBackground();
  newBackground.style.backgroundImage = `url('${bgImage}')`;
  
  // Inserisci il nuovo background SOTTO quello attuale
  if (currentActive) {
    container.insertBefore(newBackground, currentActive);
  } else {
    container.appendChild(newBackground);
  }
  
  // Piccolo ritardo per garantire che il DOM sia aggiornato
  requestAnimationFrame(() => {
    // Attiva il nuovo sfondo
    setTimeout(() => {
      newBackground.classList.add('active');
      
      // Rimuovi la classe active dal vecchio sfondo
      if (currentActive) {
        currentActive.classList.remove('active');
        
        // Rimuovi il vecchio sfondo dopo la transizione completa
        currentActive.addEventListener('transitionend', function handler() {
          currentActive.removeEventListener('transitionend', handler);
          currentActive.remove();
          transitionInProgress = false; // Transizione completata
        });
      } else {
        transitionInProgress = false;
      }
    }, 50);
  });
}

// Inizializzazione della mappa Google
function initMap() {
  try {
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
    
    // Creazione della mappa con impostazioni ottimizzate per mobile
    const map = new google.maps.Map(document.getElementById('map'), {
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
    });

    // Carica i dati dei punti di interesse
    fetch('programma.json')
      .then(response => {
        if (!response.ok) throw new Error('Errore nel caricamento del programma');
        return response.json();
      })
      .then(data => {
        // Punti di interesse con attività associate
        const points = [
          { 
            name: "TEATRO CLAUDIO", 
            coords: { lat: 42.15025, lng: 11.93487 }, 
            info: "",
            keywords: `<img src="iconmap/cerimonia.png" alt="Cerimonia" width="16" height="16" style="margin-right: 4px;"> Cerimonia d'apertura<br>
                     <img src="iconmap/corti.png" alt="Proiezione" width="16" height="16" style="margin-right: 4px;"> Proiezione corti<br>
                     <img src="iconmap/talento.png" alt="Talento" width="16" height="16" style="margin-right: 4px;"> Prova talento<br>
                     <img src="iconmap/battle.png" alt="Battle" width="16" height="16" style="margin-right: 4px;"> Battle<br>
                     <img src="iconmap/premiazione.png" alt="Premiazione" width="16" height="16" style="margin-right: 4px;"> Premiazione`
          },
          {
            name: "POLO CULTURALE",
            coords: { lat: 42.14987940358026, lng: 11.930005844754685 },
            info: "",
            keywords: `<img src="iconmap/parlateci.png" alt="Prova" width="16" height="16" style="margin-right: 4px;"> Prova 'Parlateci di'`
          },
          {
            name: "PIAZZA V.VENETO",
            coords: { lat: 42.149440768633525, lng: 11.937874143985388 },
            info: "",
            keywords: `<img src="iconmap/staffetta.png" alt="Staffetta" width="16" height="16" style="margin-right: 4px;"> Staffetta della Cultura<br>
                     <img src="iconmap/volley.png" alt="Volley" width="16" height="16" style="margin-right: 4px;"> Volleympiadi<br>
                     <img src="iconmap/riscaldamento.png" alt="Riscaldamento" width="16" height="16" style="margin-right: 4px;"> Riscaldamento`
          },
          {
            name: "GIARDINO DELLA VILLA COMUNALE",
            coords: { lat: 42.14849761781823, lng: 11.937441288508827 },
            info: "",
            keywords: `<img src="iconmap/registrazione.png" alt="Registrazione" width="16" height="16" style="margin-right: 4px;"> Accoglienza e registrazione<br>
                     <img src="iconmap/sorteggio.png" alt="Sorteggio" width="16" height="16" style="margin-right: 4px;"> Sorteggio prove`
          },
          {
            name: "LA ROCCA DEI FRANGIPANE",
            coords: { lat: 42.15247152653981, lng: 11.943477067877886 },
            info: "",
            keywords: `<img src="iconmap/rocca.png" alt="Tour" width="16" height="16" style="margin-right: 4px;"> "'Tolfa: un viaggio tra storia e natura' tour visita guidata della Rocca di Tolfa e sentiero 'belvedere'"`
          }
        ];

        // Aggiungi marker con animazione
        points.forEach((point, index) => {
          // Crea marker con icona personalizzata
          const markerElement = document.createElement('div');
          const markerImage = document.createElement('img');
          markerImage.src = 'iconmap/point.png';
          markerImage.style.width = '30px';
          markerImage.style.height = '40px';
          markerImage.style.filter = 'drop-shadow(2px 2px 2px rgba(0,0,0,0.5))';
          markerElement.appendChild(markerImage);
          
          // Crea marker avanzato con animazione
          setTimeout(() => {
            const marker = new google.maps.marker.AdvancedMarkerElement({
              position: point.coords,
              map: map,
              title: point.name,
              content: markerElement,
            });
            
            // Aggiunge effetto di animazione
            marker.content.classList.add('marker-animation');
            
            // Crea contenuto finestra info
            const contentString = `<div class="map-popup">
                          <h6>${point.name}</h6>
                          <p>${point.info}</p>
                          <div class="activities-box">
                            <strong>Attività:</strong><br>
                            <span>${point.keywords}</span>
                          </div>
                          <div style="text-align: center; margin-top: 10px;">
                            <a href="https://www.google.com/maps/dir/?api=1&destination=${point.coords.lat},${point.coords.lng}" 
                               class="btn btn-primary map-navigate-btn" target="_blank">
                               <img src="iconmap/nav.png" alt="Naviga" width="16" height="16" style="margin-right: 4px; vertical-align: middle;"> Naviga
                            </a>
                          </div>
                      </div>`;

            // Crea finestra info
            const infoWindow = new google.maps.InfoWindow({
              content: contentString,
              ariaLabel: point.name,
            });

            // Aggiungi listener per click sul marker
            marker.addListener("click", () => {
              // Chiudi tutte le altre info window aperte
              closeAllInfoWindows();
              
              // Apri questa info window
              infoWindow.open({
                anchor: marker,
                map
              });
              
              // Aggiungi alla lista di finestre aperte
              openInfoWindows.push(infoWindow);
            });
          }, index * 200); // Aggiunge i marker con un leggero ritardo per creare un effetto a cascata
        });
        
        // Array per tracciare finestre info aperte
        const openInfoWindows = [];
        
        // Funzione per chiudere tutte le finestre info aperte
        function closeAllInfoWindows() {
          openInfoWindows.forEach(infoWindow => infoWindow.close());
          openInfoWindows.length = 0;
        }
        
        // Aggiungi listener per chiudere le finestre info quando si clicca sulla mappa
        map.addListener("click", closeAllInfoWindows);
      })
      .catch(err => {
        console.error('Errore nel caricamento del programma:', err);
        document.getElementById('map').innerHTML = `
          <div class="map-error" style="color: white; text-align: center; padding: 20px;">
            <h3>Impossibile caricare la mappa</h3>
            <p>Controlla la connessione e ricarica la pagina</p>
          </div>`;
      });
  } catch (error) {
    console.error('Errore nell\'inizializzazione della mappa:', error);
  }
}

// Utility per rilevare dispositivi mobili
function isMobile() {
  return window.innerWidth <= 768 || 
         /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Funzioni per mostrare i programmi
function showProgram(day) {
  fetch('programma.json')
    .then(response => {
      if (!response.ok) throw new Error('Errore nel caricamento del programma');
      return response.json();
    })
    .then(data => {
      const program = data.programma.filter(item => item.data === day);
      let programHtml = `<h3>${day}</h3>`;
      program.forEach(event => {
        programHtml += `<p class="event-item"><strong>${event.ora}</strong><br>${event.attivita}${event.luogo ? `<br><span class="event-location">Presso: ${event.luogo}</span>` : ''}</p>`;
      });
      document.getElementById('programModalBody').innerHTML = programHtml;
      var myModal = new bootstrap.Modal(document.getElementById('programModal'));
      myModal.show();
      
      // Aggiunge animazione agli eventi
      setTimeout(() => {
        const events = document.querySelectorAll('.event-item');
        events.forEach((event, i) => {
          setTimeout(() => {
            event.classList.add('event-fade-in');
          }, i * 100);
        });
      }, 200);
    })
    .catch(err => {
      console.error('Errore nel caricamento del programma JSON:', err);
      document.getElementById('programModalBody').innerHTML = `
        <div class="error-message">
          <h3>Errore</h3>
          <p>Impossibile caricare il programma. Riprova più tardi.</p>
        </div>`;
      var myModal = new bootstrap.Modal(document.getElementById('programModal'));
      myModal.show();
    });
}

function showProgramPT() {
  fetch('programma-pt.json')
    .then(response => {
      if (!response.ok) throw new Error('Errore nel caricamento del programma');
      return response.json();
    })
    .then(data => {
      let programHtml = `<h3>Prova Talento</h3>`;
      data.programma.forEach((event, index) => {
        programHtml += `<p class="event-item"><strong>Prova N°${index + 1} - ${event.ora}</strong><br>${event.squadra}</p>`;
      });
      document.getElementById('programModalBody').innerHTML = programHtml;
      var myModal = new bootstrap.Modal(document.getElementById('programModal'));
      myModal.show();
      
      // Aggiunge animazione agli eventi
      setTimeout(() => {
        const events = document.querySelectorAll('.event-item');
        events.forEach((event, i) => {
          setTimeout(() => {
            event.classList.add('event-fade-in');
          }, i * 100);
        });
      }, 200);
    })
    .catch(err => {
      console.error('Errore nel caricamento del programma JSON:', err);
      document.getElementById('programModalBody').innerHTML = `
        <div class="error-message">
          <h3>Errore</h3>
          <p>Impossibile caricare il programma. Riprova più tardi.</p>
        </div>`;
      var myModal = new bootstrap.Modal(document.getElementById('programModal'));
      myModal.show();
    });
}

function showProgramPD() {
  fetch('programma-pd.json')
    .then(response => {
      if (!response.ok) throw new Error('Errore nel caricamento del programma');
      return response.json();
    })
    .then(data => {
      let programHtml = `<h3>Parlateci di...</h3>`;
      data.programma.forEach((event, index) => {
        programHtml += `<p class="event-item"><strong>Prova N°${index + 1} - ${event.ora}</strong><br>${event.squadra}</p>`;
      });
      document.getElementById('programModalBody').innerHTML = programHtml;
      var myModal = new bootstrap.Modal(document.getElementById('programModal'));
      myModal.show();
      
      // Aggiunge animazione agli eventi
      setTimeout(() => {
        const events = document.querySelectorAll('.event-item');
        events.forEach((event, i) => {
          setTimeout(() => {
            event.classList.add('event-fade-in');
          }, i * 100);
        });
      }, 200);
    })
    .catch(err => {
      console.error('Errore nel caricamento del programma JSON:', err);
      document.getElementById('programModalBody').innerHTML = `
        <div class="error-message">
          <h3>Errore</h3>
          <p>Impossibile caricare il programma. Riprova più tardi.</p>
        </div>`;
      var myModal = new bootstrap.Modal(document.getElementById('programModal'));
      myModal.show();
    });
}

// Esporta funzioni per accessibilità globale
window.showProgram = showProgram;
window.showProgramPT = showProgramPT;
window.showProgramPD = showProgramPD;

// Inizializzazione al caricamento della pagina
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Avvia precaricamento con timeout di sicurezza
    await Promise.race([
      preloadImages(),
      new Promise(resolve => setTimeout(resolve, 5000))
    ]);
    
    // Rimuovi il loader e mostra il contenuto
    const loader = document.querySelector('.loader');
    if (loader) loader.remove();
    
    // Mostra il contenuto con fade-in
    const contentElements = document.querySelectorAll('.content');
    contentElements.forEach(content => {
      if (content) content.style.opacity = '1';
    });

    // Imposta lo sfondo iniziale e avvia la rotazione
    const initialBg = document.querySelector('.background-fade');
    if (initialBg) {
      initialBg.style.backgroundImage = `url('${getRandomBackground()}')`;
      initialBg.classList.add('active');
      setInterval(changeBackground, 7000);
    } else {
      console.error("Elemento sfondo (.background-fade) non trovato!");
    }
    
    // Animazioni scroll
    document.addEventListener('scroll', function() {
      const scrollElements = document.querySelectorAll('.scroll-fade');
      scrollElements.forEach(element => {
        if (isElementInViewport(element)) {
          element.classList.add('visible');
        }
      });
    });
    
    // Animazione smooth scroll per i link di navigazione
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Chiudi navbar mobile se aperta
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
          navbarToggler.click();
        }
        
        // Offset diverso per mobile (header più piccolo)
        const offset = isMobile() ? -70 : -100;
        const targetElement = document.querySelector(this.getAttribute('href'));
        
        if (targetElement) {
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: targetPosition + offset,
            behavior: 'smooth'
          });
        }
      });
    });

    // Gestione eventi touch per dispositivi mobili
    if (isMobile()) {
      // Disabilita lo zoom della mappa quando si fa scroll sulla pagina
      document.addEventListener('touchstart', function(e) {
        if (!e.target.closest('#map')) {
          const mapElement = document.getElementById('map');
          if (mapElement) mapElement.style.pointerEvents = 'none';
        }
      }, { passive: true });

      document.addEventListener('touchend', function() {
        const mapElement = document.getElementById('map');
        if (mapElement) mapElement.style.pointerEvents = 'auto';
      }, { passive: true });
    }

    // Aggiunge la classe "mobile" al body per stili specifici
    if (isMobile()) {
      document.body.classList.add('mobile-device');
    }

    // Aggiorna la classe mobile quando cambia la dimensione dello schermo
    window.addEventListener('resize', function() {
      if (isMobile()) {
        document.body.classList.add('mobile-device');
      } else {
        document.body.classList.remove('mobile-device');
      }
    });

  } catch (error) {
    console.error('Errore inizializzazione:', error);
    const loader = document.querySelector('.loader');
    if (loader) loader.remove();
    
    const contentElements = document.querySelectorAll('.content');
    contentElements.forEach(content => {
      if (content) {
        content.style.opacity = '1';
        content.innerHTML += `
          <div class="error-container">
            <h1>Errore nel caricamento</h1>
            <p>Aggiornare la pagina o controllare la connessione</p>
            <button onclick="location.reload()" class="btn btn-primary">Ricarica pagina</button>
          </div>
        `;
      }
    });
  }
});

// Funzione di utilità per controllare se un elemento è nel viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
    rect.bottom >= 0
  );
}
