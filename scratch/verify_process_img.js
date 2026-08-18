const fs = require('fs');
const content = fs.readFileSync('implementation/ux_design/index.html', 'utf8');
const idx = content.indexOf('<h2 id="process">5. UX디자인 진행 프로세스</h2>');
if (idx !== -1) {
    let nextH2 = content.indexOf('<h2 id="cases">6.', idx);
    let snippet = content.substring(idx, nextH2 !== -1 ? nextH2 : idx + 2000);
    snippet = snippet.replace(/src="data:image\/[^"]+"/g, 'src="BASE64"');
    console.log(snippet);
}
