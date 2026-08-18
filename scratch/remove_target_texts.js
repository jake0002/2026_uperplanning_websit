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

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    // 1. Update WINDOW_DEFS contact window height to 640 to comfortably fit content without scrollbars
    if (content.includes("'contact': { w: 620, h: 680")) {
        content = content.replace("'contact': { w: 620, h: 680", "'contact': { w: 620, h: 640");
        modified = true;
    }
    if (content.includes('"contact": { w: 620, h: 680')) {
        content = content.replace('"contact": { w: 620, h: 680', '"contact": { w: 620, h: 640');
        modified = true;
    }

    // 2. Adjust office image max-height to 160px for compact display
    if (content.includes('max-height:220px;')) {
        content = content.replace('max-height:220px;', 'max-height:160px;');
        modified = true;
    }
    if (content.includes('max-height:200px;')) {
        content = content.replace('max-height:200px;', 'max-height:160px;');
        modified = true;
    }

    // 3. Remove target text 1: "UX/UI기획부터 앱 개발까지, 슈퍼플래닝과 함께하세요."
    const text1Regex = /<h4[^>]*>\$\{isKo \? 'UX\/UI기획부터 앱 개발까지, 슈퍼플래닝과 함께하세요\.' : '[^']*'\}<\/h4>\r?\n?/g;
    if (text1Regex.test(content)) {
        content = content.replace(text1Regex, '');
        modified = true;
    }

    // 4. Remove target text 2: "이렇게 찾아오세요."
    const text2Regex = /<h4[^>]*>\$\{isKo \? '이렇게 찾아오세요\.' : '[^']*'\}<\/h4>\r?\n?/g;
    if (text2Regex.test(content)) {
        content = content.replace(text2Regex, '');
        modified = true;
    }

    // 5. Remove subpage heading text "오시는 길 (미사역 1분 거리)"
    const textSubpageRegex = /<h4[^>]*>오시는 길 \(미사역 1분 거리\)<\/h4>\r?\n?/g;
    if (textSubpageRegex.test(content)) {
        content = content.replace(textSubpageRegex, '');
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        updatedCount++;
    }
});

console.log(`Updated target text removal and popup height in ${updatedCount} HTML files.`);
