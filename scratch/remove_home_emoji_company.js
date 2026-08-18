const fs = require('fs');
const path = require('path');

const files = [
  'ux-company/index.html',
  'ux-company.html',
  'ux_company.html',
  'company/index.html',
  'company.html'
];

files.forEach(f => {
  const fullPath = path.join(__dirname, '..', 'implementation', f);
  if (!fs.existsSync(fullPath)) return;

  let content = fs.readFileSync(fullPath, 'utf8');

  content = content.replace(/<span>🏠<\/span>\s*/g, '');

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('Removed house emoji from:', f);
});
