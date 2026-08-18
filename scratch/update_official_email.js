const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function(file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (file.endsWith('.html') || file.endsWith('.md') || file.endsWith('.txt') || file.endsWith('.json') || file.endsWith('.js')) {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });

    return arrayOfFiles;
}

const allFiles = getAllFiles('d:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation');

let updateCount = 0;

allFiles.forEach(filepath => {
    let content = fs.readFileSync(filepath, 'utf8');
    let original = content;

    content = content.replace(/hello@superplanning\.kr/g, 'jake@superplanning.co.kr');
    content = content.replace(/hello@superplanning\.co\.kr/g, 'jake@superplanning.co.kr');

    if (content !== original) {
        fs.writeFileSync(filepath, content, 'utf8');
        updateCount++;
        console.log(`Updated email address in: ${filepath}`);
    }
});

console.log(`\nSuccessfully updated email in ${updateCount} files!`);
