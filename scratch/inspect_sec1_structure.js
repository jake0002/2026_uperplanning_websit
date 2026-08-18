const fs = require('fs');
const html = fs.readFileSync('implementation/ux-academy/index.html', 'utf8');

const introIdx = html.indexOf('<h2 id="intro">');
const nextH2Idx = html.indexOf('<h2 id="reviews">');
const section1 = html.substring(introIdx, nextH2Idx);

const figRegex = /<figure[^>]*>[\s\S]*?<\/figure>/gi;
let figMatch;
let figCount = 0;
while ((figMatch = figRegex.exec(section1)) !== null) {
  figCount++;
  console.log(`=== Figure ${figCount} ===`);
  const content = figMatch[0];
  // print non-base64 parts
  const cleanContent = content.replace(/data:image\/[a-zA-Z]+;base64,[^"']+/g, '[BASE64_DATA]');
  console.log(cleanContent);
}
