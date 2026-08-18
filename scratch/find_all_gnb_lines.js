const fs = require('fs');

const content = fs.readFileSync('implementation/ux-company/index.html', 'utf8');
const lines = content.split('\n');

console.log('=== ALL #gnb LINES IN ux-company/index.html ===');
lines.forEach((l, idx) => {
  if (l.includes('#gnb')) {
    console.log(`Line ${idx + 1}: ${l.trim().substring(0, 140)}`);
  }
});
