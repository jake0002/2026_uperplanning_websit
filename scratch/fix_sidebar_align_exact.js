const fs = require('fs');
const path = require('path');

const files = [
  'ux-blog/index.html',
  'ux-blog.html',
  'ux_blog.html'
];

files.forEach(f => {
  const fullPath = path.join(__dirname, '..', 'implementation', f);
  if (!fs.existsSync(fullPath)) return;

  let content = fs.readFileSync(fullPath, 'utf8');

  // Fix #gnb justify-content
  content = content.replace(
    `    #gnb {
      position: fixed !important;
      top: var(--logo-top);
      left: 95px;
      right: 14px;
      height: var(--gnb-h);
      background: var(--gnb-bg);
      color: var(--gnb-fg);
      border: 1px solid var(--gnb-bd);
      backdrop-filter: blur(8px);
      z-index: 99999 !important;
      display: flex;
      align-items: center;
      justify-content: flex-start;`,
    `    #gnb {
      position: fixed !important;
      top: var(--logo-top);
      left: 95px;
      right: 14px;
      height: var(--gnb-h);
      background: var(--gnb-bg);
      color: var(--gnb-fg);
      border: 1px solid var(--gnb-bd);
      backdrop-filter: blur(8px);
      z-index: 99999 !important;
      display: flex;
      align-items: center;
      justify-content: space-between;`
  );

  // Fix .tree-item a
  content = content.replace(
    `.tree-item a {
      display: flex;
      align-items: center;
      justify-content: space-between;`,
    `.tree-item a {
      display: flex;
      align-items: center;
      justify-content: flex-start;`
  );

  // Fix badge-count css formatting
  content = content.replace(
    '.tree-item a:hover .badge-count, .tree-item a.active .badge-count { margin-left: 4px;',
    '.tree-item a:hover .badge-count, .tree-item a.active .badge-count {'
  );

  content = content.replace(
    '.badge-count { margin-left: 4px;',
    '.badge-count {\n      margin-left: 4px;'
  );

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('Fixed sidebar tree item alignment in:', f);
});
