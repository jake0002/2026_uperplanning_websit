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

htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const scriptRegex = /<script[\s\S]*?>([\s\S]*?)<\/script>/gi;
    let match;
    let scriptIndex = 0;
    while ((match = scriptRegex.exec(content)) !== null) {
        scriptIndex++;
        const scriptCode = match[1];
        try {
            new Function(scriptCode);
        } catch (err) {
            console.error(`Syntax Error in ${file} (script #${scriptIndex}):`, err.message);
        }
    }
});
