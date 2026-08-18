const fs = require('fs');

const cleanroomFiles = [
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design_cleanroom\\index.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design_cleanroom.html'
];

cleanroomFiles.forEach(filepath => {
    if (fs.existsSync(filepath)) {
        let content = fs.readFileSync(filepath, 'utf8');
        let idx = content.indexOf('3. UX컨설팅');
        if (idx !== -1) {
            let section = content.substring(idx, idx + 10000);
            let galIdx = section.indexOf('class="consulting-gallery"');
            if (galIdx !== -1) {
                let gal = section.substring(galIdx, galIdx + 1500);
                let newGal = `<div class="consulting-gallery">
<figure class="photo">
<img alt="스타트업 1:1 UX컨설팅" loading="lazy" src="data:image/jpeg;base64,${fs.readFileSync('scratch/b64_1.txt', 'utf8').trim()}" style="aspect-ratio:4/3; object-fit:cover; width:100%;">
<figcaption>📷 스타트업 1:1 UX컨설팅</figcaption>
</figure>
<figure class="photo">
<img alt="모바일앱 UX리뉴얼 컨설팅" loading="lazy" src="data:image/jpeg;base64,${fs.readFileSync('scratch/b64_2.txt', 'utf8').trim()}" style="aspect-ratio:4/3; object-fit:cover; width:100%;">
<figcaption>📷 모바일앱 UX리뉴얼 컨설팅</figcaption>
</figure>
</div>`;
                section = section.replace(gal, newGal);
                content = content.substring(0, idx) + section + content.substring(idx + 10000);
                fs.writeFileSync(filepath, content, 'utf8');
                console.log(`Updated cleanroom captions in: ${filepath}`);
            }
        }
    }
});
