import { SUBPAGES_DATA } from './subpages-data.js';
import { initNavigation } from './navigation.js';
import { initContactForm } from './contact-form.js';
import { initQuoteModal } from './quote-modal.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize header navigation, sticky effects & mobile drawer
  initNavigation();

  // Determine active page key from URL query (?id=...) or pathname
  const urlParams = new URLSearchParams(window.location.search);
  let pageId = urlParams.get('id');

  if (!pageId) {
    const path = window.location.pathname;
    const match = path.match(/\/([^/]+)\.html/);
    if (match && SUBPAGES_DATA[match[1]]) {
      pageId = match[1];
    } else {
      pageId = 'tank-containment-painting'; // default
    }
  }

  const pageData = SUBPAGES_DATA[pageId] || SUBPAGES_DATA['tank-containment-painting'];

  // Update page <title> and meta description
  document.title = `${pageData.title} | Janney Painting Inc. | Heavy Industrial Contractor`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.content = `${pageData.title} — ${pageData.headline}. Janney Painting Inc. delivers certified SSPC/NACE coatings, MSHA & OSHA compliant industrial blasting since 1982.`;
  }

  // Populate Breadcrumbs & Badges
  const breadcrumbCat = document.getElementById('breadcrumb-category');
  const breadcrumbTitle = document.getElementById('breadcrumb-title');
  const categoryBadge = document.getElementById('inner-category-badge');
  const mainTitle = document.getElementById('inner-page-title');

  if (breadcrumbCat) breadcrumbCat.textContent = pageData.category;
  if (breadcrumbTitle) breadcrumbTitle.textContent = pageData.title;
  if (categoryBadge) categoryBadge.textContent = pageData.category;
  if (mainTitle) mainTitle.textContent = pageData.title;

  // Populate Hero Feature Card
  const heroImg = document.getElementById('inner-hero-img');
  const heroHeading = document.getElementById('inner-hero-subheading');
  const heroDesc = document.getElementById('inner-hero-desc');

  if (heroImg && pageData.heroImage) {
    heroImg.src = pageData.heroImage;
    heroImg.alt = pageData.title;
  }
  if (heroHeading) heroHeading.textContent = pageData.headline;
  if (heroDesc) heroDesc.innerHTML = pageData.desc;

  // Populate DEP Compliance & Standards Card
  const checklistTitle = document.getElementById('inner-checklist-title');
  const checklistDesc = document.getElementById('inner-checklist-desc');
  const checklistList = document.getElementById('inner-checklist-items');

  if (checklistTitle) checklistTitle.textContent = pageData.checklistTitle;
  if (checklistDesc) checklistDesc.textContent = pageData.checklistDesc;
  if (checklistList && pageData.checklistItems) {
    checklistList.innerHTML = pageData.checklistItems.map(item => `
      <li class="compliance-list-item">
        <span class="compliance-check-icon">&#10003;</span>
        <span>${item}</span>
      </li>
    `).join('');
  }

  // Populate Before & After Showcase Images
  const showcaseAfterImg = document.getElementById('showcase-after-img');
  const showcaseBeforeImg = document.getElementById('showcase-before-img');
  const showcaseContainer = document.getElementById('showcase-container');
  const showcaseToggleBtn = document.getElementById('showcase-toggle-btn');
  const showcaseStatus = document.getElementById('showcase-status');

  if (showcaseAfterImg && pageData.showcaseImage) {
    showcaseAfterImg.src = pageData.showcaseImage;
  }
  if (showcaseBeforeImg && pageData.heroImage) {
    showcaseBeforeImg.src = pageData.heroImage;
  }

  // Toggle Before / After View
  if (showcaseToggleBtn && showcaseContainer) {
    let isShowingBefore = false;
    showcaseToggleBtn.addEventListener('click', () => {
      isShowingBefore = !isShowingBefore;
      showcaseContainer.classList.toggle('show-before', isShowingBefore);
      if (showcaseStatus) {
        showcaseStatus.textContent = isShowingBefore ? 'BEFORE RESTORATION' : 'AFTER JANNEY COATING';
      }
      showcaseToggleBtn.textContent = isShowingBefore ? 'VIEW AFTER COATING' : 'VIEW BEFORE CONDITION';
    });
  }

  // Populate Sidebar Related Category Navigation
  const sidebarNavTitle = document.getElementById('sidebar-category-title');
  const sidebarNavList = document.getElementById('sidebar-category-links');

  if (sidebarNavTitle) sidebarNavTitle.textContent = `${pageData.category}`;
  if (sidebarNavList) {
    const relatedLinks = Object.entries(SUBPAGES_DATA)
      .filter(([key, data]) => data.category === pageData.category)
      .map(([key, data]) => {
        const isActive = key === pageId;
        const targetUrl = key === 'tank-containment-painting' ? '/tank-containment-painting.html' : `/page.html?id=${key}`;
        return `
          <li class="sidebar-nav-item">
            <a href="${targetUrl}" class="sidebar-nav-link ${isActive ? 'active' : ''}">
              <span>${data.title}</span>
              <span class="arrow">&rsaquo;</span>
            </a>
          </li>
        `;
      }).join('');
    sidebarNavList.innerHTML = relatedLinks;
  }

  // Quick Sidebar Form submission handler
  const quickForm = document.getElementById('sidebar-bid-form');
  if (quickForm) {
    quickForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = quickForm.querySelector('.btn-sidebar-submit');
      if (submitBtn) {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'REQUEST SENT ✓';
        submitBtn.style.backgroundColor = '#10B981';
        submitBtn.style.color = '#FFF';
        setTimeout(() => {
          quickForm.reset();
          submitBtn.textContent = originalText;
          submitBtn.style.backgroundColor = '';
          submitBtn.style.color = '';
          alert(`Thank you! Your bid request for ${pageData.title} has been received. A Janney Painting estimator will contact you within 24 hours.`);
        }, 800);
      }
    });
  }

  // Initialize Contact Form & Quote Modal
  initContactForm();
  initQuoteModal();

  console.log(`Janney Painting Inc. — Modern Inner page [${pageId}] initialized.`);
});
