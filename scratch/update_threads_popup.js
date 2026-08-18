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

const indexThreadsNewBody = `      } else if (key === 'threads') {
        return \`
          <div style="display:flex; flex-direction:column; height:100%; gap:8px;">
            <div style="display:flex; align-items:center; gap:6px; background:#dfdfdf; padding:4px 8px; border:2px solid #000; box-shadow:inset -1px -1px #fff, inset 1px 1px #7b7b7b; font-size:11px;">
              <span style="font-weight:bold; color:#000;">Address:</span>
              <input type="text" readonly value="https://www.threads.net/@ux_superplanning" style="flex:1; padding:2px 6px; font-family:var(--font-mono); font-size:11px; background:#fff; border:1px solid #7b7b7b; box-shadow:inset 1px 1px 0 #000; color:#000;">
              <a href="https://www.threads.net/@ux_superplanning" target="_blank" rel="noopener noreferrer" class="w95-btn" style="padding:2px 8px; font-size:11px; text-decoration:none; color:#000; font-weight:bold;">새 창에서 열기 ↗</a>
            </div>

            <div style="flex:1; border:2px solid #000; box-shadow:inset 1px 1px 0 #7b7b7b; background:#101010; color:#fff; padding:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; gap:12px; position:relative; overflow:hidden;">
              <div style="width:64px; height:64px; border-radius:50%; background:#000; border:2px solid #444; display:flex; align-items:center; justify-content:center; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.5);">
                <img src="/images/threads-logo.jpg" alt="Threads Logo" style="width:100%; height:100%; object-fit:cover; display:block;">
              </div>

              <div>
                <h3 style="font-size:18px; font-weight:800; margin:0 0 4px 0; color:#ffffff;">@ux_superplanning</h3>
                <p style="font-size:12.5px; color:#aaa; margin:0 0 6px 0; font-weight:600;">슈퍼플래닝 UX 스튜디오 공식 쓰레드</p>
                <p style="font-size:11px; color:#888; max-width:400px; margin:0 auto; line-height:1.5;">
                  최신 UX 인사이트, UX 라이팅 노하우, 사용자 리서치 사례 및 에이전시 소식을 실시간으로 공유합니다.
                </p>
              </div>

              <a href="https://www.threads.net/@ux_superplanning" target="_blank" rel="noopener noreferrer" class="w95-btn" style="padding:8px 18px; background:#ffffff; color:#000000; font-weight:bold; font-size:12px; border:2px solid #ffffff; text-decoration:none; display:inline-flex; align-items:center; gap:8px; border-radius:4px; box-shadow:2px 2px 0 #000;" onclick="blip(880, 0.05);">
                <img src="/images/threads-logo.jpg" alt="Threads" style="width:18px; height:18px; border-radius:3px; display:inline-block; vertical-align:middle;"> <span>Threads 프로필 방문하기 (@ux_superplanning) ↗</span>
              </a>

              <p style="font-size:10px; color:#666; margin-top:4px;">
                * Threads 외부 보안 정책(X-Frame-Options)에 따라 상단 버튼 클릭 시 공식 프로필로 즉시 연결됩니다.
              </p>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; font-size:11px; padding:2px 4px;">
              <span style="font-weight:bold; color:#000; display:inline-flex; align-items:center; gap:4px;">
                <img src="/images/threads-logo.jpg" alt="Threads" style="width:14px; height:14px; border-radius:2px; display:inline-block; vertical-align:middle;"> @ux_superplanning
              </span>
              <span>슈퍼플래닝 공식 쓰레드</span>
            </div>
          </div>
        \`;`;

const subpageThreadsNewBody = `      } else if (key === 'threads') {
        return \`
          <div style="display:flex; flex-direction:column; gap:8px; text-align:center; padding:16px; background:#101010; color:#fff; border:2px solid #000; align-items:center;">
            <div style="width:56px; height:56px; border-radius:50%; background:#000; border:2px solid #444; display:flex; align-items:center; justify-content:center; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.5);">
              <img src="/images/threads-logo.jpg" alt="Threads Logo" style="width:100%; height:100%; object-fit:cover; display:block;">
            </div>
            <h3 style="font-size:16px; margin:0; color:#fff;">@ux_superplanning</h3>
            <p style="font-size:11.5px; color:#aaa; margin:0;">슈퍼플래닝 UX 스튜디오 공식 쓰레드</p>
            <a href="https://www.threads.net/@ux_superplanning" target="_blank" class="w95-btn" style="padding:6px 14px; background:#fff; color:#000; font-weight:bold; font-size:11.5px; text-decoration:none; display:inline-flex; align-items:center; gap:6px; margin:8px auto 0 auto;">
              <img src="/images/threads-logo.jpg" alt="Threads" style="width:14px; height:14px; border-radius:2px; display:inline-block; vertical-align:middle;"> <span>Threads 프로필 방문하기 (@ux_superplanning) ↗</span>
            </a>
          </div>
        \`;`;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    if (file.endsWith('index.html') && content.includes("Address:https://www.threads.net/@ux_superplanning")) {
        // Main index template
        content = content.replace(
            /\}\s*else\s+if\s*\(\s*key\s*===\s*['"]threads['"]\s*\)\s*\{[\s\S]*?\n\s*\}\s*else\s+if/g,
            indexThreadsNewBody + '\n      } else if'
        );
        modified = true;
    } else if (content.includes("key === 'threads'") || content.includes('key === "threads"')) {
        // Subpage template
        content = content.replace(
            /\}\s*else\s+if\s*\(\s*key\s*===\s*['"]threads['"]\s*\)\s*\{[\s\S]*?\n\s*\}\s*else\s+if/g,
            subpageThreadsNewBody + '\n      } else if'
        );
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        updatedCount++;
    }
});

console.log(`Updated Threads popup in ${updatedCount} HTML files.`);
