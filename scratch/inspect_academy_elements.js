const fs = require('fs');

const aHTML = fs.readFileSync('implementation/ux-academy/index.html', 'utf8');

const start = aHTML.indexOf('<main class="main-content-pane">');
const end = aHTML.indexOf('</main>');
const mainHTML = aHTML.substring(start, end + 7);

// Clean base64 image data
const cleanHTML = mainHTML.replace(/data:image\/[a-zA-Z]+;base64,[^"']+/g, '[IMAGE_BASE64]');

console.log('=== ACADEMY PART 1 ===');
console.log(cleanHTML.substring(0, 3000));
console.log('\n=== ACADEMY PART 2 ===');
console.log(cleanHTML.substring(3000, 7000));
console.log('\n=== ACADEMY PART 3 ===');
console.log(cleanHTML.substring(7000, 11000));
