const fs = require('fs');
const content = fs.readFileSync('implementation/ux_design_cleanroom/index.html', 'utf8');
let idx = content.indexOf('성공사례');
if (idx !== -1) {
    console.log(content.substring(idx - 100, idx + 500));
}
