const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function(file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (file.endsWith('.html')) {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });

    return arrayOfFiles;
}

const htmlFiles = getAllFiles('d:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation');

let removedCount = 0;

htmlFiles.forEach(filepath => {
    let content = fs.readFileSync(filepath, 'utf8');
    const original = content;

    const gnbRightIdx = content.indexOf('<div class="gnb-right">');
    if (gnbRightIdx !== -1) {
        const gnbRightEndIdx = content.indexOf('</div>', gnbRightIdx);
        let gnbRightBlock = content.substring(gnbRightIdx, gnbRightEndIdx);

        // Regex to match the 문의하기 button inside gnb-right
        const contactBtnRegex = /\s*<button[^>]*class="w95-btn"[^>]*onclick="[^"]*\/contact\/[^"]*"[^>]*>[\s\S]*?<span>✉️<\/span>\s*<span>문의하기<\/span>[\s\S]*?<\/button>/gi;

        if (contactBtnRegex.test(gnbRightBlock)) {
            gnbRightBlock = gnbRightBlock.replace(contactBtnRegex, '');
            content = content.substring(0, gnbRightIdx) + gnbRightBlock + content.substring(gnbRightEndIdx);

            fs.writeFileSync(filepath, content, 'utf8');
            removedCount++;
            console.log(`Removed GNB right contact button from: ${filepath}`);
        }
    }
});

console.log(`\nSuccessfully removed GNB right contact button from ${removedCount} files!`);
