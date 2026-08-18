const fs = require('fs');

const masterPath = 'implementation/ux-academy/index.html';
const aliasPath1 = 'implementation/ux-academy.html';
const aliasPath2 = 'implementation/ux_academy.html';

let html = fs.readFileSync(masterPath, 'utf8');

// 1. Add CSS for .curriculum-note box
const cssAddition = `
    /* Curriculum Note Box Styling */
    .curriculum-note {
      background: #f9f9f9 !important;
      border: 1px solid #dcdcdc !important;
      border-radius: 6px !important;
      padding: 16px 20px !important;
      margin: 20px 0 16px 0 !important;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03) !important;
      box-sizing: border-box !important;
    }
    .curriculum-note-title {
      font-size: 14px !important;
      font-weight: 700 !important;
      color: #111111 !important;
      margin-top: 0 !important;
      margin-bottom: 10px !important;
      padding-bottom: 6px !important;
      border-bottom: 1px solid #ebebeb !important;
    }
    .curriculum-note-list {
      list-style: none !important;
      padding-left: 0 !important;
      margin: 0 !important;
    }
    .curriculum-note-list li {
      position: relative !important;
      padding-left: 16px !important;
      margin-bottom: 6px !important;
      font-size: 13px !important;
      line-height: 1.55 !important;
      color: #333333 !important;
    }
    .curriculum-note-list li::before {
      content: "•";
      position: absolute;
      left: 0;
      top: 0;
      color: #111111;
      font-size: 13px;
    }
    .curriculum-note-list li:last-child {
      margin-bottom: 0 !important;
    }
`;

if (!html.includes('.curriculum-note-title {')) {
  const cssAnchor = `</style>`;
  html = html.replace(cssAnchor, cssAddition + '\n' + cssAnchor);
}

// 2. Replace unstyled <div class="curriculum-note"> with styled box and bullet list
const oldNoteHtml = `<div class="curriculum-note">
<p>UX실무 요약 비밀자료 제공</p>
<p>1:1 맞춤형 과제 출제 및 과제 피드백 포함</p>
<p>커리큘럼에 적히지 않은 세부 내용은 실제 질문과 프로젝트 상황에 따라 추가로 다룹니다.</p>
</div>`;

const newNoteHtml = `<div class="curriculum-note">
  <h3 class="curriculum-note-title">💡 커리큘럼 추가 혜택 &amp; 안내</h3>
  <ul class="curriculum-note-list">
    <li><strong>UX실무 요약 비밀자료 제공</strong></li>
    <li><strong>1:1 맞춤형 과제 출제 및 과제 피드백 포함</strong></li>
    <li>커리큘럼에 적히지 않은 세부 내용은 실제 질문과 프로젝트 상황에 따라 추가로 다룹니다.</li>
  </ul>
</div>`;

if (html.includes(oldNoteHtml)) {
  html = html.replace(oldNoteHtml, newNoteHtml);
} else {
  // Try regex replace if whitespace differs
  const reg = /<div class="curriculum-note">\s*<p>UX실무 요약 비밀자료 제공<\/p>[\s\S]*?<\/div>/g;
  html = html.replace(reg, newNoteHtml);
}

fs.writeFileSync(masterPath, html, 'utf8');
console.log('Updated:', masterPath);

fs.writeFileSync(aliasPath1, html, 'utf8');
console.log('Updated:', aliasPath1);

fs.writeFileSync(aliasPath2, html, 'utf8');
console.log('Updated:', aliasPath2);
