const fs = require('fs');

const newText = `슈퍼플래닝의 UX기획 진행 프로세스는 단순히 화면을 그리는 순서가 아니라, 발견 → 정의 → 설계 → 구현의 4단계로 사용자 문제와 비즈니스 목표를 함께 정리하는 방식입니다. 데스크 리서치와 사용자 조사에서 출발해 핵심 여정과 요구사항을 정의하고, 이후 IA·UX라이팅·기능정의서로 구조를 설계한 뒤, 프로토타입과 UI화면정의, 스토리보드, 검수 시나리오까지 연결해 실제 개발 가능한 상태로 구체화합니다.`;

const cleanroomFiles = [
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design_cleanroom\\index.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design_cleanroom.html'
];

cleanroomFiles.forEach(filepath => {
    if (fs.existsSync(filepath)) {
        let content = fs.readFileSync(filepath, 'utf8');
        let idx = content.indexOf('5. UX디자인 진행 프로세스');
        if (idx !== -1) {
            let pStart = content.indexOf('<p>', idx);
            let pEnd = content.indexOf('</p>', pStart);
            if (pStart !== -1 && pEnd !== -1) {
                content = content.substring(0, pStart + 3) + newText + content.substring(pEnd);
                fs.writeFileSync(filepath, content, 'utf8');
                console.log(`Updated cleanroom section 5 in: ${filepath}`);
            }
        }
    }
});
