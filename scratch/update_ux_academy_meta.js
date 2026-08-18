const fs = require('fs');

const targetTitle = "UIUX강의, UX디자인 강의, AI활용 서비스 기획 강의, UIUX학원 | 슈퍼플래닝";
const targetDescription = "슈퍼플래닝은 현업 UX에이전시가 직접 운영하는 전문 UIUX교육회사 입니다. UX리서치강의, UX라이팅강의, AI활용 서비스기획, 피그마(Figma), 바이브코딩, 앱 화면기획 등 실무 중심형 UX커리큘럼을 제공합니다. 기업출강, 강사파견, 1:1강의, UI/UX부트캠프, UX디자인 포트폴리오 코칭 등을 제공합니다.";

const academyFiles = [
    'implementation/ux-academy/index.html',
    'implementation/ux-academy.html',
    'implementation/ux_academy/index.html',
    'implementation/ux_academy.html'
];

academyFiles.forEach(filepath => {
    if (fs.existsSync(filepath)) {
        let content = fs.readFileSync(filepath, 'utf8');
        const original = content;

        // Title
        content = content.replace(/<title>[^<]*<\/title>/i, `<title>${targetTitle}</title>`);
        content = content.replace(/<meta property="og:title" content="[^"]*">/i, `<meta property="og:title" content="${targetTitle}">`);
        content = content.replace(/<meta name="twitter:title" content="[^"]*">/i, `<meta name="twitter:title" content="${targetTitle}">`);

        // Description
        content = content.replace(/<meta name="description" content="[^"]*">/i, `<meta name="description" content="${targetDescription}">`);
        content = content.replace(/<meta property="og:description" content="[^"]*">/i, `<meta property="og:description" content="${targetDescription}">`);
        content = content.replace(/<meta name="twitter:description" content="[^"]*">/i, `<meta name="twitter:description" content="${targetDescription}">`);

        if (content !== original) {
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`Updated title and description in: ${filepath}`);
        }
    }
});
