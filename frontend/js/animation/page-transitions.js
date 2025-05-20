// page-transitions.js

// Apply transition when navigating between pages
function setupPageTransitions() {
  const body = document.body;

  // Clean up leftover classes from last transition
  body.classList.remove("transition-product", "transition-nav");

  const productLinks = document.querySelectorAll("a[data-transition='product']");
  const navLinks = document.querySelectorAll("a[data-transition='nav']");
  
    // Fade + slide in on load
    body.classList.add("page-enter");
    requestAnimationFrame(() => {
      body.classList.add("page-enter-active");
    });
  
    // Apply blur + zoom transition for product links
    productLinks.forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        const href = link.getAttribute("href");
        body.classList.add("transition-product");
        setTimeout(() => (window.location.href = href), 500);
      });
    });
  
    // Apply fade + slide for topbar/nav links
    navLinks.forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        const href = link.getAttribute("href");
        body.classList.add("transition-nav");
        setTimeout(() => (window.location.href = href), 500);
      });
    });
  }