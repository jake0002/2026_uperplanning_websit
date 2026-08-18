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

    // 1. GNB header link for 웹/앱개발
    content = content.replace(
        /<a class="gnb-link([^"]*)" href="https:\/\/superplanning\.blog\/#services"><span>웹\/앱개발<\/span><\/a>/g,
        '<a class="gnb-link$1" href="/web-app-development/"><span>웹/앱개발</span></a>'
    );
    content = content.replace(
        /<a class="gnb-link([^"]*)" href="\/app_dev\/"><span>웹\/앱개발<\/span><\/a>/g,
        '<a class="gnb-link$1" href="/web-app-development/"><span>웹/앱개발</span></a>'
    );
    content = content.replace(
        /<a class="gnb-link([^"]*)" onclick="openWindow\('services'\);[^"]*"><span>웹\/앱개발<\/span><\/a>/g,
        '<a class="gnb-link$1" href="/web-app-development/"><span>웹/앱개발</span></a>'
    );

    // 2. Mobile drawer start item for 웹/앱개발
    content = content.replace(
        /<div class="start-item" onclick="openWindow\('services'\); toggleMobileMenu\(\);">💻 웹\/앱개발<\/div>/g,
        '<div class="start-item" onclick="location.href=\'/web-app-development/\'; toggleMobileMenu();">💻 웹/앱개발</div>'
    );

    // 3. Start menu start item for 웹/앱개발
    content = content.replace(
        /<div class="start-item" onclick="openWindow\('services'\); closeStart\(\);">💻 웹\/앱개발<\/div>/g,
        '<div class="start-item" onclick="location.href=\'/web-app-development/\'; closeStart();">💻 웹/앱개발</div>'
    );

    if (content !== original) {
        fs.writeFileSync(filepath, content, 'utf8');
        updatedCount++;
        console.log(`Updated web/app dev links in: ${filepath}`);
    }
});

console.log(`\nUpdated ${updatedCount} HTML files!`);
