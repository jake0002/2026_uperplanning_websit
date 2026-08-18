const fs = require('fs');

const imgBuffer = fs.readFileSync('implementation/images/ux_client_logos.png');
const b64 = imgBuffer.toString('base64');
console.log(`Client Logos Base64 length: ${b64.length}`);

const imageBlockHTML = `
          <div style="margin: 20px 0 28px 0; width: 100%;">
            <img src="data:image/png;base64,${b64}" alt="슈퍼플래닝 주요 고객사" onerror="this.onerror=null;this.src='../images/ux_client_logos.png';" style="width: 100%; border-radius: 4px; box-shadow: 0 1px 4px rgba(0,0,0,0.08); display: block; background: #ffffff; padding: 12px 16px;">
            <div style="margin-top: 8px; font-size: 12.5px; color: #555; text-align: center; font-weight: 500;">📷 슈퍼플래닝 주요 고객사</div>
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

        if (content.includes('슈퍼플래닝 주요 고객사')) {
            console.log(`Client logos image already present in: ${filepath}`);
            return;
        }

        let pTarget = '기획과 디자인으로 연결했다는 점입니다.</p>';
        let pIdx = content.indexOf(pTarget);
        if (pIdx !== -1) {
            let insertPos = pIdx + pTarget.length;
            content = content.substring(0, insertPos) + '\n' + imageBlockHTML + content.substring(insertPos);
        }

        if (content !== original) {
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`Inserted client logos image in: ${filepath}`);
        } else {
            console.log(`Could not insert in: ${filepath}`);
        }
    }
});
