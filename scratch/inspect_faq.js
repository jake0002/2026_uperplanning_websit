const fs = require('fs');
const content = fs.readFileSync('implementation/ux_design/index.html', 'utf8');
let idx = content.indexOf('id="faq"');
if (idx !== -1) {
    console.log('Found id="faq" at index:', idx);
    console.log(content.substring(idx - 100, idx + 1000));
} else {
    console.log('id="faq" not found!');
}
