const fs = require('fs');

const index = fs.readFileSync('implementation/ux_design_cleanroom/index.html', 'utf-8');
const alias = fs.readFileSync('implementation/ux_design_cleanroom.html', 'utf-8');

console.log('index.html length:', index.length);
console.log('ux_design_cleanroom.html length:', alias.length);

const sections = ['meaning', 'deliverables', 'consulting', 'diff', 'process', 'cases', 'faq'];
sections.forEach(sec => {
  const hasSec = index.includes(`id="${sec}"`);
  console.log(`Section #${sec}:`, hasSec ? 'PRESENT' : 'MISSING');
});

const tocMatches = index.match(/href="#(meaning|deliverables|consulting|diff|process|cases|faq)"/g) || [];
console.log('TOC items:', tocMatches.length);

const imgMatches = index.match(/<img/g) || [];
console.log('Image count:', imgMatches.length);

const figureMatches = index.match(/<figure/g) || [];
console.log('Figure count:', figureMatches.length);

const tableMatches = index.match(/<table/g) || [];
console.log('Table count:', tableMatches.length);
