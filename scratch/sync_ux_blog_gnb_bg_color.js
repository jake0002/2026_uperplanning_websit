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

  // Replace --gnb-bg with rgba(0, 0, 0, 0.45)
  content = content.replace(/--gnb-bg:\s*rgba\(0,\s*0,\s*0,\s*0\.85\);?/g, '--gnb-bg: rgba(0, 0, 0, 0.45);');
  content = content.replace(/--gnb-bg:\s*rgba\(0,\s*0,\s*0,\s*0\.9\);?/g, '--gnb-bg: rgba(0, 0, 0, 0.45);');
  content = content.replace(/--gnb-bg:\s*#000000;?/g, '--gnb-bg: rgba(0, 0, 0, 0.45);');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated --gnb-bg to rgba(0, 0, 0, 0.45) in:', path.relative(baseDir, filePath));
});

// Update generator script as well
const genScriptPath = path.join(__dirname, 'generate_standalone_post_pages.js');
if (fs.existsSync(genScriptPath)) {
  let content = fs.readFileSync(genScriptPath, 'utf8');
  content = content.replace(/--gnb-bg:\s*rgba\(0,\s*0,\s*0,\s*0\.85\);?/g, '--gnb-bg: rgba(0, 0, 0, 0.45);');
  fs.writeFileSync(genScriptPath, content, 'utf8');
  console.log('Updated generate_standalone_post_pages.js --gnb-bg token');
}

console.log('ALL UX BLOG GNB BACKGROUND COLORS UPDATED TO UX-RESEARCH MATCH (rgba(0, 0, 0, 0.45))!');
