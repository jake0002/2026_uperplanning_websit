const fs = require('fs');

const newFaqHTML = `            <dt>UX기획만, UI디자인만 따로 의뢰할 수 있나요?</dt>
            <dd>가능합니다. UX기획도 IA설계, 와이어프레임 수정, 화면설계서 보완, UX라이팅 정리, 개발 전달용 문서 작성 등 필요한 항목만 부분적으로 지원할 수 있습니다.</dd>\n`;

const newFaqCleanroomHTML = `  <dt>UX기획만, UI디자인만 따로 의뢰할 수 있나요?</dt>
  <dd>가능합니다. UX기획도 IA설계, 와이어프레임 수정, 화면설계서 보완, UX라이팅 정리, 개발 전달용 문서 작성 등 필요한 항목만 부분적으로 지원할 수 있습니다.</dd>\n`;

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

        if (content.includes('UX기획만, UI디자인만 따로 의뢰할 수 있나요?')) {
            console.log(`New FAQ item already exists in: ${filepath}`);
            return;
        }

        let targetDt = '<dt>프로젝트 견적 및 진행 신청은 어떻게 하나요?</dt>';
        let dtIdx = content.indexOf(targetDt);
        if (dtIdx !== -1) {
            let toInsert = filepath.includes('cleanroom') ? newFaqCleanroomHTML : newFaqHTML;
            content = content.substring(0, dtIdx) + toInsert + content.substring(dtIdx);
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`Inserted new FAQ item in penultimate position in: ${filepath}`);
        } else {
            console.log(`Could not find target <dt> in: ${filepath}`);
        }
    }
});
