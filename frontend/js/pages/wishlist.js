import {
  getWishlistItems,
  toggleWishlist,
  addToCart
} from '../services/cartService.js';

import {
  renderProductCard,
  bindProductCardEvents
} from '../components/product-card.js';

const $results = document.getElementById('resultsContainer');

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
        const product = data.find(p => p.index === productIndex);
        if (!product) return '';
        return renderProductCard(product, {
          showAddToCart: true,
          showWishlist: true
        });
      }).join('');

      $results.innerHTML = html;

      // Attach wishlist & cart logic after DOM render
      bindProductCardEvents({
        onAddToCart: (index) => {
          addToCart(index);
          alert('Added to cart');
        },
        onWishlistToggle: (index) => {
          toggleWishlist(index);
          renderWishlist(); // refresh UI after toggle
        }
      });
    });
}

renderWishlist();