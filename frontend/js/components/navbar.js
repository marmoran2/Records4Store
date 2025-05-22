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
  }
];

const categoriesData = {
  genres: ['Techno', 'House', 'Jungle', 'Hard House', 'Trance', 'Drum n Bass', 'Ambient'],
  styles: ['Funky', 'Emotive', 'Soulful', 'Hard as Nails', 'Groove', 'Deep', 'Esoteric'],
  era: ['70s', '80s', '90s', '00s', '10s', 'Detroit', 'Chicago', 'New Age']
};

// --- Render Navbar Sections ---
function renderMiddleBar() {
  const nav = document.getElementById('middleBar');
  if (!nav) return;

  nav.className = 'navbar-middle header navbar navbar-expand-lg py-2 shadow-sm';
  nav.innerHTML = `
    <div class="navbar-container d-flex align-items-center justify-content-between">
      <div class="d-flex align-items-center">
          <button class="navbar-toggler me-3" type="button" aria-label="Toggle navigation">
            <span class="material-icons icon-menu">menu</span>
            <span class="material-icons icon-close d-none">close</span>
          </button>
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
              ? `<li class="nav-item ${item.name === 'Genres' ? 'mega-trigger' : 'dropdown'}">
                   <a class="nav-link dropdown-toggle text-light" href="#" ${item.name !== 'Genres' ? 'data-bs-toggle="dropdown"' : ''}>${item.name}</a>
                   ${item.name !== 'Genres'
                     ? `<ul class="dropdown-menu">
                          ${item.items.map(i => `<li><a class="dropdown-item" href="#">${i}</a></li>`).join('')}
                        </ul>`
                     : ''}
                 </li>`
              : `<li class="nav-item">
                   <a class="nav-link text-light" href="${item.href}">${item.name}</a>
                 </li>`
          ).join('')}
        </ul>
      </div>
    </div>
  `;

  // Inject Mega Menu
  const megaMenu = document.createElement('div');
  megaMenu.id = 'megaCategoryMenu';
  megaMenu.className = 'mega-menu';
  megaMenu.innerHTML = `
    <div class="mega-menu__content container py-4">
      <div class="row">
        <div class="col-md-4">
          <h6 class="text-uppercase">Genres</h6>
          <ul class="list-unstyled">
            ${categoriesData.genres.map(i => `<li><a href="#" class="dropdown-item">${i}</a></li>`).join('')}
          </ul>
        </div>
        <div class="col-md-4">
          <h6 class="text-uppercase">Styles</h6>
          <ul class="list-unstyled">
            ${categoriesData.styles.map(i => `<li><a href="#" class="dropdown-item">${i}</a></li>`).join('')}
          </ul>
        </div>
        <div class="col-md-4">
          <h6 class="text-uppercase">Era</h6>
          <ul class="list-unstyled">
            ${categoriesData.era.map(i => `<li><a href="#" class="dropdown-item">${i}</a></li>`).join('')}
          </ul>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col">
          <div class="category-image-cards d-flex flex-wrap gap-3 justify-content-center">
            <div class="category-card">
              <img src="../assets/images/background.png" alt="Techno">
              <span>Techno</span>
            </div>
            <!-- Add more image cards -->
          </div>
        </div>
      </div>
    </div>
  `;
  nav.appendChild(megaMenu);
}

// --- Scroll & Navbar Behavior ---
function setupScrollBehavior() {
  const middleBar = document.getElementById('middleBar');
  const bottomBar = document.getElementById('bottomBar');
  const toggler = middleBar?.querySelector('.navbar-toggler');
  if (!middleBar || !bottomBar || !toggler) return;

  let isCollapsed = false;
  let lastScrollY = window.scrollY;
  let manualExpand = false;

  window.addEventListener('scroll', () => {
    const isMobile = window.innerWidth < 992;
    const isNavOpen = document.querySelector('#prodNav')?.classList.contains('show');
    if (isMobile || isNavOpen || manualExpand) return;
    
    const currentScroll = window.scrollY;

    if (currentScroll > lastScrollY && !isCollapsed) {
      // Scroll down — collapse nav
      middleBar.classList.add('show-toggle');
      bottomBar.classList.remove('expanded');
      bottomBar.classList.add('collapsed');
      console.log("Scroll triggered — toggler visibility:", toggler);
      toggler.classList.add('scroll-visible');
      document.body.classList.add('nav-collapsed');
      isCollapsed = true;
    }

    if (currentScroll <= 0 && isCollapsed) {
      // Scroll to top — expand nav
      middleBar.classList.remove('show-toggle');
      bottomBar.classList.remove('collapsed');
      bottomBar.classList.add('expanded');
      toggler.classList.remove('scroll-visible');
      document.body.classList.remove('nav-collapsed');
      isCollapsed = false;
    }

    lastScrollY = currentScroll;
  });

  toggler.addEventListener('click', () => {
    bottomBar.classList.remove('collapsed');
    bottomBar.classList.add('expanded');
    middleBar.classList.remove('show-toggle');
    toggler.classList.remove('scroll-visible');
    document.body.classList.remove('nav-collapsed');
    isCollapsed = false;
    manualExpand = true; 
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
      isCollapsed = false;
      manualExpand = false;
    }, 600); // wait for scroll to top before re-enabling scroll logic
  });


}

// --- Event Bindings ---
function setupMegaMenuBehavior() {
  const megaMenu = document.getElementById('megaCategoryMenu');
  const genresItem = Array.from(document.querySelectorAll('a.nav-link')).find(el => el.textContent.trim() === 'Genres');

  if (!megaMenu || !genresItem) return;

  genresItem.addEventListener('mouseenter', () => {
    if (!megaMenu.classList.contains('open')) {
      megaMenu.classList.add('open');
    }
  });

  megaMenu.addEventListener('mouseleave', () => {
    megaMenu.classList.remove('open');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
      const isGenres = link.textContent.trim() === 'Genres';
      if (!isGenres && megaMenu.classList.contains('open')) {
        megaMenu.classList.remove('open');
      }
    });
  });
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  renderMiddleBar();
  renderBottomBar();
  setupScrollBehavior();
  setupMegaMenuBehavior();

  // Bootstrap re-init for dynamically added dropdowns
  if (typeof bootstrap !== 'undefined') {
    document.querySelectorAll('.dropdown-toggle').forEach(el => {
      new bootstrap.Dropdown(el);
    });
  }
});
