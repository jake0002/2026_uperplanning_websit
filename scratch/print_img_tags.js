const fs = require('fs');

const filepath = 'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design\\index.html';
const content = fs.readFileSync(filepath, 'utf8');

const idx = content.indexOf('<h2 id="consulting">3. UX컨설팅</h2>');
if (idx !== -1) {
    const section = content.substring(idx, idx + 10000);
    // Find all <img ...>
    const imgMatches = section.match(/<img[^>]+>/g);
    console.log("Found img tags:", imgMatches ? imgMatches.length : 0);
    if (imgMatches) {
        imgMatches.forEach((img, i) => {
            console.log(`--- IMG ${i+1} ---`);
            console.log(img.substring(0, 150) + "...");
        });
    }
}
