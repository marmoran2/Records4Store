// File: js/pages/register.js

import { isValidEmail, isStrongPassword, passwordsMatch, markInvalid, clearValidation } from '../components/form-validation.js';

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

  // Step 1 validation
  $('#toStep2').on('click', async () => {
    const emailInput = document.getElementById('regEmail');
    const email = emailInput.value.trim();
    const emailError = document.getElementById('emailExistsError');

    clearValidation(emailInput);
    emailError.classList.add('d-none');

    if (!isValidEmail(email)) {
      markInvalid(emailInput);
      return;
    }

    const res = await fetch('../assets/json/users.json');
    const users = await res.json();
    const exists = users.some(u => u.email === email);
    if (exists) {
      emailError.classList.remove('d-none');
      return;
    }

    showStep(2);
  });

  // Step 2 validation
  $('#toStep3').on('click', () => {
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    let valid = true;

    if (!isStrongPassword(password.value)) {
      markInvalid(password, 'Password must be 8+ chars, use uppercase & symbol');
      valid = false;
    } else {
      clearValidation(password);
    }

    if (!passwordsMatch(password.value, confirmPassword.value)) {
      markInvalid(confirmPassword, 'Passwords do not match.');
      valid = false;
    } else {
      clearValidation(confirmPassword);
    }

    if (valid) {
      // TODO: Save user to backend/local file here
      // fetch('/api/register', { method: 'POST', body: JSON.stringify(newUser) })

      showStep(3);
      setTimeout(() => window.location.href = 'login.html', 3000);
    }
  });

  // Strength meter
  $('#password').on('input', function () {
    const strength = isStrongPassword(this.value);
    const meter = $('#strengthMeter');
    meter.removeClass().addClass('strength-meter');

    if (this.value.length < 4) return;
    if (!strength) meter.addClass('weak');
    else if (this.value.length < 10) meter.addClass('medium');
    else meter.addClass('strong');
  });
});
