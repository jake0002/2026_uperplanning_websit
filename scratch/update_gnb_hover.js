const fs = require('fs');
const path = require('path');

function getAllHtmlFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);
  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllHtmlFiles(filePath, arrayOfFiles);
    } else if (file.endsWith('.html')) {
      arrayOfFiles.push(filePath);
    }
  });
  return arrayOfFiles;
}

const implDir = path.join(__dirname, '..', 'implementation');
const htmlFiles = getAllHtmlFiles(implDir);

let updatedCount = 0;

htmlFiles.forEach(file => {
  if (file.endsWith('index.html') && file.includes('implementation\\index.html')) {
    // Skip index.html as we edited it already
    return;
  }
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  const newRule = `    .gnb-link:hover,
    .gnb-link:active,
    .gnb-link.active {
      background: #000000 !important;
      color: #ffffff !important;
    }
    .gnb-link:hover span,
    .gnb-link:active span,
    .gnb-link.active span {
      color: #ffffff !important;
    }`;

  content = content.replace(
    /\.gnb-link:hover,\s*\.gnb-link\.active\s*\{\s*background:\s*rgba\(255,\s*255,\s*255,\s*0\.25\);\s*color:\s*var\(--accent\);\s*\}/g,
    newRule
  );

  content = content.replace(
    /\.gnb-link:hover\s*\{\s*background:\s*rgba\(255,\s*255,\s*255,\s*0\.25\);\s*color:\s*var\(--accent\);\s*\}/g,
    newRule
  );

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated GNB hover on subpage: ${file}`);
    updatedCount++;
  }
});

console.log(`Total subpages updated: ${updatedCount}`);
