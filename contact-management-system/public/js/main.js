document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginFormElement = document.getElementById('loginFormElement');
    const contactForm = document.getElementById('contactForm');
    const showAddContactFormBtn = document.getElementById('showAddContactForm');
    const showContactsBtn = document.getElementById('showContacts');
    
    const registrationForm = document.getElementById('registrationForm');
    const loginForm = document.getElementById('loginForm');
    const contactManagement = document.getElementById('contactManagement');

    // Handle registration form submission
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();
        if (response.status === 201) {
            registrationForm.style.display = 'none';
            loginForm.style.display = 'block';
        } else {
            alert(data.message);
        }
    });

    // Handle login form submission
    loginFormElement.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.status === 200) {
            localStorage.setItem('token', data.accessToken);
            loginForm.style.display = 'none';
            contactManagement.style.display = 'block';
        } else {
            alert(data.message);
        }
    });

    // Handle contact form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const phone = document.getElementById('contactPhone').value;

        const token = localStorage.getItem('token');

        const response = await fetch('/api/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ name, email, phone }),
        });

        const data = await response.json();
        if (response.status === 201) {
            alert('Contact added successfully');
            loadContacts();
        } else {
            alert(data.message);
        }
    });

    // Show add contact form
    showAddContactFormBtn.addEventListener('click', () => {
        document.getElementById('addContactForm').style.display = 'block';
        document.getElementById('contactList').style.display = 'none';
    });

    // Show contacts list
    showContactsBtn.addEventListener('click', () => {
        document.getElementById('addContactForm').style.display = 'none';
        document.getElementById('contactList').style.display = 'block';
        loadContacts();
    });

    // Load contacts from the backend
    async function loadContacts() {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/contacts', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const contacts = await response.json();
        const contactsUl = document.getElementById('contactsUl');
        contactsUl.innerHTML = '';

        contacts.forEach(contact => {
            const li = document.createElement('li');
            li.textContent = `${contact.name} - ${contact.email} - ${contact.phone}`;
            
            const updateBtn = document.createElement('button');
            updateBtn.textContent = 'Update';
            updateBtn.addEventListener('click', () => updateContact(contact));

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => deleteContact(contact._id));

            li.appendChild(updateBtn);
            li.appendChild(deleteBtn);
            contactsUl.appendChild(li);
        });
    }

    // Update contact
    async function updateContact(contact) {
        const name = prompt('Enter new name', contact.name);
        const email = prompt('Enter new email', contact.email);
        const phone = prompt('Enter new phone', contact.phone);

        const token = localStorage.getItem('token');

        const response = await fetch(`/api/contacts/${contact._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ name, email, phone }),
        });

        const data = await response.json();
        if (response.status === 200) {
            alert('Contact updated successfully');
            loadContacts();
        } else {
            alert(data.message);
        }
    }

    // Delete contact
    async function deleteContact(id) {
        const token = localStorage.getItem('token');

        const response = await fetch(`/api/contacts/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();
        if (response.status === 200) {
            alert('Contact deleted successfully');
            loadContacts();
        } else {
            alert(data.message);
        }
    }

    // Switch to login form
    document.getElementById('goToLogin').addEventListener('click', (e) => {
        e.preventDefault();
        registrationForm.style.display = 'none';
        loginForm.style.display = 'block';
    });

    // Switch to registration form
    document.getElementById('goToRegister').addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'none';
        registrationForm.style.display = 'block';
    });
});
