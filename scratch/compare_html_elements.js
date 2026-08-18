const fs = require('fs');

const rHTML = fs.readFileSync('implementation/ux-research/index.html', 'utf8');
const aHTML = fs.readFileSync('implementation/ux-academy/index.html', 'utf8');

function getMainContent(html) {
  const start = html.indexOf('<main class="main-content-pane">');
  const end = html.indexOf('</main>');
  return start !== -1 && end !== -1 ? html.substring(start, end + 7) : '';
}

const rMain = getMainContent(rHTML);
const aMain = getMainContent(aHTML);

// Remove base64 data for readability
const cleanRMain = rMain.replace(/data:image\/[a-zA-Z]+;base64,[^"']+/g, '[BASE64]');
const cleanAMain = aMain.replace(/data:image\/[a-zA-Z]+;base64,[^"']+/g, '[BASE64]');

console.log('Research main length:', cleanRMain.length);
console.log('Academy main length:', cleanAMain.length);

// Extract tags & classes used in Research vs Academy
function getClassesAndTags(htmlStr) {
  const classMatches = htmlStr.match(/class="([^"]+)"/g) || [];
  const tagMatches = htmlStr.match(/<([a-z1-6]+)/gi) || [];
  const classes = new Set(classMatches.map(c => c.replace(/class="|"/g, '')));
  const tags = new Set(tagMatches.map(t => t.replace('<', '').toLowerCase()));
  return { classes: Array.from(classes), tags: Array.from(tags) };
}

const rInfo = getClassesAndTags(cleanRMain);
const aInfo = getClassesAndTags(cleanAMain);

console.log('\n=== Classes in Research main content ===');
console.log(rInfo.classes);

console.log('\n=== Classes in Academy main content ===');
console.log(aInfo.classes);
