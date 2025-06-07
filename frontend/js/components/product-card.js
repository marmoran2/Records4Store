export function renderProductCard(product, options = {}) {
  const {
    showAddToCart = false,
    showWishlist = false,
    onAddToCart = null,
    onWishlistToggle = null
  } = options;

  const wishlistIcon = showWishlist
    ? `<button class="wishlist-btn btn btn-link p-0" data-index="${product.index}" aria-label="Toggle Wishlist">
         <i class="bi bi-heart${isInWishlist(product.index) ? '-fill text-danger' : ''}"></i>
       </button>`
    : '';

  const addToCartBtn = showAddToCart
    ? `<button class="btn btn-sm btn-outline-primary add-to-cart-btn mt-2" data-index="${product.index}">
         <i class="bi bi-cart"></i> Add to Cart
       </button>`
    : '';

  return `
    <div class="product-card" data-index="${product.index}">
      <a href="product.html?index=${product.index}">
        <img src="${product.imageUrl}" alt="${product.trackName}" />
        <div class="product-card__body">
          <h5>${product.trackName}</h5>
          <p>${product.artistName}</p>
          <p class="text-muted">${product.genre} · ${product.releaseYear}</p>
        </div>
      </a>
      ${(showAddToCart || showWishlist)
        ? `<div class="product-card__actions d-flex justify-content-between align-items-center mt-2 px-2">
             ${wishlistIcon}
             ${addToCartBtn}
           </div>`
        : ''}
    </div>
  `;
}

function isInWishlist(index) {
  const wishlist = JSON.parse(localStorage.getItem('wishlistItems')) || [];
  return wishlist.includes(index);
}

export function bindProductCardEvents({ onAddToCart, onWishlistToggle }) {
  if (typeof onAddToCart === 'function') {
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const index = parseInt(btn.dataset.index, 10);
        onAddToCart(index);
      });
    });
  }

  if (typeof onWishlistToggle === 'function') {
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const index = parseInt(btn.dataset.index, 10);
        onWishlistToggle(index, btn);
      });
    });
  }
}
