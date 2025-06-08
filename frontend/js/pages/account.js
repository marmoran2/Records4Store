import { apiGet, getCurrentSession } from '../core/api.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const session = await getCurrentSession();
    if (!session?.id && !session?.user_id) {
      throw new Error('Invalid session response');
    }

    const userId = session.user_id || session.id;
    const fullUser = await apiGet(`/users/${userId}`);
    console.log('[Account] Loaded user:', fullUser);

    // Handle missing/null fields gracefully
    const firstName = fullUser.first_name || '';
    const lastName = fullUser.last_name || '';
    const email = fullUser.email || 'Not available';

    document.getElementById('summaryName').textContent = `${firstName} ${lastName}`.trim();
    document.getElementById('summaryEmail').textContent = email;

    document.getElementById('detailEmail').textContent = email;
    document.getElementById('detailUsername').textContent = fullUser.username || '—';
    document.getElementById('detailFirstName').textContent = firstName || '—';
    document.getElementById('detailLastName').textContent = lastName || '—';

    const address = [
      fullUser.address_line1,
      fullUser.address_line2,
      fullUser.city,
      fullUser.country
    ].filter(Boolean).join(', ');

    document.getElementById('detailAddress').textContent = address || 'No address saved';
    document.getElementById('detailCreated').textContent = fullUser.created_at || '—';
    document.getElementById('detailLastOrder').textContent = fullUser.last_order || '—';

    document.getElementById('logoutBtn')?.addEventListener('click', () => {
      document.cookie = 'session_id=; Max-Age=0; path=/';
      localStorage.removeItem('authUser');
      window.location.href = 'login.html';
    });

  } catch (err) {
    console.error('[Account] Failed to load account info:', err?.message || err);
    alert('Could not load your account. Please log in again.');
    window.location.href = 'login.html';
  }
});
