const fs = require('fs');

const content = fs.readFileSync('implementation/web-app-development/index.html', 'utf8');

console.log('=== SIDEBAR ITEM 4 ===');
let s = content.indexOf('id="process"');
if (s !== -1) {
    console.log(content.substring(s - 100, s + 100));
}

console.log('\n=== MAIN H2 ITEM 4 ===');
let s2 = content.indexOf('<h2 id="process">');
if (s2 !== -1) {
    console.log(content.substring(s2, s2 + 60));
}
