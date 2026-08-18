const fs = require('fs');
const content = fs.readFileSync('implementation/ux_research/index.html', 'utf8');
let idx = content.indexOf('id="startMenu"');
if (idx !== -1) {
    let start = content.lastIndexOf('<div', idx);
    let end = content.indexOf('<!-- TASKBAR', start);
    if (end === -1) end = content.indexOf('<div id="taskbar"', start);
    console.log(content.substring(start, end));
}
