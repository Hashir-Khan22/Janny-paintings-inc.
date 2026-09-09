/**
 * Animated Stats Counter Module
 * Uses IntersectionObserver and requestAnimationFrame for buttery smooth number count-ups.
 */
export function initCounters() {
  const counterElements = document.querySelectorAll('[data-counter-target]');

  if (!counterElements.length) return;

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-counter-target'), 10);
    const duration = parseInt(el.getAttribute('data-counter-duration') || '2000', 10);
    const format = el.getAttribute('data-counter-format') || 'number'; // 'number' or 'locale'
    const start = 0;
    const startTime = performance.now();

    function updateCount(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out quartic function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (target - start) * easeOutQuart);

      if (format === 'locale') {
        el.textContent = current.toLocaleString('en-US');
      } else {
        el.textContent = current;
      }

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        if (format === 'locale') {
          el.textContent = target.toLocaleString('en-US');
        } else {
          el.textContent = target;
        }
      }
    }

    requestAnimationFrame(updateCount);
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  counterElements.forEach(el => observer.observe(el));
}
