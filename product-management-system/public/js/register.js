document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phonenumber = document.getElementById('phonenumber').value;

    const profilePicture = document.getElementById('profilePicture').files[0];

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phonenumber',phonenumber)
    if (profilePicture) {
        formData.append('profilePicture', profilePicture);
    }

    try {
        const response = await fetch('/api/users/register', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert('Registration successful, you can now log in.');
            window.location.href = 'login.html';
        } else {
            alert('Registration failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Registration failed');
    }
});
