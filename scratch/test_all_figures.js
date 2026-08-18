const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const filePath = 'file:///' + path.resolve('implementation/ux-academy/index.html').replace(/\\/g, '/');
  
  const viewports = [
    { width: 1440, height: 900 },
    { width: 375, height: 812 }
  ];

  for (const vp of viewports) {
    await page.setViewportSize(vp);
    await page.goto(filePath, { waitUntil: 'load' });
    
    const figures = await page.evaluate(() => {
      const figs = Array.from(document.querySelectorAll('figure'));
      return figs.map((fig, i) => {
        const imgs = Array.from(fig.querySelectorAll('img')).map(img => ({
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          clientWidth: img.clientWidth,
          getBoundingWidth: img.getBoundingClientRect().width,
          getBoundingHeight: img.getBoundingClientRect().height
        }));
        return {
          index: i + 1,
          className: fig.className,
          figWidth: fig.getBoundingClientRect().width,
          imgs
        };
      });
    });

    console.log(`=== Viewport ${vp.width}x${vp.height} ===`);
    console.log(JSON.stringify(figures, null, 2));
  }

  await browser.close();
})();
