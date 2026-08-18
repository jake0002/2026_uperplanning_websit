const fs = require('fs');

const researchContent = fs.readFileSync('implementation/ux-research/index.html', 'utf8');
const companyContent = fs.readFileSync('implementation/ux-company/index.html', 'utf8');

console.log('=== UX-RESEARCH CSS & HTML Snippets ===');

// 1. brandLogo (Home button)
const rLogoMatch = researchContent.match(/#brandLogo[\s\S]*?\}/);
console.log('Research #brandLogo CSS:\n', rLogoMatch ? rLogoMatch[0] : 'NONE');

// 2. GNB container CSS
const rGnbMatch = researchContent.match(/#gnb\s*\{[\s\S]*?\}/);
console.log('Research #gnb CSS:\n', rGnbMatch ? rGnbMatch[0] : 'NONE');

// 3. Progress gauge bar CSS
const rProgressMatch = researchContent.match(/\.gnb-progress-track[\s\S]*?\.gnb-progress-badge[\s\S]*?\}/);
console.log('Research Progress CSS:\n', rProgressMatch ? rProgressMatch[0] : 'NONE');

console.log('\n=== UX-COMPANY CSS & HTML Snippets ===');

const cLogoMatch = companyContent.match(/#brandLogo[\s\S]*?\}/);
console.log('Company #brandLogo CSS:\n', cLogoMatch ? cLogoMatch[0] : 'NONE');

const cGnbMatch = companyContent.match(/#gnb\s*\{[\s\S]*?\}/);
console.log('Company #gnb CSS:\n', cGnbMatch ? cGnbMatch[0] : 'NONE');

const cProgressMatch = companyContent.match(/\.gnb-progress-track[\s\S]*?\.gnb-progress-badge[\s\S]*?\}/);
console.log('Company Progress CSS:\n', cProgressMatch ? cProgressMatch[0] : 'NONE');
