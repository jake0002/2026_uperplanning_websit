const fs = require('fs');
const path = require('path');

const files = [
  'ux-research/index.html', 'ux-research.html', 'ux_research.html',
  'ux-writing/index.html', 'ux-writing.html', 'ux_writing.html',
  'ux-design/index.html', 'ux-design.html', 'ux_design.html',
  'web-app-development/index.html', 'web-app-development.html', 'app_dev/index.html', 'app_dev.html',
  'ux-academy/index.html', 'ux-academy.html', 'ux_academy.html',
  'ux-company/index.html', 'ux-company.html', 'ux_company.html', 'company/index.html', 'company.html',
  'contact/index.html', 'contact.html'
];

files.forEach(f => {
  const fullPath = path.join(__dirname, '..', 'implementation', f);
  if (!fs.existsSync(fullPath)) return;

  let content = fs.readFileSync(fullPath, 'utf8');

  // Replace span pair
  content = content.replace(/<span>📄<\/span>\s*<span>회사소개서 보기<\/span>/g, '<span>📁</span> <span>포트폴리오 보기</span>');
  // Replace button inner text
  content = content.replace(/📄 회사소개서 보기/g, '📁 포트폴리오 보기');

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('Updated GNB button in:', f);
});
