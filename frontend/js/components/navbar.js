// --- Navigation Data ---
const productNav = [
  { name: 'New Releases', href: '#' },
  { name: 'Pre-Orders', href: '#' },
  {
    name: 'Genres',
    dropdown: true,
    key: 'genres',
    items: ['Techno', 'House', 'Jungle', 'Hard House', 'Trance', 'Drum n Bass', 'Ambient']
  },
  {
    name: 'On Sale',
    dropdown: true,
    key: 'sale',
    items: ['Under €20', '20%', '50%', '70%', 'Under €10']
  },
  {
    name: 'Help',
    dropdown: true,
    key: 'help',
    items: ['About Us', 'Returns', 'FAQ', 'Delivery', 'Contact']
  },
];

// --- Render Navbar Sections ---
function renderMiddleBar() {
  const nav = document.getElementById('middleBar');
  if (!nav) return;

  nav.className = 'navbar-middle header navbar navbar-expand-lg py-2 shadow-sm';
  nav.innerHTML = `
    <div class="navbar-container d-flex align-items-center justify-content-between">
      <div class="d-flex align-items-center">
        <div class="menu-toggle d-none me-3" id="menuToggle">
          <span class="material-icons">menu</span>
        </div>
        <a href="/" class="logo-container">
          <img src="../assets/images/logo_.png" alt="Site Logo" class="logo" />
        </a>
      </div>
      <form class="flex-grow-1 mx-3 d-none d-md-block">
        <input class="form-control" type="search" placeholder="Search records…" aria-label="Search">
      </form>
      <div class="d-flex align-items-center">
        <a href="#" class="me-3"><span class="material-icons">favorite</span></a>
        <a href="#" class="me-3"><span class="material-icons">account_circle</span></a>
        <a href="#"><span class="material-icons">shopping_cart</span></a>
      </div>
    </div>
  `;
}

function renderBottomBar() {
  const nav = document.getElementById('bottomBar');
  if (!nav) return;

  nav.className = 'navbar-bottom header navbar navbar-expand-lg py-2 shadow-sm';
  nav.innerHTML = `
    <div class="navbar-container">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#prodNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-center" id="prodNav">
        <ul class="navbar-nav">
          ${productNav.map(item =>
            item.dropdown
              ? `<li class="nav-item dropdown">
                   <a class="nav-link dropdown-toggle text-light" href="#" data-bs-toggle="dropdown">${item.name}</a>
                   <ul class="dropdown-menu">
                     ${item.items.map(i => `<li><a class="dropdown-item" href="#">${i}</a></li>`).join('')}
                   </ul>
                 </li>`
              : `<li class="nav-item">
                   <a class="nav-link text-light" href="${item.href}">${item.name}</a>
                 </li>`
          ).join('')}
        </ul>
      </div>
    </div>
  `;
}

// --- Catalog Dropdown Injection ---
const catalogItems = [
  { name: 'Genres', href: '#' },
  { name: 'Period (90s, etc.)', href: '#' },
  { name: 'Style', href: '#' },
  { name: 'Top Labels', href: '#' },
];

function fillCatalogMenu() {
  const ul = document.getElementById('catalog-menu');
  if (!ul) return;
  ul.innerHTML = catalogItems.map(i => `<li><a class="dropdown-item" href="${i.href}">${i.name}</a></li>`).join('');
}

// --- Scroll-Based Navbar Behavior ---
function setupScrollBehavior() {
  const middleBar = document.getElementById('middleBar');
  const bottomBar = document.getElementById('bottomBar');
  const menuToggle = document.getElementById('menuToggle');
  if (!middleBar || !bottomBar || !menuToggle) return;

  let isCollapsed = false;
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > lastScrollY && !isCollapsed) {
      middleBar.classList.add('show-toggle');
      bottomBar.classList.remove('expanded');
      bottomBar.classList.add('collapsed');
      menuToggle.classList.remove('d-none');
      isCollapsed = true;
    }

    if (currentScroll <= 0 && isCollapsed) {
      middleBar.classList.remove('show-toggle');
      bottomBar.classList.remove('collapsed');
      bottomBar.classList.add('expanded');
      menuToggle.classList.add('d-none');
      isCollapsed = false;
    }

    lastScrollY = currentScroll;
  });

  menuToggle.addEventListener('click', () => {
    bottomBar.classList.remove('collapsed');
    bottomBar.classList.add('expanded');
    middleBar.classList.remove('show-toggle');
    menuToggle.classList.add('d-none');
    isCollapsed = false;
  });
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  renderMiddleBar();
  renderBottomBar();
  fillCatalogMenu();
  setupScrollBehavior();

  // Bootstrap dropdowns (required due to dynamic insertion)
  if (typeof bootstrap !== 'undefined') {
    document.querySelectorAll('.dropdown-toggle').forEach(el => {
      new bootstrap.Dropdown(el);
    });
  }
});
