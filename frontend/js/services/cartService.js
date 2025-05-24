export const CART_KEY = 'cartItems';
export const WISHLIST_KEY = 'wishlistItems';

export function getCartItems() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

export function saveCartItems(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function addToCart(productId) {
  const cart = getCartItems();
  const item = cart.find(i => i.productId === productId);
  if (item) item.quantity++;
  else cart.push({ productId, quantity: 1 });
  saveCartItems(cart);
}

export function removeFromCart(productId) {
  const cart = getCartItems().filter(i => i.productId !== productId);
  saveCartItems(cart);
}

export function getWishlistItems() {
  return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
}

export function toggleWishlist(productId) {
  const wishlist = getWishlistItems();
  const index = wishlist.indexOf(productId);
  if (index > -1) wishlist.splice(index, 1);
  else wishlist.push(productId);
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
}