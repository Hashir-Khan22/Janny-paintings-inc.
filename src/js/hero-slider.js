/**
 * Hero Spotlight Rotating Card Module
 */
export function initHeroSlider() {
  const spotlightCard = document.querySelector('.spotlight-card');
  if (!spotlightCard) return;

  const titleEl = spotlightCard.querySelector('.spotlight-title');
  const descEl = spotlightCard.querySelector('.spotlight-desc');
  const badgeEl = spotlightCard.querySelector('.spotlight-badge-text');
  const prevBtn = spotlightCard.querySelector('.spotlight-prev');
  const nextBtn = spotlightCard.querySelector('.spotlight-next');
  const dotsContainer = spotlightCard.querySelector('.spotlight-dots');

  const spotlights = [
    {
      badge: 'Project Spotlight 01',
      title: 'Feed Mill Painting',
      desc: 'For over 40 years Janney Painting Inc. has effectively sandblasted and painted grain elevators and feed mills, preventing rust and corrosion with DEP-approved industrial systems.'
    },
    {
      badge: 'Project Spotlight 02',
      title: 'Industrial Tank Coating',
      desc: 'Complete abrasive blasting and containment epoxy coatings engineered for chemical, bulk fuel, and potable water storage tanks up to 5,000,000 gallons.'
    },
    {
      badge: 'Project Spotlight 03',
      title: 'Structural Steel Restoration',
      desc: 'High-elevation rigging and specialized multi-coat zinc/urethane applications for active manufacturing trusses, overhead cranes, and transport bridges.'
    },
    {
      badge: 'Project Spotlight 04',
      title: 'Quarry & Aggregate Mills',
      desc: 'Aggressive abrasive preparation and wear-resistant industrial polyurethane coatings designed for heavy aggregate vibration, dust, and impact.'
    }
  ];

  let currentIndex = 0;
  let autoplayTimer = null;

  // Build dots
  dotsContainer.innerHTML = spotlights.map((_, i) => 
    `<button class="spotlight-dot ${i === 0 ? 'active' : ''}" aria-label="Spotlight ${i + 1}"></button>`
  ).join('');

  const dots = dotsContainer.querySelectorAll('.spotlight-dot');

  function updateSlide(index) {
    currentIndex = (index + spotlights.length) % spotlights.length;
    const item = spotlights[currentIndex];

    // Smooth transition
    titleEl.style.opacity = '0';
    descEl.style.opacity = '0';

    setTimeout(() => {
      badgeEl.textContent = item.badge;
      titleEl.textContent = item.title;
      descEl.textContent = item.desc;
      titleEl.style.opacity = '1';
      descEl.style.opacity = '1';

      dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
    }, 180);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      updateSlide(currentIndex + 1);
    }, 6000);
  }

  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  prevBtn?.addEventListener('click', () => {
    updateSlide(currentIndex - 1);
    startAutoplay();
  });

  nextBtn?.addEventListener('click', () => {
    updateSlide(currentIndex + 1);
    startAutoplay();
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      updateSlide(i);
      startAutoplay();
    });
  });

  spotlightCard.addEventListener('mouseenter', stopAutoplay);
  spotlightCard.addEventListener('mouseleave', startAutoplay);

  startAutoplay();
}
