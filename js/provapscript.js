document.addEventListener("DOMContentLoaded", function() {
    fetch('programma-pd.json')
      .then(response => response.json())
      .then(data => {
        // Costruisci l'HTML della tabella con limiti e scrolling
        let tableHTML = `
        <div class="programma-pd-table shadow-lg rounded">
          <div class="table-responsive overflow-auto" style="max-height: 55vh;">
            <table class="table table-striped table-hover align-middle mb-0">
              <thead class="table-dark">
                <tr>
                  <th scope="col">DATA</th>
                  <th scope="col">SQUADRA</th>
                  <th scope="col">Ora</th>
                </tr>
              </thead>
              <tbody>`;
        
        data["programma"].forEach(item => {
          tableHTML += `
                <tr>
                  <td class="fw-bold">${item.data}</td>
                  <td>${item.squadra}</td>
                  <td>${item.ora}</td>
                </tr>`;
        });
        
        tableHTML += `
              </tbody>
            </table>
          </div>
        </div>`;
        
        document.getElementById('programma-pd-content').innerHTML = tableHTML;
      })
      .catch(err => console.error('Errore nel caricamento del programma JSON:', err));
  });
  