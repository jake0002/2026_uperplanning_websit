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

  content = content.replace(
    'placeholder="블로그 검색어 입력..."',
    'placeholder="검색어 입력"'
  );

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('Updated search placeholder in:', f);
});
