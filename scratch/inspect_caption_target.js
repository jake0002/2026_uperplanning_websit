const fs = require('fs');

const aHTML = fs.readFileSync('implementation/ux-academy/index.html', 'utf8');

// Find lead-detail style
const cssMatch = aHTML.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
const aCSS = cssMatch ? cssMatch.join('\n') : '';

console.log('=== CSS rules for lead-detail ===');
aCSS.split('}').forEach(b => {
  if (b.includes('lead-detail') || b.includes('photo-caption') || b.includes('top-hero') || b.includes('figcaption')) {
    console.log(b.trim() + '}');
    console.log('---');
  }
});

// Find the HTML of .top-hero-photo and lead-detail
const startIdx = aHTML.indexOf('<h2 id="intro">');
const endIdx = aHTML.indexOf('<h2 id="reviews">');
const sec1 = aHTML.substring(startIdx, endIdx);

const cleanSec1 = sec1.replace(/data:image\/[a-zA-Z]+;base64,[^"']+/g, '[BASE64]');
console.log('\n=== Section 1 HTML excerpt ===');
console.log(cleanSec1);
