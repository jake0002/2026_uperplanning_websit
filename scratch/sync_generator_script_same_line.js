const fs = require('fs');
const path = require('path');

const genScriptPath = path.join(__dirname, 'generate_standalone_post_pages.js');
if (fs.existsSync(genScriptPath)) {
  let content = fs.readFileSync(genScriptPath, 'utf8');

  const newNavMarkup = `<!-- BOTTOM NAV WITH PREV & NEXT POST ON THE EXACT SAME HORIZONTAL ROW -->
          <section class="post-nav-section" style="margin-top:36px; padding-top:20px; border-top:2px solid #000000; display:flex; flex-direction:column; gap:14px;">
            <div style="display:flex; justify-content:space-between; align-items:center; gap:16px; font-size:13.5px; font-weight:700;">
              <!-- Prev Post (Left) -->
              <div style="flex:1; min-width:0; text-align:left;">
                \${prevPost ? \`<a href="/ux-blog/post-\${prevPost.id}/" style="color:#000000; text-decoration:none; display:inline-flex; align-items:center; gap:6px; max-width:100%;"><span style="white-space:nowrap; font-weight:800; color:#444;">⬅ 이전글:</span> <span style="text-decoration:underline; overflow:hidden; white-space:nowrap; text-overflow:ellipsis;">\${prevPost.title}</span></a>\` : '<span style="color:#999999; font-weight:500; font-size:13px;">이전 글이 없습니다.</span>'}
              </div>

              <!-- Next Post (Right) -->
              <div style="flex:1; min-width:0; text-align:right;">
                \${nextPost ? \`<a href="/ux-blog/post-\${nextPost.id}/" style="color:#000000; text-decoration:none; display:inline-flex; align-items:center; justify-content:flex-end; gap:6px; max-width:100%;"><span style="text-decoration:underline; overflow:hidden; white-space:nowrap; text-overflow:ellipsis;">\${nextPost.title}</span> <span style="white-space:nowrap; font-weight:800; color:#444;">:다음글 ➡</span></a>\` : '<span style="color:#999999; font-weight:500; font-size:13px;">다음 글이 없습니다.</span>'}
              </div>
            </div>

            <!-- 목록보기 Button at Far Right -->
            <div style="display:flex; justify-content:flex-end; border-top:1px dashed #e0e0e0; padding-top:12px;">
              <a href="/ux-blog/" class="w95-btn" style="padding:6px 20px; font-size:12.5px;">목록보기</a>
            </div>
          </section>`;

  content = content.replace(
    /<!-- BOTTOM NAV WITH PREV\/NEXT POST FULL TITLES & FAR-RIGHT LIST VIEW BUTTON -->[\s\S]*?<\/section>/g,
    newNavMarkup
  );

  fs.writeFileSync(genScriptPath, content, 'utf8');
  console.log('Synced generator script generate_standalone_post_pages.js with same line layout');
}
