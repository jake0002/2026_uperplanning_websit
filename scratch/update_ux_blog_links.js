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

  // Replace openWindow('blog'); with location.href='/ux-blog/';
  content = content.replace(/openWindow\('blog'\);?/g, "location.href='/ux-blog/';");

  // Replace GNB href="https://superplanning.blog/#blog" with href="/ux-blog/"
  content = content.replace(/href="https:\/\/superplanning\.blog\/#blog"/g, 'href="/ux-blog/"');

  // Replace GNB href="/blog" with href="/ux-blog/"
  content = content.replace(/href="\/blog\/"?/g, 'href="/ux-blog/"');

  if (content !== original) {
    fs.writeFileSync(f, content, 'utf8');
    console.log('Updated UX blog link in:', path.relative(dir, f));
  }
});
