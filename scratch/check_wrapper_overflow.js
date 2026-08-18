const fs = require('fs');

const content = fs.readFileSync('implementation/ux-company/index.html', 'utf8');

console.log('=== page-wrapper CSS ===');
const match = content.match(/\.page-wrapper\s*\{[\s\S]*?\}/);
console.log(match ? match[0] : 'NONE');
