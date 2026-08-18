const fs = require('fs');

const masterPath = 'implementation/ux-academy/index.html';
const aliasPath1 = 'implementation/ux-academy.html';
const aliasPath2 = 'implementation/ux_academy.html';

let html = fs.readFileSync(masterPath, 'utf8');

const oldCss = `    /* Section 1 Summary Grid: 1 Full-Width Rectangular Box Per Row */
    .summary-grid {
      display: flex !important;
      flex-direction: column !important;
      gap: 16px !important;
      margin: 24px 0 !important;
      width: 100% !important;
    }
    .summary-card {
      width: 100% !important;
      margin-bottom: 0 !important;
      box-sizing: border-box !important;
    }`;

const newCss = `    /* Section 1 Summary Grid: 2-Column Compact Layout */
    .summary-grid {
      display: grid !important;
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 12px !important;
      margin: 16px 0 !important;
      width: 100% !important;
    }
    @media (max-width: 640px) {
      .summary-grid {
        grid-template-columns: 1fr !important;
      }
    }
    .summary-card {
      width: 100% !important;
      margin-bottom: 0 !important;
      padding: 12px 14px !important;
      box-sizing: border-box !important;
    }
    .summary-card .summary-title {
      font-size: 13.5px !important;
      margin-bottom: 6px !important;
      padding-bottom: 4px !important;
    }
    .summary-card .summary-list li {
      margin-bottom: 4px !important;
      line-height: 1.4 !important;
      font-size: 12.5px !important;
    }
    .summary-card .summary-list li:last-child {
      margin-bottom: 0 !important;
    }`;

const oldItem4 = `<li>메이즈, 피그마, 안티그래비티 회원가입<br/><a href="https://maze.co/" target="_blank" rel="noopener noreferrer">https://maze.co</a><br/><a href="https://www.figma.com/" target="_blank" rel="noopener noreferrer">https://www.figma.com</a><br/><a href="https://antigravity.google/" target="_blank" rel="noopener noreferrer">https://antigravity.google</a></li>`;

const newItem4 = `<li>메이즈, 피그마, 안티그래비티 회원가입 (<a href="https://maze.co/" target="_blank" rel="noopener noreferrer">maze.co</a> · <a href="https://www.figma.com/" target="_blank" rel="noopener noreferrer">figma.com</a> · <a href="https://antigravity.google/" target="_blank" rel="noopener noreferrer">antigravity.google</a>)</li>`;

console.log('CSS match:', html.includes(oldCss));
console.log('Item 4 match:', html.includes(oldItem4));

if (html.includes(oldCss)) {
  html = html.replace(oldCss, newCss);
} else {
  console.log('WARNING: oldCss not matched!');
}

if (html.includes(oldItem4)) {
  html = html.replace(oldItem4, newItem4);
} else {
  console.log('WARNING: oldItem4 not matched!');
}

fs.writeFileSync(masterPath, html, 'utf8');
console.log('Updated:', masterPath);

fs.writeFileSync(aliasPath1, html, 'utf8');
console.log('Updated:', aliasPath1);

fs.writeFileSync(aliasPath2, html, 'utf8');
console.log('Updated:', aliasPath2);
