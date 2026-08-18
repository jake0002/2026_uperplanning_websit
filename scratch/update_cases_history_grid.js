const fs = require('fs');

const masterPath = 'implementation/ux-academy/index.html';
const aliasPath1 = 'implementation/ux-academy.html';
const aliasPath2 = 'implementation/ux_academy.html';

let html = fs.readFileSync(masterPath, 'utf8');

// 1. Add CSS rule for .cases-history-grid (1 box per row layout)
const cssAddition = `
    /* Section 3 Cases History Grid: 1 Box Per Row Layout */
    .cases-history-grid {
      display: flex !important;
      flex-direction: column !important;
      gap: 16px !important;
      width: 100% !important;
    }
    .cases-history-box {
      width: 100% !important;
      margin-bottom: 0 !important;
    }
`;

if (!html.includes('/* Section 3 Cases History Grid: 1 Box Per Row Layout */')) {
  const cssAnchor = `</style>`;
  html = html.replace(cssAnchor, cssAddition + '\n' + cssAnchor);
}

// 2. Remove duplicate <h2> tag in Section 3 HTML
const duplicateH2 = `<h2 id="history">3. 기업 출강 및 강의 이력</h2>\n<h2>3. 기업 출강 및 강의 이력</h2>`;
const cleanH2 = `<h2 id="history">3. 기업 출강 및 강의 이력</h2>`;

if (html.includes(duplicateH2)) {
  html = html.replace(duplicateH2, cleanH2);
} else {
  // Try CRLF version if present
  const duplicateH2Crlf = `<h2 id="history">3. 기업 출강 및 강의 이력</h2>\r\n<h2>3. 기업 출강 및 강의 이력</h2>`;
  if (html.includes(duplicateH2Crlf)) {
    html = html.replace(duplicateH2Crlf, cleanH2);
  }
}

fs.writeFileSync(masterPath, html, 'utf8');
console.log('Updated:', masterPath);

fs.writeFileSync(aliasPath1, html, 'utf8');
console.log('Updated:', aliasPath1);

fs.writeFileSync(aliasPath2, html, 'utf8');
console.log('Updated:', aliasPath2);
