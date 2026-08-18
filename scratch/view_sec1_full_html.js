const fs = require('fs');
const html = fs.readFileSync('implementation/ux-academy/index.html', 'utf8');

const introIdx = html.indexOf('<h2 id="intro">');
const nextH2Idx = html.indexOf('<h2 id="reviews">');
const section1 = html.substring(introIdx, nextH2Idx);

const cleanSec1 = section1.replace(/data:image\/[a-zA-Z]+;base64,[^"']+/g, '[BASE64_DATA]');
console.log(cleanSec1);
