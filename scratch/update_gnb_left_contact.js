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

let updatedCount = 0;

htmlFiles.forEach(filepath => {
    let content = fs.readFileSync(filepath, 'utf8');
    const original = content;

    const gnbLeftIdx = content.indexOf('<ul class="gnb-left">');
    if (gnbLeftIdx !== -1) {
        const gnbLeftEndIdx = content.indexOf('</ul>', gnbLeftIdx);
        const gnbLeftBlock = content.substring(gnbLeftIdx, gnbLeftEndIdx);

        if (!gnbLeftBlock.includes('<span>문의하기</span>')) {
            // Find 회사소개 inside gnbLeftBlock
            const compIdx = gnbLeftBlock.indexOf('<span>회사소개</span>');
            if (compIdx !== -1) {
                const liEndIdx = gnbLeftBlock.indexOf('</li>', compIdx);
                if (liEndIdx !== -1) {
                    const isMainIndex = filepath.endsWith('implementation\\index.html');
                    const isContact = filepath.includes('contact');
                    const activeClass = isContact ? " active" : "";
                    const blipAttr = isMainIndex ? ' onclick="blip(660, 0.04);"' : '';
                    const newLiHTML = `\n      <li class="gnb-item">\n        <a class="gnb-link${activeClass}" href="/contact/"${blipAttr}><span>문의하기</span></a>\n      </li>`;

                    const updatedGnbLeftBlock = gnbLeftBlock.substring(0, liEndIdx + 5) + newLiHTML + gnbLeftBlock.substring(liEndIdx + 5);
                    content = content.substring(0, gnbLeftIdx) + updatedGnbLeftBlock + content.substring(gnbLeftEndIdx);

                    fs.writeFileSync(filepath, content, 'utf8');
                    updatedCount++;
                    console.log(`Added GNB left 문의하기 link to: ${filepath}`);
                }
            }
        }
    }
});

console.log(`\nUpdated ${updatedCount} files with GNB left link!`);
