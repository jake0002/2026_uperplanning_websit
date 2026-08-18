const fs = require('fs');
const html = fs.readFileSync('implementation/ux-academy/index.html', 'utf8');

const queries = ['cases-logo', 'top-hero', 'figure', 'main-content-pane img'];
queries.forEach(q => {
  let idx = 0;
  console.log(`=== Query: ${q} ===`);
  while ((idx = html.indexOf(q, idx)) !== -1) {
    const start = Math.max(0, idx - 100);
    const end = Math.min(html.length, idx + 150);
    console.log(`Pos ${idx}:`);
    console.log(html.substring(start, end).replace(/\n/g, ' '));
    console.log('---');
    idx += q.length;
  }
});
