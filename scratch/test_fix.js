const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  let html = fs.readFileSync('implementation/ux-academy/index.html', 'utf8');
  
  // Inject fix CSS into <head> or end of <style>
  const fixCSS = `
    /* Fix responsive figure and image sizes to prevent horizontal scrolling */
    figure {
      margin: 20px 0;
      max-width: 100%;
      box-sizing: border-box;
    }
    .cases-logo-figure,
    .top-hero-photo,
    .cases-photo-figure {
      width: 100%;
      max-width: 100%;
      margin: 20px 0;
      box-sizing: border-box;
    }
    .cases-logo-stack {
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
    }
    .cases-logo-figure img,
    .cases-logo-stack img,
    .top-hero-photo img,
    .cases-photo-figure img,
    main.main-content-pane img {
      width: 100%;
      max-width: 100%;
      height: auto;
      object-fit: contain;
      display: block;
      box-sizing: border-box;
    }
  `;

  const updatedHtml = html.replace('</head>', `<style>${fixCSS}</style></head>`);
  fs.writeFileSync('scratch/temp_fixed_ux_academy.html', updatedHtml, 'utf8');

  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const filePath = 'file:///' + path.resolve('scratch/temp_fixed_ux_academy.html').replace(/\\/g, '/');
  
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
      const imgs = figure1 ? Array.from(figure1.querySelectorAll('img')).map(img => ({
        getBoundingWidth: img.getBoundingClientRect().width,
        getBoundingHeight: img.getBoundingClientRect().height
      })) : [];

      return {
        docScrollWidth: doc.scrollWidth,
        docClientWidth: doc.clientWidth,
        mainPaneScrollWidth: mainPane ? mainPane.scrollWidth : null,
        mainPaneClientWidth: mainPane ? mainPane.clientWidth : null,
        fig1Width: figure1 ? figure1.getBoundingClientRect().width : null,
        imgs,
        hasHorizontalScroll: doc.scrollWidth > doc.clientWidth || (mainPane && mainPane.scrollWidth > mainPane.clientWidth)
      };
    });

    console.log(`=== Viewport ${vp.width}x${vp.height} ===`);
    console.log(JSON.stringify(scrollInfo, null, 2));
  }

  await browser.close();
})();
