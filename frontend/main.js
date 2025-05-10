// main.js (hero + featured + upcoming)

// Using your downloaded placeholders
const featured = Array.from({ length: 6 }, (_, i) => ({
  img: 'assets/images/Record-Placeholder.png',
  title: `Featured ${i + 1}`,
  link: '#'
}));

const upcoming = Array.from({ length: 6 }, (_, i) => ({
  img: 'assets/images/Record-Placeholder.png',
  title: `Upcoming ${i + 1}`,
  link: '#'
}));

function fillCarousel(id, items, perSlide = 3) {
  const inner = document.getElementById(id).querySelector('.carousel-inner');
  inner.innerHTML = '';
  for (let i = 0; i < items.length; i += perSlide) {
    const chunk = items.slice(i, i + perSlide);
    const div = document.createElement('div');
    div.className = `carousel-item ${i === 0 ? 'active' : ''}`;
    div.innerHTML = `
      <div class="row row-cols-1 row-cols-md-${perSlide} g-4">
        ${chunk.map(it => `
          <div class="col">
            <div class="card">
              <img src="${it.img}" class="card-img-top" alt="${it.title}">
              <div class="card-body text-center">
                <h5 class="card-title">${it.title}</h5>
                <a href="${it.link}" class="btn btn-sm btn-outline-primary">View</a>
              </div>
            </div>
          </div>
        `).join('')}
      </div>`;
    inner.appendChild(div);
  }
}

function fillHero() {
  const heroInner = document.getElementById('heroCarousel').querySelector('.carousel-inner');
  heroInner.innerHTML = [1, 2, 3].map((_, i) => `
    <div class="carousel-item ${i === 0 ? 'active' : ''}">
      <img src="assets/images/Hero-Placeholder.png" class="d-block w-100" alt="Hero ${i + 1}">
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  fillHero();
  fillCarousel('featuredCarousel', featured);
  fillCarousel('upcomingCarousel', upcoming);
});
