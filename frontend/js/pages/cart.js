// cart.js
import { apiGet, API_BASE, apiDelete } from '../core/api.js';

async function loadCart(userId) {
  try {
    const cartItems = await apiGet(`/orders/cart?userId=${userId}`);
    const cartWrapper = document.getElementById('cartItemsWrapper');
    const template = document.querySelector('.cart-item-template');
    let cartTotal = 0;

    if (!cartItems || cartItems.length === 0) {
      cartWrapper.innerHTML = '<p class="text-center mt-5">Your cart is empty.</p>';
      return;
    }

    // Clear existing contents
    cartWrapper.innerHTML = '';

    cartItems.forEach(async (item) => {
      const { product, quantity, cart_item_id } = item;
      const productDetails = await apiGet(`/products/${product.product_id}`);
      const release = productDetails.release;

      const clone = template.cloneNode(true);
      clone.classList.remove('d-none', 'cart-item-template');
      clone.classList.add('cart-item');

      // Fill in image
      const img = clone.querySelector('img');
      const imagePath = productDetails.images?.[0]?.url || '';
      const cleanedPath = imagePath.replace(/^\/assets/, '');
      img.src = `${API_BASE}${cleanedPath}`;
      img.alt = productDetails.images?.[0]?.alt_text || 'Artwork';

      // Fill in text fields (use classes not IDs)
      clone.querySelector('.product-title').textContent = release?.release_title || 'Unknown';
      clone.querySelector('.product-subtitle').textContent = release?.artist?.artist_name || 'Unknown Artist';
      clone.querySelector('.collection-name').textContent = release?.collection_name || 'N/A';
      clone.querySelector('.record-label').textContent = release?.label?.name || 'N/A';
      clone.querySelector('.catalog-number').textContent = release?.catalog_number || 'N/A';
      clone.querySelector('.price-each').textContent = `€${parseFloat(product.price).toFixed(2)}`;
      clone.querySelector('.cart-quantity').textContent = quantity;
      clone.querySelector('.cart-item-total').textContent = `€${(quantity * parseFloat(product.price)).toFixed(2)}`;

      // Add to running total
      cartTotal += quantity * parseFloat(product.price);

      // Remove button
      const removeBtn = clone.querySelector('.remove-item');
      removeBtn.addEventListener('click', async () => {
        try {
          await apiDelete(`/orders/cart/${cart_item_id}`);
          loadCart(userId); // Reload the cart after removal
        } catch (err) {
          console.error('Failed to remove item from cart:', err);
        }
      });

      // Append to DOM
      cartWrapper.appendChild(clone);
    });

    // Show total if needed
    const summaryEl = document.getElementById('cartSummary');
    if (summaryEl) {
      summaryEl.textContent = `Total: €${cartTotal.toFixed(2)}`;
    }

  } catch (error) {
    console.error('Cart failed to load:', error);
  }
}

// Parse userId from URL and trigger load
const params = new URLSearchParams(window.location.search);
const userId = params.get('userId');
if (userId) {
  document.addEventListener('DOMContentLoaded', () => loadCart(userId));
}
