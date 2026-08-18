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

    // 1. Fix GNB link in main index.html
    content = content.replace(
        /<a class="gnb-link" onclick="openWindow\('services'\); blip\(660, 0\.04\);"><span>UX라이팅<\/span><\/a>/g,
        '<a class="gnb-link" href="/ux_writing/" onclick="blip(660, 0.04);"><span>UX라이팅</span></a>'
    );

    // 2. Fix GNB link on other pages where href was #services or onclick openWindow
    content = content.replace(
        /<a class="gnb-link([^"]*)" href="https:\/\/superplanning\.blog\/#services"><span>UX라이팅<\/span><\/a>/g,
        '<a class="gnb-link$1" href="/ux_writing/"><span>UX라이팅</span></a>'
    );
    content = content.replace(
        /<a class="gnb-link([^"]*)" onclick="openWindow\('services'\)[^"]*"><span>UX라이팅<\/span><\/a>/g,
        '<a class="gnb-link$1" href="/ux_writing/"><span>UX라이팅</span></a>'
    );

    // 3. Fix Mobile drawer start item for UX라이팅
    content = content.replace(
        /<div class="start-item" onclick="openWindow\('services'\); toggleMobileMenu\(\);">✏️ UX라이팅<\/div>/g,
        '<div class="start-item" onclick="location.href=\'/ux_writing/\'; toggleMobileMenu();">✏️ UX라이팅</div>'
    );

    // 4. Fix Start menu item for UX라이팅
    content = content.replace(
        /<div class="start-item" onclick="openWindow\('services'\); closeStart\(\);">✏️ UX라이팅<\/div>/g,
        '<div class="start-item" onclick="location.href=\'/ux_writing/\'; closeStart();">✏️ UX라이팅</div>'
    );

    if (content !== original) {
        fs.writeFileSync(filepath, content, 'utf8');
        updatedCount++;
        console.log(`Updated UX Writing link in: ${filepath}`);
    }
});

console.log(`\nUpdated ${updatedCount} HTML files!`);
