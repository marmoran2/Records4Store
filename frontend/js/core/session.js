// core/session.js
import { getCurrentSession } from './api.js';

export async function initSession({ requireAuth = false } = {}) {
  try {
    const session = await getCurrentSession();

    if (session && (session.id || session.user_id)) {
      const user = {
        ...session,
        user_id: session.user_id || session.id
      };

      localStorage.setItem('authUser', JSON.stringify(user));
      window.currentUser = user;
      return user;
    } else {
      throw new Error('Invalid session object');
    }
  } catch (err) {
    console.warn('[Session] Validation failed:', err.message || err);
    localStorage.removeItem('authUser');

    if (requireAuth) {
      window.location.href = 'login.html';
    }

    return null;
  }
}