document.addEventListener('DOMContentLoaded', () => {
    const pending = document.getElementById('pending');
    const table = document.querySelector('.table');
  
    pending.addEventListener('shown.bs.collapse', () => {
      table.classList.add('pending-open');
    });
  
    pending.addEventListener('hidden.bs.collapse', () => {
      table.classList.remove('pending-open');
    });
  });

  const dimmerbtn = document.getElementById('dimmerSelect')
  const tableDiv = document.getElementById('modal-table-div')
  const addressCount = document.getElementById("number").value
  const instrubtn = document.getElementById('otherInstrument')

  instrubtn.addEventListener('click', ()=>{
    tableDiv.innerHTML = ''
  })

dimmerbtn.addEventListener('click', ()=>{
    const addressCount = document.getElementById("number").value
    tableDiv.innerHTML = '';
    const table = document.createElement('table');
    table.classList.add('table', 'table-bordered');

    const thead = document.createElement('thead');
    thead.innerHTML = `
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
      </tr>
    `;
    table.appendChild(thead);
    

    const tbody = document.createElement('tbody');
    for (let i = 1; i <= addressCount; i++) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <th scope="row">${i}</th>
        <td><input type="text" class="form-control" name="address${i}" placeholder=""></td>
      `;
      tbody.appendChild(row);
    }

    table.appendChild(tbody);
    tableDiv.appendChild(table);

});




  

