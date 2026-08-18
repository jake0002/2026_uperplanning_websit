const fs = require('fs');

const content = fs.readFileSync('implementation/ux-company/index.html', 'utf8');
const lines = content.split('\n');

console.log('=== Lines 1175 to 1235 of ux-company/index.html ===');
lines.slice(1174, 1235).forEach((l, idx) => console.log(`${1175 + idx}: ${l}`));
