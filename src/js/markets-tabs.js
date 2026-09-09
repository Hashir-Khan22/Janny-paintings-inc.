/**
 * Industry Markets Served Tabs Module
 */
export function initMarketsTabs() {
  const container = document.querySelector('.markets-section');
  if (!container) return;

  const tabButtons = container.querySelectorAll('.market-tab-btn');
  const displayCard = container.querySelector('.market-display-card');

  const marketsData = {
    'grain-elevators': {
      tag: 'Agricultural Infrastructure',
      title: 'Grain Elevators & Feed Mills',
      img: '/assets/images/hero-feedmill.jpg',
      desc: 'Since 1982, Janney Painting has been the premier Mid-Atlantic contractor for towering grain silos, bucket elevators, and feed manufacturing mills. We deploy certified rigging crews capable of reaching 200+ foot elevations safely, sealing sheet metal joints and applying rust-inhibiting elastomeric coatings that withstand extreme seasonal weather.',
      spec1_label: 'Typical Substrate',
      spec1_val: 'Corrugated Galvanized & Welded Carbon Steel',
      spec2_label: 'Standard Coating',
      spec2_val: 'Rust-Oleum High-Build Epoxy / Direct-to-Metal Urethane',
      spec3_label: 'Safety Certification',
      spec3_val: 'OSHA / MSHA Part 46 Rigging & Confined Space',
      spec4_label: 'Typical Turnaround',
      spec4_val: '1 to 3 Weeks During Plant Off-Season'
    },
    'food-processing': {
      tag: 'Hygienic Manufacturing',
      title: 'Food & Beverage Processing Facilities',
      img: '/assets/images/news-epoxy.jpg',
      desc: 'Food processing environments require sterile, zero-VOC, and washdown-resistant coatings that prevent fungal growth and survive daily caustic chemical washings. Our team utilizes dustless blasting containment and USDA/FDA compliant antimicrobial epoxy finishes.',
      spec1_label: 'Typical Substrate',
      spec1_val: 'Structural Ceiling Trusses, Stainless & Carbon Tanks',
      spec2_label: 'Standard Coating',
      spec2_val: '100% Solids Novolac Epoxy / USDA Approved Enamels',
      spec3_label: 'Safety Certification',
      spec3_val: 'Food Safety Clean Containment & Air Filtration',
      spec4_label: 'Typical Turnaround',
      spec4_val: 'Weekend & Overnight Plant Shutdown Windows'
    },
    'quarries': {
      tag: 'Heavy Aggregate',
      title: 'Quarries & Stone Crushing Operations',
      img: '/assets/images/advantage-excavator.jpg',
      desc: 'Crusher chassis, screening plants, conveyor trusses, and hopper chutes endure severe vibration, abrasive rock impact, and limestone dust. We use heavy steel shot blasting to SSPC-SP 10 Near-White standards and apply high-impact polyurethanes designed for harsh aggregate punishment.',
      spec1_label: 'Typical Substrate',
      spec1_val: 'Heavy Gauge Structural Steel & Hopper Plate',
      spec2_label: 'Standard Coating',
      spec2_val: 'Ceramic-Infused Epoxy & Polyurethane Wear Systems',
      spec3_label: 'Safety Certification',
      spec3_val: 'MSHA Part 46 Certified Crews (Every Job)',
      spec4_label: 'Typical Turnaround',
      spec4_val: 'Scheduled Maintenance Shutdowns'
    },
    'concrete-plants': {
      tag: 'Batch Plants',
      title: 'Ready-Mix & Precast Concrete Plants',
      img: '/assets/images/news-virginia.jpg',
      desc: 'Concrete slurry, continuous moisture, and calcium hydroxide corrosion quickly erode batch plant towers and aggregate bins. Janney Painting cleans decades of hardened buildup with high-pressure abrasive blasting and seals all exterior steel with industrial-grade chemical barrier coatings.',
      spec1_label: 'Typical Substrate',
      spec1_val: 'Cement Silos, Weigh Hoppers & Batching Towers',
      spec2_label: 'Standard Coating',
      spec2_val: 'High Solids Polyamide Epoxy Barrier Coating',
      spec3_label: 'Safety Certification',
      spec3_val: 'Full Fall-Arrest Staging & OSHA Fall Protection',
      spec4_label: 'Typical Turnaround',
      spec4_val: '3 to 7 Days'
    },
    'asphalt-plants': {
      tag: 'Thermal Processing',
      title: 'Asphalt & Bitumen Plants',
      img: '/assets/images/news-pipeline.jpg',
      desc: 'High operating temperatures (up to 400°F), petroleum vapors, and outdoor exposure demand thermal-stable industrial coatings. We protect liquid asphalt storage tanks, drum mixers, baghouses, and exhaust stacks with heat-resistant silicone acrylics.',
      spec1_label: 'Typical Substrate',
      spec1_val: 'Baghouses, Asphalt Tanks, Silos & Drag Slats',
      spec2_label: 'Standard Coating',
      spec2_val: 'High-Temp Modified Silicones (Resistant to 500°F)',
      spec3_label: 'Safety Certification',
      spec3_val: 'Hot-Work & Vapor-Monitored Sandblasting',
      spec4_label: 'Typical Turnaround',
      spec4_val: 'Rapid Cure Formulations for Zero Plant Delay'
    },
    'water-treatment': {
      tag: 'Municipal & Utilities',
      title: 'Water & Wastewater Treatment Plants',
      img: '/assets/images/intro-silo.jpg',
      desc: 'Corrosive hydrogen sulfide gases, submersion, and chemical oxidizers require specialized containment coatings. Janney Painting applies NSF/ANSI Standard 61 certified potable water coatings for interior tanks and heavy polyurethane finishes on clarifier arms and digesters.',
      spec1_label: 'Typical Substrate',
      spec1_val: 'Clarifiers, Digester Tanks, Aeration Basins & Pipe',
      spec2_label: 'Standard Coating',
      spec2_val: 'NSF-61 Certified 100% Solids Epoxies & Polyureas',
      spec3_label: 'Safety Certification',
      spec3_val: 'Confined Space Entry Class 1 / Air Monitoring',
      spec4_label: 'Typical Turnaround',
      spec4_val: 'Turnkey Phased Tank Drainage Windows'
    },
    'cement-mills': {
      tag: 'Heavy Mineral',
      title: 'Cement Manufacturing Mills',
      img: '/assets/images/baltimore_port_steel.jpg',
      desc: 'Continuous kiln operation and abrasive limestone dust subject clinker halls, elevator legs, and bulk silos to intense friction. Janney Painting deploys automated blast equipment and heavy mastic primers to stop structural rust in its tracks.',
      spec1_label: 'Typical Substrate',
      spec1_val: 'Kiln Support Steel, Storage Silos, Ductwork',
      spec2_label: 'Standard Coating',
      spec2_val: 'Zinc-Rich Primer + High-Build Epoxy Intermediates',
      spec3_label: 'Safety Certification',
      spec3_val: 'MSHA Part 46 & Heavy Equipment Operation',
      spec4_label: 'Typical Turnaround',
      spec4_val: 'Full Turnaround Season Coordination'
    },
    'warehouses': {
      tag: 'Industrial Real Estate',
      title: 'Industrial Warehouses & Distribution Hubs',
      img: '/assets/images/news-baltimore.jpg',
      desc: 'Refurbishing ceiling bar joists, structural support I-beams, metal deck ceilings, and safety aisle floor striping in high-cube distribution centers. We operate battery-powered boom lifts with floor-protecting tires to keep active logistics facilities operational.',
      spec1_label: 'Typical Substrate',
      spec1_val: 'Structural Steel Columns, Web Joists & Concrete',
      spec2_label: 'Standard Coating',
      spec2_val: 'Dryfall Flat White Acrylic / 2-Part Polyurethane',
      spec3_label: 'Safety Certification',
      spec3_val: 'OSHA Aerial Platform Certified Riggers',
      spec4_label: 'Typical Turnaround',
      spec4_val: 'Phased Work By Zone (Zero Distribution Interruption)'
    }
  };

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const marketKey = btn.getAttribute('data-market');
      const data = marketsData[marketKey];
      if (!data) return;

      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update card content
      const tagEl = displayCard.querySelector('.market-display-tag');
      const titleEl = displayCard.querySelector('.market-display-title');
      const descEl = displayCard.querySelector('.market-display-desc');
      const imgEl = displayCard.querySelector('.market-display-img');
      const s1Label = displayCard.querySelector('#spec-1-label');
      const s1Val = displayCard.querySelector('#spec-1-val');
      const s2Label = displayCard.querySelector('#spec-2-label');
      const s2Val = displayCard.querySelector('#spec-2-val');
      const s3Label = displayCard.querySelector('#spec-3-label');
      const s3Val = displayCard.querySelector('#spec-3-val');
      const s4Label = displayCard.querySelector('#spec-4-label');
      const s4Val = displayCard.querySelector('#spec-4-val');

      displayCard.style.opacity = '0.5';
      setTimeout(() => {
        if (tagEl) tagEl.textContent = data.tag;
        if (titleEl) titleEl.textContent = data.title;
        if (descEl) descEl.textContent = data.desc;
        if (imgEl) {
          imgEl.src = data.img;
          imgEl.alt = data.title;
        }
        if (s1Label && s1Val) { s1Label.textContent = data.spec1_label; s1Val.textContent = data.spec1_val; }
        if (s2Label && s2Val) { s2Label.textContent = data.spec2_label; s2Val.textContent = data.spec2_val; }
        if (s3Label && s3Val) { s3Label.textContent = data.spec3_label; s3Val.textContent = data.spec3_val; }
        if (s4Label && s4Val) { s4Label.textContent = data.spec4_label; s4Val.textContent = data.spec4_val; }

        displayCard.style.opacity = '1';
      }, 150);
    });
  });
}
