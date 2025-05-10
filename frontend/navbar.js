// navbar.js

// --- Data ---
const topLinks = [
  { name: 'Home', href: '#' },
  { name: 'My Account', href: '#' },
  { name: 'Wishlist', href: '#' },
  { name: 'Contact', href: '#' },
  { name: 'About', href: '#' },
];

const productNav = [
  { name: 'Catalog', dropdown: true, key: 'catalog' },
  { name: 'New Releases', href: '#' },
  { name: 'On Sale', href: '#' },
  { name: 'Upcoming', href: '#' },
  { name: 'News', href: '#' },
];

// --- Render Functions ---
function renderTopBar() {
  const nav = document.getElementById('topBar');
  nav.className = 'navbar navbar-expand d-none d-md-flex bg-light py-1';
  nav.innerHTML = `
    <div class="container justify-content-center">
      <ul class="navbar-nav">
        ${topLinks.map(l =>
          `<li class="nav-item">
             <a class="nav-link" href="${l.href}">${l.name}</a>
           </li>`
        ).join('')}
      </ul>
    </div>
  `;
}

function renderMiddleBar() {
  const nav = document.getElementById('middleBar');
  nav.className = 'navbar navbar-expand-lg navbar-light bg-white py-2 shadow-sm';
  nav.innerHTML = `
    <div class="container d-flex align-items-center justify-content-between">
      <!-- Logo -->
      <div class="logo-container">
        <a href="/">
          <img src="assets/images/logo_.png" alt="Site Logo" class="logo" />
        </a>
      </div>

      <!-- Search -->
      <form class="flex-grow-1 mx-3">
        <input class="form-control" type="search" placeholder="Search records…" aria-label="Search">
      </form>

      <!-- Profile & Cart -->
      <div class="d-flex">
        <a href="#" class="me-3">
          <span class="material-icons"> account_circle </span>
        </a>
        <a href="#">
          <span class="material-icons"> shopping_cart </span>
        </a>
      </div>
    </div>
  `;
}

function renderBottomBar() {
  const nav = document.getElementById('bottomBar');
  nav.className = 'navbar navbar-expand-lg navbar-dark bg-primary sticky-top';
  nav.innerHTML = `
    <div class="container">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#prodNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-center" id="prodNav">
        <ul class="navbar-nav">
          ${productNav.map(item => item.dropdown
            ? `<li class="nav-item dropdown">
                 <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">${item.name}</a>
                 <ul class="dropdown-menu bg-white text-dark" id="${item.key}-menu"></ul>
               </li>`
            : `<li class="nav-item">
                 <a class="nav-link" href="${item.href}">${item.name}</a>
               </li>`
          ).join('')}
        </ul>
      </div>
    </div>
  `;
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  renderTopBar();
  renderMiddleBar();
  renderBottomBar();
});

// --- Catalog Dropdown Population ---
const catalogItems = [
  { name: 'Genres', href: '#' },
  { name: 'Period (90s, etc.)', href: '#' },
  { name: 'Style', href: '#' },
  { name: 'Top Labels', href: '#' },
];
function fillCatalogMenu() {
  const ul = document.getElementById('catalog-menu');
  if (!ul) return;
  ul.innerHTML = catalogItems
    .map(i => `<li><a class="dropdown-item" href="${i.href}">${i.name}</a></li>`)
    .join('');
}
document.addEventListener('DOMContentLoaded', fillCatalogMenu);

// --- Bootstrap JS Initialization ---
if (typeof bootstrap !== 'undefined') {
  const dropdowns = document.querySelectorAll('.dropdown-toggle');
  dropdowns.forEach(dropdown => {
    new bootstrap.Dropdown(dropdown);
  });
}
// --- End of File ---
