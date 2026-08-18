const fs = require('fs');

const newTitle = "UI/UX기획, 디자인 외주업체 슈퍼플래닝 | 모바일앱 화면설계";
const newDesc = "슈퍼플래닝은 모바일 앱과 웹 서비스의 완벽한 사용자 경험을 설계하는 특허 보유 UI/UX 기획 및 디자인 에이전시입니다. UX리서치와 UX라이팅, 피그마 기반의 와이어프레임, 화면설계서, UI디자인을 통해 개발 연계성이 뛰어난 최적의 UX산출물을 제공합니다.";

const htmlFiles = [
    'implementation/ux_design/index.html',
    'implementation/ux_design.html',
    'implementation/ux-design.html',
    'implementation/ux_design_cleanroom/index.html',
    'implementation/ux_design_cleanroom.html',
    'implementation/ux_design_cleanroom_v2/index.html',
    'implementation/ux_plan/index.html'
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

// Update Markdown Mirror: implementation/services/ux-planning-design.md
const mdFile = 'implementation/services/ux-planning-design.md';
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
