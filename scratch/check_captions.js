const fs = require('fs');

const files_to_check = [
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design\\index.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design_cleanroom\\index.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design_cleanroom.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux-design.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_plan\\index.html',
];

files_to_check.forEach(filepath => {
    if (fs.existsSync(filepath)) {
        const content = fs.readFileSync(filepath, 'utf8');
        let idx = content.indexOf('<h2 id="consulting">3. UX컨설팅</h2>');
        if (idx === -1) idx = content.indexOf('3. UX컨설팅</h2>');
        if (idx !== -1) {
            let nextH2 = content.indexOf('<h2', idx + 10);
            if (nextH2 === -1) nextH2 = idx + 3000;
            let snippet = content.substring(idx, nextH2);
            let snippet_clean = snippet.replace(/src="data:image\/[^"]+"/g, 'src="BASE64"');
            console.log(`=== File: ${filepath} ===`);
            console.log(snippet_clean);
        }
    }
});
