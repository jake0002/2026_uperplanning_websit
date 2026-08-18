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

const instagramBody = `      } else if (key === 'instagram') {
        return \`
          <div style="display:flex; flex-direction:column; height:100%; gap:8px;">
            <div style="display:flex; align-items:center; gap:6px; background:#dfdfdf; padding:4px 8px; border:2px solid #000; box-shadow:inset -1px -1px #fff, inset 1px 1px #7b7b7b; font-size:11px;">
              <span style="font-weight:bold;">Address:</span>
              <input type="text" readonly value="https://www.instagram.com/ux_superplanning/" style="flex:1; padding:2px 6px; font-family:var(--font-mono, monospace); font-size:11px; background:#fff; border:1px solid #7b7b7b; box-shadow:inset 1px 1px 0 #000;">
              <a href="https://www.instagram.com/ux_superplanning/" target="_blank" class="w95-btn" style="padding:2px 8px; font-size:11px; text-decoration:none; color:#000;">새 창에서 열기 ↗</a>
            </div>

            <div style="flex:1; min-height:400px; border:2px solid #000; box-shadow:inset 1px 1px 0 #7b7b7b; background:#fafafa; position:relative; overflow:hidden;">
              <iframe 
                src="https://www.instagram.com/ux_superplanning/embed" 
                style="width:100%; height:100%; border:0; background:#fff;" 
                allowtransparency="true"
                frameborder="0"
                title="Superplanning Instagram">
              </iframe>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; font-size:11px; padding:2px 4px;">
              <span style="font-weight:bold; color:#000000;">@ux_superplanning</span>
              <span>슈퍼플래닝 공식 인스타그램</span>
            </div>
          </div>
        \`;`;

const threadsBody = `      } else if (key === 'threads') {
        return \`
          <div style="display:flex; flex-direction:column; height:100%; gap:8px;">
            <div style="display:flex; align-items:center; gap:6px; background:#dfdfdf; padding:4px 8px; border:2px solid #000; box-shadow:inset -1px -1px #fff, inset 1px 1px #7b7b7b; font-size:11px;">
              <span style="font-weight:bold; color:#000;">Address:</span>
              <input type="text" readonly value="https://www.threads.net/@ux_superplanning" style="flex:1; padding:2px 6px; font-family:var(--font-mono, monospace); font-size:11px; background:#fff; border:1px solid #7b7b7b; box-shadow:inset 1px 1px 0 #000; color:#000;">
              <a href="https://www.threads.net/@ux_superplanning" target="_blank" rel="noopener noreferrer" class="w95-btn" style="padding:2px 8px; font-size:11px; text-decoration:none; color:#000; font-weight:bold;">새 창에서 열기 ↗</a>
            </div>

            <div style="flex:1; border:2px solid #000; box-shadow:inset 1px 1px 0 #7b7b7b; background:#101010; color:#fff; padding:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; gap:12px; position:relative; overflow:hidden;">
              <div style="width:64px; height:64px; border-radius:50%; background:#000; border:2px solid #444; display:flex; align-items:center; justify-content:center; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.5);">
                <img src="/images/threads-logo.jpg" alt="Threads Logo" style="width:100%; height:100%; object-fit:cover; display:block;">
              </div>

              <div>
                <h3 style="font-size:18px; font-weight:800; margin:0 0 4px 0; color:#ffffff;">@ux_superplanning</h3>
                <p style="font-size:12.5px; color:#aaa; margin:0 0 6px 0; font-weight:600;">UX디자인 에이전시 슈퍼플래닝 공식 쓰레드</p>
                <p style="font-size:11px; color:#888; max-width:400px; margin:0 auto; line-height:1.5;">
                  최신 UX 인사이트, UX 라이팅 노하우, 사용자 리서치 사례 및 에이전시 소식을 실시간으로 공유합니다.
                </p>
              </div>

              <a href="https://www.threads.net/@ux_superplanning" target="_blank" rel="noopener noreferrer" class="w95-btn" style="padding:8px 18px; background:#ffffff; color:#000000; font-weight:bold; font-size:12px; border:2px solid #ffffff; text-decoration:none; display:inline-flex; align-items:center; gap:8px; border-radius:4px; box-shadow:2px 2px 0 #000;">
                <img src="/images/threads-logo.jpg" alt="Threads Icon" style="width:16px; height:16px; border-radius:50%; display:block;">
                Threads 프로필 방문하기 (@ux_superplanning) ↗
              </a>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; font-size:11px; padding:2px 4px;">
              <span style="font-weight:bold; color:#000; display:flex; align-items:center; gap:4px;">
                <img src="/images/threads-logo.jpg" alt="Threads Icon" style="width:14px; height:14px; border-radius:50%; display:block;">
                @ux_superplanning
              </span>
              <span>슈퍼플래닝 공식 쓰레드</span>
            </div>
          </div>
        \`;`;

