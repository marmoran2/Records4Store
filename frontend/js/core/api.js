// js/core/api.js

// Always use localhost since you're not deploying to production
export const API_BASE = 'http://localhost:3000';

/**
 * Returns a full API URL for any endpoint.
 * Usage: apiPath('/products/1') → http://localhost:3000/api/products/1
 */
export function apiPath(endpoint) {
  return `${API_BASE}/api${endpoint}`;
}

/**
 * Perform a GET request.
 * @param {string} endpoint - API endpoint (e.g. '/products/1')
 * @returns {Promise<any>}
 */
export async function apiGet(endpoint) {
  const res = await fetch(apiPath(endpoint));
  if (!res.ok) throw new Error(`GET ${endpoint} failed: ${res.status}`);
  return res.json();
}

/**
 * Perform a POST request with JSON payload.
 * @param {string} endpoint
 * @param {object} data
 * @returns {Promise<any>}
 */
export async function apiPost(endpoint, data = {}) {
  const res = await fetch(apiPath(endpoint), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(`POST ${endpoint} failed: ${res.status}`);
  return res.json();
}

/**
 * Perform a PUT request with JSON payload.
 * @param {string} endpoint
 * @param {object} data
 * @returns {Promise<any>}
 */
export async function apiPut(endpoint, data = {}) {
  const res = await fetch(apiPath(endpoint), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(`PUT ${endpoint} failed: ${res.status}`);
  return res.json();
}

/**
 * Perform a DELETE request.
 * @param {string} endpoint
 * @returns {Promise<any>}
 */
export async function apiDelete(endpoint) {
  const res = await fetch(apiPath(endpoint), { method: 'DELETE' });
  if (!res.ok) throw new Error(`DELETE ${endpoint} failed: ${res.status}`);
  return res.json();
}
