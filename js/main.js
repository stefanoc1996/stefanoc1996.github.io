document.addEventListener("DOMContentLoaded", function() {
    // Inizializza mappa
    const map = L.map('map').setView([42.14944, 11.93806], 17);
    
// Usa un layer alternativo con più dettagli
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap',
    maxZoom: 25,
    minZoom: 15
}).addTo(map);

    // Punti di interesse
    const points = [
        { 
            name: "TEATRO CLAUDIO", 
            coords: [42.15025, 11.93487], 
            info: "Via Teatro Claudio, 1",
            icon: L.icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
                iconSize: [25, 41]
            })
        },
        {
            name: "LA ROCCA",
            coords: [42.15214183489226, 11.944040910485032],
            info: "Fortezza medievale"
        },
        {
            name: "COMUNE",
            coords: [42.149440768633525, 11.937874143985388],
            info: "Municipio di Tolfa"
        }
    ];

    // Aggiungi marker
    points.forEach(point => {
        L.marker(point.coords, {
            opacity: 0.9,
            title: point.name
        }).addTo(map)
        .bindPopup(`<div class="map-popup">
                      <h6>${point.name}</h6>
                      <p>${point.info}</p>
                    </div>`);
    });

    L.control.scale({ imperial: false }).addTo(map)
    // Adatta la mappa al resize
    window.addEventListener('resize', () => map.invalidateSize());
});