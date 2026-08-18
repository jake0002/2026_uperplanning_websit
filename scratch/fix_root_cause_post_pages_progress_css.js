const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'implementation');

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const targetHtmlFiles = [
  path.join(baseDir, 'ux-blog.html'),
  path.join(baseDir, 'ux_blog.html'),
  ...getFiles(path.join(baseDir, 'ux-blog'))
];

const exactGnbCss = `    #gnb {
      position: fixed !important;
      top: var(--logo-top);
      left: 95px;
      right: 14px;
      height: var(--gnb-h);
      background: var(--gnb-bg);
      color: var(--gnb-fg);
      border: 1px solid var(--gnb-bd);
      backdrop-filter: blur(8px);
      z-index: 99999 !important;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 8px;
      border-radius: 4px;
      user-select: none !important;
      overflow: visible !important;
    }`;

const exactGaugeCss = `
    /* GNB SCROLL PROGRESS GAUGE BAR (EXACT UX-RESEARCH MATCH) */
    .gnb-progress-track {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3.5px;
      background: rgba(255, 255, 255, 0.15);
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      overflow: visible !important;
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
      opacity: 1 !important;
    }
`;

const exactGaugeJs = `
    // GNB Scroll Progress Gauge Handler (Exact UX-Research Match)
    let scrollTimer = null;
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

      // 6. Active scrolling badge visibility timer (1200ms auto-fade)
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
    setTimeout(updateGnbScrollProgress, 300);
    setTimeout(updateGnbScrollProgress, 1000);
`;

targetHtmlFiles.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Replace #gnb CSS rule
  content = content.replace(/#gnb\s*\{[^}]*\}/g, exactGnbCss.trim());

  // 2. Replace .gnb-progress-track block regardless of old contents
  if (content.includes('.gnb-progress-track')) {
    // Delete old .gnb-progress-* rules up to .gnb-menu or .gnb-item
    content = content.replace(/\.gnb-progress-track[\s\S]*?(?=\.gnb-menu|\.gnb-item)/g, exactGaugeCss.trim() + '\n\n    ');
  }

  // 3. Replace JS scroll logic regardless of old contents
  if (content.includes('updateGnbScrollProgress') || content.includes('// GNB SCROLL PROGRESS GAUGE BAR') || content.includes('// GNB Scroll Progress')) {
    content = content.replace(/\/\/\s*GNB\s*(?:Scroll|SCROLL)[\s\S]*?<\/script>/g, exactGaugeJs.trim() + '\n  </script>');
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed root cause CSS & JS for:', path.relative(baseDir, filePath));
});

// Update generator script as well
const genScriptPath = path.join(__dirname, 'generate_standalone_post_pages.js');
if (fs.existsSync(genScriptPath)) {
  let content = fs.readFileSync(genScriptPath, 'utf8');
  content = content.replace(/#gnb\s*\{[^}]*\}/g, exactGnbCss.trim());
  content = content.replace(/\.gnb-progress-track[\s\S]*?(?=\.gnb-menu|\.gnb-item)/g, exactGaugeCss.trim() + '\n\n    ');
  content = content.replace(/\/\/\s*GNB\s*(?:Scroll|SCROLL)[\s\S]*?<\/script>/g, exactGaugeJs.trim() + '\n  </script>');
  fs.writeFileSync(genScriptPath, content, 'utf8');
  console.log('Updated generate_standalone_post_pages.js generator script root cause fix');
}

console.log('ROOT CAUSE FIX COMPLETED ON ALL UX BLOG DETAIL PAGES & SCRIPTS!');
