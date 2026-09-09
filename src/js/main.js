import { initNavigation } from './navigation.js';
import { initCounters } from './counters.js';
import { initHeroSlider } from './hero-slider.js';
import { initMarketsTabs } from './markets-tabs.js';
import { initAccordion } from './accordion.js';
import { initContactForm } from './contact-form.js';
import { initQuoteModal } from './quote-modal.js';
import { initVideoModal } from './video-modal.js';
import { initNewsModal } from './news-modal.js';
import { initSubpageViewer } from './subpage-viewer.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Core Navigation & Interactivity
  initNavigation();
  initCounters();
  initHeroSlider();
  initMarketsTabs();
  initAccordion();
  initContactForm();
  initQuoteModal();
  initVideoModal();
  initNewsModal();
  initSubpageViewer();

  // Scroll Reveal Observer
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  console.log('Janney Painting Inc. — Industrial Site initialized with sub-page menus and official logo.');
});
