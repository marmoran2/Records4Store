export const CART_KEY = 'cartItems';
export const WISHLIST_KEY = 'wishlistItems';


// === CART FUNCTIONS ===

import { apiGet, apiPost, apiDelete, getCurrentSession } from '../core/api.js';

let cachedUserId = null;

async function ensureUserSession() {
  if (cachedUserId) return cachedUserId;

  const session = await getCurrentSession();
  const userId = session?.user_id || session?.id;

  if (!userId) {
    throw new Error('User session not found');
  }

  cachedUserId = userId;
  return userId;
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


// === WISHLIST FUNCTIONS (Backend-based) ===

export async function getWishlistItems() {
  const userId = await ensureUserSession();
  return apiGet(`/users/${userId}/wishlist`);
}

export async function toggleWishlist(productId) {
  const userId = await ensureUserSession();

  try {
    await apiDelete(`/users/${userId}/wishlist/${productId}`);
    console.log(`Removed product ${productId} from wishlist`);
  } catch (err) {
    if (err.status === 404) {
      await apiPost(`/users/${userId}/wishlist`, { product_id: productId });
      console.log(`Added product ${productId} to wishlist`);
    } else {
      throw err;
    }
  }
}
