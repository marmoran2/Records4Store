// cart.js
import { apiGet } from '../services/api.js';

const API_BASE = 'http://localhost:3000'; // Ensure this matches your backend

async function loadCart(userId) {
  try {
    const cartItems = await apiGet(`/orders/cart?userId=${userId}`);
    const cartWrapper = document.getElementById('cartItemsWrapper');
    const template = document.querySelector('.cart-item-template');

    if (!cartItems || cartItems.length === 0) {
      cartWrapper.innerHTML = '<p class="text-center mt-5">Your cart is empty.</p>';
      return;
    }

    cartItems.forEach(async (item) => {
      const product = item.product;
      const productDetails = await apiGet(`/products/${product.product_id}`);
      const release = productDetails.release;

      const clone = template.cloneNode(true);
      clone.classList.remove('d-none');
      clone.classList.remove('cart-item-template');
      clone.classList.add('cart-item');

      // Fill in image
      const img = clone.querySelector('img');
      const imagePath = productDetails.images?.[0]?.url?.replace(/^\/assets/, '') || '';
      img.src = `${API_BASE}${imagePath}`;
      img.alt = productDetails.images?.[0]?.alt_text || 'Artwork';

      // Fill in text fields
      clone.querySelector('#cartTrackName').textContent = release.release_title;
      clone.querySelector('#cartArtistName').textContent = release.artist.artist_name;
      clone.querySelector('#cartCollectionName').textContent = release.collection_name || 'N/A';
      clone.querySelector('#cartRecordLabel').textContent = release.label.name;
      clone.querySelector('#cartCatalogNumber').textContent = release.catalog_number;
      clone.querySelector('#cartPriceEach').textContent = `€${parseFloat(product.price).toFixed(2)}`;
      clone.querySelector('#cartQuantity').textContent = item.quantity;
      clone.querySelector('#cartItemTotal').textContent = `€${(item.quantity * parseFloat(product.price)).toFixed(2)}`;

      // Append to cart
      cartWrapper.appendChild(clone);
    });
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