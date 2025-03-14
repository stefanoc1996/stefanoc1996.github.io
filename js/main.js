document.addEventListener("DOMContentLoaded", function() {
  function initMap() {
      // Inizializza la mappa con il centro predefinito
      var center = { lat: 42.14944, lng: 11.93806 };
      var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 17,
          center: center,
          mapTypeId: 'roadmap'
      });

      // Punti di interesse
      const points = [
          { 
              name: "TEATRO CLAUDIO", 
              coords: { lat: 42.15025, lng: 11.93487 }, 
              info: "Via Teatro Claudio, 1"
          },
          {
              name: "LA ROCCA",
              coords: { lat: 42.15214183489226, lng: 11.944040910485032 },
              info: "Fortezza medievale"
          },
          {
              name: "COMUNE",
              coords: { lat: 42.149440768633525, lng: 11.937874143985388 },
              info: "Municipio di Tolfa"
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
                        </div>`
          });

          marker.addListener("click", function() {
              infoWindow.open(map, marker);
          });
      });
  }

  window.initMap = initMap;


  
    fetch('programma.json')
    .then(response => response.json())
    .then(data => {
      // Costruisci l'HTML della tabella
      let tableHTML = `<div class="programma-table shadow-lg">
        <div class="table-responsive">
          <table class="table table-hover align-middle">
            <thead class="table-dark">
              <tr>
                <th scope="col">Data</th>
                <th scope="col">Attività</th>
                <th scope="col">ora</th>
              </tr>
            </thead>
            <tbody>`;
      data.programma.forEach(item => {
        tableHTML += `<tr>
          <td>${item.data}</td>
          <td>${item.attivita}</td>
          <td>${item.ora}</td>
        </tr>`;
      });
      tableHTML += `</tbody>
          </table>
        </div>
      </div>`;
      // Inserisci la tabella nel contenitore
      document.getElementById('programma-content').innerHTML = tableHTML;
    })
    .catch(err => console.error('Errore nel caricamento del programma JSON:', err));
});