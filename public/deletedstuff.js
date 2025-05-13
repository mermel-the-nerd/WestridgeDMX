function openLightlist(button){
    const tr = button.closest('tr');

    // Check if the next row is already the expanded table
    const nextRow = tr.nextElementSibling;
    if (nextRow && nextRow.classList.contains('expanded-row')) {
      nextRow.remove(); // Remove the table row if already open
      return;
    }

    // Get data attributes
    const startAddress = parseInt(button.getAttribute('data-start'), 10);
    const lightlist = JSON.parse(button.getAttribute('data-lightlist'));

    // Create table
    const table = document.createElement('table');
    table.classList.add('table', 'table-bordered', 'mt-3');

    const thead = document.createElement('thead');
    thead.innerHTML = `
      <tr>
        <th scope="col">#</th>
        <th scope="col">Instrument</th>
      </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    tbody.innerHTML = lightlist.map((light, index) => {
      return `
        <tr>
          <th scope="row">${startAddress + index}</th>
          <td class='lightlist'>${light}</td>
        </tr>
      `;
    }).join('');
    table.appendChild(tbody);

    // Wrap table in new row
    const newRow = document.createElement('tr');
    newRow.classList.add('expanded-row'); // So we can detect it later
    const newCell = document.createElement('td');
    newCell.colSpan = tr.children.length;
    newCell.appendChild(table);
    newRow.appendChild(newCell);

    tr.parentNode.insertBefore(newRow, tr.nextSibling);
  };

 
  document.addEventListener("DOMContentLoaded", () => {
    // Handle lightlist toggle buttons
    document.querySelectorAll(".btn.open").forEach(button => {
      button.addEventListener("click", () => {
        openLightlist(button);
      });
    });
  });

