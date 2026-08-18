const fs = require('fs');

const files = [
  'implementation/ux-writing/index.html',
  'implementation/web-app-development/index.html',
  'implementation/ux-academy/index.html',
  'implementation/contact/index.html'
];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  console.log('=== ' + f + ' ===');
  lines.forEach((l, idx) => {
    if (l.includes('openWindow') || l.includes('subpageModalOverlay') || l.includes('WINDOW_DEFS')) {
      if (idx > 1200) {
        console.log(`Line ${idx + 1}: ${l.trim().substring(0, 150)}`);
      }
    }
  });
});
