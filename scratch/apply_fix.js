const fs = require('fs');

const targetPath = 'implementation/ux-academy/index.html';
let html = fs.readFileSync(targetPath, 'utf8');

const anchor = '.photo-frame img {';
const anchorIdx = html.indexOf(anchor);

if (anchorIdx !== -1) {
  // Find closing brace of .photo-frame img
  const closeBraceIdx = html.indexOf('}', anchorIdx);
  if (closeBraceIdx !== -1) {
    const insertPos = closeBraceIdx + 1;
    const newCSS = `\n    /* Figure & Responsive Image Sizing to Prevent Horizontal Scroll */\n    figure {\n      margin: 20px 0;\n      max-width: 100%;\n      box-sizing: border-box;\n    }\n    .cases-logo-figure,\n    .top-hero-photo,\n    .cases-photo-figure {\n      width: 100%;\n      max-width: 100%;\n      margin: 20px 0;\n      box-sizing: border-box;\n    }\n    .cases-logo-stack {\n      display: flex;\n      flex-direction: column;\n      gap: 12px;\n      width: 100%;\n      max-width: 100%;\n      box-sizing: border-box;\n    }\n    .cases-logo-figure img,\n    .cases-logo-stack img,\n    .top-hero-photo img,\n    .cases-photo-figure img,\n    .main-content-pane figure img,\n    .main-content-pane img {\n      width: 100%;\n      max-width: 100%;\n      height: auto;\n      object-fit: contain;\n      display: block;\n      box-sizing: border-box;\n    }`;
    
    html = html.substring(0, insertPos) + newCSS + html.substring(insertPos);
    fs.writeFileSync(targetPath, html, 'utf8');
    console.log(`Successfully updated ${targetPath} at position ${insertPos}`);
  }
} else {
  console.log('Anchor not found');
}

// Copy updated file to implementation/ux-academy.html and implementation/ux_academy.html for local sync
fs.copyFileSync(targetPath, 'implementation/ux-academy.html');
console.log('Copied to implementation/ux-academy.html');

fs.mkdirSync('implementation/ux_academy', { recursive: true });
fs.copyFileSync(targetPath, 'implementation/ux_academy/index.html');
fs.copyFileSync(targetPath, 'implementation/ux_academy.html');
console.log('Copied to implementation/ux_academy/index.html and ux_academy.html');
