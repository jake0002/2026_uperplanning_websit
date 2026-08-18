const fs = require('fs');
const content = fs.readFileSync('implementation/ux_design/index.html', 'utf8');
let idx = content.indexOf('3. UX컨설팅');
if (idx !== -1) {
    console.log(content.substring(idx, idx + 1000));
}
