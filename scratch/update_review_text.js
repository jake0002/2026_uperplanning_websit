const fs = require('fs');

const masterPath = 'implementation/ux-academy/index.html';
const aliasPath1 = 'implementation/ux-academy.html';
const aliasPath2 = 'implementation/ux_academy.html';

let html = fs.readFileSync(masterPath, 'utf8');

// 1. Remove .review-copy-block, from box css list if still present
html = html.replace(/\s*\.review-copy-block,/g, '');

// 2. Add .review-copy-lead CSS rule if not present
if (!html.includes('.review-copy-lead {')) {
  const cssTarget = `.summary-card .summary-list li:last-child {
      margin-bottom: 0 !important;
    }`;
  const cssAddition = `.summary-card .summary-list li:last-child {
      margin-bottom: 0 !important;
    }
    .review-copy-lead {
      font-size: 13.5px !important;
      line-height: 1.6 !important;
      color: #222222 !important;
      margin-top: 12px !important;
      margin-bottom: 16px !important;
      background: transparent !important;
      border: none !important;
      padding: 0 !important;
      box-shadow: none !important;
    }`;
  html = html.replace(cssTarget, cssAddition);
}

// 3. HTML replacement for review-copy-block wrapper removal
const oldHtmlChunk = `<div class="review-copy-block">\r\n            <p class="review-copy-lead">IT를 몰라도 UX기획은 누구나 할 수 있습니다.<br/>입문자들이 가장 많이 선택한 AI-UX강의 1위!<br/>UX교육 최다 후기 달성<br/>오직 강의 후기만으로 검증 합니다.</p>\r\n            <div class="review-ai-summary-wrap">\r\n            <article class="box review-ai-summary"><h3>전체 후기요약 (300건 이상)</h3><p>수강생들은 단순 이론 설명보다 현재 본인 상황에 맞춘 실무형 피드백과 방향 정리가 큰 도움이 됐다고 평가합니다.</p><p>취준생, 예비창업자, 실무자 모두 각자 필요한 지점을 빠르게 짚어주는 맞춤형 강의라는 후기가 반복적으로 나타납니다.</p></article>\r\n            </div>\r\n            </div>`;

const newHtmlChunk = `<p class="review-copy-lead">IT를 몰라도 UX기획은 누구나 할 수 있습니다.<br/>입문자들이 가장 많이 선택한 AI-UX강의 1위!<br/>UX교육 최다 후기 달성<br/>오직 강의 후기만으로 검증 합니다.</p>\r\n          <div class="review-ai-summary-wrap">\r\n            <article class="box review-ai-summary"><h3>전체 후기요약 (300건 이상)</h3><p>수강생들은 단순 이론 설명보다 현재 본인 상황에 맞춘 실무형 피드백과 방향 정리가 큰 도움이 됐다고 평가합니다.</p><p>취준생, 예비창업자, 실무자 모두 각자 필요한 지점을 빠르게 짚어주는 맞춤형 강의라는 후기가 반복적으로 나타납니다.</p></article>\r\n          </div>`;

console.log('oldHtmlChunk match:', html.includes(oldHtmlChunk));

if (html.includes(oldHtmlChunk)) {
  html = html.replace(oldHtmlChunk, newHtmlChunk);
} else {
  console.log('Trying regex replace...');
  const reg = /<div class="review-copy-block">\s*<p class="review-copy-lead">([\s\S]*?)<\/p>\s*<div class="review-ai-summary-wrap">/g;
  html = html.replace(reg, '<p class="review-copy-lead">$1</p>\n          <div class="review-ai-summary-wrap">');
  // Also clean trailing extra closing div if present
  html = html.replace(/<\/article>\s*<\/div>\s*<\/div>/g, '</article>\n          </div>');
}

fs.writeFileSync(masterPath, html, 'utf8');
console.log('Updated:', masterPath);

fs.writeFileSync(aliasPath1, html, 'utf8');
console.log('Updated:', aliasPath1);

fs.writeFileSync(aliasPath2, html, 'utf8');
console.log('Updated:', aliasPath2);
