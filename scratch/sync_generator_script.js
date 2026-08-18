const fs = require('fs');
const path = require('path');

const genScriptPath = path.join(__dirname, 'generate_standalone_post_pages.js');
if (fs.existsSync(genScriptPath)) {
  let content = fs.readFileSync(genScriptPath, 'utf8');

  content = content.replace(
    /<!-- BOTTOM NAV WITH PREV\/NEXT POST & LIST VIEW BUTTON -->[\s\S]*?<\/section>/g,
    `<!-- BOTTOM NAV WITH PREV/NEXT POST & LIST VIEW BUTTON ON SAME HORIZONTAL ROW -->
          <section class="post-nav-section" style="margin-top:36px; padding-top:20px; border-top:2px solid #000000;">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
              <div style="flex:1; min-width:180px; text-align:left;">
                \${prevPost ? \`<a href="/ux-blog/post-\${prevPost.id}/" class="post-nav-link" title="\${prevPost.title.replace(/"/g, '&quot;')}"><span>⬅ 이전글:</span> <span>\${prevPost.title}</span></a>\` : '<span style="color:#888; font-size:13px; font-weight:600;">이전글이 없습니다</span>'}
              </div>
              <div style="text-align:center; padding:0 8px;">
                <a href="/ux-blog/" class="w95-btn" style="padding:4px 16px; font-size:12px; white-space:nowrap;">목록보기</a>
              </div>
              <div style="flex:1; min-width:180px; text-align:right;">
                \${nextPost ? \`<a href="/ux-blog/post-\${nextPost.id}/" class="post-nav-link" title="\${nextPost.title.replace(/"/g, '&quot;')}" style="justify-content:flex-end;"><span>다음글:</span> <span>\${nextPost.title}</span> <span>➡</span></a>\` : '<span style="color:#888; font-size:13px; font-weight:600;">다음글이 없습니다</span>'}
              </div>
            </div>
          </section>`
  );

  fs.writeFileSync(genScriptPath, content, 'utf8');
  console.log('Synced generator script generate_standalone_post_pages.js');
}
