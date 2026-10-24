/* 86·87: 모바일 상단 헤더 + 메뉴 탭 줄 + 전체보기 화면(E안 v2) + 모바일 회사소개서 보기(페이지 이미지). 화면 표시는 sp-mnav.css가 768px 이하에서만 켭니다. */
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
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();
