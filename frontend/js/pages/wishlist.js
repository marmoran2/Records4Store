import { getWishlistItems, toggleWishlist, removeFromCart, addToCart } from '../services/cartService.js';

const $results = document.getElementById('resultsContainer');

window.removeFromWishlist = function (productIndex) {
  toggleWishlist(productIndex);
  renderWishlist();
};

window.addToCart = function (productIndex) {
  addToCart(productIndex);
  alert('Added to cart');
};

function renderWishlist() {
  const wishlist = getWishlistItems();

  if (!wishlist.length) {
    $results.innerHTML = `
      <p class="text-muted">Looks like your wishlist is empty, browse our catalog to find your next record.</p>
      <a class="btn btn-outline-secondary mt-3" href="search.html">Browse All</a>
    `;
    return;
  }

  fetch('../assets/json/metadata.json')
    .then(res => res.json())
    .then(data => {
      const html = wishlist.map((productIndex) => {
        const p = data.find(p => p.index === productIndex);
        if (!p) return '';

        return `
          <div class="product-card">
            <a href="product.html?index=${p.index}">
              <img src="../assets/images/album_artworks/artwork-${p.index}-600.webp" alt="${p.trackName}" />
              <div class="card-body">
                <h5>${p.trackName}</h5>
                <p>${p.artistName}</p>
                <p class="text-muted small">${p.genre} · ${p.releaseYear}</p>
              </div>
            </a>
            <div class="d-flex justify-content-between align-items-center p-2">
              <button class="btn btn-sm btn-outline-danger" onclick="removeFromWishlist(${p.index})">
                <i class="bi bi-heart-fill"></i> Remove
              </button>
              <button class="btn btn-sm btn-outline-primary" onclick="addToCart(${p.index})">
                <i class="bi bi-cart"></i> Add to Cart
              </button>
            </div>
          </div>
        `;
      }).join('');

      $results.innerHTML = html;
    });
}

// Initialize wishlist rendering
renderWishlist();