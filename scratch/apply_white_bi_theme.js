const fs = require('fs');
const path = require('path');

const files = [
  'index.html',
  'ux-research/index.html', 'ux-research.html', 'ux_research.html',
  'ux-writing/index.html', 'ux-writing.html', 'ux_writing.html',
  'ux-design/index.html', 'ux-design.html', 'ux_design.html',
  'web-app-development/index.html', 'web-app-development.html', 'app_dev/index.html', 'app_dev.html',
  'ux-academy/index.html', 'ux-academy.html', 'ux_academy.html',
  'ux-company/index.html', 'ux-company.html', 'ux_company.html', 'company/index.html', 'company.html',
  'contact/index.html', 'contact.html'
];

files.forEach(f => {
  const fullPath = path.join(__dirname, '..', 'implementation', f);
  if (!fs.existsSync(fullPath)) return;

  let content = fs.readFileSync(fullPath, 'utf8');

  // Replace --bg: #008080; with --bg: #ffffff;
  content = content.replace(/--bg:\s*#008080;/g, '--bg: #ffffff;');
  content = content.replace(/--bg-light:\s*#008080;/g, '--bg-light: #ffffff;');

  if (f === 'index.html') {
    // Update desktop-icon label color to black and hover/selected states
    const oldIconCss = /\.desktop-icon:hover\s*\{[^}]*\}\s*\.desktop-icon\.selected\s*\{[^}]*\}\s*\.desktop-icon \.icon-svg\s*\{[^}]*\}\s*\.desktop-icon \.icon-label\s*\{[^}]*\}/;
    
    const newIconCss = `.desktop-icon:hover { background: rgba(0, 0, 0, 0.07); border-radius: 4px; }
    .desktop-icon.selected { background: #000000 !important; border: 1px solid #000000; border-radius: 4px; }
    .desktop-icon.selected .icon-label { color: #ffffff !important; text-shadow: none !important; }
    .desktop-icon .icon-svg { width: 36px; height: 36px; margin-bottom: 4px; image-rendering: pixelated; }
    .desktop-icon .icon-label {
      font-size: 11px;
      font-weight: 700;
      color: #000000;
      text-shadow: none;
      word-break: keep-all;
      line-height: 1.2;
      white-space: nowrap;
    }`;

    if (oldIconCss.test(content)) {
      content = content.replace(oldIconCss, newIconCss);
      console.log('Updated desktop-icon CSS in index.html');
    } else {
      console.warn('Could not match desktop-icon CSS in index.html');
    }
  }

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('Updated --bg to white in:', f);
});
