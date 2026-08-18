const fs = require('fs');
const path = require('path');

const files = [
  'implementation/ux-research/index.html',
  'implementation/ux-writing/index.html',
  'implementation/ux-design/index.html',
  'implementation/web-app-development/index.html',
  'implementation/ux-academy/index.html',
  'implementation/ux-company/index.html',
  'implementation/contact/index.html'
];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const titleMatch = content.match(/<div class=["']titlebar-text["']>([\s\S]*?)<\/div>/);
  const titleText = titleMatch ? titleMatch[1].replace(/\s+/g, ' ').trim() : 'NO MATCH';

  const hasNavyTitlebar = content.includes('.titlebar {\n background: #000080') || content.includes('.titlebar {\n      background: #000080');
  const hasNavyPopupHeader = content.includes('background:#000080;');
  
  const tocUlRegex = /<ul class="tree-list toc">([\s\S]*?)<\/ul>/;
  const tocMatch = content.match(tocUlRegex);
  const firstItemActive = tocMatch ? tocMatch[1].includes('tree-link active') : false;

  console.log(`[${path.basename(path.dirname(f))}]`);
  console.log('  Title:', titleText);
  console.log('  Navy titlebar CSS:', hasNavyTitlebar);
  console.log('  Navy popup header:', hasNavyPopupHeader);
  console.log('  First TOC item active:', firstItemActive);
});
