const fs = require('fs');
const path = require('path');

const mainFile = 'implementation/ux-company/index.html';
let content = fs.readFileSync(mainFile, 'utf8');

// 1. Update #brandLogo CSS to black background with white text
content = content.replace(
  /#brandLogo\s*\{[\s\S]*?\}/,
  `#brandLogo {
      position: fixed !important;
      top: var(--logo-top);
      left: var(--logo-left);
      height: var(--gnb-h);
      padding: 4px 18px;
      min-width: 68px;
      justify-content: center;
      z-index: 999999 !important;
      cursor: pointer;
      background: #000000 !important;
      color: #ffffff !important;
      border: 2px solid #000;
      box-shadow: inset 1px 1px 0 #333, inset -1px -1px 0 #111, 2px 2px 0 rgba(0,0,0,.35);
      font-weight: 900;
      font-size: 13px;
      display: flex;
      align-items: center;
      gap: 5px;
      user-select: none !important;
      transition: transform 0.1s ease;
    }`
);

// 2. Update .gnb-link hover & active CSS
content = content.replace(
  /\.gnb-link:hover,\s*\.gnb-link:active,\s*\.gnb-link\.active\s*\{[\s\S]*?\}\s*\.gnb-link:hover span,\s*\.gnb-link:active span,\s*\.gnb-link\.active span\s*\{[\s\S]*?\}/,
  `.gnb-link:hover,
    .gnb-link:active,
    .gnb-link.active {
      background: #000000 !important;
      color: #ffffff !important;
    }
    .gnb-link:hover span,
    .gnb-link:active span,
    .gnb-link.active span {
      color: #ffffff !important;
    }`
);

// 3. Add / Update progress track, bar, badge CSS
const progressCssBlock = `/* GNB SCROLL PROGRESS GAUGE BAR */
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
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
      opacity: 0;
      transition: opacity 0.25s ease;
      pointer-events: none;
    }
    body.is-scrolling .gnb-progress-badge,
    .gnb-progress-track:hover .gnb-progress-badge {
      opacity: 1;
    }`;

const oldProgressRegex = /\/\* GNB SCROLL PROGRESS GAUGE BAR[\s\S]*?\.gnb-progress-track:hover \.gnb-progress-badge\s*\{[\s\S]*?\}/;
if (oldProgressRegex.test(content)) {
  content = content.replace(oldProgressRegex, progressCssBlock);
}

// 4. Update GNB active link in HTML to '회사소개'
content = content.replace(/class="gnb-link active"/g, 'class="gnb-link"');
content = content.replace(
  '<a class="gnb-link" href="/ux-company/"><span>회사소개</span></a>',
  '<a class="gnb-link active" href="/ux-company/"><span>회사소개</span></a>'
);
content = content.replace(
  '<a class="gnb-link" href="/company/"><span>회사소개</span></a>',
  '<a class="gnb-link active" href="/ux-company/"><span>회사소개</span></a>'
);

fs.writeFileSync(mainFile, content, 'utf8');
console.log('Updated ux-company main file:', mainFile);

const aliases = [
  'implementation/ux-company.html',
  'implementation/ux_company.html',
  'implementation/company.html',
  'implementation/company/index.html'
];

aliases.forEach(alias => {
  const dir = path.dirname(alias);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(alias, content, 'utf8');
  console.log('Synced company alias:', alias);
});
