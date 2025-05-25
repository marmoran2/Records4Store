import { markInvalid, clearValidation } from '../components/form-validation.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const messageInput = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    const maxChars = 1000;
  
    messageInput.addEventListener('input', () => {
      const length = messageInput.value.length;
      charCount.textContent = `${length}/${maxChars}`;
      if (length > maxChars) {
        messageInput.classList.add('is-invalid');
      } else {
        messageInput.classList.remove('is-invalid');
      }
    });
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const data = {
        enquiryType: form.enquiryType.value,
        fullName: form.fullName.value.trim(),
        email: form.email.value.trim(),
        subject: form.subject.value.trim(),
        message: form.message.value.trim(),
        phone: form.phone.value.trim(),
        preferredContact: form.preferredContact.value
      };
  
      let valid = true;
      const fullNameInput = form.fullName;
      const emailInput = form.email;
      const subjectInput = form.subject;
      const messageInput = form.message;

      [fullNameInput, emailInput, subjectInput, messageInput].forEach(input => clearValidation(input));

      if (!fullNameInput.value.trim()) {
        markInvalid(fullNameInput);
        valid = false;
      }
      if (!subjectInput.value.trim()) {
        markInvalid(subjectInput);
        valid = false;
      }
      if (!messageInput.value.trim()) {
        markInvalid(messageInput);
        valid = false;
      }
      if (!isValidEmail(emailInput.value.trim())) {
        markInvalid(emailInput);
        valid = false;
      }
      if (messageInput.value.length > maxChars) {
        markInvalid(messageInput, `Message cannot exceed ${maxChars} characters.`);
        valid = false;
      }

      if (!valid) return;
  
      console.log('Simulated form submission:', data);
      form.innerHTML = `
        <div class="alert alert-success">
          Thank you for reaching out to us, we will be in touch as soon as possible.
        </div>
      `;
    });
  });
  