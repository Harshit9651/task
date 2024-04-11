document.addEventListener('DOMContentLoaded', function () {
    const userForm = document.getElementById('userForm');
    const userTableBody = document.getElementById('userTableBody');
    const searchInput = document.getElementById('searchInput');
    userForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const mobile = document.getElementById('mobile').value;
        const email = document.getElementById('email').value;

        if (!validateName(name)) {
            alert('Please enter a valid name without special characters.');
            return;
        }

        if (!validateMobile(mobile)) {
            alert('Please enter a valid mobile number with exactly 10 digits.');
            return;
        }

        if (!name || !mobile || !email) {
            alert('Please fill in all fields');
            return;
        }

        addUserToTable(name, mobile, email);
        clearForm();
    });

    function validateName(name) {
        const regex = /^[a-zA-Z\s]*$/;
        return regex.test(name);
    }

    function validateMobile(mobile) {
        const regex = /^\d{10}$/;
        return regex.test(mobile);
    }

    function addUserToTable(name, mobile, email) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${name}</td>
            <td>${mobile}</td>
            <td>${email}</td>
            <td>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;
        userTableBody.appendChild(row);
    }

    function clearForm() {
        document.getElementById('name').value = '';
        document.getElementById('mobile').value = '';
        document.getElementById('email').value = '';
    }

    // Event listener for handling edit and delete actions
    userTableBody.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete-btn')) {
            const row = e.target.closest('tr');
            row.remove();
        } else if (e.target.classList.contains('edit-btn')) {
            const row = e.target.closest('tr');
            editUser(row);
        } else if (e.target.classList.contains('save-btn')) {
            const row = e.target.closest('tr');
            saveUser(row);
        }
    });
    
    function editUser(row) {
        const cells = row.querySelectorAll('td');
        let name = cells[0].innerText;
        let mobile = cells[1].innerText;
        const email = cells[2].innerText;
    
        // Remove special characters from the name
        name = name.replace(/[^a-zA-Z ]/g, '');
    
        // Keep only the first 10 digits in the mobile number
        mobile = mobile.replace(/\D/g, '').slice(0, 10);
    
        cells[0].innerHTML = `<input type="text" value="${name}">`;
        cells[1].innerHTML = `<input type="text" value="${mobile}">`;
        cells[2].innerHTML = `<input type="email" value="${email}">`;
    
        const editBtn = row.querySelector('.edit-btn');
        editBtn.innerText = 'Save';
        editBtn.classList.remove('edit-btn');
        editBtn.classList.add('save-btn');
    }
//new upadte for add credantials 
    function saveUser(row) {
        const cells = row.querySelectorAll('td');
        const nameInput = cells[0].querySelector('input');
        const mobileInput = cells[1].querySelector('input');
        const emailInput = cells[2].querySelector('input');

        const name = nameInput.value.trim(); // Trim removes leading and trailing whitespaces
        const mobile = mobileInput.value.trim();
        const email = emailInput.value.trim();

        if (!name) {
            alert('Please enter a name.');
            return;
        }

        if (!validateName(name)) {
            alert('Please enter a valid name without special characters.');
            return;
        }

        if (!mobile) {
            alert('Please enter a mobile number.');
            return;
        }

        if (!validateMobile(mobile)) {
            alert('Please enter a valid mobile number with exactly 10 digits.');
            return;
        }

        if (!email) {
            alert('Please enter an email address.');
            return;
        }
        if (!email.includes('@')) {
            alert('Please enter a valid email address.');
            return;
        }

        // You can add further email validation logic here if needed

        cells[0].innerHTML = name;
        cells[1].innerHTML = mobile;
        cells[2].innerHTML = email;

        const editBtn = row.querySelector('.save-btn');
        editBtn.innerText = 'Edit';
        editBtn.classList.remove('save-btn');
        editBtn.classList.add('edit-btn');
    }
});


    // Event listener for input in the search bar
    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const rows = userTableBody.querySelectorAll('tr');

        rows.forEach(row => {
            const name = row.querySelector('td:nth-child(1)').innerText.toLowerCase();
            const mobile = row.querySelector('td:nth-child(2)').innerText.toLowerCase();
            const email = row.querySelector('td:nth-child(3)').innerText.toLowerCase();
            
            // Check if any column matches the search term
            if (name.includes(searchTerm) || mobile.includes(searchTerm) || email.includes(searchTerm)) {
                row.style.display = ''; // Show the row if there's a match
            } else {
                row.style.display = 'none'; // Hide the row if there's no match
            }
        });
    });

