// Vanguard & Juris - 3D Canvas Scroll Engine & Interaction Controller

export function initScrollEngine() {
  init3DCanvas();
  initTextScrubReveal();
  initHorizontalPinScroll();
  initRetainerCalculator();
  initMobileNav();
}

// 1. High-Performance 3D Wireframe & Shaded Canvas on Scroll
function init3DCanvas() {
  const canvas = document.getElementById('scroll3DCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Scroll tracking with smooth lerp
  let targetScroll = 0;
  let currentScroll = 0;

  window.addEventListener('scroll', () => {
    targetScroll = window.scrollY;
  });

  // Mouse tilt tracking
  let targetMouseX = 0;
  let targetMouseY = 0;
  let mouseX = 0;
  let mouseY = 0;

  window.addEventListener('mousemove', (e) => {
    targetMouseX = (e.clientX / width - 0.5) * 0.4;
    targetMouseY = (e.clientY / height - 0.5) * 0.4;
  });

  // 3D Geometry: Scales of Justice + Roman Temple Pillars
  // Build 3D lines and points
  const model = generateLawTempleModel();

  // Floating Golden Embers
  const particles = Array.from({ length: 45 }, () => ({
    x: (Math.random() - 0.5) * 800,
    y: (Math.random() - 0.5) * 600,
    z: (Math.random() - 0.5) * 800,
    speedY: 0.3 + Math.random() * 0.7,
    size: 1 + Math.random() * 2
  }));

  function render() {
    // Smooth lerp
    currentScroll += (targetScroll - currentScroll) * 0.08;
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    ctx.clearRect(0, 0, width, height);

    // Compute scroll progress through the first 1400px
    const scrollFactor = Math.min(Math.max(currentScroll / 1200, 0), 1.5);

    // Dynamic 3D rotation angles driven by scroll + mouse
    const rotY = scrollFactor * Math.PI * 1.2 + mouseX;
    const rotX = 0.25 - scrollFactor * 0.4 + mouseY;
    const rotZ = Math.sin(scrollFactor * Math.PI) * 0.15;

    const fov = 500;
    const cameraDist = 650;
    const centerX = width > 900 ? width * 0.65 : width * 0.5;
    const centerY = height * 0.48 - scrollFactor * 120;
    const scale = Math.min(width, height) * 0.0022;

    // Draw Background Embers
    ctx.fillStyle = '#dfba73';
    particles.forEach(p => {
      p.y -= p.speedY;
      if (p.y < -300) p.y = 300;

      // Project particle
      const pz = p.z + cameraDist;
      if (pz > 10) {
        const px = centerX + (p.x * fov) / pz;
        const py = centerY + (p.y * fov) / pz;
        const alpha = Math.max(0.1, 1 - pz / 1200) * 0.6;
        ctx.fillStyle = `rgba(223, 186, 115, ${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // 3D Transform Helper
    function project(pt) {
      // Scale
      let x = pt.x * scale * 100;
      let y = pt.y * scale * 100;
      let z = pt.z * scale * 100;

      // Rotate Y
      let cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      let x1 = x * cosY + z * sinY;
      let z1 = -x * sinY + z * cosY;

      // Rotate X
      let cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      let y2 = y * cosX - z1 * sinX;
      let z2 = y * sinX + z1 * cosX;

      // Rotate Z
      let cosZ = Math.cos(rotZ), sinZ = Math.sin(rotZ);
      let x3 = x1 * cosZ - y2 * sinZ;
      let y3 = x1 * sinZ + y2 * cosZ;

      let depth = z2 + cameraDist;
      if (depth < 10) depth = 10;

      return {
        x: centerX + (x3 * fov) / depth,
        y: centerY + (y3 * fov) / depth,
        z: z2
      };
    }

    // Render 3D Edges
    model.edges.forEach(edge => {
      const p1 = project(model.vertices[edge[0]]);
      const p2 = project(model.vertices[edge[1]]);

      // Calculate depth brightness
      const avgZ = (p1.z + p2.z) / 2;
      const alpha = Math.min(Math.max((avgZ + 300) / 600, 0.2), 0.95);

      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = `rgba(223, 186, 115, ${alpha})`;
      ctx.lineWidth = edge[2] || 1.2;
      ctx.stroke();
    });

    // Render Nodes
    model.vertices.forEach(v => {
      const p = project(v);
      const alpha = Math.min(Math.max((p.z + 300) / 600, 0.25), 1);
      ctx.beginPath();
      ctx.arc(p.x, p.y, (v.size || 2.2) * (scale * 0.9), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(253, 244, 220, ${alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

// Generates 3D coordinates for Roman Legal Temple & Scales of Justice
function generateLawTempleModel() {
  const vertices = [];
  const edges = [];

  // Central Pillar / Stem of Scales
  vertices.push({ x: 0, y: -160, z: 0, size: 4 }); // 0: Top Finial
  vertices.push({ x: 0, y: 140, z: 0, size: 3 });  // 1: Base Stem
  edges.push([0, 1, 2.8]);

  // Pedestal Base (Hexagonal stepped platform)
  const baseR = 75;
  const baseSteps = 6;
  const baseStart = vertices.length;
  for (let i = 0; i < baseSteps; i++) {
    const angle = (i / baseSteps) * Math.PI * 2;
    vertices.push({
      x: Math.cos(angle) * baseR,
      y: 140,
      z: Math.sin(angle) * baseR
    });
    vertices.push({
      x: Math.cos(angle) * (baseR + 25),
      y: 170,
      z: Math.sin(angle) * (baseR + 25)
    });
  }

  for (let i = 0; i < baseSteps; i++) {
    const next = (i + 1) % baseSteps;
    // Top ring
    edges.push([baseStart + i * 2, baseStart + next * 2, 1.2]);
    // Bottom ring
    edges.push([baseStart + i * 2 + 1, baseStart + next * 2 + 1, 1.5]);
    // Vertical legs
    edges.push([baseStart + i * 2, baseStart + i * 2 + 1, 1.0]);
    // Connect to central stem
    edges.push([1, baseStart + i * 2, 1.2]);
  }

  // Cross Beam of Scales (Horizontal Bar)
  const beamY = -120;
  const beamW = 150;
  const beamLeft = vertices.length;
  vertices.push({ x: -beamW, y: beamY, z: 0, size: 3 }); // Left end
  const beamRight = vertices.length;
  vertices.push({ x: beamW, y: beamY, z: 0, size: 3 });  // Right end
  edges.push([beamLeft, beamRight, 2.5]);

  // Left Scale Pan (Suspended Triad + Pan)
  const panY = -30;
  const panR = 45;
  const leftCenter = vertices.length;
  vertices.push({ x: -beamW, y: panY, z: 0, size: 2.5 });

  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2;
    const ptIdx = vertices.length;
    vertices.push({
      x: -beamW + Math.cos(angle) * panR,
      y: panY + 12,
      z: Math.sin(angle) * panR
    });
    // Suspension strings from beamLeft
    edges.push([beamLeft, ptIdx, 0.8]);
    // Connect to pan center
    edges.push([leftCenter, ptIdx, 1.0]);
  }
  for (let i = 0; i < 4; i++) {
    edges.push([leftCenter + 1 + i, leftCenter + 1 + ((i + 1) % 4), 1.2]);
  }

  // Right Scale Pan (Suspended Triad + Pan)
  const rightCenter = vertices.length;
  vertices.push({ x: beamW, y: panY, z: 0, size: 2.5 });

  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2;
    const ptIdx = vertices.length;
    vertices.push({
      x: beamW + Math.cos(angle) * panR,
      y: panY + 12,
      z: Math.sin(angle) * panR
    });
    // Suspension strings from beamRight
    edges.push([beamRight, ptIdx, 0.8]);
    // Connect to pan center
    edges.push([rightCenter, ptIdx, 1.0]);
  }
  for (let i = 0; i < 4; i++) {
    edges.push([rightCenter + 1 + i, rightCenter + 1 + ((i + 1) % 4), 1.2]);
  }

  return { vertices, edges };
}

// 2. Scroll-Driven Text Scrub Reveal (Words illuminate smoothly with scroll)
function initTextScrubReveal() {
  const elements = document.querySelectorAll('[data-scroll-scrub]');
  if (elements.length === 0) return;

  elements.forEach(el => {
    const text = el.innerText;
    const words = text.split(' ');
    el.innerHTML = words.map(w => `<span class="scrub-word">${w}</span>`).join(' ');
  });

  const wordSpans = document.querySelectorAll('.scrub-word');

  function updateScrub() {
    const viewportHeight = window.innerHeight;

    wordSpans.forEach(span => {
      const rect = span.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      // Calculate progress between 85% and 35% of viewport
      const start = viewportHeight * 0.85;
      const end = viewportHeight * 0.35;
      const progress = Math.min(Math.max((start - elementCenter) / (start - end), 0), 1);

      if (progress > 0) {
        span.style.opacity = (0.2 + progress * 0.8).toFixed(2);
        span.style.color = progress > 0.6 ? '#fdf4dc' : 'var(--text-secondary)';
        span.style.transform = `translateY(${(1 - progress) * 4}px)`;
      } else {
        span.style.opacity = '0.2';
        span.style.color = 'var(--text-secondary)';
        span.style.transform = 'translateY(4px)';
      }
    });
  }

  window.addEventListener('scroll', updateScrub, { passive: true });
  updateScrub();
}

// 3. Horizontal Pin-Scroll for Landmark Precedents & Cases
function initHorizontalPinScroll() {
  const container = document.getElementById('pinnedCaseWrapper');
  const track = document.getElementById('horizontalCasesTrack');
  if (!container || !track) return;

  function updateHorizontalScroll() {
    const rect = container.getBoundingClientRect();
    const containerTop = rect.top;
    const totalScrollDist = container.offsetHeight - window.innerHeight;

    if (totalScrollDist <= 0) return;

    if (containerTop <= 0 && containerTop >= -totalScrollDist) {
      // Pinned inside view
      const progress = -containerTop / totalScrollDist;
      const maxTranslate = track.scrollWidth - window.innerWidth + 80;
      track.style.transform = `translateX(${-progress * Math.max(0, maxTranslate)}px)`;
    } else if (containerTop > 0) {
      track.style.transform = `translateX(0px)`;
    } else {
      const maxTranslate = track.scrollWidth - window.innerWidth + 80;
      track.style.transform = `translateX(${-Math.max(0, maxTranslate)}px)`;
    }
  }

  window.addEventListener('scroll', updateHorizontalScroll, { passive: true });
  window.addEventListener('resize', updateHorizontalScroll);
}

// 4. Interactive Legal Fee & Case Retainer Calculator
function initRetainerCalculator() {
  const form = document.getElementById('retainerCalculatorForm');
  if (!form) return;

  const courtSelect = document.getElementById('calcJurisdiction');
  const natureSelect = document.getElementById('calcNature');
  const stageSelect = document.getElementById('calcStage');
  const resultBox = document.getElementById('calcResultBox');
  const estVal = document.getElementById('calcEstimatedBracket');
  const estTime = document.getElementById('calcEstimatedTimeline');

  function calculate() {
    const court = courtSelect?.value || 'dhanbad-district-sessions';
    const nature = natureSelect?.value || 'civil-property';
    const stage = stageSelect?.value || 'trial-evidence';

    let baseRetainer = "₹25,000 - ₹60,000";
    let timeline = "2 to 4 Months (Trial Progression & Evidence)";

    if (court === 'dhanbad-district-sessions') {
      if (nature === 'criminal-defense') {
        if (stage === 'bail-urgent') {
          baseRetainer = "₹15,000 - ₹35,000";
          timeline = "3 to 10 Days (Regular / Anticipatory Bail Hearing)";
        } else {
          baseRetainer = "₹35,000 - ₹85,000";
          timeline = "3 to 6 Months (Sessions Trial & Cross-Examination)";
        }
      } else {
        baseRetainer = "₹30,000 - ₹75,000";
        timeline = "4 to 8 Months (Title Appeal / Civil Revision)";
      }
    } else if (court === 'dhanbad-civil-court') {
      if (stage === 'bail-urgent') {
        baseRetainer = "₹20,000 - ₹40,000";
        timeline = "1 to 3 Weeks (Ad-Interim Injunction Hearing)";
      } else {
        baseRetainer = "₹35,000 - ₹90,000";
        timeline = "6 to 12 Months (Title Suit, Partition, Evidence & Decree)";
      }
    } else if (court === 'cjm-court') {
      if (nature === 'ni-act-138') {
        baseRetainer = "₹15,000 - ₹40,000";
        timeline = "2 to 5 Months (Cheque Bounce Trial & Cross-Examination)";
      } else {
        baseRetainer = "₹12,000 - ₹30,000";
        timeline = "1 to 3 Months (Magisterial Trial / Discharge Hearing)";
      }
    } else if (court === 'jharkhand-high-court') {
      baseRetainer = "₹50,000 - ₹1,50,000";
      timeline = "1 to 3 Months (Criminal Appeal / Civil Revision / Writ at Ranchi)";
    }

    if (estVal) estVal.textContent = baseRetainer;
    if (estTime) estTime.textContent = timeline;
    if (resultBox) resultBox.classList.add('active');
  }

  [courtSelect, natureSelect, stageSelect].forEach(sel => {
    if (sel) sel.addEventListener('change', calculate);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('calcClientName')?.value || 'Client';
    const phone = document.getElementById('calcClientPhone')?.value || '';
    const jurisdiction = courtSelect?.options[courtSelect.selectedIndex]?.text || '';
    const nature = natureSelect?.options[natureSelect.selectedIndex]?.text || '';
    const retainer = estVal?.textContent || '';

    const text = `Case Assessment Request for Advocate Sanjay Tiwari (Dhanbad Court):%0A- Client Name: ${encodeURIComponent(name)}%0A- Phone: ${encodeURIComponent(phone)}%0A- Court Forum: ${encodeURIComponent(jurisdiction)}%0A- Matter Category: ${encodeURIComponent(nature)}%0A- Indicative Fee Estimate: ${encodeURIComponent(retainer)}`;
    window.open(`https://wa.me/919431122334?text=${text}`, '_blank');

    alert(`Thank you, ${name}. Your confidential case briefing has been received. Advocate Sanjay Tiwari's chambers at Dhanbad Court will review your matter promptly.`);
  });
}

// 5. Mobile Nav Toggle
function initMobileNav() {
  const toggle = document.getElementById('mobileNavToggle');
  const drawer = document.getElementById('mobileMenuDrawer');
  if (toggle && drawer) {
    toggle.addEventListener('click', () => {
      drawer.classList.toggle('open');
      const isOpen = drawer.classList.contains('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });
  }
}
