export const API_BASE = '/api';

function apiPath(endpoint) {
  return `${API_BASE}${endpoint}`;
}

async function handleResponse(res, method, endpoint) {
  if (!res.ok) {
    const error = new Error(`${method} ${endpoint} failed: ${res.status}`);
    error.status = res.status;
    throw error;
  }
  return res.json();
}

export async function apiGet(endpoint) {
  const res = await fetch(apiPath(endpoint), {
    method: 'GET',
    credentials: 'include',
  });
  return handleResponse(res, 'GET', endpoint);
}

export async function apiPost(endpoint, data = {}) {
  const res = await fetch(apiPath(endpoint), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  return handleResponse(res, 'POST', endpoint);
}

export async function apiPut(endpoint, data = {}) {
  const res = await fetch(apiPath(endpoint), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  return handleResponse(res, 'PUT', endpoint);
}

export async function apiDelete(endpoint) {
  const res = await fetch(apiPath(endpoint), {
    method: 'DELETE',
    credentials: 'include',
  });
  return handleResponse(res, 'DELETE', endpoint);
}

// ──────── AUTH ────────
export async function login(email, password) {
  return apiPost('/users/login', { email, password });
}
export async function register(userData) {
  return apiPost('/users/register', userData);
}
export async function logout() {
  return apiPost('/users/logout');
}

export async function getCurrentSession() {
  console.log('[Session Check] Calling /users/loggedIn');
  const user = await apiGet('/users/loggedIn');
  console.log('[Session Check] Response:', user);
  return user;
}

// ──────── CART ────────
export async function getCart(userId) {
  return apiGet(`/orders/cart?userId=${userId}`);
}
export async function addToCart(productId, quantity = 1) {
  return apiPost('/orders/cart', { productId, quantity });
}
export async function updateCartItem(cartItemId, quantity) {
  return apiPut(`/orders/cart/${cartItemId}`, { quantity });
}
export async function removeCartItem(cartItemId) {
  return apiDelete(`/orders/cart/${cartItemId}`);
}
export async function emptyCart(userId) {
  return apiDelete(`/orders/cart?userId=${userId}`);
}

// ──────── CHECKOUT ────────
export async function checkout(orderPayload) {
  return apiPost('/orders/checkout', orderPayload);
}
