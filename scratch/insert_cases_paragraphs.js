const fs = require('fs');

const p1 = `이러한 UX프로젝트 수행경험은 단순 레퍼런스 나열보다 더 중요한 의미가 있습니다. 산업군이 달라도 사용자가 이해하지 못하면 서비스는 멈춘다는 공통 전제가 있고, 슈퍼플래닝은 그 문제를 사용자 인터뷰, UI/UX디자인, UX라이팅, 앱 개발 연계를 통해 해결해 왔습니다. 따라서 스타트업의 신규 앱 기획부터 대기업의 기존 서비스 고도화까지 상황에 맞는 방식으로 접근할 수 있습니다.`;
const p2 = `또한 슈퍼플래닝은 기업 실무자들과 대학/단체 UX강의 경험도 함께 보유하고 있어, 프로젝트 수행 과정에서 왜 이런 구조와 화면이 필요한지 구체적으로 설명 가능한 강점이 있습니다. 설계안을 단순 결과물이 아니라 조직 내 커뮤니케이션 도구로도 쓸 수 있게 만든다는 것에 많은 고객사 분들의 만족도를 높여주었습니다.`;

const paragraphHTML = `\n          <p style="margin-top: 20px;">${p1}</p>\n          <p>${p2}</p>`;

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

        if (content.includes('이러한 UX프로젝트 수행경험은 단순 레퍼런스')) {
            console.log(`Paragraphs already present in: ${filepath}`);
            return;
        }

        let boxIdx = content.indexOf('아이스크림에듀 등 다양한 도메인에서 서비스 구조');
        if (boxIdx !== -1) {
            let articleEnd = content.indexOf('</article>', boxIdx);
            if (articleEnd !== -1) {
                let divEnd = content.indexOf('</div>', articleEnd);
                if (divEnd !== -1) {
                    let insertPos = divEnd + 6;
                    content = content.substring(0, insertPos) + paragraphHTML + content.substring(insertPos);
                }
            }
        }

        if (content !== original) {
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`Inserted Section 6 paragraphs in: ${filepath}`);
        } else {
            console.log(`Could not insert in: ${filepath}`);
        }
    }
});
