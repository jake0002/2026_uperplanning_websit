const fs = require('fs');

const imgBuffer = fs.readFileSync('implementation/images/ux_process_double_diamond.png');
const b64 = imgBuffer.toString('base64');
console.log(`Process Image Base64 length: ${b64.length}`);

const imageBlockHTML = `
          <div style="margin: 20px 0 28px 0; width: 100%;">
            <img src="data:image/png;base64,${b64}" alt="슈퍼플래닝 UX기획 4단계 진행 프로세스" onerror="this.onerror=null;this.src='../images/ux_process_double_diamond.png';" style="width: 100%; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); display: block;">
            <div style="margin-top: 8px; font-size: 12.5px; color: #555; text-align: center; font-weight: 500;">📷 슈퍼플래닝 UX기획 4단계 진행 프로세스 (Double Diamond Framework)</div>
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

        if (content.includes('슈퍼플래닝 UX기획 4단계 진행 프로세스')) {
            console.log(`Process image already present in: ${filepath}`);
            return;
        }

        let pTarget = '검수 시나리오까지 연결해 실제 개발 가능한 상태로 구체화합니다.</p>';
        let pIdx = content.indexOf(pTarget);
        if (pIdx !== -1) {
            let insertPos = pIdx + pTarget.length;
            content = content.substring(0, insertPos) + '\n' + imageBlockHTML + content.substring(insertPos);
        }

        if (content !== original) {
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`Inserted process diagram image in: ${filepath}`);
        } else {
            console.log(`Could not insert in: ${filepath}`);
        }
    }
});
