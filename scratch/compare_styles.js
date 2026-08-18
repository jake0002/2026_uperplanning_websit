const fs = require('fs');

const researchHtml = fs.readFileSync('implementation/ux-research/index.html', 'utf8');
const academyHtml = fs.readFileSync('implementation/ux-academy/index.html', 'utf8');

function getStyleContent(html) {
  const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let match;
  let result = '';
  while ((match = styleRegex.exec(html)) !== null) {
    result += match[1] + '\n';
  }
  return result;
}

const rCSS = getStyleContent(researchHtml);
const aCSS = getStyleContent(academyHtml);

console.log('ux-research style length:', rCSS.length);
console.log('ux-academy style length:', aCSS.length);

// Compare key selectors
const keySelectors = [
  'body', 'font-family', 'h1', 'h2', 'h3', 'h4', 'p', 'ul', 'ol', 'li',
  '.box', '.card', '.summary-card', '.summary-intro', '.photo-frame',
  '.photo-caption', '.sub-quote', '.lead', '.lead-points', '.tree-list',
  'main-content-pane', '::before', 'bullet'
];

fs.writeFileSync('scratch/ux_research_css.css', rCSS, 'utf8');
fs.writeFileSync('scratch/ux_academy_css.css', aCSS, 'utf8');

console.log('Saved CSS files to scratch/ for comparison');
