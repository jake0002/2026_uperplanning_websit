const fs = require('fs');
const content = fs.readFileSync('implementation/ux_design/index.html', 'utf8');
const idx = content.indexOf('<h2 id="process">5. UX디자인 진행 프로세스</h2>');
if (idx !== -1) {
    let snippet = content.substring(idx, idx + 800);
    console.log(snippet);
}
