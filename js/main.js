document.addEventListener("DOMContentLoaded", function() {
  function initMap() {
    // Inizializza la mappa con il centro predefinito
    var center = { lat: 42.149224, lng: 11.93406 };
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: center,
      mapTypeId: 'satellite'
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
          }
        ];

        // Aggiungi marker
        points.forEach(point => {
          var marker = new google.maps.Marker({
            position: point.coords,
            map: map,
            title: point.name
          });

          var infoWindow = new google.maps.InfoWindow({
            content: `<div class="map-popup" style="color: black;">
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
                      </div>`
          });

          marker.addListener("click", function() {
            infoWindow.open(map, marker);
          });
        });
      })
      .catch(err => {
        console.error('Errore nel caricamento del programma:', err);
        // Fallback se il caricamento del programma fallisce
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
          }
        ];

        // Aggiungi marker
        points.forEach(point => {
          var marker = new google.maps.Marker({
            position: point.coords,
            map: map,
            title: point.name
          });

          var infoWindow = new google.maps.InfoWindow({
            content: `<div class="map-popup">
                          <h6>${point.name}</h6>
                          <p>${point.info}</p>
                          <a href="https://www.google.com/maps/dir/?api=1&destination=${point.coords.lat},${point.coords.lng}" 
                             target="_blank" class="btn btn-sm btn-primary">
                             ➡️
                          </a>
                      </div>`
          });

          marker.addListener("click", function() {
            infoWindow.open(map, marker);
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