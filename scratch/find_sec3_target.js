const fs = require('fs');
const content = fs.readFileSync('implementation/ux_design/index.html', 'utf8');
let idx = content.indexOf('스타트업 대표님');
if (idx !== -1) {
    console.log(content.substring(idx - 100, idx + 200));
}
