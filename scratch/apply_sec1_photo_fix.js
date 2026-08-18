const fs = require('fs');

const targetPath = 'implementation/ux-academy/index.html';
let html = fs.readFileSync(targetPath, 'utf8');

const photoFixCSS = `
    /* Reduced size for Section 1 2nd Image (.top-hero-photo) & Exact Caption Typography */
    .top-hero-photo {
      width: 100%;
      max-width: 480px;
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
    }
`;

const anchor = '/* Figure & Responsive Image Sizing to Prevent Horizontal Scroll */';

// Remove previous fix block if exists
if (html.includes('/* Reduced size for Section 1 2nd Image')) {
  const startIdx = html.indexOf('/* Reduced size for Section 1 2nd Image');
  const endIdx = html.indexOf(anchor);
  if (startIdx !== -1 && endIdx !== -1) {
    html = html.substring(0, startIdx) + html.substring(endIdx);
  }
}

if (html.includes(anchor)) {
  html = html.replace(anchor, photoFixCSS + '\n    ' + anchor);
  fs.writeFileSync(targetPath, html, 'utf8');
  console.log(`Successfully updated ${targetPath}`);
} else {
  console.log(`Anchor not found in ${targetPath}`);
}

// Sync files
fs.copyFileSync(targetPath, 'implementation/ux-academy.html');
console.log('Copied to implementation/ux-academy.html');

fs.mkdirSync('implementation/ux_academy', { recursive: true });
fs.copyFileSync(targetPath, 'implementation/ux_academy/index.html');
fs.copyFileSync(targetPath, 'implementation/ux_academy.html');
console.log('Copied to implementation/ux_academy/index.html and ux_academy.html');
