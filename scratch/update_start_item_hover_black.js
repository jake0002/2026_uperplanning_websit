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

  content = content.replace(/\.start-item:hover\s*\{\s*background:\s*#000080;\s*color:\s*#ffffff;\s*\}/g, '.start-item:hover { background: #000000; color: #ffffff; }');
  content = content.replace(/background:\s*#000080;\s*color:\s*#ffffff;/g, (match, offset, fullStr) => {
    // Only replace if near start-item:hover
    const sub = fullStr.substring(Math.max(0, offset - 30), offset);
    if (sub.includes('start-item')) {
      return 'background: #000000; color: #ffffff;';
    }
    return match;
  });

  if (content !== original) {
    fs.writeFileSync(f, content, 'utf8');
    console.log('Updated start-item hover to black in:', path.relative(dir, f));
  }
});
