const fs = require('fs');

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

        content = content.replace(/📷 특허 다수 보유 UX전문 에이전시 슈퍼플래닝/g, '📷 특허 다수 보유 전문 UX회사 슈퍼플래닝');
        content = content.replace(/alt="특허 다수 보유 UX전문 에이전시 슈퍼플래닝"/g, 'alt="특허 다수 보유 전문 UX회사 슈퍼플래닝"');

        if (content !== original) {
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`Updated patent caption in: ${filepath}`);
        } else {
            console.log(`No caption changes in: ${filepath}`);
        }
    }
});
