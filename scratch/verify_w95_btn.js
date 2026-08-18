const fs = require('fs');
const content = fs.readFileSync('implementation/ux_design/index.html', 'utf8');
const idx = content.indexOf('프로젝트 견적 및 진행 신청은 어떻게 하나요?');
if (idx !== -1) {
    console.log(content.substring(idx - 50, idx + 700));
}
