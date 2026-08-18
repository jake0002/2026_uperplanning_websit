const fs = require('fs');

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
  console.log('====================================');
  console.log('FILE:', f);

  const brandLogoBgMatch = content.match(/#brandLogo[\s\S]*?background:([^;]+);/);
  console.log('  #brandLogo bg:', brandLogoBgMatch ? brandLogoBgMatch[1].trim() : 'NONE');

  const gnbHoverMatch = content.match(/\.gnb-link:hover[\s\S]*?\}/);
  console.log('  .gnb-link:hover CSS:\n   ', gnbHoverMatch ? gnbHoverMatch[0].replace(/\s+/g, ' ').trim() : 'NONE');

  const progressBarMatch = content.match(/\.gnb-progress-bar\s*\{[\s\S]*?background:([^;]+);/);
  console.log('  .gnb-progress-bar bg:', progressBarMatch ? progressBarMatch[1].trim() : 'NONE');
});
