
// Updated search.js to support multi-select filters

const $results = $('#resultsContainer');
const $queryText = $('#searchQueryDisplay');
const $filterTags = $('<div id="activeFilters" class="mb-3"></div>').insertBefore($results);

const filters = ['genre', 'year', 'label', 'country', 'style'];
const ITEMS_PER_PAGE = 12;

let fullMatchResults = [];
let currentPage = 1;

function getURLParams() {
  const params = new URLSearchParams(location.search);
  const query = params.get('query')?.toLowerCase() || '';
  const selected = {};
  filters.forEach(f => selected[f] = params.getAll(f));
  return { query, ...selected };
}

function updateURLParams(params) {
  const url = new URL(location.href);
  const newParams = new URLSearchParams();

  if (params.query) newParams.set('query', params.query);
  filters.forEach(f => {
    params[f].forEach(val => newParams.append(f, val));
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

  const fMatch = filters.genre.length === 0 || filters.genre.includes(p.genre);
  const yMatch = filters.year.length === 0 || filters.year.includes(String(p.releaseYear));
  const lMatch = filters.label.length === 0 || filters.label.includes(p.recordLabel);
  const cMatch = filters.country.length === 0 || filters.country.includes(p.country);
  const sMatch = filters.style.length === 0 || filters.style.includes(p.style);

  return qMatch && fMatch && yMatch && lMatch && cMatch && sMatch;
}

function renderProducts(products) {
  const start = 0;
  const end = ITEMS_PER_PAGE * currentPage;
  const sliced = products.slice(0, end);

  if (!sliced.length) {
    $results.html(\`
      <p class="text-danger">No products found based on your search criteria.</p>
      <a class="btn btn-outline-secondary mt-3" href="product.html">Browse All</a>
    \`);
    $('#loadMoreBtn').hide();
    return;
  }

  const html = sliced.map(p => \`
    <div class="product-card">
      <a href="product.html?index=\${p.index}">
        <img src="\${p.imageUrl}" alt="\${p.trackName}" />
        <div class="card-body">
          <h5>\${p.trackName}</h5>
          <p>\${p.artistName}</p>
          <p class="text-muted">\${p.genre} · \${p.releaseYear}</p>
        </div>
      </a>
    </div>
  \`).join('');

  $results.html(html);
  $('#loadMoreBtn').toggle(end < products.length);
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
    const selected = new URLSearchParams(location.search).getAll(f);
    const sorted = Array.from(sets[f]).sort();

    sorted.forEach(opt => {
      const o = document.createElement('option');
      o.value = opt;
      o.textContent = opt;
      if (selected.includes(opt)) o.selected = true;
      select.appendChild(o);
    });

    select.addEventListener('change', () => {
      const current = getURLParams();
      current[f] = Array.from(select.selectedOptions).map(o => o.value);
      updateURLParams(current);
      currentPage = 1;
      filterAndRender(current, products);
    });
  });
}

function renderFilterTags(params) {
  $filterTags.empty();
  filters.forEach(f => {
    params[f].forEach(val => {
      const tag = $(\`<span class="badge bg-secondary me-2 mb-2">\${f}: \${val} <button class="btn-close btn-close-white btn-sm ms-2" data-filter="\${f}" data-value="\${val}"></button></span>\`);
      $filterTags.append(tag);
    });
  });

  $('.btn-close').on('click', function () {
    const f = $(this).data('filter');
    const v = $(this).data('value');
    const params = getURLParams();
    params[f] = params[f].filter(x => x !== v);
    updateURLParams(params);
    filterAndRender(params, fullMatchResults);
  });
}

function filterAndRender(params, allProducts) {
  $queryText.text(params.query ? \`Showing results for: "\${params.query}"\` : 'All Results');
  fullMatchResults = allProducts.filter(p => matchProduct(p, params.query, params));
  currentPage = 1;
  renderProducts(fullMatchResults);
  renderFilterTags(params);
}

$('#loadMoreBtn').on('click', () => {
  currentPage++;
  renderProducts(fullMatchResults);
});

document.addEventListener('DOMContentLoaded', async () => {
  const params = getURLParams();
  const res = await fetch('/api/products');
  const rawProducts = await res.json();

  const allProducts = rawProducts.map(p => ({
    index: p.product_id,
    trackName: p.release?.release_title || '',
    artistName: p.release?.artist?.artist_name || '',
    recordLabel: p.release?.label?.name || '',
    collectionName: p.release?.catalog_number || '',
    releaseYear: p.release?.released_date ? new Date(p.release.released_date).getFullYear() : '',
    genre: p.release?.genre?.name || '',
    country: p.release?.country || '',
    style: Array.isArray(p.release?.styles) ? p.release.styles[0] : '',
    imageUrl: p.images?.[0]?.url ? \`/images/releases/\${p.images[0].url.replace('/assets/images/releases/', '')}\` : ''
  }));

  populateFilters(allProducts);
  filterAndRender(params, allProducts);
});
