// File: frontend/js/pages/search.js

const $results = $('#resultsContainer');
const $queryText = $('#searchQueryDisplay');

const filters = ['genre', 'year', 'label', 'country', 'style'];
const ITEMS_PER_PAGE = 12;

let fullMatchResults = [];
let currentPage = 1;

function getURLParams() {
  const params = new URLSearchParams(location.search);
  const query = params.get('query')?.toLowerCase() || '';
  const selected = {};
  filters.forEach(f => selected[f] = params.get(f) || '');
  return { query, ...selected };
}

function updateURLParams(params) {
  const url = new URL(location.href);
  const newParams = new URLSearchParams();

  if (params.query) newParams.set('query', params.query);
  filters.forEach(f => {
    if (params[f]) newParams.set(f, params[f]);
  });

  url.search = newParams.toString();
  history.replaceState(null, '', url);
}

function matchProduct(p, query, filters) {
  const qMatch = query === '' || (
    p.trackName?.toLowerCase().includes(query) ||
    p.artistName?.toLowerCase().includes(query) ||
    p.genre?.toLowerCase().includes(query) ||
    p.collectionName?.toLowerCase().includes(query) ||
    p.recordLabel?.toLowerCase().includes(query) ||
    String(p.releaseYear).includes(query)
  );

  const fMatch = (
    (!filters.genre || p.genre === filters.genre) &&
    (!filters.year || String(p.releaseYear) === filters.year) &&
    (!filters.label || p.recordLabel === filters.label) &&
    (!filters.country || p.country === filters.country) &&
    (!filters.style || p.style === filters.style)
  );

  return qMatch && fMatch;
}

function renderProducts(products) {
    const start = 0;
    const end = ITEMS_PER_PAGE * currentPage;
    const sliced = products.slice(0, end);
  
    if (!sliced.length) {
      $results.html(`
        <p class="text-danger">No products found based on your search criteria.</p>
        <a class="btn btn-outline-secondary mt-3" href="product.html">Browse All</a>
      `);
      $('#loadMoreBtn').hide();
      return;
    }
  
    const html = sliced.map(p => `
      <div class="product-card">
        <a href="product.html?index=${p.index}">
          <img src="../assets/images/album_artworks/artwork-${p.index}-600.webp" alt="${p.trackName}" />
          <div class="card-body">
            <h5>${p.trackName}</h5>
            <p>${p.artistName}</p>
            <p class="text-muted">${p.genre} · ${p.releaseYear}</p>
          </div>
        </a>
      </div>
    `).join('');
  
    $results.html(html);
  
    if (end >= products.length) {
      $('#loadMoreBtn').hide();
    } else {
      $('#loadMoreBtn').show();
    }
  }

function populateFilters(products) {
  const sets = {
    genre: new Set(),
    year: new Set(),
    label: new Set(),
    country: new Set(),
    style: new Set()
  };

  products.forEach(p => {
    if (p.genre) sets.genre.add(p.genre);
    if (p.releaseYear) sets.year.add(String(p.releaseYear));
    if (p.recordLabel) sets.label.add(p.recordLabel);
    if (p.country) sets.country.add(p.country);
    if (p.style) sets.style.add(p.style);
  });

  filters.forEach(f => {
    const select = document.getElementById(f + 'Filter');
    const selected = new URLSearchParams(location.search).get(f);
    const sorted = Array.from(sets[f]).sort();

    sorted.forEach(opt => {
      const o = document.createElement('option');
      o.value = opt;
      o.textContent = opt;
      if (selected === opt) o.selected = true;
      select.appendChild(o);
    });

    select.addEventListener('change', () => {
        const current = getURLParams();
        current[f] = select.value;
        updateURLParams(current);
        currentPage = 1; // 🟡 Reset pagination to first page
        filterAndRender(current, products); // 🟡 Re-run full match + render page 1
      });
  });
}

function filterAndRender(params, allProducts) {
    $queryText.text(params.query ? `Showing results for: "${params.query}"` : 'All Results');
    fullMatchResults = allProducts.filter(p => matchProduct(p, params.query, params));
    currentPage = 1;
    renderProducts(fullMatchResults);
  }
  $('#loadMoreBtn').on('click', () => {
    currentPage++;
    renderProducts(fullMatchResults);
  });

document.addEventListener('DOMContentLoaded', async () => {
  const params = getURLParams();
  const res = await fetch('../assets/json/metadata.json');
  const allProducts = await res.json();

  populateFilters(allProducts);
  filterAndRender(params, allProducts);
});