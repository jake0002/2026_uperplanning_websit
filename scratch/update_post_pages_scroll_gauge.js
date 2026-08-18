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

const postDetailFiles = getFiles(path.join(baseDir, 'ux-blog')).filter(f => f.includes('post-'));

const gnbProgressCss = `
    .gnb-progress-track {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3.5px;
      background: rgba(255, 255, 255, 0.15);
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
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
    }
`;

const gnbProgressHtml = `<div id="gnbProgressBarTrack" class="gnb-progress-track" title="페이지 스크롤 진행률">
      <div id="gnbProgressBar" class="gnb-progress-bar">
        <span id="gnbProgressBadge" class="gnb-progress-badge">0%</span>
      </div>
    </div>`;

const gnbProgressJs = `    // GNB SCROLL PROGRESS GAUGE BAR
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      const bar = document.getElementById('gnbProgressBar');
      const badge = document.getElementById('gnbProgressBadge');
      if (bar) bar.style.width = scrolled + '%';
      if (badge) badge.textContent = Math.round(scrolled) + '%';

      document.body.classList.add('is-scrolling');
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        document.body.classList.remove('is-scrolling');
      }, 1000);
    });`;

postDetailFiles.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Replace CSS
  if (content.includes('.gnb-progress-track {')) {
    content = content.replace(/\.gnb-progress-track\s*\{[\s\S]*?body\.is-scrolling \.gnb-progress-badge,\s*\.gnb-progress-track:hover \.gnb-progress-badge\s*\{[^}]*\}/g, gnbProgressCss.trim());
  }

  // Replace HTML
  content = content.replace(/<div id="gnbProgressBarTrack" class="gnb-progress-track">[\s\S]*?<\/div>\s*<\/div>/g, gnbProgressHtml + '\n  </div>');

  // Replace JS
  content = content.replace(/window\.addEventListener\('scroll', \(\) => \{[\s\S]*?\}\);/g, gnbProgressJs.trim());

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated scroll progress gauge bar for:', path.relative(baseDir, filePath));
});

// Update generator script as well
const genScriptPath = path.join(__dirname, 'generate_standalone_post_pages.js');
if (fs.existsSync(genScriptPath)) {
  let content = fs.readFileSync(genScriptPath, 'utf8');
  content = content.replace(/window\.addEventListener\('scroll', \(\) => \{[\s\S]*?\}\);/g, gnbProgressJs.trim());
  fs.writeFileSync(genScriptPath, content, 'utf8');
  console.log('Updated generate_standalone_post_pages.js scroll gauge template');
}

console.log('ALL POST DETAIL PAGES UPDATED WITH GNB SCROLL PROGRESS GAUGE BAR & BADGE!');
