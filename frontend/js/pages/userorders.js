

const ordersKey = 'orders';
const $results = document.getElementById('ordersContainer');

function getOrders() {
  return JSON.parse(localStorage.getItem(ordersKey)) || [];
}

function renderOrders() {
  const orders = getOrders();

  if (!orders.length) {
    $results.innerHTML = `
      <p class="text-muted">You haven’t placed any orders yet.</p>
      <a href="search.html" class="btn btn-outline-primary mt-3">Browse the catalog</a>
    `;
    return;
  }

  fetch('../assets/json/metadata.json')
    .then(res => res.json())
    .then(data => {
      $results.innerHTML = orders.map(order => {
        const itemsHTML = order.items.map(item => {
          const p = data.find(d => d.index === item.productIndex);
          if (!p) return '';
          return `
            <li class="order-item">
              <img src="../assets/images/album_artworks/artwork-${p.index}-600.webp" alt="${p.trackName}" />
              <div>
                <strong>${p.trackName}</strong><br />
                <small>${p.artistName}</small><br />
                <span>Quantity: ${item.quantity}</span>
              </div>
            </li>
          `;
        }).join('');

        return `
          <div class="order-card">
            <div class="order-header">
              <div>
                <strong>Order ID:</strong> ${order.orderId}<br />
                <small>${new Date(order.date).toLocaleString()}</small>
              </div>
              <div>
                <strong>Total:</strong> €${order.total.toFixed(2)}<br />
                <strong>Status:</strong> ${order.status || 'Pending'}<br />
                <button class="btn btn-sm btn-outline-secondary toggle-details">View Items</button>
              </div>
            </div>
            <div class="order-details" style="display:none;">
              <ul class="order-items-list">${itemsHTML}</ul>
            </div>
          </div>
        `;
      }).join('');

      document.querySelectorAll('.toggle-details').forEach(btn => {
        btn.addEventListener('click', () => {
          const details = btn.closest('.order-card').querySelector('.order-details');
          const isVisible = details.style.display === 'block';
          details.style.display = isVisible ? 'none' : 'block';
          btn.textContent = isVisible ? 'View Items' : 'Hide Items';
        });
      });
    });
}

renderOrders();
