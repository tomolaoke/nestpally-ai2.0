// public/js/userDashboard.js

document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = 'login.html';
    }
  
    // Fetch and display user profile
    const profileResponse = await fetch('/api/users/me', {
      headers: {
        'x-auth-token': token,
      },
    });
  
    if (profileResponse.ok) {
      const user = await profileResponse.json();
      document.getElementById('profile').innerHTML = `
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Budget:</strong> $${user.preferences.budget}</p>
        <p><strong>Preferred Location:</strong> ${user.preferences.location}</p>
      `;
    } else {
      // Handle error
    }
  
    // Fetch and display roommate matches
    const roommatesResponse = await fetch('/api/match/roommates', {
      headers: {
        'x-auth-token': token,
      },
    });
  
    if (roommatesResponse.ok) {
      const roommates = await roommatesResponse.json();
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
      document.getElementById('roommateMatches').innerHTML = html || '<p>No matches found.</p>';
    }
  
    // Fetch and display apartment matches
    const apartmentsResponse = await fetch('/api/match/apartments', {
      headers: {
        'x-auth-token': token,
      },
    });
  
    if (apartmentsResponse.ok) {
      const apartments = await apartmentsResponse.json();
      let html = '';
      apartments.forEach(apartment => {
        html += `
          <div class="match">
            <p><strong>Title:</strong> ${apartment.title}</p>
            <p><strong>Description:</strong> ${apartment.description}</p>
            <p><strong>Location:</strong> ${apartment.location}</p>
            <p><strong>Price:</strong> $${apartment.price}</p>
            <p><strong>Available Rooms:</strong> ${apartment.availableRooms}</p>
            <p><strong>Listed By:</strong> ${apartment.listedBy.agencyName} (${apartment.listedBy.email})</p>
          </div>
        `;
      });
      document.getElementById('apartmentMatches').innerHTML = html || '<p>No matches found.</p>';
    }
  
    // Fetch and display estate agent matches
    const agentsResponse = await fetch('/api/match/estateAgents', {
      headers: {
        'x-auth-token': token,
      },
    });
  
    if (agentsResponse.ok) {
      const agents = await agentsResponse.json();
      let html = '';
      agents.forEach(agent => {
        html += `
          <div class="match">
            <p><strong>Name:</strong> ${agent.name}</p>
            <p><strong>Email:</strong> ${agent.email}</p>
            <p><strong>Agency Name:</strong> ${agent.agencyName}</p>
          </div>
        `;
      });
      document.getElementById('estateAgentMatches').innerHTML = html || '<p>No matches found.</p>';
    }
  
    // Logout functionality
    document.getElementById('logout').addEventListener('click', () => {
      localStorage.removeItem('token');
      window.location.href = 'login.html';
    });
  });
  