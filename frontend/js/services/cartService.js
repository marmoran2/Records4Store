export const CART_KEY = 'cartItems';
export const WISHLIST_KEY = 'wishlistItems';


// === CART FUNCTIONS ===

import {
  getCart,
  addToCart as apiAddToCart,
  updateCartItem,
  removeCartItem,
  emptyCart, getLoggedInUser
} from '../core/api.js';

export async function getCartCount() {
  const user = await getLoggedInUser();
  const cart = await getCart(user.id);
  return cart.reduce((total, item) => total + item.quantity, 0);
}

export async function getCartItems(userId) {
  return await getCart(userId);
}

export async function addToCart(productId, quantity = 1) {
  return await apiAddToCart(productId, quantity);
}

export async function updateQuantity(cartItemId, quantity) {
  return await updateCartItem(cartItemId, quantity);
}

export async function removeFromCart(cartItemId) {
  return await removeCartItem(cartItemId);
}

export async function clearCart(userId) {
  return await emptyCart(userId);
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
