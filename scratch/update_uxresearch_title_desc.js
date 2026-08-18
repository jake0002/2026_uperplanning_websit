const fs = require('fs');

const newTitle = "UX리서치 전문 에이전시 슈퍼플래닝 | FGI·UT·사용자 인터뷰";
const newDesc = "슈퍼플래닝은 FGI, UT, IDI 등 정성·정량 조사를 수행하는 UX리서치 전문 회사입니다. 인터뷰 참석자 리크루팅부터 MVP검증, 사용자 행동 데이터 분석을 통해 서비스 문제 원인을 찾고 UI/UX 개선안을 도출해 드립니다.";

// Update HTML files
const htmlFiles = [
    'implementation/ux_research/index.html',
    'implementation/ux_research.html',
    'implementation/ux-research.html'
];

htmlFiles.forEach(filepath => {
    if (fs.existsSync(filepath)) {
        let content = fs.readFileSync(filepath, 'utf8');
        const original = content;

        // <title>...</title>
        content = content.replace(/<title>[^<]*<\/title>/gi, `<title>${newTitle}</title>`);

        // <meta name="description" content="...">
        content = content.replace(/<meta name="description" content="[^"]*">/gi, `<meta name="description" content="${newDesc}">`);

        // <meta property="og:title" content="...">
        content = content.replace(/<meta property="og:title" content="[^"]*">/gi, `<meta property="og:title" content="${newTitle}">`);

        // <meta property="og:description" content="...">
        content = content.replace(/<meta property="og:description" content="[^"]*">/gi, `<meta property="og:description" content="${newDesc}">`);

        // <meta name="twitter:title" content="...">
        content = content.replace(/<meta name="twitter:title" content="[^"]*">/gi, `<meta name="twitter:title" content="${newTitle}">`);

        // <meta name="twitter:description" content="...">
        content = content.replace(/<meta name="twitter:description" content="[^"]*">/gi, `<meta name="twitter:description" content="${newDesc}">`);

        if (content !== original) {
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`Updated Title & Description in: ${filepath}`);
        } else {
            console.log(`No change in: ${filepath}`);
        }
    }
});

// Update Markdown Mirror: implementation/services/ux-research.md
const mdFile = 'implementation/services/ux-research.md';
if (fs.existsSync(mdFile)) {
    let content = fs.readFileSync(mdFile, 'utf8');
    const original = content;

    content = content.replace(/title: "[^"]*"/, `title: "${newTitle}"`);
    content = content.replace(/description: "[^"]*"/, `description: "${newDesc}"`);

    if (content !== original) {
        fs.writeFileSync(mdFile, content, 'utf8');
        console.log(`Updated Title & Description in: ${mdFile}`);
    }
}
