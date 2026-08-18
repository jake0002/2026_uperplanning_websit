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
    // Skip main index.html since already updated
    return;
  }
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Replace progress bar background & shadows
  content = content.replace(
    /background:\s*linear-gradient\(90deg,\s*var\(--accent,\s*#ffd43b\)\s*0%,\s*#fff066\s*50%,\s*var\(--accent,\s*#ffd43b\)\s*100%\);/g,
    'background: #000000;'
  );

  content = content.replace(
    /box-shadow:\s*0\s+0\s+8px\s+rgba\(255,\s*212,\s*59,\s*0\.85\),\s*0\s+0\s+2px\s+rgba\(255,\s*255,\s*255,\s*0\.9\);/g,
    'box-shadow: 0 0 6px rgba(0, 0, 0, 0.8);'
  );

  content = content.replace(
    /box-shadow:\s*0\s+0\s+6px\s+var\(--accent,\s*#ffd43b\),\s*0\s+0\s+12px\s+var\(--accent,\s*#ffd43b\);/g,
    'box-shadow: 0 0 6px #000000;'
  );

  // Replace progress badge background, color, and border
  content = content.replace(
    /background:\s*rgba\(0,\s*0,\s*128,\s*0\.92\);/g,
    'background: #000000;'
  );

  content = content.replace(
    /color:\s*var\(--accent,\s*#ffd43b\);/g,
    'color: #ffffff;'
  );

  content = content.replace(
    /border:\s*1px\s+solid\s+var\(--accent,\s*#ffd43b\);/g,
    'border: 1px solid #ffffff;'
  );

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated progress bar on: ${file}`);
    updatedCount++;
  }
});

console.log(`Total subpages updated: ${updatedCount}`);
