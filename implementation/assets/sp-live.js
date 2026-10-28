/* 슈퍼플래닝 실시간 영업현황 전광판 (KST 기준) */
(function () {
  var CSS = '' +
    '.sp-live{background:#0b0b0b;border:2px solid #000;border-radius:8px;box-shadow:inset 0 0 0 1px #2a2a2a,inset 0 0 18px rgba(255,255,255,.05);color:#f4f4f4;padding:9px 11px 8px;margin:0 0 12px;font-family:Pretendard,-apple-system,system-ui,sans-serif;user-select:none}' +
    '.sp-live *{color:inherit}' +
    '.spl-top{display:flex;align-items:center;justify-content:space-between;font-size:10px;font-weight:700;letter-spacing:.5px}' +
    '.spl-st{display:inline-flex;align-items:center;gap:5px;font-size:11px;letter-spacing:0}' +
    '.spl-dot{width:7px;height:7px;border-radius:50%;background:#fff;box-shadow:0 0 6px #fff,0 0 2px #fff;animation:splBlink 1.6s infinite}' +
    '.sp-live.is-off .spl-dot{background:#444;box-shadow:none;animation:none}' +
    '.sp-live.is-off .spl-st{color:#8a8a8a}' +
    '.spl-day{font-size:10.5px;font-weight:600;color:#cfcfcf;letter-spacing:0}' +
    '.spl-mid{display:flex;align-items:center;justify-content:space-between;margin:6px 0 7px}' +
    '.spl-clock{display:flex;align-items:center;gap:3px;filter:drop-shadow(0 0 3px rgba(255,255,255,.55))}' +
    '.spl-clock svg{display:block}' +
    '.spl-colon{display:flex;flex-direction:column;gap:7px;margin:0 2px}' +
    '.spl-colon i{width:4px;height:4px;background:#fff;display:block}' +
    '.spl-colon.blink i{opacity:.12}' +
    '.spl-team{display:grid;grid-template-columns:auto auto;gap:6px 12px}' +
    '.spl-b{display:flex;align-items:center;gap:5px;font-size:10px;font-weight:600;color:#9a9a9a;white-space:nowrap}' +
    '.spl-b i{width:11px;height:11px;border-radius:50%;background:#262626;border:1px solid #3a3a3a;display:block}' +
    '.spl-b.on{color:#fff}' +
    '.spl-b.on i{background:radial-gradient(circle at 35% 35%,#fff 0,#f2f2f2 45%,#cfcfcf 100%);border-color:#fff;box-shadow:0 0 8px rgba(255,255,255,.85),0 0 2px #fff}' +
    '.spl-ft{border-top:1px dashed #333;padding-top:6px;display:flex;justify-content:space-between;gap:6px;font-size:9.5px;color:#bdbdbd;line-height:1.35;word-break:keep-all}' +
    '.spl-ft b{color:#fff;font-weight:700}' +
    '.spl-clock svg{width:18px;height:29px}' +
    '.sp-live[data-sp-live="wide"]{padding:14px 20px 12px;margin:0 0 24px}' +
    '.sp-live[data-sp-live="wide"] .spl-st{font-size:13.5px;gap:7px}' +
    '.sp-live[data-sp-live="wide"] .spl-dot{width:9px;height:9px}' +
    '.sp-live[data-sp-live="wide"] .spl-day{font-size:13px}' +
    '.sp-live[data-sp-live="wide"] .spl-mid{margin:12px 0 12px}' +
    '.sp-live[data-sp-live="wide"] .spl-clock{gap:5px}' +
    '.sp-live[data-sp-live="wide"] .spl-clock svg{width:30px;height:48px}' +
    '.sp-live[data-sp-live="wide"] .spl-colon{gap:12px;margin:0 4px}' +
    '.sp-live[data-sp-live="wide"] .spl-colon i{width:6px;height:6px}' +
    '.sp-live[data-sp-live="wide"] .spl-team{grid-template-columns:repeat(4,auto);gap:8px 22px}' +
    '.sp-live[data-sp-live="wide"] .spl-b{font-size:13px;gap:7px}' +
    '.sp-live[data-sp-live="wide"] .spl-b i{width:15px;height:15px}' +
    '.sp-live[data-sp-live="wide"] .spl-ft{font-size:12px;padding-top:9px;justify-content:flex-start;gap:24px}' +
    '.sp-live[data-sp-live="mini"]{padding:7px 8px 6px;margin:0 0 2px;border-width:1px;border-radius:5px}' +
    '.sp-live[data-sp-live="mini"] .spl-top{font-size:9px}' +
    '.sp-live[data-sp-live="mini"] .spl-st{font-size:10px;gap:4px}' +
    '.sp-live[data-sp-live="mini"] .spl-dot{width:6px;height:6px}' +
    '.sp-live[data-sp-live="mini"] .spl-day{font-size:9.5px}' +
    '.sp-live[data-sp-live="mini"] .spl-mid{margin:7px 0 2px}' +
    '.sp-live[data-sp-live="mini"] .spl-clock{gap:2px}' +
    '.sp-live[data-sp-live="mini"] .spl-clock svg{width:17px;height:26px}' +
    '.sp-live[data-sp-live="mini"] .spl-colon{gap:7px;margin:0 1px}' +
    '.sp-live[data-sp-live="mini"] .spl-colon i{width:3px;height:3px}' +
    '.sp-live[data-sp-live="mini"] .spl-team{gap:5px 6px}' +
    '.sp-live[data-sp-live="mini"] .spl-mid{justify-content:space-between;gap:6px}' +
    '.sp-live[data-sp-live="mini"] .spl-b{font-size:9px;gap:3px;letter-spacing:-.03em}' +
    '.sp-live[data-sp-live="mini"] .spl-b i{width:8px;height:8px}' +
    '.sp-live[data-sp-live="mini"] .spl-ft{display:none}' +
    '@media (max-width:640px){.sp-live[data-sp-live="wide"] .spl-team{grid-template-columns:auto auto;gap:6px 14px}.sp-live[data-sp-live="wide"] .spl-clock svg{width:22px;height:35px}.sp-live[data-sp-live="wide"] .spl-ft{justify-content:space-between;gap:6px}}' +
    '@keyframes splBlink{0%,60%{opacity:1}80%{opacity:.25}100%{opacity:1}}' +
    '@media (prefers-reduced-motion:reduce){.spl-dot{animation:none}}';

  /* 7-segment digit (a b c d e f g) */
  var SEG = { 0: 'abcdef', 1: 'bc', 2: 'abdeg', 3: 'abcdg', 4: 'bcfg', 5: 'acdfg', 6: 'acdefg', 7: 'abc', 8: 'abcdefg', 9: 'abcdfg' };
  var P = {
    a: '4,1 18,1 15,4 7,4', d: '7,32 15,32 18,35 4,35',
    g: '5,18 7,16.3 15,16.3 17,18 15,19.7 7,19.7',
    f: '2.5,2.5 5.5,5.5 5.5,15.5 2.5,17.5', b: '19.5,2.5 19.5,17.5 16.5,15.5 16.5,5.5',
    e: '2.5,18.5 5.5,20.5 5.5,30.5 2.5,33.5', c: '19.5,18.5 19.5,33.5 16.5,30.5 16.5,20.5'
  };
  function digit(n) {
    var on = SEG[n], s = '<svg width="18" height="29" viewBox="0 0 22 36" preserveAspectRatio="none" aria-hidden="true">';
    'abcdefg'.split('').forEach(function (k) {
      s += '<polygon points="' + P[k] + '" fill="#fff" opacity="' + (on.indexOf(k) > -1 ? 1 : 0.07) + '"/>';
    });
    return s + '</svg>';
  }

  function kst() {
    var d = new Date(Date.now() + 9 * 3600 * 1000);
    return { y: d.getUTCFullYear(), mo: d.getUTCMonth(), da: d.getUTCDate(), dow: d.getUTCDay(), h: d.getUTCHours(), m: d.getUTCMinutes(), s: d.getUTCSeconds() };
  }
  function rnd(seed) { var x = Math.sin(seed) * 10000; return x - Math.floor(x); }

  /* 팀 점등 규칙: 대표 상시 / 평일 08-09 1~2팀, 09-19 3팀, 19-22 1팀 / 주말 10-19 1~2팀 / 영업외 0팀 */
  function state(t) {
    var wk = t.dow === 0 || t.dow === 6, hm = t.h + t.m / 60;
    var open = wk ? (hm >= 10 && hm < 19) : (hm >= 8 && hm < 22);
    var n = 0;
    if (open) {
      if (wk) n = 1 + (rnd(t.y * 400 + t.mo * 31 + t.da + t.h) > 0.5 ? 1 : 0);
      else if (hm < 9) n = 1 + (rnd(t.da * 7 + t.h) > 0.5 ? 1 : 0);
      else if (hm < 19) n = 3;
      else n = 1;
    }
    var order = [0, 1, 2], seed = t.y * 400 + t.mo * 31 + t.da;
    for (var i = 2; i > 0; i--) { var j = Math.floor(rnd(seed + i * 13) * (i + 1)); var tmp = order[i]; order[i] = order[j]; order[j] = tmp; }
    var teams = [false, false, false];
    for (var k = 0; k < n; k++) teams[order[k]] = true;
    return { wk: wk, open: open, teams: teams };
  }

  var DOW = ['일', '월', '화', '수', '목', '금', '토'];
  var NAMES = ['대표', '기획팀', '디자인팀', '개발팀'];
  /* 구조는 한 번만 만들고 이후에는 글자·클래스·투명도만 바꿈(터치 중 요소 교체로 스와이프가 끊기지 않도록) */
  function build(el) {
    el.innerHTML =
      '<div class="spl-top"><span class="spl-st"><span class="spl-dot"></span><span class="spl-stt"></span></span><span class="spl-day"></span></div>' +
      '<div class="spl-mid"><div class="spl-clock">' + digit(8) + digit(8) + '<span class="spl-colon"><i></i><i></i></span>' + digit(8) + digit(8) + '</div>' +
      '<div class="spl-team">' + NAMES.map(function (nm) { return '<span class="spl-b"><i></i>' + (el.getAttribute('data-sp-live') === 'mini' ? nm.replace('팀', '') : nm) + '</span>'; }).join('') + '</div></div>' +
      '<div class="spl-ft"><span>평일·야간 <b>08:00–22:00</b></span><span>주말 <b>10:00–19:00</b></span></div>';
  }
  function setDigit(svg, n) {
    var on = SEG[n], ps = svg.querySelectorAll('polygon');
    'abcdefg'.split('').forEach(function (k, i) { ps[i].setAttribute('opacity', on.indexOf(k) > -1 ? '1' : '0.07'); });
  }
  function render(el) {
    var t = kst(), st = state(t);
    el.classList.toggle('is-off', !st.open);
    var hh = ('0' + t.h).slice(-2), mm = ('0' + t.m).slice(-2), on = [true].concat(st.teams);
    el.querySelector('.spl-stt').textContent = st.open ? '현재 영업중' : '영업 준비중';
    el.querySelector('.spl-day').textContent = (t.mo + 1) + '월 ' + t.da + '일 ' + DOW[t.dow] + '요일';
    var clk = el.querySelector('.spl-clock'), svgs = clk.querySelectorAll('svg'), ds = hh + mm;
    for (var i = 0; i < 4; i++) setDigit(svgs[i], +ds[i]);
    clk.setAttribute('aria-label', '현재 시각 ' + hh + '시 ' + mm + '분');
    el.querySelector('.spl-colon').classList.toggle('blink', t.s % 2 === 1);
    el.querySelectorAll('.spl-b').forEach(function (b, i) { b.classList.toggle('on', on[i]); });
  }

  function mount() {
    var els = document.querySelectorAll('[data-sp-live]');
    if (!els.length) return;
    if (!document.getElementById('spLiveCss')) { var s = document.createElement('style'); s.id = 'spLiveCss'; s.textContent = CSS; document.head.appendChild(s); }
    els.forEach(function (el) { el.classList.add('sp-live'); build(el); render(el); });
    setInterval(function () { els.forEach(render); }, 1000);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();
