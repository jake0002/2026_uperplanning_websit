const fs = require('fs');
const content = fs.readFileSync('implementation/ux_design_cleanroom/index.html', 'utf8');
let idx = content.indexOf('이전 단계');
if (idx !== -1) {
    console.log(content.substring(idx - 50, idx + 150));
} else {
    console.log('No 이전 단계 in cleanroom');
}
