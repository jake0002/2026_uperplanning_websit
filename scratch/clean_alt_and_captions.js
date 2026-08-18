const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                processDir(fullPath);
            }
        } else if (file.endsWith('.html') || file.endsWith('.htm')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let original = content;

            // Remove caption divs
            content = content.replace(/<div [^>]*>📷\s*슈퍼플래닝 1:1 UX 대면 컨설팅 현장<\/div>/gi, '');
            content = content.replace(/<div [^>]*>📷\s*슈퍼플래닝 UX 클래스 &[amp;]* 그룹 컨설팅 현장<\/div>/gi, '');
            content = content.replace(/📷\s*슈퍼플래닝 1:1 UX 대면 컨설팅 현장/g, '');
            content = content.replace(/📷\s*슈퍼플래닝 UX 클래스 &[amp;]* 그룹 컨설팅 현장/g, '');

            // Remove figcaptions
            content = content.replace(/<figcaption>.*?대면 컨설팅 현장.*?<\/figcaption>/gi, '');
            content = content.replace(/<figcaption>.*?UX 클래스.*?<\/figcaption>/gi, '');

            // Clean alt attributes
            content = content.replace(/alt="슈퍼플래닝 1:1 UX 대면 컨설팅 현장"/g, 'alt="슈퍼플래닝 UX컨설팅"');
            content = content.replace(/alt="슈퍼플래닝 UX 클래스 및 그룹 컨설팅 현장"/g, 'alt="슈퍼플래닝 UX컨설팅"');
            content = content.replace(/alt="슈퍼플래닝 UX 클래스 &amp; 그룹 컨설팅 현장"/g, 'alt="슈퍼플래닝 UX컨설팅"');
            content = content.replace(/alt="슈퍼플래닝 UX 클래스 & 그룹 컨설팅 현장"/g, 'alt="슈퍼플래닝 UX컨설팅"');

            if (content !== original) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Cleaned: ${fullPath}`);
            }
        }
    }
}

console.log("Processing all HTML files in implementation...");
processDir('d:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation');
