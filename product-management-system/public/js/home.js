document.addEventListener('DOMContentLoaded', async function() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch('/api/users/current', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const user = await response.json();
            document.getElementById('username').textContent = user.username;
            document.getElementById('profilePic').src = user.profilePicture || 'default-pic.jpg';
        } else {
            alert('Failed to fetch user data');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to fetch user data');
    }
});
