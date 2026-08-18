const fs = require('fs');

const content = fs.readFileSync('implementation/ux-company/index.html', 'utf8');
const matches = content.match(/[^{}\n]*progress[^{}]*\{[^}]*\}/gi);

console.log('=== ALL PROGRESS CSS RULES IN ux-company/index.html ===');
if (matches) {
  matches.forEach((m, idx) => console.log(`${idx + 1}: ${m.replace(/\s+/g, ' ').trim()}`));
} else {
  console.log('No matches');
}
