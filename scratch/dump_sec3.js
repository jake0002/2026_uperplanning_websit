const fs = require('fs');

const filepath = 'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design\\index.html';
const content = fs.readFileSync(filepath, 'utf8');

const idx = content.indexOf('<h2 id="consulting">');
if (idx !== -1) {
    const section = content.substring(idx, idx + 4000);
    console.log(section);
}
