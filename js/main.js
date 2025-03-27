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
  window.backgrounds = backgrounds; // Make it globally accessible
  return backgrounds;
}
changeBackgrounds();

window.addEventListener("resize", function () {
  changeBackgrounds();
});

function preloadImages() {
  console.log("Attempting to load images:", backgrounds);
  
  return Promise.all(backgrounds.map(img => new Promise((resolve) => {
    const preloader = new Image();
    preloader.src = img;
    
    preloader.onload = () => {
      console.log(`✅ Successfully loaded: ${img}`);
      resolve();
    };
    
    preloader.onerror = () => {
      console.error(`❌ Failed to load image: ${img}`);
      resolve(); // Resolve anyway to continue loading other images
    };
  })));
}

function getRandomBackground() {
  return backgrounds[Math.floor(Math.random() * backgrounds.length)];
}

function changeBackground() {
  const container = document.querySelector('.background-fade');
  const newBackground = document.createElement('div');
  newBackground.className = 'background-fade';
  newBackground.style.backgroundImage = `url('${getRandomBackground()}')`;
  
  container.parentNode.appendChild(newBackground);
  setTimeout(() => {
    newBackground.classList.add('active');
    setTimeout(() => container.remove(), 1500);
  }, 100);
}

document.addEventListener("DOMContentLoaded", function() {
  function initMap() {
    // Inizializza la mappa con il centro predefinito
    var center = { lat: 42.149224, lng: 11.93406 };
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: center,
      mapTypeId: 'satellite',
      mapId: '414892f452311cd1'
    });

    // Carica il programma per arricchire i marker
    fetch('programma.json')
      .then(response => response.json())
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
            keywords: `<img src="iconmap/rocca.png" alt="Tour" width="16" height="16" style="margin-right: 4px;"> "'Tolfa: un viaggio tra storia e natura' Partenza primo 1° tour visita guidata della Rocca di Tolfa e sentiero 'belvedere'"`
          }
        ];

        // Aggiungi marker
        points.forEach(point => {
          // Create marker content element
          const markerView = new google.maps.marker.PinView({
            background: '#1E88E5',
            borderColor: '#0D47A1',
            glyphColor: '#FFFFFF',
          });

          // Create advanced marker
          const marker = new google.maps.marker.AdvancedMarkerElement({
            position: point.coords,
            map: map,
            title: point.name,
            content: markerView.element,
          });

          // Create info window content
          const contentString = `<div class="map-popup" style="color: black;">
                          <h6 style="color: black; font-weight: bold;">${point.name}</h6>
                          <p style="color: black;">${point.info}</p>
                          <div class="activities-box" style="margin: 8px 0; padding: 8px; background-color: #f8f9fa; border-radius: 4px; color: black;">
                            <strong style="color: black;">Attività:</strong><br>
                            <span style="color: black;">${point.keywords}</span>
                          </div>
                          <div style="text-align: center; margin-top: 10px;">
                            <a href="geo:${point.coords.lat},${point.coords.lng}" 
                               class="btn btn-primary map-navigate-btn" style="width: auto; padding: 6px 12px; display: inline-block; margin: 0 auto;">
                               <img src="iconmap/nav.png" alt="Naviga" width="16" height="16" style="margin-right: 4px; vertical-align: middle;"> Naviga
                            </a>
                          </div>
                      </div>`;

          // Create info window
          const infoWindow = new google.maps.InfoWindow({
            content: contentString,
          });

          // Add click listener to marker
          marker.addListener("click", () => {
            infoWindow.open({
              anchor: marker,
              map
            });
          });
        });
      })
      .catch(err => {
        console.error('Errore nel caricamento del programma:', err);
        // Fallback with advanced markers
        const points = [
          { 
            name: "TEATRO CLAUDIO", 
            coords: { lat: 42.15025, lng: 11.93487 }, 
            info: "Via Teatro Claudio, 1"
          },
          {
            name: "POLO CULTURALE",
            coords: { lat: 42.14987940358026, lng: 11.930005844754685 },
            info: "Polo Culturale di Tolfa"
          },
          {
            name: "PIAZZA V.VENETO",
            coords: { lat: 42.149440768633525, lng: 11.937874143985388 },
            info: "-Staffetta della Cultura-"
          },
          {
            name: "GIARDINO DELLA VILLA COMUNALE",
            coords: { lat: 42.14849761781823, lng: 11.937441288508827 },
            info: "Registrazione"
          },
          {
            name: "NUOVO PUNTO",
            coords: { lat: 42.15247152653981, lng: 11.943477067877886 },
            info: "Descrizione punto"
          }
        ];

        // Add markers using Advanced Markers API
        points.forEach(point => {
          const markerView = new google.maps.marker.PinView({
            background: '#1E88E5',
            borderColor: '#0D47A1',
            glyphColor: '#FFFFFF',
          });

          const marker = new google.maps.marker.AdvancedMarkerElement({
            position: point.coords,
            map: map,
            title: point.name,
            content: markerView.element,
          });

          const contentString = `<div class="map-popup">
                      <h6>${point.name}</h6>
                      <p>${point.info}</p>
                      <a href="https://www.google.com/maps/dir/?api=1&destination=${point.coords.lat},${point.coords.lng}" 
                         target="_blank" class="btn btn-sm btn-primary">
                         ➡️
                      </a>
                  </div>`;

          const infoWindow = new google.maps.InfoWindow({
            content: contentString,
          });

          marker.addListener("click", () => {
            infoWindow.open({
              anchor: marker,
              map
            });
          });
        });
      });
  }

  window.initMap = initMap;

  function showProgram(day) {
    fetch('programma.json')
      .then(response => response.json())
      .then(data => {
        const program = data.programma.filter(item => item.data === day);
        let programHtml = `<h3>${day}</h3>`;
        program.forEach(event => {
          programHtml += `<p><strong style="color: #33AEFF;">${event.ora}</strong><br>${event.attivita}${event.luogo ? `<br><span style="font-weight: 600; color: #ff9d00;">Presso:</span> ${event.luogo}` : ''}</p>`;
        });
        document.getElementById('programModalBody').innerHTML = programHtml;
        var myModal = new bootstrap.Modal(document.getElementById('programModal'));
        myModal.show();
      })
      .catch(err => console.error('Errore nel caricamento del programma JSON:', err));
  }

  window.showProgram = showProgram;

  function showProgramPT() {
    fetch('programma-pt.json')
      .then(response => response.json())
      .then(data => {
        let programHtml = `<h3>Prova Talento</h3>`;
        data.programma.forEach((event, index) => {
          programHtml += `<p><strong style="color: #33AEFF;">Prova N°${index + 1} - ${event.ora}</strong><br>${event.squadra}</p>`;
        });
        document.getElementById('programModalBody').innerHTML = programHtml;
        var myModal = new bootstrap.Modal(document.getElementById('programModal'));
        myModal.show();
      })
      .catch(err => console.error('Errore nel caricamento del programma JSON:', err));
  }

  window.showProgramPT = showProgramPT;

  function showProgramPD() {
    fetch('programma-pd.json')
      .then(response => response.json())
      .then(data => {
        let programHtml = `<h3>Parlateci di...</h3>`;
        data.programma.forEach((event, index) => {
          programHtml += `<p><strong style="color: #33AEFF;">Prova N°${index + 1} - ${event.ora}</strong><br>${event.squadra}</p>`;
        });
        document.getElementById('programModalBody').innerHTML = programHtml;
        var myModal = new bootstrap.Modal(document.getElementById('programModal'));
        myModal.show();
      })
      .catch(err => console.error('Errore nel caricamento del programma JSON:', err));
  }

  window.showProgramPD = showProgramPD;

});

document.addEventListener('DOMContentLoaded', async () => {
  try {
    await Promise.race([
      preloadImages(),
      new Promise(resolve => setTimeout(resolve, 5000))
    ]);
    
    // Check if elements exist before using them
    const loader = document.querySelector('.loader');
    if (loader) loader.remove();
    
    const content = document.querySelector('.content');
    if (content) content.style.opacity = '1';

    const initialBg = document.querySelector('.background-fade');
    if (initialBg) {
      initialBg.style.backgroundImage = `url('${getRandomBackground()}')`;
      initialBg.classList.add('active');
      setInterval(changeBackground, 7000);
    } else {
      console.error("Background element (.background-fade) not found!");
    }

  } catch (error) {
    console.error('Errore inizializzazione:', error);
    const content = document.querySelector('.content');
    if (content) {
      content.innerHTML = `
        <h1>Errore nel caricamento</h1>
        <p>Aggiornare la pagina o controllare la connessione</p>
      `;
    }
  }
});
