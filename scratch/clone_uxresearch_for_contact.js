const fs = require('fs');

// Read the exact UX Research page HTML file
const uxResearchContent = fs.readFileSync('implementation/ux_research/index.html', 'utf8');

let contactHtml = uxResearchContent;

// 1. Meta / Title / SEO updates
contactHtml = contactHtml.replace(
    /<title>[^<]*<\/title>/i,
    '<title>문의하기 | 슈퍼플래닝 UX스튜디오</title>'
);

contactHtml = contactHtml.replace(
    /<meta name="description" content="[^"]*">/i,
    '<meta name="description" content="슈퍼플래닝 문의하기 및 찾아오시는 길 안내 페이지입니다. UX리서치, UX라이팅, UI/UX기획/디자인, 웹/앱개발, 기업출강 관련 문의를 남겨주시면 신속하게 안내해 드립니다.">'
);

contactHtml = contactHtml.replace(
    /<meta name="keywords" content="[^"]*">/i,
    '<meta name="keywords" content="문의하기, 프로젝트문의, 찾아오시는길, 슈퍼플래닝, Superplanning, UX견적, UX컨설팅문의, UX기획문의, UX리서치문의">'
);

contactHtml = contactHtml.replace(
    /<link rel="canonical" href="[^"]*">/i,
    '<link rel="canonical" href="https://superplanning.blog/contact">'
);

contactHtml = contactHtml.replace(
    /<meta property="og:title" content="[^"]*">/i,
    '<meta property="og:title" content="문의하기 | 슈퍼플래닝 UX스튜디오">'
);

contactHtml = contactHtml.replace(
    /<meta property="og:description" content="[^"]*">/i,
    '<meta property="og:description" content="문의하기 페이지에서 UX기획/디자인, UX리서치, UX라이팅, 앱개발, 기업출강 관련 문의를 남겨주시면 신속하게 안내해 드립니다.">'
);

contactHtml = contactHtml.replace(
    /<meta name="twitter:title" content="[^"]*">/i,
    '<meta name="twitter:title" content="문의하기 | 슈퍼플래닝 UX스튜디오">'
);

contactHtml = contactHtml.replace(
    /<meta name="twitter:description" content="[^"]*">/i,
    '<meta name="twitter:description" content="문의하기 페이지에서 UX기획/디자인, UX리서치, UX라이팅, 앱개발, 기업출강 관련 문의를 남겨주시면 신속하게 안내해 드립니다.">'
);

// 2. Active GNB link
contactHtml = contactHtml.replace(
    '<a class="gnb-link" href="/contact/"><span>문의하기</span></a>',
    '<a class="gnb-link active" href="/contact/"><span>문의하기</span></a>'
);
contactHtml = contactHtml.replace(
    '<a class="gnb-link active" href="/ux_research/"><span>UX리서치</span></a>',
    '<a class="gnb-link" href="/ux_research/"><span>UX리서치</span></a>'
);

// 3. Titlebar text
contactHtml = contactHtml.replace(
    '<span>슈퍼플래닝 서비스 탐색기</span>',
    '<span>슈퍼플래닝 서비스 탐색기 — 문의하기</span>'
);

// 4. Address bar text
contactHtml = contactHtml.replace(
    'C:\\SUPERPLANNING\\UX_서비스\\UX_리서치',
    'C:\\SUPERPLANNING\\문의하기'
);

// 5. Left Tree Sidebar TOC
const oldTreeSidebar = contactHtml.substring(
    contactHtml.indexOf('<aside class="tree-sidebar"'),
    contactHtml.indexOf('</aside>') + 8
);

const newTreeSidebar = `<aside class="tree-sidebar" aria-label="탐색기 목차 트리">
          <div class="tree-root">
            <span class="tree-toggle">日</span>
            <span class="folder-icon">📂</span>
            <span>슈퍼플래닝 &gt; 문의하기</span>
          </div>

          <!-- Tree List TOC (ul.tree-list.toc) -->
          <ul class="tree-list toc">
            <li class="tree-item"><a href="#contact" class="tree-link"><span class="doc-icon">📄</span> <span>1. 문의하기</span></a></li>
            <li class="tree-item"><a href="#location" class="tree-link"><span class="doc-icon">📄</span> <span>2. 찾아오시는 길</span></a></li>
          </ul>
        </aside>`;

contactHtml = contactHtml.replace(oldTreeSidebar, newTreeSidebar);

// 6. Right Main Content Pane
const oldMainPane = contactHtml.substring(
    contactHtml.indexOf('<main class="main-content-pane">'),
    contactHtml.indexOf('</main>') + 7
);

const newMainPane = `<main class="main-content-pane">

          <h1>문의하기</h1>

          <h2 id="contact">1. 문의하기</h2>

          <h2 id="location">2. 찾아오시는 길</h2>

          <div class="bottom-nav">
            <p>이전 단계: <a href="/company/">회사소개</a> &nbsp;|&nbsp; 다음 단계: <a href="/ux_research/">UX리서치</a></p>
            <p>마크다운 미러: <a href="/services/ux-planning-design.md">/services/ux-planning-design.md</a> · AI 색인: <a href="/llms.txt">/llms.txt</a></p>
          </div>
        </main>`;

contactHtml = contactHtml.replace(oldMainPane, newMainPane);

// 7. Statusbar count
contactHtml = contactHtml.replace('9개 개체', '2개 개체');

// Write out exact cloned contact HTML to both files
fs.writeFileSync('implementation/contact/index.html', contactHtml, 'utf8');
console.log('Saved cloned implementation/contact/index.html');

fs.writeFileSync('implementation/contact.html', contactHtml, 'utf8');
console.log('Saved cloned implementation/contact.html');
