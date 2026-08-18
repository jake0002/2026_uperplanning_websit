const fs = require('fs');

const targetPath = 'implementation/ux-academy/index.html';
let html = fs.readFileSync(targetPath, 'utf8');

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

const anchor = '/* Figure & Responsive Image Sizing to Prevent Horizontal Scroll */';

// Remove previous block if exists
if (html.includes('/* Section 1 2nd Image') || html.includes('/* Reduced size for Section 1 2nd Image')) {
  const startIdx = html.indexOf('/* ') > -1 ? Math.min(
    html.indexOf('/* Section 1 2nd Image') !== -1 ? html.indexOf('/* Section 1 2nd Image') : Infinity,
    html.indexOf('/* Reduced size for Section 1 2nd Image') !== -1 ? html.indexOf('/* Reduced size for Section 1 2nd Image') : Infinity
  ) : -1;
  const endIdx = html.indexOf(anchor);
  if (startIdx !== -1 && startIdx !== Infinity && endIdx !== -1) {
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
