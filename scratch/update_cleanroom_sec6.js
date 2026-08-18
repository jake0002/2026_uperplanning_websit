const fs = require('fs');

const newText = `슈퍼플래닝은 단순한 UI디자인보다 실제 사용자와 서비스 이해가 중요한 고난도 프로젝트를 많이 수행해 왔습니다. 스타트업 부터 금융, 공공, 모빌리티, 제조, 헬스케어, 교육, 커머스 등 다양한 산업군에서 UX기획, UX리서치, UX라이팅, UI/UX 설계 업무를 진행해 왔습니다. 프로젝트의 공통점은 복잡한 서비스 구조를 사용자 기준으로 다시 정리하고, 실무에 바로 적용할 수 있는 기획과 디자인으로 연결했다는 점입니다.`;

const cleanroomFiles = [
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design_cleanroom\\index.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design_cleanroom.html'
];

cleanroomFiles.forEach(filepath => {
    if (fs.existsSync(filepath)) {
        let content = fs.readFileSync(filepath, 'utf8');
        let idx = content.indexOf('6. UI/UX 프로젝트 성공사례');
        if (idx !== -1) {
            let nextSectionIdx = content.indexOf('<h2 id="faq">', idx);
            if (nextSectionIdx === -1) nextSectionIdx = content.indexOf('7. 자주 묻는 질문', idx);

            if (nextSectionIdx !== -1) {
                let h2End = content.indexOf('</h2>', idx);
                let sectionEnd = content.lastIndexOf('</section>', nextSectionIdx);
                if (h2End !== -1 && sectionEnd !== -1) {
                    let cleanBlock = `\n<p>${newText}</p>\n`;
                    content = content.substring(0, h2End + 5) + cleanBlock + content.substring(sectionEnd);
                    fs.writeFileSync(filepath, content, 'utf8');
                    console.log(`Updated cleanroom Section 6 in: ${filepath}`);
                }
            }
        }
    }
});
