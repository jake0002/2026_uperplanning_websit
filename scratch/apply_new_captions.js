const fs = require('fs');

const files_to_update = [
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design\\index.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design_cleanroom\\index.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design_cleanroom.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux-design.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_plan\\index.html',
];

const cap1 = "스타트업 1:1 UX컨설팅";
const cap2 = "모바일앱 UX리뉴얼 컨설팅";

files_to_update.forEach(filepath => {
    if (fs.existsSync(filepath)) {
        let content = fs.readFileSync(filepath, 'utf8');
        let original = content;

        // Is it cleanroom format (<figure class="photo">) or standard format?
        if (filepath.includes('cleanroom')) {
            // Replace inside section 3
            let idx = content.indexOf('3. UX컨설팅');
            if (idx !== -1) {
                let section = content.substring(idx, idx + 3000);
                let origSection = section;

                // Add figcaption if missing or update alt
                section = section.replace(/alt="[^"]*"/g, (match, i) => {
                    return match; // keep original alt or update
                });

                // In cleanroom, replace the figure blocks under consulting-gallery
                section = section.replace(
                    /(<figure class="photo">\s*<img [^>]*>\s*)(<\/figure>)/gi,
                    (m, p1, p2) => {
                        if (m.includes('ux_consulting_1') || m.includes('대면') || m.includes('1:1')) {
                            return `${p1}<figcaption>${cap1}</figcaption>\n${p2}`;
                        } else {
                            return `${p1}<figcaption>${cap2}</figcaption>\n${p2}`;
                        }
                    }
                );

                // If figures don't have unique src markers, target first and second figure in gallery
                let galIdx = section.indexOf('class="consulting-gallery"');
                if (galIdx !== -1) {
                    let gal = section.substring(galIdx, galIdx + 1500);
                    let origGal = gal;
                    let figs = gal.split('</figure>');
                    if (figs.length >= 3) {
                        // Fig 1
                        figs[0] = figs[0].replace(/<figcaption>.*?<\/figcaption>/gi, '').replace(/alt="[^"]*"/, `alt="${cap1}"`);
                        figs[0] = figs[0] + `\n<figcaption>${cap1}</figcaption>`;

                        // Fig 2
                        figs[1] = figs[1].replace(/<figcaption>.*?<\/figcaption>/gi, '').replace(/alt="[^"]*"/, `alt="${cap2}"`);
                        figs[1] = figs[1] + `\n<figcaption>${cap2}</figcaption>`;

                        gal = figs.join('</figure>');
                        section = section.replace(origGal, gal);
                    }
                }

                content = content.substring(0, idx) + section + content.substring(idx + 3000);
            }
        } else {
            // Standard format (ux_design/index.html, ux_design.html, etc.)
            let idx = content.indexOf('<h2 id="consulting">3. UX컨설팅</h2>');
            if (idx !== -1) {
                let endIdx = content.indexOf('<h2 id="diff">', idx);
                if (endIdx === -1) endIdx = idx + 5000;
                let section = content.substring(idx, endIdx);
                let origSection = section;

                // Find the flex container with images
                let flexIdx = section.indexOf('style="display: flex; gap: 16px;');
                if (flexIdx !== -1) {
                    let flexBlock = section.substring(flexIdx);
                    let flexEnd = flexBlock.indexOf('<!-- 4.');
                    if (flexEnd !== -1) flexBlock = flexBlock.substring(0, flexEnd);

                    let divs = flexBlock.split('</div>');
                    // Div 0 is first image container, Div 1 is second image container
                    if (divs.length >= 2) {
                        // Clean existing captions in div 0
                        divs[0] = divs[0].replace(/<div style="margin-top: 8px; font-size: 12.5px; color: #555; text-align: center; font-weight: 500;">.*?<\/div>/gi, '');
                        divs[0] = divs[0].replace(/alt="[^"]*"/, `alt="${cap1}"`);
                        divs[0] = divs[0] + `\n              <div style="margin-top: 8px; font-size: 12.5px; color: #555; text-align: center; font-weight: 500;">${cap1}</div>`;

                        // Clean existing captions in div 1
                        divs[1] = divs[1].replace(/<div style="margin-top: 8px; font-size: 12.5px; color: #555; text-align: center; font-weight: 500;">.*?<\/div>/gi, '');
                        divs[1] = divs[1].replace(/alt="[^"]*"/, `alt="${cap2}"`);
                        divs[1] = divs[1] + `\n              <div style="margin-top: 8px; font-size: 12.5px; color: #555; text-align: center; font-weight: 500;">${cap2}</div>`;

                        let newFlexBlock = divs.join('</div>');
                        section = section.replace(flexBlock, newFlexBlock);
                    }
                }
                content = content.substring(0, idx) + section + content.substring(endIdx);
            }
        }

        if (content !== original) {
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`Updated captions in: ${filepath}`);
        } else {
            console.log(`No changes in: ${filepath}`);
        }
    }
});
