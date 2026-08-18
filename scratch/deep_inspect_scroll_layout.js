const fs = require('fs');

const content = fs.readFileSync('implementation/ux-research/index.html', 'utf8');

console.log('=== CSS RULES FOR OVERFLOW / HEIGHT / POSITION ===');
const lines = content.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('overflow') || l.includes('height') && (l.includes('window') || l.includes('pane') || l.includes('split') || l.includes('body') || l.includes('html'))) {
    if (idx < 800) {
      console.log(`Line ${idx + 1}: ${l.trim()}`);
    }
  }
});
