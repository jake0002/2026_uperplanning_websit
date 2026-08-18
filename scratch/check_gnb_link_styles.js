const fs = require('fs');

const rText = fs.readFileSync('implementation/ux-research/index.html', 'utf8');
const cText = fs.readFileSync('implementation/ux-company/index.html', 'utf8');

const rGnbLink = rText.match(/\.gnb-link[\s\S]*?\.gnb-right/);
const cGnbLink = cText.match(/\.gnb-link[\s\S]*?\.gnb-right/);

console.log('=== UX-RESEARCH .gnb-link CSS ===\n', rGnbLink ? rGnbLink[0] : 'NONE');
console.log('=== UX-COMPANY .gnb-link CSS ===\n', cGnbLink ? cGnbLink[0] : 'NONE');
