/**
 * Accordion Module for Competitive Pricing Checklist
 */
export function initAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    const content = item.querySelector('.accordion-content');
    const icon = item.querySelector('.accordion-icon');

    trigger?.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Close all other open accordions in this group
      accordionItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('is-open');
          const otherContent = otherItem.querySelector('.accordion-content');
          if (otherContent) otherContent.style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove('is-open');
        if (content) content.style.maxHeight = null;
      } else {
        item.classList.add('is-open');
        if (content) content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // Open first item by default
  const firstItem = accordionItems[0];
  if (firstItem) {
    firstItem.classList.add('is-open');
    const firstContent = firstItem.querySelector('.accordion-content');
    if (firstContent) firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
  }
}
