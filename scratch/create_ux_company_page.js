const fs = require('fs');
const path = require('path');

// Read exact UX Research page HTML file
const uxResearchContent = fs.readFileSync('implementation/ux-research/index.html', 'utf8');

let companyHtml = uxResearchContent;

// 1. Meta / Title / SEO updates
companyHtml = companyHtml.replace(
    /<title>[^<]*<\/title>/i,
    '<title>회사소개 | 슈퍼플래닝 (Superplanning UX Studio)</title>'
);

companyHtml = companyHtml.replace(
    /<meta name="description" content="[^"]*">/i,
    '<meta name="description" content="복잡한 화면을 덜어내고 필요한 것만 남기는 UX 전문 스튜디오 슈퍼플래닝 회사소개. 기업 비전, 브랜드 스토리, 핵심 서비스, 회사 조직도 안내.">'
);

companyHtml = companyHtml.replace(
    /<meta name="keywords" content="[^"]*">/i,
    '<meta name="keywords" content="회사소개, 슈퍼플래닝, Superplanning, UX에이전시, UX스튜디오, UX라이팅, UX리서치, UI디자인, 브랜드스토리, 기업비전">'
);

companyHtml = companyHtml.replace(
    /<link rel="canonical" href="[^"]*">/i,
    '<link rel="canonical" href="https://superplanning.blog/ux-company">'
);

companyHtml = companyHtml.replace(
    /<meta property="og:title" content="[^"]*">/i,
    '<meta property="og:title" content="회사소개 | 슈퍼플래닝">'
);

companyHtml = companyHtml.replace(
    /<meta property="og:description" content="[^"]*">/i,
    '<meta property="og:description" content="복잡한 화면을 덜어내고 진짜 필요한 것만 남깁니다. 슈퍼플래닝 브랜드 스토리 및 회사소개.">'
);

companyHtml = companyHtml.replace(
    /<meta name="twitter:title" content="[^"]*">/i,
    '<meta name="twitter:title" content="회사소개 | 슈퍼플래닝">'
);

companyHtml = companyHtml.replace(
    /<meta name="twitter:description" content="[^"]*">/i,
    '<meta name="twitter:description" content="복잡한 화면을 덜어내고 진짜 필요한 것만 남깁니다. 슈퍼플래닝 브랜드 스토리 및 회사소개.">'
);

// 2. Active GNB link for 회사소개
companyHtml = companyHtml.replace(
    /<a class="gnb-link([^"]*)" href="[^"]*"><span>회사소개<\/span><\/a>/g,
    '<a class="gnb-link active" href="/ux-company/"><span>회사소개</span></a>'
);
companyHtml = companyHtml.replace(
    '<a class="gnb-link active" href="/ux-research/"><span>UX리서치</span></a>',
    '<a class="gnb-link" href="/ux-research/"><span>UX리서치</span></a>'
);

// 3. Titlebar text
companyHtml = companyHtml.replace(
    '<span>슈퍼플래닝 서비스 탐색기 — UX 리서치</span>',
    '<span>슈퍼플래닝 서비스 탐색기 — 회사소개</span>'
);
companyHtml = companyHtml.replace(
    '<span>슈퍼플래닝 서비스 탐색기</span>',
    '<span>슈퍼플래닝 서비스 탐색기 — 회사소개</span>'
);

// 4. Address bar text
companyHtml = companyHtml.replace(
    'C:\\SUPERPLANNING\\UX_서비스\\UX_리서치',
    'C:\\SUPERPLANNING\\회사소개'
);

// 5. Left Tree Sidebar TOC
const oldTreeSidebar = companyHtml.substring(
    companyHtml.indexOf('<aside class="tree-sidebar"'),
    companyHtml.indexOf('</aside>') + 8
);

const newTreeSidebar = `<aside class="tree-sidebar" aria-label="탐색기 목차 트리">
          <div class="tree-root">
            <span class="tree-toggle">日</span>
            <span class="folder-icon">📂</span>
            <span>슈퍼플래닝 &gt; 회사소개</span>
          </div>

          <!-- Tree List TOC (ul.tree-list.toc) -->
          <ul class="tree-list toc">
            <li class="tree-item"><a href="#vision" class="tree-link"><span class="doc-icon">📄</span> <span>1. 기업비전/미션</span></a></li>
            <li class="tree-item"><a href="#story" class="tree-link"><span class="doc-icon">📄</span> <span>2. 브랜드 스토리</span></a></li>
            <li class="tree-item"><a href="#services" class="tree-link"><span class="doc-icon">📄</span> <span>3. 핵심 서비스</span></a></li>
            <li class="tree-item"><a href="#organization" class="tree-link"><span class="doc-icon">📄</span> <span>4. 회사 조직도</span></a></li>
            <li class="tree-item"><a href="#location" class="tree-link"><span class="doc-icon">📄</span> <span>5. 찾아오시는 길</span></a></li>
            <li class="tree-item"><a href="#faq" class="tree-link"><span class="doc-icon">📄</span> <span>6. 자주 묻는 질문 (FAQ)</span></a></li>
          </ul>
        </aside>`;

companyHtml = companyHtml.replace(oldTreeSidebar, newTreeSidebar);

// 6. Right Main Content Pane
const oldMainPane = companyHtml.substring(
    companyHtml.indexOf('<main class="main-content-pane">'),
    companyHtml.indexOf('</main>') + 7
);

const newMainPane = `<main class="main-content-pane">

          <h1>회사소개</h1>

          <h2 id="vision">1. 기업비전/미션</h2>

          <h2 id="story">2. 브랜드 스토리</h2>

          <h2 id="services">3. 핵심 서비스</h2>

          <h2 id="organization">4. 회사 조직도</h2>

          <h2 id="location">5. 찾아오시는 길</h2>

          <h2 id="faq">6. 자주 묻는 질문 (FAQ)</h2>

          <div class="bottom-nav">
            <p>이전 단계: <a href="/ux-academy/">AI-UX강의</a> &nbsp;|&nbsp; 다음 단계: <a href="/contact/">문의하기</a></p>
            <p>마크다운 미러: <a href="/services/ux-planning-design.md">/services/ux-planning-design.md</a> · AI 색인: <a href="/llms.txt">/llms.txt</a></p>
          </div>
        </main>`;

companyHtml = companyHtml.replace(oldMainPane, newMainPane);

// 7. Statusbar count & path
companyHtml = companyHtml.replace('9개 개체', '6개 개체');

// Directories to write
const targetDirs = [
    'implementation/ux-company',
    'implementation/company',
    'implementation/ux_company'
];

targetDirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(path.join(dir, 'index.html'), companyHtml, 'utf8');
    console.log(`Created ${dir}/index.html`);
});

fs.writeFileSync('implementation/ux-company.html', companyHtml, 'utf8');
console.log('Created implementation/ux-company.html');

fs.writeFileSync('implementation/company.html', companyHtml, 'utf8');
console.log('Created implementation/company.html');

fs.writeFileSync('implementation/ux_company.html', companyHtml, 'utf8');
console.log('Created implementation/ux_company.html');
