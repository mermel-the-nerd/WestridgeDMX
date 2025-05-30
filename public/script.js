
let user = 'Ms. Kellogg';

const intro = document.getElementById('hi')

document.addEventListener('DOMContentLoaded', () => { //show + hide pending sidebar + enlarging and shrinking table
    const pending = document.getElementById('pending');
    const table = document.getElementById('tableDiv');
    const pendingbtn = document.getElementById('pendingbtn')
    const pendingclose = document.getElementById('pendingclose')

  
    

    pendingclose.addEventListener('click', () => {
      
table.classList.remove('pending-open');
table.classList.add('col', 'flex-grow-1')
      pendingbtn.innerText='Show Changelog'
    }
  )
  
    pending.addEventListener('shown.bs.collapse', () => {
      table.classList.add('pending-open');
      table.classList.remove('col', 'flex-grow-1'); //
      table.style.width = 'calc(100% - 320px)'
      pendingbtn.innerText='Hide Changelog'
    });
  
    pending.addEventListener('hidden.bs.collapse', () => {
      table.classList.remove('pending-open');
      table.classList.add('col', 'flex-grow-1')
      // table.style.width = '';
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
 

 

addressInput.addEventListener('input', ()=>{ //dynamically making the table for the new instrument view
    const addressCount = addressInput.value
    
    const addressDrop = document.getElementById('addressSelect')
    addressDrop.innerHTML = '<option value="select">Select Address</option>'
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


    emptyBlocks.forEach(block=>{
if(block.length>=addressCount){
  if(addressCount===`1`){
     addressDrop.innerHTML+=` <option value="${block[0]}">${block[0]}</option>`
  } else {
    
  addressDrop.innerHTML+=` <option value="${block[0]}">${block[0]}-${block[addressCount-1]}</option>`
}
}
    })

});


document.querySelectorAll('.editable').forEach((td) => {
  td.addEventListener('click', function () {
    // Prevent re-entering input mode
    if (td.querySelector('input')) return;

    // Save and exit from any currently open input
    // const openInput = document.querySelector('.editable input');
    // if (openInput) {
    //   const parentTd = openInput.closest('td');
    //   if (parentForm) {
    //     parentForm.submit(); // ✅ Submit the existing open form
    //     return; // ⛔ Stop here to wait for redirect before editing another cell
    //   }
    // }

    const realIndex = td.getAttribute('data-index');
    const formID = `edit-form-${realIndex}`;
    const instrumentId = td.getAttribute('data-id');

    // Make current td editable
    const text = td.textContent.trim();
    td.innerHTML = `<form id="${formID}" action="/save/${instrumentId}?index=${realIndex}" method="POST"><input type="text" class="form-control" name="light" value="${text}" placeholder="${text}"></form>`;

    const input = td.querySelector('input');
    input.focus();

    // Handle Enter key to save
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        document.getElementById(formID).submit();
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




  

