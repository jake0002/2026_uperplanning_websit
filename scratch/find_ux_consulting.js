const fs = require('fs');

const filepath = 'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design\\index.html';
const content = fs.readFileSync(filepath, 'utf8');

let pos = 0;
while ((pos = content.indexOf('ux_consulting', pos)) !== -1) {
    console.log(`Found 'ux_consulting' at position ${pos}`);
    console.log(content.substring(pos - 100, pos + 300));
    pos += 13;
}
