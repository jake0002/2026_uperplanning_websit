const fs = require('fs');
const content = fs.readFileSync('implementation/ux_design/index.html', 'utf8');
const idx = content.indexOf('<h2 id="cases">6.');
if (idx !== -1) {
    let nextH2 = content.indexOf('<h2 id="faq">7.', idx);
    let snippet = content.substring(idx, nextH2 !== -1 ? nextH2 : idx + 3000);
    console.log(snippet);
}
