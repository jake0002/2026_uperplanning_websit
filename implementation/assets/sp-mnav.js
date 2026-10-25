/* 86·87·88: 모바일 상단 헤더 + 메뉴 탭 줄 + 전체보기 화면(E안 v2) + 모바일 회사소개서 보기(페이지 이미지) + 88 좌우 스와이프 이동·메인 안내 토스트. 화면 표시는 sp-mnav.css가 768px 이하에서만 켭니다. */
(function () {
  if (window.__spMnav) return; window.__spMnav = true;
  var KAKAO = 'https://open.kakao.com/o/sovRKoMi';
  var TABS = [
    ['/', '홈'], ['/ux-research/', 'UX리서치'], ['/ux-writing/', 'UX라이팅'], ['/ux-design/', 'UX디자인'],
    ['/web-app-development/', '웹/앱개발'], ['/ux-academy/', 'AI-UX강의'], ['/ux-blog/', 'UX블로그'],
    ['/ux-company/', '회사소개'], ['/contact/', '문의하기']
  ];
  var path = location.pathname.replace(/index\.html$/, '');
  function isOn(href) { return href === '/' ? path === '/' : path.indexOf(href) === 0; }
  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  var PDF = '/Superplanning_Company_Brochure.pdf', PAGES = 31;
  function isMobile() { return window.innerWidth <= 768; }
  function track(btn, pos) {
    if (typeof window.spQB === 'function') { window.spQB(btn, pos); return; }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'quick_banner_click', qb_button: btn, qb_position: pos, form_page: location.pathname });
  }
  function goInquiry(e) {
    var f = document.getElementById('projectInquiryForm');
    if (typeof window.spOpenInquiry === 'function') { if (e) e.preventDefault(); window.spOpenInquiry(); return true; }
    if (f) { if (e) e.preventDefault(); window.scrollTo({ top: f.getBoundingClientRect().top + window.pageYOffset - 120, behavior: 'smooth' }); return true; }
    return false;
  }
  function link(href, label, cls) { return '<a href="' + href + '"' + (isOn(href) ? ' class="is-on' + (cls ? ' ' + cls : '') + '" aria-current="page"' : (cls ? ' class="' + cls + '"' : '')) + '>' + esc(label) + '</a>'; }

  function build() {
    var bar = document.createElement('div');
    bar.id = 'spMnav';
    bar.innerHTML =
      '<div class="spm-hdr"><a class="spm-logo" href="/" aria-label="슈퍼플래닝 홈"><img src="/images/brand/superplanning-logo-m.png?v=86" alt="슈퍼플래닝 홈" width="151" height="14"></a>' +
      '<button type="button" class="spm-all" aria-expanded="false" aria-controls="spMnavSheet">☰ 전체보기</button></div>' +
      '<nav class="spm-bar" aria-label="모바일 메뉴"><div class="spm-tabs">' + TABS.map(function (t) { return link(t[0], t[1]); }).join('') + '</div>' +
      '<span class="spm-fade l is-hidden"></span><span class="spm-fade r"></span>' +
      '<button type="button" class="spm-arr l is-hidden" aria-label="이전 메뉴 보기"><b>‹</b></button>' +
      '<button type="button" class="spm-arr r" aria-label="다음 메뉴 보기"><b>›</b></button><span class="spm-badge is-hidden"></span></nav>';
    var sheet = document.createElement('div');
    sheet.id = 'spMnavSheet';
    sheet.setAttribute('role', 'dialog');
    sheet.setAttribute('aria-label', '전체보기');
    sheet.innerHTML =
      '<div class="spm-st">전체보기</div><div class="spm-sb">' +
      '<h4>UX 서비스</h4><div class="spm-g">' + link('/ux-research/', 'UX리서치') + link('/ux-writing/', 'UX라이팅') + link('/ux-design/', 'UX기획/디자인') + link('/web-app-development/', '웹/앱개발') + '</div>' +
      '<h4>교육·인사이트</h4><div class="spm-g">' + link('/ux-academy/', 'AI-UX강의') + link('/ux-blog/', 'UX블로그') + '</div>' +
      '<h4>슈퍼플래닝</h4><div class="spm-g spm-g3">' + link('/ux-company/', '회사소개') + '<a href="/ux-company/#brochure" data-spm="pf">포트폴리오</a>' + link('/contact/', '문의하기') + '</div>' +
      '<div class="spm-cta"><a class="k" href="' + KAKAO + '" target="_blank" rel="noopener" data-spm="kakao">카카오톡 상담하기</a><a class="i" href="/contact/" data-spm="inq">프로젝트 문의하기</a></div></div>';
    document.body.insertBefore(sheet, document.body.firstChild);
    document.body.insertBefore(bar, document.body.firstChild);

    var tabs = bar.querySelector('.spm-tabs'), nav = bar.querySelector('.spm-bar');
    var aL = bar.querySelector('.spm-arr.l'), aR = bar.querySelector('.spm-arr.r');
    var fL = bar.querySelector('.spm-fade.l'), fR = bar.querySelector('.spm-fade.r'), badge = bar.querySelector('.spm-badge');
    function tog(el, show) { el.classList.toggle('is-hidden', !show); }
    function update() {
      var max = tabs.scrollWidth - tabs.clientWidth, x = tabs.scrollLeft, left = x > 4, right = x < max - 4;
      nav.classList.toggle('has-left', left);
      tog(aL, left); tog(fL, left); tog(aR, right); tog(fR, right);
      var edge = tabs.getBoundingClientRect().right - 44, n = 0;
      Array.prototype.forEach.call(tabs.children, function (a) { if (a.getBoundingClientRect().right > edge + 2) n++; });
      badge.textContent = '+' + n; tog(badge, right && n > 0);
    }
    aR.addEventListener('click', function () { tabs.scrollLeft += tabs.clientWidth * 0.6; });
    aL.addEventListener('click', function () { tabs.scrollLeft -= tabs.clientWidth * 0.6; });
    tabs.addEventListener('scroll', function () { window.requestAnimationFrame(update); }, { passive: true });
    window.addEventListener('resize', update);
    var on = tabs.querySelector('.is-on');
    if (on && on.offsetLeft + on.offsetWidth > tabs.clientWidth - 92) {
      tabs.style.scrollBehavior = 'auto';
      tabs.scrollLeft = on.offsetLeft - 92;
      tabs.style.scrollBehavior = '';
    }
    update();
    if (!aR.classList.contains('is-hidden')) aR.classList.add('is-nudge');

    var btn = bar.querySelector('.spm-all');
    function setOpen(open) {
      sheet.classList.toggle('is-open', open);
      btn.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.textContent = open ? '✕ 닫기' : '☰ 전체보기';
      document.body.classList.toggle('spm-lock', open);
      nav.classList.toggle('is-hidden', open);
    }
    btn.addEventListener('click', function () { setOpen(!sheet.classList.contains('is-open')); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
    sheet.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a') : null;
      if (!a) return;
      var k = a.getAttribute('data-spm');
      if (k === 'kakao') { track('kakao', 'mobile_menu'); setOpen(false); return; }
      if (k === 'pf') { e.preventDefault(); setOpen(false); openPdf(); return; }
      if (k === 'inq') { track('inquiry', 'mobile_menu'); setOpen(false); goInquiry(e); return; }
      setOpen(false);
    });

    /* 87: 모바일 회사소개서 보기 — PDF 대신 페이지 이미지(/images/brochure/brochure-01~31.webp)를 세로로 보여 줌. PC는 기존 PDF 창 그대로 */
    var pdf = null;
    function closePdf() { if (pdf) { pdf.classList.remove('is-open'); document.body.classList.remove('spm-lock'); } }
    function openPdf() {
      if (!isMobile()) { if (typeof origOpen === 'function') origOpen('brochure'); else location.href = '/ux-company/#brochure'; return; }
      if (!pdf) {
        var imgs = '';
        for (var i = 1; i <= PAGES; i++) {
          var n = (i < 10 ? '0' : '') + i;
          imgs += '<div class="spp-pg"><img src="/images/brochure/brochure-' + n + '.webp?v=87" width="900" height="506" loading="lazy" decoding="async" alt="슈퍼플래닝 회사소개서 및 포트폴리오 ' + i + '쪽"><i>' + i + ' / ' + PAGES + '</i></div>';
        }
        pdf = document.createElement('div');
        pdf.id = 'spPdf';
        pdf.setAttribute('role', 'dialog');
        pdf.setAttribute('aria-label', '회사소개서 및 포트폴리오');
        pdf.innerHTML =
          '<div class="spp-wt"><span>회사소개서 및 포트폴리오</span><button type="button" class="spp-x" aria-label="닫기">✕</button></div>' +
          '<div class="spp-info"><b>슈퍼플래닝 회사소개서 및 포트폴리오</b><small>PDF · ' + PAGES + '쪽 · 약 3.9MB</small></div>' +
          '<div class="spp-btns"><a href="' + PDF + '" download="Superplanning_Company_Brochure.pdf" data-spp="dl">PDF 다운로드</a><a href="' + PDF + '" target="_blank" rel="noopener" data-spp="open">새 창에서 열기</a></div>' +
          '<p class="spp-tip">▼ 아래로 내려 바로 보기</p>' +
          '<div class="spp-pages">' + imgs + '</div>' +
          '<div class="spp-end"><p>친절한 실무진이 직접 빠르게 답변 드리겠습니다.</p><a href="/contact/" data-spp="inq">프로젝트 문의하기</a></div>';
        document.body.appendChild(pdf);
        pdf.addEventListener('click', function (e) {
          if (e.target.closest('.spp-x')) { closePdf(); return; }
          var a = e.target.closest('a'); if (!a) return;
          var k = a.getAttribute('data-spp');
          if (k === 'dl') track('pdf_download', 'mobile_pdf');
          if (k === 'open') track('pdf_open', 'mobile_pdf');
          if (k === 'inq') { track('inquiry', 'mobile_pdf'); closePdf(); goInquiry(e); }
        });
      }
      pdf.scrollTop = 0;
      pdf.classList.add('is-open');
      document.body.classList.add('spm-lock');
      track('pdf_view', 'mobile_pdf');
    }
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closePdf(); });
    var origOpen = window.openWindow;
    if (typeof origOpen === 'function') {
      window.openWindow = function (key) {
        if (key === 'brochure' && isMobile()) { openPdf(); return; }
        return origOpen.apply(this, arguments);
      };
    }
    swipe();
  }

  /* 88: 좌우 스와이프로 메뉴 순서(상단 탭 순서)대로 이동 — 왼쪽으로 밀면 다음, 오른쪽으로 밀면 이전, 끝에서는 처음으로 순환. 화면 가장자리 24px는 브라우저 뒤로가기 제스처에 양보 */
  function swipe() {
    var N = TABS.length, cur = 0;
    TABS.forEach(function (t, i) { if (isOn(t[0])) cur = i; });
    var nx = (cur + 1) % N, pv = (cur - 1 + N) % N;
    var ui = document.createElement('div');
    ui.id = 'spSwipe';
    ui.setAttribute('aria-hidden', 'true');
    function panel(side, i, arr) { return '<div class="sps ' + side + '"><b>' + arr + '</b><span>' + esc(TABS[i][1]) + '</span><i>' + (i + 1) + ' / ' + N + '</i></div>'; }
    ui.innerHTML = panel('l', pv, '‹') + panel('r', nx, '›');
    document.body.appendChild(ui);
    var pL = ui.querySelector('.l'), pR = ui.querySelector('.r'), sx = 0, sy = 0, mode = 0, dx = 0, GO = 80, MAX = 104;
    function blocked(el) {
      if (!isMobile() || document.querySelector('#spMnavSheet.is-open, #spPdf.is-open, .spq-ov.open')) return true;
      for (; el && el !== document.body && el.nodeType === 1; el = el.parentElement) {
        if (/^(INPUT|TEXTAREA|SELECT|IFRAME)$/.test(el.tagName) || el.id === 'spMnav' || el.isContentEditable) return true;
        var o = window.getComputedStyle(el).overflowX;
        if ((o === 'auto' || o === 'scroll') && el.scrollWidth > el.clientWidth + 2) return true;
      }
      return false;
    }
    function reset() { mode = 0; dx = 0; pL.style.width = '0'; pR.style.width = '0'; pL.classList.remove('ready'); pR.classList.remove('ready'); }
    document.addEventListener('touchstart', function (e) {
      reset();
      var t = e.touches[0];
      if (e.touches.length > 1 || t.clientX < 24 || t.clientX > window.innerWidth - 24 || blocked(e.target)) { mode = -1; return; }
      sx = t.clientX; sy = t.clientY;
    }, { passive: true });
    document.addEventListener('touchmove', function (e) {
      if (mode < 0) return;
      var t = e.touches[0], dy = t.clientY - sy;
      dx = t.clientX - sx;
      if (mode === 0) {
        if (Math.abs(dy) > 12 && Math.abs(dy) > Math.abs(dx)) { mode = -1; return; }
        if (Math.abs(dx) > 14 && Math.abs(dx) > Math.abs(dy) * 1.6) mode = 1; else return;
      }
      if (e.cancelable) e.preventDefault();
      var p = dx < 0 ? pR : pL;
      (dx < 0 ? pL : pR).style.width = '0';
      p.style.width = Math.min(Math.abs(dx) * 0.9, MAX) + 'px';
      p.classList.toggle('ready', Math.abs(dx) >= GO);
    }, { passive: false });
    function end() {
      if (mode === 1 && Math.abs(dx) >= GO) {
        track(dx < 0 ? 'swipe_next' : 'swipe_prev', 'mobile_swipe');
        location.href = TABS[dx < 0 ? nx : pv][0];
        return;
      }
      reset();
    }
    document.addEventListener('touchend', end);
    document.addEventListener('touchcancel', reset);
    if (path === '/' && isMobile()) toast();
  }

  /* 88: 메인 첫 진입 시 스와이프 안내 토스트(글자 없이 손가락 + 좌우 화살표, 1.5초 후 사라짐, 방문(세션)당 1회) */
  function toast() {
    try { if (window.sessionStorage.getItem('sp_swipe_tip')) return; window.sessionStorage.setItem('sp_swipe_tip', '1'); } catch (e) {}
    var H = [[5,0,2],[4,1,4],[4,2,4],[4,3,4],[4,4,4],[4,5,4],[9,5,2],[4,6,4],[9,6,3],[13,6,2],[1,7,2],[4,7,4],[9,7,3],[13,7,3],[0,8,8],[9,8,3],[13,8,3],[0,9,16],[0,10,16],[1,11,15],[2,12,13],[3,13,11],[4,14,9],[4,15,9]];
    function rects(list, fill, op) { return list.map(function (r) { return '<rect x="' + r[0] + '" y="' + r[1] + '" width="' + r[2] + '" height="' + (r[3] || 1) + '" fill="' + fill + '"' + (op ? ' opacity="' + op + '"' : '') + '/>'; }).join(''); }
    var hand = '<g class="h">' + rects(H.map(function (r) { return [r[0] + 19, r[1] + 11, r[2]]; }), '#ffffff') + rects([[24, 6, 4], [22, 7, 1, 2], [29, 7, 1, 2]], '#ffffff', '.55') + '</g>';
    var aL = '<g class="al">' + rects([[3, 16, 1], [4, 15, 1, 3], [5, 14, 1, 5], [6, 16, 6]], '#ffffff') + rects([[13, 16, 1]], '#ffffff', '.6') + rects([[15, 16, 1]], '#ffffff', '.3') + '</g>';
    var aR = '<g class="ar">' + rects([[50, 16, 1], [49, 15, 1, 3], [48, 14, 1, 5], [42, 16, 6]], '#ffffff') + rects([[40, 16, 1]], '#ffffff', '.6') + rects([[38, 16, 1]], '#ffffff', '.3') + '</g>';
    var t = document.createElement('div');
    t.id = 'spSwipeToast';
    t.setAttribute('role', 'img');
    t.setAttribute('aria-label', '화면을 좌우로 넘기면 다른 메뉴로 이동합니다');
    t.innerHTML = '<svg width="150" height="84" viewBox="0 0 54 30" shape-rendering="crispEdges" aria-hidden="true">' + aL + aR + hand + '</svg>';
    document.body.appendChild(t);
    setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 1500);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();
