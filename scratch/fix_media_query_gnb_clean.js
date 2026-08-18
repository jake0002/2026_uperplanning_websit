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

  // Replace full #gnb rule inside @media (max-width: 900px) back to #gnb { left: 14px; }
  content = content.replace(
    /@media\s*\([^)]*900px[^)]*\)\s*\{\s*#gnb\s*\{[^}]*overflow:\s*visible[^}]*\}\s*/g,
    '@media (max-width: 900px) {\n      #gnb { left: 14px; }\n'
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed media query #gnb for:', path.relative(baseDir, filePath));
});

// Generator script
const genScriptPath = path.join(__dirname, 'generate_standalone_post_pages.js');
if (fs.existsSync(genScriptPath)) {
  let content = fs.readFileSync(genScriptPath, 'utf8');
  content = content.replace(
    /@media\s*\([^)]*900px[^)]*\)\s*\{\s*#gnb\s*\{[^}]*overflow:\s*visible[^}]*\}\s*/g,
    '@media (max-width: 900px) {\n      #gnb { left: 14px; }\n'
  );
  fs.writeFileSync(genScriptPath, content, 'utf8');
  console.log('Fixed media query #gnb in generator script');
}

console.log('MEDIA QUERY FIX COMPLETED!');
