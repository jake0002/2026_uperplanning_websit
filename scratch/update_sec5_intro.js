const fs = require('fs');

const oldText = `슈퍼플래닝의 UX기획/디자인은 리서치 기반 문제 정의부터 개발 연계 산출물까지 이어지는 단계별 구조로 진행됩니다. 기능 개발부터 시작하면 수정 비용이 커지기 쉽기 때문에 서비스 구조와 핵심 사용자 흐름을 먼저 정리하면 시행착오를 줄일 수 있습니다.`;

const newText = `슈퍼플래닝의 UX기획 진행 프로세스는 단순히 화면을 그리는 순서가 아니라, 발견 → 정의 → 설계 → 구현의 4단계로 사용자 문제와 비즈니스 목표를 함께 정리하는 방식입니다. 데스크 리서치와 사용자 조사에서 출발해 핵심 여정과 요구사항을 정의하고, 이후 IA·UX라이팅·기능정의서로 구조를 설계한 뒤, 프로토타입과 UI화면정의, 스토리보드, 검수 시나리오까지 연결해 실제 개발 가능한 상태로 구체화합니다.`;

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

        content = content.replace(oldText, newText);

        if (content !== original) {
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`Updated Section 5 intro in: ${filepath}`);
        } else {
            console.log(`No changes made in: ${filepath}`);
        }
    }
});
