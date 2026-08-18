const fs = require('fs');

const rText = fs.readFileSync('implementation/ux-research/index.html', 'utf8');
const cText = fs.readFileSync('implementation/ux-company/index.html', 'utf8');

console.log('=== UX-RESEARCH main-content-pane CSS ===');
const rPaneMatch = rText.match(/\.main-content-pane\s*\{[\s\S]*?\}/);
console.log(rPaneMatch ? rPaneMatch[0] : 'NONE');

console.log('=== UX-COMPANY main-content-pane CSS ===');
const cPaneMatch = cText.match(/\.main-content-pane\s*\{[\s\S]*?\}/);
console.log(cPaneMatch ? cPaneMatch[0] : 'NONE');

console.log('=== UX-RESEARCH html/body overflow CSS ===');
const rBodyMatch = rText.match(/body\s*\{[\s\S]*?\}/);
console.log(rBodyMatch ? rBodyMatch[0] : 'NONE');

console.log('=== UX-COMPANY html/body overflow CSS ===');
const cBodyMatch = cText.match(/body\s*\{[\s\S]*?\}/);
console.log(cBodyMatch ? cBodyMatch[0] : 'NONE');
