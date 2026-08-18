const fs = require('fs');

const indexHtml = fs.readFileSync('implementation/index.html', 'utf8');
const match = indexHtml.match(/\.gnb-progress-bar[\s\S]*?\}/);
console.log('=== main index.html gnb-progress-bar ===');
console.log(match ? match[0] : 'NONE');

const badgeMatch = indexHtml.match(/\.gnb-progress-badge[\s\S]*?\}/);
console.log('=== main index.html gnb-progress-badge ===');
console.log(badgeMatch ? badgeMatch[0] : 'NONE');
