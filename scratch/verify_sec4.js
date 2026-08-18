const fs = require('fs');
const content = fs.readFileSync('implementation/ux_design/index.html', 'utf8');
const idx = content.indexOf('<h2 id="diff">4. 슈퍼플래닝만의 차별점</h2>');
if (idx !== -1) {
    let snippet = content.substring(idx, idx + 1000);
    console.log(snippet);
}
