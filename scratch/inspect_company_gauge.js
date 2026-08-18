const fs = require('fs');

const companyContent = fs.readFileSync('implementation/ux-company/index.html', 'utf8');
const researchContent = fs.readFileSync('implementation/ux-research/index.html', 'utf8');

console.log('=== UX-RESEARCH GNB HTML ===');
const rGnbHtml = researchContent.match(/<div id="gnb">[\s\S]*?<\/div>\s*<\/div>/);
console.log(rGnbHtml ? rGnbHtml[0] : 'NONE');

console.log('\n=== UX-COMPANY GNB HTML ===');
const cGnbHtml = companyContent.match(/<div id="gnb">[\s\S]*?<\/div>\s*<\/div>/);
console.log(cGnbHtml ? cGnbHtml[0] : 'NONE');

console.log('\n=== UX-RESEARCH Progress JS ===');
const rJs = researchContent.match(/\/\/ GNB Scroll Progress Gauge Handler[\s\S]*?updateGnbScrollProgress\(\);/);
console.log(rJs ? rJs[0] : 'NONE');

console.log('\n=== UX-COMPANY Progress JS ===');
const cJs = companyContent.match(/\/\/ GNB Scroll Progress Gauge Handler[\s\S]*?updateGnbScrollProgress\(\);/);
console.log(cJs ? cJs[0] : 'NONE');
