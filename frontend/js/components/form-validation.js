export function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  export function markInvalid(input, message) {
    input.classList.add('is-invalid');
    if (message) input.nextElementSibling.textContent = message;
  }
  
  export function clearValidation(input) {
    input.classList.remove('is-invalid');
  }

  export function isStrongPassword(password) {
    const regex = /^(?=.*[A-Z])(?=.*\W).{8,}$/;
    return regex.test(password);
  }
  
  export function passwordsMatch(pw1, pw2) {
    return pw1 === pw2;
  }
  