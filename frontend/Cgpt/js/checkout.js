// File: js/pages/checkout.js
import { getCartItems, saveCartItems } from '../services/cartService.js';

let currentStep = 1;
let user = null;

document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('authUser'));
  const loginStatus = document.getElementById('loginStatus');
  localStorage.setItem('authUser', JSON.stringify({ email: 'test@example.com' }));

  // Show user info or guest prompt
  if (user?.email) {
    loginStatus.innerHTML = `
      <p class="text-success">You are logged in as <strong>${user.email}</strong>.</p>
    `;
    document.getElementById('continueToDelivery').classList.remove('d-none');
    document.getElementById('checkoutAsGuest').classList.add('d-none');
  } else {
    loginStatus.innerHTML = `
      <p class="text-danger">You are not logged in. You can continue as guest or <a href="login.html">log in</a>.</p>
    `;
    document.getElementById('continueToDelivery').classList.add('d-none');
    document.getElementById('checkoutAsGuest').classList.remove('d-none');
  }

  // Step logic
  document.getElementById('continueToDelivery')?.addEventListener('click', () => nextStep());
  document.getElementById('checkoutAsGuest')?.addEventListener('click', () => nextStep());

  function generateOrderId() {
    return 'ORD-' + Math.floor(100000 + Math.random() * 900000);
  }
  
  function renderConfirmation() {
      const cart = getCartItems();
    const delivery = {
      name: $('#deliveryName').val(),
      phone: $('#deliveryPhone').val(),
      address1: $('#deliveryAddress1').val(),
      address2: $('#deliveryAddress2').val(),
      city: $('#deliveryCity').val(),
      country: $('#deliveryCountry').val()
    };
  
    fetch('../assets/json/metadata.json')
      .then(res => res.json())
      .then(products => {
        const rows = [];
        let subtotal = 0;
  
        for (const item of cart) {
          const product = products.find(p => Number(p.index) === Number(item.productIndex));
          if (!product) continue;
  
          const price = product.price || 20;
          const total = price * item.quantity;
          subtotal += total;
  
          rows.push(`<li>${product.trackName} × ${item.quantity} – €${total.toFixed(2)}</li>`);
        }
  
        const vat = subtotal * 0.23;
        const grandTotal = subtotal + vat;
        const orderId = generateOrderId();
        const timestamp = new Date().toISOString();
  
        // Render
        $('#orderSummary').html(`
          <p><strong>Order ID:</strong> ${orderId}</p>
          <p><strong>Date:</strong> ${new Date(timestamp).toLocaleString()}</p>
          <p><strong>Shipping To:</strong><br />
            ${delivery.name}<br />
            ${delivery.address1} ${delivery.address2 ? `<br />${delivery.address2}` : ''}<br />
            ${delivery.city}, ${delivery.country}<br />
            Phone: ${delivery.phone}
          </p>
          <ul>${rows.join('')}</ul>
          <hr />
          <p><strong>Subtotal:</strong> €${subtotal.toFixed(2)}</p>
          <p><strong>VAT (23%):</strong> €${vat.toFixed(2)}</p>
          <p class="fs-5"><strong>Total:</strong> €${grandTotal.toFixed(2)}</p>
        `);
  
        // Save Order
        const order = {
          orderId,
          items: cart,
          total: grandTotal,
          date: timestamp,
          shipping: delivery
        };
  
        const existing = JSON.parse(localStorage.getItem('orders')) || [];
        existing.push(order);
        localStorage.setItem('orders', JSON.stringify(existing));
  
        // Clear cart
        saveCartItems([]);
      });
  }
  
  function nextStep() {
    const steps = document.querySelectorAll('.checkout-step');
    const indicators = document.querySelectorAll('.checkout-steps .step');
  
    steps.forEach(step => step.classList.remove('active'));
    indicators.forEach((el, i) => el.classList.toggle('active', i === currentStep));
  
    currentStep++;
    const next = document.querySelector(`.checkout-step[data-step="${currentStep}"]`);
    if (next) {
      next.classList.add('active');
      if (currentStep === 4) renderConfirmation();
    }
  }
  
});

