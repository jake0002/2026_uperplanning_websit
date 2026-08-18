const fs = require('fs');

const p1 = `슈퍼플래닝이 보유한 UX특허들은 앱 화면을 단순히 예쁘게 배치하는 문제를 해결하는 것이 아니라, 구조적으로 UX를 관리하는 관점에서 접근해 왔다는 것을 보여줍니다. UX와 IT개발을 하나의 시스템으로 보았기 때문에 가능한 결과입니다.`;
const p2 = `슈퍼플래닝은 리서치, UX기획, UX라이팅, GUI 디자인, 퍼블리싱, 웹·앱 개발과 유지보수까지 연결 가능한 구조를 갖고 있습니다. 따라서 기획 문서를 따로 만들고 현업에서 다시 해석하는 비효율을 줄이고, 개발자가 바로 이해할 수 있는 방식으로 화면 목적과 상태값, 예외 규칙을 정리하는 데 강점이 있습니다.`;
const p3 = `슈퍼플래닝은 UX를 실무적 관점에서 연구하고, 구현까지 간극을 없애기 위해 노력하고 있습니다. 스타트업부터 대기업, 공공기관까지 다양한 UX프로젝트를 수행해 온 실무 경험 위에 특허와 설계 경험이 더해져 있다는 점이 차별점입니다.`;

const correctHTML = `\n          <p style="margin-top: 20px;">${p1}</p>\n          <p>${p2}</p>\n          <p>${p3}</p>`;

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

        // Remove old misplaced p tags first if inside div
        content = content.replace(/<p style="margin-top: 20px;">슈퍼플래닝이 보유한 UX특허들은[\s\S]*?더해져 있다는 점이 차별점입니다.<\/p>\n\s*<\/div>/g, '</div>');
        content = content.replace(/<p style="margin-top: 20px;">슈퍼플래닝이 보유한 UX특허들은[\s\S]*?더해져 있다는 점이 차별점입니다.<\/p>/g, '');

        let captionIdx = content.indexOf('📷 특허 다수 보유 UX전문 에이전시 슈퍼플래닝</div>');
        if (captionIdx !== -1) {
            let divEndIdx = content.indexOf('</div>', captionIdx);
            if (divEndIdx !== -1) {
                let insertPos = divEndIdx + 6;
                content = content.substring(0, insertPos) + '\n' + correctHTML + content.substring(insertPos);
            }
        }

        if (content !== original) {
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`Corrected paragraph placement in: ${filepath}`);
        } else {
            console.log(`No placement changes needed in: ${filepath}`);
        }
    }
});
