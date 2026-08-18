const fs = require('fs');

const content = fs.readFileSync('implementation/ux-company/index.html', 'utf8');
const lines = content.split('\n');

console.log('=== Checking updateGnbScrollProgress in ux-company/index.html ===');
lines.forEach((l, idx) => {
  if (l.includes('updateGnbScrollProgress') || l.includes('gnbProgressBar')) {
    console.log(`Line ${idx + 1}: ${l.trim()}`);
  }
});
