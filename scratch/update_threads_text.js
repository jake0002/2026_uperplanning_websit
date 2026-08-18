const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..', 'implementation');

function getAllHtmlFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getAllHtmlFiles(filePath));
        } else if (file.endsWith('.html')) {
            results.push(filePath);
        }
    });
    return results;
}

const htmlFiles = getAllHtmlFiles(baseDir);
let updatedCount = 0;

const targetStr = '슈퍼플래닝 UX 스튜디오 공식 쓰레드';
const replacementStr = 'UX디자인 에이전시 슈퍼플래닝 공식 쓰레드';

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes(targetStr)) {
        content = content.replaceAll(targetStr, replacementStr);
        fs.writeFileSync(file, content, 'utf8');
        updatedCount++;
    }
});

console.log(`Updated text in ${updatedCount} HTML files.`);
