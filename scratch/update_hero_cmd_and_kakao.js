const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'implementation', 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// 1. Update cmd-prompt text & blinking cursor from #ffd43b to #ffffff
content = content.replace(
  /color:#ffd43b;\s*font-weight:700;\s*margin-bottom:4px;\s*display:flex;\s*align-items:center;\s*gap:6px;"/g,
  'color:#ffffff; font-weight:700; margin-bottom:4px; display:flex; align-items:center; gap:6px;"'
);

content = content.replace(
  /<span class="blink-cursor" style="height:13px; width:6px; background:#ffd43b; display:inline-block;"><\/span>/g,
  '<span class="blink-cursor" style="height:13px; width:6px; background:#ffffff; display:inline-block;"></span>'
);

content = content.replace(
  /background:#ffd43b;\s*margin-left:3px;\s*display:inline-block;\s*vertical-align:middle;/g,
  'background:#ffffff; margin-left:3px; display:inline-block; vertical-align:middle;'
);

// 2. Update Kakao banner background to #ffffff, title/desc text to black, button to black bg + white text
const oldKakaoBanner = /<!-- KAKAO CHANNEL REALTIME CHAT BANNER CARD ON DESKTOP -->[\s\S]*?<\/a>/;
const newKakaoBanner = `<!-- KAKAO CHANNEL REALTIME CHAT BANNER CARD ON DESKTOP -->
      <a href="http://pf.kakao.com/_efpVxb/chat" target="_blank" rel="noopener noreferrer" style="display:block; text-decoration:none; margin-top:8px; background:#ffffff; border:2px solid #000000; padding:6px 8px; cursor:pointer; box-shadow:1px 1px 0 #000; border-radius:2px;" onclick="blip(880, 0.05);">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div style="display:flex; align-items:center; gap:6px;">
            <span style="font-size:16px;">💬</span>
            <div>
              <h4 id="skyKakaoTitle" style="color:#000000; font-size:11px; margin:0; font-weight:800; line-height:1.2;">카카오채널 실시간 채팅문의</h4>
              <p id="skyKakaoDesc" style="color:#111111; font-size:9.5px; margin:1px 0 0 0; opacity:0.9; line-height:1.1;">카카오톡으로 빠른 UX상담 (24시간)</p>
            </div>
          </div>
          <span id="skyKakaoBtn" class="w95-btn" style="padding:2px 6px; background:#000000; color:#ffffff; font-weight:bold; font-size:9.5px; border:1px solid #000; flex-shrink:0; display:inline-block; pointer-events:none;">채팅 시작 ↗</span>
        </div>
      </a>`;

if (oldKakaoBanner.test(content)) {
  content = content.replace(oldKakaoBanner, newKakaoBanner);
  console.log('Successfully updated Kakao banner to B&W style in index.html');
} else {
  console.error('Could not match Kakao banner regex in index.html');
}

fs.writeFileSync(indexPath, content, 'utf8');
console.log('Successfully updated cmd prompt and Kakao banner in index.html');
