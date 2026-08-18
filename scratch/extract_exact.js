const fs = require('fs');

const filepath = 'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design\\index.html';
const content = fs.readFileSync(filepath, 'utf8');

// Find first image
const pos1 = content.indexOf('../images/ux_consulting_1.jpg');
if (pos1 !== -1) {
    const srcStart = content.lastIndexOf('src="data:image/jpeg;base64,', pos1);
    const srcEnd = content.indexOf('"', srcStart + 28);
    const b64 = content.substring(srcStart + 28, srcEnd);
    const buf = Buffer.from(b64, 'base64');
    fs.writeFileSync('scratch/img1.jpg', buf);
    console.log(`Saved scratch/img1.jpg (${buf.length} bytes)`);
}

// Find second image
const pos2 = content.indexOf('../images/ux_consulting_2.jpg');
if (pos2 !== -1) {
    const srcStart = content.lastIndexOf('src="data:image/jpeg;base64,', pos2);
    const srcEnd = content.indexOf('"', srcStart + 28);
    const b64 = content.substring(srcStart + 28, srcEnd);
    const buf = Buffer.from(b64, 'base64');
    fs.writeFileSync('scratch/img2.jpg', buf);
    console.log(`Saved scratch/img2.jpg (${buf.length} bytes)`);
}
