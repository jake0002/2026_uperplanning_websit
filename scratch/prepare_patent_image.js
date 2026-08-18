const fs = require('fs');

const imgBuffer = fs.readFileSync('implementation/images/ux_patents_certificates.png');
const b64 = imgBuffer.toString('base64');
console.log(`Image Base64 length: ${b64.length}`);

const imageBlockHTML = `
          <div style="margin-top: 16px; width: 100%;">
            <img src="data:image/png;base64,${b64}" alt="특허 다수 보유 UX전문 에이전시 슈퍼플래닝" onerror="this.onerror=null;this.src='../images/ux_patents_certificates.png';" style="width: 100%; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); display: block;">
            <div style="margin-top: 8px; font-size: 12.5px; color: #555; text-align: center; font-weight: 500;">📷 특허 다수 보유 UX전문 에이전시 슈퍼플래닝</div>
          </div>`;

const files = [
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design\\index.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design_cleanroom\\index.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design_cleanroom.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux-design.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_plan\\index.html',
];

files.forEach(filepath => {
    if (fs.existsSync(filepath)) {
        let content = fs.readFileSync(filepath, 'utf8');
        let original = content;

        if (content.includes('특허 다수 보유 UX전문 에이전시 슈퍼플래닝')) {
            console.log(`Patent image already present in: ${filepath}`);
            return;
        }

        // Find end of patent box: </div> after UX관련 지식재산 특허보유 현황
        let patentIdx = content.indexOf('UX관련 지식재산 특허보유 현황');
        if (patentIdx !== -1) {
            let boxEndIdx = content.indexOf('</div>', patentIdx);
            if (boxEndIdx !== -1) {
                let insertPos = boxEndIdx + 6;
                content = content.substring(0, insertPos) + '\n' + imageBlockHTML + content.substring(insertPos);
            }
        }

        if (content !== original) {
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`Inserted patent certificate image in: ${filepath}`);
        } else {
            console.log(`Could not insert in: ${filepath}`);
        }
    }
});
