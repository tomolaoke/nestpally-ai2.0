

document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('estateToken');
    if (!token) {
      window.location.href = 'estateLogin.html';
    }
  
    // Fetch and display estate agent profile
    const profileResponse = await fetch('/api/estateAgents/me', {
      headers: {
        'x-auth-token': token,
      },
    });
  
    if (profileResponse.ok) {
      const agent = await profileResponse.json();
      document.getElementById('profile').innerHTML = `
        <p><strong>Name:</strong> ${agent.name}</p>
        <p><strong>Email:</strong> ${agent.email}</p>
        <p><strong>Agency Name:</strong> ${agent.agencyName}</p>
      `;
    } else {
      // Handle error
    }
  
    // Handle apartment listing form submission
    document.getElementById('apartmentForm').addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const title = document.getElementById('title').value;
      const description = document.getElementById('description').value;
      const location = document.getElementById('location').value;
      const price = document.getElementById('price').value;
      const availableRooms = document.getElementById('availableRooms').value;
  
      const response = await fetch('/api/apartments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify({
          title,
          description,
          location,
          price,
          availableRooms,
        }),
      });
  
      const data = await response.json();
      const messageDiv = document.getElementById('message');
  
      if (response.ok) {
        messageDiv.style.color = 'green';
        messageDiv.textContent = 'Apartment listed successfully!';
        document.getElementById('apartmentForm').reset();
        loadListings();
      } else {
        messageDiv.style.color = 'red';
        messageDiv.textContent = data.msg || 'Listing failed';
      }
    });
  
    // Function to load estate agent's listings
    const loadListings = async () => {
      const response = await fetch('/api/apartments', {
        headers: {
          'x-auth-token': token,
        },
      });
  
      if (response.ok) {
        const apartments = await response.json();
        const agent = await fetch('/api/estateAgents/me', {
          headers: {
            'x-auth-token': token,
          },
        }).then(res => res.json());
  
        const agentListings = apartments.filter(apartment => apartment.listedBy === agent.id);
  
        let html = '';
        agentListings.forEach(apartment => {
          html += `
            <div class="match">
              <p><strong>Title:</strong> ${apartment.title}</p>
              <p><strong>Description:</strong> ${apartment.description}</p>
              <p><strong>Location:</strong> ${apartment.location}</p>
              <p><strong>Price:</strong> $${apartment.price}</p>
              <p><strong>Available Rooms:</strong> ${apartment.availableRooms}</p>
            </div>
          `;
        });
        document.getElementById('yourListings').innerHTML = html || '<p>No listings found.</p>';
      }
    };
  
    loadListings();
  
    // Logout functionality
    document.getElementById('logout').addEventListener('click', () => {
      localStorage.removeItem('estateToken');
      window.location.href = 'estateLogin.html';
    });
  });
  