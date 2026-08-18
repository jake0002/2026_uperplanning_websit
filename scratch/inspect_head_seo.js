const fs = require('fs');
const content = fs.readFileSync('implementation/ux_design/index.html', 'utf8');
const headEnd = content.indexOf('</head>');
if (headEnd !== -1) {
    console.log(content.substring(0, Math.min(headEnd, 2000)));
}
