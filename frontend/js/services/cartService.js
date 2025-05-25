export const CART_KEY = 'cartItems';
export const WISHLIST_KEY = 'wishlistItems';

// === CART FUNCTIONS ===

function loadCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function getCartItems() {
  return loadCart();
}

export function getCartCount() {
  return loadCart().reduce((sum, item) => sum + item.quantity, 0);
}

export function addToCart(index, quantity = 1) {
  const cart = loadCart();
  const existing = cart.find(item => item.index === index);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ index, quantity });
  }
  saveCart(cart);
}

export function removeFromCart(index) {
  const cart = loadCart().filter(item => item.index !== index);
  saveCart(cart);
}

export function updateQuantity(index, quantity) {
  const cart = loadCart().map(item =>
    item.index === index ? { ...item, quantity } : item
  );
  saveCart(cart);
}

export function clearCart() {
  localStorage.removeItem(CART_KEY);
}

// === WISHLIST FUNCTIONS ===

export function getWishlistItems() {
  return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
}

export function toggleWishlist(index) {
  const wishlist = getWishlistItems();
  const pos = wishlist.indexOf(index);
  if (pos > -1) wishlist.splice(pos, 1);
  else wishlist.push(index);
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
}
