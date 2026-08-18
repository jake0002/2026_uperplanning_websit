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

        content = content.replace(/<caption>표 2\. UX디자인 4단계 상세 프로세스 및 핵심 산출물<\/caption>/g, '<caption>UX디자인 단계 별 업무내용 및 산출물</caption>');
        content = content.replace(/표 2\. UX디자인 4단계 상세 프로세스 및 핵심 산출물/g, 'UX디자인 단계 별 업무내용 및 산출물');

        if (content !== original) {
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`Updated table caption in: ${filepath}`);
        } else {
            console.log(`No caption changes in: ${filepath}`);
        }
    }
});
