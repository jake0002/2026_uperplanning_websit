const fs = require('fs');
const path = require('path');

// Read exact UX Research page HTML file
const uxResearchContent = fs.readFileSync('implementation/ux_research/index.html', 'utf8');

let devHtml = uxResearchContent;

// 1. Meta / Title / SEO updates
devHtml = devHtml.replace(
    /<title>[^<]*<\/title>/i,
    '<title>웹/앱 개발 전문 에이전시 슈퍼플래닝 | AI기반 개발 및 유지보수</title>'
);

devHtml = devHtml.replace(
    /<meta name="description" content="[^"]*">/i,
    '<meta name="description" content="슈퍼플래닝은 완벽한 UI/UX 기획과 연계된 AI 기반 웹/앱 개발 전문 회사입니다. 프론트엔드, 백엔드 개발부터 연간 유지보수까지 최적의 개발 서비스를 제공합니다.">'
);

devHtml = devHtml.replace(
    /<meta name="keywords" content="[^"]*">/i,
    '<meta name="keywords" content="웹개발, 앱개발, 앱개발 외주업체, AI기반 개발, UI/UX 개발, IT개발, 웹앱 유지보수, 슈퍼플래닝, Superplanning">'
);

devHtml = devHtml.replace(
    /<link rel="canonical" href="[^"]*">/i,
    '<link rel="canonical" href="https://superplanning.blog/web-app-development">'
);

devHtml = devHtml.replace(
    /<meta property="og:title" content="[^"]*">/i,
    '<meta property="og:title" content="웹/앱 개발 전문 에이전시 슈퍼플래닝">'
);

devHtml = devHtml.replace(
    /<meta property="og:description" content="[^"]*">/i,
    '<meta property="og:description" content="완벽한 UI/UX 기획과 연계된 AI 기반 웹/앱 개발 및 유지보수 서비스.">'
);

devHtml = devHtml.replace(
    /<meta name="twitter:title" content="[^"]*">/i,
    '<meta name="twitter:title" content="웹/앱 개발 전문 에이전시 슈퍼플래닝">'
);

devHtml = devHtml.replace(
    /<meta name="twitter:description" content="[^"]*">/i,
    '<meta name="twitter:description" content="완벽한 UI/UX 기획과 연계된 AI 기반 웹/앱 개발 및 유지보수 서비스.">'
);

// 2. Active GNB link
devHtml = devHtml.replace(
    /<a class="gnb-link([^"]*)" href="[^"]*"><span>웹\/앱개발<\/span><\/a>/g,
    '<a class="gnb-link active" href="/web-app-development/"><span>웹/앱개발</span></a>'
);
devHtml = devHtml.replace(
    '<a class="gnb-link active" href="/ux_research/"><span>UX리서치</span></a>',
    '<a class="gnb-link" href="/ux_research/"><span>UX리서치</span></a>'
);

// 3. Titlebar text
devHtml = devHtml.replace(
    '<span>슈퍼플래닝 서비스 탐색기</span>',
    '<span>슈퍼플래닝 서비스 탐색기 — 웹/앱 개발</span>'
);

// 4. Address bar text
devHtml = devHtml.replace(
    'C:\\SUPERPLANNING\\UX_서비스\\UX_리서치',
    'C:\\SUPERPLANNING\\UX_서비스\\웹_앱_개발'
);

// 5. Left Tree Sidebar TOC
const oldTreeSidebar = devHtml.substring(
    devHtml.indexOf('<aside class="tree-sidebar"'),
    devHtml.indexOf('</aside>') + 8
);

const newTreeSidebar = `<aside class="tree-sidebar" aria-label="탐색기 목차 트리">
          <div class="tree-root">
            <span class="tree-toggle">日</span>
            <span class="folder-icon">📂</span>
            <span>UX서비스 &gt; 웹/앱 개발</span>
          </div>

          <!-- Tree List TOC (ul.tree-list.toc) -->
          <ul class="tree-list toc">
            <li class="tree-item"><a href="#optimization" class="tree-link"><span class="doc-icon">📄</span> <span>1. UX디자인에 최적화된 웹/앱 개발</span></a></li>
            <li class="tree-item"><a href="#ai-dev" class="tree-link"><span class="doc-icon">📄</span> <span>2. 핵심 서비스: AI기반 개발</span></a></li>
            <li class="tree-item"><a href="#diff" class="tree-link"><span class="doc-icon">📄</span> <span>3. 슈퍼플래닝만의 차별점</span></a></li>
            <li class="tree-item"><a href="#process" class="tree-link"><span class="doc-icon">📄</span> <span>4. 개발 진행 프로세스: 기획부터 운영까지</span></a></li>
            <li class="tree-item"><a href="#maintenance" class="tree-link"><span class="doc-icon">📄</span> <span>5. 연간 유지보수</span></a></li>
            <li class="tree-item"><a href="#faq" class="tree-link"><span class="doc-icon">📄</span> <span>6. 자주 묻는 질문 (FAQ)</span></a></li>
          </ul>
        </aside>`;

devHtml = devHtml.replace(oldTreeSidebar, newTreeSidebar);

// 6. Right Main Content Pane
const oldMainPane = devHtml.substring(
    devHtml.indexOf('<main class="main-content-pane">'),
    devHtml.indexOf('</main>') + 7
);

const newMainPane = `<main class="main-content-pane">

          <h1>웹/앱 개발</h1>

          <h2 id="optimization">1. UX디자인에 최적화된 웹/앱 개발</h2>

          <h2 id="ai-dev">2. 핵심 서비스: AI기반 개발</h2>

          <h2 id="diff">3. 슈퍼플래닝만의 차별점</h2>

          <h2 id="process">4. 개발 진행 프로세스: 기획부터 운영까지</h2>

          <h2 id="maintenance">5. 연간 유지보수</h2>

          <h2 id="faq">6. 자주 묻는 질문 (FAQ)</h2>

          <div class="bottom-nav">
            <p>이전 단계: <a href="/ux_design/">UX기획/디자인</a> &nbsp;|&nbsp; 다음 단계: <a href="/company/">회사소개</a></p>
            <p>마크다운 미러: <a href="/services/ux-planning-design.md">/services/ux-planning-design.md</a> · AI 색인: <a href="/llms.txt">/llms.txt</a></p>
          </div>
        </main>`;

devHtml = devHtml.replace(oldMainPane, newMainPane);

// 7. Statusbar count & path
devHtml = devHtml.replace('9개 개체', '6개 개체');

// Directories to write
const targetDirs = [
    'implementation/web-app-development',
    'implementation/app_dev'
];

targetDirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(path.join(dir, 'index.html'), devHtml, 'utf8');
    console.log(`Created ${dir}/index.html`);
});

fs.writeFileSync('implementation/web-app-development.html', devHtml, 'utf8');
console.log('Created implementation/web-app-development.html');

fs.writeFileSync('implementation/app_dev.html', devHtml, 'utf8');
console.log('Created implementation/app_dev.html');
