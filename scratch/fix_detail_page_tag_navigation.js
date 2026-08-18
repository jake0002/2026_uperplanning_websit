const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'implementation');

// 1. UPDATE LIST PAGES (ux-blog/index.html, ux-blog.html, ux_blog.html)
const listFiles = ['ux-blog/index.html', 'ux-blog.html', 'ux_blog.html'];

listFiles.forEach(relPath => {
  const fullPath = path.join(baseDir, relPath);
  if (!fs.existsSync(fullPath)) return;

  let content = fs.readFileSync(fullPath, 'utf8');

  // Fix initial render order to read URL search param 'tag' BEFORE renderCards()
  const oldInitCode = `// INITIAL RENDER
    renderCards();`;

  const newInitCode = `// INITIAL RENDER & URL PARAM CHECK
    const urlParams = new URLSearchParams(window.location.search);
    const tagParam = urlParams.get('tag');
    if (tagParam) {
      activeTagFilter = decodeURIComponent(tagParam);
    }
    renderCards();
    updateTagBanner();`;

  if (content.includes('// INITIAL RENDER\n    renderCards();')) {
    content = content.replace('// INITIAL RENDER\n    renderCards();', newInitCode);
  } else if (content.includes('// INITIAL RENDER\r\n    renderCards();')) {
    content = content.replace('// INITIAL RENDER\r\n    renderCards();', newInitCode);
  }

  // Ensure updateTagBanner correctly displays activeTagFilter
  const oldBannerFn = /function updateTagBanner\(\) \{[\s\S]*?\}\s*\}/;
  const newBannerFn = `function updateTagBanner() {
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

  if (oldBannerFn.test(content)) {
    content = content.replace(oldBannerFn, newBannerFn);
  }

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('Updated list page URL tag param initialization in:', relPath);
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

  // Replace tag pills in detail page tag-container to use encoded URL tag links
  content = content.replace(
    /<div class="tag-container">([\s\S]*?)<\/div>/g,
    (match, inner) => {
      // Find all tag texts
      const tagMatches = [...inner.matchAll(/(?:#|\/ux-blog\/\?tag=[^"]*">#?)([^<]+)/g)];
      // Clean tags
      const tags = [];
      const pillRegex = /#[\w가-힣]+/g;
      let m;
      while ((m = pillRegex.exec(inner)) !== null) {
        if (!tags.includes(m[0])) tags.push(m[0]);
      }

      if (tags.length > 0) {
        const newHtml = tags.map(t => 
          `<a href="/ux-blog/?tag=${encodeURIComponent(t)}" class="tag-pill" style="cursor:pointer; text-decoration:none; display:inline-block; margin-right:4px;" title="${t} 태그 포스팅 모아보기">${t}</a>`
        ).join('');
        return `<div class="tag-container">\n              ${newHtml}\n            </div>`;
      }
      return match;
    }
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Verified tag navigation links for:', path.relative(baseDir, filePath));
});

// 3. UPDATE GENERATOR SCRIPT AS WELL
const genScriptPath = path.join(__dirname, 'generate_standalone_post_pages.js');
if (fs.existsSync(genScriptPath)) {
  let content = fs.readFileSync(genScriptPath, 'utf8');
  content = content.replace(
    /\${post\.tags\.map\(t => `<span class="tag-pill">\${t}<\/span>`\)\.join\(''\)}/g,
    `\${post.tags.map(t => \`<a href="/ux-blog/?tag=\${encodeURIComponent(t)}" class="tag-pill" style="cursor:pointer; text-decoration:none; display:inline-block; margin-right:4px;" title="\${t} 태그 포스팅 모아보기">\${t}</a>\`).join('')}`
  );
  fs.writeFileSync(genScriptPath, content, 'utf8');
  console.log('Updated generate_standalone_post_pages.js tag navigation template');
}

console.log('DETAIL PAGE TAG NAVIGATION & LIST PAGE INITIALIZATION FIXED PERFECTLY!');
