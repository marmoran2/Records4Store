
import { renderMegaMenu } from './mega-menu.js';


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
  genres: [
    'ambient',
    'breakbeat',
    'electro',
    'hard-house',
    'hardcore',
    'techno',
    'trance',
    'uk-garage'
  ],
  styles: [
    'funky',
    'emotive',
    'soulful',
    'hard as nails',
    'groove',
    'deep',
    'esoteric'
  ],
  era: [
    '70s',
    '80s',
    '90s',
    '00s',
    '10s',
  ]
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
        <a href="../html/index.html" class="logo-container">
            <img src="../assets/images/logos/logo.svg" alt="Site Logo" class="logo logo-animate" />  
        </a>
      </div>

      <form class="flex-grow-1 mx-3 d-none d-md-block" action="search.html" method="GET">
        <input class="form-control" type="search" name="query" placeholder="Search records…" aria-label="Search">
      </form>

      <div class="d-flex align-items-center">
        <a href="../html/wishlist.html" class="me-3" title="Wishlist"><span class="material-icons">favorite</span></a>
        <a href="../html/account.html" class="me-3" title="Account"><span class="material-icons">account_circle</span></a>
          <a href="../html/cart.html" title="Cart" class="nav-icon-link">
            <span class="material-icons">shopping_cart</span>
          </a>
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
      <div class="navbar-links collapse navbar-collapse justify-content-center" id="prodNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link text-light" href="#" id="megaMenuTrigger">Catalog</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-light" href="faq.html">FAQ</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-light" href="delivery.html">Delivery</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-light" href="contact.html">Contact</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-light" href="returns.html">Returns</a>
          </li>
        </ul>
      </div>
    </div>
  `;

const megaMenu = renderMegaMenu(categoriesData);
nav.appendChild(megaMenu);

  // Filters to search page
  document.addEventListener('click', (e) => {
    if (e.target.matches('.genre-link')) {
      e.preventDefault();
      const value = e.target.dataset.genre;
      window.location.href = `search.html?genre=${encodeURIComponent(value)}`;
    }
    if (e.target.matches('.style-link')) {
      e.preventDefault();
      const value = e.target.dataset.style;
      window.location.href = `search.html?style=${encodeURIComponent(value)}`;
    }
    if (e.target.matches('.era-link')) {
      e.preventDefault();
      const value = e.target.dataset.era;
      window.location.href = `search.html?era=${encodeURIComponent(value)}`;
    }
    if (e.target.matches('.sale-link')) {
      e.preventDefault();
      const value = e.target.dataset.sale;
      window.location.href = `search.html?sale=${encodeURIComponent(value)}`;
    }
  });
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
  const genresItem = Array.from(document.querySelectorAll('a.nav-link')).find(el => el.textContent.trim() === 'Catalog');

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
      const isGenres = link.textContent.trim() === 'Catalog';
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
