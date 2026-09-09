/**
 * Contact Form Module
 * Dynamic math captcha, form validation, and toast notification.
 */
export function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const captchaQuestion = form.querySelector('.captcha-question');
  const captchaInput = form.querySelector('.captcha-input');
  let num1 = Math.floor(Math.random() * 8) + 2;
  let num2 = Math.floor(Math.random() * 8) + 1;
  let expectedAnswer = num1 + num2;

  function refreshCaptcha() {
    num1 = Math.floor(Math.random() * 8) + 2;
    num2 = Math.floor(Math.random() * 8) + 1;
    expectedAnswer = num1 + num2;
    if (captchaQuestion) {
      captchaQuestion.textContent = `${num1} + ${num2} = ?`;
    }
    if (captchaInput) {
      captchaInput.value = '';
    }
  }

  refreshCaptcha();

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = form.querySelector('[name="name"]');
    const emailInput = form.querySelector('[name="email"]');
    const phoneInput = form.querySelector('[name="phone"]');
    const messageInput = form.querySelector('[name="message"]');

    if (!nameInput?.value.trim()) {
      showToast('Error', 'Please enter your full name.', 'warning');
      nameInput?.focus();
      return;
    }

    if (!emailInput?.value.trim() && !phoneInput?.value.trim()) {
      showToast('Error', 'Please enter a contact email or phone number.', 'warning');
      emailInput?.focus();
      return;
    }

    const userAnswer = parseInt(captchaInput?.value.trim() || '0', 10);
    if (userAnswer !== expectedAnswer) {
      showToast('Security Check', 'Math answer is incorrect. Please try again.', 'warning');
      refreshCaptcha();
      captchaInput?.focus();
      return;
    }

    // Success State
    const submitBtn = form.querySelector('.btn-contact-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'SENDING...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = 'SENT ✓';
      showToast(
        'Quote Request Received!',
        'Thank you! A Janney Painting Inc. project manager will review your facility details and contact you within 24 hours.',
        'success'
      );

      form.reset();
      refreshCaptcha();

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 3500);
    }, 800);
  });
}

/**
 * Toast Notification Helper
 */
export function showToast(title, message, type = 'info') {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <div class="toast-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    </div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
  `;

  toastContainer.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto remove
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 5000);
}
