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

  // Replace <span>N. [Title]</span> with <span>[Title]</span>
  content = content.replace(/<span class="doc-icon">📄<\/span>\s*<span>\d+\.\s*/g, '<span class="doc-icon">📄</span> <span>');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Removed numberings from sidebar in:', path.relative(baseDir, filePath));
});

// Update generator script as well
const genScriptPath = path.join(__dirname, 'generate_standalone_post_pages.js');
if (fs.existsSync(genScriptPath)) {
  let content = fs.readFileSync(genScriptPath, 'utf8');
  content = content.replace(/<span>\${p\.id}\.\s*\${p\.title}<\/span>/g, '<span>${p.title}</span>');
  fs.writeFileSync(genScriptPath, content, 'utf8');
  console.log('Updated generate_standalone_post_pages.js sidebar template');
}

const syncToolbarScriptPath = path.join(__dirname, 'sync_post_pages_toolbar_exact.js');
if (fs.existsSync(syncToolbarScriptPath)) {
  let content = fs.readFileSync(syncToolbarScriptPath, 'utf8');
  content = content.replace(/<span>\${p\.id}\.\s*\${p\.title}<\/span>/g, '<span>${p.title}</span>');
  fs.writeFileSync(syncToolbarScriptPath, content, 'utf8');
  console.log('Updated sync_post_pages_toolbar_exact.js sidebar template');
}

console.log('ALL NUMBERINGS REMOVED FROM SIDEBAR TREE NAV IN ALL POST PAGES!');
