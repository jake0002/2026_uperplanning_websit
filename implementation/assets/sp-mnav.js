/* 86: 모바일 상단 헤더 + 메뉴 탭 줄 + 전체보기 화면(E안 v2). 화면 표시는 sp-mnav.css가 768px 이하에서만 켭니다. */
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
      '<h4>회사</h4><div class="spm-g spm-g3">' + link('/ux-company/', '회사소개') + '<a href="/ux-company/#brochure" data-spm="pf">포트폴리오</a>' + link('/contact/', '문의하기') + '</div>' +
      '<div class="spm-cta"><a class="k" href="' + KAKAO + '" target="_blank" rel="noopener" data-spm="kakao">💬 카카오톡 상담</a><a class="i" href="/contact/" data-spm="inq">✉ 프로젝트 문의</a></div></div>';
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
      if (k === 'kakao') { window.spQB && window.spQB('kakao', 'mobile_menu'); setOpen(false); return; }
      if (k === 'pf' && typeof window.openWindow === 'function') { e.preventDefault(); setOpen(false); window.openWindow('brochure'); return; }
      if (k === 'inq') {
        window.spQB && window.spQB('inquiry', 'mobile_menu');
        var f = document.getElementById('projectInquiryForm');
        if (typeof window.spOpenInquiry === 'function') { e.preventDefault(); setOpen(false); window.spOpenInquiry(); return; }
        if (f) { e.preventDefault(); setOpen(false); window.scrollTo({ top: f.getBoundingClientRect().top + window.pageYOffset - 120, behavior: 'smooth' }); return; }
      }
      setOpen(false);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();
