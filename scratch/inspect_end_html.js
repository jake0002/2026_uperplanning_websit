const fs = require('fs');
const content = fs.readFileSync('implementation/ux_design/index.html', 'utf8');
console.log(content.substring(content.length - 1500));
