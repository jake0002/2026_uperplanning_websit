const fs = require('fs');

const content = fs.readFileSync('implementation/ux-company/index.html', 'utf8');
const lines = content.split('\n');

console.log('=== OVERRIDE SEARCH IN ux-company/index.html ===');
lines.forEach((l, idx) => {
  if (l.includes('#gnb') && l.includes('justify-content')) {
    console.log(`Line ${idx + 1}: ${l.trim()}`);
  }
});
