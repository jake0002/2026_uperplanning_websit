const fs = require('fs');

const p1 = `컨설팅 과정에서는 화면 구조, 사용자 흐름, UX라이팅, 핵심 기능 우선순위, 개발 커뮤니케이션 포인트까지 함께 점검합니다. 그래서 단순히 좋은 말만 덧붙이는 피드백이 아니라 무엇을 먼저 고쳐야 하는지, 어떤 기준으로 다음 단계를 결정해야 하는지까지 실질적인 실행 기준을 제시할 수 있습니다.`;
const p2 = `실제로 슈퍼플래닝은 UX컨설팅을 꾸준히 진행해 왔고, 다수의 후기와 재의뢰를 통해 높은 만족도를 확인해 왔습니다. 사전 상담부터 대면 컨설팅, 별도 자료 제공, 후속 대응까지 이어지는 구조를 갖추고 있어 스타트업과 소규모 비즈니스가 시행착오를 줄이고 더 빠르게 서비스 방향을 정리하는 데 도움을 주고 있습니다.`;

const paragraphHTML = `\n\n          <p>${p1}</p>\n          <p>${p2}</p>`;
const paragraphCleanroomHTML = `\n<p>${p1}</p>\n<p>${p2}</p>\n`;

const files_to_update = [
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design\\index.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design_cleanroom\\index.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design_cleanroom.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux-design.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_plan\\index.html',
];

files_to_update.forEach(filepath => {
    if (fs.existsSync(filepath)) {
        let content = fs.readFileSync(filepath, 'utf8');
        let original = content;

        // Check if paragraph is already inserted to avoid duplicate
        if (content.includes(p1)) {
            console.log(`Paragraph already present in: ${filepath}`);
            return;
        }

        if (filepath.includes('cleanroom')) {
            // Find section 3
            let idx = content.indexOf('3. UX컨설팅');
            if (idx !== -1) {
                let galIdx = content.indexOf('</div>\n</section>', idx);
                if (galIdx === -1) galIdx = content.indexOf('</figure>\n</div>\n</section>', idx);
                if (galIdx !== -1) {
                    let insertPos = content.indexOf('</div>', galIdx) + 6;
                    content = content.substring(0, insertPos) + paragraphCleanroomHTML + content.substring(insertPos);
                }
            }
        } else {
            // Standard format
            let idx = content.indexOf('<h2 id="consulting">3. UX컨설팅</h2>');
            if (idx !== -1) {
                let flexEnd = content.indexOf('</div>\n\n          <!-- 4.', idx);
                if (flexEnd === -1) flexEnd = content.indexOf('</div>\n          <!-- 4.', idx);
                if (flexEnd === -1) flexEnd = content.indexOf('</div>\n\n          <h2 id="diff">', idx);

                if (flexEnd !== -1) {
                    let insertPos = flexEnd + 6;
                    content = content.substring(0, insertPos) + paragraphHTML + content.substring(insertPos);
                }
            }
        }

        if (content !== original) {
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`Inserted paragraphs in: ${filepath}`);
        } else {
            console.log(`Could not find insert position in: ${filepath}`);
        }
    }
});
