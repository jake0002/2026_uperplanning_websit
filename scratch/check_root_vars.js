const fs = require('fs');

const rText = fs.readFileSync('implementation/ux-research/index.html', 'utf8');
const cText = fs.readFileSync('implementation/ux-company/index.html', 'utf8');

const rRoot = rText.match(/:root\s*\{[\s\S]*?\}/);
const cRoot = cText.match(/:root\s*\{[\s\S]*?\}/);

console.log('=== UX-RESEARCH :root ===\n', rRoot ? rRoot[0] : 'NONE');
console.log('=== UX-COMPANY :root ===\n', cRoot ? cRoot[0] : 'NONE');
