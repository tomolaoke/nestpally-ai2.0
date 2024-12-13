// public/js/login.js

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
  
    const data = await response.json();
  
    const messageDiv = document.getElementById('message');
  
    if (response.ok) {
      // Save token to localStorage
      localStorage.setItem('token', data.token);
      messageDiv.style.color = 'green';
      messageDiv.textContent = 'Login successful! Redirecting...';
      setTimeout(() => {
        window.location.href = 'userDashboard.html';
      }, 2000);
    } else {
      messageDiv.style.color = 'red';
      messageDiv.textContent = data.msg || 'Login failed';
    }
  });
  