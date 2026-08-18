const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..', 'implementation');

function getAllHtmlFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getAllHtmlFiles(filePath));
        } else if (file.endsWith('.html')) {
            results.push(filePath);
        }
    });
    return results;
}

const faviconTags = `  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="shortcut icon" href="/favicon.ico">`;

const htmlFiles = getAllHtmlFiles(baseDir);
let updatedCount = 0;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Remove existing favicon link lines
    content = content.replace(/^[ \t]*<link\s+rel=["'](?:shortcut icon|icon|apple-touch-icon)["'].*?>\r?\n?/gmi, '');
    
    // Check if favicon comment already exists and clean it up
    content = content.replace(/^[ \t]*<!-- Favicon -->\r?\n?/gmi, '');

    // Insert favicon tags in <head>
    if (content.includes('<meta name="viewport"')) {
        content = content.replace(/(<meta name="viewport"[^>]*>)/i, `$1\n${faviconTags}`);
        fs.writeFileSync(file, content, 'utf8');
        updatedCount++;
    } else if (content.includes('<head>')) {
        content = content.replace(/(<head>)/i, `$1\n${faviconTags}`);
        fs.writeFileSync(file, content, 'utf8');
        updatedCount++;
    }
});

console.log(`Updated ${updatedCount} HTML files with favicon tags.`);
