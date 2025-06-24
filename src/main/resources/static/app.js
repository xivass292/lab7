const BASE_URL = 'http://localhost:8080/api';

async function fetchUsers() {
    try {
        const response = await fetch(`${BASE_URL}/users`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const users = await response.json();
        const tbody = document.getElementById('users-tbody');
        tbody.innerHTML = '';
        users.forEach(user => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${user.id}</td>
                <td id="username-${user.id}">${user.username}</td>
                <td>
                    <button onclick="startEditUser(${user.id}, '${user.username}')">Edit</button>
                    <button onclick="deleteUser(${user.id})">Delete</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

async function fetchLocations() {
    try {
        const response = await fetch(`${BASE_URL}/locations`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const locations = await response.json();
        const tbody = document.getElementById('locations-tbody');
        tbody.innerHTML = '';
        locations.forEach(location => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${location.id}</td>
                <td id="ip-${location.id}">${location.ipAddress}</td>
                <td id="city-${location.id}">${location.city || ''}</td>
                <td id="country-${location.id}">${location.country || ''}</td>
                <td>
                    <button onclick="startEditLocation(${location.id}, '${location.ipAddress}', '${location.city || ''}', '${location.country || ''}')">Edit</button>
                    <button onclick="deleteLocation(${location.id})">Delete</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error fetching locations:', error);
    }
}

async function fetchRequestCount() {
    try {
        const response = await fetch(`${BASE_URL}/request-count`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const count = await response.json();
        document.getElementById('request-count').textContent = count;
    } catch (error) {
        console.error('Error fetching request count:', error);
    }
}

async function createUser() {
    const username = document.getElementById('user-username').value;
    if (!username) return;
    try {
        const response = await fetch(`${BASE_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username })
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        document.getElementById('user-username').value = '';
        fetchUsers();
    } catch (error) {
        console.error('Error creating user:', error);
    }
}

async function createLocation() {
    const username = document.getElementById('location-username').value;
    const ipAddress = document.getElementById('ip-address').value;
    if (!username || !ipAddress) return;
    try {
        const response = await fetch(`${BASE_URL}/location?ip=${ipAddress}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username })
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        document.getElementById('location-username').value = '';
        document.getElementById('ip-address').value = '';
        fetchLocations();
    } catch (error) {
        console.error('Error creating location:', error);
    }
}

async function deleteUser(id) {
    try {
        const response = await fetch(`${BASE_URL}/users/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        fetchUsers();
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}

async function deleteLocation(id) {
    try {
        const response = await fetch(`${BASE_URL}/locations/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);