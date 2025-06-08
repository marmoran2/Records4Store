import {
  getWishlistItems,
  toggleWishlist,
  addToCart
} from '../services/cartService.js';

import {
  renderProductCard,
  bindProductCardEvents
} from '../components/product-card.js';

import { initSession } from '../core/session.js';

document.addEventListener('DOMContentLoaded', async () => {
  console.log('[Wishlist] DOMContentLoaded');

  const user = await initSession({ requireAuth: true });
  console.log('[Wishlist] Session user:', user);
  if (!user) return;

  renderWishlist();
});

const $results = document.getElementById('resultsContainer');

async function renderWishlist() {
  console.log('[Wishlist] Rendering wishlist');

  try {
    const wishlist = await getWishlistItems();
    console.log('[Wishlist] Raw wishlist response:', wishlist);

    if (!wishlist.length) {
      $results.innerHTML = `
        <p class="text-muted">Looks like your wishlist is empty, browse our catalog to find your next record.</p>
        <a class="btn btn-outline-secondary mt-3" href="search.html">Browse All</a>
      `;
      return;
    }

    const html = wishlist.map(item => {
      const product = item.product;
      if (!product || !product.product_id) {
        console.warn('[Wishlist] Invalid product:', item);
        return '';
      }

      // Patch with fallbacks for UI compatibility
      const patchedProduct = {
        ...product,
        index: product.product_id,
        id: product.product_id,
        trackName: product.trackName || 'Untitled Track',
        artistName: product.artistName || 'Unknown Artist',
        genre: product.genre || 'Unknown Genre',
        releaseYear: product.releaseYear || '—',
        imageUrl: product.imageUrl
          ? `/images/releases/${product.imageUrl.replace(/^.*?releases\//, '')}`
          : '../assets/img/default.jpg',
      };

      console.log('[Wishlist] Rendering product:', patchedProduct);

      return renderProductCard(patchedProduct, {
        showAddToCart: true,
        showWishlist: true
      });
    }).join('');

    $results.innerHTML = html;

    bindProductCardEvents({
      onAddToCart: (productId) => {
        console.log('[Wishlist] Add to cart:', productId);
        addToCart(productId);
        alert('Added to cart');
      },
      onWishlistToggle: async (productId) => {
        console.log('[Wishlist] Toggle wishlist for:', productId);
        await toggleWishlist(productId);
        renderWishlist(); // refresh UI
      }
    });

  } catch (err) {
    console.error('[Wishlist] Failed to load:', err);
    $results.innerHTML = `<p class="text-danger">Error loading wishlist.</p>`;
  }
}
