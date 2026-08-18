const fs = require('fs');

const uxResearch = fs.readFileSync('implementation/ux_research/index.html', 'utf8');
const contact = fs.readFileSync('implementation/contact/index.html', 'utf8');

function getStyle(html) {
    let s = html.indexOf('<style>');
    let e = html.indexOf('</style>');
    return html.substring(s, e + 8);
}

const uxStyle = getStyle(uxResearch);
const contactStyle = getStyle(contact);

console.log('Styles match 100%:', uxStyle === contactStyle);
console.log('UX Research style length:', uxStyle.length);
console.log('Contact style length:', contactStyle.length);
