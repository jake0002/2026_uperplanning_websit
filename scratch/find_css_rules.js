const fs = require('fs');
const html = fs.readFileSync('implementation/ux-academy/index.html', 'utf8');

const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
let match;
while ((match = styleRegex.exec(html)) !== null) {
  const css = match[1];
  const rules = css.split('}');
  rules.forEach(rule => {
    if (rule.includes('cases-logo') || rule.includes('top-hero') || rule.includes('main-content') || rule.includes('figure') || rule.includes('img')) {
      console.log(rule.trim() + '}');
      console.log('-------------------');
    }
  });
}
