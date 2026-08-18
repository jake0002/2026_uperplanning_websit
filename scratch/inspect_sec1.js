const fs = require('fs');

const filePaths = [
  'implementation/ux-academy/index.html',
  'implementation/ux-academy.html',
  'implementation/ux_academy.html'
];

filePaths.forEach(fp => {
  if (!fs.existsSync(fp)) return;
  console.log(`=== ${fp} ===`);
  const html = fs.readFileSync(fp, 'utf8');
  const introIdx = html.indexOf('<h2 id="intro">');
  const nextH2Idx = html.indexOf('<h2 id="reviews">');
  if (introIdx === -1 || nextH2Idx === -1) {
    console.log('Could not find section boundaries');
    return;
  }
  const section1 = html.substring(introIdx, nextH2Idx);
  
  // Find img tags or figure tags
  const imgRegex = /<img[^>]*>/gi;
  let match;
  let count = 0;
  while ((match = imgRegex.exec(section1)) !== null) {
    count++;
    const fullTag = match[0];
    const srcPreview = fullTag.substring(0, 150);
    const styleAttr = fullTag.match(/style="([^"]*)"/);
    const classAttr = fullTag.match(/class="([^"]*)"/);
    console.log(`Image ${count}:`);
    console.log(`  class: ${classAttr ? classAttr[1] : 'none'}`);
    console.log(`  style: ${styleAttr ? styleAttr[1] : 'none'}`);
    console.log(`  tag preview: ${srcPreview}...`);
  }

  // Also check parent elements of images
  const figRegex = /<figure[^>]*>[\s\S]*?<\/figure>/gi;
  let figMatch;
  let figCount = 0;
  while ((figMatch = figRegex.exec(section1)) !== null) {
    figCount++;
    console.log(`Figure ${figCount}: length ${figMatch[0].length}`);
    const openTag = figMatch[0].match(/<figure[^>]*>/)[0];
    console.log(`  figure open tag: ${openTag}`);
  }
});
