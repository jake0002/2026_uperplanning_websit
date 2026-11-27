/* 205~212 모바일 적응형(실서버 212 적용, 테스트 /m-preview/) — 768px 이하에서만 동작. PC 화면·HTML 본문·SEO 요소는 건드리지 않고, 화면용 요소만 추가한다. */
(function () {
  if (window.__spM) return; window.__spM = true;
  var MQ = window.matchMedia('(max-width: 768px)');
  var BASE = /^\/m-preview\//.test(location.pathname) ? '/m-preview' : '';   /* 212: 실서버는 '' , 테스트 폴더는 /m-preview */
  var KAKAO = 'https://open.kakao.com/o/sovRKoMi', TEL = 'tel:031-699-3298';
  var PDF = '/Superplanning_Company_Brochure.pdf?v=194', PAGES = 32;
  var path = location.pathname.replace(/index\.html$/, '');
  var rel = path.indexOf(BASE) === 0 ? path.slice(BASE.length) || '/' : path;
  var TITLES = {
    '/ux-research/': 'UX리서치', '/ux-writing/': 'UX라이팅', '/ux-design/': 'UX기획/디자인',
    '/web-app-development/': '웹/앱개발', '/ux-academy/': 'AI-UX강의', '/ux-blog/': 'UX블로그',
    '/ux-company/': '회사소개', '/contact/': '문의하기'
  };
  var isHome = rel === '/';
  var isPost = /^\/ux-blog\/[^/]+\/$/.test(rel);   /* 213: 블로그 글 */
  var title = TITLES[rel] || (isPost ? 'UX블로그' : '');
  function u(p) { return BASE + p; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
  function track(btn, pos) { try { if (typeof window.spQB === 'function') window.spQB(btn, pos); } catch (e) {} }

  /* ---------- 아이콘(선 1.75) ---------- */
  function ic(d, s) { return '<svg viewBox="0 0 24 24" width="' + (s || 22) + '" height="' + (s || 22) + '" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + '</svg>'; }
  var I = {
    home: '<path d="M3.5 10.5 12 3.5l8.5 7"/><path d="M5.5 9.5V20h4.5v-6h4v6h4.5V9.5"/>',
    grid: '<rect x="4" y="4" width="6.5" height="6.5" rx="1.6"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.6"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.6"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.6"/>',
    brief: '<rect x="3.5" y="7.5" width="17" height="12" rx="2"/><path d="M9 7.5V5.5h6v2M3.5 12.5h17"/>',
    chat: '<path d="M4.5 5h15v11h-8l-4.5 3.5V16h-2.5z"/><path d="M8.5 9.5h7M8.5 12.5h4.5"/>',
    back: '<path d="M15 5l-7 7 7 7"/>',
    phone: '<path d="M6.5 3.5h3l1.5 4.5-2 1.5a11 11 0 0 0 5.5 5.5l1.5-2 4.5 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2z"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4 4"/>',
    pen: '<path d="M4 20l1-4.5L15.5 5a2 2 0 0 1 3 3L8 18.5z"/><path d="M13.5 7l3 3"/>',
    layout: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 9h16M9 9v11"/>',
    code: '<path d="M9 7l-5 5 5 5M15 7l5 5-5 5"/>',
    compass: '<circle cx="12" cy="12" r="8.5"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
    cap: '<path d="M2.5 9.5 12 5l9.5 4.5L12 14z"/><path d="M6.5 11.5v4c1.5 1.5 3.5 2.2 5.5 2.2s4-.7 5.5-2.2v-4"/>',
    book: '<path d="M4 5.5c2.5-1 5-1 8 .5v13c-3-1.5-5.5-1.5-8-.5z"/><path d="M20 5.5c-2.5-1-5-1-8 .5v13c3-1.5 5.5-1.5 8-.5z"/>',
    building: '<rect x="5" y="3.5" width="14" height="17" rx="1.5"/><path d="M9 7.5h2M13 7.5h2M9 11h2M13 11h2M9 14.5h2M13 14.5h2M10.5 20.5v-3h3v3"/>',
    people: '<circle cx="9" cy="8.5" r="3"/><path d="M3.5 19c.5-3 2.7-4.5 5.5-4.5s5 1.5 5.5 4.5"/><circle cx="16.5" cy="9.5" r="2.5"/><path d="M16 14.5c2.4 0 4 1.3 4.5 4"/>',
    globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.3 2.4 3.5 5.2 3.5 8.5s-1.2 6.1-3.5 8.5c-2.3-2.4-3.5-5.2-3.5-8.5S9.7 5.9 12 3.5z"/>',
    dl: '<path d="M12 4v11M7 10.5l5 5 5-5M5 20h14"/>',
    ext: '<path d="M14 4h6v6M20 4l-9 9M18 14v5H5V6h5"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8"/>',
    pin: '<path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
    insta: '<rect x="4" y="4" width="16" height="16" rx="4.5"/><circle cx="12" cy="12" r="3.6"/><circle cx="16.8" cy="7.2" r=".6" fill="currentColor"/>',
    threads: '<circle cx="12" cy="12" r="3.3"/><path d="M15.3 12v1.4a2.3 2.3 0 0 0 4.6 0V12a7.9 7.9 0 1 0-3.1 6.3"/>',
    yt: '<rect x="3" y="6" width="18" height="12" rx="3.5"/><path d="M10.5 9.5v5l4-2.5z" fill="currentColor"/>',
    li: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 10.5V16M8 7.8v.1M11.5 16v-5.5M11.5 13c0-1.6 1-2.6 2.3-2.6s2.2.8 2.2 2.6V16"/>'
  };
  var KK = '<svg viewBox="0 0 24 22" width="18" height="16" aria-hidden="true"><ellipse cx="12" cy="9.5" rx="11" ry="8.6" fill="currentColor"/><path d="M4.8 14.6 3 20.6l6.8-3.6z" fill="currentColor"/></svg>';
  var ARW = '<svg class="spm-arw" viewBox="0 0 37 8" width="36" height="8" aria-hidden="true"><path d="M0 7.2H35.6L27.6 .8" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>';

  /* ---------- 공통: 앱바 ---------- */
  function appBar() {
    var h = document.createElement('header');
    h.id = 'spmApp'; h.setAttribute('aria-label', '모바일 상단 메뉴');
    var left = isHome
      ? '<a class="spm-logo" href="' + u('/') + '" aria-label="슈퍼플래닝 홈"><img src="/images/brand/superplanning-logo-m.png?v=86" alt="슈퍼플래닝" width="151" height="14"></a>'
      : '<a class="spm-ib spm-back" href="' + u(isPost ? '/ux-blog/' : '/') + '" aria-label="뒤로가기">' + ic(I.back, 20) + '</a><span class="spm-ttl">' + esc(title) + '</span>';
    h.innerHTML = '<div class="spm-l">' + left + '</div><div class="spm-r">' +
      '<a class="spm-ib" href="' + KAKAO + '" target="_blank" rel="noopener noreferrer" aria-label="카카오톡 상담" data-t="kakao">' + KK + '</a>' +
      '<a class="spm-ib" href="' + TEL + '" aria-label="대표전화 031-699-3298" data-t="call">' + ic(I.phone, 19) + '</a></div>';
    document.body.appendChild(h);
    var back = h.querySelector('.spm-back');
    if (back) back.addEventListener('click', function (e) {
      if (history.length > 1 && document.referrer && document.referrer.indexOf(location.host + BASE) > -1) { e.preventDefault(); history.back(); }
    });
    h.addEventListener('click', function (e) { var a = e.target.closest('[data-t]'); if (a) track(a.getAttribute('data-t'), 'm_appbar'); });
  }

  /* ---------- 공통: 하단 탭바 ---------- */
  var active = isHome ? 'home' : (rel === '/contact/' ? 'inq' : 'cat');
  function tabBar() {
    var n = document.createElement('nav');
    n.id = 'spmTab'; n.setAttribute('aria-label', '하단 탭 메뉴');
    function t(k, href, icon, label) {
      return '<a href="' + href + '" data-k="' + k + '"' + (active === k ? ' class="is-on" aria-current="page"' : '') + '>' + ic(icon, 22) + '<span>' + label + '</span></a>';
    }
    n.innerHTML = t('home', u('/'), I.home, '홈') + t('cat', u('/') + '#category', I.grid, '카테고리') +
      t('pf', PDF, I.brief, '포트폴리오') + t('inq', u('/contact/'), I.chat, '문의하기');
    document.body.appendChild(n);
    n.addEventListener('click', function (e) {
      var a = e.target.closest('a'); if (!a) return;
      var k = a.getAttribute('data-k');
      track('tab_' + k, 'm_tabbar');
      /* 210: 시트(카테고리·포트폴리오)가 열린 상태에서 다른 탭을 누르면 먼저 시트를 닫고 그 탭 동작을 실행(같은 탭을 다시 누르면 닫기만) */
      var was = openId;
      if (was) closeSheet();
      if (k === 'home') { if (isHome) { e.preventDefault(); if (!was) window.scrollTo({ top: 0, behavior: 'smooth' }); } return; }
      if (k === 'cat') { e.preventDefault(); if (was !== 'spmCat') openSheet('spmCat'); return; }
      if (k === 'pf') { e.preventDefault(); if (was !== 'spmPf') openViewer(); return; }
      if (k === 'inq') {
        var f = document.getElementById('projectInquiryForm') || document.querySelector('#contact form, form');
        if (rel === '/contact/' && f) { e.preventDefault(); window.scrollTo({ top: f.getBoundingClientRect().top + pageYOffset - 80, behavior: 'smooth' }); return; }
        if (typeof window.spOpenInquiry === 'function') { e.preventDefault(); window.spOpenInquiry(); }
      }
    });
  }

  /* ---------- 시트 공통 ---------- */
  var openId = null;
  function openSheet(id) {
    var s = document.getElementById(id); if (!s) return;
    s.classList.add('is-open'); s.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('spm-lock'); openId = id;
    var tab = document.querySelector('#spmTab a[data-k="' + (id === 'spmCat' ? 'cat' : 'pf') + '"]');
    document.querySelectorAll('#spmTab a').forEach(function (a) { a.classList.toggle('is-tmp', a === tab); });
  }
  function closeSheet() {
    if (!openId) return;
    var s = document.getElementById(openId); s.classList.remove('is-open'); s.setAttribute('aria-hidden', 'true');
    document.documentElement.classList.remove('spm-lock'); openId = null;
    document.querySelectorAll('#spmTab a').forEach(function (a) { a.classList.remove('is-tmp'); });
  }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeSheet(); });

  /* ---------- 카테고리 ---------- */
  function catSheet() {
    var G = [
      ['UX 서비스', [['/ux-research/', I.search, 'UX리서치', 'FGI·IDI·UT 사용자 조사'], ['/ux-writing/', I.pen, 'UX라이팅', '전환을 만드는 문구 설계'],
        ['/ux-design/', I.layout, 'UX기획/디자인', '서비스기획부터 UI까지'], ['/web-app-development/', I.code, '웹/앱개발', '하이브리드 웹·네이티브 앱']]],
      ['교육 · 인사이트', [['/ux-academy/', I.cap, 'AI-UX강의', '기업 출강·1:1 UX강의'], ['/ux-blog/', I.book, 'UX블로그', 'UX 인사이트·케이스 스터디']]]
    ];
    var html = '<div class="spm-sh-hd"><div><b>카테고리</b><span>필요한 서비스를 바로 찾아보세요.</span></div>' +
      '<button type="button" class="spm-ib spm-x" aria-label="닫기">' + ic('<path d="M6 6l12 12M18 6 6 18"/>', 18) + '</button></div><div class="spm-sh-bd">';
    G.forEach(function (g) {
      html += '<p class="spm-grp">' + g[0] + '</p><div class="spm-tiles">';
      g[1].forEach(function (t) {
        var on = rel === t[0];
        html += '<a class="spm-tile' + (on ? ' is-on' : '') + '" href="' + u(t[0]) + '"' + (on ? ' aria-current="page"' : '') + '><i>' + ic(t[1], 20) + '</i><b>' + t[2] + '</b><span>' + t[3] + '</span></a>';
      });
      html += '</div>';
    });
    html += '<p class="spm-grp">회사</p><div class="spm-rows">' +
      '<a href="' + u('/ux-company/') + '">' + ic(I.building, 20) + '<b>회사소개</b>' + ARW + '</a>' +
      '<a href="' + u('/ux-company/') + '#careers">' + ic(I.people, 20) + '<b>인재채용</b>' + ARW + '</a>' +
      '<a href="/en/ux-research/" lang="en">' + ic(I.globe, 20) + '<b>English</b>' + ARW + '</a></div></div>';
    var s = document.createElement('div');
    s.id = 'spmCat'; s.className = 'spm-sheet'; s.setAttribute('role', 'dialog'); s.setAttribute('aria-modal', 'true'); s.setAttribute('aria-label', '카테고리'); s.setAttribute('aria-hidden', 'true');
    s.innerHTML = html; document.body.appendChild(s);
    s.querySelector('.spm-x').addEventListener('click', closeSheet);
  }

  /* ---------- 포트폴리오(회사소개서) 뷰어 ---------- */
  var viewerBuilt = false;
  function openViewer() {
    if (!viewerBuilt) buildViewer();
    openSheet('spmPf'); track('pdf_view', 'm_tabbar');
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function buildViewer() {
    viewerBuilt = true;
    var pages = '';
    for (var i = 1; i <= PAGES; i++) pages += '<figure class="spm-pg" data-n="' + i + '"><img src="/images/brochure/brochure-' + pad(i) + '.webp" alt="슈퍼플래닝 회사소개서 ' + i + '쪽" width="1200" height="675" loading="' + (i < 3 ? 'eager' : 'lazy') + '" decoding="async"></figure>';
    var s = document.createElement('div');
    s.id = 'spmPf'; s.className = 'spm-sheet spm-pf'; s.setAttribute('role', 'dialog'); s.setAttribute('aria-modal', 'true'); s.setAttribute('aria-label', '포트폴리오 — 슈퍼플래닝 회사소개서'); s.setAttribute('aria-hidden', 'true');
    s.innerHTML = '<div class="spm-pf-hd"><button type="button" class="spm-ib spm-x" aria-label="닫기">' + ic(I.back, 20) + '</button>' +
      '<div class="spm-pf-t"><b>포트폴리오</b><span>슈퍼플래닝 회사소개서 및 포트폴리오</span></div>' +
      '<a class="spm-ib" href="' + PDF + '" download aria-label="회사소개서 PDF 다운로드 (32쪽, 약 19MB)" data-t="pdf_download">' + ic(I.dl, 18) + '</a></div>' +
      '<div class="spm-pf-pg"><span class="spm-bar"><i></i></span><span class="spm-cnt">01 / ' + PAGES + '</span></div>' +
      '<div class="spm-pf-well"><div class="spm-pf-list">' + pages + '</div></div>' +
      '<div class="spm-pf-act"><a href="' + PDF + '" download data-t="pdf_download">' + ic(I.dl, 16) + '<span>PDF 다운로드</span></a>' +
      '<a href="' + PDF + '" target="_blank" rel="noopener" data-t="pdf_open">' + ic(I.ext, 16) + '<span>전체 화면 보기</span></a></div>';
    document.body.appendChild(s);
    s.querySelector('.spm-x').addEventListener('click', closeSheet);
    s.addEventListener('click', function (e) { var a = e.target.closest('[data-t]'); if (a) track(a.getAttribute('data-t'), 'm_pdf'); });
    var list = s.querySelector('.spm-pf-list'), bar = s.querySelector('.spm-bar i'), cnt = s.querySelector('.spm-cnt');
    function upd() {
      var figs = list.children, top = list.scrollTop + 40, cur = 1;
      for (var i = 0; i < figs.length; i++) { if (figs[i].offsetTop <= top) cur = i + 1; }
      if (list.scrollTop + list.clientHeight >= list.scrollHeight - 4) cur = PAGES;
      cnt.textContent = pad(cur) + ' / ' + PAGES;
      bar.style.width = (cur / PAGES * 100) + '%';
    }
    list.addEventListener('scroll', upd, { passive: true }); upd();
  }

  /* ---------- 공통 풋터 ---------- */
  function footer() {
    var sns = [['https://www.instagram.com/ux_superplanning/', I.insta, '인스타그램'], ['https://www.threads.com/@ux_superplanning', I.threads, '스레드'],
      ['https://www.youtube.com/@TV-ve4hc', I.yt, '유튜브'], ['https://www.linkedin.com/in/uxjake/', I.li, '링크드인'],
      ['https://blog.naver.com/ux_superplanning', I.book, '블로그'], [u('/contact/') + '#location', I.pin, '오시는 길']];
    var f = document.createElement('div');
    f.id = 'spmFoot'; f.setAttribute('aria-hidden', 'true');
    f.innerHTML = '<div class="spm-sns">' + sns.map(function (x) {
      var ext = x[0].indexOf('http') === 0;
      return '<a href="' + x[0] + '"' + (ext ? ' target="_blank" rel="noopener noreferrer"' : '') + ' tabindex="-1"><i>' + ic(x[1], 20) + '</i><span>' + x[2] + '</span></a>';
    }).join('') + '</div><p>슈퍼플래닝 (Superplanning) · 대표 김휘수<br>경기도 하남시 미사강변동로 72, SB비즈타워 1116호<br>T. 031-699-3298 · E. jake@superplanning.co.kr</p>' +
      '<small>Copyright © 2019–2027 SUPERPLANNING. All rights reserved.</small>';
    document.body.appendChild(f);
  }

  /* ---------- 메인(홈) 모바일 화면 ---------- */
  function sec(no, eng, h, body, link) {
    return '<section class="spm-sec"><div class="spm-sh"><p>' + no + ' · ' + eng + '</p><div><strong>' + h + '</strong>' + (link || '') + '</div></div>' + body + '</section>';
  }
  function homeView() {
    var SV = [
      ['/ux-research/', I.search, 'UX 리서치', 1, 'FGI·인뎁스 인터뷰·UT로 가설을 검증하고<br>실패 리스크를 줄이는 근거를 만듭니다.'],
      ['/ux-writing/', I.pen, 'UX 라이팅', 1, '보이스앤톤과 UX라이팅 가이드라인으로<br>일관된 브랜드 언어 경험을 만듭니다.'],
      ['/ux-design/', I.layout, 'UX/UI 기획 및 디자인', 1, '사용자 인터뷰로 핵심 문제를 찾고<br>UI스토리보드·디자인시스템을 구축합니다.'],
      ['/web-app-development/', I.code, '웹 / 앱 개발', 0, '하이브리드 웹과 iOS/안드로이드<br>네이티브 앱을 개발합니다.'],
      ['/ux-design/', I.compass, 'UX 컨설팅', 0, '비즈니스 목표에 맞춘 리뉴얼 전략과<br>UX 개선 로드맵을 도출합니다.'],
      ['/ux-academy/', I.cap, 'AI-UX 강의', 0, '생성형 AI 서비스기획부터 피그마·<br>바이브코딩까지 실무 UX교육을 진행합니다.']
    ];
    var CL = ['SK텔레콤', '현대자동차', '롯데그룹', 'LG유플러스', '비씨카드', 'CJ올리브네트웍스', 'KB국민은행', 'NH농협은행', '서민금융진흥원', '제일기획', 'IBK기업은행', '경기도일자리재단'];
    var PT = [['특허 제10-2211864호', '애플리케이션 UI 작성툴'], ['특허 제10-2560058호', '모바일앱 UI/UX 기획을 위한 와이어프레임 설계용<br>UI 프로젝트 관리 장치'],
      ['특허 제10-2844334호', '웹/앱 UX 라이팅의 텍스트 톤 분석 및<br>추천 자동화 시스템'], ['출원 제10-2025-0057033호', 'AI기반의 멀티모달 감정분석을 활용한<br>UX리서치 시스템'], ['디자인등록 제30-1076209호', '디자인등록']];
    var BL = [['/ux-blog/lguplus-healthcare-ux-renewal-case-study/', 'CASE STUDY', '헬스케어 앱<br>UX개선', '케이스 스터디', '헬스케어 앱 UX개선 사례:<br>리워드보다 기록이 쉬워야 하는 이유'],
      ['/ux-blog/app-development-cost-quote-difference/', 'APP DEV', '앱 개발<br>외주 비용', '앱 개발', '앱 개발 외주 비용,<br>왜 업체마다 몇 배씩 차이가 날까?'],
      ['/ux-blog/startup-ux-consulting-reasons/', 'UX CONSULTING', '스타트업<br>UX컨설팅', 'UX컨설팅', '스타트업이라면 반드시<br>UX컨설팅이 필요한 5가지 이유']];
    var h = '';
    /* 히어로 — 큰 글자는 화면용(H1 은 기존 sr-only 그대로) */
    h += '<section class="spm-hero"><div class="spm-hero-c"><div class="spm-hero-top"><span class="spm-cmd">C:\\SUPERPLANNING&gt; <i>_</i></span><span class="spm-tag"><b></b>UX DESIGN AGENCY</span></div>' +
      '<p class="spm-h">UX디자인 에이전시,<br>슈퍼플래닝입니다.</p><p class="spm-lead">이탈은 줄이고, 전환은 높이는<br>사용자 경험을 설계합니다.</p><div class="spm-chips">' +
      [['/ux-research/', 'UX리서치'], ['/ux-writing/', 'UX라이팅'], ['/ux-design/', 'UI/UX디자인'], ['/ux-design/', 'UX컨설팅'], ['/web-app-development/', '웹/앱 개발'], ['/ux-academy/', 'AI-UX강의']]
        .map(function (c) { return '<a href="' + u(c[0]) + '">' + c[1] + '</a>'; }).join('') + '</div></div>' +
      '<div class="spm-stats"><div><b data-cnt="2019">2019</b><span>설립</span></div><div><b data-cnt="100" data-suf="+">100+</b><span>누적 UX 프로젝트</span></div><div><b data-cnt="98" data-suf="%">98%</b><span>고객만족도</span></div></div></section>';
    h += sec('01', 'SERVICES', 'UX 전문 서비스', '<div class="spm-svc">' + SV.map(function (s) {
      return '<a href="' + u(s[0]) + '"><i>' + ic(s[1], 20) + '</i><div><b>' + s[2] + (s[3] ? '<em>특허</em>' : '') + '</b><span>' + s[4] + '</span></div>' + ARW + '</a>';
    }).join('') + '</div>');
    h += sec('02', 'CLIENTS', '주요 고객사 및 프로젝트 실적',
      '<a class="spm-nugu" href="' + u('/ux-company/') + '#partners"><i><img src="/images/ux-company/nugu-logo.webp" alt="NUGU" width="55" height="13"></i><span>SK텔레콤 AI플랫폼 NUGU<br>공식 에이전시 슈퍼플래닝</span>' + ARW + '</a>' +
      '<div class="spm-cl">' + CL.map(function (c) { return '<span>' + c + '</span>'; }).join('') + '</div>' +
      '<p class="spm-p">KB국민은행 리브 Next, NH농협은행 올원뱅크,<br>삼성전자 SDC 글로벌 컨퍼런스(제일기획),<br>LG생활건강, 오스템임플란트 등<br>누적 100건 이상의 UX 프로젝트를 수행했습니다.</p>' +
      '<a class="spm-case" href="/ux-blog/lguplus-healthcare-ux-renewal-case-study/"><div><span>대표 사례</span><b>LG유플러스 인증앱 헬스케어 서비스<br>UX개선 케이스 스터디</b></div>' + ARW + '</a>');
    h += sec('03', 'ABOUT', '슈퍼플래닝 소개', '<p class="spm-p">2019년 7월 설립된 UX디자인 에이전시입니다.<br>6개 전문 조직이 리서치부터 개발까지<br>한 흐름으로 함께 수행합니다.</p><div class="spm-pr">' +
      [['less but better', '화려함보다 본질에 집중합니다.'], ['고객의 언어로 말하기', '전문 용어를 배제하고<br>직관적인 언어를 씁니다.'], ['끊김 없는 경험 설계', '리서치, 라이팅, 기획, 개발이<br>하나의 워크플로우로 연결됩니다.']]
        .map(function (p, i) { return '<div><em>0' + (i + 1) + '</em><b>' + p[0] + '</b><span>' + p[1] + '</span></div>'; }).join('') + '</div>');
    h += sec('04', 'PATENTS', 'UX 관련 특허 및 디자인등록', '<div class="spm-pt">' + PT.map(function (p) { return '<div><span>' + p[0] + '</span><b>' + p[1] + '</b></div>'; }).join('') + '</div>');
    h += sec('05', 'INSIGHT', 'UX 블로그', '<div class="spm-bl">' + BL.map(function (b, i) {
      return '<a href="' + b[0] + '"><div class="spm-th"><small>' + b[1] + '</small><b>' + b[2] + '</b><em>0' + (i + 1) + '</em></div><div class="spm-bt"><span>' + b[3] + '</span><b>' + b[4] + '</b></div></a>';
    }).join('') + '</div>', '<a class="spm-more" href="' + u('/ux-blog/') + '">전체보기</a>');
    h += sec('06', 'CONTACT', '프로젝트 문의 및 찾아오시는 길', '<div class="spm-ct">' +
      '<div><span>이메일</span><b>jake@superplanning.co.kr</b><button type="button" data-copy="jake@superplanning.co.kr">' + ic(I.copy, 15) + '복사</button></div>' +
      '<div><span>대표전화</span><b>031-699-3298</b><a href="' + TEL + '">' + ic(I.phone, 15) + '전화</a></div>' +
      '<div><span>위치</span><b>경기 하남시 미사강변동로72<br>SB비즈타워 1116호<br>미사역 8번 출구 도보 1분</b><a href="https://naver.me/GmF8esjK" target="_blank" rel="noopener">' + ic(I.pin, 15) + '지도</a></div></div>' +
      '<div class="spm-maps"><a href="https://naver.me/GmF8esjK" target="_blank" rel="noopener">네이버 지도</a><a href="https://map.kakao.com/?itemId=520500165" target="_blank" rel="noopener">카카오맵</a>' +
      '<a href="https://www.google.com/maps/place/%EC%8A%88%ED%8D%BC%ED%94%8C%EB%9E%98%EB%8B%9D/data=!3m1!4b1!4m6!3m5!1s0x357cb166ade634c1:0xf7537f3932633d61!8m2!3d37.563118!4d127.192932!16s%2Fg%2F11kmz0rppp" target="_blank" rel="noopener">구글 지도</a></div>');
    /* FAQ — 질문·답은 기존 HTML(sr-only) 문장을 그대로 읽어 표시 */
    var faq = [];
    document.querySelectorAll('main.sr-only h3').forEach(function (q) {
      var a = q.nextElementSibling; if (a && /자주 묻는/.test((q.closest('section') || {}).textContent || '')) faq.push([q.textContent, a.textContent]);
    });
    /* 206: '대표는 누구인가요?' → '필요한 서비스만 골라서 의뢰할 수 있나요?'(화면 표시 — 실제 적용 때 FAQPage·llms 함께 변경) */
    faq = faq.map(function (f) { return /대표는 누구/.test(f[0]) ? ['필요한 서비스만 골라서 의뢰할 수 있나요?', '네, 가능합니다. UX리서치, UI디자인, 퍼블리싱처럼 필요한 항목만 골라 의뢰하실 수 있습니다. 상담으로 범위를 확인한 뒤 견적서를 드립니다.'] : f; });
    if (faq.length) h += sec('07', 'FAQ', '자주 묻는 질문', '<div class="spm-faq">' + faq.map(function (f, i) {
      return '<details' + (i === 0 ? ' open' : '') + '><summary><em>Q</em><b>' + esc(f[0]) + '</b><i></i></summary><p>' + esc(f[1]) + '</p></details>';
    }).join('') + '</div>');
    var v = document.createElement('div');
    v.id = 'spmHome'; v.setAttribute('aria-hidden', 'true');
    v.innerHTML = h;
    document.body.insertBefore(v, document.body.firstChild);
    heroMotion(v);
    v.addEventListener('click', function (e) {
      var c = e.target.closest('[data-copy]');
      if (c) { e.preventDefault(); try { navigator.clipboard.writeText(c.getAttribute('data-copy')); } catch (x) {} c.lastChild.textContent = '복사됨'; setTimeout(function () { c.lastChild.textContent = '복사'; }, 1500); }
      var q = e.target.closest('[data-inq]');
      if (q) { track('inquiry', 'm_home_hero'); if (typeof window.spOpenInquiry === 'function') { e.preventDefault(); window.spOpenInquiry(); } }
    });
  }


  /* 206·209: 히어로 모션 — 빛 방향이 천천히 도는 볼록 카드 + 지표 숫자 0부터 올라가기.
     209: 텍스트 스크램블 제거(사용자: 뉴모피즘과 안 어울림) → 문구가 은은하게 떠오르며 나타남(히어로 즉시, 나머지는 스크롤로 화면에 들어올 때 한 번). 움직임 줄이기 설정이면 모두 끔 */
  function heroMotion(v) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    v.querySelector('.spm-hero').classList.add('is-motion');
    var hero = ['.spm-hero-top', '.spm-h', '.spm-lead', '.spm-chips', '.spm-stats'];
    hero.forEach(function (sel, i) {
      var el = v.querySelector(sel); if (!el) return;
      el.classList.add('spm-fade');
      setTimeout(function () { el.classList.add('is-in'); }, 120 + i * 160);
    });
    var SEL = '.spm-sec .spm-sh, .spm-svc a, .spm-nugu, .spm-cl, .spm-sec .spm-p, .spm-case, .spm-pr, .spm-pt, .spm-bl, .spm-ct, .spm-maps, .spm-faq details';
    var targets = v.querySelectorAll(SEL);
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (ents) {
        ents.forEach(function (en) { if (en.isIntersecting) { io.unobserve(en.target); en.target.classList.add('is-in'); } });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
      targets.forEach(function (el) { el.classList.add('spm-fade'); io.observe(el); });
    }
    v.querySelectorAll('[data-cnt]').forEach(function (b, i) {
      var to = +b.getAttribute('data-cnt'), suf = b.getAttribute('data-suf') || '', t0 = null, D = 1600;
      function step(t) { if (!t0) t0 = t; var k = Math.min(1, (t - t0) / D), e = 1 - Math.pow(1 - k, 3); b.textContent = Math.round(to * e) + suf; if (k < 1) requestAnimationFrame(step); }
      b.textContent = '0' + suf; setTimeout(function () { requestAnimationFrame(step); }, 900);
    });
  }

  /* ---------- 미리보기 안내 라벨: 모바일에선 3초 뒤 숨김 ---------- */
  function label() { var l = document.getElementById('spbPrev'); if (l) setTimeout(function () { l.style.opacity = '0'; }, 3000); }

  function init() {
    if (!MQ.matches) return;
    document.documentElement.classList.add('sp-m');
    if (isHome) homeView();
    appBar(); tabBar(); catSheet(); footer(); label();
    if (location.hash === '#category') { history.replaceState(null, '', location.pathname); openSheet('spmCat'); }
  }
  /* 화면 폭이 768px 경계를 넘으면(회전·창 크기) 새로 그림 */
  try { MQ.addEventListener('change', function () { location.reload(); }); } catch (e) {}
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
