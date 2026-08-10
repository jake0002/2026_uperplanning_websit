const fs = require('fs');

const files_to_process = [
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design\\index.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design_cleanroom\\index.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design_cleanroom.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux-design.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_plan\\index.html',
];

files_to_process.forEach(filepath => {
    if (fs.existsSync(filepath)) {
        let content = fs.readFileSync(filepath, 'utf8');
        let original = content;

        // 1. Remove div captions
        content = content.replace(/<div [^>]*>📷 슈퍼플래닝 1:1 UX 대면 컨설팅 현장<\/div>/gi, '');
        content = content.replace(/<div [^>]*>📷 슈퍼플래닝 UX 클래스 &amp; 그룹 컨설팅 현장<\/div>/gi, '');
        content = content.replace(/<div [^>]*>📷 슈퍼플래닝 UX 클래스 & 그룹 컨설팅 현장<\/div>/gi, '');

        // 2. Remove figcaption tags
        content = content.replace(/<figcaption>📷 슈퍼플래닝 1:1 UX 대면 컨설팅 현장<\/figcaption>/gi, '');
        content = content.replace(/<figcaption>📷 슈퍼플래닝 UX 클래스 &amp; 그룹 컨설팅 현장<\/figcaption>/gi, '');
        content = content.replace(/<figcaption>📷 슈퍼플래닝 UX 클래스 & 그룹 컨설팅 현장<\/figcaption>/gi, '');

        if (content !== original) {
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`Updated: ${filepath}`);
        } else {
            console.log(`No changes needed for: ${filepath}`);
        }
    }
});
