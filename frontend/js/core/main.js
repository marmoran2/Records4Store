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
