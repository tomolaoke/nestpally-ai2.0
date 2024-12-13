document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = 'login.html';
    }
  
    const response = await fetch('/api/match/roommates', {
      headers: {
        'x-auth-token': token,
      },
    });
  
    if (response.ok) {
      const roommates = await response.json();
      let html = '';
      roommates.forEach(roommate => {
        html += `
          <div class="match">
            <p><strong>Name:</strong> ${roommate.name}</p>
            <p><strong>Email:</strong> ${roommate.email}</p>
            <p><strong>Budget:</strong> $${roommate.preferences.budget}</p>
            <p><strong>Preferred Location:</strong> ${roommate.preferences.location}</p>
          </div>
        `;
      });
      document.getElementById('roommates').innerHTML = html || '<p>No matches found.</p>';
    }
  });
  