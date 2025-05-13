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

  document.addEventListener("DOMContentLoaded", () => { //edit button functionality
    document.querySelectorAll(".edit").forEach(button => {
      button.addEventListener("click", (e) => {
        
        if (button.textContent.trim() === 'Edit') {
          // First click — prevent navigation
          e.preventDefault();
  
          const accordionBody = button.closest("td");
  
          // Convert td text to inputs
          accordionBody.querySelectorAll(".instrument-name").forEach(td => {
            const text = td.textContent.trim();
          
            td.innerHTML = `<input type="text" class="form-control" name="name" placeholder="${text}" value="${text}">`;
          });
  
          
  
          //td.innerHTML = `<input type="text" class="form-control" name="lightlist[]" placeholder="${text}" value="${text}">`;
  
          // const notes = accordionBody.querySelector('.notes')
          // const textnotes = notes.textContent.trim();
          // notes.innerHTML = `<textarea name="notes" id="notes" class="form-control" rows="5" placeholder="${textnotes}"></textarea>`
  
          // Update class and text
          
          button.classList.remove('btn-success');
          button.classList.add('btn-primary');
  
          button.setAttribute('type','submit')
  
          button.textContent = 'Save';
  
  
  
          const tr = button.closest("tr");
  
          // Try to find the lightlist button (only exists if dmxtype is "multiple")
          const lightlistBtn = tr.querySelector("button.open");
  
          if (lightlistBtn) {
            openLightlist(lightlistBtn); // Call your existing function
  
          }
          setTimeout(() => {
            const expandedRow = tr.nextElementSibling;
            if (expandedRow && expandedRow.classList.contains('expanded-row')) {
            const inputs = expandedRow.querySelectorAll(".lightlist");
            
              inputs.forEach((td, index) => {
                const value = td.textContent.trim();
                td.innerHTML = `<input type="text" class="form-control" name="lightlist[]" value="${value}" placeholder="${value}">`;
                //td.innerHTML = `<input type="text" class="form-control" name="lightlist[]" placeholder="${text}" value="${text}">`;
              });
            }
          }, 0); // use 0 to defer execution after DOM is updated
        }
        // Else, it's the second click — let the link navigate
      });
    });
  });
  