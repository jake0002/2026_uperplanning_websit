const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..', 'implementation');

function getAllHtmlFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getAllHtmlFiles(filePath));
        } else if (file.endsWith('.html')) {
            results.push(filePath);
        }
    });
    return results;
}

const htmlFiles = getAllHtmlFiles(baseDir);
let updatedCount = 0;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    // 1. Reduce contact popup window height from 640 to 570 to eliminate bottom blank space
    if (content.includes("'contact': { w: 620, h: 640")) {
        content = content.replace("'contact': { w: 620, h: 640", "'contact': { w: 620, h: 570");
        modified = true;
    }
    if (content.includes('"contact": { w: 620, h: 640')) {
        content = content.replace('"contact": { w: 620, h: 640', '"contact": { w: 620, h: 570');
        modified = true;
    }

    // 2. Change Kakao chat banner box to white background with black text in index.html
    const oldIndexKakao = `background:#fee500; border:2px solid #3c1e1e; cursor:pointer;" onclick="blip(880, 0.05);">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div style="display:flex; align-items:center; gap:8px;">
                <span style="font-size:18px;">💬</span>
                <div>
                  <h4 style="color:#3c1e1e; font-size:12px; margin:0; font-weight:800;">\${isKo ? '카카오채널 실시간 채팅문의' : 'Kakao Realtime Chat'}</h4>
                  <p style="color:#3c1e1e; font-size:10px; margin:1px 0 0 0; opacity:0.9;">\${isKo ? '카카오톡으로 빠른 UX상담 (24시간)' : 'Quick UX consultation via KakaoTalk (24/7)'}</p>
                </div>
              </div>
              <span class="w95-btn" style="padding:2px 6px; background:#3c1e1e; color:#fee500; font-weight:bold; font-size:9.5px; border:1px solid #000; flex-shrink:0; display:inline-block; pointer-events:none;">\${isKo ? '채팅 시작 ↗' : 'Start Chat ↗'}</span>
            </div>`;

    const newIndexKakao = `background:#ffffff; border:2px solid #000000; cursor:pointer;" onclick="blip(880, 0.05);">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div style="display:flex; align-items:center; gap:8px;">
                <span style="font-size:18px;">💬</span>
                <div>
                  <h4 style="color:#000000; font-size:12px; margin:0; font-weight:800;">\${isKo ? '카카오채널 실시간 채팅문의' : 'Kakao Realtime Chat'}</h4>
                  <p style="color:#333333; font-size:10px; margin:1px 0 0 0; opacity:0.9;">\${isKo ? '카카오톡으로 빠른 UX상담 (24시간)' : 'Quick UX consultation via KakaoTalk (24/7)'}</p>
                </div>
              </div>
              <span class="w95-btn" style="padding:2px 6px; background:#000000; color:#ffffff; font-weight:bold; font-size:9.5px; border:1px solid #000; flex-shrink:0; display:inline-block; pointer-events:none;">\${isKo ? '채팅 시작 ↗' : 'Start Chat ↗'}</span>
            </div>`;

    if (content.includes(oldIndexKakao)) {
        content = content.replace(oldIndexKakao, newIndexKakao);
        modified = true;
    }

    // 3. Change Kakao chat banner box in subpages
    const oldSubpageKakao = `background:#fee500; border:2px solid #3c1e1e; padding:8px 10px; color:#3c1e1e; font-weight:bold;">💬 카카오톡 24시간 실시간 상담 ↗</a>`;
    const newSubpageKakao = `background:#ffffff; border:2px solid #000000; padding:8px 10px; color:#000000; font-weight:bold;">💬 카카오톡 24시간 실시간 상담 ↗</a>`;

    if (content.includes(oldSubpageKakao)) {
        content = content.replaceAll(oldSubpageKakao, newSubpageKakao);
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        updatedCount++;
    }
});

console.log(`Updated Kakao banner style & contact window height in ${updatedCount} HTML files.`);
