import { fillHeroCarousel, loadCarouselSection } from '../components/carousels.js';
import { initBootstrap } from './bootstrap.js';
import { getCurrentSession, logout } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
  const logoutBtn = document.querySelector('.logout-btn');


  function renderUserUI(user) {
  const accountBtn = document.getElementById('accountBtn');
  const loginBtn = document.getElementById('loginBtn');

      if (user && !user.isGuest) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (accountBtn) {
          accountBtn.style.display = 'block';
          accountBtn.textContent = user.email; // or user.username if you have it
        }
      } else {
        if (loginBtn) loginBtn.style.display = 'block';
        if (accountBtn) accountBtn.style.display = 'none';
      }
    }
  // Session check
  try {
    const user = await getCurrentSession();
    if (user) {
      localStorage.setItem('authUser', JSON.stringify(user));
      window.currentUser = user;
      renderUserUI?.(user); // Optional: inject user info into DOM
    } else {
      localStorage.removeItem('authUser');
    }
  } catch (err) {
    console.warn('Session check failed:', err);
    localStorage.removeItem('authUser');
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      try {
        await logout();
        localStorage.removeItem('authUser');
        window.location.href = '/frontend/html/login.html';
      } catch (err) {
        console.error('Logout failed:', err);
      }
    });
  }

  initBootstrap();

  // Load featured sections
  fillHeroCarousel();
  loadCarouselSection('featuredCarousel', 0, 12);
  loadCarouselSection('upcomingCarousel', 12, 24);

  if (typeof setupPageTransitions === 'function') {
    setupPageTransitions();
  }
});