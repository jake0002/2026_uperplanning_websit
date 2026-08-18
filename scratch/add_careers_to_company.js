const fs = require('fs');

const companyFiles = [
    'implementation/ux-company/index.html',
    'implementation/ux-company.html',
    'implementation/company/index.html',
    'implementation/company.html',
    'implementation/ux_company/index.html',
    'implementation/ux_company.html'
];

companyFiles.forEach(filepath => {
    if (fs.existsSync(filepath)) {
        let content = fs.readFileSync(filepath, 'utf8');
        const original = content;

        // 1. Update Tree Sidebar TOC with 5. 인재채용 and 6. 자주 묻는 질문 (FAQ)
        const oldTreeSidebar = content.substring(
            content.indexOf('<aside class="tree-sidebar"'),
            content.indexOf('</aside>') + 8
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
            <li class="tree-item"><a href="#careers" class="tree-link"><span class="doc-icon">📄</span> <span>5. 인재채용</span></a></li>
            <li class="tree-item"><a href="#faq" class="tree-link"><span class="doc-icon">📄</span> <span>6. 자주 묻는 질문 (FAQ)</span></a></li>
          </ul>
        </aside>`;

        content = content.replace(oldTreeSidebar, newTreeSidebar);

        // 2. Update Main Content Pane with 5. 인재채용 and 6. 자주 묻는 질문 (FAQ)
        const oldMainPane = content.substring(
            content.indexOf('<main class="main-content-pane">'),
            content.indexOf('</main>') + 7
        );

        const newMainPane = `<main class="main-content-pane">

          <h1>회사소개</h1>

          <h2 id="vision">1. 기업비전/미션</h2>

          <h2 id="story">2. 브랜드 스토리</h2>

          <h2 id="services">3. 핵심 서비스</h2>

          <h2 id="organization">4. 회사 조직도</h2>

          <h2 id="careers">5. 인재채용</h2>

          <h2 id="faq">6. 자주 묻는 질문 (FAQ)</h2>

          <div class="bottom-nav">
            <p>이전 단계: <a href="/ux-academy/">AI-UX강의</a> &nbsp;|&nbsp; 다음 단계: <a href="/contact/">문의하기</a></p>
            <p>마크다운 미러: <a href="/services/ux-planning-design.md">/services/ux-planning-design.md</a> · AI 색인: <a href="/llms.txt">/llms.txt</a></p>
          </div>
        </main>`;

        content = content.replace(oldMainPane, newMainPane);

        // 3. Update statusbar count from 5개 개체 to 6개 개체
        content = content.replace('<div>5개 개체</div>', '<div>6개 개체</div>');

        if (content !== original) {
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`Added 5. 인재채용 to: ${filepath}`);
        }
    }
});
