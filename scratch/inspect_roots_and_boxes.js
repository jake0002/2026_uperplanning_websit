const fs = require('fs');

const rHTML = fs.readFileSync('implementation/ux-research/index.html', 'utf8');
const aHTML = fs.readFileSync('implementation/ux-academy/index.html', 'utf8');

function getCSS(html) {
  const m = html.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
  return m ? m.join('\n') : '';
}

const rCSS = getCSS(rHTML);
const aCSS = getCSS(aHTML);

// Search for :root
console.log('=== UX-RESEARCH :root ===');
const rRoot = rCSS.match(/:root\s*\{[^}]+\}/i);
console.log(rRoot ? rRoot[0] : 'None');

console.log('\n=== UX-ACADEMY :root ===');
const aRoot = aCSS.match(/:root\s*\{[^}]+\}/i);
console.log(aRoot ? aRoot[0] : 'None');

// Check box styles in rCSS
console.log('\n=== Box styles in UX-RESEARCH ===');
rCSS.split('}').forEach(block => {
  if (block.includes('.box') || block.includes('.hero-intro') || block.includes('.grid-boxes') || block.includes('h1') || block.includes('h2') || block.includes('h3') || block.includes('p') || block.includes('ul') || block.includes('li')) {
    console.log(block.trim() + '}');
  }
});
