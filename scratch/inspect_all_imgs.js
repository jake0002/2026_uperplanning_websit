const fs = require('fs');

const html = fs.readFileSync('implementation/ux-academy/index.html', 'utf8');

const figRegex = /<figure[^>]*>[\s\S]*?<\/figure>/gi;
let figMatch;
let figCount = 0;
while ((figMatch = figRegex.exec(html)) !== null) {
  figCount++;
  console.log(`=== Figure ${figCount} ===`);
  const openTag = figMatch[0].match(/<figure[^>]*>/)[0];
  console.log(`  open tag: ${openTag}`);
  const imgCount = (figMatch[0].match(/<img/g) || []).length;
  console.log(`  img count: ${imgCount}`);
}
