const fs = require('fs');

const rHTML = fs.readFileSync('implementation/ux-research/index.html', 'utf8');
const aHTML = fs.readFileSync('implementation/ux-academy/index.html', 'utf8');

function getH2s(html) {
  const matches = html.match(/<h2[^>]*>[\s\S]*?<\/h2>/gi) || [];
  return matches.map(m => m.replace(/<[^>]+>/g, '').trim());
}

console.log('=== UX-RESEARCH H2s ===');
console.log(getH2s(rHTML));

console.log('\n=== UX-ACADEMY H2s ===');
console.log(getH2s(aHTML));
