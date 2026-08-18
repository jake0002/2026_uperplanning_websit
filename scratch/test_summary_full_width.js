const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const targetPath = 'implementation/ux-academy/index.html';
  let html = fs.readFileSync(targetPath, 'utf8');

  // Specific CSS to change .summary-grid from 2x2 to 1 column full-width rectangular boxes
  const summaryFixCSS = `
    /* Section 1 Summary Grid: Single Full-Width Box Per Row (Rectangular Boxes) */
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

  html = html.replace('</head>', `<style>${summaryFixCSS}</style></head>`);
  fs.writeFileSync('scratch/temp_summary_full.html', html, 'utf8');

  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const filePath = 'file:///' + path.resolve('scratch/temp_summary_full.html').replace(/\\/g, '/');
  
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(filePath, { waitUntil: 'load' });
  
  await page.evaluate(() => {
    const el = document.querySelector('.summary-intro');
    if (el) el.scrollIntoView();
  });
  
  await page.screenshot({ path: 'scratch/shot_summary_full.png' });
  console.log('Saved screenshot to scratch/shot_summary_full.png');

  await browser.close();
})();
