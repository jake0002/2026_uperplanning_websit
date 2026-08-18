const fs = require('fs');

const boxesHTML = `
          <div class="grid-boxes two" style="margin-top: 20px;">
            <article class="box">
              <h3 style="font-size: 15px; font-weight: 700; color: #000; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
                <span>🏛️</span> <span>금융, 공공 서비스</span>
              </h3>
              <p style="font-size: 13.5px; line-height: 1.7; color: #333; margin: 0;">NH농협은행, KB국민은행, 서민금융진흥원 등 신뢰와 이해가 중요한 서비스에서 가입, 인증, 정보 확인, 금융 기능 동선을 설계하고 사용자 혼란을 줄이는 방향의 UX 프로젝트를 수행했습니다.</p>
            </article>
            <article class="box">
              <h3 style="font-size: 15px; font-weight: 700; color: #000; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
                <span>🚀</span> <span>플랫폼, 모빌리티, 기업 서비스</span>
              </h3>
              <p style="font-size: 13.5px; line-height: 1.7; color: #333; margin: 0;">삼성전자, 롯데렌터카, LG생활건강, 오스템임플란트, 아이스크림에듀 등 다양한 도메인에서 서비스 구조, 화면 흐름, 사용자 커뮤니케이션 방식을 다뤄 왔습니다.</p>
            </article>
          </div>`;

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

        if (content.includes('NH농협은행, KB국민은행, 서민금융진흥원')) {
            console.log(`Two boxes already present in: ${filepath}`);
            return;
        }

        let captionIdx = content.indexOf('📷 슈퍼플래닝 주요 고객사');
        if (captionIdx !== -1) {
            let divEndIdx = content.indexOf('</div>', captionIdx);
            if (divEndIdx !== -1) {
                // Find outer image container closing div
                let outerDivEndIdx = content.indexOf('</div>', divEndIdx + 6);
                if (outerDivEndIdx !== -1) {
                    let insertPos = outerDivEndIdx + 6;
                    content = content.substring(0, insertPos) + '\n' + boxesHTML + content.substring(insertPos);
                }
            }
        }

        if (content !== original) {
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`Inserted 2 case boxes in: ${filepath}`);
        } else {
            console.log(`Could not insert in: ${filepath}`);
        }
    }
});
