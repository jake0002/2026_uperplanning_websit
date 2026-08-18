const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'implementation');
const files = [];

function scanDir(d) {
  const list = fs.readdirSync(d);
  list.forEach(item => {
    const full = path.join(d, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      scanDir(full);
    } else if (item.endsWith('.html')) {
      files.push(full);
    }
  });
}

scanDir(dir);

const oldCardPattern = /<div class="info-card" style="padding:8px 10px; cursor:pointer;" onclick="openWindow\('classes'\); blip\(660, 0\.04\);">[\s\S]*?<\/div>/;

const newCardHtml = `<div class="info-card" style="padding:8px 10px; cursor:pointer;" onclick="location.href='/ux-academy/'; blip(660, 0.04);">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                <h4 style="margin:0;">\${isKo ? 'AI-UX 강의' : 'AI-UX Classes'}</h4>
                <a href="/ux-academy/" class="w95-btn" style="padding:1px 6px; font-size:10px; text-decoration:none; color:#000;" onclick="event.stopPropagation();">\${isKo ? '상세보기 →' : 'Details →'}</a>
              </div>
              <p style="margin:0;">\${isKo ? '최신 AI를 활용한 서비스기획부터 피그마, 바이브코딩까지 실무에 즉시 적용 가능한 맞춤형 UX교육을 진행합니다.' : 'Practical training using latest AI tools from service planning to Figma and vibe coding.'}</p>
            </div>`;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;

  if (oldCardPattern.test(content)) {
    content = content.replace(oldCardPattern, newCardHtml);
  }

  // Also replace any standalone occurrences of the text
  content = content.replace(
    /최신 AI 프로그램을 활용한 앱기획부터 바이브코딩까지 실무에 즉시 적용 가능한 맞춤형 교육을 진행합니다\./g,
    '최신 AI를 활용한 서비스기획부터 피그마, 바이브코딩까지 실무에 즉시 적용 가능한 맞춤형 UX교육을 진행합니다.'
  );

  if (content !== original) {
    fs.writeFileSync(f, content, 'utf8');
    console.log('Updated AI-UX card in:', path.relative(dir, f));
  }
});
