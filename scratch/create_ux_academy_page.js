const fs = require('fs');
const path = require('path');

// Read exact UX Research page HTML file
const uxResearchContent = fs.readFileSync('implementation/ux-research/index.html', 'utf8');

let academyHtml = uxResearchContent;

// 1. Meta / Title / SEO updates
academyHtml = academyHtml.replace(
    /<title>[^<]*<\/title>/i,
    '<title>AI-UX 강의 및 기업 출강 | 슈퍼플래닝 UX 아카데미</title>'
);

academyHtml = academyHtml.replace(
    /<meta name="description" content="[^"]*">/i,
    '<meta name="description" content="슈퍼플래닝은 AI를 활용한 실무 UI/UX 기획 1:1 커스텀 강의와 대기업/스타트업 맞춤형 기업 출강 및 강사 파견 서비스를 제공하는 전문 UX 교육 기관입니다.">'
);

academyHtml = academyHtml.replace(
    /<meta name="keywords" content="[^"]*">/i,
    '<meta name="keywords" content="UX강의, UX강의학원, AI UX강의, 기업출강, UX기업출강, 강사파견, UIUX 포트폴리오, UX학원, 슈퍼플래닝, Superplanning">'
);

academyHtml = academyHtml.replace(
    /<link rel="canonical" href="[^"]*">/i,
    '<link rel="canonical" href="https://superplanning.blog/ux-academy">'
);

academyHtml = academyHtml.replace(
    /<meta property="og:title" content="[^"]*">/i,
    '<meta property="og:title" content="AI-UX 강의 및 기업 출강 | 슈퍼플래닝">'
);

academyHtml = academyHtml.replace(
    /<meta property="og:description" content="[^"]*">/i,
    '<meta property="og:description" content="AI를 활용한 실무 UI/UX 기획 1:1 강의와 대기업/스타트업 맞춤형 기업 출강 교육.">'
);

academyHtml = academyHtml.replace(
    /<meta name="twitter:title" content="[^"]*">/i,
    '<meta name="twitter:title" content="AI-UX 강의 및 기업 출강 | 슈퍼플래닝">'
);

academyHtml = academyHtml.replace(
    /<meta name="twitter:description" content="[^"]*">/i,
    '<meta name="twitter:description" content="AI를 활용한 실무 UI/UX 기획 1:1 강의와 대기업/스타트업 맞춤형 기업 출강 교육.">'
);

// 2. Active GNB link for AI-UX강의
academyHtml = academyHtml.replace(
    /<a class="gnb-link([^"]*)" href="[^"]*"><span>AI-UX강의<\/span><\/a>/g,
    '<a class="gnb-link active" href="/ux-academy/"><span>AI-UX강의</span></a>'
);
academyHtml = academyHtml.replace(
    /<a class="gnb-link([^"]*)" onclick="openWindow\('classes'\);[^"]*"><span>AI-UX강의<\/span><\/a>/g,
    '<a class="gnb-link active" href="/ux-academy/"><span>AI-UX강의</span></a>'
);
academyHtml = academyHtml.replace(
    '<a class="gnb-link active" href="/ux-research/"><span>UX리서치</span></a>',
    '<a class="gnb-link" href="/ux-research/"><span>UX리서치</span></a>'
);

// 3. Titlebar text
academyHtml = academyHtml.replace(
    '<span>슈퍼플래닝 서비스 탐색기 — UX 리서치</span>',
    '<span>슈퍼플래닝 서비스 탐색기 — AI-UX 강의</span>'
);
academyHtml = academyHtml.replace(
    '<span>슈퍼플래닝 서비스 탐색기</span>',
    '<span>슈퍼플래닝 서비스 탐색기 — AI-UX 강의</span>'
);

// 4. Address bar text
academyHtml = academyHtml.replace(
    'C:\\SUPERPLANNING\\UX_서비스\\UX_리서치',
    'C:\\SUPERPLANNING\\UX_서비스\\UX_강의'
);

