/* 슈퍼플래닝 B안 공통 스크립트 (sp-b.js) — html.sp-b 페이지에서만 동작
   1) TOP 버튼: 동그라미 둘레에 스크롤 진행률을 검정 선으로 표시(맨 아래 = 한 바퀴, 올리면 줄어듦) — 피그마 26:606
   기존 #scrollTopBtn(서브페이지)이 있으면 그대로 쓰고, 없으면(메인) 새로 만든다. 클릭 = 맨 위로(부드럽게). */
(function () {
  if (!document.documentElement.classList.contains('sp-b')) return;
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
