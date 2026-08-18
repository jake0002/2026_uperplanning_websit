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

const allHtmlFiles = getFiles(baseDir);

allHtmlFiles.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Replace any button containing <span>포트폴리오 보기</span> to have onclick="openWindow('brochure');"
  content = content.replace(
    /<button class="w95-btn" style="padding:2px 8px; font-size:11px;"[^>]*>\s*<span>포트폴리오 보기<\/span>\s*<\/button>/g,
    '<button class="w95-btn" style="padding:2px 8px; font-size:11px;" onclick="openWindow(\'brochure\');"><span>포트폴리오 보기</span></button>'
  );

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('EXACT GNB PORTFOLIO BUTTON ONCLICK SET TO openWindow("brochure")!');
