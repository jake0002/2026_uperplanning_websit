const fs = require('fs');
const content = fs.readFileSync('implementation/ux_design/index.html', 'utf8');
const idx = content.indexOf('<h2 id="cases">6. UI/UX 프로젝트 성공사례</h2>');
if (idx !== -1) {
    let nextH2 = content.indexOf('<h2 id="faq">7.', idx);
    let snippet = content.substring(idx, nextH2 !== -1 ? nextH2 : idx + 3000);
    snippet = snippet.replace(/src="data:image\/[^"]+"/g, 'src="BASE64"');
    console.log(snippet);
}
