import { loadProductMetadata } from '../core/product-data.js';
import { renderProductCard } from './product-card.js';

export function fillHeroCarousel() {
    const heroInner = document.querySelector('.hero .carousel-inner');
    if (!heroInner) return;
  
    const titles = [
      "Vinculum release mixed VA with Skee Mask, VRIL, and their home crew",
      "Robert Hood gifts vinylists a new repress of his timeless Minimal Nation",
      "Jeff Mills rolls back the years with remixes of Berlin on Tresor",
      "AFX Ambient Works Vol. 3 finally available on vinyl",
      "Dax J's final Monnom Black release",
      "Delsin releases new Sunil Sharpe heavy hitters",
    ];
  
    // Generate slides
    const items = titles.map((title, i) => `
      <div class="carousel-item ${i === 0 ? 'active' : ''}">
        <img 
          src="../assets/images/Hero Banners/Hero_Post_${i + 1}.webp" 
          class="hero__image d-block w-100" 
          alt="${title}"
        >
      </div>
    `).join('');
  
    heroInner.innerHTML = items;
  
    // Add single caption outside the carousel-inner
    const heroCarousel = document.querySelector('.hero');
    const caption = document.createElement('div');
    caption.className = 'hero-caption';
    caption.innerHTML = `<h2 class="hero-caption__title">${titles[0]}</h2>`;
    heroCarousel.appendChild(caption);
  
    // Set up event listener for slide changes
    const carouselEl = document.querySelector('#heroCarousel');
    carouselEl.addEventListener('slide.bs.carousel', (e) => {
      const nextIndex = e.to; // Index of next slide
      const captionTitle = document.querySelector('.hero-caption__title');
      if (captionTitle) {
        captionTitle.textContent = titles[nextIndex];
      }
    });
  }

export function fillCarousel(id, items, perSlide = 4) {
  const container = document.querySelector(`#${id} .carousel-inner`);
  if (!container) return;
  container.innerHTML = '';

  for (let i = 0; i < items.length; i += perSlide) {
    const chunk = items.slice(i, i + perSlide);
    const slide = document.createElement('div');
    slide.className = `carousel-item ${i === 0 ? 'active' : ''}`;

    slide.innerHTML = `
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-${perSlide} g-3">
        ${chunk
          .map(
            (product) => `
            <div class="col d-flex">
              ${renderProductCard(product)}
            </div>
          `
          )
          .join('')}
      </div>
    `;

    container.appendChild(slide);
  }
}

export async function loadCarouselSection(id, rangeStart, rangeEnd) {
    try {
      const metadata = await loadProductMetadata();
      const items = metadata.slice(rangeStart, rangeEnd);
      fillCarousel(id, items);
    } catch (err) {
      console.error(`Error loading carousel "${id}":`, err);
    }
}