const introVideoBody = `      } else if (key === 'intro-video') {
        return \`
          <div style="width:100%; height:100%; display:flex; flex-direction:column; gap:6px;">
            <iframe 
              src="https://www.youtube-nocookie.com/embed/dHwu6Zdt1Pw?autoplay=1&mute=1&controls=1" 
              title="슈퍼플래닝 소개영상" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowfullscreen 
              style="width:100%; flex:1; min-height:345px; height:345px; border:2px solid #000; box-shadow:inset 1px 1px 0 #7b7b7b; background:#000; display:block; flex-shrink:0;">
            </iframe>
            <div style="display:flex; justify-content:flex-end; align-items:center; margin-top:2px;">
              <a href="https://youtu.be/dHwu6Zdt1Pw" target="_blank" class="w95-btn" style="padding:2px 8px; font-size:11px; text-decoration:none; color:#000;">유튜브에서 크게 보기 ↗</a>
            </div>
          </div>
        \`;`;

const contactBody = `      } else if (key === 'contact') {
        return \`
          <h3 style="font-size:14px; font-weight:700; margin-bottom:8px;">📍 서비스 이해도가 높은 실무진이 직접 상담해 드립니다.</h3>
          <div class="info-card" style="margin-bottom:8px; padding:6px; text-align:center; background:#fff; border:2px solid #000; box-shadow:inset 1px 1px 0 #fff, inset -1px -1px 0 #7b7b7b;">
            <img src="/images/superplanning-office.png" alt="슈퍼플래닝 미사 UX 스튜디오 전경" style="width:100%; height:auto; max-height:160px; object-fit:cover; border:1px solid #000; display:block;">
          </div>
          <div class="info-card" style="margin-bottom:8px; display:flex; flex-direction:column; gap:6px;">
            <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; border-bottom:1px solid #ddd; padding-bottom:4px;">
              <div style="font-size:11.5px;"><strong>회사명:</strong> <span style="font-weight:700;">슈퍼플래닝</span></div>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; border-bottom:1px solid #ddd; padding-bottom:4px;">
              <div style="font-size:11.5px;"><strong>주소:</strong> 경기 하남시 미사강변동로72 SB비즈타워 1116호</div>
              <button class="w95-btn" style="padding:1px 6px; font-size:10.5px; flex-shrink:0;" onclick="if(typeof copyToClipboard==='function') copyToClipboard('경기 하남시 미사강변동로72 SB비즈타워 1116호', '주소')">복사</button>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; border-bottom:1px solid #ddd; padding-bottom:4px;">
              <div style="font-size:11.5px;"><strong>전화번호 (T):</strong> 031-699-3298</div>
              <button class="w95-btn" style="padding:1px 6px; font-size:10.5px; flex-shrink:0;" onclick="if(typeof copyToClipboard==='function') copyToClipboard('031-699-3298', '전화번호')">복사</button>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; gap:8px;">
              <div style="font-size:11.5px;"><strong>대표 이메일 (E):</strong> jake@superplanning.co.kr</div>
              <button class="w95-btn" style="padding:1px 6px; font-size:10.5px; flex-shrink:0;" onclick="if(typeof copyToClipboard==='function') copyToClipboard('jake@superplanning.co.kr', '이메일 주소')">복사</button>
            </div>
          </div>
          <div class="info-card" style="margin-bottom:8px;">
            <p style="font-size:11px; line-height:1.45; margin-bottom:4px;">
              <strong>▶ 지하철로 오실 경우:</strong><br>
              5호선 미사역 1분 거리 위치, 8번 출구 서브웨이 옆 건물 11층
            </p>
            <p style="font-size:11px; line-height:1.45; margin-bottom:6px;">
              <strong>▶ 차량으로 오실 경우:</strong><br>
              지하주차장에 무료주차 가능 (건물 후면 진입)
            </p>
            <a href="https://naver.me/GmF8esjK" target="_blank" rel="noopener noreferrer" class="w95-btn" style="display:inline-block; padding:3px 8px; font-size:10.5px; text-decoration:none;">
              🗺️ Naver Map ↗ (https://naver.me/GmF8esjK)
            </a>
          </div>

          <a href="http://pf.kakao.com/_efpVxb/chat" target="_blank" rel="noopener noreferrer" class="info-card" style="display:block; text-decoration:none; margin-bottom:6px; background:#ffffff; border:2px solid #000000; cursor:pointer;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div style="display:flex; align-items:center; gap:8px;">
                <span style="font-size:18px;">💬</span>
                <div>
                  <h4 style="color:#000000; font-size:12px; margin:0; font-weight:800;">카카오채널 실시간 채팅문의</h4>
                  <p style="color:#333333; font-size:10px; margin:1px 0 0 0; opacity:0.9;">카카오톡으로 빠른 UX상담 (24시간)</p>
                </div>
              </div>
              <span class="w95-btn" style="padding:2px 6px; background:#000000; color:#ffffff; font-weight:bold; font-size:9.5px; border:1px solid #000; flex-shrink:0; display:inline-block; pointer-events:none;">채팅 시작 ↗</span>
            </div>
          </a>

          <p style="font-size:9.5px; opacity:0.75; text-align:center; margin-top:4px;">Copyright © 2019–2026 SUPERPLANNING. All rights reserved.</p>
        \`;`;

