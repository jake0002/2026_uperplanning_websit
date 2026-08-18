const fs = require('fs');

const files = [
  'implementation/ux-research/index.html',
  'implementation/ux-writing/index.html',
  'implementation/web-app-development/index.html',
  'implementation/ux-academy/index.html',
  'implementation/contact/index.html'
];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  console.log('====================================');
  console.log('FILE:', f);
  lines.forEach((line, idx) => {
    if (line.includes('#000080')) {
      console.log(`Line ${idx + 1}: ${line.trim()}`);
    }
  });
});
