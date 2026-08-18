const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'implementation', 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

const targetStr = `            <div class="info-card" style="padding:8px 10px; cursor:pointer;" onclick="location.href='/ux-academy/'; blip(660, 0.04);">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                <h4 style="margin:0;">\${isKo ? 'AI-UX 강의' : 'AI-UX Classes'}</h4>
                <a href="/ux-academy/" class="w95-btn" style="padding:1px 6px; font-size:10px; text-decoration:none; color:#000;" onclick="event.stopPropagation();">\${isKo ? '상세보기 →' : 'Details →'}</a>
              </div>
              <p style="margin:0;">\${isKo ? '최신 AI를 활용한 서비스기획부터 피그마, 바이브코딩까지 실무에 즉시 적용 가능한 맞춤형 UX교육을 진행합니다.' : 'Practical training using latest AI tools from service planning to Figma and vibe coding.'}</p>
            </div>
              <p style="margin:0;">\${isKo ? '최신 AI를 활용한 서비스기획부터 피그마, 바이브코딩까지 실무에 즉시 적용 가능한 맞춤형 UX교육을 진행합니다.' : 'Practical training using latest AI tools for app planning and vibe coding.'}</p>
            </div>`;

const cleanStr = `            <div class="info-card" style="padding:8px 10px; cursor:pointer;" onclick="location.href='/ux-academy/'; blip(660, 0.04);">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                <h4 style="margin:0;">\${isKo ? 'AI-UX 강의' : 'AI-UX Classes'}</h4>
                <a href="/ux-academy/" class="w95-btn" style="padding:1px 6px; font-size:10px; text-decoration:none; color:#000;" onclick="event.stopPropagation();">\${isKo ? '상세보기 →' : 'Details →'}</a>
              </div>
              <p style="margin:0;">\${isKo ? '최신 AI를 활용한 서비스기획부터 피그마, 바이브코딩까지 실무에 즉시 적용 가능한 맞춤형 UX교육을 진행합니다.' : 'Practical training using latest AI tools from service planning to Figma and vibe coding.'}</p>
            </div>`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, cleanStr);
  fs.writeFileSync(indexPath, content, 'utf8');
  console.log('Successfully cleaned duplicate paragraph tag in index.html');
} else {
  console.error('Target string not found in index.html');
}
