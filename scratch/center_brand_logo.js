const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'implementation', 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

content = content.replace(
  /justify-content:\s*flex-start;/g,
  'justify-content: center;'
);

fs.writeFileSync(indexPath, content, 'utf8');
console.log('Successfully updated logo alignment to center in index.html!');
