const fs = require('fs');

const text = fs.readFileSync('implementation/ux-company/index.html', 'utf8');

// Search for all CSS for gnbProgressBar
const cssMatches = text.match(/[\.\#]gnb[a-zA-Z0-9_-]*\s*\{[\s\S]*?\}/g);
console.log('=== CSS MATCHES FOR GNB ===');
cssMatches.forEach(c => {
  if (c.includes('progress') || c.includes('gnb')) {
    console.log(c.replace(/\s+/g, ' '));
  }
});

// Search for progress script in JS
const scriptMatch = text.match(/\/\/ GNB Scroll Progress Gauge Handler[\s\S]*?updateGnbScrollProgress\(\);/);
console.log('\n=== JS SCRIPT ===\n', scriptMatch ? scriptMatch[0] : 'NONE');
