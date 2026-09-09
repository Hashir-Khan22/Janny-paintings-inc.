/**
 * News Article Reader Modal Module
 */
export function initNewsModal() {
  const newsModal = document.getElementById('news-modal');
  if (!newsModal) return;

  const newsCards = document.querySelectorAll('.news-card');
  const viewAllBtn = document.querySelector('.btn-news-all');
  const closeBtn = newsModal.querySelector('.modal-close-btn');
  const modalTitle = newsModal.querySelector('.news-modal-title');
  const modalMeta = newsModal.querySelector('.news-modal-meta');
  const modalBody = newsModal.querySelector('.news-modal-body');

  const articlesData = {
    'rustoleum': {
      title: 'Rust-Oleum Water-Based Industrial Paint Systems',
      meta: 'Industrial Coating Tech • Published by Janney Engineering',
      content: `
        <p>As plant environmental standards evolve, traditional solvent-borne industrial coatings face stringent VOC caps across Maryland, Virginia, and Pennsylvania. Janney Painting Inc. partners with <strong>Rust-Oleum Industrial Brands</strong> to specify and apply advanced water-based acrylics and elastomeric coatings that match the durability of traditional urethanes.</p>
        <h4 style="color:#F5B700; margin: 1.5rem 0 0.5rem; font-family:var(--font-display); font-size:1.3rem;">Key Advantages for Active Facilities:</h4>
        <ul style="list-style:disc; margin-left:1.5rem; display:flex; flex-direction:column; gap:0.5rem; color:#CBD5E1;">
          <li><strong>Ultra-Low VOC Content:</strong> Safe for indoor facilities, food plants, and pharmaceutical warehouses without odor contamination.</li>
          <li><strong>Fast Recoat Windows:</strong> Dries to touch in as little as 30 minutes, allowing multi-coat barrier systems within an 8-hour shift.</li>
          <li><strong>Exceptional Flexibility:</strong> Elastomeric formulations expand and contract with seasonal sheet metal thermal swings on silos and grain bins.</li>
        </ul>
      `
    },
    'epoxy': {
      title: 'Commercial Epoxy Coating for Heavy Industrial Painting Needs',
      meta: 'Heavy Industry • Published by Janney Engineering',
      content: `
        <p>In aggressive industrial environments—ranging from aggregate crushing to chemical storage—epoxy coatings serve as the primary protective defense between vulnerable steel substrates and pervasive corrosion.</p>
        <p style="margin-top:1rem;">Janney Painting Inc. applies 100% solids novolac and high-build polyamide epoxies capable of resisting chemical spills, continuous moisture, and abrasive particulate bombardment on ductwork, pipe racks, and storage containment.</p>
      `
    },
    'questions': {
      title: 'Industrial Painting: Critical Questions to Ask Before Hiring a Contractor',
      meta: 'Procurement Guide • Published by Janney Engineering',
      content: `
        <p>Hiring an industrial painting contractor is vastly different from residential or standard commercial contracting. A failure in staging, abrasive containment, or surface preparation can lead to catastrophic plant shutdowns or OSHA/MSHA citations.</p>
        <p style="margin-top:1rem;">Always verify whether your contractor:</p>
        <ol style="list-style:decimal; margin-left:1.5rem; display:flex; flex-direction:column; gap:0.5rem; color:#CBD5E1; margin-top:0.75rem;">
          <li>Maintains active MSHA Part 46 certified personnel for mine and quarry safety.</li>
          <li>Owns heavy-duty compressors, blast pots, and certified aerial staging rather than relying on rental brokers.</li>
          <li>Provides certified SSPC surface preparation profiles (SP-6, SP-10) with verified blast media.</li>
        </ol>
      `
    },
    'virginia': {
      title: 'Northern Virginia: Industrial Painting for 40+ Years',
      meta: 'Regional History • Published by Janney Engineering',
      content: `
        <p>Since 1982, Janney Painting Inc. has mobilized across Northern Virginia, Richmond, and Shenandoah manufacturing corridors. From grain transfer terminals along the Potomac to data center chiller infrastructure in Loudoun County, our field crews bring four decades of regional compliance expertise.</p>
      `
    },
    'sandblasting': {
      title: 'Sandblasting vs Power Washing: Which is the Better Choice?',
      meta: 'Surface Preparation • Published by Janney Engineering',
      content: `
        <p>While pressure washing can remove loose surface grime and chalking paint, it fails to create the angular anchor tooth profile required for high-performance industrial epoxies and urethanes.</p>
        <p style="margin-top:1rem;">Janney Painting deploys abrasive blasting (slag, garnet, crushed glass, and steel grit) to achieve true SSPC-SP 10 Near-White metal blast. Without this mechanical surface profile, coatings will inevitably delaminate under industrial vibration and temperature swings.</p>
      `
    },
    'baltimore': {
      title: 'Baltimore, MD: Industrial Painting Contractor for 30+ Years',
      meta: 'Port & Marine Infrastructure • Published by Janney Engineering',
      content: `
        <p>Baltimore’s maritime industrial district, rail yards, and steel processing facilities endure severe saltwater mist, sulfur emissions, and heavy humidity. Janney Painting provides turnkey rust mitigation, lead encapsulation, and zinc-rich marine coating systems across the greater Baltimore metro area.</p>
      `
    }
  };

  function openArticle(key) {
    const article = articlesData[key] || articlesData['rustoleum'];
    if (modalTitle) modalTitle.textContent = article.title;
    if (modalMeta) modalMeta.textContent = article.meta;
    if (modalBody) modalBody.innerHTML = article.content;
    newsModal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    newsModal.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  newsCards.forEach(card => {
    card.addEventListener('click', () => {
      const key = card.getAttribute('data-article-id') || 'rustoleum';
      openArticle(key);
    });
  });

  viewAllBtn?.addEventListener('click', () => {
    openArticle('rustoleum');
  });

  closeBtn?.addEventListener('click', closeModal);
  newsModal.addEventListener('click', (e) => {
    if (e.target === newsModal) closeModal();
  });
}