function nextStep() {
  const steps = document.querySelectorAll('.checkout-step');
  const indicators = document.querySelectorAll('.checkout-steps .step');

  steps.forEach(step => step.classList.remove('active'));
  indicators.forEach((el, i) => el.classList.toggle('active', i === currentStep));

  currentStep++;
  const next = document.querySelector(`.checkout-step[data-step="${currentStep}"]`);
  if (next) next.classList.add('active');
}

// Prefill logic if user is logged in
if (user?.email) {
    $('#prefillOptions').removeClass('d-none');
  
    $('#prefillAddressBtn').on('click', async () => {
      const res = await fetch('../assets/json/users.json');
      const users = await res.json();
      const fullUser = users.find(u => u.email === user.email);
      if (!fullUser) return;
  
      $('#deliveryName').val(`${fullUser.firstName} ${fullUser.lastName}`);
      $('#deliveryAddress1').val(fullUser.addressLine1 || '');
      $('#deliveryAddress2').val(fullUser.addressLine2 || '');
      $('#deliveryCity').val(fullUser.city || '');
      $('#deliveryCountry').val(fullUser.country || '');
      $('#deliveryPhone').val(fullUser.phone || '');
    });
  }
  
  // Step 2 → Step 3 validation
  document.getElementById('toPaymentStep').addEventListener('click', () => {
    const requiredFields = [
      '#deliveryName',
      '#deliveryPhone',
      '#deliveryAddress1',
      '#deliveryCity',
      '#deliveryCountry'
    ];
  
    let valid = true;
    requiredFields.forEach(selector => {
      const input = document.querySelector(selector);
      if (!input.value.trim()) {
        input.classList.add('is-invalid');
        valid = false;
      } else {
        input.classList.remove('is-invalid');
      }
    });
  
    if (!valid) return;
  
    nextStep(); // Advances to Step 3
  });

  function renderCartSummary() {
  const cart = getCartItems();
  
    if (!cart.length) {
      $('#paymentCartSummary').html('<p class="text-danger">Cart is empty.</p>');
      return;
    }
  
    fetch('../assets/json/metadata.json')
      .then(res => res.json())
      .then(products => {
        let subtotal = 0;
        const rows = cart.map(item => {
          const product = products.find(p => Number(p.index) === Number(item.productIndex));
          if (!product) return '';
  
          const price = product.price || 20;
          const total = price * item.quantity;
          subtotal += total;
  
          return `<div class="d-flex justify-content-between small">
            <span>${product.trackName} × ${item.quantity}</span>
            <span>€${total.toFixed(2)}</span>
          </div>`;
        }).join('');
  
        const vat = subtotal * 0.23;
        const grandTotal = subtotal + vat;
  
        $('#paymentCartSummary').html(`
          <hr />
          ${rows}
          <hr />
          <div class="d-flex justify-content-between fw-bold">
            <span>Subtotal</span><span>€${subtotal.toFixed(2)}</span>
          </div>
          <div class="d-flex justify-content-between">
            <span>VAT (23%)</span><span>€${vat.toFixed(2)}</span>
          </div>
          <div class="d-flex justify-content-between fs-5 mt-2">
            <span>Total</span><span>€${grandTotal.toFixed(2)}</span>
          </div>
        `);
      });
  }
  
  document.getElementById('placeOrderBtn').addEventListener('click', () => {
    const required = ['#cardName', '#cardNumber', '#cardExpiry', '#cardCVC'];
    let valid = true;
  
    required.forEach(id => {
      const input = document.querySelector(id);
      if (!input.value.trim()) {
        input.classList.add('is-invalid');
        valid = false;
      } else {
        input.classList.remove('is-invalid');
      }
    });
  
    if (!valid) return;
  
    nextStep(); // Proceed to confirmation
  });
  
  renderCartSummary(); // Run on page load