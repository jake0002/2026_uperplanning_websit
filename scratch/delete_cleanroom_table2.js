const fs = require('fs');

const cleanroomFiles = [
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design_cleanroom\\index.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design_cleanroom.html'
];

cleanroomFiles.forEach(filepath => {
    if (fs.existsSync(filepath)) {
        let content = fs.readFileSync(filepath, 'utf8');
        let idx = content.indexOf('표 2');
        if (idx !== -1) {
            let tableStart = content.lastIndexOf('<table', idx);
            let tableEnd = content.indexOf('</table>', idx);
            if (tableStart !== -1 && tableEnd !== -1) {
                let tableHTML = content.substring(tableStart, tableEnd + 8);
                content = content.replace(tableHTML, '');
                fs.writeFileSync(filepath, content, 'utf8');
                console.log(`Deleted Table 2 in cleanroom: ${filepath}`);
            }
        }
    }
});
