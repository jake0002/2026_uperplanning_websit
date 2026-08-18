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

const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/u;

files.forEach(f => {
  const html = fs.readFileSync(f, 'utf8');
  const rel = path.relative(dir, f);
  const lines = html.split('\n');
  lines.forEach((line, idx) => {
    if ((line.includes('<button') || line.includes('w95-btn') || line.includes('gnb-right')) && emojiRegex.test(line)) {
      console.log(`${rel}:${idx+1} -> ${line.trim()}`);
    }
  });
});
