const fs = require('fs');

const updatedGapBoxesHTML = `
          <div style="display: flex; gap: 16px; margin-top: 20px; flex-wrap: wrap;">
            <div style="flex: 1; min-width: 260px; border: 1px solid #ccc; padding: 20px; background-color: #fff;">
              <h5 style="margin: 0 0 16px 0; font-size: 16px; color: #000; font-weight: bold;">금융, 공공 서비스 사례</h5>
              <p style="margin: 0; line-height: 1.8; font-size: 14.5px; color: #111;">NH농협은행, KB국민은행, 서민금융진흥원 등 신뢰와 이해가 중요한 서비스에서 가입, 인증, 정보 확인, 금융 기능 동선을 설계하고 사용자 혼란을 줄이는 방향의 UX 프로젝트를 수행했습니다.</p>
            </div>
            <div style="flex: 1; min-width: 260px; border: 1px solid #ccc; padding: 20px; background-color: #fff;">
              <h5 style="margin: 0 0 16px 0; font-size: 16px; color: #000; font-weight: bold;">플랫폼, 모빌리티, 기업 서비스 사례</h5>
              <p style="margin: 0; line-height: 1.8; font-size: 14.5px; color: #111;">삼성전자, 롯데렌터카, LG생활건강, 오스템임플란트, 아이스크림에듀 등 다양한 도메인에서 서비스 구조, 화면 흐름, 사용자 커뮤니케이션 방식을 다뤄 왔습니다.</p>
            </div>
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

        // Target Section 6 domain boxes container
        content = content.replace(/<div class="grid-boxes two" style="margin-top: 20px;">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g, updatedGapBoxesHTML.trim());
        content = content.replace(/<div style="display: flex; gap: 16px; margin-top: 20px; flex-wrap: wrap;">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g, updatedGapBoxesHTML.trim());

        if (content !== original) {
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`Updated domain box titles & added gap in: ${filepath}`);
        } else {
            console.log(`Could not match boxes in: ${filepath}`);
        }
    }
});
