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
    'C:SUPERPLANNINGUX_서비스UX_블로그',
    'C:\\SUPERPLANNING\\UX_서비스\\UX_블로그'
  );

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('Fixed address bar slashes in:', f);
});
