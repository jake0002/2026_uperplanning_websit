const fs = require('fs');
const path = require('path');

const listFiles = [
  'ux-blog/index.html',
  'ux-blog.html',
  'ux_blog.html'
];

const baseDir = path.join(__dirname, '..', 'implementation');

listFiles.forEach(relPath => {
  const fullPath = path.join(baseDir, relPath);
  if (!fs.existsSync(fullPath)) return;

  let content = fs.readFileSync(fullPath, 'utf8');

  // 1. Ensure CSS for .tag-pill.active-tag exists
  if (!content.includes('.tag-pill.active-tag')) {
    content = content.replace(
      '.tag-pill {',
      '.tag-pill.active-tag { background: #000000 !important; color: #ffffff !important; }\n    .tag-pill {'
    );
  }

  // 2. Ensure activeTagFilter is defined
  if (!content.includes('let activeTagFilter = null;')) {
    content = content.replace(
      "let currentCategory = 'all';",
      "let currentCategory = 'all';\n    let activeTagFilter = null;"
    );
  }

  // 3. Replace renderCards filter section to check activeTagFilter properly
  const renderCardsPattern = /function renderCards\(\) \{[\s\S]*?let filtered = POSTS_DATA\.filter\(post => \{[\s\S]*?return true;\s*\}\);/;

  const newRenderCardsFilter = `function renderCards() {
      let filtered = POSTS_DATA.filter(post => {
        // Category Filter
        if (currentCategory === 'bookmark') {
          if (!bookmarks.includes(post.id)) return false;
        } else if (currentCategory !== 'all') {
          if (post.category !== currentCategory) return false;
        }

        // Search Filter
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchTitle = post.title.toLowerCase().includes(q);
          const matchExcerpt = post.excerpt.toLowerCase().includes(q);
          const matchCategory = post.category.toLowerCase().includes(q);
          const matchTags = post.tags.some(t => t.toLowerCase().includes(q));
          if (!matchTitle && !matchExcerpt && !matchCategory && !matchTags) return false;
        }

        // Tag Filter
        if (activeTagFilter) {
          const normFilter = activeTagFilter.replace('#', '').toLowerCase();
          const hasTag = post.tags.some(t => t.replace('#', '').toLowerCase() === normFilter);
          if (!hasTag) return false;
        }

        return true;
      });`;

  content = content.replace(renderCardsPattern, newRenderCardsFilter);

  // 4. Update postit-body onclick & postit-tags mapping
  content = content.replace(
    /onclick="if \(!event\.target\.closest\('\.icon-action-btn'\)\) location\.href/g,
    "onclick=\"if (!event.target.closest('.icon-action-btn') && !event.target.closest('.tag-pill')) location.href"
  );

  content = content.replace(
    /\${post\.tags\.map\(t => `<span class="tag-pill"[^>]*>\${t}<\/span>`\)\.join\(''\)}/g,
    `\${post.tags.map(t => {
                const isActive = activeTagFilter && (t.replace('#','').toLowerCase() === activeTagFilter.replace('#','').toLowerCase());
                return \`<span class="tag-pill \${isActive ? 'active-tag' : ''}" onclick="event.stopPropagation(); filterByTag('\${t}');" style="cursor:pointer;" title="\${t} 태그 포스팅 모아보기">\${t}</span>\`;
              }).join('')}`
  );

  // 5. Update filterByTag, clearTagFilter, updateTagBanner JS functions
  const tagFunctionsPattern = /function filterByTag\([^)]*\) \{[\s\S]*?function getFilteredPostsCount\(\) \{[\s\S]*?\}\s*\}/;

  const newTagFunctions = `function filterByTag(tag) {
      if (activeTagFilter === tag) {
        clearTagFilter();
        return;
      }
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
        const filteredCount = document.querySelectorAll('.postit-card').length;
        banner.style.display = 'flex';
        banner.innerHTML = \`<div>🏷️ 태그 필터링 중: <span style="background:#ffffff; color:#000000; padding:2px 8px; border-radius:3px; font-weight:800; margin-left:4px;">\${activeTagFilter}</span> (\${filteredCount}개 포스팅)</div>
          <button onclick="clearTagFilter();" style="background:#ffffff; color:#000000; border:1px solid #000000; padding:3px 10px; font-size:11.5px; font-weight:800; cursor:pointer; box-shadow:1px 1px 0 #000;">전체보기 ✕</button>\`;
      } else if (banner) {
        banner.style.display = 'none';
      }
    }`;

  if (tagFunctionsPattern.test(content)) {
    content = content.replace(tagFunctionsPattern, newTagFunctions);
  }

  // 6. Ensure tagParam check on init
  if (!content.includes('const tagParam = urlParams.get(\'tag\');')) {
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
  console.log('Fixed tag filtering on list page:', relPath);
});

console.log('LIST PAGE TAG FILTERING FIX COMPLETED!');
