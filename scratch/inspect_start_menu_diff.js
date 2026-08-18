const fs = require('fs');

const mainHtml = fs.readFileSync('implementation/index.html', 'utf8');
const subHtml = fs.readFileSync('implementation/ux_design/index.html', 'utf8');

function getStartMenuElement(html) {
    let idx = html.indexOf('id="startMenu"');
    if (idx !== -1) {
        let start = html.lastIndexOf('<div', idx);
        return html.substring(start, start + 3000);
    }
    return 'NOT FOUND';
}

function getToggleStartMenuFunc(html) {
    let idx = html.indexOf('function toggleStartMenu()');
    if (idx !== -1) {
        return html.substring(idx, idx + 800);
    }
    return 'NOT FOUND';
}

console.log('=== MAIN INDEX.HTML startMenu DOM ===');
console.log(getStartMenuElement(mainHtml).substring(0, 1000));

console.log('\n=== SUBPAGE ux_design/index.html startMenu DOM ===');
console.log(getStartMenuElement(subHtml).substring(0, 1000));

console.log('\n=== MAIN INDEX.HTML toggleStartMenu() ===');
console.log(getToggleStartMenuFunc(mainHtml));

console.log('\n=== SUBPAGE ux_design/index.html toggleStartMenu() ===');
console.log(getToggleStartMenuFunc(subHtml));
