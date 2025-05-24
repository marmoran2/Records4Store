document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('faqList');
  
    try {
      const res = await fetch('../assets/json/faq.json');
      const faqs = await res.json();
  
      container.innerHTML = faqs.map((f, i) => `
        <div class="faq-item">
          <button class="faq-question" data-index="${i}">
            <span>${f.question}</span>
            <i class="bi bi-chevron-down"></i>
          </button>
          <div class="faq-answer" style="display: none;">
            <p>${f.answer}</p>
          </div>
        </div>
      `).join('');
  
      document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
          const answer = btn.nextElementSibling;
          const icon = btn.querySelector('i');
          const expanded = answer.style.display === 'block';
          answer.style.display = expanded ? 'none' : 'block';
          icon.className = expanded ? 'bi bi-chevron-down' : 'bi bi-chevron-up';
        });
      });
  
    } catch (err) {
      console.error('Failed to load FAQs:', err);
      container.innerHTML = '<p class="text-danger">Unable to load FAQs at this time.</p>';
    }
  });