const fs = require('fs');

const targetPath = 'implementation/ux-academy/index.html';
let html = fs.readFileSync(targetPath, 'utf8');

const summaryCSS = `
    /* Section 1 Summary Grid: 1 Full-Width Rectangular Box Per Row */
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
    }
`;

const anchor = '/* Figure & Responsive Image Sizing to Prevent Horizontal Scroll */';

// Remove previous summary block if exists
if (html.includes('/* Section 1 Summary Grid')) {
  const startIdx = html.indexOf('/* Section 1 Summary Grid');
  const endIdx = html.indexOf(anchor);
  if (startIdx !== -1 && endIdx !== -1) {
    html = html.substring(0, startIdx) + html.substring(endIdx);
  }
}

if (html.includes(anchor)) {
  html = html.replace(anchor, summaryCSS + '\n    ' + anchor);
  fs.writeFileSync(targetPath, html, 'utf8');
  console.log(`Successfully updated ${targetPath}`);
} else {
  console.log(`Anchor not found in ${targetPath}`);
}

// Sync files
fs.copyFileSync(targetPath, 'implementation/ux-academy.html');
console.log('Copied to implementation/ux-academy.html');

fs.mkdirSync('implementation/ux_academy', { recursive: true });
fs.copyFileSync(targetPath, 'implementation/ux_academy/index.html');
fs.copyFileSync(targetPath, 'implementation/ux_academy.html');
console.log('Copied to implementation/ux_academy/index.html and ux_academy.html');
