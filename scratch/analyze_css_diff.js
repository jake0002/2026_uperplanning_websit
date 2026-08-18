const fs = require('fs');

const rCSS = fs.readFileSync('scratch/ux_research_css.css', 'utf8');
const aCSS = fs.readFileSync('scratch/ux_academy_css.css', 'utf8');

function parseRules(css) {
  const rules = {};
  // Simple css parser for comparison
  const blocks = css.split('}');
  blocks.forEach(b => {
    const parts = b.split('{');
    if (parts.length === 2) {
      const sel = parts[0].trim();
      const body = parts[1].trim();
      rules[sel] = body;
    }
  });
  return rules;
}

const rRules = parseRules(rCSS);
const aRules = parseRules(aCSS);

console.log('=== CSS Rules Comparison ===');

const keySelectors = [
  'body',
  '.main-content-pane',
  '.main-content-pane h1',
  '.main-content-pane h2',
  '.main-content-pane h3',
  '.main-content-pane h4',
  'h1', 'h2', 'h3', 'h4',
  'p', '.lead',
  'ul', 'ol', 'li', 'ul.section-list', 'ul.section-list li',
  '.box', '.summary-intro', '.summary-card', '.summary-title', '.summary-list',
  '.photo-frame', '.photo-caption', '.sub-quote'
];

keySelectors.forEach(sel => {
  console.log(`\n--- Selector: [${sel}] ---`);
  console.log('Research (Target):', rRules[sel] || '(not directly found)');
  console.log('Academy  (Current):', aRules[sel] || '(not directly found)');
});
