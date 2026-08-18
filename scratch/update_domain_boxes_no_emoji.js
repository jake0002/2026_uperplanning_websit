const fs = require('fs');

const updatedBoxesHTML = `
          <div class="grid-boxes two" style="margin-top: 20px;">
            <article class="box" style="background: #ffffff; border: 1px solid #ccc; border-radius: 4px; padding: 20px 22px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
              <h3 style="font-size: 15.5px; font-weight: 700; color: #000; margin-top: 0; margin-bottom: 10px; padding-bottom: 6px; border-bottom: 2px solid #000080;">금융, 공공 서비스</h3>
              <p style="font-size: 13.5px; line-height: 1.75; color: #222; margin: 0;">NH농협은행, KB국민은행, 서민금융진흥원 등 신뢰와 이해가 중요한 서비스에서 가입, 인증, 정보 확인, 금융 기능 동선을 설계하고 사용자 혼란을 줄이는 방향의 UX 프로젝트를 수행했습니다.</p>
            </article>
            <article class="box" style="background: #ffffff; border: 1px solid #ccc; border-radius: 4px; padding: 20px 22px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
              <h3 style="font-size: 15.5px; font-weight: 700; color: #000; margin-top: 0; margin-bottom: 10px; padding-bottom: 6px; border-bottom: 2px solid #000080;">플랫폼, 모빌리티, 기업 서비스</h3>
              <p style="font-size: 13.5px; line-height: 1.75; color: #222; margin: 0;">삼성전자, 롯데렌터카, LG생활건강, 오스템임플란트, 아이스크림에듀 등 다양한 도메인에서 서비스 구조, 화면 흐름, 사용자 커뮤니케이션 방식을 다뤄 왔습니다.</p>
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

        // Replace old grid-boxes block
        content = content.replace(/<div class="grid-boxes two" style="margin-top: 20px;">[\s\S]*?<\/article>\s*<\/div>/g, updatedBoxesHTML.trim());

        if (content !== original) {
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`Updated domain boxes (no emoji) in: ${filepath}`);
        } else {
            console.log(`Could not find boxes in: ${filepath}`);
        }
    }
});
