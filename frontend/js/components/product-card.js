function renderProductCard(product) {
  return `
    <div class="product-card card mb-4" style="width: 18rem;">
      <img src="../assets/images/album_artworks/artwork-${product.index}-600.webp" class="card-img-top" alt="${product.trackName} artwork">
      <div class="card-body">
        <h5 class="card-title">${product.trackName}</h5>
        <p class="card-text text-muted">${product.artistName}</p>
        <p class="card-text">${product.genre} · ${product.releaseYear}</p>
        <a href="product.html?index=${product.index}" class="btn btn-primary" data-transition="product">View</a>
      </div>
    </div>
  `;
}
function getWishlist() {
  return JSON.parse(localStorage.getItem('wishlist')) || [];
}

function saveWishlist(items) {
  localStorage.setItem('wishlist', JSON.stringify(items));
}

function toggleWishlist(productIndex, button) {
  let wishlist = getWishlist();
  const index = wishlist.findIndex(item => item.productIndex === productIndex);

  if (index > -1) {
    wishlist.splice(index, 1);
    button.classList.remove('text-danger');
    button.innerHTML = '<i class="bi bi-heart"></i>';
  } else {
    wishlist.push({ productIndex });
    button.classList.add('text-danger');
    button.innerHTML = '<i class="bi bi-heart-fill"></i>';
  }

  saveWishlist(wishlist);
}
function renderWishlistIcons() {
  const wishlist = getWishlist();
  document.querySelectorAll('[data-wishlist-btn]').forEach(btn => {
    const index = parseInt(btn.dataset.index, 10);
    const isSaved = wishlist.some(item => item.productIndex === index);
    btn.innerHTML = isSaved ? '<i class="bi bi-heart-fill"></i>' : '<i class="bi bi-heart"></i>';
    btn.classList.toggle('text-danger', isSaved);

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleWishlist(index, btn);
    });
  });
}
