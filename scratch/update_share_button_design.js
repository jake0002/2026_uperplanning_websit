const fs = require('fs');
const path = require('path');

const files = [
  'ux-blog/index.html',
  'ux-blog.html',
  'ux_blog.html'
];

files.forEach(f => {
  const fullPath = path.join(__dirname, '..', 'implementation', f);
  if (!fs.existsSync(fullPath)) return;

  let content = fs.readFileSync(fullPath, 'utf8');

  // Replace old emoji share button with intuitive SVG Share Icon + text button
  const oldShareBtn = `<button class="icon-action-btn" onclick="sharePost(event, \${post.id});" title="공유하기">
                  🔗
                </button>`;

  const newShareBtn = `<button class="icon-action-btn" onclick="sharePost(event, \${post.id});" title="아티클 링크 공유하기">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle;"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                  <span style="font-size:11px; font-weight:800;">공유</span>
                </button>`;

  content = content.replace(oldShareBtn, newShareBtn);

  // Update .icon-action-btn CSS for crisp B&W retro button styling
  if (content.includes('.icon-action-btn {')) {
    content = content.replace(
      /\.icon-action-btn\s*\{[^}]*\}/g,
      `.icon-action-btn {
      background: #ffffff;
      border: 1px solid #000000;
      box-shadow: 1px 1px 0 #000000;
      font-size: 12px;
      cursor: pointer;
      padding: 3px 7px;
      color: #000000;
      line-height: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      transition: all 0.1s ease;
    }`
    );

    if (!content.includes('.icon-action-btn:hover svg')) {
      content = content.replace(
        '.icon-action-btn:hover { transform: scale(1.2); }',
        `.icon-action-btn:hover { background: #000000; color: #ffffff; box-shadow: 0 0 0 #000000; }\n    .icon-action-btn:hover svg { stroke: #ffffff; }`
      );
    }
  }

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('Updated share button design in:', f);
});
