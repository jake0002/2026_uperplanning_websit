const fs = require('fs');

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

        // Fix nested div structure if present
        let captionStr = '📷 슈퍼플래닝 UX디자인 진행 프로세스 (Double Diamond Framework)</div>';
        let captionPos = content.indexOf(captionStr);
        if (captionPos !== -1) {
            let nextSectionPos = content.indexOf('<!-- 6.', captionPos);
            if (nextSectionPos === -1) nextSectionPos = content.indexOf('<h2 id="cases">', captionPos);

            if (nextSectionPos !== -1) {
                let tableMatch = content.match(/<div style="width:100%; overflow-x:auto; margin-top: 24px;">[\s\S]*?<\/table>\s*<\/div>/);
                if (tableMatch) {
                    let tableStr = tableMatch[0];

                    // Extract image b64
                    let imgMatch = content.match(/<div style="margin: 20px 0 28px 0; width: 100%;">[\s\S]*?📷 슈퍼플래닝 UX디자인 진행 프로세스 \(Double Diamond Framework\)<\/div>\s*<\/div>/);
                    if (!imgMatch) {
                        imgMatch = content.match(/<div style="margin: 20px 0 28px 0; width: 100%;">[\s\S]*?📷 슈퍼플래닝 UX디자인 진행 프로세스 \(Double Diamond Framework\)<\/div>/);
                    }

                    let imgContainerStart = content.indexOf('<div style="margin: 20px 0 28px 0; width: 100%;">');
                    if (imgContainerStart !== -1) {
                        let b64Match = content.match(/src="(data:image\/png;base64,[^"]+)"/);
                        let b64Str = b64Match ? b64Match[1] : '../images/ux_process_double_diamond.png';

                        let cleanSection5Block = `<div style="margin: 20px 0 28px 0; width: 100%;">
            <img src="${b64Str}" alt="슈퍼플래닝 UX디자인 진행 프로세스" onerror="this.onerror=null;this.src='../images/ux_process_double_diamond.png';" style="width: 100%; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); display: block;">
            <div style="margin-top: 8px; font-size: 12.5px; color: #555; text-align: center; font-weight: 500;">📷 슈퍼플래닝 UX디자인 진행 프로세스 (Double Diamond Framework)</div>
          </div>\n\n          ${tableStr}\n\n          `;

                        content = content.substring(0, imgContainerStart) + cleanSection5Block + content.substring(nextSectionPos);
                        fs.writeFileSync(filepath, content, 'utf8');
                        console.log(`Cleaned Section 5 table placement in: ${filepath}`);
                    }
                }
            }
        }
    }
});
