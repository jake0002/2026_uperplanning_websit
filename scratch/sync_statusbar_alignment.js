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

const targetHtmlFiles = [
  path.join(baseDir, 'ux-blog.html'),
  path.join(baseDir, 'ux_blog.html'),
  ...getFiles(path.join(baseDir, 'ux-blog'))
];

const newStatusbarCss = `    .statusbar {
      background: #dcdcdc;
      border-top: 2px solid #ffffff;
      padding: 4px 12px;
      font-size: 11px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #333333;
      user-select: none;
    }`;

targetHtmlFiles.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Replace .statusbar CSS rule
  content = content.replace(
    /\.statusbar\s*\{[^}]*\}/g,
    newStatusbarCss.trim()
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Synchronized statusbar justify-content: space-between in:', path.relative(baseDir, filePath));
});

// Update generator scripts as well
const genScriptPath = path.join(__dirname, 'generate_standalone_post_pages.js');
if (fs.existsSync(genScriptPath)) {
  let content = fs.readFileSync(genScriptPath, 'utf8');
  content = content.replace(
    /\.statusbar\s*\{[^}]*\}/g,
    newStatusbarCss.trim()
  );
  fs.writeFileSync(genScriptPath, content, 'utf8');
  console.log('Updated generate_standalone_post_pages.js statusbar template');
}

const syncSkinScriptPath = path.join(__dirname, 'sync_ux_blog_skin.js');
if (fs.existsSync(syncSkinScriptPath)) {
  let content = fs.readFileSync(syncSkinScriptPath, 'utf8');
  content = content.replace(
    /\.statusbar\s*\{[^}]*\}/g,
    newStatusbarCss.trim()
  );
  fs.writeFileSync(syncSkinScriptPath, content, 'utf8');
  console.log('Updated sync_ux_blog_skin.js statusbar template');
}

console.log('ALL STATUSBAR ALIGNMENTS SYNCHRONIZED TO UX-RESEARCH MATCH (JUSTIFY-CONTENT: SPACE-BETWEEN)!');
