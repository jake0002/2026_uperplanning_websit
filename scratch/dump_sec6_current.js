const fs = require('fs');
const content = fs.readFileSync('implementation/ux_design/index.html', 'utf8');
let idx = content.indexOf('<h2 id="cases">6. UI/UX 프로젝트 성공사례</h2>');
if (idx !== -1) {
    console.log(content.substring(idx, idx + 3500));
}
