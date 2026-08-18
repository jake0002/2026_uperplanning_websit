const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'implementation');

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const postDetailFiles = getFiles(path.join(baseDir, 'ux-blog')).filter(f => f.includes('post-'));

const extraCss = `
    .icon-action-btn {
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
`;

postDetailFiles.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;

  // Extract post ID
  const matchId = filePath.match(/post-(\d+)/);
  const postId = matchId ? parseInt(matchId[1]) : 1;

  let content = fs.readFileSync(filePath, 'utf8');

  // Inject CSS if missing
  if (!content.includes('.icon-action-btn {')) {
    content = content.replace(
      '</style>',
      `${extraCss}\n  </style>`
    );
  }

  // Replace article-meta-bar HTML with top-right Bookmark & Share buttons
  content = content.replace(
    /<div class="article-meta-bar">[\s\S]*?<\/div>/g,
    (m) => {
      // Extract category
      const catMatch = m.match(/<span class="category-badge">([^<]+)<\/span>/);
      const category = catMatch ? catMatch[1] : 'UX리서치';

      // Extract readTime
      const readTimeMatch = m.match(/(\d+)초/);
      const readTime = readTimeMatch ? readTimeMatch[1] : '60';

      return `<div class="article-meta-bar" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
              <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
                <span class="category-badge">${category}</span>
                <span class="read-time-pill">${readTime}초 분량</span>
                <span style="font-size:12px; color:#777;">| 작성자: 슈퍼플래닝</span>
              </div>
              <div style="display:flex; align-items:center; gap:6px;">
                <button class="icon-action-btn" id="postBookmarkBtn" onclick="togglePostBookmark(${postId});" title="즐겨찾기 추가/제거">
                  <span id="bookmarkStar">☆</span> <span style="font-size:11px; font-weight:800;">즐겨찾기</span>
                </button>
                <button class="icon-action-btn" onclick="shareCurrentPost(${postId});" title="아티클 링크 공유하기">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle;"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                  <span style="font-size:11px; font-weight:800;">공유</span>
                </button>
              </div>
            </div>`;
    }
  );

  // Inject Toast HTML if missing
  if (!content.includes('id="toast"')) {
    content = content.replace(
      '</body>',
      `  <div class="toast-msg" id="toast">링크가 클립보드에 복사되었습니다!</div>\n</body>`
    );
  }

  // Inject JS handlers
  const jsHandlers = `
    // BOOKMARK & SHARE HANDLERS FOR POST DETAIL PAGE
    function togglePostBookmark(postId) {
      let bookmarks = JSON.parse(localStorage.getItem('sp_blog_bookmarks') || '[]');
      const idx = bookmarks.indexOf(postId);
      const btn = document.getElementById('postBookmarkBtn');
      const star = document.getElementById('bookmarkStar');
      if (idx > -1) {
        bookmarks.splice(idx, 1);
        if (star) star.textContent = '☆';
        if (btn) btn.classList.remove('bookmarked');
        showToast('즐겨찾기에서 제거되었습니다.');
      } else {
        bookmarks.push(postId);
        if (star) star.textContent = '★';
        if (btn) btn.classList.add('bookmarked');
        showToast('★ 즐겨찾기에 추가되었습니다.');
      }
      localStorage.setItem('sp_blog_bookmarks', JSON.stringify(bookmarks));
    }

    function shareCurrentPost(postId) {
      const shareUrl = window.location.href;
      navigator.clipboard.writeText(shareUrl).then(() => {
        showToast('📌 아티클 링크가 클립보드에 복사되었습니다!');
      }).catch(() => {
        showToast('링크 복사 완료!');
      });
    }

    function showToast(msg) {
      const toast = document.getElementById('toast');
      if (!toast) return;
      toast.textContent = msg;
      toast.classList.add('show');
      setTimeout(() => { toast.classList.remove('show'); }, 2000);
    }

    // Init Bookmark Star State
    (function initPostBookmark() {
      let bookmarks = JSON.parse(localStorage.getItem('sp_blog_bookmarks') || '[]');
      const btn = document.getElementById('postBookmarkBtn');
      const star = document.getElementById('bookmarkStar');
      if (bookmarks.includes(${postId})) {
        if (star) star.textContent = '★';
        if (btn) btn.classList.add('bookmarked');
      }
    })();
  `;

  if (!content.includes('togglePostBookmark(')) {
    content = content.replace(
      '// GNB SCROLL PROGRESS GAUGE BAR',
      `${jsHandlers}\n\n    // GNB SCROLL PROGRESS GAUGE BAR`
    );
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Added top-right Bookmark & Share buttons to post-${postId}`);
});

console.log('ALL 19 POST DETAIL PAGES UPDATED WITH TOP-RIGHT BOOKMARK & SHARE BUTTONS!');
