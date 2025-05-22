
import { isValidEmail, markInvalid, clearValidation } from '../components/form-validation.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const emailInput = document.getElementById('loginEmail');
  const passwordInput = document.getElementById('loginPassword');
  const errorBox = document.getElementById('loginError');

  // Show/Hide Password
  document.querySelector('.show-password-toggle').addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let isValid = true;
    errorBox.classList.add('d-none');

    clearValidation(emailInput);
    clearValidation(passwordInput);

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

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
      const res = await fetch('../assets/json/users.json');
      const users = await res.json();
      const match = users.find(u => u.email === email && u.password === password);

      if (match) {
        localStorage.setItem('authUser', JSON.stringify({ email }));
        window.location.href = 'account.html';
      } else {
        errorBox.classList.remove('d-none');
      }
    } catch (err) {
      console.error('Login error:', err);
      errorBox.textContent = 'Something went wrong. Try again later.';
      errorBox.classList.remove('d-none');
    }
  });
});