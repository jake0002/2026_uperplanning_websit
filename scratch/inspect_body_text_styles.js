const fs = require('fs');

const rHTML = fs.readFileSync('implementation/ux-research/index.html', 'utf8');
const aHTML = fs.readFileSync('implementation/ux-academy/index.html', 'utf8');

function extractMainSection(html, id) {
  const start = html.indexOf(`id="${id}"`);
  if (start === -1) return '';
  const nextSec = html.indexOf('<h2 id=', start + 10);
  const end = nextSec !== -1 ? nextSec : html.indexOf('</main>', start);
  return html.substring(start, end);
}

console.log('=== UX-RESEARCH Section 1 (intro) ===');
console.log(extractMainSection(rHTML, 'intro').substring(0, 1500));

console.log('\n=== UX-ACADEMY Section 1 (intro) ===');
console.log(extractMainSection(aHTML, 'intro').substring(0, 1500).replace(/data:image\/[a-zA-Z]+;base64,[^"']+/g, '[BASE64]'));
