const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const filePath = 'file:///' + path.resolve('implementation/ux-academy/index.html').replace(/\\/g, '/');
  
  const viewports = [
    { width: 1440, height: 900 },
    { width: 1024, height: 768 },
    { width: 768, height: 1024 },
    { width: 375, height: 812 }
  ];

  for (const vp of viewports) {
    await page.setViewportSize(vp);
    await page.goto(filePath, { waitUntil: 'load' });
    
    const scrollInfo = await page.evaluate(() => {
      const doc = document.documentElement;
      const body = document.body;
      const mainPane = document.querySelector('.main-content-pane');
      const figure1 = document.querySelector('.cases-logo-figure');
      const img1 = figure1 ? figure1.querySelectorAll('img')[0] : null;
      const img2 = figure1 ? figure1.querySelectorAll('img')[1] : null;

      return {
        docScrollWidth: doc.scrollWidth,
        docClientWidth: doc.clientWidth,
        bodyScrollWidth: body.scrollWidth,
        bodyClientWidth: body.clientWidth,
        mainPaneScrollWidth: mainPane ? mainPane.scrollWidth : null,
        mainPaneClientWidth: mainPane ? mainPane.clientWidth : null,
        fig1Width: figure1 ? figure1.getBoundingClientRect().width : null,
        img1Width: img1 ? img1.getBoundingClientRect().width : null,
        img1NaturalWidth: img1 ? img1.naturalWidth : null,
        img2Width: img2 ? img2.getBoundingClientRect().width : null,
        img2NaturalWidth: img2 ? img2.naturalWidth : null,
        hasHorizontalScroll: doc.scrollWidth > doc.clientWidth || (mainPane && mainPane.scrollWidth > mainPane.clientWidth)
      };
    });

    console.log(`=== Viewport ${vp.width}x${vp.height} ===`);
    console.log(JSON.stringify(scrollInfo, null, 2));
  }

  await browser.close();
})();
