import { showToast } from './contact-form.js';

/**
 * Free Quote Interactive Estimator Modal
 */
export function initQuoteModal() {
  const quoteModal = document.getElementById('quote-modal');
  if (!quoteModal) return;

  const openButtons = document.querySelectorAll('.trigger-quote-modal');
  const closeBtn = quoteModal.querySelector('.modal-close-btn');
  const form = quoteModal.querySelector('#quote-estimator-form');

  function openModal() {
    quoteModal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    quoteModal.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  closeBtn?.addEventListener('click', closeModal);

  quoteModal.addEventListener('click', (e) => {
    if (e.target === quoteModal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && quoteModal.classList.contains('is-active')) {
      closeModal();
    }
  });

  // Interactive Options Selection
  const optionButtons = quoteModal.querySelectorAll('.estimator-option-btn');
  optionButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const parentGrid = btn.closest('.estimator-grid-options');
      const isMulti = parentGrid?.getAttribute('data-multiselect') === 'true';

      if (!isMulti) {
        parentGrid?.querySelectorAll('.estimator-option-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      } else {
        btn.classList.toggle('selected');
      }
    });
  });

  // Form Submit
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const facilitySelected = quoteModal.querySelector('#facility-options .estimator-option-btn.selected')?.textContent || 'General Industrial Facility';
    const contactEmail = quoteModal.querySelector('#quote-contact-email')?.value || '';
    const contactPhone = quoteModal.querySelector('#quote-contact-phone')?.value || '';

    closeModal();
    showToast(
      'Estimate Request Dispatched',
      `Our estimators are preparing preliminary specs for your ${facilitySelected}. We will call ${contactPhone || contactEmail} shortly.`,
      'success'
    );
    form.reset();
  });
}
