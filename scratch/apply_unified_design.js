const fs = require('fs');

const targetPath = 'implementation/ux-academy/index.html';
let html = fs.readFileSync(targetPath, 'utf8');

const unifiedCSS = `
    /* ==========================================================================
       UX-RESEARCH UNIFIED DESIGN SYSTEM (Typography, Bullets, Boxes, & Cards)
       ========================================================================== */

    /* Global Typography & Font Setup */
    * {
      letter-spacing: -0.01em;
    }
    main.main-content-pane {
      font-family: var(--font, sans-serif);
      color: #222222;
      line-height: 1.6;
    }

    /* Headings (H1, H2, H3, H4) */
    .main-content-pane h1 {
      font-size: 22px;
      font-weight: 700;
      color: #000000;
      margin-bottom: 14px;
      line-height: 1.3;
      letter-spacing: -0.01em;
    }
    .main-content-pane h2 {
      font-size: 16px;
      font-weight: 700;
      color: #000000;
      margin-top: 32px;
      margin-bottom: 12px;
      padding: 0;
      background: transparent;
      border: none;
      scroll-margin-top: 70px;
      letter-spacing: -0.01em;
    }
    .main-content-pane h3 {
      font-size: 14.5px;
      font-weight: 700;
      color: #111111;
      margin-top: 16px;
      margin-bottom: 8px;
      letter-spacing: -0.01em;
    }

    /* Lead Paragraph & Hero Subtitle */
    .lead, .hero-intro {
      font-size: 14px;
      line-height: 1.65;
      color: #333333;
      margin-bottom: 20px;
      padding-bottom: 16px;
      border-bottom: 1px solid #e0e0e0;
    }

    /* Paragraphs & Text */
    .main-content-pane p {
      font-size: 13.5px;
      line-height: 1.6;
      color: #222222;
      margin-bottom: 14px;
    }

    /* Bullet Lists & List Items */
    .main-content-pane ul,
    .main-content-pane ol {
      margin-bottom: 16px;
      padding-left: 20px;
    }
    .main-content-pane li {
      font-size: 13.5px;
      line-height: 1.6;
      color: #222222;
      margin-bottom: 7px;
    }
    .main-content-pane li strong {
      color: #111111;
      font-weight: 700;
    }

    /* Custom Lead Points & Detailed Lists */
    ul.lead-points {
      list-style-type: none;
      padding-left: 0;
      margin: 16px 0 24px 0;
    }
    ul.lead-points li {
      position: relative;
      padding-left: 18px;
      margin-bottom: 10px;
      font-size: 13.5px;
      line-height: 1.6;
      color: #222222;
    }
    ul.lead-points li::before {
      content: "•";
      position: absolute;
      left: 0;
      top: 0;
      color: #000000;
      font-weight: bold;
      font-size: 14px;
    }
    .lead-detail {
      display: block;
      color: #555555;
      font-size: 13px;
      margin-top: 2px;
    }

    /* Unified Box & Card Container Styling (Matching UX-Research) */
    .box,
    .summary-card,
    .curriculum-item,
    .course-card,
    .course-feature-box,
    .cases-history-box,
    .review-copy-block,
    .review-ai-summary {
      background: #f9f9f9;
      border: 1px solid #dcdcdc;
      border-radius: 4px;
      padding: 18px 20px;
      margin-bottom: 16px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.03);
      box-sizing: border-box;
    }

    /* Box Titles & Inner List Styles */
    .box h3,
    .summary-title,
    .curriculum-step,
    .cases-history-box h3,
    .course-card h3,
    .course-feature-box h3 {
      font-size: 14.5px;
      font-weight: 700;
      color: #111111;
      margin-top: 0;
      margin-bottom: 10px;
      padding-bottom: 6px;
      border-bottom: 1px solid #ebebeb;
    }
    .summary-list,
    .curriculum-list,
    .cases-history-box ul,
    .course-card ul {
      list-style-type: none;
      padding-left: 0;
      margin: 0;
    }
    .summary-list li,
    .curriculum-list li,
    .cases-history-box li,
    .course-card li {
      position: relative;
      padding-left: 16px;
      margin-bottom: 6px;
      font-size: 13px;
      line-height: 1.55;
      color: #333333;
    }
    .summary-list li::before,
    .curriculum-list li::before,
    .cases-history-box li::before,
    .course-card li::before {
      content: "•";
      position: absolute;
      left: 0;
      top: 0;
      color: #333333;
      font-size: 13px;
    }

    /* Summary & Curriculum Grid Layouts */
    .summary-grid,
    .grid-boxes.two,
    .cases-history-grid,
    .benefit-grid,
    .course-cards {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      margin: 20px 0;
    }
    @media (max-width: 768px) {
      .summary-grid,
      .grid-boxes.two,
      .cases-history-grid,
      .benefit-grid,
      .course-cards {
        grid-template-columns: 1fr;
      }
    }

    /* Curriculum Wrap */
    .curriculum-wrap {
      display: flex;
      flex-direction: column;
      gap: 14px;
      margin: 20px 0;
    }
    .curriculum-intro {
      font-size: 13.5px;
      line-height: 1.6;
      color: #333333;
      margin-bottom: 16px;
    }

    /* Course Sales & Pricing Styling */
    .course-sales-layout {
      margin: 24px 0;
    }
    .course-price {
      font-size: 18px;
      font-weight: 700;
      color: #111111;
      margin: 8px 0;
    }
    .course-origin {
      font-size: 12.5px;
      color: #888888;
      text-decoration: line-through;
      margin-right: 6px;
    }
    .course-badge {
      display: inline-block;
      font-size: 11px;
      font-weight: 700;
      background: #000000;
      color: #ffffff;
      padding: 2px 6px;
      border-radius: 2px;
      margin-bottom: 8px;
    }

    /* FAQ List (Matching UX-Research Monochrome Q&A) */
    .faq {
      margin-top: 20px;
    }
    .faq dt {
      font-weight: 700;
      font-size: 14px;
      margin-top: 18px;
      color: #111111;
    }
    .faq dt::before {
      content: "Q. ";
      color: #111111;
      font-weight: 700;
    }
    .faq dd {
      margin-left: 0;
      margin-top: 4px;
      padding-left: 26px;
      margin-bottom: 16px;
      position: relative;
      font-size: 13.5px;
      line-height: 1.6;
      color: #222222;
    }
    .faq dd::before {
      content: "A. ";
      position: absolute;
      left: 0;
      color: #444444;
      font-weight: 700;
    }
`;

