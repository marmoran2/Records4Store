import { initSession } from '../core/session.js';

document.addEventListener('DOMContentLoaded', async () => {
  const user = await initSession({ requireAuth: true });
  if (!user) return;

  renderWishlist();
});

document.addEventListener('DOMContentLoaded', async () => {
  const user = JSON.parse(localStorage.getItem('authUser'));

  if (!user || !user.user_id) {
    window.location.href = 'login.html';
    return;
  }

  try {
    const response = await fetch(`/api/users/${user.user_id}`, {
      method: 'GET',
      credentials: 'include'
    });

    if (!response.ok) throw new Error('Fetch failed');

    const fullUser = await response.json();

    // Summary
    document.getElementById('summaryName').textContent = `${fullUser.first_name} ${fullUser.last_name}`;
    document.getElementById('summaryEmail').textContent = fullUser.email;

    // Details
    document.getElementById('detailEmail').textContent = fullUser.email;
    document.getElementById('detailUsername').textContent = fullUser.username || '—';
    document.getElementById('detailFirstName').textContent = fullUser.first_name || '—';
    document.getElementById('detailLastName').textContent = fullUser.last_name || '—';

    const address = [
      fullUser.address_line1,
      fullUser.address_line2,
      fullUser.city,
      fullUser.country
    ].filter(Boolean).join(', ');

    document.getElementById('detailAddress').textContent = address || 'No address saved';
    document.getElementById('detailCreated').textContent = fullUser.created_at || '—';
    document.getElementById('detailLastOrder').textContent = fullUser.last_order || '—';

    document.getElementById('logoutBtn').addEventListener('click', () => {
      localStorage.removeItem('authUser');
      window.location.href = 'login.html';
    });

  } catch (err) {
    console.error('Failed to load account:', err);
    alert('Something went wrong loading your account.');
    window.location.href = 'login.html';
  }
});