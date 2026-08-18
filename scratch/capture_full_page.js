const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const filePath = 'file:///' + path.resolve('scratch/temp_unified_ux_academy.html').replace(/\\/g, '/');
  
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(filePath, { waitUntil: 'load' });
  
  // Section 1 screenshot
  await page.screenshot({ path: 'scratch/shot_sec1.png' });
  
  // Scroll to curriculum
  await page.evaluate(() => {
    const el = document.querySelector('#curriculum');
    if (el) el.scrollIntoView();
  });
  await page.screenshot({ path: 'scratch/shot_curriculum.png' });

  // Scroll to pricing
  await page.evaluate(() => {
    const el = document.querySelector('#pricing');
    if (el) el.scrollIntoView();
  });
  await page.screenshot({ path: 'scratch/shot_pricing.png' });

  // Scroll to faq
  await page.evaluate(() => {
    const el = document.querySelector('#faq');
    if (el) el.scrollIntoView();
  });
  await page.screenshot({ path: 'scratch/shot_faq.png' });

  console.log('Saved screenshots for sec1, curriculum, pricing, faq');

  await browser.close();
})();
