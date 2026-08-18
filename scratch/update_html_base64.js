const fs = require('fs');
const path = require('path');

const b64_1 = fs.readFileSync('scratch/b64_1.txt', 'utf8').trim();
const b64_2 = fs.readFileSync('scratch/b64_2.txt', 'utf8').trim();

const files_to_update = [
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design\\index.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design_cleanroom\\index.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design_cleanroom.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux-design.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_plan\\index.html',
];

files_to_update.forEach(filepath => {
    if (fs.existsSync(filepath)) {
        let content = fs.readFileSync(filepath, 'utf8');
        let original = content;

        // Replace first image (ux_consulting_1.jpg)
        let pos1 = content.indexOf('ux_consulting_1.jpg');
        if (pos1 !== -1) {
            let srcStart = content.lastIndexOf('src="data:image/jpeg;base64,', pos1);
            if (srcStart !== -1) {
                let srcEnd = content.indexOf('"', srcStart + 28);
                content = content.substring(0, srcStart + 28) + b64_1 + content.substring(srcEnd);
            }
        }

        // Replace second image (ux_consulting_2.jpg)
        let pos2 = content.indexOf('ux_consulting_2.jpg');
        if (pos2 !== -1) {
            let srcStart = content.lastIndexOf('src="data:image/jpeg;base64,', pos2);
            if (srcStart !== -1) {
                let srcEnd = content.indexOf('"', srcStart + 28);
                content = content.substring(0, srcStart + 28) + b64_2 + content.substring(srcEnd);
            }
        }

        if (content !== original) {
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`Updated base64 images in: ${filepath}`);
        } else {
            console.log(`No base64 image changes in: ${filepath}`);
        }
    }
});
