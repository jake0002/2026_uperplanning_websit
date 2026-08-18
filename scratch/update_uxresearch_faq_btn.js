const fs = require('fs');
let content = fs.readFileSync('implementation/ux_research/index.html', 'utf8');
const original = content;

// Update JSON-LD text
const oldJsonText = '"text": "찾아오시는 길 및 문의 페이지를 통해 서비스 현황과 목표를 남겨주시면 10분 이내로 전문 UX컨설턴트가 상세 상담과 견적안을 안내해 드립니다."';
const newJsonText = '"text": "문의 페이지를 통해 UX리서치 문의를 남겨주시면 신속하게 전문 UX리서처가 일정과 견적안을 안내해 드립니다."';
content = content.replace(oldJsonText, newJsonText);
console.log('JSON-LD replaced:', content.includes(newJsonText));

// Update HTML dd text + add button
const oldHtmlDd = '<dd>찾아오시는 길 및 문의 페이지를 통해 서비스 현황과 목표를 남겨주시면 10분 이내로 전문 UX컨설턴트가 상세 상담과 견적안을 안내해 드립니다.</dd>';
const newHtmlDd = `<dd>문의 페이지를 통해 UX리서치 문의를 남겨주시면 신속하게 전문 UX리서처가 일정과 견적안을 안내해 드립니다.
  <div style="margin-top: 12px;">
    <a href="/contact/" class="w95-btn" style="display: inline-flex; align-items: center; gap: 6px; padding: 5px 16px; background-color: #c0c0c0; color: #000000; text-decoration: none; font-weight: bold; font-size: 13px; border-top: 2px solid #ffffff; border-left: 2px solid #ffffff; border-right: 2px solid #404040; border-bottom: 2px solid #404040; box-shadow: inset -1px -1px #000000, inset 1px 1px #dfdfdf; cursor: pointer;">
      <span style="font-size: 14px;">✉️</span> <span>문의하기</span>
    </a>
  </div></dd>`;
content = content.replace(oldHtmlDd, newHtmlDd);
console.log('HTML dd replaced:', content.includes('신속하게 전문 UX리서처가'));

if (content !== original) {
    fs.writeFileSync('implementation/ux_research/index.html', content, 'utf8');
    console.log('File saved successfully!');
} else {
    console.log('No changes made!');
}
