  // Show/hide button when scrolling
  window.onscroll = function () {
      const btn = document.getElementById("backToTop");
      btn.style.display = (document.documentElement.scrollTop > 300) ? "block" : "none";
    };
    
    // Smooth scroll to top
    document.addEventListener("DOMContentLoaded", function () {
      const backToTopBtn = document.getElementById("backToTop");
      if (backToTopBtn) {
        backToTopBtn.addEventListener("click", function () {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }
    });


    // See Password Toggle
    const togglePassword = document.getElementById('togglePassword');
    const passwordField = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');

    togglePassword.addEventListener('click', () => {
      const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordField.setAttribute('type', type);
      eyeIcon.classList.toggle('fa-eye');
      eyeIcon.classList.toggle('fa-eye-slash');
    });

  // Edit / Read | Personal information page


