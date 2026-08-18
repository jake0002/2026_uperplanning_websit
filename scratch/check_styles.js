const fs = require('fs');
const html = fs.readFileSync('implementation/ux-academy/index.html', 'utf8');

const linkRegex = /<link[^>]*>/gi;
let match;
while ((match = linkRegex.exec(html)) !== null) {
  console.log(match[0]);
}

const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
let styleMatch;
let count = 0;
while ((styleMatch = styleRegex.exec(html)) !== null) {
  count++;
  console.log(`Style tag ${count} length: ${styleMatch[1].length}`);
}
