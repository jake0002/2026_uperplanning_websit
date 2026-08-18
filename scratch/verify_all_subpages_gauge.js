const fs = require('fs');

const files = [
  'implementation/ux-research/index.html',
  'implementation/ux-writing/index.html',
  'implementation/ux-design/index.html',
  'implementation/web-app-development/index.html',
  'implementation/ux-academy/index.html',
  'implementation/ux-company/index.html',
  'implementation/contact/index.html'
];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  console.log('====================================');
  console.log('FILE:', f);
  console.log('  Has updateGnbScrollProgress:', content.includes('function updateGnbScrollProgress()'));
  console.log('  Has docHeight math:', content.includes('docHeight - winHeight'));
  console.log('  Has gnbProgressBar:', content.includes('id="gnbProgressBar"'));
  console.log('  Has gnbProgressBadge:', content.includes('id="gnbProgressBadge"'));
});
