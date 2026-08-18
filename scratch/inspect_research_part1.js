const fs = require('fs');

const rHTML = fs.readFileSync('implementation/ux-research/index.html', 'utf8');

const start = rHTML.indexOf('<main class="main-content-pane">');
const mainHTML = rHTML.substring(start, start + 4000);

const cleanHTML = mainHTML.replace(/data:image\/[a-zA-Z]+;base64,[^"']+/g, '[IMAGE_BASE64]');
console.log(cleanHTML);
