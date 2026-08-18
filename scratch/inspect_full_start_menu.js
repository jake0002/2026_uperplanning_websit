const fs = require('fs');
const mainHtml = fs.readFileSync('implementation/index.html', 'utf8');

let startIdx = mainHtml.indexOf('<div id="startMenu">');
if (startIdx !== -1) {
    let endIdx = mainHtml.indexOf('</div>\n  </div>', startIdx);
    if (endIdx === -1) endIdx = mainHtml.indexOf('</div>\r\n  </div>', startIdx);
    console.log(mainHtml.substring(startIdx, startIdx + 2000));
}
