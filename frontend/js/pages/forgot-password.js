// File: js/pages/forgot-password.js

import { isValidEmail, isStrongPassword, passwordsMatch, markInvalid, clearValidation } from '../components/form-validation.js';

document.addEventListener('DOMContentLoaded', () => {
  const steps = document.querySelectorAll('.form-step');
  const indicators = document.querySelectorAll('.step-indicator .step');

  let resendAttempts = 0;
  let timer = null;
  let secondsLeft = 60;

  function showStep(stepNum) {
    steps.forEach(s => s.classList.remove('active'));
    indicators.forEach((el, i) => el.classList.toggle('active', i === stepNum - 1));
    document.querySelector(`.form-step[data-step="${stepNum}"]`).classList.add('active');
  }

  // Email Set
  $('#sendReset').on('click', async () => {
    const emailInput = $('#resetEmail')[0];
    const email = emailInput.value.trim();
    const error = $('#emailNotFoundError');

    clearValidation(emailInput);
    error.addClass('d-none');

    if (!isValidEmail(email)) {
      markInvalid(emailInput);
      return;
    }

    const res = await fetch('../assets/json/users.json');
    const users = await res.json();
    const exists = users.some(u => u.email === email);

    if (!exists) {
      error.removeClass('d-none');
      return;
    }

    showStep(2);
    startResendTimer();
  });

  // Resend
  $('#resendBtn').on('click', () => {
    if (secondsLeft > 0 || resendAttempts >= 5) return;

    resendAttempts++;
    if (resendAttempts >= 5) {
      alert('You’ve hit the maximum number of resends. Please try again later.');
      location.href = 'forgot-password.html';
      return;
    }

    startResendTimer();
  });

  function startResendTimer() {
    secondsLeft = 60;
    $('#resendTimer').text(secondsLeft);
    $('#resendBtn').prop('disabled', true);

    timer = setInterval(() => {
      secondsLeft--;
      $('#resendTimer').text(secondsLeft);
      if (secondsLeft <= 0) {
        clearInterval(timer);
        $('#resendBtn').prop('disabled', false);
      }
    }, 1000);

    setTimeout(() => showStep(3), 3000);
  }

  // Rexet Password
  $('#forgotForm').on('submit', e => {
    e.preventDefault();
    const newPw = $('#newPassword').val();
    const confirmPw = $('#confirmNewPassword').val();
    const strengthBar = $('#resetStrengthMeter');

    if (!isStrongPassword(newPw)) {
      markInvalid($('#newPassword')[0], 'Weak password');
      return;
    }
    clearValidation($('#newPassword')[0]);

    if (!passwordsMatch(newPw, confirmPw)) {
      markInvalid($('#confirmNewPassword')[0], 'Passwords do not match');
      return;
    }
    clearValidation($('#confirmNewPassword')[0]);

    strengthBar.removeClass().addClass('strength-meter strong');
    alert('Password successfully reset!');
    window.location.href = 'login.html';
  });

  // Live strength check
  $('#newPassword').on('input', function () {
    const meter = $('#resetStrengthMeter');
    const val = this.value;
    meter.removeClass().addClass('strength-meter');
    if (val.length < 4) return;
    if (!isStrongPassword(val)) meter.addClass('weak');
    else if (val.length < 10) meter.addClass('medium');
    else meter.addClass('strong');
  });

  showStep(1);
});
