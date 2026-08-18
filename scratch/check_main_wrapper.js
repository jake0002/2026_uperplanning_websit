const fs = require('fs');

const files = [
  'implementation/ux-academy/index.html',
  'implementation/contact/index.html'
];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  console.log('====================================');
  console.log('FILE:', f);
  console.log('Includes <main>:', content.includes('<main'));
  console.log('Includes </main>:', content.includes('</main>'));

  const h2Regex = /<h2[^>]*id=["']([^"']+)["'][^>]*>/g;
  let m;
  while ((m = h2Regex.exec(content)) !== null) {
    const pos = m.index;
    const mainPos = content.indexOf('<main');
    const mainEndPos = content.indexOf('</main>');
    console.log(`H2 id="${m[1]}" at pos ${pos} (main: ${mainPos} to ${mainEndPos}) -> Inside main: ${pos > mainPos && pos < mainEndPos}`);
  }
});
