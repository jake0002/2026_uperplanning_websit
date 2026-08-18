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
  let changed = false;

  if (content.includes('회사소개서 뷰어')) {
    content = content.replace(/📄 회사소개서 뷰어/g, '📄 포트폴리오 보기');
    content = content.replace(/슈퍼플래닝 회사소개서 뷰어/g, '슈퍼플래닝 포트폴리오 보기');
    content = content.replace(/회사소개서 뷰어/g, '포트폴리오 보기');
    changed = true;
  }

  if (content.includes('Superplanning Company Brochure Viewer')) {
    content = content.replace(/Superplanning Company Brochure Viewer/g, 'Superplanning Portfolio Viewer');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated portfolio viewer title in:', path.relative(baseDir, filePath));
  }
});

console.log('ALL PORTFOLIO VIEWER TITLES UPDATED TO "포트폴리오 보기"!');
