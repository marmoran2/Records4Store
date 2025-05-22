// File: frontend/js/pages/cart.js

document.addEventListener('DOMContentLoaded', async () => {
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const container = document.getElementById('cartContent');
  
    if (!cart.length) {
      container.innerHTML = `<p class="text-muted">Your cart is empty.</p>`;
      document.getElementById('checkoutBtn').disabled = true;
      return;
    }
  
    try {
      const res = await fetch('../assets/json/metadata.json');
      const products = await res.json();
  
      let subtotal = 0;
  
      const cartItemsHtml = cart.map(item => {
        console.log('Looking for productIndex:', item.productIndex);
console.log('Available indexes:', products.map(p => p.index));
        const product = products.find(p => Number(p.index) === Number(item.productIndex));
        if (!product) return '';
  
        const itemTotal = item.quantity * (product.price || 20); // Default price
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
  
      const vat = subtotal * 0.23;
      const total = subtotal + vat;
  
      container.innerHTML = `
        <div class="cart-items">${cartItemsHtml}</div>
        <div class="cart-summary mt-4">
          <p>Subtotal: <strong>€${subtotal.toFixed(2)}</strong></p>
          <p>VAT (23%): <strong>€${vat.toFixed(2)}</strong></p>
          <p class="fs-5">Total: <strong>€${total.toFixed(2)}</strong></p>
        </div>
      `;
  
      // Quantity controls
      document.querySelectorAll('.cart-item').forEach(itemEl => {
        const index = parseInt(itemEl.dataset.index, 10);
        const minus = itemEl.querySelector('.minus');
        const plus = itemEl.querySelector('.plus');
        const quantityDisplay = itemEl.querySelector('.quantity');
        const remove = itemEl.querySelector('.remove-item');
  
        let item = cart.find(c => c.productIndex === index);
  
        plus.addEventListener('click', () => {
          item.quantity++;
          localStorage.setItem('cartItems', JSON.stringify(cart));
          location.reload();
        });
  
        minus.addEventListener('click', () => {
          if (item.quantity > 1) {
            item.quantity--;
          } else {
            cart.splice(cart.indexOf(item), 1);
          }
          localStorage.setItem('cartItems', JSON.stringify(cart));
          location.reload();
        });
  
        remove.addEventListener('click', () => {
          localStorage.setItem('cartItems', JSON.stringify(cart.filter(c => c.productIndex !== index)));
          location.reload();
        });
      });
  
    } catch (err) {
      console.error('Cart failed to load:', err);
      container.innerHTML = `<p class="text-danger">Failed to load cart data.</p>`;
    }
  
    document.getElementById('checkoutBtn').addEventListener('click', () => {
      if (!cart.length) return;
      window.location.href = 'checkout-delivery.html';
    });
  
    document.getElementById('continueShopping').addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  
    document.getElementById('emptyCart').addEventListener('click', () => {
      localStorage.removeItem('cartItems');
      location.reload();
    });
  });
  