const fs = require('fs');

const b64_1 = fs.readFileSync('scratch/b64_1.txt', 'utf8').trim();
const b64_2 = fs.readFileSync('scratch/b64_2.txt', 'utf8').trim();

const cap1 = "📷 스타트업 1:1 UX컨설팅";
const cap2 = "📷 모바일앱 UX리뉴얼 컨설팅";

const newFlexHTML = `<div style="display: flex; gap: 16px; margin: 24px 0 32px 0; flex-wrap: wrap;">
            <div style="flex: 1; min-width: 260px;">
              <img src="data:image/jpeg;base64,${b64_1}" alt="스타트업 1:1 UX컨설팅" onerror="this.onerror=null;this.src='../images/ux_consulting_1.jpg';" style="width: 100%; border-radius: 4px; box-shadow: 0 2px 6px rgba(0,0,0,0.1); aspect-ratio: 4/3; object-fit: cover; display: block;">
              <div style="margin-top: 8px; font-size: 12.5px; color: #555; text-align: center; font-weight: 500;">${cap1}</div>
            </div>
            <div style="flex: 1; min-width: 260px;">
              <img src="data:image/jpeg;base64,${b64_2}" alt="모바일앱 UX리뉴얼 컨설팅" onerror="this.onerror=null;this.src='../images/ux_consulting_2.jpg';" style="width: 100%; border-radius: 4px; box-shadow: 0 2px 6px rgba(0,0,0,0.1); aspect-ratio: 4/3; object-fit: cover; display: block;">
              <div style="margin-top: 8px; font-size: 12.5px; color: #555; text-align: center; font-weight: 500;">${cap2}</div>
            </div>
          </div>`;

const files = [
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design\\index.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux-design.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_plan\\index.html',
];

files.forEach(filepath => {
    if (fs.existsSync(filepath)) {
        let content = fs.readFileSync(filepath, 'utf8');
        let idx = content.indexOf('<h2 id="consulting">3. UX컨설팅</h2>');
        if (idx !== -1) {
            let nextH2 = content.indexOf('<!-- 4.', idx);
            if (nextH2 === -1) nextH2 = content.indexOf('<h2 id="diff">', idx);
            let section = content.substring(idx, nextH2);

            let flexStart = section.indexOf('<div style="display: flex; gap: 16px;');
            if (flexStart !== -1) {
                let flexEnd = section.indexOf('</div>\n\n          <!-- 4.');
                if (flexEnd === -1) flexEnd = section.indexOf('</div>\n          <!-- 4.');
                if (flexEnd === -1) flexEnd = section.lastIndexOf('</div>');

                // Replace everything from flexStart to flexEnd + 6
                let fullFlex = section.substring(flexStart);
                section = section.replace(fullFlex, newFlexHTML + '\n\n          ');
                content = content.substring(0, idx) + section + content.substring(nextH2);
                fs.writeFileSync(filepath, content, 'utf8');
                console.log(`Successfully updated: ${filepath}`);
            }
        }
    }
});
