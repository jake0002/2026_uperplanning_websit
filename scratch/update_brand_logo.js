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
    // Skip index.html since we manually edited it perfectly
    return;
  }
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Replace CSS for #brandLogo
  content = content.replace(
    /padding:\s*4px\s+14px;/g,
    'padding: 4px 18px;\n      min-width: 68px;\n      justify-content: center;'
  );

  content = content.replace(
    /box-shadow:\s*inset\s+1px\s+1px\s+0\s+#fff,\s*inset\s+-1px\s+-1px\s+0\s+#7b7b7b/g,
    'box-shadow: inset 1px 1px 0 #333, inset -1px -1px 0 #111'
  );

  content = content.replace(
    /#brandLogo:active\s*\{\s*transform:\s*scale\(0\.96\);\s*box-shadow:\s*inset\s+1px\s+1px\s+0\s+#7b7b7b;\s*\}/g,
    '#brandLogo:active { transform: scale(0.96); box-shadow: inset 1px 1px 0 #111; }'
  );

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated subpage: ${file}`);
    updatedCount++;
  }
});

console.log(`Total subpages updated: ${updatedCount}`);
