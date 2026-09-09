/**
 * Video Showcase Modal Module
 */
export function initVideoModal() {
  const videoModal = document.getElementById('video-modal');
  const triggerBtn = document.querySelector('.advantage-video-wrap');
  const closeBtn = videoModal?.querySelector('.modal-close-btn');

  if (!videoModal || !triggerBtn) return;

  function openModal() {
    videoModal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    videoModal.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  triggerBtn.addEventListener('click', openModal);
  closeBtn?.addEventListener('click', closeModal);

  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.classList.contains('is-active')) closeModal();
  });
}
