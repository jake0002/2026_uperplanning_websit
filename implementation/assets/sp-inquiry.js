/* 64: 슈퍼플래닝 서브페이지 문의 모달 + 강의 신청 모달 (보던 페이지 위에서 바로 문의) — 공통 스크립트 */
(function () {
  'use strict';
  if (window.spOpenInquiry) return;
  var ENV = '<svg width="40" height="40" viewBox="0 0 16 16" shape-rendering="crispEdges" aria-hidden="true" style="display:block; margin:0 auto 10px auto;"><rect x="2" y="13" width="14" height="1" fill="#808080"/><rect x="15" y="4" width="1" height="10" fill="#808080"/><rect x="1" y="3" width="14" height="10" fill="#ffffff"/><rect x="2" y="11" width="12" height="1" fill="#c0c0c0"/><rect x="1" y="3" width="14" height="1" fill="#000"/><rect x="1" y="12" width="14" height="1" fill="#000"/><rect x="1" y="3" width="1" height="10" fill="#000"/><rect x="14" y="3" width="1" height="10" fill="#000"/><rect x="2" y="4" width="1" height="1" fill="#000"/><rect x="3" y="5" width="1" height="1" fill="#000"/><rect x="4" y="6" width="1" height="1" fill="#000"/><rect x="5" y="7" width="1" height="1" fill="#000"/><rect x="6" y="8" width="1" height="1" fill="#000"/><rect x="7" y="9" width="1" height="1" fill="#000"/><rect x="13" y="4" width="1" height="1" fill="#000"/><rect x="12" y="5" width="1" height="1" fill="#000"/><rect x="11" y="6" width="1" height="1" fill="#000"/><rect x="10" y="7" width="1" height="1" fill="#000"/><rect x="9" y="8" width="1" height="1" fill="#000"/><rect x="8" y="9" width="1" height="1" fill="#000"/><rect x="10" y="9" width="6" height="6" fill="#000"/><rect x="11" y="11" width="1" height="1" fill="#fff"/><rect x="12" y="12" width="1" height="1" fill="#fff"/><rect x="13" y="11" width="1" height="1" fill="#fff"/><rect x="14" y="10" width="1" height="1" fill="#fff"/></svg>';
  var FS = 'https://formsubmit.co/ajax/a9613d6a838a841f3946e77c76b9a18a';
  var CSS = [
    '.spq-ov{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:9999998;display:none;align-items:center;justify-content:center;padding:16px;}',
    '.spq-ov.open{display:flex;}',
    '.spq-box{width:100%;max-width:420px;max-height:92vh;overflow-y:auto;background:#c0c0c0;border:3px solid #000;box-shadow:6px 6px 0 rgba(0,0,0,.4);text-align:left;color:#000;font-family:inherit;}',
    '.spq-box.wide{max-width:620px;}',
    '.spq-box.white{background:#fff;max-width:440px;}',
    '.spq-tb{position:sticky;top:0;z-index:2;background:#000;color:#fff;padding:8px 12px;font-size:13px;font-weight:bold;display:flex;justify-content:space-between;align-items:center;user-select:none;}',
    '.spq-x{padding:1px 7px;font-size:11px;background:#fff;color:#000;border:1px solid #fff;cursor:pointer;font-weight:bold;line-height:1.4;}',
    '.spq-bd{padding:16px 18px 18px;}',
    '.spq-h{margin:0 0 4px;font-size:15px;font-weight:900;color:#000;border:0;padding:0;}',
    '.spq-sub{margin:0 0 12px;font-size:12px;font-weight:600;color:#222;word-break:keep-all;line-height:1.5;}',
    '.spq-in{display:block;width:100%;box-sizing:border-box;border:2px solid #000;background:#fff;color:#000;padding:8px 9px;font-size:12.5px;font-family:inherit;margin:0 0 8px;box-shadow:inset 1px 1px 0 #808080;border-radius:0;}',
    '.spq-in::placeholder{color:#888;opacity:1;}',
    'textarea.spq-in{resize:vertical;line-height:1.5;}',
    '.spq-agree{display:flex;align-items:center;gap:6px;font-size:11.5px;margin:4px 0 30px;color:#222;cursor:pointer;}',
    '.spq-agree input{width:13px;height:13px;margin:0;accent-color:#000;}',
    '.spq-ctaw{position:relative;}',
    '.spq-tip{position:absolute;top:-30px;right:0;background:#383838;color:#fff;font-size:11.5px;font-weight:700;padding:4px 10px;border-radius:6px;border:1px solid #1f1f1f;box-shadow:2px 2px 5px rgba(0,0,0,.25);white-space:nowrap;}',
    '.spq-tip:after{content:"";position:absolute;bottom:-5px;right:18px;border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid #383838;}',
    '.spq-cta{display:block;width:100%;min-height:40px;background:#000;color:#fff;border:2px solid #000;box-shadow:3px 3px 0 #808080;font-weight:900;font-size:13.5px;cursor:pointer;font-family:inherit;}',
    '.spq-cta[disabled]{opacity:.7;cursor:wait;}',
    '.spq-note{font-size:11px;color:#333;margin:10px 0 0;text-align:center;word-break:keep-all;}',
    '.spq-sec{background:#fff;border:2px solid #000;box-shadow:inset 1px 1px 0 #fff,inset -1px -1px 0 #808080;padding:10px 12px;margin-bottom:8px;}',
    '.spq-lb{font-size:12.5px;font-weight:800;margin:0 0 7px;color:#000;}',
    '.spq-lb small{font-weight:600;color:#555;margin-left:4px;font-size:11px;}',
    '.spq-chips{display:flex;flex-wrap:wrap;gap:5px;}',
    '.spq-chip{display:inline-flex;align-items:center;gap:5px;font-size:12px;font-weight:700;border:1px solid #000;padding:5px 9px;background:#fff;color:#000;line-height:1.3;cursor:pointer;}',
    '.spq-chip.on{background:#000;color:#fff;}',
    '.spq-chip input{margin:0 5px 0 0;accent-color:#000;vertical-align:-2px;}',
    '.spq-chip input[type=radio]{position:absolute;opacity:0;pointer-events:none;}',
    '.spq-chip.on .spq-rk:before{content:"\\2713";font-weight:900;margin-right:2px;}',
    '.spq-c4{display:grid;grid-template-columns:repeat(4,1fr);gap:5px;}',
    '.spq-c4 .spq-chip{flex-direction:column;align-items:flex-start;gap:1px;}',
    '.spq-c4 .spq-chip small{font-weight:600;font-size:11px;opacity:.85;}',
    '.spq-row{display:grid;grid-template-columns:1fr 1fr;gap:8px;}',
    '.spq-row .spq-in{margin:0;}',
    '.spq-mt{margin-top:7px !important;}',
    '.spq-err{position:relative;display:flex;align-items:flex-start;gap:6px;margin:-2px 0 8px;background:#383838;color:#fff;font-size:11.5px;font-weight:700;line-height:1.45;padding:6px 10px;border-radius:6px;word-break:keep-all;}',
    '.spq-err:before{content:"";position:absolute;top:-5px;left:16px;border-left:5px solid transparent;border-right:5px solid transparent;border-bottom:5px solid #383838;}',
    '.spq-done{text-align:center;padding:20px 22px 22px;background:#fff;}',
    '.spq-done h3{margin:0 0 10px;font-size:16px;font-weight:800;color:#000;border:0;padding:0;}',
    '.spq-msg{font-size:13px;line-height:1.65;color:#222;font-weight:600;word-break:keep-all;}',
    '.spq-sum{margin:14px 0 4px;border:2px solid #000;box-shadow:inset 1px 1px 0 #fff,inset -1px -1px 0 #808080;background:#c0c0c0;text-align:left;padding:8px 12px;}',
    '.spq-sum p{margin:0 0 6px;font-weight:800;font-size:12.5px;}',
    '.spq-sum table{width:100%;border-collapse:collapse;background:#fff;border:1px solid #000;}',
    '.spq-sum td{border-top:1px solid #c0c0c0;padding:5px 8px;font-size:12px;vertical-align:top;}',
    '.spq-sum td:first-child{width:74px;font-weight:800;background:#f0f0f0;}',
    '.spq-steps{display:flex;gap:4px;margin-top:8px;font-size:11.5px;font-weight:700;}',
    '.spq-steps span{flex:1;border:1px solid #000;padding:5px 2px;background:#fff;text-align:center;}',
    '.spq-steps span.on{background:#000;color:#fff;}',
    '.spq-hr{border-top:2px dashed #000;margin:16px 0 12px;}',
    '.spq-q{text-align:left;}',
    '.spq-q .t{font-size:14px;font-weight:800;color:#000;margin:0 0 4px;word-break:keep-all;}',
    '.spq-q .s{font-size:12px;color:#444;margin:0 0 10px;line-height:1.5;word-break:keep-all;}',
    '.spq-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px 8px;}',
    '.spq-opt{display:flex;align-items:flex-start;gap:6px;font-size:12.5px;font-weight:600;line-height:1.4;border:1px solid #000;padding:6px 7px;background:#fff;color:#000;cursor:pointer;word-break:keep-all;}',
    '.spq-opt.on{background:#000;color:#fff;}',
    '.spq-opt input{margin:2px 0 0;accent-color:#000;flex:none;}',
    '.spq-kwl{font-size:12.5px;font-weight:700;color:#000;margin:10px 0 0;}',
    '.spq-btns{display:flex;gap:8px;justify-content:center;margin-top:16px;}',
    '.spq-b1{padding:9px 26px;font-size:13px;font-weight:bold;background:#000;color:#fff;border:2px solid #000;box-shadow:3px 3px 0 #808080;cursor:pointer;font-family:inherit;}',
    '.spq-b2{padding:9px 18px;font-size:13px;font-weight:bold;background:#fff;color:#000;border:2px solid #000;box-shadow:3px 3px 0 #808080;cursor:pointer;font-family:inherit;}',
    '.spq-dnote{font-size:11px;color:#666;margin-top:10px;text-align:center;}',
    '@media (max-width:600px){.spq-row{grid-template-columns:1fr;}.spq-c4{grid-template-columns:1fr 1fr;}}'
  ].join('\n');

  var SRC = [['google', '구글 검색'], ['naver', '네이버 검색'], ['ai', 'AI 추천<br>(챗GPT, 클로드 등)'], ['blog', '블로그 글'], ['referral', '지인·고객사 소개'], ['sns', 'SNS<br>(인스타, 스레드 등)'], ['press', '기사·언론 보도'], ['lecture', '강의·세미나 참석'], ['existing', '이전 거래·재문의'], ['etc', '기타 (직접 입력)']];
  var COURSES = { A: ['A코스', '입문형 · 5시간'], B: ['B코스', '심화형 · 8시간'], C: ['C코스', '확장형 · 12시간'], X: ['맞춤 설계', '상담 후 결정'] };
  var TOPICS = ['UX리서치', 'UX라이팅', '서비스기획', 'IA설계', '기능정의서 작성', '웹/앱 화면기획서 작성', '피그마', '바이브코딩', 'AI 활용 UX기획', 'UX포트폴리오 코칭', '면접·커리어 코칭', '맞춤설계 상담 후 결정'];
  var last = { name: '', email: '', mode: 'inquiry' };
  var built = false;

  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s || '').replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); }
  function dl(o) { try { (window.dataLayer = window.dataLayer || []).push(o); } catch (e) {} }
  function post(payload) {
    var body = JSON.stringify(payload);
    var p1 = fetch(FS, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: body }).catch(function () {});
    var p2 = fetch('/api/send_inquiry.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body }).catch(function () {});
    return Promise.race([p1, p2, new Promise(function (r) { setTimeout(r, 3000); })]);
  }
  function chip(type, name, value, label, sub, checked) {
    return '<label class="spq-chip' + (checked ? ' on' : '') + '"><span><input type="' + type + '" name="' + name + '" value="' + esc(value) + '"' + (checked ? ' checked' : '') + '>' + (type === 'radio' ? '<span class="spq-rk"></span>' : '') + label + '</span>' + (sub ? '<small>' + sub + '</small>' : '') + '</label>';
  }
  function field(id, ph, type, extra) { return '<input class="spq-in" id="' + id + '" type="' + (type || 'text') + '" placeholder="' + ph + '"' + (extra || '') + '>'; }
  function ctaBlock(id, text) { return '<div class="spq-ctaw"><span class="spq-tip">보통 10분 이내 응답</span><button type="button" class="spq-cta" id="' + id + '">' + text + '</button></div>'; }
  function agree(id) { return '<label class="spq-agree"><input type="checkbox" id="' + id + '" checked>개인정보 수집 및 이용 동의 (필수)</label>'; }

  function build() {
    if (built) return; built = true;
    var st = document.createElement('style'); st.id = 'spq-style'; st.textContent = CSS; document.head.appendChild(st);
    var inq = '<div class="spq-ov" id="spqInq"><div class="spq-box" role="dialog" aria-modal="true" aria-labelledby="spqInqH">' +
      '<div class="spq-tb"><span>[문의하기]</span><button type="button" class="spq-x" data-close aria-label="닫기">✕</button></div>' +
      '<div class="spq-bd"><h3 class="spq-h" id="spqInqH">UX프로젝트 문의</h3><p class="spq-sub">친절한 실무진이 직접 빠르게 답변 드리겠습니다.</p>' +
      field('spqName', '이름 *') + field('spqCompany', '회사명 (선택)') + field('spqEmail', '이메일 *', 'email') + field('spqPhone', '연락처 (선택)', 'tel') +
      '<textarea class="spq-in" id="spqMsg" rows="4" placeholder="문의내용 *&#10;예: 앱 리뉴얼 전 UX진단 컨설팅, UX교육 상담, 웹/앱 개발 등"></textarea>' +
      agree('spqAgree') + ctaBlock('spqSend', '문의 등록하고 빠른 답변 받기') + '</div></div></div>';
    var types = ['1:1 개인 강의', '기업·기관 출강', '대학·공공기관 특강', '기타'].map(function (t) { return chip('radio', 'splType', t, t, '', t === '기업·기관 출강'); }).join('');
    var courses = Object.keys(COURSES).map(function (k) { return chip('radio', 'splCourse', k, COURSES[k][0], COURSES[k][1], false); }).join('');
    var jobs = ['취업·이직 준비', '주니어 기획자·디자이너', '기업 실무자', 'SI 개발자', '스타트업 대표·예비창업자', '교육 담당자(HRD)', '기타'].map(function (t) { return chip('radio', 'splJob', t, t, '', t === '교육 담당자(HRD)'); }).join('');
    var topics = TOPICS.map(function (t) { return chip('checkbox', 'splTopic', t, t, '', t === '맞춤설계 상담 후 결정'); }).join('');
    var methods = ['오프라인', '온라인(실시간)', '상담 후 결정'].map(function (t) { return chip('radio', 'splMethod', t, t, '', t === '오프라인'); }).join('');
    var lec = '<div class="spq-ov" id="spqLec"><div class="spq-box wide" role="dialog" aria-modal="true" aria-labelledby="spqLecH">' +
      '<div class="spq-tb"><span>[강의 신청]</span><button type="button" class="spq-x" data-close aria-label="닫기">✕</button></div>' +
      '<div class="spq-bd"><h3 class="spq-h" id="spqLecH">AI활용 UX강의 신청</h3><p class="spq-sub">일정과 견적은 상담 후 확정됩니다. 선택하신 내용으로 맞춤 커리큘럼을 안내해 드립니다.</p>' +
      '<div class="spq-sec"><p class="spq-lb">1. 수강 형태 <small>(선택)</small></p><div class="spq-chips">' + types + '</div></div>' +
      '<div class="spq-sec"><p class="spq-lb">2. 코스 선택 * <small>선택하신 코스가 미리 체크됩니다</small></p><div class="spq-c4">' + courses + '</div></div>' +
      '<div class="spq-sec"><p class="spq-lb">3. 현재 직업 <small>(선택)</small></p><div class="spq-chips">' + jobs + '</div></div>' +
      '<div class="spq-sec"><p class="spq-lb">4. 희망 강의내용 <small>여러 개 선택 가능</small></p><div class="spq-chips">' + topics + '</div></div>' +
      '<div class="spq-sec"><div class="spq-row"><div><p class="spq-lb">5. 예상 인원 *</p><select class="spq-in" id="splPeople"><option selected>1명~5명</option><option>5명~10명</option><option>10명~30명</option><option>30명~50명</option><option>50명 이상</option></select></div>' +
      '<div><p class="spq-lb">6. 희망 일정 *</p>' + field('splDate', '예: 11월 중 평일 오후, 11/20(목)') + '</div></div></div>' +
      '<div class="spq-sec"><p class="spq-lb">7. 진행 방식 *</p><div class="spq-chips">' + methods + '</div><div id="splPlaceW">' + field('splPlace', '오프라인 장소를 적어 주세요. 예: 서울 강남구 OO빌딩 교육장', 'text', ' style="margin:7px 0 0;"') + '</div></div>' +
      '<div class="spq-sec"><p class="spq-lb">8. 신청자 정보</p><div class="spq-row">' + field('splName', '이름 *') + field('splCompany', '회사·학교명 (선택)') + '</div>' +
      '<div class="spq-row spq-mt">' + field('splEmail', '이메일 *', 'email') + field('splPhone', '연락처 (일정 조율용, 선택)', 'tel') + '</div>' +
      '<textarea class="spq-in spq-mt" id="splReq" rows="3" style="margin-bottom:0;" placeholder="요청사항 (선택)&#10;수강 목적이나 현재 고민을 적어 주시면 커리큘럼에 반영합니다.&#10;예: 현업 기능정의서 작성법, 포트폴리오 완성"></textarea></div>' +
      agree('splAgree') + ctaBlock('splSend', '강의 신청하고 빠른 답변 받기') +
      '<p class="spq-note">신청 후 담당자가 일정·견적을 확인해 연락드립니다. 결제는 상담 후 진행됩니다.</p></div></div></div>';
    var opts = SRC.map(function (o) { return '<label class="spq-opt"><input type="checkbox" value="' + o[0] + '"><span>' + o[1] + '</span></label>'; }).join('');
    var done = '<div class="spq-ov" id="spqDone"><div class="spq-box white" role="dialog" aria-modal="true">' +
      '<div class="spq-tb"><span id="spqDoneTb">[문의 접수 완료]</span><button type="button" class="spq-x" data-close aria-label="닫기">✕</button></div>' +
      '<div class="spq-done" id="spqD1">' + ENV + '<h3 id="spqD1H"></h3><div class="spq-msg" id="spqD1M"></div><div id="spqSum"></div>' +
      '<div class="spq-hr"></div><div class="spq-q"><p class="t" id="spqQt"></p><p class="s" id="spqQs"></p><div class="spq-grid">' + opts + '</div>' +
      '<div id="spqEtcW" style="display:none;"><input type="text" class="spq-in" id="spqEtc" maxlength="200" style="margin:6px 0 0;" placeholder="어떻게 알게 되셨는지 자유롭게 적어 주세요"></div>' +
      '<div id="spqKwW" style="display:none;"><p class="spq-kwl">검색어나 AI에 질문하신 내용이 기억나시면 적어 주세요 (선택)</p><input type="text" class="spq-in" id="spqKw" maxlength="200" style="margin:6px 0 0;" placeholder="예: UX리서치, UX라이팅, UX디자인 등"></div></div>' +
      '<div class="spq-btns"><button type="button" class="spq-b1" id="spqSrcSend">답변 보내기</button><button type="button" class="spq-b2" id="spqSkip">건너뛰기</button></div><div class="spq-dnote" id="spqDn"></div></div>' +
      '<div class="spq-done" id="spqD2" style="display:none;">' + ENV + '<h3 id="spqD2H"></h3><div class="spq-msg" id="spqD2M" style="margin-bottom:18px;"></div><button type="button" class="spq-b1" style="padding:9px 36px;" data-close>확인</button></div>' +
      '</div></div>';
    var wrap = document.createElement('div'); wrap.innerHTML = inq + lec + done; while (wrap.firstChild) document.body.appendChild(wrap.firstChild);

    ['spqInq', 'spqLec', 'spqDone'].forEach(function (id) {
      var ov = $(id);
      ov.addEventListener('click', function (e) { if (e.target === ov || (e.target.closest && e.target.closest('[data-close]'))) close(id); });
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { ['spqDone', 'spqLec', 'spqInq'].some(function (id) { if ($(id).classList.contains('open')) { close(id); return true; } }); } });
    document.querySelectorAll('#spqLec .spq-chip input').forEach(function (inp) {
      inp.addEventListener('change', function () {
        var grp = document.querySelectorAll('#spqLec input[name="' + inp.name + '"]');
        grp.forEach(function (g) { g.closest('.spq-chip').classList.toggle('on', g.checked); });
        if (inp.name === 'splMethod') $('splPlaceW').style.display = (inp.value === '오프라인' && inp.checked) ? 'block' : 'none';
      });
    });
    ['spqEmail', 'splEmail'].forEach(function (id) {
      var el = $(id);
      el.addEventListener('blur', function () { var v = el.value.trim(); emailErr(el, !!v && !isEmail(v)); });
      el.addEventListener('input', function () { if (isEmail(el.value.trim())) emailErr(el, false); });
    });
    document.querySelectorAll('#spqDone .spq-opt input').forEach(function (cb) { cb.addEventListener('change', srcToggle); });
    $('spqSend').addEventListener('click', sendInquiry);
    $('splSend').addEventListener('click', sendLecture);
    $('spqSrcSend').addEventListener('click', sendSource);
    $('spqSkip').addEventListener('click', function () { showD2(); });
  }

  function open(id) { $(id).classList.add('open'); document.body.style.overflow = 'hidden'; }
  function close(id) {
    $(id).classList.remove('open');
    if (!document.querySelector('.spq-ov.open')) document.body.style.overflow = '';
  }
  function emailErr(el, show) {
    var n = el.nextElementSibling, has = !!(n && n.classList && n.classList.contains('spq-err'));
    if (show && !has) { var d = document.createElement('div'); d.className = 'spq-err'; d.setAttribute('role', 'alert'); d.innerHTML = '<svg width="13" height="13" viewBox="0 0 12 12" shape-rendering="crispEdges" aria-hidden="true" style="flex:none; display:block;"><rect x="5" y="1" width="2" height="1" fill="#ffffff"/><rect x="5" y="2" width="2" height="1" fill="#ffffff"/><rect x="4" y="3" width="4" height="1" fill="#ffffff"/><rect x="4" y="4" width="4" height="1" fill="#ffffff"/><rect x="3" y="5" width="6" height="1" fill="#ffffff"/><rect x="3" y="6" width="6" height="1" fill="#ffffff"/><rect x="2" y="7" width="8" height="1" fill="#ffffff"/><rect x="2" y="8" width="8" height="1" fill="#ffffff"/><rect x="1" y="9" width="10" height="1" fill="#ffffff"/><rect x="1" y="10" width="10" height="1" fill="#ffffff"/><rect x="5" y="4" width="2" height="3" fill="#383838"/><rect x="5" y="8" width="2" height="1" fill="#383838"/></svg><span>올바른 이메일 주소를 입력해 주세요.<br><small style="font-weight:500;opacity:.85;">예: name@company.com</small></span>'; el.insertAdjacentElement('afterend', d); }
    if (!show && has) n.parentNode.removeChild(n);
  }
  function needEmail(el) { var v = el.value.trim(); if (!isEmail(v)) { emailErr(el, true); try { el.focus(); } catch (e) {} return true; } emailErr(el, false); return false; }

  window.spOpenInquiry = function () {
    build(); open('spqInq');
    setTimeout(function () { try { $('spqName').focus({ preventScroll: true }); } catch (e) {} }, 50);
    return false;
  };
  function hookTabs() {
    if (typeof window.switchStickyTab === 'function' && !window.switchStickyTab.spqWrapped) {
      var orig = window.switchStickyTab;
      window.switchStickyTab = function () { window.spqTabTouched = true; return orig.apply(this, arguments); };
      window.switchStickyTab.spqWrapped = true;
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', hookTabs); else hookTabs();
  window.spOpenLecture = function (courseKey) {
    build();
    var k = window.spqTabTouched && COURSES[courseKey] ? courseKey : 'B';
    var r = document.querySelector('#spqLec input[name="splCourse"][value="' + k + '"]');
    if (r) { r.checked = true; r.dispatchEvent(new Event('change')); }
    open('spqLec');
    var bx = document.querySelector('#spqLec .spq-box'); if (bx) bx.scrollTop = 0;
    setTimeout(function () { try { $('splDate').focus({ preventScroll: true }); } catch (e) {} }, 50);
    return false;
  };

  function sendInquiry() {
    var name = $('spqName').value.trim(), company = $('spqCompany').value.trim(), email = $('spqEmail').value.trim(), phone = $('spqPhone').value.trim(), msg = $('spqMsg').value.trim();
    if (!$('spqAgree').checked) { alert('개인정보 수집 및 이용 동의(필수)에 체크해 주세요.'); return; }
    if (!name || !email || !msg) { alert('이름, 이메일, 문의내용 등 필수 항목(*)을 모두 입력해 주세요.'); return; }
    if (needEmail($('spqEmail'))) return;
    var btn = $('spqSend'); btn.disabled = true; btn.textContent = '전송 중...';
    post({ name: name, phone: phone, company: company, email: email, message: msg + '\n\n[문의 페이지] ' + location.pathname, form_page: location.pathname,
      _subject: '[슈퍼플래닝 UX문의] ' + name + ' - ' + (company || '고객사'), _template: 'table', _captcha: 'false' }).then(function () {
      dl({ event: 'inquiry_submit', form_page: location.pathname, form_type: 'modal_inquiry' });
      btn.disabled = false; btn.textContent = '문의 등록하고 빠른 답변 받기';
      ['spqName', 'spqCompany', 'spqEmail', 'spqPhone', 'spqMsg'].forEach(function (id) { $(id).value = ''; });
      close('spqInq'); showDone('inquiry', name, email, null);
    });
  }

  function val(name) { var c = document.querySelector('#spqLec input[name="' + name + '"]:checked'); return c ? c.value : ''; }
  function sendLecture() {
    var type = val('splType'), courseK = val('splCourse'), job = val('splJob'), method = val('splMethod');
    var topics = Array.prototype.map.call(document.querySelectorAll('#spqLec input[name="splTopic"]:checked'), function (c) { return c.value; });
    var people = $('splPeople').value, date = $('splDate').value.trim(), place = $('splPlace').value.trim();
    var name = $('splName').value.trim(), company = $('splCompany').value.trim(), email = $('splEmail').value.trim(), phone = $('splPhone').value.trim(), req = $('splReq').value.trim();
    if (!$('splAgree').checked) { alert('개인정보 수집 및 이용 동의(필수)에 체크해 주세요.'); return; }
    if (!courseK || !date || !method || !name || !email) { alert('코스, 희망 일정, 진행 방식, 이름, 이메일 등 필수 항목(*)을 모두 입력해 주세요.'); return; }
    if (needEmail($('splEmail'))) return;
    var course = COURSES[courseK][0] + ' · ' + COURSES[courseK][1];
    var methodTxt = method + (method === '오프라인' && place ? ' · ' + place : '');
    var lines = ['[코스] ' + course, '[수강 형태] ' + (type || '-'), '[현재 직업] ' + (job || '-'), '[희망 강의내용] ' + (topics.join(', ') || '-'), '[예상 인원] ' + people, '[희망 일정] ' + date, '[진행 방식] ' + methodTxt, '[요청사항] ' + (req || '-'), '[신청 페이지] ' + location.pathname];
    var btn = $('splSend'); btn.disabled = true; btn.textContent = '전송 중...';
    post({ name: name, phone: phone, company: company, email: email, message: lines.join('\n'), course: course, lecture_type: type, job: job, topics: topics.join(', '), people: people, schedule: date, method: methodTxt, form_page: location.pathname,
      _subject: '[슈퍼플래닝 강의 신청] ' + name + ' - ' + COURSES[courseK][0] + '·' + (type || '수강 형태 미선택'), _template: 'table', _captcha: 'false' }).then(function () {
      dl({ event: 'inquiry_submit', form_page: location.pathname, form_type: 'lecture' });
      btn.disabled = false; btn.textContent = '강의 신청하고 빠른 답변 받기';
      var sum = [['코스', course], ['수강 형태', type ? type + ' · ' + people : people], ['희망 일정', date], ['진행 방식', methodTxt]];
      ['splDate', 'splPlace', 'splName', 'splCompany', 'splEmail', 'splPhone', 'splReq'].forEach(function (id) { $(id).value = ''; });
      close('spqLec'); showDone('lecture', name, email, sum);
    });
  }

  function showDone(mode, name, email, sum) {
    last = { name: name || '방문자', email: email, mode: mode };
    var N = '<span style="font-weight:800;color:#000;">' + esc(last.name) + '</span>';
    var L = mode === 'lecture';
    $('spqDoneTb').textContent = L ? '[강의 신청 완료]' : '[문의 접수 완료]';
    $('spqD1H').textContent = L ? '강의 신청이 접수되었습니다' : '문의가 정상 접수되었습니다';
    $('spqD1M').innerHTML = L ? N + '님, 신청해 주셔서 감사합니다.<br>담당자가 일정과 커리큘럼을 확인한 뒤<br>빠르게 연락드리겠습니다. (보통 10분 이내 회신)'
      : N + '님, 안녕하세요!<br>문의 주신 내용은 잘 받았습니다.<br>빠르게 회신드리겠습니다. (보통 10분 이내 회신)';
    $('spqSum').innerHTML = L && sum ? '<div class="spq-sum"><p>신청 내용 확인</p><table>' + sum.map(function (r) { return '<tr><td>' + r[0] + '</td><td>' + esc(r[1]) + '</td></tr>'; }).join('') + '</table><div class="spq-steps"><span class="on">① 신청 접수</span><span>② 담당자 연락</span><span>③ 커리큘럼·견적 확정</span></div></div>' : '';
    $('spqQt').innerHTML = (L ? '슈퍼플래닝 강의를 어떻게 알게 되셨나요?' : '슈퍼플래닝을 어떻게 알게 되셨나요?') + ' <span style="font-weight:600;color:#555;">(선택)</span>';
    $('spqQs').textContent = (L ? '더 나은 강의 안내에 참고하겠습니다.' : '더 정확한 상담 준비에 참고하겠습니다.') + ' 여러 개 선택할 수 있습니다.';
    $('spqDn').textContent = L ? '답변하지 않으셔도 강의 신청은 정상 접수되었습니다.' : '답변하지 않으셔도 문의는 정상 접수되었습니다.';
    document.querySelectorAll('#spqDone .spq-opt input').forEach(function (c) { c.checked = false; c.parentNode.classList.remove('on'); });
    $('spqEtc').value = ''; $('spqKw').value = ''; $('spqEtcW').style.display = 'none'; $('spqKwW').style.display = 'none';
    $('spqD1').style.display = 'block'; $('spqD2').style.display = 'none';
    var b = $('spqSrcSend'); b.disabled = false; b.textContent = '답변 보내기';
    open('spqDone');
  }
  function codes() { return Array.prototype.filter.call(document.querySelectorAll('#spqDone .spq-opt input'), function (c) { return c.checked; }).map(function (c) { return c.value; }); }
  function srcToggle(e) {
    e.target.parentNode.classList.toggle('on', e.target.checked);
    var c = codes(), kw = c.indexOf('google') > -1 || c.indexOf('naver') > -1 || c.indexOf('ai') > -1, et = c.indexOf('etc') > -1;
    $('spqKwW').style.display = kw ? 'block' : 'none'; $('spqEtcW').style.display = et ? 'block' : 'none';
    if (!kw) $('spqKw').value = ''; if (!et) $('spqEtc').value = '';
  }
  function showD2() {
    var L = last.mode === 'lecture', N = '<span style="font-weight:800;color:#000;">' + esc(last.name) + '</span>';
    if (L) { $('spqD2H').textContent = '강의 신청이 완료되었습니다'; $('spqD2M').innerHTML = N + '님, 신청해 주셔서 감사합니다.<br>담당자가 일정과 커리큘럼을 확인한 뒤<br>빠르게 연락드리겠습니다.<br>(보통 10분 이내 회신)'; }
    else { $('spqD2H').textContent = '문의 접수가 완료되었습니다'; $('spqD2M').innerHTML = N + '님, 문의해 주셔서 감사합니다.<br>담당 실무진이 내용을 확인한 뒤<br>빠르게 연락드리겠습니다.<br>(보통 10분 이내 회신)'; }
    $('spqD1').style.display = 'none'; $('spqD2').style.display = 'block';
  }
  function sendSource() {
    var c = codes();
    if (!c.length) { alert('알게 되신 경로를 하나 이상 선택해 주세요.'); return; }
    var labels = SRC.filter(function (o) { return c.indexOf(o[0]) > -1; }).map(function (o) { return o[1].replace(/<br>/g, ' '); });
    var kw = $('spqKw').value.trim(), et = $('spqEtc').value.trim();
    var msg = '[알게 된 경로] ' + labels.join(', ') + (kw ? '\n[검색어·AI 질문] ' + kw : '') + (et ? '\n[기타] ' + et : '') + '\n[문의 종류] ' + (last.mode === 'lecture' ? '강의 신청' : 'UX프로젝트 문의') + '\n[문의 페이지] ' + location.pathname;
    $('spqSrcSend').disabled = true;
    dl({ event: 'inquiry_source', inquiry_source: c.join('|'), form_page: location.pathname });
    post({ name: last.name, email: last.email, phone: '', company: '', message: msg, inquiry_source: labels.join(', '), search_keyword: kw, source_etc: et,
      _subject: '[슈퍼플래닝 유입경로] ' + last.name + ' - ' + labels.join(', '), _template: 'table', _captcha: 'false' });
    if (last.mode === 'lecture') { showD2(); }
    else { $('spqD2H').textContent = '소중한 답변 감사합니다'; $('spqD2M').innerHTML = '<span style="font-weight:800;color:#000;">' + esc(last.name) + '</span>님의 문의 내용을 확인한 뒤<br>담당 실무진이 빠르게 연락드리겠습니다.<br>(보통 10분 이내 회신)'; $('spqD1').style.display = 'none'; $('spqD2').style.display = 'block'; }
  }
})();
