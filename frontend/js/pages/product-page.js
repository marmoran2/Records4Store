import { addToCart, getWishlistItems, toggleWishlist } from '../services/cartService.js';
import { apiGet, API_BASE } from '../core/api.js';

document.addEventListener('DOMContentLoaded', async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const index = parseInt(urlParams.get('index'), 10);

  if (isNaN(index) || index < 1) {
    document.body.innerHTML = '<p class="text-center mt-5">Invalid product.</p>';
    return;
  }

  function updateWishlistIcon(button, index) {
    const list = getWishlistItems();
    const exists = list.includes(index);
    button.innerHTML = exists ? '<i class="bi bi-heart-fill"></i>' : '<i class="bi bi-heart"></i>';
    button.classList.toggle('text-danger', exists);
  }

  try {
      const product = await apiGet(`/products/${index}`);

      if (!product || !product.product_id) {
        document.body.innerHTML = '<p class="text-center mt-5">Product not found.</p>';
        return;
      }


    // Fill in product details
      document.getElementById('trackName').textContent = product.release.release_title;
      document.getElementById('artistName').textContent = product.release.artist.artist_name;
      document.getElementById('recordLabel').textContent = product.release.label.name;
      document.getElementById('collectionName').textContent = product.release.catalog_number;
      document.getElementById('releaseYear').textContent = new Date(product.release.released_date).getFullYear();
      document.getElementById('genre').textContent = product.release.genre.name;
      document.getElementById('sizeInches').textContent = `${product.size_inches}"`;
      document.getElementById('price').textContent = `€${product.price}`;
      document.getElementById('stockQty').textContent = product.stock_qty;

      // Artwork
      const image = document.getElementById('productImage');
      if (image && product.images?.[0]?.url) {
        // If your DB stores the full path like "ambient/ambient4-albumartwork.webp"
const imagePath = product.images[0].url.replace('/assets/images/releases/', '');
image.src = `/images/releases/${imagePath}`;
        image.alt = product.images[0].alt_text || 'Artwork';
      }

      // Tags
      document.getElementById('tags').textContent = product.tags.map(t => t.name).join(', ');

      // Tracklist
      const tracklistDiv = document.getElementById('tracklistContainer');
      product.release.tracks.forEach(track => {
        const entry = document.createElement('p');
        entry.innerHTML = `<strong>${track.side || track.track_number}.</strong> ${track.title}`;
        tracklistDiv.appendChild(entry);
      });

    // Parallax effect
    window.addEventListener('scroll', () => {
      image.style.transform = `translateY(${window.scrollY * 0.1}px)`;
    });

    // Add to Cart interaction (visual + logic)
    const btn = document.querySelector('.btn-add-cart');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      addToCart(index);
      btn.textContent = "Added!";
      btn.classList.add('added');
      setTimeout(() => {
        btn.textContent = "Add to Cart";
        btn.classList.remove('added');
      }, 1500);
    });

    // Wishlist interaction (toggle + icon state)
    const heartBtn = document.getElementById('wishlistBtn');
    if (heartBtn) {
      updateWishlistIcon(heartBtn, index);
      heartBtn.addEventListener('click', () => {
        toggleWishlist(index);
        updateWishlistIcon(heartBtn, index);
      });
    }

  } catch (err) {
    console.error('Failed to load product:', err);
    document.body.innerHTML = '<p class="text-center mt-5">Failed to load product data.</p>';
  }

  if (typeof setupPageTransitions === 'function') {
    setupPageTransitions();
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
});
