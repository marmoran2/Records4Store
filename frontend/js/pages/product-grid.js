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

    filtered.forEach(p => {
      $grid.append(renderProductCard(p));
    });
  }

  fetchProducts()
    .then(data => {
      allProducts = data;
      populateFilters();
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
