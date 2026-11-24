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
    ', .postit-grid > .postit-card';
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
