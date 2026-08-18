const fs = require('fs');

// === UX기획/디자인 페이지 ===
const designFiles = [
    'implementation/ux_design/index.html',
    'implementation/ux_design.html',
    'implementation/ux-design.html',
];

const oldDesignText = '문의 페이지를 통해 현재 서비스 상황과 목표를 남겨주시면, 어떤 범위의 UX기획 지원이 필요한지 확인한 뒤 상담과 진행 방향을 안내해 드립니다.';
const newDesignText = '문의하기 페이지에서 UX기획/디자인 관련 문의를 남겨주시면 신속하게 전문 UX컨설턴트가 일정과 견적안을 안내해 드립니다.';

designFiles.forEach(filepath => {
    if (fs.existsSync(filepath)) {
        let content = fs.readFileSync(filepath, 'utf8');
        const original = content;
        content = content.replaceAll(oldDesignText, newDesignText);
        if (content !== original) {
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`Updated design FAQ text in: ${filepath}`);
        } else {
            console.log(`No match in: ${filepath}`);
        }
    }
});

// === UX리서치 페이지 ===
const researchFiles = [
    'implementation/ux_research/index.html',
    'implementation/ux_research.html',
    'implementation/ux-research.html',
];

const oldResearchText = '문의 페이지를 통해 UX리서치 문의를 남겨주시면 신속하게 전문 UX리서처가 일정과 견적안을 안내해 드립니다.';
const newResearchText = '문의하기 페이지에서 UX리서치 관련 문의를 남겨주시면 신속하게 전문 UX리서처가 일정과 견적안을 안내해 드립니다.';

researchFiles.forEach(filepath => {
    if (fs.existsSync(filepath)) {
        let content = fs.readFileSync(filepath, 'utf8');
        const original = content;
        content = content.replaceAll(oldResearchText, newResearchText);
        if (content !== original) {
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`Updated research FAQ text in: ${filepath}`);
        } else {
            console.log(`No match in: ${filepath}`);
        }
    }
});
