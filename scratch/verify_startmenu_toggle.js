const fs = require('fs');
const content = fs.readFileSync('implementation/ux_design/index.html', 'utf8');

console.log('has #startMenu:', content.includes('id="startMenu"'));
console.log('has #startBtn:', content.includes('id="startBtn"'));
console.log('has toggleStartMenu:', content.includes('toggleStartMenu'));

let idx = content.indexOf('function toggleStartMenu()');
if (idx !== -1) {
    console.log('\n--- JS Function ---');
    console.log(content.substring(idx, idx + 400));
}
