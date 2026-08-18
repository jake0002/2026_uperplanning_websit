const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'implementation');

// 1. UPDATE LIST PAGES (ux-blog/index.html, ux-blog.html, ux_blog.html)
const listFiles = ['ux-blog/index.html', 'ux-blog.html', 'ux_blog.html'];

listFiles.forEach(relPath => {
  const fullPath = path.join(baseDir, relPath);
  if (!fs.existsSync(fullPath)) return;

  let content = fs.readFileSync(fullPath, 'utf8');

  // Add activeTagFilter variable & filter logic
  if (!content.includes('let activeTagFilter = null;')) {
    content = content.replace(
      'let currentCategory = \'all\';',
      'let currentCategory = \'all\';\n    let activeTagFilter = null;'
    );
  }

  // Update renderCards filter logic to include activeTagFilter
  const oldFilterLogic = `const matchesSearch = !currentSearchQuery || 
        post.title.toLowerCase().includes(currentSearchQuery.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(currentSearchQuery.toLowerCase()) || 
        post.tags.some(t => t.toLowerCase().includes(currentSearchQuery.toLowerCase()));
      const matchesBookmark = !showOnlyBookmarks || bookmarks.includes(post.id);

      return matchesCategory && matchesSearch && matchesBookmark;`;

  const newFilterLogic = `const matchesSearch = !currentSearchQuery || 
        post.title.toLowerCase().includes(currentSearchQuery.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(currentSearchQuery.toLowerCase()) || 
        post.tags.some(t => t.toLowerCase().includes(currentSearchQuery.toLowerCase()));
      const matchesBookmark = !showOnlyBookmarks || bookmarks.includes(post.id);
      const matchesTag = !activeTagFilter || post.tags.some(t => t.toLowerCase() === activeTagFilter.toLowerCase() || t.replace('#','').toLowerCase() === activeTagFilter.replace('#','').toLowerCase());

      return matchesCategory && matchesSearch && matchesBookmark && matchesTag;`;

  content = content.replace(oldFilterLogic, newFilterLogic);

  // Update tag-pill onclick in card template
  content = content.replace(
    /\${post\.tags\.map\(t => `<span class="tag-pill">\${t}<\/span>`\)\.join\(''\)}/g,
    `\${post.tags.map(t => \`<span class="tag-pill" onclick="event.stopPropagation(); filterByTag('\${t}');" style="cursor:pointer;" title="\${t} 태그 포스팅 모아보기">\${t}</span>\`).join('')}`
  );

  // Add filterByTag, clearTagFilter, updateTagBanner JS functions & URL param check on load
  const tagJsFunctions = `
    function filterByTag(tag) {
      activeTagFilter = tag;
      const url = new URL(window.location);
      url.searchParams.set('tag', tag);
      window.history.pushState({}, '', url);
      renderCards();
      updateTagBanner();
    }

    function clearTagFilter() {
      activeTagFilter = null;
      const url = new URL(window.location);
      url.searchParams.delete('tag');
      window.history.pushState({}, '', url);
      renderCards();
      updateTagBanner();
    }

    function updateTagBanner() {
      let banner = document.getElementById('tagFilterBanner');
      const grid = document.getElementById('postitGrid');
      if (!banner && grid && grid.parentNode) {
        banner = document.createElement('div');
        banner.id = 'tagFilterBanner';
        banner.style.cssText = 'margin-bottom:14px; padding:8px 14px; background:#000000; color:#ffffff; font-size:12.5px; font-weight:700; display:flex; align-items:center; justify-content:space-between; border:2px solid #000; border-radius:3px; box-shadow:2px 2px 0 rgba(0,0,0,0.2);';
        grid.parentNode.insertBefore(banner, grid);
      }

      if (activeTagFilter && banner) {
        const filteredCount = getFilteredPostsCount();
        banner.style.display = 'flex';
        banner.innerHTML = \`<div>🏷️ 태그 필터링: <span style="background:#ffffff; color:#000000; padding:2px 8px; border-radius:3px; font-weight:800; margin-left:4px;">\${activeTagFilter}</span> (\${filteredCount}개 포스팅)</div>
          <button onclick="clearTagFilter();" style="background:#ffffff; color:#000000; border:1px solid #000000; padding:3px 10px; font-size:11.5px; font-weight:800; cursor:pointer; box-shadow:1px 1px 0 #000;">전체보기 ✕</button>\`;
      } else if (banner) {
        banner.style.display = 'none';
      }
    }

    function getFilteredPostsCount() {
      return POSTS_DATA.filter(post => {
        const matchesCategory = (currentCategory === 'all') || (post.category === currentCategory);
        const matchesSearch = !currentSearchQuery || 
          post.title.toLowerCase().includes(currentSearchQuery.toLowerCase()) || 
          post.excerpt.toLowerCase().includes(currentSearchQuery.toLowerCase()) || 
          post.tags.some(t => t.toLowerCase().includes(currentSearchQuery.toLowerCase()));
        const matchesBookmark = !showOnlyBookmarks || bookmarks.includes(post.id);
        const matchesTag = !activeTagFilter || post.tags.some(t => t.toLowerCase() === activeTagFilter.toLowerCase() || t.replace('#','').toLowerCase() === activeTagFilter.replace('#','').toLowerCase());
        return matchesCategory && matchesSearch && matchesBookmark && matchesTag;
      }).length;
    }
  `;

  if (!content.includes('function filterByTag(')) {
    content = content.replace(
      'function renderCards() {',
      `${tagJsFunctions}\n\n    function renderCards() {`
    );

    // Call updateTagBanner and check URL tag parameter on init
    content = content.replace(
      'renderCards();',
      `const urlParams = new URLSearchParams(window.location.search);
      const tagParam = urlParams.get('tag');
      if (tagParam) { activeTagFilter = tagParam; }
      renderCards();
      updateTagBanner();`
    );
  }

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('Implemented tag filtering on list page:', relPath);
});

