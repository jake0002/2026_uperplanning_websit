const fs = require('fs');

const files = [
  'implementation/ux-writing/index.html',
  'implementation/ux-design/index.html',
  'implementation/web-app-development/index.html',
  'implementation/ux-academy/index.html',
  'implementation/ux-company/index.html',
  'implementation/contact/index.html'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    const text = fs.readFileSync(f, 'utf8');
    const titleMatch = text.match(/<div class=["']titlebar-text["']>([\s\S]*?)<\/div>/);
    console.log('=== ' + f + ' ===');
    if (titleMatch) console.log('titlebar-text:', titleMatch[1].replace(/\s+/g, ' ').trim());
    console.log('has #000080:', text.includes('#000080'));
    console.log('has toc:', text.includes('toc'));
  } else {
    console.log('NOT FOUND:', f);
  }
});
