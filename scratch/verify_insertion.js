const fs = require('fs');
const content = fs.readFileSync('implementation/ux_design/index.html', 'utf8');
const idx = content.indexOf('<h2 id="consulting">3. UX컨설팅</h2>');
if (idx !== -1) {
    let nextH2 = content.indexOf('<h2 id="diff">', idx);
    let snippet = content.substring(idx, nextH2 + 50);
    snippet = snippet.replace(/src="data:image\/[^"]+"/g, 'src="BASE64"');
    console.log(snippet);
}
