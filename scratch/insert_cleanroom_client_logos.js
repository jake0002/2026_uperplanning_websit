const fs = require('fs');

const imgBuffer = fs.readFileSync('implementation/images/ux_client_logos.png');
const b64 = imgBuffer.toString('base64');

const imageBlockCleanroomHTML = `
<div style="margin: 20px 0 28px 0; width: 100%;">
<img src="data:image/png;base64,${b64}" alt="슈퍼플래닝 주요 고객사" onerror="this.onerror=null;this.src='../images/ux_client_logos.png';" style="width: 100%; border-radius: 4px; box-shadow: 0 1px 4px rgba(0,0,0,0.08); display: block; background: #ffffff; padding: 12px 16px;">
<div style="margin-top: 8px; font-size: 12.5px; color: #555; text-align: center; font-weight: 500;">📷 슈퍼플래닝 주요 고객사</div>
</div>`;

const cleanroomFiles = [
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design_cleanroom\\index.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design_cleanroom.html'
];

cleanroomFiles.forEach(filepath => {
    if (fs.existsSync(filepath)) {
        let content = fs.readFileSync(filepath, 'utf8');
        let idx = content.indexOf('6. UI/UX 프로젝트 성공사례');
        if (idx !== -1) {
            let sectionEnd = content.indexOf('</section>', idx);
            if (sectionEnd !== -1) {
                content = content.substring(0, sectionEnd) + imageBlockCleanroomHTML + '\n' + content.substring(sectionEnd);
                fs.writeFileSync(filepath, content, 'utf8');
                console.log(`Inserted cleanroom client logos image in: ${filepath}`);
            }
        }
    }
});
