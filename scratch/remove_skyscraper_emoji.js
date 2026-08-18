const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'implementation');
const files = [];

function scanDir(d) {
  const list = fs.readdirSync(d);
  list.forEach(item => {
    const full = path.join(d, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      scanDir(full);
    } else if (item.endsWith('.html')) {
      files.push(full);
    }
  });
}

scanDir(dir);

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;

  content = content.replace(/📬 UX프로젝트 문의/g, 'UX프로젝트 문의');
  content = content.replace(/📬 UX Project Inquiry/g, 'UX Project Inquiry');

  if (content !== original) {
    fs.writeFileSync(f, content, 'utf8');
    console.log('Removed skyscraper title emoji in:', path.relative(dir, f));
  }
});
