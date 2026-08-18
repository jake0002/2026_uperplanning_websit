const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const targetPath = 'implementation/ux-academy/index.html';
  let html = fs.readFileSync(targetPath, 'utf8');

  // Add specific CSS for .top-hero-photo and its caption
  const customCSS = `
    /* Reduced size for Section 1 2nd Image (.top-hero-photo) & Exact Caption Typography */
    .top-hero-photo {
      width: 100%;
      max-width: 500px;
      margin: 20px 0;
      box-sizing: border-box;
    }
    .top-hero-photo img {
      width: 100%;
      max-width: 100%;
      max-height: 320px;
      height: auto;
      object-fit: contain;
      display: block;
      box-sizing: border-box;
    }
    .top-hero-photo figcaption,
    .photo-caption {
      font-family: var(--font, sans-serif);
      font-size: 13px !important;
      color: #555555 !important;
      font-weight: normal !important;
      line-height: 1.6 !important;
      margin-top: 8px !important;
      text-align: left !important;
      background: transparent !important;
      padding: 0 !important;
      border: none !important;
    }
  `;

  // Inject into html
  html = html.replace('</head>', `<style>${customCSS}</style></head>`);

  fs.writeFileSync('scratch/temp_sec1_photo_fix.html', html, 'utf8');

  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const filePath = 'file:///' + path.resolve('scratch/temp_sec1_photo_fix.html').replace(/\\/g, '/');
  
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(filePath, { waitUntil: 'load' });
  
  await page.screenshot({ path: 'scratch/shot_sec1_photo_fix.png' });
  console.log('Saved screenshot to scratch/shot_sec1_photo_fix.png');

  // Evaluate computed styles
  const styleInfo = await page.evaluate(() => {
    const caption = document.querySelector('.top-hero-photo figcaption');
    const leadDetail = document.querySelector('.lead-detail');
    const img = document.querySelector('.top-hero-photo img');

    const capStyle = window.getComputedStyle(caption);
    const leadStyle = window.getComputedStyle(leadDetail);

    return {
      imgWidth: img.getBoundingClientRect().width,
      imgHeight: img.getBoundingClientRect().height,
      caption: {
        fontSize: capStyle.fontSize,
        color: capStyle.color,
        fontFamily: capStyle.fontFamily,
        fontWeight: capStyle.fontWeight
      },
      leadDetail: {
        fontSize: leadStyle.fontSize,
        color: leadStyle.color,
        fontFamily: leadStyle.fontFamily,
        fontWeight: leadStyle.fontWeight
      }
    };
  });

  console.log('Comparison of styles:');
  console.log(JSON.stringify(styleInfo, null, 2));

  await browser.close();
})();
