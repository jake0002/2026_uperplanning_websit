const fs = require('fs');

const patentBoxHTML = `
          <div style="border: 1px solid #ccc; padding: 22px 24px; background-color: #fff; border-radius: 4px; margin-top: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
            <h3 style="margin: 0 0 16px 0; font-size: 16px; color: #000; font-weight: 700; display: flex; align-items: center; gap: 8px;">
              <span>📜</span> UX관련 지식재산 특허보유 현황
            </h3>
            <ul style="margin: 0; padding-left: 20px; line-height: 1.95; font-size: 14.5px; color: #222;">
              <li><strong>어플리케이션 UI/UX설계 작성</strong> <span style="color: #666; font-size: 13.5px;">(제10-2211864호)</span></li>
              <li><strong>모바일앱 UX기획을 위한 와이어프레임 설계 관리장치</strong> <span style="color: #666; font-size: 13.5px;">(제10-2560058호)</span></li>
              <li><strong>UX라이팅 텍스트톤 분석 및 추천자동화 시스템</strong> <span style="color: #666; font-size: 13.5px;">(제10-2844334호)</span></li>
              <li><strong>AI기반의 멀티모달 감정분석을 활용한 UX리서치 시스템</strong> <span style="color: #666; font-size: 13.5px;">(제10-2025-0057033호)</span></li>
              <li><strong>디자인등록 특허</strong> <span style="color: #666; font-size: 13.5px;">(제30-1076209호) / (제30-2020-0042081호)</span></li>
            </ul>
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

        if (content.includes('UX관련 지식재산 특허보유 현황')) {
            console.log(`Patent box already present in: ${filepath}`);
            return;
        }

        if (filepath.includes('cleanroom')) {
            let idx = content.indexOf('<section id="diff">');
            if (idx !== -1) {
                let endIdx = content.indexOf('</section>', idx);
                if (endIdx !== -1) {
                    let secContent = content.substring(idx, endIdx);
                    secContent += patentBoxHTML + '\n';
                    content = content.substring(0, idx) + secContent + content.substring(endIdx);
                }
            }
        } else {
            let idx = content.indexOf('<h2 id="diff">4. 슈퍼플래닝만의 차별점</h2>');
            if (idx !== -1) {
                let pEnd = content.indexOf('</p>', idx);
                if (pEnd !== -1) {
                    let insertPos = pEnd + 4;
                    content = content.substring(0, insertPos) + '\n' + patentBoxHTML + content.substring(insertPos);
                }
            }
        }

        if (content !== original) {
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`Inserted patent box in: ${filepath}`);
        } else {
            console.log(`Could not insert in: ${filepath}`);
        }
    }
});
