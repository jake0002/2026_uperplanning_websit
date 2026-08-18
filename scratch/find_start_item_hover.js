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
  const html = fs.readFileSync(f, 'utf8');
  const rel = path.relative(dir, f);
  const matches = html.split('\n').filter(l => l.includes('.start-item:hover'));
  if (matches.length > 0) {
    console.log(rel + ':');
    matches.forEach(m => console.log('  ' + m.trim()));
  }
});
