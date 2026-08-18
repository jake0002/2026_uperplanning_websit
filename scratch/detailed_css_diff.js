const fs = require('fs');

const rHTML = fs.readFileSync('implementation/ux-research/index.html', 'utf8');
const aHTML = fs.readFileSync('implementation/ux-academy/index.html', 'utf8');

function extractStyles(html) {
  const styles = [];
  const regex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let m;
  while ((m = regex.exec(html)) !== null) {
    styles.push(m[1]);
  }
  return styles.join('\n');
}

function extractFonts(html) {
  const fonts = [];
  const regex = /<link[^>]*font[^>]*>/gi;
  let m;
  while ((m = regex.exec(html)) !== null) {
    fonts.push(m[0]);
  }
  return fonts;
}

console.log('=== Fonts in ux-research ===');
console.log(extractFonts(rHTML));

console.log('=== Fonts in ux-academy ===');
console.log(extractFonts(aHTML));

const rCSS = extractStyles(rHTML);
const aCSS = extractStyles(aHTML);

// Let's list all selectors in rCSS and see which ones differ in aCSS
function getSelectorMap(css) {
  const map = {};
  // remove comments
  const clean = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const blocks = clean.split('}');
  blocks.forEach(block => {
    const idx = block.indexOf('{');
    if (idx !== -1) {
      const selGroup = block.substring(0, idx).trim();
      const body = block.substring(idx + 1).trim();
      selGroup.split(',').forEach(sel => {
        const s = sel.trim().replace(/\s+/g, ' ');
        if (s) {
          map[s] = body.replace(/\s+/g, ' ');
        }
      });
    }
  });
  return map;
}

const rMap = getSelectorMap(rCSS);
const aMap = getSelectorMap(aCSS);

console.log(`ux-research total selectors: ${Object.keys(rMap).length}`);
console.log(`ux-academy total selectors: ${Object.keys(aMap).length}`);

console.log('\n=== Selectors in ux-research but NOT in ux-academy or DIFFERENT ===');
Object.keys(rMap).forEach(sel => {
  if (!aMap[sel]) {
    console.log(`[ONLY IN RESEARCH] ${sel} => ${rMap[sel].substring(0, 100)}`);
  } else if (rMap[sel] !== aMap[sel]) {
    console.log(`[DIFFERENT] ${sel}`);
    console.log(`   Target (Research): ${rMap[sel]}`);
    console.log(`   Current (Academy): ${aMap[sel]}`);
  }
});
