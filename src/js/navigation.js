/**
 * Navigation Module
 * Handles sticky nav state, scroll-based backdrop darkening, mobile drawer, and mobile submenu toggles.
 */
export function initNavigation() {
  const header = document.querySelector('.main-header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerClose = document.querySelector('.drawer-close');
  const backdrop = document.querySelector('.backdrop');
  const navLinks = document.querySelectorAll('.nav-link, .drawer-sublink');

  // Scroll listener for sticky header background
  function handleScroll() {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile Drawer Toggle
  function openDrawer() {
    mobileDrawer?.classList.add('is-open');
    backdrop?.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer?.classList.remove('is-open');
    backdrop?.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  mobileToggle?.addEventListener('click', openDrawer);
  drawerClose?.addEventListener('click', closeDrawer);
  backdrop?.addEventListener('click', closeDrawer);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Close drawer on click of standard link
      if (!link.classList.contains('has-submenu')) {
        closeDrawer();
      }
    });
  });

  // Mobile Drawer Accordion Submenu Toggles
  const drawerParents = document.querySelectorAll('.drawer-item.has-children');
  drawerParents.forEach(item => {
    const trigger = item.querySelector('.drawer-link');
    const submenu = item.querySelector('.drawer-submenu');
    trigger?.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = submenu?.classList.contains('show');
      // close others
      document.querySelectorAll('.drawer-submenu').forEach(s => s.classList.remove('show'));
      document.querySelectorAll('.drawer-link').forEach(l => l.classList.remove('open'));
      if (!isOpen) {
        submenu?.classList.add('show');
        trigger.classList.add('open');
      }
    });
  });

  // Smooth scroll spy for active link
  const sections = document.querySelectorAll('section[id]');
  function highlightActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 130;
      const sectionId = current.getAttribute('id');
      const activeLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        activeLink?.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', highlightActiveNav, { passive: true });
}
