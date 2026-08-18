const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'implementation');

// Find all HTML files under ux-blog/
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

const allBlogHtmlFiles = [
  path.join(baseDir, 'ux-blog.html'),
  path.join(baseDir, 'ux_blog.html'),
  ...getFiles(path.join(baseDir, 'ux-blog'))
];

const cssRuleToInject = `
    .titlebar-controls {
      display: flex !important;
      flex-direction: row !important;
      align-items: center !important;
      gap: 3px !important;
    }
`;

allBlogHtmlFiles.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // If .titlebar-controls is not present in <style>, inject it
  if (!content.includes('.titlebar-controls {') && !content.includes('.titlebar-controls{')) {
    content = content.replace(
      '.titlebar-text { display: flex; align-items: center; gap: 6px; }',
      `.titlebar-text { display: flex; align-items: center; gap: 6px; }\n${cssRuleToInject}`
    );

    content = content.replace(
      '.titlebar-text {',
      `${cssRuleToInject}\n    .titlebar-text {`
    );
  } else {
    // Ensure it has display: flex !important; flex-direction: row !important;
    content = content.replace(
      /\.titlebar-controls\s*\{[^}]*\}/g,
      `.titlebar-controls { display: flex !important; flex-direction: row !important; align-items: center !important; gap: 3px !important; }`
    );
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed horizontal titlebar controls in:', path.relative(baseDir, filePath));
});