const anchor = '/* Left-Aligned Clean Photo Frame & Captions (No Borders, Left Aligned) */';

// Remove old unified CSS if exists
if (html.includes('UX-RESEARCH UNIFIED DESIGN SYSTEM')) {
  const startIdx = html.indexOf('/* ==========================================================================\n       UX-RESEARCH UNIFIED DESIGN SYSTEM');
  const endIdx = html.indexOf('/* Left-Aligned Clean Photo Frame');
  if (startIdx !== -1 && endIdx !== -1) {
    html = html.substring(0, startIdx) + html.substring(endIdx);
  }
}

if (html.includes(anchor)) {
  html = html.replace(anchor, unifiedCSS + '\n    ' + anchor);
  fs.writeFileSync(targetPath, html, 'utf8');
  console.log(`Successfully updated ${targetPath}`);
} else {
  console.log(`Anchor not found in ${targetPath}`);
}

// Copy updated file to implementation/ux-academy.html and implementation/ux_academy.html for local sync
fs.copyFileSync(targetPath, 'implementation/ux-academy.html');
console.log('Copied to implementation/ux-academy.html');

fs.mkdirSync('implementation/ux_academy', { recursive: true });
fs.copyFileSync(targetPath, 'implementation/ux_academy/index.html');
fs.copyFileSync(targetPath, 'implementation/ux_academy.html');
console.log('Copied to implementation/ux_academy/index.html and ux_academy.html');
