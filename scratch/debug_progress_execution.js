const fs = require('fs');

const text = fs.readFileSync('implementation/ux-company/index.html', 'utf8');

// Extract the JS code for updateGnbScrollProgress
const jsMatch = text.match(/\/\/ GNB Scroll Progress Gauge Handler[\s\S]*?updateGnbScrollProgress\(\);/);
console.log('=== JS CODE IN PAGE ===');
console.log(jsMatch ? jsMatch[0] : 'NOT FOUND');

// Check if DOMContentLoaded wraps this code
const dclMatch = text.match(/document\.addEventListener\('DOMContentLoaded'[\s\S]*?updateGnbScrollProgress\(\);[\s\S]*?\}\);/);
console.log('\n=== DOMContentLoaded WRAPPER ===');
console.log(dclMatch ? 'Inside DOMContentLoaded' : 'NOT inside DOMContentLoaded or separate');
