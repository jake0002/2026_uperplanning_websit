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

postDetailFiles.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Fix duplicate </div> </div> around #gnb
  content = content.replace(
    /<\/div>\s*<\/div>\s*<div id="mobileNavDrawer">/g,
    '</div>\n\n  <div id="mobileNavDrawer">'
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed duplicate closing div for:', path.relative(baseDir, filePath));
});
