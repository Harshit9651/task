document.addEventListener('DOMContentLoaded', function () {
    const userForm = document.getElementById('userForm');
    const userTableBody = document.getElementById('userTableBody');

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
        const name = cells[0].innerText;
        const mobile = cells[1].innerText;
        const email = cells[2].innerText;

        cells[0].innerHTML = `<input type="text" value="${name}">`;
        cells[1].innerHTML = `<input type="text" value="${mobile}">`;
        cells[2].innerHTML = `<input type="email" value="${email}">`;

        const editBtn = row.querySelector('.edit-btn');
        editBtn.innerText = 'Save';
        editBtn.classList.remove('edit-btn');
        editBtn.classList.add('save-btn');
    }

    function saveUser(row) {
        const cells = row.querySelectorAll('td');
        const name = cells[0].querySelector('input').value;
        const mobile = cells[1].querySelector('input').value;
        const email = cells[2].querySelector('input').value;

        cells[0].innerHTML = name;
        cells[1].innerHTML = mobile;
        cells[2].innerHTML = email;

        const editBtn = row.querySelector('.save-btn');
        editBtn.innerText = 'Edit';
        editBtn.classList.remove('save-btn');
        editBtn.classList.add('edit-btn');
    }
});



    // Add event listener for search input
    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.toLowerCase();
        const rows = userTableBody.querySelectorAll('tr');

        rows.forEach(row => {
            const name = row.querySelector('td:first-child').innerText.toLowerCase();
            if (name.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });