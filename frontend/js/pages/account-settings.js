import { markInvalid, clearValidation } from '../components/form-validation.js';

document.addEventListener('DOMContentLoaded', async () => {
    const user = JSON.parse(localStorage.getItem('authUser'));
    if (!user || !user.email) {
      window.location.href = 'login.html';
      return;
    }
  
    const form = document.getElementById('settingsForm');
  
    try {
      const res = await fetch('../assets/json/users.json');
      const users = await res.json();
      const currentUser = users.find(u => u.email === user.email);
  
      if (!currentUser) {
        window.location.href = 'login.html';
        return;
      }
  
      // Pre-fill fields
      $('#firstName').val(currentUser.firstName || '');
      $('#lastName').val(currentUser.lastName || '');
      $('#username').val(currentUser.username || '');
      $('#addressLine1').val(currentUser.addressLine1 || '');
      $('#addressLine2').val(currentUser.addressLine2 || '');
      $('#city').val(currentUser.city || '');
      $('#country').val(currentUser.country || '');
      $('#promoEmails').prop('checked', !!currentUser.promoEmails);
      $('#newsUpdates').prop('checked', !!currentUser.newsUpdates);
  
      // Simulated form submit
      form.addEventListener('submit', e => {
        e.preventDefault();

        const updatedUser = {
          ...currentUser,
          firstName: $('#firstName').val(),
          lastName: $('#lastName').val(),
          username: $('#username').val(),
          addressLine1: $('#addressLine1').val(),
          addressLine2: $('#addressLine2').val(),
          city: $('#city').val(),
          country: $('#country').val(),
          promoEmails: $('#promoEmails').is(':checked'),
          newsUpdates: $('#newsUpdates').is(':checked')
        };
        let valid = true;
        const requiredFields = ['#firstName', '#lastName', '#username'];

        requiredFields.forEach(id => {
          const input = document.querySelector(id);
          clearValidation(input);
          if (!input.value.trim()) {
            markInvalid(input);
            valid = false;
          }
        });

        if (!valid) return;
        console.log('[SIMULATED SAVE]', updatedUser);
  
        alert('Your changes have been saved (simulated).');
  
        // TODO: POST updatedUser to backend or update JSON via admin flow
      });
  
    } catch (err) {
      console.error('Error loading settings:', err);
      alert('Failed to load account settings.');
      window.location.href = 'login.html';
    }
  });
  