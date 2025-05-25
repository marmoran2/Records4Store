// File: js/pages/product-grid.js

import { renderProductCard } from '../components/product-card.js';

$(function () {
  let allProducts = [];

  function fetchProducts() {
    return fetch('../assets/json/metadata.json')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      });
  }

  function populateFilters() {
    const genres = [...new Set(allProducts.map(p => p.genre))].sort();
    const years = [...new Set(allProducts.map(p => p.releaseYear))].sort((a, b) => b - a);

    genres.forEach(g => $('#genreFilter').append(`<option value="${g}">${g}</option>`));
    years.forEach(y => $('#yearFilter').append(`<option value="${y}">${y}</option>`));
  }

  function renderGrid() {
    const genre = $('#genreFilter').val();
    const year = parseInt($('#yearFilter').val(), 10);

    const filtered = allProducts.filter(p =>
      (!genre || p.genre === genre) &&
      (!year || p.releaseYear === year)
    );

    const $grid = $('#productGrid');
    $grid.empty();

    if (filtered.length === 0) {
      $grid.append(`<p class="text-muted mt-4">No products match your filters.</p>`);
      return;
    }

    const html = filtered.map(p => renderProductCard(p)).join('');
    $grid.append(html);
  }

  // Read query param to preselect filter
  function applyQueryFilter() {
    const params = new URLSearchParams(window.location.search);
    const preGenre = params.get('category');
    if (preGenre) {
      $('#genreFilter').val(preGenre);
    }
  }

  fetchProducts()
    .then(data => {
      allProducts = data;
      populateFilters();
      applyQueryFilter();
      renderGrid();
    })
    .catch(err => {
      console.error('Failed to load products:', err);
      $('#productGrid').html('<p class="text-danger">Failed to load products. Please try again later.</p>');
    });

  $('#genreFilter, #yearFilter').on('change', renderGrid);
  $('#resetFilters').on('click', () => {
    $('#genreFilter, #yearFilter').val('');
    renderGrid();
  });
});
