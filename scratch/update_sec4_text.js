const fs = require('fs');

const newSec4Text = `<h2 id="diff">4. 슈퍼플래닝만의 차별점</h2>
          <p>슈퍼플래닝의 차별점은 UX기획을 감각이나 화면 취향의 문제로 보지 않는다는 점입니다. 실제 서비스 구조를 만들고 개선하는 과정에서 반복적으로 발생하는 문제를 시스템 관점으로 다뤄 왔고, 그 결과가 UX 관련 특허와 자체 도구로 축적되어 있습니다. 즉, 기획을 문장으로 설명하는 수준을 넘어 구조화 가능한 체계로 연구해 왔다는 점이 다릅니다.</p>`;

const newSec4CleanroomText = `<section id="diff">
<h2 id="diff">4. 슈퍼플래닝만의 차별점</h2>
<p>슈퍼플래닝의 차별점은 UX기획을 감각이나 화면 취향의 문제로 보지 않는다는 점입니다. 실제 서비스 구조를 만들고 개선하는 과정에서 반복적으로 발생하는 문제를 시스템 관점으로 다뤄 왔고, 그 결과가 UX 관련 특허와 자체 도구로 축적되어 있습니다. 즉, 기획을 문장으로 설명하는 수준을 넘어 구조화 가능한 체계로 연구해 왔다는 점이 다릅니다.</p>
</section>`;

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

        if (filepath.includes('cleanroom')) {
            let idx = content.indexOf('<section id="diff">');
            if (idx !== -1) {
                let endIdx = content.indexOf('</section>', idx);
                if (endIdx !== -1) {
                    content = content.substring(0, idx) + newSec4CleanroomText + content.substring(endIdx + 10);
                }
            }
        } else {
            let idx = content.indexOf('<h2 id="diff">4. 슈퍼플래닝만의 차별점</h2>');
            if (idx !== -1) {
                let endIdx = content.indexOf('<!-- 5.', idx);
                if (endIdx === -1) endIdx = content.indexOf('<h2 id="process">', idx);
                if (endIdx !== -1) {
                    content = content.substring(0, idx) + newSec4Text + '\n\n          ' + content.substring(endIdx);
                }
            }
        }

        if (content !== original) {
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`Updated Section 4 in: ${filepath}`);
        } else {
            console.log(`No changes needed in: ${filepath}`);
        }
    }
});
