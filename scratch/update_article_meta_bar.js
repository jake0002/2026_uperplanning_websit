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

  // Replace article-meta-bar
  content = content.replace(
    /<div class="article-meta-bar">[\s\S]*?<\/div>/g,
    (match) => {
      // Extract readTime
      const readTimeMatch = match.match(/(\d+)초/);
      const readTime = readTimeMatch ? readTimeMatch[1] : '60';

      // Extract category badge
      const catMatch = match.match(/<span class="category-badge">([^<]+)<\/span>/);
      const category = catMatch ? catMatch[1] : 'UX리서치';

      return `<div class="article-meta-bar">
              <span class="category-badge">${category}</span>
              <span class="read-time-pill">${readTime}초 분량</span>
              <span style="font-size:12px; color:#777;">| 작성자: 슈퍼플래닝</span>
            </div>`;
    }
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated meta bar for:', path.relative(baseDir, filePath));
});

// Update generator script as well
const genScriptPath = path.join(__dirname, 'generate_standalone_post_pages.js');
if (fs.existsSync(genScriptPath)) {
  let content = fs.readFileSync(genScriptPath, 'utf8');
  content = content.replace(
    /<div class="article-meta-bar">[\s\S]*?<\/div>/g,
    `<div class="article-meta-bar">
              <span class="category-badge">\${post.category}</span>
              <span class="read-time-pill">\${post.readTime}초 분량</span>
              <span style="font-size:12px; color:#777;">| 작성자: 슈퍼플래닝</span>
            </div>`
  );
  fs.writeFileSync(genScriptPath, content, 'utf8');
  console.log('Updated generate_standalone_post_pages.js meta bar template');
}

console.log('ALL ARTICLE META BARS UPDATED SUCCESSFULLY!');
