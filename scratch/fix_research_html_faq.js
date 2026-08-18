const fs = require('fs');

const newResearchText = '문의하기 페이지에서 UX리서치 관련 문의를 남겨주시면 신속하게 전문 UX리서처가 일정과 견적안을 안내해 드립니다.';

const htmlBtnBlock = `<dd>문의하기 페이지에서 UX리서치 관련 문의를 남겨주시면 신속하게 전문 UX리서처가 일정과 견적안을 안내해 드립니다.
  <div style="margin-top: 12px;">
    <a href="/contact/" class="w95-btn" style="display: inline-flex; align-items: center; gap: 6px; padding: 5px 16px; background-color: #c0c0c0; color: #000000; text-decoration: none; font-weight: bold; font-size: 13px; border-top: 2px solid #ffffff; border-left: 2px solid #ffffff; border-right: 2px solid #404040; border-bottom: 2px solid #404040; box-shadow: inset -1px -1px #000000, inset 1px 1px #dfdfdf; cursor: pointer;">
      <span style="font-size: 14px;">✉️</span> <span>문의하기</span>
    </a>
  </div></dd>`;

const oldJsonText = '"text": "찾아오시는 길 및 문의 페이지를 통해 서비스 현황과 목표를 남겨주시면 10분 이내로 전문 UX컨설턴트가 상세 상담과 견적안을 안내해 드립니다."';
const newJsonText = `"text": "${newResearchText}"`;

const oldHtmlDd = '<dd>찾아오시는 길 및 문의 페이지를 통해 서비스 현황과 목표를 남겨주시면 10분 이내로 전문 UX컨설턴트가 상세 상담과 견적안을 안내해 드립니다.</dd>';

['implementation/ux_research.html', 'implementation/ux-research.html'].forEach(filepath => {
    if (fs.existsSync(filepath)) {
        let content = fs.readFileSync(filepath, 'utf8');
        const original = content;
        content = content.replace(oldJsonText, newJsonText);
        content = content.replace(oldHtmlDd, htmlBtnBlock);
        if (content !== original) {
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`Updated: ${filepath}`);
        } else {
            console.log(`No change: ${filepath}`);
        }
    }
});
