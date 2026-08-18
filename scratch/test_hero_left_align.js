const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const targetPath = 'implementation/ux-academy/index.html';
  let html = fs.readFileSync(targetPath, 'utf8');

  // Replace top-hero-photo styling with max-width: 640px, max-height: 380px and explicit left alignment
  const photoFixCSS = `
    /* Section 1 2nd Image (.top-hero-photo) Left Aligned & Comfortably Sized (Matching UX-Research max-width: 640px) */
    .top-hero-photo {
      width: 100%;
      max-width: 640px;
      margin: 20px auto 20px 0 !important;
      text-align: left !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: flex-start !important;
      box-sizing: border-box;
    }
    .top-hero-photo img {
      width: 100%;
      max-width: 100%;
      max-height: 380px;
      height: auto;
      object-fit: contain;
      object-position: left center !important;
      display: block;
      margin: 0 !important;
      border: none;
      box-sizing: border-box;
    }
    .top-hero-photo figcaption,
    .photo-caption,
    figcaption {
      font-family: var(--font, sans-serif) !important;
      font-size: 13px !important;
      color: #555555 !important;
      font-weight: 400 !important;
      line-height: 1.6 !important;
      margin-top: 8px !important;
      text-align: left !important;
      background: transparent !important;
      padding: 0 !important;
      border: none !important;
      width: 100% !important;
    }
`;

  const anchor = '/* Reduced size for Section 1 2nd Image';
  if (html.includes(anchor)) {
    const endAnchor = '/* Figure & Responsive Image Sizing to Prevent Horizontal Scroll */';
    const startIdx = html.indexOf(anchor);
    const endIdx = html.indexOf(endAnchor);
    if (startIdx !== -1 && endIdx !== -1) {
      html = html.substring(0, startIdx) + photoFixCSS + '\n    ' + html.substring(endIdx);
    }
  } else {
    html = html.replace('</head>', `<style>${photoFixCSS}</style></head>`);
  }

  fs.writeFileSync('scratch/temp_sec1_photo_left.html', html, 'utf8');

  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const filePath = 'file:///' + path.resolve('scratch/temp_sec1_photo_left.html').replace(/\\/g, '/');
  
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(filePath, { waitUntil: 'load' });
  
  await page.screenshot({ path: 'scratch/shot_sec1_photo_left.png' });
  console.log('Saved screenshot to scratch/shot_sec1_photo_left.png');

  await browser.close();
})();
