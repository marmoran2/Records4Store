import { fillHeroCarousel, loadCarouselSection } from '../components/carousels.js';
import { initBootstrap } from './bootstrap.js';
import { logout } from './api.js';
import { initSession } from './session.js';

document.addEventListener('DOMContentLoaded', async () => {
  const logoutBtn = document.querySelector('.logout-btn');

  const user = await initSession();
  if (user) {
    const accountBtn = document.getElementById('accountBtn');
    const loginBtn = document.getElementById('loginBtn');

    if (loginBtn) loginBtn.style.display = 'none';
    if (accountBtn) {
      accountBtn.style.display = 'block';
      accountBtn.textContent = user.email || 'Account';
    }
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      try {
        await logout();
        localStorage.removeItem('authUser');
        window.location.href = 'login.html';
      } catch (err) {
        console.error('Logout failed:', err);
      }
    });
  }

  initBootstrap();
  fillHeroCarousel();
  loadCarouselSection('featuredCarousel', 0, 12);
  loadCarouselSection('upcomingCarousel', 12, 24);
});