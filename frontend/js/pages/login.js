import { isValidEmail, markInvalid, clearValidation } from '../components/form-validation.js';
import { login } from '../core/api.js'; // uses apiPost('/users/login', ...)

// Password Hash
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const emailInput = document.getElementById('loginEmail');
  const passwordInput = document.getElementById('loginPassword');
  const errorBox = document.getElementById('loginError');
  const toggleBtn = document.querySelector('.show-password-toggle');

  // Show/Hide Password
  toggleBtn.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    toggleBtn.textContent = type === 'password' ? 'visibility' : 'visibility_off';
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let isValid = true;
    errorBox.classList.add('d-none');
    errorBox.textContent = 'Invalid email or password.';

    clearValidation(emailInput);
    clearValidation(passwordInput);

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!isValidEmail(email)) {
      markInvalid(emailInput);
      isValid = false;
    }

    if (password.length === 0) {
      markInvalid(passwordInput);
      isValid = false;
    }

    if (!isValid) return;

    try {
      const hashedPassword = await hashPassword(password);
      const result = await login(email, hashedPassword); 

      // Save basic session info to localStorage (customize as needed)
      localStorage.setItem('authUser', JSON.stringify({
        user_id: result.user_id,
        email: email
      }));

      window.location.href = 'account.html';
    } catch (err) {
      console.error('Login error:', err);
      errorBox.textContent = 'Invalid credentials or server error.';
      errorBox.classList.remove('d-none');
    }
  });
});
