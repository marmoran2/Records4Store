// contact.js — Contact Form Logic

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
  
      // Validation
      if (!data.fullName || !data.email || !data.subject || !data.message) {
        alert('Please fill out all required fields.');
        return;
      }
  
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        alert('Please enter a valid email address.');
        return;
      }
  
      if (data.message.length > maxChars) {
        alert(`Message cannot exceed ${maxChars} characters.`);
        return;
      }
  
      console.log('Simulated form submission:', data);
      form.innerHTML = `
        <div class="alert alert-success">
          Thank you for reaching out to us, we will be in touch as soon as possible.
        </div>
      `;
    });
  });
  