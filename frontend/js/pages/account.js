// File: frontend/js/pages/account.js

document.addEventListener('DOMContentLoaded', async () => {
    const user = JSON.parse(localStorage.getItem('authUser'));
  
    if (!user || !user.email) {
      window.location.href = 'login.html';
      return;
    }
  
    try {
      const res = await fetch('../assets/json/users.json');
      const users = await res.json();
      const fullUser = users.find(u => u.email === user.email);
  
      if (!fullUser) {
        window.location.href = 'login.html';
        return;
      }
  
      // Summary
      document.getElementById('summaryName').textContent = `${fullUser.firstName} ${fullUser.lastName}`;
      document.getElementById('summaryEmail').textContent = fullUser.email;
  
      // Details
      document.getElementById('detailEmail').textContent = fullUser.email;
      document.getElementById('detailUsername').textContent = fullUser.username || '—';
      document.getElementById('detailFirstName').textContent = fullUser.firstName || '—';
      document.getElementById('detailLastName').textContent = fullUser.lastName || '—';
  
      const address = [
        fullUser.addressLine1,
        fullUser.addressLine2,
        fullUser.city,
        fullUser.country
      ].filter(Boolean).join(', ');
  
      document.getElementById('detailAddress').textContent = address || 'No address saved';
  
      document.getElementById('detailCreated').textContent = fullUser.createdAt || '—';
      document.getElementById('detailLastOrder').textContent = fullUser.lastOrder || '—';
  
      // Logout button
      document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('authUser');
        window.location.href = 'login.html';
      });
  
    } catch (err) {
      console.error('Failed to load account:', err);
      alert('Something went wrong loading your account. Please try again later.');
      window.location.href = 'login.html';
    }
  });
  