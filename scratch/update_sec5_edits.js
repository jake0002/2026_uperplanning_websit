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

        // Edit 1
        content = content.replace(/슈퍼플래닝의 UX기획 진행 프로세스는/g, '슈퍼플래닝의 UX디자인 진행 프로세스는');

        // Edit 2
        content = content.replace(
            /프로토타입과 UI화면정의, 스토리보드, 검수 시나리오까지 연결해 실제 개발 가능한 상태로 구체화합니다\./g,
            '프로토타입과 UI화면정의, 스토리보드, GUI디자인, 퍼블리싱, 프론트/백엔드 개발, 검수 시나리오까지 진행 됩니다.'
        );

        // Edit 3
        content = content.replace(/슈퍼플래닝 UX기획 4단계 진행 프로세스/g, '슈퍼플래닝 UX디자인 진행 프로세스');
        content = content.replace(/슈퍼플래닝 UX기획 진행 프로세스/g, '슈퍼플래닝 UX디자인 진행 프로세스');

        if (content !== original) {
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`Updated Section 5 edits in: ${filepath}`);
        } else {
            console.log(`No changes made in: ${filepath}`);
        }
    }
});
