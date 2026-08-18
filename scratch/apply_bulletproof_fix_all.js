const fs = require('fs');
const path = require('path');

const pageConfig = [
  { path: 'implementation/ux-research/index.html', aliases: ['implementation/ux-research.html', 'implementation/ux_research.html'] },
  { path: 'implementation/ux-writing/index.html', aliases: ['implementation/ux-writing.html', 'implementation/ux_writing.html', 'implementation/ux-writing/Superplanning-UX-Writing-Explorer-v14-patent-caption-edited-v3.html'] },
  { path: 'implementation/ux-design/index.html', aliases: ['implementation/ux-design.html', 'implementation/ux_design.html'] },
  { path: 'implementation/web-app-development/index.html', aliases: ['implementation/web-app-development.html', 'implementation/app_dev.html', 'implementation/app_dev/index.html'] },
  { path: 'implementation/ux-academy/index.html', aliases: ['implementation/ux-academy.html', 'implementation/ux_academy.html'] },
  { path: 'implementation/ux-company/index.html', aliases: ['implementation/ux-company.html', 'implementation/ux_company.html', 'implementation/company.html', 'implementation/company/index.html'] },
  { path: 'implementation/contact/index.html', aliases: ['implementation/contact.html'] }
];

const newProgressCss = `/* GNB SCROLL PROGRESS GAUGE BAR (HIGH-CONTRAST ACCENT LINE) */
    .gnb-progress-track {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: rgba(255, 255, 255, 0.25);
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      overflow: visible;
      pointer-events: none;
      z-index: 1000;
    }
    .gnb-progress-bar {
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, #ffffff 0%, #ffd43b 100%);
      box-shadow: 0 0 8px rgba(255, 212, 59, 0.9), 0 0 4px rgba(255, 255, 255, 0.9);
      border-radius: 0 2px 2px 0;
      position: relative;
      transition: width 0.05s ease-out;
    }
    .gnb-progress-bar::after {
      content: '';
      position: absolute;
      right: -3px;
      top: -2px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #ffffff;
      border: 1.5px solid #000000;
      box-shadow: 0 0 8px #ffd43b, 0 0 4px #ffffff;
      opacity: 1;
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
      transition: opacity 0.2s ease;
      pointer-events: none;
    }
    body.is-scrolling .gnb-progress-badge,
    .gnb-progress-track:hover .gnb-progress-badge {
      opacity: 1 !important;
    }`;

const oldCssRegex = /\/\* GNB SCROLL PROGRESS GAUGE BAR[\s\S]*?\.gnb-progress-track:hover \.gnb-progress-badge\s*\{[\s\S]*?\}/;

const bulletproofJs = `// GNB Scroll Progress Gauge Handler (100% Robust Universal Math)
    function updateGnbScrollProgress() {
      const progressBar = document.getElementById('gnbProgressBar');
      const progressBadge = document.getElementById('gnbProgressBadge');
      if (!progressBar) return;

      const currentScroll = Math.max(
        0,
        window.pageYOffset || window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0
      );

      const docHeight = Math.max(
        document.body.scrollHeight || 0,
        document.documentElement.scrollHeight || 0,
        document.body.offsetHeight || 0,
        document.documentElement.offsetHeight || 0
      );
      const winHeight = window.innerHeight || document.documentElement.clientHeight || 0;
      const maxScroll = Math.max(1, docHeight - winHeight);

      const scrolled = Math.min(100, Math.max(0, (currentScroll / maxScroll) * 100));

      progressBar.style.width = scrolled + '%';
      if (progressBadge) {
        progressBadge.textContent = Math.round(scrolled) + '%';
      }

      if (currentScroll > 10) {
        document.body.classList.add('is-scrolling');
      } else {
        document.body.classList.remove('is-scrolling');
      }
    }

    window.addEventListener('scroll', updateGnbScrollProgress, { passive: true });
    window.addEventListener('resize', updateGnbScrollProgress, { passive: true });
    document.addEventListener('scroll', updateGnbScrollProgress, { passive: true });

    updateGnbScrollProgress();
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', updateGnbScrollProgress);
    }
    window.addEventListener('load', updateGnbScrollProgress);
    setTimeout(updateGnbScrollProgress, 200);
    setTimeout(updateGnbScrollProgress, 800);`;

const oldJsRegex = /\/\/ GNB Scroll Progress Gauge Handler[\s\S]*?setTimeout\(updateGnbScrollProgress, 1000\);/;
const oldJsRegex2 = /\/\/ GNB Scroll Progress Gauge Handler[\s\S]*?updateGnbScrollProgress\(\);/;

pageConfig.forEach(item => {
  const filePath = path.resolve(item.path);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  if (oldCssRegex.test(content)) {
    content = content.replace(oldCssRegex, newProgressCss);
  }
  if (oldJsRegex.test(content)) {
    content = content.replace(oldJsRegex, bulletproofJs);
  } else if (oldJsRegex2.test(content)) {
    content = content.replace(oldJsRegex2, bulletproofJs);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated bulletproof progress fix in main file:', item.path);

  if (item.aliases && item.aliases.length > 0) {
    item.aliases.forEach(alias => {
      const aliasPath = path.resolve(alias);
      const dir = path.dirname(aliasPath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(aliasPath, content, 'utf8');
      console.log('  Synced bulletproof progress fix in alias file:', alias);
    });
  }
});
