const fs = require('fs');
const content = fs.readFileSync('implementation/ux_design_cleanroom/index.html', 'utf8');
let idx = content.indexOf('id="process"');
if (idx !== -1) {
    let secondIdx = content.indexOf('id="process"', idx + 1);
    if (secondIdx !== -1) {
        console.log(content.substring(secondIdx - 50, secondIdx + 500));
    }
}
