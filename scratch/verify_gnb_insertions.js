const fs = require('fs');

const mainHtml = fs.readFileSync('implementation/index.html', 'utf8');
const designHtml = fs.readFileSync('implementation/ux_design/index.html', 'utf8');

function showGnbRight(html, title) {
    console.log(`\n=== ${title} gnb-right ===`);
    let idx = html.indexOf('<div class="gnb-right">');
    if (idx !== -1) {
        console.log(html.substring(idx, idx + 600));
    }
}

function showStartMenuCompany(html, title) {
    console.log(`\n=== ${title} startMenu company ===`);
    let idx = html.indexOf('회사소개');
    while (idx !== -1) {
        let snippet = html.substring(Math.max(0, idx - 100), idx + 200);
        if (snippet.includes('start-item')) {
            console.log(snippet);
        }
        idx = html.indexOf('회사소개', idx + 1);
    }
}

showGnbRight(mainHtml, 'MAIN index.html');
showGnbRight(designHtml, 'UX DESIGN index.html');

showStartMenuCompany(mainHtml, 'MAIN index.html');
showStartMenuCompany(designHtml, 'UX DESIGN index.html');
