// error.js — Dynamic Error Page

document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('errorContainer');
    const code = new URLSearchParams(window.location.search).get('code') || '404';
  
    try {
      const res = await fetch('../assets/json/errors.json');
      const errors = await res.json();
      const error = errors.find(e => e.code === code);
  
      if (!error) {
        container.innerHTML = `
          <h1>Oops</h1>
          <p>We couldn't recognize this error code.</p>
          <a href="index.html" class="btn btn-outline-primary mt-3">Return Home</a>
        `;
        return;
      }
  
      container.innerHTML = `
        <h1 class="error-code">${error.code}</h1>
        <h2 class="error-title">${error.title}</h2>
        <p class="error-description">${error.description}</p>
        <a href="index.html" class="btn btn-outline-primary mt-4">Return to Homepage</a>
      `;
    } catch (err) {
      console.error('Error loading messages:', err);
      container.innerHTML = `
        <h1>Unknown Error</h1>
        <p>We couldn't load the error information. Please try again later.</p>
        <a href="index.html" class="btn btn-outline-primary mt-3">Return Home</a>
      `;
    }
  });