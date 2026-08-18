const fs = require('fs');
const content = fs.readFileSync('implementation/ux_design_cleanroom/index.html', 'utf8');
const idx = content.indexOf('<h2 id="process">5.');
if (idx !== -1) {
    let snippet = content.substring(idx, idx + 800);
    console.log(snippet);
}
