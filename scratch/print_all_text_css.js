const fs = require('fs');

const rHTML = fs.readFileSync('implementation/ux-research/index.html', 'utf8');

const m = rHTML.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
const rCSS = m ? m.join('\n') : '';

// Print root variables and typography / box rules
const rules = rCSS.split('}');
rules.forEach(r => {
  const tr = r.trim();
  if (
    tr.startsWith(':root') ||
    tr.startsWith('*') ||
    tr.startsWith('body') ||
    tr.startsWith('h1') ||
    tr.startsWith('h2') ||
    tr.startsWith('h3') ||
    tr.startsWith('h4') ||
    tr.startsWith('p') ||
    tr.startsWith('ul') ||
    tr.startsWith('ol') ||
    tr.startsWith('li') ||
    tr.includes('.lead') ||
    tr.includes('.box') ||
    tr.includes('.card') ||
    tr.includes('.summary') ||
    tr.includes('.curriculum') ||
    tr.includes('.photo') ||
    tr.includes('.tree') ||
    tr.includes('.faq') ||
    tr.includes('.compare')
  ) {
    console.log(tr + '}');
    console.log('---------------------------------');
  }
});
