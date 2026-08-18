const fs = require('fs');
const content = fs.readFileSync('implementation/ux_design/index.html', 'utf8');
const idx = content.indexOf('class="bottom-nav"');
if (idx !== -1) {
    console.log(content.substring(idx - 20, idx + 300));
}