// 5. Left Tree Sidebar TOC
const oldTreeSidebar = academyHtml.substring(
    academyHtml.indexOf('<aside class="tree-sidebar"'),
    academyHtml.indexOf('</aside>') + 8
);

const newTreeSidebar = `<aside class="tree-sidebar" aria-label="탐색기 목차 트리">
          <div class="tree-root">
            <span class="tree-toggle">日</span>
            <span class="folder-icon">📂</span>
            <span>UX서비스 &gt; UX강의</span>
          </div>

          <!-- Tree List TOC (ul.tree-list.toc) -->
          <ul class="tree-list toc">
            <li class="tree-item"><a href="#intro" class="tree-link"><span class="doc-icon">📄</span> <span>1. AI-UX강의소개</span></a></li>
            <li class="tree-item"><a href="#reviews" class="tree-link"><span class="doc-icon">📄</span> <span>2. 수강후기</span></a></li>
            <li class="tree-item"><a href="#history" class="tree-link"><span class="doc-icon">📄</span> <span>3. 기업 출강 및 강의 이력</span></a></li>
            <li class="tree-item"><a href="#curriculum" class="tree-link"><span class="doc-icon">📄</span> <span>4. 핵심 커리큘럼</span></a></li>
            <li class="tree-item"><a href="#pricing" class="tree-link"><span class="doc-icon">📄</span> <span>5. 코스 별 강의비용</span></a></li>
            <li class="tree-item"><a href="#target" class="tree-link"><span class="doc-icon">📄</span> <span>6. 수강 대상자</span></a></li>
            <li class="tree-item"><a href="#benefits" class="tree-link"><span class="doc-icon">📄</span> <span>7. 수강생 혜택</span></a></li>
            <li class="tree-item"><a href="#faq" class="tree-link"><span class="doc-icon">📄</span> <span>8. 자주 묻는 질문 (FAQ)</span></a></li>
          </ul>
        </aside>`;

academyHtml = academyHtml.replace(oldTreeSidebar, newTreeSidebar);

// 6. Right Main Content Pane
const oldMainPane = academyHtml.substring(
    academyHtml.indexOf('<main class="main-content-pane">'),
    academyHtml.indexOf('</main>') + 7
);

const newMainPane = `<main class="main-content-pane">

          <h1>AI-UX 강의</h1>

          <h2 id="intro">1. AI-UX강의소개</h2>

          <h2 id="reviews">2. 수강후기</h2>

          <h2 id="history">3. 기업 출강 및 강의 이력</h2>

          <h2 id="curriculum">4. 핵심 커리큘럼</h2>

          <h2 id="pricing">5. 코스 별 강의비용</h2>

          <h2 id="target">6. 수강 대상자</h2>

          <h2 id="benefits">7. 수강생 혜택</h2>

          <h2 id="faq">8. 자주 묻는 질문 (FAQ)</h2>

          <div class="bottom-nav">
            <p>이전 단계: <a href="/web-app-development/">웹/앱 개발</a> &nbsp;|&nbsp; 다음 단계: <a href="/company/">회사소개</a></p>
            <p>마크다운 미러: <a href="/services/ux-planning-design.md">/services/ux-planning-design.md</a> · AI 색인: <a href="/llms.txt">/llms.txt</a></p>
          </div>
        </main>`;

academyHtml = academyHtml.replace(oldMainPane, newMainPane);

// 7. Statusbar count & path
academyHtml = academyHtml.replace('9개 개체', '8개 개체');

// Directories to write
const targetDirs = [
    'implementation/ux-academy',
    'implementation/ux_academy'
];

targetDirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(path.join(dir, 'index.html'), academyHtml, 'utf8');
    console.log(`Created ${dir}/index.html`);
});

fs.writeFileSync('implementation/ux-academy.html', academyHtml, 'utf8');
console.log('Created implementation/ux-academy.html');

fs.writeFileSync('implementation/ux_academy.html', academyHtml, 'utf8');
console.log('Created implementation/ux_academy.html');
