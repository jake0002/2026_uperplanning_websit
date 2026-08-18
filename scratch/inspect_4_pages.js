const fs = require('fs');

const pages = [
  { name: 'ux-writing', files: ['implementation/ux-writing/index.html', 'implementation/ux-writing.html', 'implementation/ux_writing.html'] },
  { name: 'web-app-development', files: ['implementation/web-app-development/index.html', 'implementation/web-app-development.html', 'implementation/app_dev.html'] },
  { name: 'ux-academy', files: ['implementation/ux-academy/index.html', 'implementation/ux-academy.html', 'implementation/ux_academy.html'] },
  { name: 'contact', files: ['implementation/contact/index.html', 'implementation/contact.html'] }
];

pages.forEach(p => {
  console.log('====================================');
  console.log('PAGE:', p.name);
  p.files.forEach(f => {
    if (!fs.existsSync(f)) {
      console.log('  File DOES NOT EXIST:', f);
      return;
    }
    const text = fs.readFileSync(f, 'utf8');

    // 1. Check titlebar text
    const titleMatch = text.match(/<div class=["']titlebar-text["']>([\s\S]*?)<\/div>/);
    const titleText = titleMatch ? titleMatch[1].replace(/\s+/g, ' ').trim() : 'NO MATCH';

    // 2. Check titlebar CSS background
    const titlebarCssMatch = text.match(/\.titlebar\s*\{[\s\S]*?\}/);
    const titlebarCss = titlebarCssMatch ? titlebarCssMatch[0].replace(/\s+/g, ' ').trim() : 'NO MATCH';

    // 3. Check openWindow popup header background
    const openWinHeaderMatch = text.match(/<div style=["']background:[^"']*["']/g);

    // 4. Check TOC first item active
    const tocMatch = text.match(/<ul class="tree-list toc">([\s\S]*?)<\/ul>/);
    const firstTocActive = tocMatch ? tocMatch[1].includes('tree-link active') : false;

    // 5. Check scroll script
    const hasScrollScript = text.includes('Highlight active tree item on scroll & click');

    console.log(`--- ${f} ---`);
    console.log('  Title HTML:', titleText);
    console.log('  Titlebar CSS:', titlebarCss);
    console.log('  OpenWindow headers:', openWinHeaderMatch ? openWinHeaderMatch.slice(0, 3) : 'NONE');
    console.log('  First TOC item active:', firstTocActive);
    console.log('  Has Scroll Script:', hasScrollScript);
  });
});
