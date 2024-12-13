

document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/api/apartments');
    if (response.ok) {
      const apartments = await response.json();
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
      document.getElementById('apartments').innerHTML = html || '<p>No apartments available.</p>';
    }
  });
  