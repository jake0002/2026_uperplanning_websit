const fs = require('fs');
const path = require('path');

function searchInDir(dir, query) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                searchInDir(fullPath, query);
            }
        } else if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.php')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes(query)) {
                console.log(`Found "${query}" in: ${fullPath}`);
                const lines = content.split('\n');
                lines.forEach((line, idx) => {
                    if (line.includes(query)) {
                        console.log(`  Line ${idx+1}: ${line.trim().substring(0, 150)}`);
                    }
                });
            }
        }
    }
}

console.log("--- Searching for '📷' ---");
searchInDir('d:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation', '📷');
