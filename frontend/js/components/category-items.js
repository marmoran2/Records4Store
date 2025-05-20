
// Data for your catalog submenu
const catalogItems = [
    { name: 'Genres', href: '#' },
    { name: 'Period (90s, etc.)', href: '#' },
    { name: 'Style', href: '#' },
    { name: 'Top Labels', href: '#' },
  ];
  
  // Populate the “Catalog” dropdown
  function fillCatalogMenu() {
    const ul = document.getElementById('catalog-menu');
    if (!ul) return;
    ul.innerHTML = catalogItems
      .map(i => `<li><a class="dropdown-item" href="${i.href}">${i.name}</a></li>`)
      .join('');
  }
  
  document.addEventListener('DOMContentLoaded', fillCatalogMenu);
  