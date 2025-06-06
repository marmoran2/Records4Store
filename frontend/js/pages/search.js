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
  filters.forEach(f => {
    const value = params.get(f);
    selected[f] = value ? value.split(',') : [];
  });
  return { query, ...selected };
}

function updateURLParams(params) {
  const url = new URL(location.href);
  const newParams = new URLSearchParams();

  if (params.query) newParams.set('query', params.query);
  filters.forEach(f => {
    if (params[f] && params[f].length > 0) {
      newParams.set(f, params[f].join(','));
    }
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
    (!filters.genre.length || filters.genre.includes(p.genre)) &&
    (!filters.year.length || filters.year.includes(String(p.releaseYear))) &&
    (!filters.label.length || filters.label.includes(p.recordLabel)) &&
    (!filters.country.length || filters.country.includes(p.country)) &&
    (!filters.style.length || filters.style.includes(p.style))
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
        <img src="${p.imageUrl}" alt="${p.trackName}" />
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

  const current = getURLParams();

    filters.forEach(f => {
      const list = document.getElementById(f + 'Filter'); // ✅ use UL, not SELECT
      const sorted = Array.from(sets[f]).sort();

      sorted.forEach(opt => {
        const li = document.createElement('li');
        li.innerHTML = `
          <label class="dropdown-item form-check-label">
            <input type="checkbox" class="form-check-input me-2" value="${opt}" ${current[f].includes(opt) ? 'checked' : ''} />
            ${opt}
          </label>
        `;
        list.appendChild(li);
      });

      list.addEventListener('input', (e) => {
        if (e.target.tagName === 'INPUT') {
          const selectedOptions = Array.from(list.querySelectorAll('input:checked')).map(input => input.value);
          const updated = getURLParams();
          updated[f] = selectedOptions;
          updateURLParams(updated);
          currentPage = 1;
          filterAndRender(updated, products);
        }
      });
    });
  }

function displayQuerySummary(params) {
  const tags = [];

  if (params.query) tags.push(`<strong>Query:</strong> "${params.query}"`);

  filters.forEach(f => {
    if (params[f] && params[f].length > 0) {
      tags.push(`<strong>${f.charAt(0).toUpperCase() + f.slice(1)}:</strong> ${params[f].join(', ')}`);
    }
  });

  $queryText.html(tags.length ? `Showing results for: ${tags.join(' · ')}` : 'All Results');
}

function filterAndRender(params, allProducts) {
  displayQuerySummary(params);
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
    imageUrl: p.images?.[0]?.url ? `/images/releases/${p.images[0].url.replace('/assets/images/releases/', '')}` : ''
  }));

  populateFilters(allProducts);
  filterAndRender(params, allProducts);
});
