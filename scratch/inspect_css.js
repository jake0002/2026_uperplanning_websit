const fs = require('fs');

const html = fs.readFileSync('implementation/ux-academy/index.html', 'utf8');

// Find style tags
const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
let match;
let count = 0;
while ((match = styleRegex.exec(html)) !== null) {
  count++;
  console.log(`=== Style tag ${count} ===`);
  const css = match[1];
  const relevantLines = css.split('\n').filter(line => 
    line.includes('cases-logo') || 
    line.includes('top-hero') || 
    line.includes('main-content') ||
    line.includes('figure') ||
    line.includes('img') ||
    line.includes('overflow')
  );
  console.log(relevantLines.join('\n'));
}

// Find linked css files
const linkRegex = /<link[^>]*rel="stylesheet"[^>]*>/gi;
while ((match = linkRegex.exec(html)) !== null) {
  console.log('Linked stylesheet:', match[0]);
}
