const fs = require('fs');

const masterPath = 'implementation/ux-academy/index.html';
const aliasPath1 = 'implementation/ux-academy.html';
const aliasPath2 = 'implementation/ux_academy.html';

let html = fs.readFileSync(masterPath, 'utf8');

// 1. Remove .cases-history-grid from 2-column grid selectors
html = html.replace('    .cases-history-grid,\n', '');
html = html.replace('      .cases-history-grid,\n', '');
html = html.replace('    .cases-history-grid,\r\n', '');
html = html.replace('      .cases-history-grid,\r\n', '');

// 2. Define explicit 1-box-per-row CSS rule for .cases-history-grid
const oldCasesCss = `    /* Section 3 Cases History Grid: 1 Box Per Row Layout */
    .cases-history-grid {
      display: flex !important;
      flex-direction: column !important;
      gap: 16px !important;
      width: 100% !important;
    }
    .cases-history-box {
      width: 100% !important;
      margin-bottom: 0 !important;
    }`;

const newCasesCss = `    /* Section 3 Cases History Grid: 1 Box Per Row Layout */
    .cases-history-grid {
      display: flex !important;
      flex-direction: column !important;
      gap: 16px !important;
      margin: 16px 0 !important;
      width: 100% !important;
    }
    .cases-history-box {
      width: 100% !important;
      margin-bottom: 0 !important;
      box-sizing: border-box !important;
    }`;

if (html.includes(oldCasesCss)) {
  html = html.replace(oldCasesCss, newCasesCss);
} else if (!html.includes('/* Section 3 Cases History Grid: 1 Box Per Row Layout */')) {
  const cssAnchor = `</style>`;
  html = html.replace(cssAnchor, newCasesCss + '\n' + cssAnchor);
}

fs.writeFileSync(masterPath, html, 'utf8');
console.log('Updated:', masterPath);

fs.writeFileSync(aliasPath1, html, 'utf8');
console.log('Updated:', aliasPath1);

fs.writeFileSync(aliasPath2, html, 'utf8');
console.log('Updated:', aliasPath2);
