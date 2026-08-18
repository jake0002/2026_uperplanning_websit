const fs = require('fs');
const content = fs.readFileSync('implementation/ux_research/index.html', 'utf8');

// Find the FAQ text line
let idx = content.indexOf('찾아오시는 길 및 문의 페이지를 통해 서비스 현황과 목표를 남겨주시면 10분 이내로');
console.log('Found at idx:', idx);
if (idx !== -1) {
    console.log('Context:');
    console.log(content.substring(idx - 100, idx + 300));
}

// Find JSON-LD version
let idx2 = content.indexOf('"text": "찾아오시는');
console.log('\nJSON-LD Found at idx:', idx2);
if (idx2 !== -1) {
    console.log(content.substring(idx2 - 10, idx2 + 200));
}
