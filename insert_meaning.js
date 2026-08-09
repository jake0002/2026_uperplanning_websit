const fs = require('fs');

const promptText = fs.readFileSync('d:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\extracted_prompt.txt', 'utf-8');

// Extract the html block
const startStr = '[meaning 섹션 콘텐츠 시작]';
let htmlBlock = promptText.substring(promptText.indexOf(startStr) + startStr.length);
htmlBlock = htmlBlock.replace(/^[\s\S]*?```html\n?/, ''); // remove everything up to ```html
htmlBlock = htmlBlock.replace(/```[\s\S]*$/, ''); // remove the closing ``` and everything after
htmlBlock = htmlBlock.trim();

// Wrap in section
htmlBlock = '<section id="meaning">\n' + htmlBlock + '\n</section>\n';

const targetPath = 'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design_cleanroom_v2\\index.html';
let targetHtml = fs.readFileSync(targetPath, 'utf-8');

// Insert using regex
targetHtml = targetHtml.replace(/(<main[^>]*main-content-pane[^>]*>)/i, '$1\n' + htmlBlock);

fs.writeFileSync(targetPath, targetHtml, 'utf-8');
console.log('Inserted meaning section successfully.');
