const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'implementation', 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// 1. Static fallback section
content = content.replace(
  '<p>최신 AI 프로그램을 활용한 앱기획부터 바이브코딩까지 실무에 즉시 적용 가능한 맞춤형 교육을 진행합니다.</p>',
  '<p>최신 AI를 활용한 서비스기획부터 피그마, 바이브코딩까지 실무에 즉시 적용 가능한 맞춤형 UX교육을 진행합니다.</p>'
);

// 2. Services popup info-card
const searchKey = `onclick="openWindow('classes'); blip(660, 0.04);">`;
const idx = content.indexOf(searchKey);

if (idx !== -1) {
  const cardStart = content.lastIndexOf('<div class="info-card"', idx);
  const cardEnd = content.indexOf('</div>', content.indexOf('</p>', idx)) + 6;

  const newCard = `<div class="info-card" style="padding:8px 10px; cursor:pointer;" onclick="location.href='/ux-academy/'; blip(660, 0.04);">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                <h4 style="margin:0;">\${isKo ? 'AI-UX 강의' : 'AI-UX Classes'}</h4>
                <a href="/ux-academy/" class="w95-btn" style="padding:1px 6px; font-size:10px; text-decoration:none; color:#000;" onclick="event.stopPropagation();">\${isKo ? '상세보기 →' : 'Details →'}</a>
              </div>
              <p style="margin:0;">\${isKo ? '최신 AI를 활용한 서비스기획부터 피그마, 바이브코딩까지 실무에 즉시 적용 가능한 맞춤형 UX교육을 진행합니다.' : 'Practical training using latest AI tools from service planning to Figma and vibe coding.'}</p>
            </div>`;

  content = content.substring(0, cardStart) + newCard + content.substring(cardEnd);
  fs.writeFileSync(indexPath, content, 'utf8');
  console.log('Successfully updated AI-UX card in index.html!');
} else {
  console.error('searchKey not found in index.html');
}
