(function () {
  'use strict';
 
  /* ─────────────────────────────────────────
     1. INJECT ALL REQUIRED CSS DYNAMICALLY
  ───────────────────────────────────────── */
  const css = `
    /* ── LOADER ── */
    #dlrs-loader {
      position: fixed; inset: 0; z-index: 99999;
      background: #0A1628;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      gap: 2rem;
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    #dlrs-loader.hide {
      opacity: 0;
      pointer-events: none;
      transform: translateY(-20px);
    }
 
    .loader-logo-wrap {
      display: flex; flex-direction: column; align-items: center; gap: 1rem;
    }
    .loader-mark {
      width: 68px; height: 68px; border-radius: 16px;
      background: linear-gradient(135deg, #1557BF, #00B4D8);
      display: flex; align-items: center; justify-content: center;
      font-family: 'Outfit', sans-serif;
      font-size: 1.1rem; font-weight: 900; color: white;
      letter-spacing: -0.03em;
      box-shadow: 0 0 0 0 rgba(21,87,191,0.5);
      animation: loaderPulse 1.5s ease-in-out infinite;
    }
    @keyframes loaderPulse {
      0%  { box-shadow: 0 0 0 0   rgba(21,87,191,0.5); }
      70% { box-shadow: 0 0 0 24px rgba(21,87,191,0);   }
      100%{ box-shadow: 0 0 0 0   rgba(21,87,191,0);   }
    }
    .loader-name {
      font-family: 'Outfit', sans-serif;
      font-size: 1.6rem; font-weight: 900;
      color: white; letter-spacing: -0.02em;
      opacity: 0; animation: loaderFadeUp 0.5s 0.2s ease forwards;
    }
    .loader-name span { color: #00B4D8; }
    .loader-tagline {
      font-family: 'Outfit', sans-serif;
      font-size: 0.8rem; font-weight: 500;
      color: rgba(255,255,255,0.35);
      letter-spacing: 0.12em; text-transform: uppercase;
      opacity: 0; animation: loaderFadeUp 0.5s 0.4s ease forwards;
    }
    @keyframes loaderFadeUp {
      from { opacity:0; transform:translateY(10px); }
      to   { opacity:1; transform:translateY(0); }
    }
 
    /* Progress bar */
    .loader-progress-wrap {
      width: 200px;
      opacity: 0; animation: loaderFadeUp 0.5s 0.5s ease forwards;
    }
    .loader-progress-track {
      height: 3px; background: rgba(255,255,255,0.08);
      border-radius: 100px; overflow: hidden;
    }
    .loader-progress-fill {
      height: 100%; width: 0%;
      background: linear-gradient(90deg, #1557BF, #00B4D8);
      border-radius: 100px;
      transition: width 0.1s linear;
    }
    .loader-progress-label {
      font-family: 'Outfit', sans-serif;
      font-size: 0.72rem; color: rgba(255,255,255,0.3);
      text-align: right; margin-top: 6px; font-weight: 500;
    }
 
    /* Animated grid inside loader */
    .loader-grid {
      position: absolute; inset: 0; pointer-events: none;
      background-image:
        linear-gradient(rgba(21,87,191,0.06) 1px, transparent 1px),
        linear-gradient(90deg, rgba(21,87,191,0.06) 1px, transparent 1px);
      background-size: 50px 50px;
      animation: loaderGridMove 3s linear infinite;
    }
    @keyframes loaderGridMove {
      from { transform: translateY(0); }
      to   { transform: translateY(50px); }
    }
 
    /* Loader orbs */
    .loader-orb {
      position: absolute; border-radius: 50%;
      filter: blur(70px); pointer-events: none;
    }
    .loader-orb-1 {
      width: 300px; height: 300px;
      background: radial-gradient(circle, rgba(21,87,191,0.25), transparent 70%);
      top: -80px; right: -60px;
      animation: loaderOrbFloat 4s ease-in-out infinite;
    }
    .loader-orb-2 {
      width: 200px; height: 200px;
      background: radial-gradient(circle, rgba(0,180,216,0.2), transparent 70%);
      bottom: -50px; left: 5%;
      animation: loaderOrbFloat 5s ease-in-out infinite reverse;
    }
    @keyframes loaderOrbFloat {
      0%,100%{ transform:translateY(0) scale(1); }
      50%    { transform:translateY(-20px) scale(1.05); }
    }
 
    /* ── PAGE ENTRANCE — body hidden until loader done ── */
    body.dlrs-loading { overflow: hidden; }
    body.dlrs-loading > *:not(#dlrs-loader) { opacity: 0; }
    body.dlrs-ready   > *:not(#dlrs-loader) {
      opacity: 1;
      transition: opacity 0.4s ease;
    }
 
    /* ── CLIP MASK REVEALS ── */
    .mask-reveal {
      overflow: hidden; display: inline-block;
    }
    .mask-reveal-inner {
      display: block;
      transform: translateY(100%);
      transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .mask-reveal.visible .mask-reveal-inner {
      transform: translateY(0);
    }
 
    /* ── 3D TILT CARD ── */
    .tilt-card {
      transform-style: preserve-3d;
      transition: transform 0.1s ease;
      will-change: transform;
    }
    .tilt-card-inner {
      transform-style: preserve-3d;
    }
 
    /* ── PARALLAX LAYER ── */
    .parallax-slow   { will-change: transform; }
    .parallax-medium { will-change: transform; }
    .parallax-fast   { will-change: transform; }
 
    /* ── SHIMMER on hero card items ── */
    .shimmer-line {
      position: relative; overflow: hidden;
    }
    .shimmer-line::after {
      content: '';
      position: absolute; inset: 0;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255,255,255,0.06) 50%,
        transparent 100%
      );
      transform: translateX(-100%);
      animation: shimmerMove 3s ease-in-out infinite;
    }
    @keyframes shimmerMove {
      0%   { transform: translateX(-100%); }
      50%  { transform: translateX(100%); }
      100% { transform: translateX(100%); }
    }
 
    /* ── COUNTER number flip ── */
    .count-up { display: inline-block; }
 
    /* ── SMOOTH SCROLL PROGRESS BAR (top of page) ── */
    #scroll-progress {
      position: fixed; top: 0; left: 0; right: 0;
      height: 2px; z-index: 99998;
      background: linear-gradient(90deg, #1557BF, #00B4D8, #10B981);
      transform-origin: left;
      transform: scaleX(0);
      transition: transform 0.1s linear;
    }
  `;
 
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
 
 
  /* ─────────────────────────────────────────
     2. INJECT LOADER HTML
  ───────────────────────────────────────── */
  const loader = document.createElement('div');
  loader.id = 'dlrs-loader';
  loader.innerHTML = `
    <div class="loader-grid"></div>
    <div class="loader-orb loader-orb-1"></div>
    <div class="loader-orb loader-orb-2"></div>
    <div class="loader-logo-wrap">
      <div class="loader-mark">DLR</div>
      <div class="loader-name">DLRS<span>JAM</span></div>
      <div class="loader-tagline">Digital Licence Renewal System · Jamaica</div>
    </div>
    <div class="loader-progress-wrap">
      <div class="loader-progress-track">
        <div class="loader-progress-fill" id="loaderFill"></div>
      </div>
      <div class="loader-progress-label" id="loaderLabel">0%</div>
    </div>
  `;
  document.body.prepend(loader);
  document.body.classList.add('dlrs-loading');
 
  /* Inject scroll progress bar */
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  document.body.prepend(progressBar);
 
 
  /* ─────────────────────────────────────────
     3. LOADER PROGRESS ANIMATION
  ───────────────────────────────────────── */
  const fill  = document.getElementById('loaderFill');
  const label = document.getElementById('loaderLabel');
  let progress = 0;
 
  // Simulate realistic loading with variable speed
  const speeds = [
    { target: 30,  delay: 20  },
    { target: 60,  delay: 30  },
    { target: 85,  delay: 40  },
    { target: 95,  delay: 60  },
    { target: 100, delay: 20  },
  ];
 
  function runProgress(phases) {
    if (!phases.length) return;
    const phase = phases.shift();
    const interval = setInterval(() => {
      if (progress >= phase.target) {
        clearInterval(interval);
        runProgress(phases);
        if (phase.target === 100) revealPage();
      } else {
        progress++;
        fill.style.width  = progress + '%';
        label.textContent = progress + '%';
      }
    }, phase.delay);
  }
 
  function revealPage() {
    setTimeout(() => {
      loader.classList.add('hide');
      document.body.classList.remove('dlrs-loading');
      document.body.classList.add('dlrs-ready');
      setTimeout(() => {
        loader.remove();
        initAllAnimations();
      }, 700);
    }, 300);
  }
 
  // Start progress on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => runProgress([...speeds]));
  } else {
    runProgress([...speeds]);
  }
 
 
  /* ─────────────────────────────────────────
     4. ALL ANIMATIONS — run after loader
  ───────────────────────────────────────── */
  function initAllAnimations() {
    initScrollProgress();
    initParallax();
    init3DTilt();
    initMaskReveals();
    initShimmer();
    initCounters();
    initSectionEntrances();
  }
 
 
  /* ─────────────────────────────────────────
     5. SCROLL PROGRESS BAR
  ───────────────────────────────────────── */
  function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
      const scrolled  = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${scrolled / maxScroll})`;
    }, { passive: true });
  }
 
 
  /* ─────────────────────────────────────────
     6. PARALLAX — orbs & grid move at
        different speeds on scroll
  ───────────────────────────────────────── */
  function initParallax() {
    const orb1 = document.querySelector('.orb-1');
    const orb2 = document.querySelector('.orb-2');
    const orb3 = document.querySelector('.orb-3');
    const grid = document.querySelector('.hero-grid');
 
    if (!orb1 && !orb2 && !orb3) return;
 
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (orb1) orb1.style.transform = `translateY(${y * 0.18}px) scale(1)`;
      if (orb2) orb2.style.transform = `translateY(${y * -0.12}px) scale(1)`;
      if (orb3) orb3.style.transform = `translateY(${y * 0.25}px) scale(1)`;
      if (grid) grid.style.transform = `translateY(calc(${y * 0.08}px))`;
    }, { passive: true });
  }
 
 
  /* ─────────────────────────────────────────
     7. 3D TILT — hero app card
  ───────────────────────────────────────── */
  function init3DTilt() {
    // Apply to hero visual / app card
    const card = document.querySelector('.hero-visual');
    if (!card) return;
 
    card.style.transformStyle = 'preserve-3d';
    card.style.transition = 'transform 0.15s ease';
    card.style.willChange = 'transform';
    card.style.perspective = '1000px';
 
    const inner = card.querySelector('.app-card');
    if (!inner) return;
    inner.style.transformStyle = 'preserve-3d';
 
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const cx     = rect.width  / 2;
      const cy     = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -10; // max 10deg
      const rotateY = ((x - cx) / cx) *  10;
 
      inner.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale3d(1.02, 1.02, 1.02)
      `;
 
      // Dynamic highlight/sheen following cursor
      const shine = x / rect.width * 100;
      inner.style.backgroundImage = `
        radial-gradient(circle at ${shine}% 50%,
          rgba(255,255,255,0.04) 0%,
          rgba(255,255,255,0.01) 40%,
          transparent 70%),
        none
      `;
    });
 
    card.addEventListener('mouseleave', () => {
      inner.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)';
      inner.style.backgroundImage = 'none';
    });
  }
 
 
  /* ─────────────────────────────────────────
     8. CLIP MASK REVEALS on headings
        Wraps .section-title & .page-hero h1
        in a clip container so text slides up
        from behind a mask
  ───────────────────────────────────────── */
  function initMaskReveals() {
    const targets = document.querySelectorAll(
      '.section-title, .page-hero h1, .hero h1'
    );
 
    targets.forEach(el => {
      // Skip if already processed
      if (el.classList.contains('mask-reveal')) return;
 
      const inner = document.createElement('span');
      inner.className = 'mask-reveal-inner';
      inner.innerHTML = el.innerHTML;
      el.innerHTML = '';
      el.classList.add('mask-reveal');
      el.appendChild(inner);
    });
 
    const maskObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          maskObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
 
    document.querySelectorAll('.mask-reveal').forEach(el => maskObserver.observe(el));
  }
 
 
  /* ─────────────────────────────────────────
     9. SHIMMER on verification items
        in the hero card
  ───────────────────────────────────────── */
  function initShimmer() {
    const items = document.querySelectorAll('.verification-item');
    items.forEach((item, i) => {
      item.classList.add('shimmer-line');
      // Stagger the shimmer delay per item
      item.style.setProperty('--shimmer-delay', `${i * 0.4}s`);
    });
 
    // Update shimmer CSS to use per-item delay
    const shimStyle = document.createElement('style');
    shimStyle.textContent = `
      .shimmer-line::after {
        animation-delay: var(--shimmer-delay, 0s);
      }
    `;
    document.head.appendChild(shimStyle);
  }
 
 
  /* ─────────────────────────────────────────
     10. COUNTER ANIMATION
         Finds elements with data-count attr
         OR the hero stat numbers
  ───────────────────────────────────────── */
  function initCounters() {
    // Hero stats specifically
    const statNums = document.querySelectorAll('.stat-num');
    const targets  = ['0', '3', '100%'];
 
    statNums.forEach((el, i) => {
      if (!targets[i]) return;
      const raw    = targets[i].replace('%', '');
      const suffix = targets[i].includes('%') ? '%' : '';
      const target = parseInt(raw);
      if (isNaN(target) || target === 0) return;
 
      el.textContent = '0' + suffix;
      let current = 0;
      const duration = 1200;
      const steps    = 60;
      const inc      = target / steps;
 
      const counterObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const tick = setInterval(() => {
            current += inc;
            if (current >= target) {
              current = target;
              clearInterval(tick);
            }
            el.textContent = Math.floor(current) + suffix;
          }, duration / steps);
          counterObs.unobserve(el);
        });
      }, { threshold: 0.5 });
 
      counterObs.observe(el);
    });
  }
 
 
  /* ─────────────────────────────────────────
     11. STAGGERED SECTION ENTRANCES
         More dramatic version of the existing
         reveal system — adds a cinematic
         wipe effect to section headers
  ───────────────────────────────────────── */
  function initSectionEntrances() {
    // Add cinematic line wipe before each section-tag
    const tags = document.querySelectorAll('.section-tag');
    tags.forEach(tag => {
      tag.style.overflow   = 'hidden';
      tag.style.position   = 'relative';
      tag.style.opacity    = '0';
      tag.style.transition = 'opacity 0.4s ease';
 
      const wipeObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.style.opacity = '1';
            wipeObs.unobserve(e.target);
          }
        });
      }, { threshold: 0.5 });
 
      wipeObs.observe(tag);
    });
 
    // Add floating animation to feature/why cards on hover
    const cards = document.querySelectorAll(
      '.why-card, .problem-card, .feat-card, .mini-card, .global-card, .ai-card'
    );
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, border-color 0.3s ease';
      });
    });
 
    // Add stagger to process steps
    const steps = document.querySelectorAll('.process-step');
    steps.forEach((step, i) => {
      step.style.transitionDelay = `${i * 0.08}s`;
    });
 
    // Smooth entrance for page hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      heroContent.style.opacity    = '0';
      heroContent.style.transform  = 'translateY(30px)';
      heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      setTimeout(() => {
        heroContent.style.opacity   = '1';
        heroContent.style.transform = 'translateY(0)';
      }, 100);
    }
  }
 
})();
