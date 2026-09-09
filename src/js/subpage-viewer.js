import { SUBPAGES_DATA } from './subpages-data.js';

/**
 * Sub-Page Interactive Modal Viewer & Search System
 */
export function initSubpageViewer() {
  const modal = document.getElementById('subpage-modal');
  const modalCategory = modal?.querySelector('.subpage-modal-category');
  const modalTitle = modal?.querySelector('.subpage-modal-title');
  const modalHeadline = modal?.querySelector('.subpage-modal-headline');
  const modalOverview = modal?.querySelector('.subpage-modal-overview');
  const modalSpecs = modal?.querySelector('.subpage-modal-specs');
  const closeBtn = modal?.querySelector('.modal-close-btn');
  const quoteBtn = modal?.querySelector('.subpage-modal-quote-btn');

  // Search Modal Elements
  const searchModal = document.getElementById('search-modal');
  const searchToggleBtn = document.getElementById('search-toggle-btn');
  const searchInput = document.getElementById('site-search-input');
  const searchResults = document.getElementById('search-results-list');
  const searchCloseBtn = searchModal?.querySelector('.modal-close-btn');

  let currentSubpageKey = '';

  function openSubpage(key) {
    const data = SUBPAGES_DATA[key];
    if (!data || !modal) return;

    currentSubpageKey = key;
    if (modalCategory) modalCategory.textContent = data.category;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalHeadline) modalHeadline.textContent = data.headline;
    if (modalOverview) modalOverview.textContent = data.overview;

    if (modalSpecs) {
      modalSpecs.innerHTML = data.specs.map(s => `
        <div style="background:#0D0F13; padding: 1.1rem; border-left: 3px solid var(--color-primary); margin-bottom: 0.75rem;">
          <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-primary); font-weight: 700; letter-spacing: 0.1em; margin-bottom: 0.25rem;">${s.label}</div>
          <div style="font-size: 0.95rem; font-weight: 600; color: #FFF;">${s.value}</div>
        </div>
      `).join('');
    }

    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';

    // Also close search modal if open
    searchModal?.classList.remove('is-active');
  }

  function closeSubpage() {
    modal?.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  closeBtn?.addEventListener('click', closeSubpage);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeSubpage();
  });

  // Wire up all subpage links across the DOM
  document.querySelectorAll('[data-subpage]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const key = link.getAttribute('data-subpage');
      if (key) openSubpage(key);
    });
  });

  // Quote CTA button inside the subpage modal
  quoteBtn?.addEventListener('click', () => {
    closeSubpage();
    const quoteModal = document.getElementById('quote-modal');
    if (quoteModal) {
      quoteModal.classList.add('is-active');
      document.body.style.overflow = 'hidden';
      // Pre-fill location or details if city
      const data = SUBPAGES_DATA[currentSubpageKey];
      if (data && data.category === 'Cities We Serve') {
        const locInput = quoteModal.querySelector('#quote-facility-location');
        if (locInput) locInput.value = data.title.replace('Industrial Painting in ', '');
      }
    }
  });

  // Search Functionality
  function openSearch() {
    searchModal?.classList.add('is-active');
    setTimeout(() => searchInput?.focus(), 100);
    renderSearchResults('');
  }

  function closeSearch() {
    searchModal?.classList.remove('is-active');
    if (searchInput) searchInput.value = '';
  }

  searchToggleBtn?.addEventListener('click', openSearch);
  searchCloseBtn?.addEventListener('click', closeSearch);
  searchModal?.addEventListener('click', (e) => {
    if (e.target === searchModal) closeSearch();
  });

  function renderSearchResults(query) {
    if (!searchResults) return;
    const q = query.toLowerCase().trim();

    const matches = Object.entries(SUBPAGES_DATA).filter(([_, item]) => {
      if (!q) return true; // show all when empty
      return item.title.toLowerCase().includes(q) ||
             item.category.toLowerCase().includes(q) ||
             item.overview.toLowerCase().includes(q);
    });

    if (matches.length === 0) {
      searchResults.innerHTML = `<div style="padding:1.5rem; text-align:center; color:#888;">No matching services or facilities found.</div>`;
      return;
    }

    searchResults.innerHTML = matches.map(([key, item]) => `
      <div class="search-result-item" data-search-key="${key}">
        <div>
          <div style="font-family:var(--font-display); font-size:1.1rem; font-weight:800; color:#FFF;">${item.title}</div>
          <div style="font-size:0.85rem; color:#8E98A8;">${item.headline}</div>
        </div>
        <span class="search-result-category">${item.category}</span>
      </div>
    `).join('');

    searchResults.querySelectorAll('.search-result-item').forEach(el => {
      el.addEventListener('click', () => {
        const key = el.getAttribute('data-search-key');
        if (key) openSubpage(key);
      });
    });
  }

  searchInput?.addEventListener('input', (e) => {
    renderSearchResults(e.target.value);
  });
}
