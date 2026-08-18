const fs = require('fs');

const rHTML = fs.readFileSync('implementation/ux-research/index.html', 'utf8');

// Extract CSS style tag
const m = rHTML.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
const rCSS = m ? m.join('\n') : '';

console.log('=== CSS Root Variables & Typography in UX-Research ===');
const rootMatch = rCSS.match(/:root\s*\{[^}]+\}/i);
console.log('Root vars:\n', rootMatch ? rootMatch[0] : 'None');

// Find all CSS rules relating to text, fonts, headings, lists, bullets, boxes, cards
console.log('\n=== CSS Rules in UX-Research ===');
const lines = rCSS.split('\n');
let currentRule = '';
lines.forEach(line => {
  if (line.includes('{') || currentRule) {
    currentRule += line + '\n';
    if (line.includes('}')) {
      if (
        currentRule.includes('font') ||
        currentRule.includes('line-height') ||
        currentRule.includes('letter-spacing') ||
        currentRule.includes('border') ||
        currentRule.includes('background') ||
        currentRule.includes('box-shadow') ||
        currentRule.includes('padding') ||
        currentRule.includes('margin') ||
        currentRule.includes('list-style') ||
        currentRule.includes('::before') ||
        currentRule.includes('h1') ||
        currentRule.includes('h2') ||
        currentRule.includes('h3') ||
        currentRule.includes('p') ||
        currentRule.includes('ul') ||
        currentRule.includes('li') ||
        currentRule.includes('box') ||
        currentRule.includes('card')
      ) {
        console.log(currentRule.trim());
        console.log('---');
      }
      currentRule = '';
    }
  }
});
