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
   대상: UX 서비스 카드, 바탕화면 아이콘(네모 버튼), 카카오톡 상담 버튼, GNB 포트폴리오 보기·인재채용. 터치 기기·동작 줄이기 설정에서는 동작 안 함. */
(function () {
  if (!document.documentElement.classList.contains('sp-b')) return;
  if (!window.matchMedia || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  var SEL = '.win[data-key="services"] .card-grid .info-card, .desktop-icon, #skyscraper a[href*="open.kakao.com"], .gnb-right > .w95-btn';
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
