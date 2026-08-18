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
    // Skip contact/index.html and contact.html since we already authored them with the menu included
    if (filepath.includes('contact')) return;

    let content = fs.readFileSync(filepath, 'utf8');
    const original = content;

    // 1. Add 문의하기 to gnb-right if not present
    if (!content.includes("<span>문의하기</span></span>") && !content.includes("location.href='/contact/'") && !content.includes('href="/contact/"')) {
        // Find 인재채용 button in gnb-right
        // Regex for 인재채용 button block
        const btnRegex = /(<button[^>]*class="w95-btn"[^>]*>[\s\S]*?<span>🤝<\/span>\s*<span>인재채용<\/span>[\s\S]*?<\/button>)/;
        if (btnRegex.test(content)) {
            const isMainIndex = filepath.endsWith('implementation\\index.html');
            const blipAttr = isMainIndex ? " blip(660, 0.04);" : "";
            const newBtn = `$1\n      <button class="w95-btn" style="padding:2px 8px; font-size:11px;" onclick="location.href='/contact/';${blipAttr}">\n        <span>✉️</span> <span>문의하기</span>\n      </button>`;
            content = content.replace(btnRegex, newBtn);
        }
    }

    // 2. Add 문의하기 to startMenu right after 회사소개 if not present
    const startItemCompanyRegex = /(<div class="start-item" onclick="[^"]*location\.href='[^']*company[^']*'[^"]*closeStart\(\);[^"]*">[^<]*🏢 회사소개<\/div>)/g;
    if (startItemCompanyRegex.test(content)) {
        content = content.replace(startItemCompanyRegex, '$1\n      <div class="start-item" onclick="location.href=\'/contact/\'; closeStart();">✉️ 문의하기</div>');
    }

    // 3. Add 문의하기 to mobileNavDrawer right after 회사소개 if not present
    const mobileItemCompanyRegex = /(<div class="start-item" onclick="[^"]*location\.href='[^']*company[^']*'[^"]*toggleMobileMenu\(\);[^"]*">[^<]*🏢 회사소개<\/div>)/g;
    if (mobileItemCompanyRegex.test(content)) {
        content = content.replace(mobileItemCompanyRegex, '$1\n      <div class="start-item" onclick="location.href=\'/contact/\'; toggleMobileMenu();">✉️ 문의하기</div>');
    }

    if (content !== original) {
        fs.writeFileSync(filepath, content, 'utf8');
        updatedCount++;
        console.log(`Updated GNB and StartMenu in: ${filepath}`);
    } else {
        console.log(`No change required or already updated: ${filepath}`);
    }
});

console.log(`\nUpdated ${updatedCount} files successfully!`);
