const fs = require('fs');
const content = fs.readFileSync('implementation/ux_design/index.html', 'utf8');
const idx = content.indexOf('<h2 id="faq">7. 자주 묻는 질문 (FAQ)</h2>');
if (idx !== -1) {
    console.log(content.substring(idx, idx + 2500));
}