htmlFiles.forEach(file => {
    // Exclude index.html itself since index.html has getWindowBody with i18n
    if (file.endsWith('implementation\\index.html') || file.endsWith('implementation/index.html')) {
        return;
    }

    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('getSubpageWindowBody')) return;

    let modified = false;

    // 1. WINDOW_DEFS updates
    if (content.includes("'contact': { w: 620, h: 570")) {
        content = content.replace(/'contact':\s*\{\s*w:\s*620,\s*h:\s*570/g, "'contact': { w: 620, h: 600");
        modified = true;
    }
    if (content.includes("'contact': { w: 620, h: 520")) {
        content = content.replace(/'contact':\s*\{\s*w:\s*620,\s*h:\s*520/g, "'contact': { w: 620, h: 600");
        modified = true;
    }

    // Add intro-video to WINDOW_DEFS if missing
    if (!content.includes("'intro-video':") && content.includes("var WINDOW_DEFS = {")) {
        content = content.replace(
            "var WINDOW_DEFS = {",
            "var WINDOW_DEFS = {\n      'intro-video': { w: 640, h: 430, title: '🎥 슈퍼플래닝 소개영상' },"
        );
        modified = true;
    }

    // 2. Replace getSubpageWindowBody contact block
    const contactBlockRegex = /\} else if \(key === 'contact'\) \{[\s\S]*?(?=\} else if|\} else|\n    \})/g;
    if (contactBlockRegex.test(content)) {
        content = content.replace(contactBlockRegex, contactBody);
        modified = true;
    }

    // 3. Replace getSubpageWindowBody instagram block
    const instagramBlockRegex = /\} else if \(key === 'instagram'\) \{[\s\S]*?(?=\} else if|\} else|\n    \})/g;
    if (instagramBlockRegex.test(content)) {
        content = content.replace(instagramBlockRegex, instagramBody);
        modified = true;
    }

    // 4. Replace getSubpageWindowBody threads block
    const threadsBlockRegex = /\} else if \(key === 'threads'\) \{[\s\S]*?(?=\} else if|\} else|\n    \})/g;
    if (threadsBlockRegex.test(content)) {
        content = content.replace(threadsBlockRegex, threadsBody);
        modified = true;
    }

    // 5. Add/replace getSubpageWindowBody intro-video block
    if (content.includes("else if (key === 'intro-video')")) {
        const introBlockRegex = /\} else if \(key === 'intro-video'\) \{[\s\S]*?(?=\} else if|\} else|\n    \})/g;
        content = content.replace(introBlockRegex, introVideoBody);
        modified = true;
    } else {
        // Insert intro-video block right before contact block
        if (content.includes("} else if (key === 'contact')")) {
            content = content.replace(
                "} else if (key === 'contact')",
                introVideoBody + "\n" + "} else if (key === 'contact')"
            );
            modified = true;
        }
    }

    if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        updatedCount++;
    }
});

console.log(`Synced popups across ${updatedCount} subpage HTML files.`);
