const fs = require('fs');

const files = [
  'implementation/ux-research/index.html',
  'implementation/ux-writing/index.html',
  'implementation/web-app-development/index.html',
  'implementation/ux-academy/index.html',
  'implementation/contact/index.html'
];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  console.log('====================================');
  console.log('FILE:', f);

  // Extract all h2 with id
  const h2Matches = [...content.matchAll(/<h2[^>]*id=["']([^"']+)["'][^>]*>(.*?)<\/h2>/g)];
  console.log('H2 sections:', h2Matches.map(m => `id="${m[1]}" -> ${m[2].replace(/<[^>]+>/g, '').trim()}`));

  // Extract all tree-link hrefs
  const linkMatches = [...content.matchAll(/<a[^>]*href=["']([^"']+)["'][^>]*class=["']([^"']*tree-link[^"']*)["'][^>]*>(.*?)<\/a>/g)];
  const linkMatches2 = [...content.matchAll(/<a[^>]*class=["']([^"']*tree-link[^"']*)["'][^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/g)];

  console.log('Tree links (href, class):');
  linkMatches.forEach(m => console.log(`  href="${m[1]}", class="${m[2]}" -> ${m[3].replace(/<[^>]+>/g, '').trim()}`));
  linkMatches2.forEach(m => console.log(`  href="${m[2]}", class="${m[1]}" -> ${m[3].replace(/<[^>]+>/g, '').trim()}`));
});
