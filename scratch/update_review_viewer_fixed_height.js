const fs = require('fs');

const masterPath = 'implementation/ux-academy/index.html';
const aliasPath1 = 'implementation/ux-academy.html';
const aliasPath2 = 'implementation/ux_academy.html';

let html = fs.readFileSync(masterPath, 'utf8');

// 1. Replace CSS block for Review Image Viewer to enforce fixed container height and no image clipping
const oldCssBlock = html.substring(
  html.indexOf('/* Review Image Viewer (Matching User Reference Image) */'),
  html.indexOf('/* Figure & Responsive Image Sizing to Prevent Horizontal Scroll */')
);

const newCssBlock = `/* Review Image Viewer (Fixed Container Height, No Image Clipping) */
    .review-inline-viewer {
      background: #ffffff !important;
      border: 1px solid #e2e8f0 !important;
      border-radius: 12px !important;
      padding: 20px 16px 16px 16px !important;
      margin: 24px auto !important;
      max-width: 880px !important;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04) !important;
      box-sizing: border-box !important;
    }
    .review-inline-stage {
      position: relative !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      width: 100% !important;
      height: 480px !important;
    }
    .review-inline-arrow {
      position: absolute !important;
      top: 50% !important;
      transform: translateY(-50%) !important;
      z-index: 10 !important;
      width: 34px !important;
      height: 38px !important;
      background: #ffffff !important;
      border: 1px solid #cbd5e1 !important;
      border-radius: 8px !important;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08) !important;
      color: #334155 !important;
      font-size: 18px !important;
      font-weight: bold !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      transition: all 0.15s ease !important;
      outline: none !important;
    }
    .review-inline-arrow:hover {
      background: #f8fafc !important;
      border-color: #94a3b8 !important;
      color: #0f172a !important;
    }
    .review-inline-arrow.prev {
      left: 6px !important;
    }
    .review-inline-arrow.next {
      right: 6px !important;
    }
    .review-inline-viewport {
      width: 100% !important;
      height: 100% !important;
      padding: 0 46px !important;
      box-sizing: border-box !important;
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      overflow: hidden !important;
    }
    .review-inline-slide {
      display: none;
      width: 100% !important;
      height: 100% !important;
      text-align: center !important;
    }
    .review-inline-slide.is-active {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      width: 100% !important;
      height: 100% !important;
      animation: reviewFadeIn 0.25s ease-in-out !important;
    }
    @keyframes reviewFadeIn {
      from { opacity: 0.4; }
      to { opacity: 1; }
    }
    .review-inline-slide img {
      max-width: 100% !important;
      max-height: 100% !important;
      width: auto !important;
      height: auto !important;
      display: block !important;
      margin: 0 auto !important;
      border-radius: 6px !important;
      object-fit: contain !important;
    }
    @media (max-width: 640px) {
      .review-inline-stage {
        height: 340px !important;
      }
    }
    .review-inline-controls {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 8px !important;
      margin-top: 16px !important;
    }
    .review-inline-pagination {
      display: flex !important;
      align-items: center !important;
      gap: 6px !important;
    }
    .review-inline-page {
      width: 24px !important;
      height: 24px !important;
      border-radius: 3px !important;
      border: none !important;
      background: #94a3b8 !important;
      color: #ffffff !important;
      font-size: 13px !important;
      font-weight: 700 !important;
      line-height: 24px !important;
      padding: 0 !important;
      text-align: center !important;
      cursor: pointer !important;
      transition: background 0.15s ease !important;
      outline: none !important;
    }
    .review-inline-page:hover {
      background: #64748b !important;
    }
    .review-inline-page.is-active {
      background: #334155 !important;
      font-weight: 800 !important;
    }
    .review-inline-toggle {
      width: 26px !important;
      height: 26px !important;
      border-radius: 50% !important;
      border: 1.5px solid #475569 !important;
      background: #ffffff !important;
      color: #334155 !important;
      font-size: 11px !important;
      font-weight: bold !important;
      padding: 0 !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      cursor: pointer !important;
      transition: all 0.15s ease !important;
      outline: none !important;
    }
    .review-inline-toggle:hover {
      background: #f1f5f9 !important;
      border-color: #1e293b !important;
      color: #0f172a !important;
    }

    `;

if (oldCssBlock && html.includes(oldCssBlock)) {
  html = html.replace(oldCssBlock, newCssBlock);
} else {
  console.log('WARNING: oldCssBlock not matched via substring!');
}

// 2. Ensure pagination has exactly 7 buttons (1, 2, 3, 4, 5, 6, 7)
const paginationStart = html.indexOf('<div class="review-inline-pagination" id="review-inline-pagination">');
const paginationEnd = html.indexOf('</div>', paginationStart) + 6;
const currentPaginationHtml = html.substring(paginationStart, paginationEnd);

const exact7PaginationHtml = `<div class="review-inline-pagination" id="review-inline-pagination">
                  <button class="review-inline-page is-active" type="button" data-review-page="0" aria-label="후기 1 보기">1</button>
                  <button class="review-inline-page" type="button" data-review-page="1" aria-label="후기 2 보기">2</button>
                  <button class="review-inline-page" type="button" data-review-page="2" aria-label="후기 3 보기">3</button>
                  <button class="review-inline-page" type="button" data-review-page="3" aria-label="후기 4 보기">4</button>
                  <button class="review-inline-page" type="button" data-review-page="4" aria-label="후기 5 보기">5</button>
                  <button class="review-inline-page" type="button" data-review-page="5" aria-label="후기 6 보기">6</button>
                  <button class="review-inline-page" type="button" data-review-page="6" aria-label="후기 7 보기">7</button>
                </div>`;

if (paginationStart !== -1) {
  html = html.substring(0, paginationStart) + exact7PaginationHtml + html.substring(paginationEnd);
}

fs.writeFileSync(masterPath, html, 'utf8');
console.log('Updated:', masterPath);

fs.writeFileSync(aliasPath1, html, 'utf8');
console.log('Updated:', aliasPath1);

fs.writeFileSync(aliasPath2, html, 'utf8');
console.log('Updated:', aliasPath2);
