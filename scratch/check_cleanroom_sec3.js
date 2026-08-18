const fs = require('fs');
const content = fs.readFileSync('implementation/ux_design_cleanroom/index.html', 'utf8');
let idx = content.indexOf('기대에 미치지');
if (idx !== -1) {
    console.log(content.substring(idx - 50, idx + 150));
} else {
    console.log('Not found in cleanroom');
}
