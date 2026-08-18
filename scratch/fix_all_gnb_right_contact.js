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

htmlFiles.forEach(filepath => {
    let content = fs.readFileSync(filepath, 'utf8');
    const original = content;

    // Check if gnb-right exists and if 문의하기 button is missing inside gnb-right
    const gnbRightIdx = content.indexOf('<div class="gnb-right">');
    if (gnbRightIdx !== -1) {
        const gnbRightEndIdx = content.indexOf('</div>', gnbRightIdx);
        const gnbRightBlock = content.substring(gnbRightIdx, gnbRightEndIdx);

        if (!gnbRightBlock.includes('<span>문의하기</span>') && !gnbRightBlock.includes('문의하기</button>')) {
            // Locate 인재채용 button inside gnbRightBlock
            const careerIdx = gnbRightBlock.indexOf('인재채용');
            if (careerIdx !== -1) {
                const btnEndIdx = gnbRightBlock.indexOf('</button>', careerIdx);
                if (btnEndIdx !== -1) {
                    const isMainIndex = filepath.endsWith('implementation\\index.html');
                    const blipAttr = isMainIndex ? " blip(660, 0.04);" : "";
                    const newBtnHTML = `\n      <button class="w95-btn" style="padding:2px 8px; font-size:11px;" onclick="location.href='/contact/';${blipAttr}">\n        <span>✉️</span> <span>문의하기</span>\n      </button>`;

                    const updatedGnbRightBlock = gnbRightBlock.substring(0, btnEndIdx + 9) + newBtnHTML + gnbRightBlock.substring(btnEndIdx + 9);
                    content = content.substring(0, gnbRightIdx) + updatedGnbRightBlock + content.substring(gnbRightEndIdx);

                    fs.writeFileSync(filepath, content, 'utf8');
                    console.log(`Added GNB 문의하기 button to: ${filepath}`);
                }
            }
        }
    }
});
