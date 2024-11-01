const apiUrl = 'https://crudoperations-production.up.railway.app/users';

function fetchUsers() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const userTableBody = document.getElementById('userTableBody');
            userTableBody.innerHTML = '';
            data.forEach(user => {
                userTableBody.innerHTML += `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>
                            <button class="btn btn-warning btn-sm" onclick="editUser(${user.id}, '${user.name}', '${user.email}')">Edit</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Delete</button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(error => console.error('Error:', error));
}

document.getElementById('userForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const userId = document.getElementById('userId').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    const user = { name, email }; // Remove age from here

    if (userId) {
        fetch(`${apiUrl}/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
            .then(() => {
                fetchUsers();
                resetForm();
            });
    } else {
        fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
            .then(() => {
                fetchUsers();
                resetForm();
            });
    }
});

function deleteUser(id) {
    if (confirm('Are you sure?')) {
        fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
            .then(() => fetchUsers())
            .catch(error => console.error('Error:', error));
    }
}

function editUser(id, name, email) { // Remove age from parameters
    document.getElementById('userId').value = id;
    document.getElementById('name').value = name;
    document.getElementById('email').value = email;
}

function resetForm() {
    document.getElementById('userId').value = '';
    document.getElementById('userForm').reset();
}

fetchUsers();
