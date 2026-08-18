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

    if (content.includes("'contact': { w: 620, h: 570")) {
        content = content.replace(
            /'contact':\s*\{\s*w:\s*620,\s*h:\s*570/g,
            "'contact': { w: 620, h: 600"
        );
        modified = true;
    }
    if (content.includes('"contact": { w: 620, h: 570')) {
        content = content.replace(
            /"contact":\s*\{\s*w:\s*620,\s*h:\s*570/g,
            '"contact": { w: 620, h: 600'
        );
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        updatedCount++;
    }
});

console.log(`Adjusted contact popup height to 600 in ${updatedCount} HTML files.`);
