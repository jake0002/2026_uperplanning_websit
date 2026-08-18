const fs = require('fs');

const masterPath = 'implementation/ux-academy/index.html';
const aliasPath1 = 'implementation/ux-academy.html';
const aliasPath2 = 'implementation/ux_academy.html';

let html = fs.readFileSync(masterPath, 'utf8');

// Replace CSS block for sticky banner with comfortable vertical spacing
const oldCssStart = html.indexOf('/* Right Sticky Course Banner (Compact Sleek Sizing) */');
const oldCssEnd = html.indexOf('</style>', oldCssStart);

const newCssBlock = `/* Right Sticky Course Banner (Comfortable Vertical Spacing) */
    .page-wrapper {
      padding: calc(var(--logo-top) + var(--gnb-h) + 20px) 20px 24px 20px;
      display: flex !important;
      justify-content: flex-start !important;
      align-items: flex-start !important;
      gap: 16px !important;
      width: 100% !important;
      max-width: 1420px !important;
      box-sizing: border-box !important;
    }
    .explorer-window {
      flex: 1 1 auto !important;
      max-width: 1080px !important;
      min-width: 0 !important;
    }
    .sticky-course-banner-wrap {
      position: sticky !important;
      top: 80px !important;
      width: 275px !important;
      flex: 0 0 275px !important;
      align-self: flex-start !important;
      z-index: 990 !important;
    }
    @media (max-width: 1100px) {
      .page-wrapper {
        flex-direction: column !important;
      }
      .explorer-window {
        max-width: 100% !important;
        width: 100% !important;
      }
      .sticky-course-banner-wrap {
        position: relative !important;
        top: 0 !important;
        width: 100% !important;
        max-width: 100% !important;
        flex: 1 1 100% !important;
        margin-top: 20px !important;
      }
    }

    .sticky-banner-card {
      background: #ffffff !important;
      border: 1.5px solid #0f172a !important;
      border-radius: 4px !important;
      box-shadow: 0 4px 18px rgba(0, 0, 0, 0.07), 2px 2px 0 rgba(0, 0, 0, 0.12) !important;
      overflow: hidden !important;
      box-sizing: border-box !important;
      font-family: var(--font, sans-serif) !important;
    }
    .sticky-tabs-header {
      display: flex !important;
      background: #f8fafc !important;
      border-bottom: 1.5px solid #0f172a !important;
    }
    .sticky-tab-btn {
      flex: 1 !important;
      padding: 10px 2px !important;
      font-size: 12.5px !important;
      font-weight: 700 !important;
      color: #64748b !important;
      background: #f1f5f9 !important;
      border: none !important;
      border-right: 1px solid #cbd5e1 !important;
      cursor: pointer !important;
      transition: all 0.15s ease !important;
      outline: none !important;
      text-align: center !important;
    }
    .sticky-tab-btn:last-child {
      border-right: none !important;
    }
    .sticky-tab-btn.is-active {
      background: #ffffff !important;
      color: #0f172a !important;
      font-weight: 800 !important;
      border-bottom: 2.5px solid #0f172a !important;
      margin-bottom: -1px !important;
    }
    .sticky-banner-body {
      padding: 18px 16px 16px 16px !important;
    }
    .sticky-timer-header {
      display: flex !important;
      align-items: center !important;
      gap: 8px !important;
      margin-bottom: 12px !important;
    }
    .sticky-badge-sale {
      display: inline-block !important;
      border: 1px solid #f43f5e !important;
      color: #e11d48 !important;
      background: #fff1f2 !important;
      padding: 2px 8px !important;
      border-radius: 12px !important;
      font-size: 11px !important;
      font-weight: 700 !important;
      white-space: nowrap !important;
    }
    .sticky-badge-normal {
      display: inline-block !important;
      border: 1px solid #475569 !important;
      color: #334155 !important;
      background: #f8fafc !important;
      padding: 2px 8px !important;
      border-radius: 12px !important;
      font-size: 11px !important;
      font-weight: 700 !important;
      white-space: nowrap !important;
    }
    .sticky-timer-clock {
      font-size: 14px !important;
      font-weight: 800 !important;
      color: #9f1239 !important;
      letter-spacing: -0.01em !important;
    }
    .sticky-price-row {
      display: flex !important;
      align-items: baseline !important;
      gap: 6px !important;
      margin-top: 4px !important;
    }
    .sticky-price-origin {
      font-size: 13.5px !important;
      color: #94a3b8 !important;
      text-decoration: line-through !important;
      font-weight: 500 !important;
    }
    .sticky-price-sale {
      font-size: 19px !important;
      font-weight: 900 !important;
      color: #0f172a !important;
    }
    .sticky-price-sub {
      font-size: 11.5px !important;
      color: #64748b !important;
      margin-top: 3px !important;
      margin-bottom: 14px !important;
    }
    .sticky-course-title {
      font-size: 14px !important;
      font-weight: 800 !important;
      color: #0f172a !important;
      margin: 0 0 6px 0 !important;
      line-height: 1.35 !important;
      border-bottom: none !important;
      padding-bottom: 0 !important;
    }
    .sticky-course-desc {
      font-size: 12px !important;
      color: #475569 !important;
      line-height: 1.45 !important;
      margin: 0 0 14px 0 !important;
    }
    .sticky-details-list {
      border-top: 1px solid #e2e8f0 !important;
      margin-bottom: 16px !important;
    }
    .sticky-detail-row {
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
      padding: 9px 0 !important;
      border-bottom: 1px solid #e2e8f0 !important;
      font-size: 12.5px !important;
    }
    .sticky-detail-label {
      font-weight: 700 !important;
      color: #0f172a !important;
    }
    .sticky-detail-val {
      color: #1e293b !important;
      font-weight: 500 !important;
    }
    .sticky-btn-kakao {
      width: 100% !important;
      background: #ffffff !important;
      border: 1.5px solid #0f172a !important;
      border-radius: 4px !important;
      padding: 10px 0 !important;
      font-size: 13.5px !important;
      font-weight: 800 !important;
      color: #0f172a !important;
      cursor: pointer !important;
      transition: all 0.15s ease !important;
      outline: none !important;
      margin-bottom: 8px !important;
      display: block !important;
      text-align: center !important;
    }
    .sticky-btn-kakao:hover {
      background: #f8fafc !important;
    }
    .sticky-btn-apply {
      width: 100% !important;
      background: #0f172a !important;
      border: 1.5px solid #0f172a !important;
      border-radius: 4px !important;
      padding: 10px 0 !important;
      font-size: 13.5px !important;
      font-weight: 800 !important;
      color: #ffffff !important;
      cursor: pointer !important;
      transition: all 0.15s ease !important;
      outline: none !important;
      display: block !important;
      text-align: center !important;
    }
    .sticky-btn-apply:hover {
      background: #1e293b !important;
    }

`;

if (oldCssStart !== -1 && oldCssEnd !== -1) {
  html = html.substring(0, oldCssStart) + newCssBlock + html.substring(oldCssEnd);
}

fs.writeFileSync(masterPath, html, 'utf8');
console.log('Updated:', masterPath);

fs.writeFileSync(aliasPath1, html, 'utf8');
console.log('Updated:', aliasPath1);

fs.writeFileSync(aliasPath2, html, 'utf8');
console.log('Updated:', aliasPath2);
