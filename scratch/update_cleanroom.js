const fs = require('fs');

const files = [
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design_cleanroom\\index.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design_cleanroom.html'
];

const b64_1 = fs.readFileSync('scratch/b64_1.txt', 'utf8').trim();
const b64_2 = fs.readFileSync('scratch/b64_2.txt', 'utf8').trim();

files.forEach(filepath => {
    if (fs.existsSync(filepath)) {
        let content = fs.readFileSync(filepath, 'utf8');
        let original = content;

        let idx = content.indexOf('3. UX컨설팅');
        if (idx !== -1) {
            let section = content.substring(idx, idx + 250000);
            let matches = [];
            let pos = 0;
            while ((pos = section.indexOf('src="data:image/jpeg;base64,', pos)) !== -1) {
                let end = section.indexOf('"', pos + 28);
                matches.push({ start: pos + 28, end: end });
                pos = end + 1;
            }
            console.log(`File ${filepath} section 3 has ${matches.length} base64 images.`);
            if (matches.length >= 2) {
                // replace first and second in section
                let globalPos1 = idx + matches[0].start;
                let globalEnd1 = idx + matches[0].end;
                content = content.substring(0, globalPos1) + b64_1 + content.substring(globalEnd1);

                // re-find section for second image
                let idx2 = content.indexOf('3. UX컨설팅');
                let section2 = content.substring(idx2, idx2 + 250000);
                let matches2 = [];
                let pos2 = 0;
                while ((pos2 = section2.indexOf('src="data:image/jpeg;base64,', pos2)) !== -1) {
                    let end2 = section2.indexOf('"', pos2 + 28);
                    matches2.push({ start: pos2 + 28, end: end2 });
                    pos2 = end2 + 1;
                }
                if (matches2.length >= 2) {
                    let globalPos2 = idx2 + matches2[1].start;
                    let globalEnd2 = idx2 + matches2[1].end;
                    content = content.substring(0, globalPos2) + b64_2 + content.substring(globalEnd2);
                }
            }
        }
        if (content !== original) {
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`Updated cleanroom: ${filepath}`);
        }
    }
});
