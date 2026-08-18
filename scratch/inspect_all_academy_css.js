const fs = require('fs');

const aHTML = fs.readFileSync('implementation/ux-academy/index.html', 'utf8');

const m = aHTML.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
const aCSS = m ? m.join('\n') : '';

console.log('=== UX-ACADEMY Main Content CSS ===');

const selectors = [
  'h1', 'h2', 'h3', 'p', 'ul', 'ol', 'li',
  '.lead', '.lead-points', '.lead-detail',
  '.summary-intro', '.summary-grid', '.summary-card', '.summary-card-inner', '.summary-title', '.summary-list',
  '.review-copy-block', '.review-copy-lead', '.review-ai-summary',
  '.cases-history-grid', '.cases-history-box',
  '.curriculum-intro', '.curriculum-wrap', '.curriculum-item', '.curriculum-step', '.curriculum-panel', '.curriculum-list',
  '.course-sales-layout', '.course-feature-box', '.course-pricing-wrap', '.course-cards', '.course-card',
  '.grid-boxes', '.box', '.benefit-grid', '.label-chip', '.faq', '.faq dt', '.faq dd'
];

const rules = aCSS.split('}');
rules.forEach(r => {
  const tr = r.trim();
  selectors.forEach(sel => {
    if (tr.startsWith(sel + ' ') || tr.startsWith(sel + '{') || tr.startsWith(sel + ':')) {
      console.log(tr + '}');
      console.log('---');
    }
  });
});
