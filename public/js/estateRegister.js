document.getElementById('estateRegisterForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const agencyName = document.getElementById('agencyName').value;
  
    const response = await fetch('/api/estateAgents/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        agencyName,
      }),
    });
  
    const data = await response.json();
  
    const messageDiv = document.getElementById('message');
  
    if (response.ok) {
      // Save token to localStorage
      localStorage.setItem('estateToken', data.token);
      messageDiv.style.color = 'green';
      messageDiv.textContent = 'Registration successful! Redirecting...';
      setTimeout(() => {
        window.location.href = 'estateDashboard.html';
      }, 2000);
    } else {
      messageDiv.style.color = 'red';
      messageDiv.textContent = data.msg || 'Registration failed';
    }
  });
  