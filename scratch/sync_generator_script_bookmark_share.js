const fs = require('fs');
const path = require('path');

const genScriptPath = path.join(__dirname, 'generate_standalone_post_pages.js');
if (fs.existsSync(genScriptPath)) {
  let content = fs.readFileSync(genScriptPath, 'utf8');

  // Add extra CSS if missing
  if (!content.includes('.icon-action-btn {')) {
    content = content.replace(
      '</style>',
      `    .icon-action-btn {
      background: #ffffff;
      border: 1px solid #000000;
      box-shadow: 1px 1px 0 #000000;
      font-size: 12px;
      cursor: pointer;
      padding: 3px 8px;
      color: #000000;
      line-height: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      transition: all 0.1s ease;
    }
    .icon-action-btn:hover { background: #000000; color: #ffffff; box-shadow: 0 0 0 #000000; }
    .icon-action-btn:hover svg { stroke: #ffffff; }

    .toast-msg {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #000000;
      color: #ffffff;
      padding: 8px 16px;
      font-size: 12px;
      font-weight: bold;
      border: 2px solid #ffffff;
      box-shadow: 3px 3px 0 #000000;
      z-index: 10001;
      opacity: 0;
      transform: translateY(10px);
      transition: all 0.2s ease;
      pointer-events: none;
    }
    .toast-msg.show {
      opacity: 1;
      transform: translateY(0);
    }
  </style>`
    );
  }

  // Update article-meta-bar
  content = content.replace(
    /<div class="article-meta-bar">[\s\S]*?<\/div>/g,
    `<div class="article-meta-bar" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
              <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
                <span class="category-badge">\${post.category}</span>
                <span class="read-time-pill">\${post.readTime}초 분량</span>
                <span style="font-size:12px; color:#777;">| 작성자: 슈퍼플래닝</span>
              </div>
              <div style="display:flex; align-items:center; gap:6px;">
                <button class="icon-action-btn" id="postBookmarkBtn" onclick="togglePostBookmark(\${post.id});" title="즐겨찾기 추가/제거">
                  <span id="bookmarkStar">☆</span> <span style="font-size:11px; font-weight:800;">즐겨찾기</span>
                </button>
                <button class="icon-action-btn" onclick="shareCurrentPost(\${post.id});" title="아티클 링크 공유하기">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle;"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                  <span style="font-size:11px; font-weight:800;">공유</span>
                </button>
              </div>
            </div>`
  );

  fs.writeFileSync(genScriptPath, content, 'utf8');
  console.log('Synced generate_standalone_post_pages.js with top-right bookmark and share buttons');
}
