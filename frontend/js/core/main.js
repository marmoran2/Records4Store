// core/main.js
import { fillHeroCarousel, loadCarouselSection } from '../components/carousels.js';
import { initBootstrap } from './bootstrap.js';

document.addEventListener('DOMContentLoaded', () => {
  initBootstrap(); // Tooltip, popover, etc.

  fillHeroCarousel(); // Static hero images
  loadCarouselSection('featuredCarousel', 0, 12);
  loadCarouselSection('upcomingCarousel', 12, 24);

  if (typeof setupPageTransitions === 'function') {
    setupPageTransitions();
  }
});

loadCarouselSection('featuredCarousel', 0, 9);     // Adjust range if needed
loadCarouselSection('upcomingCarousel', 9, 18);   

localStorage.setItem(
  'cartItems',
  JSON.stringify([
    { productIndex: 13, quantity: 2 },
    { productIndex: 5, quantity: 1 }
  ])
);