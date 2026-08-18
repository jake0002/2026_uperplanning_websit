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

  // Extract all H2 tags in main
  const mainMatch = content.match(/<main[\s\S]*?<\/main>/);
  if (!mainMatch) {
    console.log('NO MAIN TAG FOUND');
    return;
  }
  const mainContent = mainMatch[0];
  const h2Regex = /<h2([^>]*)>(.*?)<\/h2>/g;
  let match;
  console.log('All H2 tags in main:');
  while ((match = h2Regex.exec(mainContent)) !== null) {
    const attrs = match[1];
    const text = match[2].replace(/<[^>]+>/g, '').trim();
    const idMatch = attrs.match(/id=["']([^"']+)["']/);
    const id = idMatch ? idMatch[1] : 'MISSING_ID';
    console.log(`  H2 [id="${id}"]: "${text}"`);
  }

  // Extract all TOC links
  const tocMatch = content.match(/<ul class="tree-list toc">([\s\S]*?)<\/ul>/);
  if (tocMatch) {
    console.log('TOC tree links:');
    const aRegex = /<a[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/g;
    let aMatch;
    while ((aMatch = aRegex.exec(tocMatch[1])) !== null) {
      console.log(`  Link [href="${aMatch[1]}"]: "${aMatch[2].replace(/<[^>]+>/g, '').trim()}"`);
    }
  }
});
