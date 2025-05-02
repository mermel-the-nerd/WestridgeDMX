
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

  const dimmerbtn = document.getElementById('multiple') //below for dynamically making table when initializing new instrument
  const tableDiv = document.getElementById('modal-table-div')
  const addressCount = document.getElementById("number").value
  const instrubtn = document.getElementById('single')

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
        <td><input type="text" class="form-control" name="lightlist[]" placeholder=""></td>
      `;
      tbody.appendChild(row);
    }

    table.appendChild(tbody);
    tableDiv.appendChild(table);

});


document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".edit").forEach(button => {
    button.addEventListener("click", (e) => {
      if (button.textContent.trim() === 'Edit') {
        // First click — prevent navigation
        e.preventDefault();

        const accordionBody = button.closest(".accordion-body");

        // Convert td text to inputs
        accordionBody.querySelectorAll("td").forEach(td => {
          const text = td.textContent.trim();
          td.innerHTML = `<input type="text" class="form-control" name="lightlist[]" placeholder="${text}" value="${text}">`;
        });

        const notes = accordionBody.querySelector('.notes')
        const textnotes = notes.textContent.trim();
        notes.innerHTML = `<textarea name="notes" id="notes" class="form-control" rows="5" placeholder="${textnotes}"></textarea>`

        // Update class and text
        
        button.classList.remove('btn-success');
        button.classList.add('btn-primary');

        button.setAttribute('type','submit')

        button.textContent = 'Save';
      }
      // Else, it's the second click — let the link navigate
    });
  });
});






document.querySelectorAll('.dropdown-item').forEach(item => {
  item.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default anchor behavior
    user = this.getAttribute('data-user');
    localStorage.setItem('user', JSON.stringify(user));
    intro.innerText =  `Hi ${user}`
    console.log(user)
    
  });
});




  

