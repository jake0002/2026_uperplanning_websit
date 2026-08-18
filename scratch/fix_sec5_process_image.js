const fs = require('fs');

const imgBuffer = fs.readFileSync('implementation/images/ux_process_double_diamond.png');
const processB64 = imgBuffer.toString('base64');
console.log(`Process Image Base64 Length: ${processB64.length}`);

const files = [
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design\\index.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design_cleanroom\\index.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design_cleanroom.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux-design.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_plan\\index.html',
];

files.forEach(filepath => {
    if (fs.existsSync(filepath)) {
        let content = fs.readFileSync(filepath, 'utf8');
        let original = content;

        let captionStr = '📷 슈퍼플래닝 UX디자인 진행 프로세스 (Double Diamond Framework)';
        let captionIdx = content.indexOf(captionStr);

        if (captionIdx !== -1) {
            // Find preceding <img
            let imgStart = content.lastIndexOf('<img', captionIdx);
            if (imgStart !== -1) {
                let srcStart = content.indexOf('src="', imgStart);
                let srcEnd = content.indexOf('"', srcStart + 5);
                if (srcStart !== -1 && srcEnd !== -1) {
                    content = content.substring(0, srcStart + 5) + `data:image/png;base64,${processB64}` + content.substring(srcEnd);
                    fs.writeFileSync(filepath, content, 'utf8');
                    console.log(`Updated Section 5 process image in: ${filepath}`);
                }
            }
        } else {
            console.log(`Could not find caption in: ${filepath}`);
        }
    }
});
