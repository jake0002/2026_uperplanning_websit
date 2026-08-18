const fs = require('fs');

const files = [
  'implementation/ux-research/index.html',
  'implementation/ux-company/index.html',
  'implementation/ux-writing/index.html',
  'implementation/web-app-development/index.html'
];

files.forEach(f => {
  const text = fs.readFileSync(f, 'utf8');
  console.log('====================================');
  console.log('FILE:', f);

  // Check all matches for #gnb
  const gnbMatches = text.match(/#gnb[^{]*\{[^}]*\}/g);
  if (gnbMatches) {
    gnbMatches.forEach(m => console.log('  #gnb rule:', m.replace(/\s+/g, ' ')));
  }

  // Check all matches for progress
  const progressMatches = text.match(/[\.#]gnb-progress[^{]*\{[^}]*\}/g);
  if (progressMatches) {
    progressMatches.forEach(m => console.log('  progress rule:', m.replace(/\s+/g, ' ')));
  }
});
