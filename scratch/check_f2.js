const fs = require('fs');

const f1 = fs.readFileSync('implementation/ux-academy/index.html', 'utf8');
const f2 = fs.readFileSync('implementation/ux-academy.html', 'utf8');

console.log('f2 intro index:', f2.indexOf('<h2 id="intro">'));
if (f2.indexOf('<h2 id="intro">') !== -1) {
  const introIdx = f2.indexOf('<h2 id="intro">');
  const nextH2Idx = f2.indexOf('<h2 id="reviews">');
  console.log('f2 section 1:');
  const cleanSec = f2.substring(introIdx, nextH2Idx).replace(/data:image\/[a-zA-Z]+;base64,[^"']+/g, '[BASE64]');
  console.log(cleanSec);
}
