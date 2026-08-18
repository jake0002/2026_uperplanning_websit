const fs = require('fs');
const path = require('path');

const genScriptPath = path.join(__dirname, 'generate_standalone_post_pages.js');
if (fs.existsSync(genScriptPath)) {
  let content = fs.readFileSync(genScriptPath, 'utf8');

  const newNavMarkup = `<!-- BOTTOM NAV WITH PREV/NEXT POST FULL TITLES & FAR-RIGHT LIST VIEW BUTTON -->
          <section class="post-nav-section" style="margin-top:36px; padding-top:20px; border-top:2px solid #000000; display:flex; flex-direction:column; gap:14px;">
            <div style="display:flex; flex-direction:column; gap:10px; font-size:13.5px; font-weight:700;">
              <div style="display:flex; align-items:center; justify-content:space-between; gap:12px; border-bottom:1px dashed #e0e0e0; padding-bottom:8px;">
                <span style="color:#444; font-size:13px; font-weight:800; white-space:nowrap;">⬅ 이전글</span>
                \${prevPost ? \`<a href="/ux-blog/post-\${prevPost.id}/" style="color:#000000; text-decoration:none; text-align:right; flex:1; font-weight:600; font-size:13.5px;"><span style="text-decoration:underline;">\${prevPost.title}</span></a>\` : '<span style="color:#999999; font-weight:500; font-size:13px;">이전 글이 없습니다.</span>'}
              </div>
              <div style="display:flex; align-items:center; justify-content:space-between; gap:12px; padding-bottom:4px;">
                <span style="color:#444; font-size:13px; font-weight:800; white-space:nowrap;">다음글 ➡</span>
                \${nextPost ? \`<a href="/ux-blog/post-\${nextPost.id}/" style="color:#000000; text-decoration:none; text-align:right; flex:1; font-weight:600; font-size:13.5px;"><span style="text-decoration:underline;">\${nextPost.title}</span></a>\` : '<span style="color:#999999; font-weight:500; font-size:13px;">다음 글이 없습니다.</span>'}
              </div>
            </div>

            <!-- FAR RIGHT LIST VIEW BUTTON -->
            <div style="display:flex; justify-content:flex-end; border-top:1px solid #000000; padding-top:14px;">
              <a href="/ux-blog/" class="w95-btn" style="padding:6px 20px; font-size:12.5px;">목록보기</a>
            </div>
          </section>`;

  content = content.replace(
    /<!-- BOTTOM NAV WITH PREV\/NEXT POST & LIST VIEW BUTTON ON SAME HORIZONTAL ROW -->[\s\S]*?<\/section>/g,
    newNavMarkup
  );

  content = content.replace(
    /<!-- BOTTOM NAV WITH PREV\/NEXT POST & LIST VIEW BUTTON -->[\s\S]*?<\/section>/g,
    newNavMarkup
  );

  fs.writeFileSync(genScriptPath, content, 'utf8');
  console.log('Synced generate_standalone_post_pages.js with far right layout');
}
