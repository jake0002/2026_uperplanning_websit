const fs = require('fs');

const rHTML = fs.readFileSync('implementation/ux-research/index.html', 'utf8');
const aHTML = fs.readFileSync('implementation/ux-academy/index.html', 'utf8');

function extractStyleSection(html) {
  const m = html.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
  return m ? m[1] : '';
}

const rCSS = extractStyleSection(rHTML);
const aCSS = extractStyleSection(aHTML);

// Find font-family declarations
console.log('=== Font Family in Research ===');
(rCSS.match(/font-family:[^;]+;/gi) || []).forEach(f => console.log('  ', f));

console.log('=== Font Family in Academy ===');
(aCSS.match(/font-family:[^;]+;/gi) || []).forEach(f => console.log('  ', f));

// Find headings, p, li, box definitions
const relevantPatterns = [
  /font-family:[^;]+/gi,
  /font-size:[^;]+/gi,
  /line-height:[^;]+/gi,
  /letter-spacing:[^;]+/gi,
  /background:[^;]+/gi,
  /border:[^;]+/gi,
  /border-radius:[^;]+/gi,
  /box-shadow:[^;]+/gi,
  /list-style:[^;]+/gi
];

// Compare body font-family in both
console.log('\n=== Body tag in Research ===');
const rBody = rCSS.match(/body\s*\{[^}]+\}/i);
console.log(rBody ? rBody[0] : 'Not found');

console.log('\n=== Body tag in Academy ===');
const aBody = aCSS.match(/body\s*\{[^}]+\}/i);
console.log(aBody ? aBody[0] : 'Not found');

// Compare all CSS blocks in Research and Academy
console.log('\n=== Comparing all CSS rules in Research vs Academy ===');
const rBlocks = rCSS.split('}').map(b => b.trim()).filter(Boolean);
const aBlocks = aCSS.split('}').map(b => b.trim()).filter(Boolean);

console.log('rBlocks count:', rBlocks.length);
console.log('aBlocks count:', aBlocks.length);
