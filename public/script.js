
let user = 'Ms. Kellogg';

const intro = document.getElementById('hi')

document.addEventListener('DOMContentLoaded', () => { //show + hide pending sidebar + enlarging and shrinking table
    const pending = document.getElementById('pending');
    const table = document.querySelector('.content-wrapper');
    const pendingbtn = document.getElementById('pendingbtn')
   
  
    pending.addEventListener('shown.bs.collapse', () => {
      table.classList.add('pending-open');
      pendingbtn.innerText='Hide Changelog'
    });
  
    pending.addEventListener('hidden.bs.collapse', () => {
      table.classList.remove('pending-open');
      pendingbtn.innerText='Show Changelog'
    });

    user = JSON.parse(localStorage.getItem('user')) || 'Ms. Kellogg'; //change user on the front part
    intro.innerText =  `Hi ${user}` 
    

  });

  const initForm = document.getElementById('newInstruForm')

  initForm.addEventListener('submit', function () {

    document.getElementById('userInput').value = user; //passing user through to controller
  
  });

   //below for dynamically making table when initializing new instrument
  const tableDiv = document.getElementById('modal-table-div')
  const addressInput = document.getElementById("number")
 

 

addressInput.addEventListener('input', ()=>{
    const addressCount = addressInput.value
    tableDiv.innerHTML = '';
    const table = document.createElement('table');
    table.classList.add('table', 'table-bordered');

    const thead = document.createElement('thead');
    thead.innerHTML = `
      <tr>
        <th scope="col">#</th>
        <th scope="col">Instrument type (if needed)</th>
      </tr>
    `;
    table.appendChild(thead);
    

    const tbody = document.createElement('tbody');
    for (let i = 1; i <= addressCount; i++) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <th scope="row">${i}</th>
        <td><input type="text" class="form-control" name="lightlist[]" placeholder=""></td>
      `;
      tbody.appendChild(row);
    }

    table.appendChild(tbody);
    tableDiv.appendChild(table);

});


document.querySelectorAll('.editable').forEach(td => {
  td.addEventListener('click', function () {
    // Prevent re-entering input mode
    if (td.querySelector('input')) return;

    // Save and exit from any currently open input
    const openInput = document.querySelector('.editable input');
    if (openInput) {
      const parentTd = openInput.closest('td');
      parentTd.textContent = openInput.value.trim();
    }

    // Make current td editable
    const text = td.textContent.trim();
    td.innerHTML = `<input type="text" class="form-control" name="lightlist[]" value="${text}" placeholder="${text}">`;

    const input = td.querySelector('input');
    input.focus();

    // Handle Enter key to save
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        td.textContent = input.value.trim();
      }
    });
  });
});


let rowsopen = false

function toggleRows(idx) {
  
  document.querySelectorAll('.details-' + idx).forEach(row => {
    if(rowsopen){
    row.classList.add('hidden-rows');
    } else {
      row.classList.remove('hidden-rows');
    }
    
  });
  rowsopen = !rowsopen
}





document.querySelectorAll('.dropdown-item').forEach(item => {
  item.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default anchor behavior
    user = this.getAttribute('data-user');
    localStorage.setItem('user', JSON.stringify(user));
    intro.innerText =  `Hi ${user}`
    console.log(user)
    
  });
});




  

