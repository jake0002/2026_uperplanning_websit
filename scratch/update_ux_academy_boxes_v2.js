const fs = require('fs');

const masterPath = 'implementation/ux-academy/index.html';
const aliasPath1 = 'implementation/ux-academy.html';
const aliasPath2 = 'implementation/ux_academy.html';

let html = fs.readFileSync(masterPath, 'utf8');

const oldCssBlock = `    /* Section 1 Summary Grid: 2-Column Compact Layout */
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

const newCssBlock = `    /* Section 1 Summary Grid: 1 Box Per Row Compact Layout */
    .summary-grid {
      display: flex !important;
      flex-direction: column !important;
      gap: 8px !important;
      margin: 10px 0 !important;
      width: 100% !important;
    }
    .summary-card {
      width: 100% !important;
      margin-bottom: 0 !important;
      padding: 8px 12px !important;
      box-sizing: border-box !important;
    }
    .summary-card .summary-title {
      font-size: 13.5px !important;
      margin-top: 0 !important;
      margin-bottom: 4px !important;
      padding-bottom: 3px !important;
    }
    .summary-card .summary-list li {
      margin-bottom: 2px !important;
      line-height: 1.35 !important;
      font-size: 12.5px !important;
    }
    .summary-card .summary-list li:last-child {
      margin-bottom: 0 !important;
    }`;

console.log('CSS match:', html.includes(oldCssBlock));

if (html.includes(oldCssBlock)) {
  html = html.replace(oldCssBlock, newCssBlock);
} else {
  console.log('WARNING: oldCssBlock not matched!');
}

fs.writeFileSync(masterPath, html, 'utf8');
console.log('Updated:', masterPath);

fs.writeFileSync(aliasPath1, html, 'utf8');
console.log('Updated:', aliasPath1);

fs.writeFileSync(aliasPath2, html, 'utf8');
console.log('Updated:', aliasPath2);
