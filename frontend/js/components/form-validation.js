export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isStrongPassword(password) {
  return /[A-Z]/.test(password) && /[^A-Za-z0-9]/.test(password) && password.length >= 8;
}

export function passwordsMatch(password, confirmPassword) {
  return password === confirmPassword;
}

export function markInvalid(input, message = '') {
  input.classList.add('is-invalid');
  if (message) {
    let feedback = input.parentElement.querySelector('.invalid-feedback');
    if (!feedback) {
      feedback = document.createElement('div');
      feedback.className = 'invalid-feedback';
      input.parentElement.appendChild(feedback);
    }
    feedback.textContent = message;
  }
}

export function clearValidation(input) {
  input.classList.remove('is-invalid');
  const feedback = input.parentElement.querySelector('.invalid-feedback');
  if (feedback) feedback.remove();
}