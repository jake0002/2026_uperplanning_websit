const fs = require('fs');
const path = require('path');

const contactHtmlContent = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>문의하기 | 슈퍼플래닝 (Superplanning UX Studio)</title>
  <meta name="description" content="슈퍼플래닝 프로젝트 문의하기. UX 기획, UX 디자인, UX 리서치, UX 라이팅, 앱 개발, 기업출강 및 UX 강의 견적 문의.">
  <meta name="keywords" content="문의하기, 프로젝트문의, 슈퍼플래닝, Superplanning, UX견적, UX컨설팅문의, UX기획문의, UX리서치문의">
  <meta name="author" content="슈퍼플래닝 (Superplanning)">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://superplanning.blog/contact">
  <link rel="alternate" hreflang="ko" href="https://superplanning.blog/contact">

  <!-- Open Graph Meta Tags -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="슈퍼플래닝 (Superplanning UX Studio)">
  <meta property="og:url" content="https://superplanning.blog/contact">
  <meta property="og:title" content="문의하기 | 슈퍼플래닝">
  <meta property="og:description" content="문의하기 페이지에서 UX기획/디자인, UX리서치, UX라이팅, 앱개발, 기업출강 관련 문의를 남겨주시면 신속하게 안내해 드립니다.">
  <meta property="og:locale" content="ko_KR">

  <!-- Pretendard Webfont -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css">

  <style>
    :root {
      --bg: #008080;
      --win-bg: #c0c0c0;
      --win-fg: #000000;
      --win-fg-dark: #0a0a0a;
      --bevel-hi: #ffffff;
      --bevel-lo: #7b7b7b;
      --bevel-shadow: #3b3b3b;
      --accent: #ffd43b;
      --gnb-bg: rgba(0, 0, 0, 0.45);
      --gnb-fg: #ffffff;
      --gnb-bd: rgba(255, 255, 255, 0.2);
      --taskbar: #c0c0c0;
      --taskbar-h: 36px;
      --gnb-h: 34px;
      --logo-top: 14px;
      --logo-left: 14px;
      --font-mono: 'IBM Plex Mono', 'Courier New', monospace;
      --font: 'Pretendard', -apple-system, system-ui, sans-serif;
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

    a { color: #111111; text-decoration: underline; }
    a:hover { color: #555555; }

    /* LOGO & GNB */
    #topLogo {
      position: fixed;
      top: var(--logo-top);
      left: var(--logo-left);
      z-index: 100001;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 3px 8px;
      background: var(--win-bg);
      border-top: 2px solid var(--bevel-hi);
      border-left: 2px solid var(--bevel-hi);
      border-right: 2px solid var(--bevel-lo);
      border-bottom: 2px solid var(--bevel-lo);
      box-shadow: inset -1px -1px var(--bevel-shadow);
      cursor: pointer;
      text-decoration: none;
      color: #000;
    }
    #topLogo .logo-tag {
      font-size: 10px; font-weight: 900; background: #000080; color: #fff;
      padding: 1px 4px; border-radius: 2px;
    }
    #topLogo .logo-text { font-size: 12px; font-weight: 800; font-family: var(--font-mono); }

    #gnbHeader {
      position: fixed;
      top: var(--logo-top);
      left: calc(var(--logo-left) + 175px);
      right: 14px;
      height: var(--gnb-h);
      z-index: 100000;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;
      background: var(--gnb-bg);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid var(--gnb-bd);
      border-radius: 4px;
    }

    .gnb-left { display: flex; align-items: center; gap: 4px; list-style: none; }
    .gnb-link {
      display: inline-flex; align-items: center; padding: 2px 8px;
      font-size: 11px; font-weight: 600; color: var(--gnb-fg);
      text-decoration: none; border-radius: 3px; transition: background 0.15s;
    }
    .gnb-link:hover { background: rgba(255, 255, 255, 0.2); }
    .gnb-link.active { background: rgba(255, 255, 255, 0.3); font-weight: 700; color: var(--accent); }

    .gnb-right { display: flex; align-items: center; gap: 6px; }

    /* W95 BUTTON */
    .w95-btn {
      display: inline-flex; align-items: center; justify-content: center; gap: 4px;
      padding: 3px 8px; background: var(--win-bg); color: #000;
      border-top: 2px solid var(--bevel-hi); border-left: 2px solid var(--bevel-hi);
      border-right: 2px solid var(--bevel-lo); border-bottom: 2px solid var(--bevel-lo);
      box-shadow: inset -1px -1px var(--bevel-shadow);
      font-size: 11px; font-weight: 700; cursor: pointer; text-decoration: none;
    }
    .w95-btn:active {
      border-top: 2px solid var(--bevel-lo); border-left: 2px solid var(--bevel-lo);
      border-right: 2px solid var(--bevel-hi); border-bottom: 2px solid var(--bevel-hi);
      padding: 4px 7px 2px 9px;
    }

    #mobileMenuBtn { display: none; }

    /* GNB PROGRESS BAR */
    .gnb-progress-track {
      position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
      background: rgba(255, 255, 255, 0.15); overflow: hidden; border-radius: 0 0 3px 3px;
    }
    .gnb-progress-bar {
      height: 100%; width: 0%; background: linear-gradient(90deg, #00d2ff, #008080);
      transition: width 0.1s linear; position: relative;
    }
    .gnb-progress-badge { display: none; }

    /* MOBILE NAV DRAWER */
    #mobileNavDrawer {
      display: none; position: fixed; top: calc(var(--logo-top) + var(--gnb-h) + 4px);
      left: 10px; right: 10px; z-index: 999999 !important; background: var(--win-bg);
      border: 2px solid #000; padding: 10px;
    }
    #mobileNavDrawer.show { display: block !important; }

    /* PAGE WRAPPER & EXPLORER WINDOW */
    .page-wrapper {
      max-width: 900px;
      margin: calc(var(--logo-top) + var(--gnb-h) + 20px) auto 20px auto;
      padding: 0 12px;
    }

    .explorer-window {
      background: var(--win-bg);
      border-top: 2px solid var(--bevel-hi);
      border-left: 2px solid var(--bevel-hi);
      border-right: 2px solid var(--bevel-lo);
      border-bottom: 2px solid var(--bevel-lo);
      box-shadow: inset -1px -1px var(--bevel-shadow), 4px 4px 12px rgba(0, 0, 0, 0.3);
      display: flex;
      flex-direction: column;
    }

    .titlebar {
      background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
      color: #ffffff;
      padding: 3px 6px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
      font-weight: 700;
    }
    .titlebar-text { display: flex; align-items: center; gap: 6px; }
    .win-btn {
      display: inline-flex; align-items: center; justify-content: center;
      width: 16px; height: 14px; background: var(--win-bg); color: #000;
      font-size: 10px; font-weight: bold; border-top: 1px solid var(--bevel-hi);
      border-left: 1px solid var(--bevel-hi); border-right: 1px solid var(--bevel-lo);
      border-bottom: 1px solid var(--bevel-lo); cursor: pointer;
    }

    .menubar {
      display: flex; gap: 12px; padding: 3px 8px; background: var(--win-bg);
      font-size: 11px; border-bottom: 1px solid var(--bevel-lo);
    }
    .toolbar-area {
      display: flex; align-items: center; gap: 10px; padding: 4px 8px;
      background: var(--win-bg); border-bottom: 2px solid var(--bevel-hi);
    }
    .tool-btn {
      padding: 2px 6px; font-size: 11px; background: var(--win-bg);
      border-top: 1px solid var(--bevel-hi); border-left: 1px solid var(--bevel-hi);
      border-right: 1px solid var(--bevel-lo); border-bottom: 1px solid var(--bevel-lo);
      cursor: pointer;
    }
    .address-bar { display: flex; align-items: center; gap: 6px; flex: 1; font-size: 11px; }
    .addr-label { font-weight: bold; }
    .addr-input {
      flex: 1; background: #ffffff; border: 2px solid #7b7b7b;
      padding: 2px 6px; font-family: var(--font-mono); font-size: 11px; color: #000;
    }

    .explorer-split { display: flex; min-height: 520px; background: #ffffff; border: 2px solid #7b7b7b; margin: 4px; }
    .tree-sidebar {
      width: 220px; background: #f0f0f0; border-right: 2px solid #7b7b7b;
      padding: 10px; font-size: 12px; flex-shrink: 0;
    }
    .tree-root { font-weight: bold; margin-bottom: 8px; display: flex; align-items: center; gap: 4px; }
    .tree-list { list-style: none; padding-left: 12px; }
    .tree-item { margin-bottom: 6px; }
    .tree-link { text-decoration: none; color: #000; display: inline-flex; align-items: center; gap: 4px; padding: 2px 4px; border-radius: 2px; }
    .tree-link:hover { background: #e0e0e0; }
    .tree-link.active { background: #000080; color: #ffffff; font-weight: bold; }

    .main-content-pane { flex: 1; padding: 24px; overflow-y: auto; color: #111; line-height: 1.6; }
    .main-content-pane h1 { font-size: 22px; font-weight: 800; margin-bottom: 12px; border-bottom: 2px solid #000; padding-bottom: 8px; }
    .hero-intro { font-size: 14px; font-weight: 600; color: #333; margin-bottom: 24px; }
    .main-content-pane h2 { font-size: 16px; font-weight: 700; margin-top: 24px; margin-bottom: 12px; color: #000080; border-left: 4px solid #000080; padding-left: 8px; }

    .contact-box {
      background: #f8f9fa; border: 2px solid #c0c0c0; border-radius: 4px; padding: 16px; margin-bottom: 16px;
      box-shadow: inset 1px 1px 3px rgba(0,0,0,0.1);
    }
    .contact-box h3 { font-size: 14px; font-weight: 700; margin-bottom: 8px; color: #111; }
    .contact-box p { font-size: 13px; color: #444; margin-bottom: 6px; }

    .form-group { margin-bottom: 14px; }
    .form-group label { display: block; font-size: 12px; font-weight: 700; margin-bottom: 4px; color: #222; }
    .form-group input, .form-group textarea, .form-group select {
      width: 100%; padding: 8px; font-size: 13px; border: 2px solid #7b7b7b; background: #fff; border-radius: 2px;
    }
    .form-group textarea { height: 110px; resize: vertical; }

    .bottom-nav {
      margin-top: 30px; padding-top: 14px; border-top: 1px solid #ddd; font-size: 12px; color: #666;
    }

    /* TASKBAR */
    #taskbar {
      position: fixed; bottom: 0; left: 0; right: 0; height: var(--taskbar-h);
      background: var(--taskbar); border-top: 2px solid var(--bevel-hi);
      display: flex; align-items: center; justify-content: space-between;
      padding: 2px 4px; z-index: 999999;
    }
    .taskbar-left { display: flex; align-items: center; gap: 4px; }

    #startMenu {
      display: none; position: fixed; bottom: var(--taskbar-h); left: 2px;
      width: 220px; background: var(--win-bg); border-top: 2px solid var(--bevel-hi);
      border-left: 2px solid var(--bevel-hi); border-right: 2px solid var(--bevel-lo);
      border-bottom: 2px solid var(--bevel-lo); box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4);
      z-index: 1000000; flex-direction: row;
    }
    #startMenu.show { display: flex !important; }
    .start-banner {
      width: 26px; background: linear-gradient(0deg, #000080, #1084d0); color: #fff;
      writing-mode: vertical-rl; transform: rotate(180deg); text-align: center;
      font-weight: bold; font-size: 11px; letter-spacing: 2px; padding: 8px 0;
    }
    .start-items { flex: 1; padding: 4px; display: flex; flex-direction: column; gap: 2px; }
    .start-item {
      padding: 4px 8px; font-size: 11px; color: #000; cursor: pointer;
      display: flex; align-items: center; gap: 6px; text-decoration: none;
    }
    .start-item:hover { background: #000080; color: #fff; }

    @media (max-width: 768px) {
      #gnbHeader .gnb-left { display: none; }
      #mobileMenuBtn { display: inline-flex; }
      #gnbHeader { left: calc(var(--logo-left) + 140px); }
      .explorer-split { flex-direction: column; }
      .tree-sidebar { width: 100%; border-right: none; border-bottom: 2px solid #7b7b7b; }
    }
  </style>
</head>
<body>

  <!-- TOP LOGO -->
  <a id="topLogo" href="https://superplanning.blog/">
    <span class="logo-tag">UX</span>
    <span class="logo-text">SUPERPLANNING</span>
  </a>

  <!-- GNB HEADER -->
  <div id="gnbHeader">
    <ul class="gnb-left">
      <li class="gnb-item"><a class="gnb-link" href="/ux_research/"><span>UX리서치</span></a></li>
      <li class="gnb-item"><a class="gnb-link" href="https://superplanning.blog/#services"><span>UX라이팅</span></a></li>
      <li class="gnb-item"><a class="gnb-link" href="/ux_design/"><span>UX기획/디자인</span></a></li>
      <li class="gnb-item"><a class="gnb-link" href="https://superplanning.blog/#services"><span>웹/앱개발</span></a></li>
      <li class="gnb-item"><a class="gnb-link" href="https://superplanning.blog/#classes"><span>AI-UX강의</span></a></li>
      <li class="gnb-item"><a class="gnb-link" href="https://superplanning.blog/#blog"><span>UX블로그</span></a></li>
      <li class="gnb-item"><a class="gnb-link" href="/company/"><span>회사소개</span></a></li>
    </ul>
    <div class="gnb-right">
      <button class="w95-btn" style="padding:2px 8px; font-size:11px;" onclick="location.href='https://superplanning.blog/';">
        <span>📄</span> <span>회사소개서 보기</span>
      </button>
      <button class="w95-btn" style="padding:2px 8px; font-size:11px;" onclick="location.href='https://superplanning.blog/';">
        <span>🤝</span> <span>인재채용</span>
      </button>
      <button class="w95-btn" style="padding:2px 8px; font-size:11px;" onclick="location.href='/contact/';">
        <span>✉️</span> <span>문의하기</span>
      </button>
      <button class="w95-btn" style="padding:2px 8px; font-size:11px;" id="langBtn"><span style="font-weight:bold; color:#000080;">KOR</span> | <span style="opacity:0.5;">ENG</span></button>
    </div>
    <button id="mobileMenuBtn" class="w95-btn" onclick="toggleMobileMenu();"><span>☰ 메뉴</span></button>

    <!-- SCROLL PROGRESS GAUGE BAR -->
    <div id="gnbProgressBarTrack" class="gnb-progress-track" title="페이지 스크롤 진행률">
      <div id="gnbProgressBar" class="gnb-progress-bar">
        <span id="gnbProgressBadge" class="gnb-progress-badge">0%</span>
      </div>
    </div>
  </div>

  <!-- MOBILE GNB DRAWER -->
  <div id="mobileNavDrawer">
    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #000; padding-bottom:6px; margin-bottom:8px;">
      <strong style="font-size:13px; color:#000080;">📂 GNB 전체 메뉴</strong>
      <button class="w95-btn" style="padding:1px 8px; font-size:11px;" onclick="toggleMobileMenu();">✕ 닫기</button>
    </div>
    <div style="display:flex; flex-direction:column; gap:4px;">
      <div class="start-item" onclick="location.href='https://superplanning.blog/'; toggleMobileMenu();">🏢 슈퍼플래닝</div>
      <div class="start-item" onclick="location.href='https://superplanning.blog/'; toggleMobileMenu();">🏛️ 주요 고객사</div>
      <div class="start-item" onclick="location.href='https://superplanning.blog/'; toggleMobileMenu();">🎨 UX서비스</div>
      <div class="start-item" onclick="location.href='https://superplanning.blog/'; toggleMobileMenu();">📷 인스타그램</div>
      <div class="start-item" onclick="location.href='https://superplanning.blog/'; toggleMobileMenu();">🧵 쓰레드</div>
      <div class="start-item" onclick="location.href='https://superplanning.blog/'; toggleMobileMenu();">▶️ 유튜브</div>
      <div class="start-item" onclick="location.href='https://superplanning.blog/'; toggleMobileMenu();">📁 포트폴리오 보기</div>
      <div class="start-item" onclick="location.href='https://superplanning.blog/'; toggleMobileMenu();">🤝 인재채용</div>
      <div class="start-item" onclick="location.href='https://superplanning.blog/'; toggleMobileMenu();">⚙️ 환경설정</div>
      <div class="start-item" onclick="location.href='/contact/'; toggleMobileMenu();">📍 찾아오시는길</div>
      <hr style="margin:4px 0; border:0; border-top:1px solid #7b7b7b;">
      <div class="start-item" onclick="location.href='/ux_research/'; toggleMobileMenu();">🔍 UX리서치</div>
      <div class="start-item" onclick="location.href='https://superplanning.blog/#services'; toggleMobileMenu();">✏️ UX라이팅</div>
      <div class="start-item" onclick="location.href='/ux_design/'; toggleMobileMenu();">📐 UX기획/디자인</div>
      <div class="start-item" onclick="location.href='https://superplanning.blog/#services'; toggleMobileMenu();">💻 웹/앱개발</div>
      <div class="start-item" onclick="location.href='https://superplanning.blog/#classes'; toggleMobileMenu();">🎓 AI-UX강의</div>
      <div class="start-item" onclick="location.href='https://superplanning.blog/#blog'; toggleMobileMenu();">📝 UX블로그</div>
      <div class="start-item" onclick="location.href='/company/'; toggleMobileMenu();">🏢 회사소개</div>
      <div class="start-item" onclick="location.href='/contact/'; toggleMobileMenu();">✉️ 문의하기</div>
    </div>
  </div>

  <!-- PAGE WRAPPER -->
  <div class="page-wrapper">
    <article class="explorer-window">
      <!-- Titlebar -->
      <header class="titlebar">
        <div class="titlebar-text">
          <span>📂</span> <span>슈퍼플래닝 탐색기 — 문의하기</span>
        </div>
        <div style="display:flex; gap:3px;">
          <span class="win-btn">－</span>
          <span class="win-btn">□</span>
          <span class="win-btn">×</span>
        </div>
      </header>

      <!-- Menubar & Toolbar -->
      <div class="menubar"><span><u>File</u></span><span><u>Edit</u></span><span><u>View</u></span><span><u>Help</u></span></div>
      <div class="toolbar-area">
        <div style="display:flex; gap:6px;">
          <button class="tool-btn" onclick="history.back();">⬅ 뒤로</button>
        </div>
        <div class="address-bar">
          <span class="addr-label">주소(D):</span>
          <div class="addr-input">C:\SUPERPLANNING\문의하기</div>
        </div>
      </div>

      <!-- Explorer Split Pane -->
      <div class="explorer-split">
        <aside class="tree-sidebar">
          <div class="tree-root"><span>📂</span> <span>문의하기</span></div>
          <ul class="tree-list">
            <li class="tree-item"><a href="#inquiry-info" class="active tree-link"><span>📄</span> <span>1. 프로젝트 문의</span></a></li>
            <li class="tree-item"><a href="#contact-info" class="tree-link"><span>📄</span> <span>2. 대표 연락처</span></a></li>
          </ul>
        </aside>

        <main class="main-content-pane">
          <h1>문의하기 (Contact Us)</h1>
          <p class="hero-intro">문의하기 페이지에서 UX기획/디자인, UX리서치, UX라이팅, 앱개발, 기업출강 관련 문의를 남겨주시면 신속하게 전문 UX컨설턴트가 일정과 견적안을 안내해 드립니다.</p>

          <h2 id="inquiry-info">1. 프로젝트 문의</h2>
          <div class="contact-box">
            <h3>✉️ 문의 안내</h3>
            <p>서비스 현황과 목표, 필요한 작업 범위(UX리서치, UX라이팅, UX기획/디자인, 앱개발, 기업출강 등)를 이메일 또는 온라인 문의로 남겨주시면 담당 컨설턴트가 신속하게 검토 후 연락드립니다.</p>
          </div>

          <h2 id="contact-info">2. 대표 연락처</h2>
          <div class="contact-box">
            <p>· <strong>대표 이메일:</strong> <a href="mailto:jake@superplanning.co.kr">jake@superplanning.co.kr</a></p>
            <p>· <strong>공식 웹사이트:</strong> <a href="https://superplanning.blog">https://superplanning.blog</a> / <a href="https://www.superplanning.co.kr">https://www.superplanning.co.kr</a></p>
          </div>

          <div style="margin-top: 24px;">
            <a href="mailto:jake@superplanning.co.kr" class="w95-btn" style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 18px; font-size: 13px;">
              <span>✉️</span> <span>이메일 문의 보내기 (jake@superplanning.co.kr)</span>
            </a>
          </div>

          <div class="bottom-nav">
            <p>이전 단계: <a href="/company/">회사소개</a> &nbsp;|&nbsp; 다음 단계: <a href="/ux_research/">UX리서치</a></p>
            <p>마크다운 미러: <a href="/services/ux-planning-design.md">/services/ux-planning-design.md</a> · AI 색인: <a href="/llms.txt">/llms.txt</a></p>
          </div>
        </main>
      </div>
    </article>
  </div>

  <!-- TASKBAR -->
  <div id="startMenu">
    <div class="start-banner">SUPERPLANNING</div>
    <div class="start-items">
      <div class="start-item" onclick="location.href='https://superplanning.blog/'; closeStart();">🏢 슈퍼플래닝</div>
      <div class="start-item" onclick="location.href='https://superplanning.blog/'; closeStart();">🏛️ 주요 고객사</div>
      <div class="start-item" onclick="location.href='https://superplanning.blog/'; closeStart();">🎨 UX서비스</div>
      <div class="start-item" onclick="location.href='https://superplanning.blog/'; closeStart();">📷 인스타그램</div>
      <div class="start-item" onclick="location.href='https://superplanning.blog/'; closeStart();">🧵 쓰레드</div>
      <div class="start-item" onclick="location.href='https://superplanning.blog/'; closeStart();">▶️ 유튜브</div>
      <div class="start-item" onclick="location.href='https://superplanning.blog/'; closeStart();">📁 포트폴리오 보기</div>
      <div class="start-item" onclick="location.href='https://superplanning.blog/'; closeStart();">🤝 인재채용</div>
      <div class="start-item" onclick="location.href='https://superplanning.blog/'; closeStart();">⚙️ 환경설정</div>
      <div class="start-item" onclick="location.href='/contact/'; closeStart();">📍 찾아오시는길</div>
      <hr style="margin:4px 0; border:0; border-top:1px solid #7b7b7b;">
      <div class="start-item" onclick="location.href='/ux_research/'; closeStart();">🔍 UX리서치</div>
      <div class="start-item" onclick="location.href='https://superplanning.blog/#services'; closeStart();">✏️ UX라이팅</div>
      <div class="start-item" onclick="location.href='/ux_design/'; closeStart();">📐 UX기획/디자인</div>
      <div class="start-item" onclick="location.href='https://superplanning.blog/#services'; closeStart();">💻 웹/앱개발</div>
      <div class="start-item" onclick="location.href='https://superplanning.blog/#classes'; closeStart();">🎓 AI-UX강의</div>
      <div class="start-item" onclick="location.href='https://superplanning.blog/#blog'; closeStart();">📝 UX블로그</div>
      <div class="start-item" onclick="location.href='/company/'; closeStart();">🏢 회사소개</div>
      <div class="start-item" onclick="location.href='/contact/'; closeStart();">✉️ 문의하기</div>
    </div>
  </div>

  <div id="taskbar">
    <div class="taskbar-left">
      <button class="w95-btn" id="startBtn" onclick="toggleStartMenu();">
        <span>💻</span> <strong>전체 메뉴보기</strong>
      </button>
    </div>
  </div>

  <script>
    function toggleStartMenu() {
      var m = document.getElementById('startMenu');
      if (m) m.classList.toggle('show');
    }
    function closeStart() {
      var m = document.getElementById('startMenu');
      if (m) m.classList.remove('show');
    }
    document.addEventListener('click', function(e) {
      if (!e.target.closest('#startMenu') && !e.target.closest('#startBtn')) {
        closeStart();
      }
    });

    function toggleMobileMenu() {
      var drawer = document.getElementById('mobileNavDrawer');
      if (drawer) {
        drawer.classList.toggle('show');
      }
      closeStart();
    }

    // Scroll Progress Gauge
    window.addEventListener('scroll', function() {
      var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      var scrolled = (height > 0) ? Math.round((winScroll / height) * 100) : 0;
      var bar = document.getElementById('gnbProgressBar');
      if (bar) { bar.style.width = scrolled + '%'; }
    });
  </script>

</body>
</html>
`;

if (!fs.existsSync('implementation/contact')) {
    fs.mkdirSync('implementation/contact', { recursive: true });
}

fs.writeFileSync('implementation/contact/index.html', contactHtmlContent.trim() + '\n', 'utf8');
console.log('Created implementation/contact/index.html');

fs.writeFileSync('implementation/contact.html', contactHtmlContent.trim() + '\n', 'utf8');
console.log('Created implementation/contact.html');
