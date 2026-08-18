const fs = require('fs');

const rText = fs.readFileSync('implementation/ux-research/index.html', 'utf8');
const cText = fs.readFileSync('implementation/ux-company/index.html', 'utf8');

console.log('=== UX-RESEARCH explorer-split / main-content-pane / height rules ===');
const rSplit = rText.match(/\.explorer-split[\s\S]*?\.main-content-pane/);
console.log(rSplit ? rSplit[0] : 'NONE');

console.log('=== UX-COMPANY explorer-split / main-content-pane / height rules ===');
const cSplit = cText.match(/\.explorer-split[\s\S]*?\.main-content-pane/);
console.log(cSplit ? cSplit[0] : 'NONE');

// Check all scroll listeners
console.log('=== UX-RESEARCH scroll listeners ===');
rText.split('\n').forEach((l, i) => { if (l.includes('addEventListener') && l.includes('scroll')) console.log(`${i+1}: ${l.trim()}`); });

console.log('=== UX-COMPANY scroll listeners ===');
cText.split('\n').forEach((l, i) => { if (l.includes('addEventListener') && l.includes('scroll')) console.log(`${i+1}: ${l.trim()}`); });
