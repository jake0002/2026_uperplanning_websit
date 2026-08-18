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

  const h2Regex = /<h2([^>]*)>(.*?)<\/h2>/gi;
  let match;
  console.log('All H2 tags in file:');
  while ((match = h2Regex.exec(content)) !== null) {
    const attrs = match[1];
    const text = match[2].replace(/<[^>]+>/g, '').trim();
    const idMatch = attrs.match(/id=["']([^"']+)["']/i);
    const id = idMatch ? idMatch[1] : 'MISSING_ID';
    console.log(`  H2 [id="${id}"]: "${text}"`);
  }

  // Check scroll script selector
  const scriptMatch = content.match(/querySelectorAll\(['"]([^'"]+)['"]\)/g);
  console.log('QuerySelectors in file:', scriptMatch);
});
