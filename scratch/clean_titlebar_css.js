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

const allBlogHtmlFiles = [
  path.join(baseDir, 'ux-blog.html'),
  path.join(baseDir, 'ux_blog.html'),
  ...getFiles(path.join(baseDir, 'ux-blog'))
];

allBlogHtmlFiles.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Remove duplicate .titlebar-controls blocks
  content = content.replace(
    /\.titlebar-controls\s*\{[^}]*\}\s*/g,
    ''
  );

  // Insert single clean block right after .titlebar-text
  content = content.replace(
    /\.titlebar-text\s*\{[^}]*\}/g,
    `.titlebar-text { display: flex; align-items: center; gap: 6px; }\n    .titlebar-controls { display: flex; flex-direction: row; align-items: center; gap: 3px; }`
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Cleaned titlebar controls CSS in:', path.relative(baseDir, filePath));
});
