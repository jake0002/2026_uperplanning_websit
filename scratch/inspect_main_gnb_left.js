const fs = require('fs');

const mainHtml = fs.readFileSync('implementation/index.html', 'utf8');

let idx = mainHtml.indexOf('<ul class="gnb-left">');
if (idx !== -1) {
    let endIdx = mainHtml.indexOf('</ul>', idx);
    console.log(mainHtml.substring(idx, endIdx + 5));
}
