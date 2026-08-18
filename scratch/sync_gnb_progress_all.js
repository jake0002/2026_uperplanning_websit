const fs = require('fs');
const path = require('path');

const files = [
  'ux-research/index.html', 'ux-research.html', 'ux_research.html',
  'ux-writing/index.html', 'ux-writing.html', 'ux_writing.html',
  'ux-design/index.html', 'ux-design.html', 'ux_design.html',
  'web-app-development/index.html', 'web-app-development.html', 'app_dev/index.html', 'app_dev.html',
  'ux-academy/index.html', 'ux-academy.html', 'ux_academy.html',
  'ux-company/index.html', 'ux-company.html', 'ux_company.html', 'company/index.html', 'company.html',
  'contact/index.html', 'contact.html'
];

const newCss = `    /* GNB SCROLL PROGRESS GAUGE BAR (EXACT MAIN PAGE COPY) */
    .gnb-progress-track {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3.5px;
      background: rgba(255, 255, 255, 0.15);
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      overflow: visible;
      pointer-events: none;
      z-index: 1000;
    }
    .gnb-progress-bar {
      height: 100%;
      width: 0%;
      background: #000000;
      box-shadow: 0 0 6px rgba(0, 0, 0, 0.8);
      border-radius: 0 2px 2px 0;
      position: relative;
      transition: width 0.08s cubic-bezier(0.1, 0.7, 0.1, 1);
    }
    .gnb-progress-bar::after {
      content: '';
      position: absolute;
      right: -2px;
      top: -2px;
      width: 7.5px;
      height: 7.5px;
      border-radius: 50%;
      background: #ffffff;
      box-shadow: 0 0 6px #000000;
      opacity: 0.95;
    }
    .gnb-progress-badge {
      position: absolute;
      right: -14px;
      top: 10px;
      transform: translateX(50%);
      background: #000000;
      color: #ffffff;
      border: 1px solid #ffffff;
      border-radius: 3px;
      font-size: 10px;
      font-weight: 800;
      font-family: var(--font-mono, monospace);
      padding: 1px 6px;
      white-space: nowrap;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
      opacity: 0;
      transition: opacity 0.25s ease;
      pointer-events: none;
    }
    body.is-scrolling .gnb-progress-badge,
    .gnb-progress-track:hover .gnb-progress-badge {
      opacity: 1;
    }`;

const newJs = `    let scrollTimer = null;
    function updateGnbScrollProgress() {
      const progressBar = document.getElementById('gnbProgressBar');
      const progressBadge = document.getElementById('gnbProgressBadge');
      if (!progressBar) return;

      // 1. Window scroll calculation
      const winScroll = Math.max(0, window.pageYOffset || window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0);
      const winDocHeight = Math.max(
        document.body.scrollHeight || 0,
        document.documentElement.scrollHeight || 0,
        document.body.offsetHeight || 0,
        document.documentElement.offsetHeight || 0
      );
      const winViewport = window.innerHeight || document.documentElement.clientHeight || 0;
      const winMaxScroll = Math.max(0, winDocHeight - winViewport);
      const winRatio = winMaxScroll > 5 ? (winScroll / winMaxScroll) : 0;

      // 2. Main content pane scroll calculation
      const mainPane = document.querySelector('.main-content-pane');
      let paneRatio = 0;
      let paneScroll = 0;
      if (mainPane) {
        paneScroll = mainPane.scrollTop || 0;
        const paneMaxScroll = Math.max(0, mainPane.scrollHeight - mainPane.clientHeight);
        if (paneMaxScroll > 5) {
          paneRatio = paneScroll / paneMaxScroll;
        }
      }

      // 3. Take active max scroll ratio & current scroll
      const activeRatio = Math.max(winRatio, paneRatio);
      const activeScroll = Math.max(winScroll, paneScroll);

      // 4. Compute final percentage
      const scrolled = Math.min(100, Math.max(0, activeRatio * 100));

      // 5. Update DOM
      progressBar.style.width = scrolled + '%';
      if (progressBadge) {
        progressBadge.textContent = Math.round(scrolled) + '%';
      }

      // 6. Active scrolling badge visibility timer (1200ms auto-fade, identical to main page)
      if (activeScroll > 10) {
        document.body.classList.add('is-scrolling');
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          document.body.classList.remove('is-scrolling');
        }, 1200);
      } else {
        document.body.classList.remove('is-scrolling');
      }
    }

    // Attach listeners to window, document, and main pane
    window.addEventListener('scroll', updateGnbScrollProgress, { passive: true, capture: true });
    window.addEventListener('resize', updateGnbScrollProgress, { passive: true });
    document.addEventListener('scroll', updateGnbScrollProgress, { passive: true, capture: true });

    const mainPaneEl = document.querySelector('.main-content-pane');
    if (mainPaneEl) {
      mainPaneEl.addEventListener('scroll', updateGnbScrollProgress, { passive: true });
    }

    // Fire initial update and heartbeat timer fallback
    updateGnbScrollProgress();
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', updateGnbScrollProgress);
    }
    window.addEventListener('load', updateGnbScrollProgress);
    setTimeout(updateGnbScrollProgress, 200);
    setTimeout(updateGnbScrollProgress, 800);
    setInterval(updateGnbScrollProgress, 250);`;

files.forEach(f => {
  const fullPath = path.join(__dirname, '..', 'implementation', f);
  if (!fs.existsSync(fullPath)) return;

  let content = fs.readFileSync(fullPath, 'utf8');

  // Replace CSS
  const cssRegex = /\.gnb-progress-track\s*\{[\s\S]*?body\.is-scrolling \.gnb-progress-badge,?\s*\.gnb-progress-track:hover \.gnb-progress-badge\s*\{[\s\S]*?\}/;
  if (cssRegex.test(content)) {
    content = content.replace(cssRegex, newCss);
  } else {
    console.warn('CSS Regex missed for:', f);
  }

  // Replace JS
  const jsRegex = /(?:let scrollTimer = null;\s*)?function updateGnbScrollProgress\(\)\s*\{[\s\S]*?setInterval\(updateGnbScrollProgress, 250\);/;
  if (jsRegex.test(content)) {
    content = content.replace(jsRegex, newJs);
  } else {
    console.warn('JS Regex missed for:', f);
  }

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('Updated:', f);
});
