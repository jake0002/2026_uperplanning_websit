const fs = require('fs');

const newSec6Text = `<h2 id="cases">6. UI/UX 프로젝트 성공사례</h2>
          <p>슈퍼플래닝은 단순한 UI디자인보다 실제 사용자와 서비스 이해가 중요한 고난도 프로젝트를 많이 수행해 왔습니다. 스타트업 부터 금융, 공공, 모빌리티, 제조, 헬스케어, 교육, 커머스 등 다양한 산업군에서 UX기획, UX리서치, UX라이팅, UI/UX 설계 업무를 진행해 왔습니다. 프로젝트의 공통점은 복잡한 서비스 구조를 사용자 기준으로 다시 정리하고, 실무에 바로 적용할 수 있는 기획과 디자인으로 연결했다는 점입니다.</p>`;

const newSec6CleanroomText = `<section id="cases">
<h2 id="cases">6. UI/UX 프로젝트 성공사례</h2>
<p>슈퍼플래닝은 단순한 UI디자인보다 실제 사용자와 서비스 이해가 중요한 고난도 프로젝트를 많이 수행해 왔습니다. 스타트업 부터 금융, 공공, 모빌리티, 제조, 헬스케어, 교육, 커머스 등 다양한 산업군에서 UX기획, UX리서치, UX라이팅, UI/UX 설계 업무를 진행해 왔습니다. 프로젝트의 공통점은 복잡한 서비스 구조를 사용자 기준으로 다시 정리하고, 실무에 바로 적용할 수 있는 기획과 디자인으로 연결했다는 점입니다.</p>
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
            let idx = content.indexOf('<section id="cases">');
            if (idx !== -1) {
                let endIdx = content.indexOf('</section>', idx);
                if (endIdx !== -1) {
                    content = content.substring(0, idx) + newSec6CleanroomText + content.substring(endIdx + 10);
                }
            }
        } else {
            let idx = content.indexOf('<h2 id="cases">6. UI/UX 프로젝트 성공사례</h2>');
            if (idx !== -1) {
                let endIdx = content.indexOf('<!-- 7.', idx);
                if (endIdx === -1) endIdx = content.indexOf('<h2 id="faq">', idx);
                if (endIdx !== -1) {
                    content = content.substring(0, idx) + newSec6Text + '\n\n          ' + content.substring(endIdx);
                }
            }
        }

        if (content !== original) {
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`Updated Section 6 text in: ${filepath}`);
        } else {
            console.log(`No changes made in: ${filepath}`);
        }
    }
});
