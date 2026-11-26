/* 슈퍼플래닝 B안 공통 스크립트 (sp-b.js) — html.sp-b 페이지에서만 동작
   1) TOP 버튼: 동그라미 둘레에 스크롤 진행률을 검정 선으로 표시(맨 아래 = 한 바퀴, 올리면 줄어듦) — 피그마 26:606
   기존 #scrollTopBtn(서브페이지)이 있으면 그대로 쓰고, 없으면(메인) 새로 만든다. 클릭 = 맨 위로(부드럽게). */
(function () {
  if (!document.documentElement.classList.contains('sp-b')) return;
  /* 화면 비율(서브페이지용, 메인은 자체 spbK 사용): 1920 아트보드를 k = W/1920×0.82(0.6~0.82)로 축소해 가운데 — --k·--x0v */
  if (!document.documentElement.classList.contains('sp-b-home')) {
    var setK = function () {
      var W = window.innerWidth, k = W <= 768 ? 1 : Math.max(0.6, Math.min(0.82, W / 1920 * 0.82));
      var x0 = W <= 768 ? 0 : Math.max(0, (W - 1920 * k) / 2);
      document.documentElement.style.setProperty('--k', k); document.documentElement.style.setProperty('--x0v', (x0 / k) + 'px');
    };
    setK(); window.addEventListener('resize', setK);
  }
  function init() {
    var b = document.getElementById('scrollTopBtn');
    if (!b) {
      b = document.createElement('button');
      b.id = 'scrollTopBtn'; b.type = 'button';
      b.title = '페이지 최상단으로 이동'; b.setAttribute('aria-label', '위로 가기');
      b.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
      document.body.appendChild(b);
    }
    b.classList.add('sp-top');
    b.innerHTML =
      '<svg class="sp-top-ring" viewBox="0 0 64 64" aria-hidden="true"><circle class="t" cx="32" cy="32" r="31"/><circle class="p" cx="32" cy="32" r="31"/></svg>' +
      '<span class="sp-top-in" aria-hidden="true"><svg viewBox="0 0 14 20" width="14" height="20"><path d="M7 19V1.6M1.2 7.4 7 1.6l5.8 5.8" fill="none" stroke="#111" stroke-width="1.4"/></svg><span>TOP</span></span>';
    var p = b.querySelector('circle.p'), L = 2 * Math.PI * 31;
    p.style.strokeDasharray = L.toFixed(2); p.style.strokeDashoffset = L.toFixed(2);
    var ticking = false;
    function upd() {
      ticking = false;
      var se = document.scrollingElement || document.documentElement;
      var y = window.pageYOffset || se.scrollTop || 0, max = se.scrollHeight - window.innerHeight;
      var r = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      p.style.strokeDashoffset = (L * (1 - r)).toFixed(2);
      b.classList.toggle('is-on', y > 120);
      b.setAttribute('aria-valuenow', Math.round(r * 100));
      b.style.removeProperty('left'); b.style.removeProperty('right'); b.style.removeProperty('display'); /* 옛 위치·표시 스크립트 무시 */
    }
    function req() { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }
    window.addEventListener('scroll', req, { passive: true });
    window.addEventListener('resize', req);
    if (window.ResizeObserver) new ResizeObserver(req).observe(document.body);
    upd();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
/* 마이크로 인터랙션(사용자 11-23 18:28): 마우스를 올리면 버튼·카드 테두리를 따라 얇은 검정 선이 한 바퀴 그려지고, 떼면 되감긴다.
   대상: UX 서비스 카드, 바탕화면 아이콘(네모 버튼), 카카오톡 상담 버튼, GNB 메뉴 전체(홈 포함)·포트폴리오 보기·인재채용. 선 색 = 짙은 회색(11-23 18:41). 터치 기기·동작 줄이기 설정에서는 동작 안 함. */
(function () {
  if (!document.documentElement.classList.contains('sp-b')) return;
  if (!window.matchMedia || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  var SEL = '.win[data-key="services"] .card-grid .info-card, .desktop-icon, #skyscraper a[href*="open.kakao.com"], .gnb-right > .w95-btn, #gnb .gnb-link, #brandLogo' +
    /* 152(11-23 19:18): 서브페이지 — 이전/다음 단계, 퀵배너 카카오·문의·복사, 뒤로, CTA 띠 버튼, FAQ 질문, 링크 카드 */
    ', .sp-pn a, #stickyKakaoBanner a, #stickyKakaoBanner .sp-qb-row button, .toolbar-area .tool-btn, .sp-cta-band .sp-faq-cta-btn, .faq dt, ul.sp-linkcards a' +
    /* 166(11-24 10:14 '모든 버튼'): 수강신청 배너 탭·카카오·신청, 후기 보드 버튼, 페이지 안 알약 버튼, 문의·강의 신청·접수 완료 창의 버튼·선택지, 팝업 버튼 */
    ', #stickyCourseBanner button, .sp-rv-ctl button, .sp-rv-more a, .sp-rvsum a, a.sp-aorg-btn, a.sp-aibtn, a.sp-pill-link, .sp-pop-btn, .sp-pop-cta, .spq-ov button, .spq-ov a.spq-kakao, .spq-ov .spq-chip, .spq-ov .spq-opt, .sp-sns a' +
    /* 167: UX블로그 목록 — 검색하기, 카드 즐겨찾기·공유, 달력 버튼 */
    ', .blog-header-row .search-btn, .postit-card .icon-action-btn, #tagFilterBanner button, .no-results .w95-btn' +
    /* 167: 블로그 글 상세 — 메타 줄 즐겨찾기·공유, 목록보기, 글 안 CTA 버튼 */
    ', .sp-post .sp-meta .icon-action-btn, a.sp-listbtn, .sp-post .sp-blog-cta a' +
    /* 168: UX블로그 목록 글 카드 전체(카드에 마우스를 올리면 카드 테두리를 따라 선) */
    ', .postit-grid > .postit-card' +
    /* 169: 회사소개 — 언론 보도 줄, 이메일 복사 */
    ', ul.sp-press a, button.sp-ccopy' +
    /* 170: 문의하기 — 등록 버튼, 갤러리 이전/다음, 지도 앱 버튼 */
    ', button.sp-ksubmit, button.sp-kgal-btn, a.sp-kmap-a';
  var NS = 'http://www.w3.org/2000/svg';
  function prep(el) {
    if (el.querySelector(':scope > .sp-trace')) return;
    var icon = el.classList.contains('desktop-icon');
    var cs = getComputedStyle(el);
    if (cs.position === 'static') el.style.position = 'relative';
    var r = icon ? 18 : (parseFloat(cs.borderTopLeftRadius) || 0);
    var svg = document.createElementNS(NS, 'svg'); svg.setAttribute('class', 'sp-trace' + (icon ? ' i' : '')); svg.setAttribute('aria-hidden', 'true');
    var rect = document.createElementNS(NS, 'rect');
    rect.setAttribute('x', '0'); rect.setAttribute('y', '0'); rect.setAttribute('width', '100%'); rect.setAttribute('height', '100%');
    var h = icon ? 64 : el.offsetHeight; rect.setAttribute('rx', Math.min(r, h / 2)); rect.setAttribute('pathLength', '100');
    svg.appendChild(rect); el.appendChild(svg);
    requestAnimationFrame(function () { requestAnimationFrame(function () { el.classList.add('sp-tr'); }); });
  }
  document.addEventListener('mouseover', function (e) {
    var el = e.target && e.target.closest ? e.target.closest(SEL) : null; if (el) prep(el);
  }, true);
})();
/* 입력란 포커스 마이크로 인터랙션(152, 11-23 19:18): 커서를 두면 연한 회색 선(#A3AAB3)이 입력란 테두리를 따라 0.55초에 그려지고, 벗어나면 되감긴다.
   두꺼운 검정 기본 외곽선은 CSS 에서 끔. 터치 기기에서도 동작(포커스 기준). */
(function () {
  if (!document.documentElement.classList.contains('sp-b')) return;
  var NS = 'http://www.w3.org/2000/svg';
  var Q = 'input:not([type="checkbox"]):not([type="radio"]):not([type="hidden"]):not([type="submit"]):not([type="button"]), textarea';
  function place(el, ov) {
    var par = el.parentNode;
    if (getComputedStyle(par).position === 'static') par.style.position = 'relative';
    var w = el.offsetWidth, h = el.offsetHeight, r = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0;
    ov.style.left = el.offsetLeft + 'px'; ov.style.top = el.offsetTop + 'px'; ov.style.width = w + 'px'; ov.style.height = h + 'px';
    ov.firstChild.setAttribute('rx', Math.min(r, h / 2));
  }
  document.addEventListener('focusin', function (e) {
    var el = e.target; if (!el || !el.matches || !el.matches(Q) || !el.parentNode) return;
    var ov = el._spFt;
    if (!ov) {
      ov = document.createElementNS(NS, 'svg'); ov.setAttribute('class', 'sp-ftrace'); ov.setAttribute('aria-hidden', 'true');
      var rect = document.createElementNS(NS, 'rect');
      rect.setAttribute('x', '0'); rect.setAttribute('y', '0'); rect.setAttribute('width', '100%'); rect.setAttribute('height', '100%'); rect.setAttribute('pathLength', '100');
      ov.appendChild(rect); el.parentNode.insertBefore(ov, el.nextSibling); el._spFt = ov;
    }
    place(el, ov);
    requestAnimationFrame(function () { requestAnimationFrame(function () { ov.classList.add('on'); }); });
  });
  document.addEventListener('focusout', function (e) { var el = e.target; if (el && el._spFt) el._spFt.classList.remove('on'); });
})();
/* 서브페이지 목차: 현재 섹션 표시를 화면 위치 기준으로 다시 계산(축소 비율 --k 에서도 정확하게) — 기존 스크립트 뒤에 실행(rAF) */
(function () {
  var de = document.documentElement;
  if (!de.classList.contains('sp-b') || de.classList.contains('sp-b-home')) return;
  function init() {
    var links = [].slice.call(document.querySelectorAll('.tree-list.toc a.tree-link[href^="#"]'));
    var secs = links.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); });
    if (!links.length) return;
    var t = false;
    function upd() {
      t = false; var cur = 0, line = 170;
      secs.forEach(function (h, i) { if (h && h.getBoundingClientRect().top <= line) cur = i; });
      var se = document.scrollingElement || de;
      if (se.scrollTop + window.innerHeight >= se.scrollHeight - 4) cur = links.length - 1;
      links.forEach(function (a, i) { a.classList.toggle('active', i === cur); if (i === cur) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current'); });
    }
    function req() { if (!t) { t = true; requestAnimationFrame(upd); } }
    window.addEventListener('scroll', req, { passive: true }); window.addEventListener('resize', req);
    links.forEach(function (a, i) { a.addEventListener('click', function () { setTimeout(req, 0); }); });
    req();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
/* 후기 카드 보드(.sp-rv, 158·159): 이전/다음 = 카드 1장씩(자동 넘김 없음), 진행 막대·숫자, 긴 후기는 '전체 보기' */
(function () {
  if (!document.documentElement.classList.contains('sp-b')) return;
  function init(root) {
    var tr = root.querySelector('.sp-rv-track'), cards = [].slice.call(tr.children), n = cards.filter(function (c) { return !c.classList.contains('sp-rv-more'); }).length;
    var cnt = root.querySelector('.sp-rv-count'), prog = root.querySelector('.sp-rv-prog');
    var pad = function (x) { return (x < 10 ? '0' : '') + x; };
    prog.innerHTML = cards.map(function () { return '<i></i>'; }).join('');
    cards.forEach(function (c) {
      var p = c.querySelector('blockquote p'); if (!p) return;
      requestAnimationFrame(function () {
        if (p.scrollHeight > p.clientHeight + 4) {
          var b = document.createElement('button'); b.type = 'button'; b.className = 'sp-rv-more-btn'; b.textContent = '전체 보기';
          b.addEventListener('click', function () { var o = c.classList.toggle('is-open'); b.textContent = o ? '접기' : '전체 보기'; });
          p.parentNode.after(b);
        }
      });
    });
    function idx() { var w = cards[0].offsetWidth + 16, max = tr.scrollWidth - tr.clientWidth; if (root.classList.contains('sp-rv-roll')) return Math.round(tr.scrollLeft / w) % cards.length; return tr.scrollLeft >= max - 2 && max > 0 ? Math.ceil(max / w) : Math.round(tr.scrollLeft / w); }
    function upd() {
      var i = idx(), vis = Math.max(1, Math.floor(tr.clientWidth / (cards[0].offsetWidth + 8)));
      cnt.textContent = root.classList.contains('sp-rv-roll') ? pad(i + 1) + '–' + pad((i + vis - 1) % n + 1) + ' / ' + pad(n) : pad(Math.min(n, i + 1)) + '–' + pad(Math.min(n, i + vis)) + ' / ' + pad(n);
      [].forEach.call(prog.children, function (d, k) { d.classList.toggle('on', k === i); });
    }
    function go(d) { var w = cards[0].offsetWidth + 16, max = tr.scrollWidth - tr.clientWidth;
      var cur = tr.scrollLeft, t; if (d > 0) t = cur >= max - 2 ? 0 : Math.min(max, cur + w); else t = cur <= 2 ? max : Math.max(0, cur - w); tr.scrollTo({ left: t, behavior: 'smooth' }); }
    root.querySelector('.sp-rv-prev').addEventListener('click', function () { go(-1); });
    root.querySelector('.sp-rv-next').addEventListener('click', function () { go(1); });
    /* 159: 자동 넘김·일시정지 제거(사용자 11-23 21:22) — 이전/다음 버튼·가로 스와이프로만 이동 */
    tr.addEventListener('scroll', function () { requestAnimationFrame(upd); }, { passive: true }); window.addEventListener('resize', upd); upd();
    /* 166: data-autoplay 보드(AI-UX강의) = 끊김 없이 흐르는 자동 롤링(라이브와 같은 방식, 카드 복제로 무한 반복) + 일시정지/재생.
       마우스 올림·포커스·손가락 조작 중·화면 밖·동작 줄이기 설정이면 멈춤. 이전/다음 버튼은 카드 1장씩 이동 */
    var pb = root.querySelector('.sp-rv-pause');
    if (root.hasAttribute('data-autoplay') && pb) {
      root.classList.add('sp-rv-roll');
      cards.forEach(function (c) { var k = c.cloneNode(true); k.setAttribute('aria-hidden', 'true'); k.classList.add('sp-rv-clone'); [].forEach.call(k.querySelectorAll('a,button'), function (x) { x.tabIndex = -1; }); tr.appendChild(k); });
      var off = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches), hold = false, seen = true, pos = tr.scrollLeft, ours = false, holdT = null;
      var loopW = function () { var c0 = tr.querySelector('.sp-rv-clone'); return c0 ? c0.offsetLeft - cards[0].offsetLeft : 0; };
      var setp = function (v) { off = v; pb.setAttribute('aria-pressed', v ? 'true' : 'false'); pb.textContent = v ? '재생' : '일시정지'; };
      setp(off);
      pb.addEventListener('click', function () { setp(!off); });
      var pause = function (ms) { hold = true; clearTimeout(holdT); if (ms) holdT = setTimeout(function () { hold = false; pos = tr.scrollLeft; }, ms); };
      root.addEventListener('mouseenter', function () { pause(0); }); root.addEventListener('mouseleave', function () { hold = false; pos = tr.scrollLeft; });
      root.addEventListener('focusin', function () { pause(0); }); root.addEventListener('focusout', function () { hold = false; pos = tr.scrollLeft; });
      tr.addEventListener('touchstart', function () { pause(0); }, { passive: true }); tr.addEventListener('touchend', function () { pause(2500); }, { passive: true });
      [root.querySelector('.sp-rv-prev'), root.querySelector('.sp-rv-next')].forEach(function (b) { b.addEventListener('click', function () { pause(2500); }); });
      tr.addEventListener('scroll', function () { if (!ours) pos = tr.scrollLeft; ours = false; }, { passive: true });
      if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { seen = e[0].isIntersecting; }).observe(root);
      (function step() {
        if (!off && !hold && seen && !document.hidden) {
          var w = loopW(); pos += 0.45; if (w > 0 && pos >= w) pos -= w;
          ours = true; tr.scrollLeft = pos;
        }
        requestAnimationFrame(step);
      })();
    }
  }
  function boot() { [].forEach.call(document.querySelectorAll('.sp-rv'), init); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
/* 171(11-24 14:11 '모바일이 피그마 시안처럼'): ① 첫 진입 스와이프 안내 = 피그마 99:1684 뉴모피즘(오목 트랙 + 볼록 손가락 노브 + 좌우 긴 화살표)
   ② 전체보기 시트에 Language 그룹(피그마 93:1713: 한국어(KO) = 현재 오목, English(EN) = 볼록 링크) — 기존 sp-mnav.js 가 만든 요소에 덧붙임 */
(function () {
  if (!document.documentElement.classList.contains('sp-b')) return;
  var HAND = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 14a8 8 0 0 1-8 8"/><path d="M18 11v-1a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1"/><path d="M10 9.5V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10"/><path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>';
  var ARR = function (l) { return '<svg class="a' + (l ? ' l' : ' r') + '" width="36" height="8" viewBox="0 0 36 8" fill="none" aria-hidden="true"><path d="' + (l ? 'M36 7.3H1L8 .7' : 'M0 7.3H35L28 .7') + '" stroke="#111" stroke-width="1.5"/></svg>'; };
  function toast(t) { if (t.getAttribute('data-b')) return; t.setAttribute('data-b', '1'); t.innerHTML = '<div class="spsw-track">' + ARR(true) + '<span class="spsw-knob">' + HAND + '</span>' + ARR(false) + '</div>'; }
  function lang(sheet) {
    if (sheet.querySelector('.spm-lang')) return;
    var en = document.querySelector('.sp-lang a[hreflang="en"]'), ko = document.querySelector('.sp-lang a[hreflang="ko"]');
    var isEn = document.documentElement.lang === 'en';
    var cur = function (t) { return '<a class="is-on" aria-current="true" href="' + location.pathname + '">' + t + '</a>'; };
    var html = '<h4>Language</h4><div class="spm-g spm-lang">' + (isEn ? (ko ? '<a href="' + ko.getAttribute('href') + '" hreflang="ko" lang="ko">한국어 (KO)</a>' : '') + cur('English (EN)')
      : cur('한국어 (KO)') + (en ? '<a href="' + en.getAttribute('href') + '" hreflang="en" lang="en">English (EN)</a>' : '')) + '</div>';
    var cta = sheet.querySelector('.spm-cta'); if (!cta) return;
    cta.insertAdjacentHTML('beforebegin', html);
  }
  /* 172(사용자 16:19 '모바일에서 프로젝트 문의 → 예전 입력폼'): ① 미리보기에선 모바일 메뉴·시트 링크를 미리보기 페이지로(라이브 옛 페이지로 나가지 않게)
     ② 시트의 '프로젝트 문의하기' = 하단 바와 같은 B안 문의 모달(문의하기 페이지에선 페이지 폼으로 이동) */
  var PV = location.pathname.indexOf('/b-preview/') === 0, PVP = ['/ux-research/', '/ux-writing/', '/ux-design/', '/web-app-development/', '/ux-academy/', '/ux-blog/', '/ux-company/', '/contact/'];
  function links(root) {
    if (root.getAttribute('data-bl')) return; root.setAttribute('data-bl', '1');
    if (PV) [].forEach.call(root.querySelectorAll('a[href^="/"]'), function (a) {
      var h = a.getAttribute('href'); if (h.indexOf('/b-preview/') === 0) return;
      var base = h.replace(/#.*$/, ''), hash = h.slice(base.length);
      if (base === '/' || PVP.indexOf(base) >= 0) a.setAttribute('href', '/b-preview' + base + hash);
    });
    var inq = root.querySelector('.spm-cta a[data-spm="inq"]');
    if (inq) inq.addEventListener('click', function (e) {
      var f = document.getElementById('projectInquiryForm'), sh = document.getElementById('spMnavSheet'), btn = document.querySelector('#spMnav .spm-all');
      var close = function () { if (sh && sh.classList.contains('is-open') && btn) btn.click(); };
      if (f && f.closest('.sp-kform')) { e.preventDefault(); close(); setTimeout(function () { f.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 60); return; }
      if (window.spOpenInquiry) { e.preventDefault(); close(); setTimeout(function () { window.spOpenInquiry(); }, 60); }
    });
  }
  function scan() {
    var t = document.getElementById('spSwipeToast'); if (t) toast(t);
    var s = document.getElementById('spMnavSheet'); if (s) { lang(s); links(s); }
    var m = document.getElementById('spMnav'); if (m) links(m);
  }
  /* 미리보기 경로(/b-preview/)에선 sp-mnav.js 가 '/' 만 보고 토스트를 안 띄우므로 같은 규칙(모바일·세션 1회·1.5초)으로 대신 띄움. 정식 전환 후엔 sp-mnav.js 가 띄우고 위 toast()가 모양만 바꿈 */
  if (location.pathname === '/b-preview/' && window.matchMedia('(max-width: 768px)').matches) {
    var shown = false; try { shown = !!sessionStorage.getItem('sp_swipe_tip'); if (!shown) sessionStorage.setItem('sp_swipe_tip', '1'); } catch (e) {}
    if (!shown) {
      var pv = function () { var t = document.createElement('div'); t.id = 'spSwipeToast'; t.setAttribute('role', 'img'); t.setAttribute('aria-label', '화면을 좌우로 넘기면 다른 메뉴로 이동합니다'); toast(t); document.body.appendChild(t); setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 1500); };
      if (document.body) pv(); else document.addEventListener('DOMContentLoaded', pv);
    }
  }
  var mo = new MutationObserver(scan);
  function start() { scan(); mo.observe(document.body, { childList: true }); setTimeout(function () { mo.disconnect(); }, 8000); }
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
})();

/* 173(사용자 11-24 16:32 '모바일 약도 글자가 너무 작다'): 모바일에선 약도(문의하기·홈 찾아오시는 길 팝업)를 빨간 점 주변으로 확대(viewBox 만 바꿈, 그림·문구 동일) */
(function () {
  if (!document.documentElement.classList.contains('sp-b') || !window.matchMedia) return;
  var mq = window.matchMedia('(max-width: 768px)'), ZOOM = '318 178 320 222';
  function apply() {
    [].forEach.call(document.querySelectorAll('svg.sp-map'), function (svg) {
      if (!svg.getAttribute('data-vb')) svg.setAttribute('data-vb', svg.getAttribute('viewBox'));
      svg.setAttribute('viewBox', mq.matches ? ZOOM : svg.getAttribute('data-vb'));
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply); else apply();
  if (mq.addEventListener) mq.addEventListener('change', apply);
})();
/* 175(사용자 11-24 17:25 '모바일 전체 최적화'): 모바일에서 3열 이상 표 = 행마다 카드로 쌓기(셀마다 머리글 라벨). 표 HTML·문구는 그대로, 보이는 방식만 바꿈 */
(function () {
  if (!document.documentElement.classList.contains('sp-b')) return;
  function run() {
    [].forEach.call(document.querySelectorAll('.main-content-pane table'), function (t) {
      if (t.closest('.sp-atable-wrap') || t.classList.contains('ux-writing-table') || !t.rows.length) return;
      var head = t.tHead && t.tHead.rows[0] ? t.tHead.rows[0] : (t.rows[0].querySelector('td') ? null : t.rows[0]);
      if (!head || head.cells.length < 3) return;
      var labels = [].map.call(head.cells, function (c) { return c.textContent.trim(); });
      t.classList.add('sp-stk');
      [].forEach.call(t.rows, function (r) {
        if (r === head) { r.classList.add('sp-stk-h'); return; }
        [].forEach.call(r.cells, function (c, i) { if (labels[i]) c.setAttribute('data-l', labels[i]); });
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
})();
/* 177(사용자 11-24 19:31 '5-B'): AI-UX강의 코스 비교표(머리글 5칸 이상) → 모바일 코스별 카드. 표 HTML·문구는 그대로 두고(PC·검색엔진), 카드는 표에서 복사해 모바일에서만 보임(CSS) */
(function () {
  if (!document.documentElement.classList.contains('sp-b')) return;
  function run() {
    [].forEach.call(document.querySelectorAll('.main-content-pane .sp-atable-wrap'), function (w) {
      var t = w.querySelector('table'); if (!t || !t.tHead || !t.tHead.rows[0] || w.classList.contains('sp-has-cards')) return;
      var hc = t.tHead.rows[0].cells; if (hc.length < 5) return;
      var rows = [].slice.call(t.tBodies[0] ? t.tBodies[0].rows : []); if (!rows.length) return;
      var box = document.createElement('div'); box.className = 'sp-ccards'; box.setAttribute('role', 'list');
      for (var c = 1; c < hc.length; c++) {
        var card = document.createElement('div'); card.className = 'sp-ccard'; card.setAttribute('role', 'listitem');
        var h = document.createElement('div'); h.className = 'sp-ccard-h';
        var b = document.createElement('b'); b.textContent = hc[c].textContent.trim(); h.appendChild(b);
        var dl = document.createElement('dl');
        rows.forEach(function (r) {
          var lab = r.cells[0] ? r.cells[0].textContent.trim() : '', cell = r.cells[c]; if (!cell) return;
          if (/강의시간/.test(lab)) { var s = document.createElement('span'); s.textContent = cell.textContent.trim(); h.appendChild(s); return; }
          var dt = document.createElement('dt'); dt.textContent = lab;
          var dd = document.createElement('dd'); dd.innerHTML = cell.innerHTML;
          dl.appendChild(dt); dl.appendChild(dd);
        });
        card.appendChild(h); card.appendChild(dl); box.appendChild(card);
      }
      w.classList.add('sp-has-cards'); w.parentNode.insertBefore(box, w.nextSibling);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
})();
/* 187(사용자 11-25 11:38): 서브페이지 '포트폴리오 보기'·'인재채용' = 메인과 같은 B안 창(제목줄·뉴모피즘 본문). 다른 창은 기존 그대로 */
(function () {
  var de = document.documentElement;
  if (!de.classList.contains('sp-b') || de.classList.contains('sp-b-home')) return;
  var ARW = '<i class="sp-arw" aria-hidden="true"></i>', PDF = '/Superplanning_Company_Brochure.pdf?v=194';
  var POP = {
    brochure: { w: 1000, title: '포트폴리오 보기', body:
      '<div class="sp-pop sp-pop-media"><div class="sp-pop-bar"><span class="sp-pop-file">슈퍼플래닝_회사소개서.pdf</span><div class="sp-pop-actions">' +
      '<a href="' + PDF + '" download="Superplanning_Company_Brochure.pdf" class="w95-btn sp-pop-btn">파일 다운로드</a>' +
      '<a href="' + PDF + '" target="_blank" rel="noopener" class="w95-btn sp-pop-btn">새 창에서 열기' + ARW + '</a></div></div>' +
      '<iframe class="sp-pop-frame sp-pop-doc sp-pop-pdf" src="' + PDF + '#toolbar=1&navpanes=0&scrollbar=1" title="슈퍼플래닝 포트폴리오 보기"></iframe></div>' },
    careers: { w: 580, title: '인재 채용', body:
      '<div class="sp-pop"><div class="sp-pop-head"><h3 class="sp-pop-h">인재를 채용합니다 (상시 모집)</h3><p class="sp-pop-lead">슈퍼플래닝과 함께 할 슈퍼크루를 모집합니다.</p></div>' +
      '<div class="sp-pop-card"><div class="sp-pop-sec"><div class="sp-pop-sub">지원 자격</div><ul class="sp-pop-list"><li>신입, 경력 / 연령 / 학력 / 국적 무관</li><li>이력서 자유양식</li></ul></div>' +
      '<div class="sp-pop-sec"><div class="sp-pop-sub">모집분야</div><div class="sp-pop-chips"><span>서비스 기획자</span><span>프로덕트 디자이너</span><span>AI-UX강사</span><span>UI디자이너</span><span>프론트/백엔드 개발자</span></div></div>' +
      '<div class="sp-pop-sec"><div class="sp-pop-sub">우대조건</div><p class="sp-pop-p">자신의 실무에 대해 원데이클래스 강의 가능하신 분!</p></div></div>' +
      '<div class="sp-pop-row"><div><span class="sp-pop-k">이메일 접수</span><b class="sp-pop-v">jake@superplanning.co.kr</b></div>' +
      '<button type="button" class="w95-btn" data-spb-copy="jake@superplanning.co.kr">복사</button></div>' +
      '<p class="sp-pop-note">서류전형 합격자에 한해 개별통보를 드리며, 지원서 허위 작성시 합격이 취소 될 수 있습니다.</p></div>' }
  };
  var css = '#spbPopOv{position:fixed;inset:0;z-index:9999999;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(17,17,17,.45)}' +
    '#spbPopOv .win{position:relative;display:flex;flex-direction:column;max-width:calc((100vw - 32px) / var(--k,1));max-height:calc((100vh - 32px) / var(--k,1))}' +
    '#spbPopOv .w-title{display:flex;align-items:center;justify-content:space-between;flex:none}' +
    '#spbPopOv .t-actions{display:flex}#spbPopOv .w-body{flex:1;min-height:0;overflow:auto}' +
    '#spbPopOv .win.is-max{width:calc((100vw - 32px) / var(--k,1)) !important}' +
    '@media (min-width:769px){#spbPopOv .win{zoom:var(--k,1)}}' +
    '@media (max-width:768px){#spbPopOv{padding:10px}#spbPopOv .win{width:100% !important}#spbPopOv .sp-pop-pdf{height:62vh}#spbPopOv .sp-pop-bar{flex-wrap:wrap}}';
  var last = null;
  function close() { var o = document.getElementById('spbPopOv'); if (o) o.remove(); document.removeEventListener('keydown', esc); if (last && last.focus) try { last.focus(); } catch (e) {} }
  function esc(e) { if (e.key === 'Escape') close(); }
  function open(key) {
    var d = POP[key]; if (!d) return false;
    if (!document.getElementById('spbPopCss')) { var st = document.createElement('style'); st.id = 'spbPopCss'; st.textContent = css; document.head.appendChild(st); }
    if (typeof window.closeSubpageWindow === 'function') try { window.closeSubpageWindow(); } catch (e) {}
    if (typeof window.closeStart === 'function') try { window.closeStart(); } catch (e) {}
    close(); last = document.activeElement;
    var ov = document.createElement('div'); ov.id = 'spbPopOv';
    ov.innerHTML = '<div class="win" role="dialog" aria-modal="true" aria-label="' + d.title + '" data-key="' + key + '" style="width:' + d.w + 'px">' +
      '<div class="w-title"><span class="t-text">' + d.title + '</span><div class="t-actions">' +
      '<button type="button" class="w95-btn t-btn" title="최소화" data-a="x">_</button><button type="button" class="w95-btn t-btn" title="최대화" data-a="m">▢</button>' +
      '<button type="button" class="w95-btn t-btn" title="닫기" data-a="x">✕</button></div></div><div class="w-body">' + d.body + '</div></div>';
    ov.addEventListener('click', function (e) {
      if (e.target === ov) return close();
      var b = e.target.closest && e.target.closest('button'); if (!b) return;
      if (b.dataset.a === 'x') close();
      else if (b.dataset.a === 'm') ov.querySelector('.win').classList.toggle('is-max');
      else if (b.dataset.spbCopy) {
        var t = b.dataset.spbCopy;
        if (typeof window.copyToClipboard === 'function') window.copyToClipboard(t, '지원서 이메일 주소', b);
        else if (navigator.clipboard) navigator.clipboard.writeText(t).then(function () { b.textContent = '완료!'; setTimeout(function () { b.textContent = '복사'; }, 1500); });
      }
    });
    document.body.appendChild(ov); document.addEventListener('keydown', esc);
    var c = ov.querySelector('[title="닫기"]'); if (c) c.focus();
    return true;
  }
  window.spbOpenPop = open;
  function hook() {
    var orig = window.openWindow;
    window.openWindow = function (key) { if (POP[key]) return open(key); if (typeof orig === 'function') return orig.apply(this, arguments); };
    /* GNB '인재채용' 버튼(페이지마다 회사소개 이동·홈 이동 등으로 달랐음) → 인재 채용 창 */
    [].forEach.call(document.querySelectorAll('#gnb button'), function (b) {
      if (b.textContent.trim() === '인재채용') { b.removeAttribute('onclick'); b.onclick = function (e) { e.preventDefault(); open('careers'); }; }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', hook); else hook();
})();
/* 188(사용자 11-25): PC '포트폴리오 보기' PDF 오른쪽 잘림 — 크롬 PDF 뷰어는 화면 비율 축소(zoom) 안에서 폭을 잘못 계산함.
   PDF 창(메인 .w-body / 서브 #spbPopOv .win)만 축소하지 않고 같은 크기를 실제 px 로 지정. 모바일·다른 창은 그대로 */
(function () {
  var de = document.documentElement;
  if (!de.classList.contains('sp-b') || document.getElementById('spbPdfFix')) return;
  var st = document.createElement('style'); st.id = 'spbPdfFix';
  st.textContent = '@media (min-width:769px){' +
    'html.sp-b-home .win[data-key="brochure"] .w-body{zoom:1 !important}' +
    'html.sp-b-home .win[data-key="brochure"] .sp-pop-pdf{height:calc(640px * var(--k,1)) !important}' +
    '#spbPopOv .win[data-key="brochure"]{zoom:1 !important;width:min(calc(1000px * var(--k,1)),calc(100vw - 32px)) !important;max-width:none !important;max-height:calc(100vh - 32px) !important}' +
    '#spbPopOv .win[data-key="brochure"] .sp-pop-pdf{height:min(calc(640px * var(--k,1) + 80px),calc(100vh - 200px)) !important}}';
  (document.head || de).appendChild(st);
})();
