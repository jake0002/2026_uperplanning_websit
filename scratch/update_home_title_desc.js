const fs = require('fs');

const filepath = 'implementation/index.html';
let content = fs.readFileSync(filepath, 'utf8');

const newTitle = "슈퍼플래닝: UX디자인 에이전시, UX강의, UX리서치, UX라이팅, 웹/앱 AI개발회사";
const newDesc = "슈퍼플래닝은 웹/앱 서비스 기획과 UX/UI 디자인을 중심으로 UX리서치, UX라이팅, UX컨설팅, 앱 화면설계, UI디자인, IT개발 등 통합 서비스를 제공하는 외주 전문 UX에이전시입니다. AI를 활용한 UX기획 1:1강의와 기업 출강, 강사파견, UIUX디자인 포트폴리오 코칭 등 실무 교육 프로그램도 함께 운영합니다.";

// 1. <title>
content = content.replace(/<title>[^<]*<\/title>/i, `<title>${newTitle}</title>`);

// 2. <meta name="description">
content = content.replace(/<meta name="description" content="[^"]*">/i, `<meta name="description" content="${newDesc}">`);

// 3. og:title
content = content.replace(/<meta property="og:title" content="[^"]*">/i, `<meta property="og:title" content="${newTitle}">`);

// 4. og:description
content = content.replace(/<meta property="og:description" content="[^"]*">/i, `<meta property="og:description" content="${newDesc}">`);

// 5. twitter:title
content = content.replace(/<meta name="twitter:title" content="[^"]*">/i, `<meta name="twitter:title" content="${newTitle}">`);

// 6. twitter:description
content = content.replace(/<meta name="twitter:description" content="[^"]*">/i, `<meta name="twitter:description" content="${newDesc}">`);

// 7. JSON-LD organization description
content = content.replace(
    /"description": "복잡한 화면을 덜어내고 필요한 것만 남기는 UX 라이팅, UX 리서치, UI\/UX 기획 및 AI-UX 교육 전문 에이전시입니다\."/,
    `"description": "${newDesc}"`
);

fs.writeFileSync(filepath, content, 'utf8');
console.log('Successfully updated home page title & description in implementation/index.html');
