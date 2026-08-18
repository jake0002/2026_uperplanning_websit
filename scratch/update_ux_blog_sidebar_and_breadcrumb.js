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

  // 1. Remove <div class="blog-breadcrumb">홈 &gt; UX서비스 &gt; UX블로그</div>
  content = content.replace(/<div class="blog-breadcrumb">[\s\S]*?<\/div>/g, '');

  // 2. Update .tree-item a CSS from justify-content: space-between to flex-start / left align
  content = content.replace(
    'justify-content: space-between;',
    'justify-content: flex-start;'
  );

  // 3. Make badge-count have a small left margin when next to left aligned text
  content = content.replace(
    '.badge-count {',
    '.badge-count { margin-left: 4px;'
  );

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('Updated breadcrumb and sidebar left alignment in:', f);
});
