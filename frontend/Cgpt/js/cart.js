// File: frontend/js/pages/cart.js

import { getCartItems, saveCartItems, addToCart, removeFromCart } from '../services/cartService.js';

// Runs when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', async () => {
  const cart = getCartItems();
  const container = document.getElementById('cartContent');

  // Display empty cart message if no items in cart
  if (!cart.length) {
    container.innerHTML = `<p class="text-muted">Your cart is empty.</p>`;
    document.getElementById('checkoutBtn').disabled = true;
    return;
  }

  try {
    // Load product metadata to display cart details
    const res = await fetch('../assets/json/metadata.json');
    const products = await res.json();

    let subtotal = 0;

    // Generate cart item HTML elements
    const cartItemsHtml = cart.map(item => {
      const product = products.find(p => Number(p.index) === Number(item.productIndex));
      if (!product) return '';

      const itemTotal = item.quantity * (product.price || 20);
      subtotal += itemTotal;

      return `
        <div class="cart-item" data-index="${product.index}">
          <img src="../assets/images/album_artworks/artwork-${product.index}-600.webp" alt="${product.trackName}" />
          <div class="cart-details">
            <h5>${product.trackName}</h5>
            <p class="text-muted">${product.artistName}</p>
            <p>€${(product.price || 20).toFixed(2)} each</p>
            <div class="quantity-controls">
              <button class="btn btn-sm btn-outline-secondary minus">–</button>
              <span class="quantity">${item.quantity}</span>
              <button class="btn btn-sm btn-outline-secondary plus">+</button>
            </div>
            <p class="item-total">€${itemTotal.toFixed(2)}</p>
            <button class="btn btn-sm btn-link text-danger remove-item">Remove</button>
          </div>
        </div>
      `;
    }).join('');

    // Calculate VAT and total
    const vat = subtotal * 0.23;
    const total = subtotal + vat;

    // Populate cart details into DOM
    container.innerHTML = `
      <div class="cart-items">${cartItemsHtml}</div>
      <div class="cart-summary mt-4">
        <p>Subtotal: <strong>€${subtotal.toFixed(2)}</strong></p>
        <p>VAT (23%): <strong>€${vat.toFixed(2)}</strong></p>
        <p class="fs-5">Total: <strong>€${total.toFixed(2)}</strong></p>
      </div>
    `;

    // Quantity control logic
    document.querySelectorAll('.cart-item').forEach(itemEl => {
      const index = parseInt(itemEl.dataset.index, 10);
      const minus = itemEl.querySelector('.minus');
      const plus = itemEl.querySelector('.plus');
      const quantityDisplay = itemEl.querySelector('.quantity');
      const remove = itemEl.querySelector('.remove-item');

      // Handle quantity increase
      plus.addEventListener('click', () => {
        addToCart(index);
        quantityDisplay.textContent = Number(quantityDisplay.textContent) + 1;
        updateCartSummary();
      });

      // Handle quantity decrease or removal if quantity hits 0
      minus.addEventListener('click', () => {
        const currentQuantity = Number(quantityDisplay.textContent);
        if (currentQuantity > 1) {
          saveCartItems(cart.map(item => {
            if (item.productIndex === index) item.quantity--;
            return item;
          }));
          quantityDisplay.textContent = currentQuantity - 1;
        } else {
          removeFromCart(index);
          itemEl.remove();
        }
        updateCartSummary();
      });

      // Remove item from cart
      remove.addEventListener('click', () => {
        removeFromCart(index);
        itemEl.remove();
        updateCartSummary();
      });
    });

  } catch (err) {
    console.error('Cart failed to load:', err);
    container.innerHTML = `<p class="text-danger">Failed to load cart data.</p>`;
  }

  // Checkout button redirect
  document.getElementById('checkoutBtn').addEventListener('click', () => {
    if (!getCartItems().length) return;
    window.location.href = 'checkout-delivery.html';
  });

  // Continue shopping redirect
  document.getElementById('continueShopping').addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  // Empty cart action
  document.getElementById('emptyCart').addEventListener('click', () => {
    saveCartItems([]);
    container.innerHTML = `<p class="text-muted">Your cart is empty.</p>`;
    document.getElementById('checkoutBtn').disabled = true;
  });

  // Helper function to update cart summary (subtotal, VAT, total)
  async function updateCartSummary() {
    const cart = getCartItems();
    const res = await fetch('../assets/json/metadata.json');
    const products = await res.json();

    let subtotal = 0;
    cart.forEach(item => {
      const product = products.find(p => Number(p.index) === Number(item.productIndex));
      subtotal += item.quantity * (product.price || 20);
    });

    const vat = subtotal * 0.23;
    const total = subtotal + vat;

    document.querySelector('.cart-summary').innerHTML = `
      <p>Subtotal: <strong>€${subtotal.toFixed(2)}</strong></p>
      <p>VAT (23%): <strong>€${vat.toFixed(2)}</strong></p>
      <p class="fs-5">Total: <strong>€${total.toFixed(2)}</strong></p>
    `;
  }
});
