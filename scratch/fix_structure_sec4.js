const fs = require('fs');

const p1 = `슈퍼플래닝이 보유한 UX특허들은 앱 화면을 단순히 예쁘게 배치하는 문제를 해결하는 것이 아니라, 구조적으로 UX를 관리하는 관점에서 접근해 왔다는 것을 보여줍니다. UX와 IT개발을 하나의 시스템으로 보았기 때문에 가능한 결과입니다.`;
const p2 = `슈퍼플래닝은 리서치, UX기획, UX라이팅, GUI 디자인, 퍼블리싱, 웹·앱 개발과 유지보수까지 연결 가능한 구조를 갖고 있습니다. 따라서 기획 문서를 따로 만들고 현업에서 다시 해석하는 비효율을 줄이고, 개발자가 바로 이해할 수 있는 방식으로 화면 목적과 상태값, 예외 규칙을 정리하는 데 강점이 있습니다.`;
const p3 = `슈퍼플래닝은 UX를 실무적 관점에서 연구하고, 구현까지 간극을 없애기 위해 노력하고 있습니다. 스타트업부터 대기업, 공공기관까지 다양한 UX프로젝트를 수행해 온 실무 경험 위에 특허와 설계 경험이 더해져 있다는 점이 차별점입니다.`;

const correctParagraphs = `\n          <p style="margin-top: 20px;">${p1}</p>\n          <p>${p2}</p>\n          <p>${p3}</p>`;

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

        // Target the image container block
        let imgContainerStart = content.indexOf('<div style="margin-top: 16px; width: 100%;">');
        if (imgContainerStart !== -1) {
            let nextSectionIdx = content.indexOf('<!-- 5.', imgContainerStart);
            if (nextSectionIdx === -1) nextSectionIdx = content.indexOf('<h2 id="process">', imgContainerStart);

            if (nextSectionIdx !== -1) {
                // Reconstruct clean structure
                let b64Match = content.match(/src="(data:image\/png;base64,[^"]+)"/);
                let b64Str = b64Match ? b64Match[1] : '../images/ux_patents_certificates.png';

                let cleanBlock = `<div style="margin-top: 16px; width: 100%;">
            <img src="${b64Str}" alt="특허 다수 보유 UX전문 에이전시 슈퍼플래닝" onerror="this.onerror=null;this.src='../images/ux_patents_certificates.png';" style="width: 100%; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); display: block;">
            <div style="margin-top: 8px; font-size: 12.5px; color: #555; text-align: center; font-weight: 500;">📷 특허 다수 보유 UX전문 에이전시 슈퍼플래닝</div>
          </div>${correctParagraphs}\n\n          `;

                content = content.substring(0, imgContainerStart) + cleanBlock + content.substring(nextSectionIdx);
                fs.writeFileSync(filepath, content, 'utf8');
                console.log(`Successfully fixed HTML structure in: ${filepath}`);
            }
        }
    }
});
