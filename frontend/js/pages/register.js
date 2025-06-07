import {
  isValidEmail,
  isStrongPassword,
  passwordsMatch,
  markInvalid,
  clearValidation
} from '../components/form-validation.js';
import { apiPost } from '../core/api.js';

// Quick SHA-256 hash using Web Crypto API
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  const steps = document.querySelectorAll('.form-step');
  const stepIndicators = document.querySelectorAll('.step-indicator .step');

  function showStep(step) {
    steps.forEach(s => s.classList.remove('active'));
    stepIndicators.forEach((el, i) => {
      el.classList.toggle('active', i === step - 1);
    });
    document.querySelector(`.form-step[data-step="${step}"]`).classList.add('active');
  }

  $('#toStep2').on('click', () => {
    const emailInput = document.getElementById('regEmail');
    const email = emailInput.value.trim();
    const emailError = document.getElementById('emailExistsError');

    clearValidation(emailInput);
    emailError.classList.add('d-none');

    if (!isValidEmail(email)) {
      markInvalid(emailInput);
      return;
    }

    showStep(2);
  });

  $('#toStep3').on('click', async () => {
    const email = document.getElementById('regEmail').value.trim();
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const username = document.getElementById('username').value.trim(); // not used but collected
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!isStrongPassword(password)) {
      markInvalid(document.getElementById('password'), 'Password must include uppercase, symbol, and be 8+ characters');
      return;
    }

    if (!passwordsMatch(password, confirmPassword)) {
      markInvalid(document.getElementById('confirmPassword'), 'Passwords do not match.');
      return;
    }

    const hashedPassword = await hashPassword(password);

    const wantsPromo = document.getElementById('promoEmails').checked;
    const wantsNews = document.getElementById('newsUpdates').checked;

    const newUser = {
      email,
      password_hash: hashedPassword,
      first_name: firstName,
      last_name: lastName,
      is_guest: false,
      user_role: 'Customer'
    };

    try {
      await apiPost('/users', newUser); // POST /api/users
      showStep(3);
      setTimeout(() => window.location.href = 'login.html', 2500);
    } catch (err) {
      console.error('Registration error:', err);
      alert('Registration failed. Check console or try again.');
    }
  });

  $('#password').on('input', function () {
    const meter = $('#strengthMeter');
    if (this.value.length < 4) return meter.removeClass().addClass('strength-meter');
    meter
      .removeClass()
      .addClass('strength-meter')
      .addClass(!isStrongPassword(this.value) ? 'weak' : this.value.length < 10 ? 'medium' : 'strong');
  });
});
