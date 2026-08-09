const fs = require('fs');

const pt = fs.readFileSync('d:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\extracted_prompt_2.txt', 'utf-8');
const startStr = '[SECTION deliverables - BLOCK 1/3';
let block = pt.substring(pt.indexOf(startStr) + startStr.length);
block = block.replace(/^[\s\S]*?```html\n?/, '');
block = block.replace(/```[\s\S]*$/, '');
block = block.trim();

const targetPath = 'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design_cleanroom_v2\\index.html';
let targetHtml = fs.readFileSync(targetPath, 'utf-8');

// Check if <section id="deliverables"> exists
if (!targetHtml.includes('<section id="deliverables">')) {
    // Append it after </section> of meaning
    targetHtml = targetHtml.replace('</section>', '</section>\n<section id="deliverables">\n</section>');
}

// Insert the block inside <section id="deliverables">
targetHtml = targetHtml.replace('<section id="deliverables">', '<section id="deliverables">\n' + block);

fs.writeFileSync(targetPath, targetHtml, 'utf-8');
console.log('Inserted block successfully.');
