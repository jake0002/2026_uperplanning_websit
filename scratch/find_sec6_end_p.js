const fs = require('fs');
const content = fs.readFileSync('implementation/ux_design/index.html', 'utf8');
let idx = content.indexOf('만족도를 높여주었습니다.');
if (idx !== -1) {
    console.log(content.substring(idx - 100, idx + 200));
} else {
    console.log('Text not found!');
}
