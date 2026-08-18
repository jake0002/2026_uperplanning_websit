const fs = require('fs');

const oldAnswer = '찾아오시는 길 및 문의 페이지를 통해 서비스 현황과 목표를 남겨주시면 전문 UX컨설턴트가 상세 상담과 견적안을 안내해 드립니다.';
const newAnswerHTML = `문의 페이지를 통해 현재 서비스 상황과 목표를 남겨주시면, 어떤 범위의 UX기획 지원이 필요한지 확인한 뒤 상담과 진행 방향을 안내해 드립니다.
  <div style="margin-top: 10px;">
    <a href="/contact/" style="display: inline-flex; align-items: center; gap: 6px; padding: 8px 18px; background-color: #000080; color: #ffffff; text-decoration: none; font-weight: 600; border-radius: 4px; font-size: 13.5px; box-shadow: 0 2px 5px rgba(0,0,0,0.15);">
      <span>✉️</span> <span>문의하기</span>
    </a>
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

        if (content.includes(oldAnswer)) {
            content = content.replace(oldAnswer, newAnswerHTML);
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`Updated final FAQ answer & inserted contact button in: ${filepath}`);
        } else {
            console.log(`Old answer not found in: ${filepath}`);
        }
    }
});
