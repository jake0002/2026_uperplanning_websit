const fs = require('fs');

const masterPath = 'implementation/ux-academy/index.html';
const aliasPath1 = 'implementation/ux-academy.html';
const aliasPath2 = 'implementation/ux_academy.html';

let html = fs.readFileSync(masterPath, 'utf8');

const oldTitle = `<h3 class="curriculum-note-title">💡 커리큘럼 추가 혜택 &amp; 안내</h3>`;
const newTitle = `<h3 class="curriculum-note-title">커리큘럼 추가 혜택 &amp; 안내</h3>`;

if (html.includes(oldTitle)) {
  html = html.replace(oldTitle, newTitle);
} else {
  console.log('Trying regex replace for title emoji...');
  html = html.replace(/<h3 class="curriculum-note-title">.*?커리큘럼 추가 혜택 &amp; 안내<\/h3>/g, newTitle);
}

fs.writeFileSync(masterPath, html, 'utf8');
console.log('Updated:', masterPath);

fs.writeFileSync(aliasPath1, html, 'utf8');
console.log('Updated:', aliasPath1);

fs.writeFileSync(aliasPath2, html, 'utf8');
console.log('Updated:', aliasPath2);
