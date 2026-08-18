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

targetHtmlFiles.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Change --bg: #008080 to --bg: #ffffff
  content = content.replace(/--bg:\s*#008080;/g, '--bg: #ffffff;');
  content = content.replace(/--bg:\s*#008080/g, '--bg: #ffffff');

  // Change background-color: var(--bg); or background-color: #008080;
  content = content.replace(/background-color:\s*#008080;/g, 'background-color: #ffffff;');
  content = content.replace(/background:\s*#008080;/g, 'background: #ffffff;');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated background color to white in:', path.relative(baseDir, filePath));
});

// Update generator scripts as well
const genScriptPath = path.join(__dirname, 'generate_standalone_post_pages.js');
if (fs.existsSync(genScriptPath)) {
  let content = fs.readFileSync(genScriptPath, 'utf8');
  content = content.replace(/--bg:\s*#008080;/g, '--bg: #ffffff;');
  fs.writeFileSync(genScriptPath, content, 'utf8');
  console.log('Updated generate_standalone_post_pages.js to white background token');
}

const syncSkinScriptPath = path.join(__dirname, 'sync_ux_blog_skin.js');
if (fs.existsSync(syncSkinScriptPath)) {
  let content = fs.readFileSync(syncSkinScriptPath, 'utf8');
  content = content.replace(/--bg:\s*#008080;/g, '--bg: #ffffff;');
  fs.writeFileSync(syncSkinScriptPath, content, 'utf8');
  console.log('Updated sync_ux_blog_skin.js to white background token');
}

console.log('ALL UX BLOG BACKGROUND COLOURS UPDATED TO WHITE (#ffffff)!');
