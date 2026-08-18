const fs = require('fs');

const content = fs.readFileSync('implementation/ux_writing/index.html', 'utf8');

console.log('=== TREE SIDEBAR ===');
let treeIdx = content.indexOf('class="tree-sidebar"');
if (treeIdx !== -1) {
    console.log(content.substring(treeIdx, treeIdx + 800));
}

console.log('\n=== MAIN CONTENT PANE ===');
let mainIdx = content.indexOf('class="main-content-pane"');
if (mainIdx !== -1) {
    console.log(content.substring(mainIdx, mainIdx + 600));
}
