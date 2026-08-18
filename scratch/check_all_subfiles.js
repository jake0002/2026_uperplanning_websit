const fs = require('fs');
const path = require('path');

function getAllHtmlFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(function(file) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllHtmlFiles(fullPath, arrayOfFiles);
    } else {
      if (file.endsWith('.html')) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

const allHtmls = getAllHtmlFiles('implementation');
console.log('All HTML files in implementation:');
allHtmls.forEach(f => {
  const text = fs.readFileSync(f, 'utf8');
  const hasNavyCss = text.includes('.titlebar {\n background: #000080') || text.includes('.titlebar {\n      background: #000080') || text.includes('background: #000080;') || text.includes('background:#000080;');
  const titleMatch = text.match(/<div class=["']titlebar-text["']>([\s\S]*?)<\/div>/);
  const titleText = titleMatch ? titleMatch[1].replace(/\s+/g, ' ').trim() : 'NO MATCH';

  console.log(`${f} => Title: "${titleText}", Has #000080: ${hasNavyCss}`);
});
