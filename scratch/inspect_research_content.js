const fs = require('fs');

const rHTML = fs.readFileSync('implementation/ux-research/index.html', 'utf8');

const start = rHTML.indexOf('<main class="main-content-pane">');
const end = rHTML.indexOf('</main>');
const mainHTML = rHTML.substring(start, end + 7);

// Strip out base64 image data
const cleanHTML = mainHTML.replace(/data:image\/[a-zA-Z]+;base64,[^"']+/g, '[IMAGE_BASE64]');

console.log(cleanHTML.substring(0, 4000));
console.log('\n--- PART 2 ---\n');
console.log(cleanHTML.substring(4000, 8000));
console.log('\n--- PART 3 ---\n');
console.log(cleanHTML.substring(8000));
