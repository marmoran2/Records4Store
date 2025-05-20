// core/bootstrap.js
export function initBootstrap() {
    // Tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(el => {
      new bootstrap.Tooltip(el);
    });
  
    // Popovers (if used)
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.forEach(el => {
      new bootstrap.Popover(el);
    });
  
    // Toasts, dropdowns, etc.
    const toastElList = [].slice.call(document.querySelectorAll('.toast'));
    toastElList.forEach(el => {
      new bootstrap.Toast(el).show();
    });
  }