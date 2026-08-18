const fs = require('fs');
const path = require('path');

// Read exact UX Research page HTML file
const uxResearchContent = fs.readFileSync('implementation/ux_research/index.html', 'utf8');

let writingHtml = uxResearchContent;

// 1. Meta / Title / SEO updates
writingHtml = writingHtml.replace(
    /<title>[^<]*<\/title>/i,
    '<title>UX라이팅 전문 에이전시 슈퍼플래닝 | 보이스앤톤 가이드라인 및 화면 문구 개선</title>'
);

writingHtml = writingHtml.replace(
    /<meta name="description" content="[^"]*">/i,
    '<meta name="description" content="슈퍼플래닝은 서비스의 명확한 전달력과 이탈률 감소를 위한 특허 보유 UX 라이팅 전문 에이전시입니다. 브랜드 보이스앤톤 가이드라인 수립, 버튼/오류문구/안내메시지 라이팅, UX라이팅 강의 및 AI 플러그인을 제공합니다.">'
);

writingHtml = writingHtml.replace(
    /<meta name="keywords" content="[^"]*">/i,
    '<meta name="keywords" content="UX라이팅, UX라이팅 외주업체, 보이스앤톤, UX라이팅 가이드, 화면문구 개선, UX라이팅 강의, UX라이팅 플러그인, 슈퍼플래닝, Superplanning">'
);

writingHtml = writingHtml.replace(
    /<link rel="canonical" href="[^"]*">/i,
    '<link rel="canonical" href="https://superplanning.blog/ux_writing">'
);

writingHtml = writingHtml.replace(
    /<meta property="og:title" content="[^"]*">/i,
    '<meta property="og:title" content="UX라이팅 전문 에이전시 슈퍼플래닝">'
);

writingHtml = writingHtml.replace(
    /<meta property="og:description" content="[^"]*">/i,
    '<meta property="og:description" content="명확한 UX라이팅으로 서비스 이탈률을 줄이고 완성도를 높이는 슈퍼플래닝 UX라이팅.">'
);

writingHtml = writingHtml.replace(
    /<meta name="twitter:title" content="[^"]*">/i,
    '<meta name="twitter:title" content="UX라이팅 전문 에이전시 슈퍼플래닝">'
);

writingHtml = writingHtml.replace(
    /<meta name="twitter:description" content="[^"]*">/i,
    '<meta name="twitter:description" content="명확한 UX라이팅으로 서비스 이탈률을 줄이고 완성도를 높이는 슈퍼플래닝 UX라이팅.">'
);

// 2. Active GNB link
writingHtml = writingHtml.replace(
    /<a class="gnb-link" href="[^"]*"><span>UX라이팅<\/span><\/a>/g,
    '<a class="gnb-link active" href="/ux_writing/"><span>UX라이팅</span></a>'
);
writingHtml = writingHtml.replace(
    '<a class="gnb-link active" href="/ux_research/"><span>UX리서치</span></a>',
    '<a class="gnb-link" href="/ux_research/"><span>UX리서치</span></a>'
);

// 3. Titlebar text
writingHtml = writingHtml.replace(
    '<span>슈퍼플래닝 서비스 탐색기</span>',
    '<span>슈퍼플래닝 서비스 탐색기 — UX 라이팅</span>'
);

// 4. Address bar text
writingHtml = writingHtml.replace(
    'C:\\SUPERPLANNING\\UX_서비스\\UX_리서치',
    'C:\\SUPERPLANNING\\UX_서비스\\UX_라이팅'
);

// 5. Left Tree Sidebar TOC
const oldTreeSidebar = writingHtml.substring(
    writingHtml.indexOf('<aside class="tree-sidebar"'),
    writingHtml.indexOf('</aside>') + 8
);

const newTreeSidebar = `<aside class="tree-sidebar" aria-label="탐색기 목차 트리">
          <div class="tree-root">
            <span class="tree-toggle">日</span>
            <span class="folder-icon">📂</span>
            <span>UX서비스 &gt; UX라이팅</span>
          </div>

          <!-- Tree List TOC (ul.tree-list.toc) -->
          <ul class="tree-list toc">
            <li class="tree-item"><a href="#meaning" class="tree-link"><span class="doc-icon">📄</span> <span>1. UX라이팅 뜻과 원칙</span></a></li>
            <li class="tree-item"><a href="#deliverables" class="tree-link"><span class="doc-icon">📄</span> <span>2. 핵심산출물: UX라이팅 가이드</span></a></li>
            <li class="tree-item"><a href="#diff" class="tree-link"><span class="doc-icon">📄</span> <span>3. 슈퍼플래닝만의 차별점</span></a></li>
            <li class="tree-item"><a href="#process" class="tree-link"><span class="doc-icon">📄</span> <span>4. 진행 프로세스</span></a></li>
            <li class="tree-item"><a href="#lecture" class="tree-link"><span class="doc-icon">📄</span> <span>5. UX라이팅 강의</span></a></li>
            <li class="tree-item"><a href="#plugin" class="tree-link"><span class="doc-icon">📄</span> <span>6. UX라이팅 AI플러그인</span></a></li>
            <li class="tree-item"><a href="#faq" class="tree-link"><span class="doc-icon">📄</span> <span>7. 자주 묻는 질문</span></a></li>
          </ul>
        </aside>`;

writingHtml = writingHtml.replace(oldTreeSidebar, newTreeSidebar);

// 6. Right Main Content Pane
const oldMainPane = writingHtml.substring(
    writingHtml.indexOf('<main class="main-content-pane">'),
    writingHtml.indexOf('</main>') + 7
);

const newMainPane = `<main class="main-content-pane">

          <h1>UX 라이팅</h1>

          <h2 id="meaning">1. UX라이팅 뜻과 원칙</h2>

          <h2 id="deliverables">2. 핵심산출물: UX라이팅 가이드</h2>

          <h2 id="diff">3. 슈퍼플래닝만의 차별점</h2>

          <h2 id="process">4. 진행 프로세스</h2>

          <h2 id="lecture">5. UX라이팅 강의</h2>

          <h2 id="plugin">6. UX라이팅 AI플러그인</h2>

          <h2 id="faq">7. 자주 묻는 질문</h2>

          <div class="bottom-nav">
            <p>이전 단계: <a href="/ux_research/">UX리서치</a> &nbsp;|&nbsp; 다음 단계: <a href="/ux_design/">UX기획/디자인</a></p>
            <p>마크다운 미러: <a href="/services/ux-planning-design.md">/services/ux-planning-design.md</a> · AI 색인: <a href="/llms.txt">/llms.txt</a></p>
          </div>
        </main>`;

writingHtml = writingHtml.replace(oldMainPane, newMainPane);

// 7. Statusbar count
writingHtml = writingHtml.replace('9개 개체', '7개 개체');

// Directories to write
const targetDirs = [
    'implementation/ux_writing',
    'implementation/UX_Writing'
];

targetDirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(path.join(dir, 'index.html'), writingHtml, 'utf8');
    console.log(`Created ${dir}/index.html`);
});

fs.writeFileSync('implementation/ux_writing.html', writingHtml, 'utf8');
console.log('Created implementation/ux_writing.html');

fs.writeFileSync('implementation/ux-writing.html', writingHtml, 'utf8');
console.log('Created implementation/ux-writing.html');