// 2. UPDATE DETAIL PAGES (ux-blog/post-1/index.html ~ ux-blog/post-19/index.html)
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

postDetailFiles.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Replace tag pills in detail page with clickable links to list page tag filter
  content = content.replace(
    /<div class="tag-container">([\s\S]*?)<\/div>/g,
    (match, innerHtml) => {
      const tagSpanRegex = /<span class="tag-pill">([^<]+)<\/span>/g;
      let newInnerHtml = innerHtml.replace(tagSpanRegex, (m, tagText) => {
        return `<a href="/ux-blog/?tag=${encodeURIComponent(tagText)}" class="tag-pill" style="cursor:pointer; text-decoration:none; display:inline-block;" title="${tagText} 태그 포스팅 모아보기">${tagText}</a>`;
      });
      return `<div class="tag-container">${newInnerHtml}</div>`;
    }
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Made detail page tag pills clickable for:', path.relative(baseDir, filePath));
});

// Update generator script as well
const genScriptPath = path.join(__dirname, 'generate_standalone_post_pages.js');
if (fs.existsSync(genScriptPath)) {
  let content = fs.readFileSync(genScriptPath, 'utf8');
  content = content.replace(
    /\${post\.tags\.map\(t => `<span class="tag-pill">\${t}<\/span>`\)\.join\(''\)}/g,
    `\${post.tags.map(t => \`<a href="/ux-blog/?tag=\${encodeURIComponent(t)}" class="tag-pill" style="cursor:pointer; text-decoration:none; display:inline-block;" title="\${t} 태그 포스팅 모아보기">\${t}</a>\`).join('')}`
  );
  fs.writeFileSync(genScriptPath, content, 'utf8');
  console.log('Updated generate_standalone_post_pages.js tag pill links template');
}

console.log('TAG FILTERING FEATURE FULLY IMPLEMENTED ON LIST & DETAIL PAGES!');
