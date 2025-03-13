document.addEventListener("DOMContentLoaded", function() {
    
    fetch('programma-pt.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('programma-pt-content');
      const programma = data['programma-pt'];
      
      // Crea la tabella
      const pttable = document.createElement('pttable');
      pttable.className = 'table table-striped'; // Stile Bootstrap
      
      // Intestazione della tabella
      const thead = `
        <thead>
          <tr>
            <th>Data</th>
            <th>Ora</th>
            <th>Attività</th>
          </tr>
        </thead>
      `;
      
      // Corpo della tabella
      const tbody = document.createElement('tbody');
      programma.forEach(item => {
        tbody.innerHTML += `
          <tr>
            <td>${item.data}</td>
            <td>${item.ora}</td>
            <td>${item.attivita}</td>
          </tr>
        `;
      });

      pttable.innerHTML = thead;
      pttable.appendChild(tbody);
      container.appendChild(pttable);
    })
    .catch(error => console.error('Errore nel caricamento dei dati:', error));
});