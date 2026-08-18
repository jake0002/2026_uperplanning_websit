const fs = require('fs');
const content = fs.readFileSync('implementation/ux_design/index.html', 'utf8');
const idx = content.indexOf('<h2 id="diff">4. 슈퍼플래닝만의 차별점</h2>');
if (idx !== -1) {
    let nextH2 = content.indexOf('<h2 id="process">5.', idx);
    if (nextH2 === -1) nextH2 = content.indexOf('<!-- 5.', idx);
    let snippet = content.substring(idx, nextH2 !== -1 ? nextH2 : idx + 3000);
    console.log(snippet);
}
