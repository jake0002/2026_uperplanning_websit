const fs = require('fs');
const path = require('path');

const files = [
  'ux-blog/index.html',
  'ux-blog.html',
  'ux_blog.html'
];

files.forEach(f => {
  const fullPath = path.join(__dirname, '..', 'implementation', f);
  if (!fs.existsSync(fullPath)) return;

  let content = fs.readFileSync(fullPath, 'utf8');

  // Replace CSS variables and GNB CSS
  const cssVarsAndGnbCss = `
    :root {
      --bg: #008080;
      --win-bg: #c0c0c0;
      --win-fg: #000000;
      --bevel-hi: #ffffff;
      --bevel-shadow: #7b7b7b;
      --gnb-bg: rgba(0, 0, 0, 0.85);
      --gnb-fg: #ffffff;
      --gnb-bd: rgba(255, 255, 255, 0.2);
      --taskbar: #c0c0c0;
      --taskbar-h: 36px;
      --gnb-h: 34px;
      --logo-top: 14px;
      --logo-left: 14px;
      --font-mono: 'IBM Plex Mono', 'Courier New', monospace;
      --font: 'Pretendard', 'IBM Plex Mono', -apple-system, system-ui, sans-serif;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; font-family: var(--font); letter-spacing: -0.01em; }
    body {
      width: 100%;
      min-height: 100vh;
      background-color: var(--bg);
      color: var(--win-fg);
      padding-bottom: calc(var(--taskbar-h) + 16px);
      user-select: text;
    }

    /* 3. HOME BUTTON AT FAR LEFT (EXACT COPY FROM MAIN PAGE) */
    #brandLogo {
      position: fixed !important;
      top: var(--logo-top);
      left: var(--logo-left);
      height: var(--gnb-h);
      padding: 4px 18px;
      min-width: 68px;
      justify-content: center;
      z-index: 999999 !important;
      cursor: pointer;
      background: #000000 !important;
      color: #ffffff !important;
      border: 2px solid #000;
      box-shadow: inset 1px 1px 0 #333, inset -1px -1px 0 #111, 2px 2px 0 rgba(0,0,0,.35);
      font-weight: 900;
      font-size: 13px;
      display: flex;
      align-items: center;
      gap: 5px;
      user-select: none !important;
      transition: transform 0.1s ease;
    }
    #brandLogo span, #brandLogoText {
      color: #ffffff !important;
    }
    #brandLogo:hover { transform: scale(1.04); }
    #brandLogo:active { transform: scale(0.96); box-shadow: inset 1px 1px 0 #111; }

    /* 4. GNB HEADER BAR (EXACT COPY FROM MAIN PAGE) */
    #gnb {
      position: fixed !important;
      top: var(--logo-top);
      left: 95px;
      right: 14px;
      height: var(--gnb-h);
      background: var(--gnb-bg);
      color: var(--gnb-fg);
      border: 1px solid var(--gnb-bd);
      backdrop-filter: blur(8px);
      z-index: 99999 !important;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 8px;
      border-radius: 4px;
      user-select: none !important;
      overflow: visible !important;
    }

    .gnb-progress-track {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3.5px;
      background: rgba(255, 255, 255, 0.15);
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      overflow: visible;
      pointer-events: none;
      z-index: 1000;
    }
    .gnb-progress-bar {
      height: 100%;
      width: 0%;
      background: #000000;
      box-shadow: 0 0 6px rgba(0, 0, 0, 0.8);
      border-radius: 0 2px 2px 0;
      position: relative;
      transition: width 0.08s cubic-bezier(0.1, 0.7, 0.1, 1);
    }
    .gnb-progress-bar::after {
      content: '';
      position: absolute;
      right: -2px;
      top: -2px;
      width: 7.5px;
      height: 7.5px;
      border-radius: 50%;
      background: #ffffff;
      box-shadow: 0 0 6px #000000;
      opacity: 0.95;
    }
    .gnb-progress-badge {
      position: absolute;
      right: -14px;
      top: 10px;
      transform: translateX(50%);
      background: #000000;
      color: #ffffff;
      border: 1px solid #ffffff;
      border-radius: 3px;
      font-size: 10px;
      font-weight: 800;
      font-family: var(--font-mono, monospace);
      padding: 1px 6px;
      white-space: nowrap;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
      opacity: 0;
      transition: opacity 0.25s ease;
      pointer-events: none;
    }
    body.is-scrolling .gnb-progress-badge,
    .gnb-progress-track:hover .gnb-progress-badge {
      opacity: 1;
    }
    .gnb-menu {
      display: flex;
      align-items: center;
      gap: 4px;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .gnb-item { position: relative; }
    .gnb-link {
      color: #ffffff;
      padding: 4px 12px;
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
      border-radius: 3px;
      display: flex;
      align-items: center;
      gap: 4px;
      text-decoration: none;
      transition: background 0.15s ease;
      user-select: none !important;
    }
    .gnb-link:hover, .gnb-link:active, .gnb-link.active {
      background: #000000 !important;
      color: #ffffff !important;
    }
    .gnb-link:hover span, .gnb-link:active span, .gnb-link.active span {
      color: #ffffff !important;
    }
    .gnb-right {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    #mobileMenuBtn {
      display: none;
      align-items: center;
      gap: 4px;
      padding: 3px 10px;
      font-weight: 800;
      font-size: 12px;
      background: var(--win-bg);
      border: 2px solid #000;
      cursor: pointer;
    }
    #mobileNavDrawer {
      display: none;
      position: fixed;
      top: calc(var(--logo-top) + var(--gnb-h) + 4px);
      left: 10px;
      right: 10px;
      z-index: 999999 !important;
      background: var(--win-bg);
      border: 2px solid #000;
      box-shadow: inset 1px 1px 0 var(--bevel-hi), inset -1px -1px 0 var(--bevel-shadow), 4px 4px 0 rgba(0,0,0,0.5);
      padding: 10px;
    }
    #mobileNavDrawer.show { display: block !important; }
    .start-item {
      padding: 6px 10px;
      font-size: 12px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }
    .start-item:hover { background: #000000; color: #ffffff; }

    .page-wrapper {
      padding: calc(var(--logo-top) + var(--gnb-h) + 20px) 24px 24px 24px;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      width: 100%;
    }

    @media (max-width: 900px) {
      #gnb { left: 14px; }
      #brandLogo { display: none !important; }
      .gnb-menu, .gnb-right { display: none !important; }
      #mobileMenuBtn { display: flex !important; }
    }
`;

  // HTML structure for #brandLogo, #gnb, #mobileNavDrawer
  const gnbHtmlHeader = `
  <!-- 3. HOME BUTTON AT FAR LEFT (EXACT COPY FROM MAIN PAGE) -->
  <div id="brandLogo" title="Superplanning OS95 — 홈으로 이동" onclick="location.href='https://superplanning.blog/';">
    <span id="brandLogoText">홈</span>
  </div>

  <!-- 4. GNB HEADER (EXACT COPY FROM OTHER SUBPAGES) -->
  <div id="gnb">
    <ul class="gnb-menu">
      <li class="gnb-item">
        <a class="gnb-link" href="/ux-research/"><span>UX리서치</span></a>
      </li>
      <li class="gnb-item">
        <a class="gnb-link" href="/ux-writing/"><span>UX라이팅</span></a>
      </li>
      <li class="gnb-item">
        <a class="gnb-link" href="/ux-design/"><span>UX기획/디자인</span></a>
      </li>
      <li class="gnb-item">
        <a class="gnb-link" href="/web-app-development/"><span>웹/앱개발</span></a>
      </li>
      <li class="gnb-item">
        <a class="gnb-link" href="/ux-academy/"><span>AI-UX강의</span></a>
      </li>
      <li class="gnb-item">
        <a class="gnb-link active" href="/ux-blog/"><span>UX블로그</span></a>
      </li>
      <li class="gnb-item">
        <a class="gnb-link" href="/ux-company/"><span>회사소개</span></a>
      </li>
      <li class="gnb-item">
        <a class="gnb-link" href="/contact/"><span>문의하기</span></a>
      </li>
    </ul>

    <div class="gnb-right">
      <button class="w95-btn" style="padding:2px 8px; font-size:11px;" onclick="location.href='https://superplanning.blog/';">
        <span>포트폴리오 보기</span>
      </button>
      <button class="w95-btn" style="padding:2px 8px; font-size:11px;" onclick="location.href='https://superplanning.blog/';">
        <span>인재채용</span>
      </button>
      <button class="w95-btn" style="padding:2px 8px; font-size:11px;" id="langBtn"><span style="font-weight:bold; color:#000080;">KOR</span> | <span style="opacity:0.5;">ENG</span></button>
    </div>

    <!-- MOBILE HAMBURGER BUTTON -->
    <button id="mobileMenuBtn" class="w95-btn" onclick="toggleMobileMenu();">
      <span>☰</span> <span>메뉴</span>
    </button>

    <!-- SCROLL PROGRESS GAUGE BAR -->
    <div id="gnbProgressBarTrack" class="gnb-progress-track" title="페이지 스크롤 진행률">
      <div id="gnbProgressBar" class="gnb-progress-bar">
        <span id="gnbProgressBadge" class="gnb-progress-badge">0%</span>
      </div>
    </div>
  </div>

  <!-- MOBILE GNB NAVIGATION DRAWER -->
  <div id="mobileNavDrawer">
    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #000; padding-bottom:6px; margin-bottom:8px;">
      <strong style="font-size:13px; color:#000000;">GNB 전체 메뉴</strong>
      <button class="w95-btn" style="padding:1px 8px; font-size:11px;" onclick="toggleMobileMenu();">✕ 닫기</button>
    </div>
    <div style="display:flex; flex-direction:column; gap:4px;">
      <div class="start-item" onclick="location.href='/'; toggleMobileMenu();">• 슈퍼플래닝</div>
      <div class="start-item" onclick="location.href='/#clients'; toggleMobileMenu();">• 주요 고객사</div>
      <div class="start-item" onclick="location.href='/#services'; toggleMobileMenu();">• UX서비스</div>
      <div class="start-item" onclick="location.href='/ux-research/'; toggleMobileMenu();">• UX리서치</div>
      <div class="start-item" onclick="location.href='/ux-writing/'; toggleMobileMenu();">• UX라이팅</div>
      <div class="start-item" onclick="location.href='/ux-design/'; toggleMobileMenu();">• UX기획/디자인</div>
      <div class="start-item" onclick="location.href='/web-app-development/'; toggleMobileMenu();">• 웹/앱개발</div>
      <div class="start-item" onclick="location.href='/ux-academy/'; toggleMobileMenu();">• AI-UX강의</div>
      <div class="start-item" onclick="location.href='/ux-blog/'; toggleMobileMenu();">• UX블로그</div>
      <div class="start-item" onclick="location.href='/ux-company/'; toggleMobileMenu();">• 회사소개</div>
      <div class="start-item" onclick="location.href='/contact/'; toggleMobileMenu();">• 문의하기</div>
    </div>
  </div>
`;

  // Replace <nav id="topGnb">...</nav> with gnbHtmlHeader
  content = content.replace(/<nav id="topGnb">[\s\S]*?<\/nav>/, gnbHtmlHeader);

  // Replace CSS block
  const cssRegex = /\/\* RESET & BASE STYLES \*\/[\s\S]*?\/\* RESPONSIVE LAYOUT \*\//;
  if (cssRegex.test(content)) {
    content = content.replace(cssRegex, cssVarsAndGnbCss + '\n    /* RESPONSIVE LAYOUT */');
  }

  // Add toggleMobileMenu function to script if not present
  if (!content.includes('function toggleMobileMenu')) {
    content = content.replace(
      '// GNB SCROLL PROGRESS GAUGE BAR',
      `function toggleMobileMenu() {
      const drawer = document.getElementById('mobileNavDrawer');
      if (drawer) drawer.classList.toggle('show');
    }

    // GNB SCROLL PROGRESS GAUGE BAR`
    );
  }

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('Successfully replaced GNB header in:', f);
});
