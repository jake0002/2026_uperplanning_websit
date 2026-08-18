const fs = require('fs');

const aHTML = fs.readFileSync('implementation/ux-academy/index.html', 'utf8');

const m = aHTML.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
const aCSS = m ? m.join('\n') : '';

console.log('Searching all style blocks in ux-academy/index.html...');

const selectorsToFind = [
  'lead', 'summary', 'curriculum', 'course', 'box', 'card', 'benefit', 'review', 'point', 'bullet'
];

selectorsToFind.forEach(term => {
  console.log(`\n=== Term: [${term}] ===`);
  const regex = new RegExp(`[^{}]*${term}[^{}]*\\{[^}]+\\}`, 'gi');
  const matches = aCSS.match(regex) || [];
  console.log(`Found ${matches.length} rules.`);
  matches.slice(0, 10).forEach(m => console.log('  ', m.replace(/\s+/g, ' ')));
});
