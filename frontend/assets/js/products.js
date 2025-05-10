$(function() {
    let allProducts = [];
  
    // Populate filter dropdowns
    function populateFilters() {
      const genres = [...new Set(allProducts.map(p => p.genre))].sort();
      const years  = [...new Set(allProducts.map(p => p.releaseYear))].sort((a,b)=>b-a);
  
      genres.forEach(g => $('#genreFilter').append(`<option value="${g}">${g}</option>`));
      years.forEach(y => $('#yearFilter').append(`<option value="${y}">${y}</option>`));
    }
  
    // Render grid with optional filters
    function renderGrid() {
      const genre = $('#genreFilter').val();
      const year  = parseInt($('#yearFilter').val(),10) || null;
      $('#productGrid').empty();
  
      allProducts
        .filter(p => (!genre || p.genre===genre) && (!year || p.releaseYear===year))
        .forEach(p => $('#productGrid').append(renderProductCard(p)));
    }
  
    // Init
    fetchProducts().then(data => {
      allProducts = data;
      populateFilters();
      renderGrid();
    });
  
    // Filter events
    $('#genreFilter, #yearFilter').on('change', renderGrid);
    $('#resetFilters').on('click', () => {
      $('#genreFilter, #yearFilter').val('');
      renderGrid();
    });
  });
  