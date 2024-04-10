// Wait for the HTML content to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Get data from table element 
    const userForm = document.getElementById('userForm');
    const userTableBody = document.getElementById('userTableBody');

    // Add event listener  to the submit form for thr use
    userForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission behavior
        
        // Get inpuuts
        const name = document.getElementById('name').value;
        const mobile = document.getElementById('mobile').value;
        const email = document.getElementById('email').value;

        // Check if all fields are filled
        if (name && mobile && email) {
            // If all fields are filled, add user to the table
            addUserToTable(name, mobile, email);
            clearForm(); // Clear the form fields
        } else {
            // If any field is empty, show an alert 
            alert('Please fill in all fields');
        }
    });

    // Add event listener to the user table body for handling edit and delete actions
    userTableBody.addEventListener('click', function (e) {
        // Check which button was clicked
        if (e.target.classList.contains('delete-btn')) {
            // If delete button was clicked, remove the corresponding row
            const row = e.target.closest('tr');
            row.remove();
        } else if (e.target.classList.contains('edit-btn')) {
    
            const row          =  e.target.closest('tr');
            editUser(row);
        } else if (e.target.classList.contains('save-btn')) {
            // If save button was clicked, save the edited user details
            const row = e.target.closest('tr');
            saveUser(row);
        }
    });

    // Function to add a new user   to the  table
    function     addUserToTable(name, mobile, email) {
        const row = document.createElement('tr');
        // Populate the row with user details and action buttons
        row.innerHTML = `
            <td>${name}</td>
            <td>${mobile}</td>
            <td>${email}</td>
            <td>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;
        userTableBody.appendChild(row); // Add the row to the table body
    }

    // Function to clear the form fields
    function clearForm() {
        document.getElementById('name').value = '';
        document.getElementById('mobile').value = '';
        document.getElementById('email').value = '';
    }

    // Function to allow editing of user details
    function editUser(row) {
        // Get the user details from the row
        const cells = row.querySelectorAll('td');
        const name = cells[0].innerText;
        const mobile = cells[1].innerText;
        const email = cells[2].innerText;

        // Replace the user details with input fields for editing
        cells[0].innerHTML = `<input type="text" value="${name}">`;
        cells[1].innerHTML = `<input type="text" value="${mobile}">`;
        cells[2].innerHTML = `<input type="email" value="${email}">`;

        // Change the button text and class for saving the changes
        const editBtn = row.querySelector('.edit-btn');
        editBtn.innerText = 'Save';
        editBtn.classList.remove('edit-btn');
        editBtn.classList.add('save-btn');
    }

    // Function to save the edited user details
    function saveUser(row) {
        // Get the edited user details from the input fields
        const cells = row.querySelectorAll('td');
        const name = cells[0].querySelector('input').value;
        const mobile = cells[1].querySelector('input').value;
        const email = cells[2].querySelector('input').value;

        // Replace the input fields with the updated user details
        cells[0].innerHTML = name;
        cells[1].innerHTML = mobile;
        cells[2].innerHTML = email;

        // Change the button text and class back to edit mode
        const editBtn = row.querySelector('.save-btn');
        editBtn.innerText = 'Edit';
        editBtn.classList.remove('save-btn');
        editBtn.classList.add('edit-btn');
    }
});
