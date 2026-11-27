/* 198: 강의 신청 5단계·제목 '맞춤형 UX강의 신청하기'·버튼 'UX강의 신청 접수하기'·희망 일정 자동 선택 제거. B안 167(달력)·165(피그마 91:1461·91:1507·102:1817) — 라이브 sp-inquiry.js 기반, 전송·추적 로직 동일. 64: 슈퍼플래닝 서브페이지 문의 모달 + 강의 신청 모달 (보던 페이지 위에서 바로 문의) — 공통 스크립트 */
(function () {
  'use strict';
  if (window.spOpenInquiry) return;
  var ENV = '<div class="spq-ok" aria-hidden="true"><i><b><svg width="26" height="26" viewBox="0 0 26 26" fill="none"><path d="M7 13.5l4 4 8-9" stroke="#111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></b></i></div>';
  var IC_MAIL = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="3" y="5" width="14" height="10" rx="2" stroke="#111" stroke-width="1.4"/><path d="M4 6.5l6 4.2 6-4.2" stroke="#111" stroke-width="1.4" stroke-linejoin="round"/></svg>';
  var IC_BOOK = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 6.2C8.4 5 6.2 4.6 3 4.8v10c3.2-.2 5.4.2 7 1.4 1.6-1.2 3.8-1.6 7-1.4v-10c-3.2-.2-5.4.2-7 1.4zM10 6.2v10" stroke="#111" stroke-width="1.4" stroke-linejoin="round"/></svg>';
  var IC_KAKAO = '<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M9 2.5c-3.9 0-7 2.5-7 5.6 0 2 1.3 3.7 3.3 4.7l-.7 2.6c-.1.3.2.5.4.3l3-2c.3 0 .7.1 1 .1 3.9 0 7-2.5 7-5.6S12.9 2.5 9 2.5z" fill="#111"/></svg>';
  var IC_CAL = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><rect x="2.5" y="3.5" width="13" height="12" rx="2.5" stroke="#111" stroke-width="1.4"/><path d="M2.5 7.5h13M6 2v3M12 2v3" stroke="#111" stroke-width="1.4" stroke-linecap="round"/></svg>';
  var ARR_L = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 3.5L5.5 8l4.5 4.5" stroke="#111" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var ARR_R = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3.5L10.5 8 6 12.5" stroke="#111" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  function tbar(t, idt) { return '<div class="spq-tb"><span class="spq-tt"' + (idt ? ' id="' + idt + '"' : '') + '>' + t + '</span><span class="spq-wc"><i aria-hidden="true"></i><i aria-hidden="true"></i><button type="button" class="spq-x" data-close aria-label="닫기">✕</button></span></div>'; }
  var FS = 'https://formsubmit.co/ajax/a9613d6a838a841f3946e77c76b9a18a';
  /* B안(165·피그마 91:1461 문의 / 91:1507 접수 완료 / 102:1817 강의 신청): 뉴모피즘 창, 라벨 위 입력란(오목), 선택지 = 볼록 카드(선택 시 오목), 창 안 스크롤 없음 */
  var CSS = [
    '.spq-ov{position:fixed;inset:0;background:rgba(17,17,17,.72);z-index:9999998;display:none;justify-content:center;align-items:flex-start;padding:48px 16px;overflow-y:auto;overscroll-behavior:contain;}',
    '.spq-ov.open{display:flex;}',
    '.spq-box{position:relative;width:100%;max-width:560px;margin:auto 0;background:#EEF1F4;border-radius:24px;box-shadow:0 30px 80px rgba(0,0,0,.45);text-align:left;color:#3A3F45;font-family:Pretendard,"Pretendard Variable",-apple-system,sans-serif;overflow:visible;}',
    '.spq-box.wide{max-width:640px;}',
    '.spq-tb{height:44px;display:flex;align-items:center;justify-content:space-between;padding:0 14px 0 20px;border-bottom:1px solid #D3D8DE;border-radius:24px 24px 0 0;user-select:none;}',
    '.spq-tt{display:flex;align-items:center;gap:10px;font:600 13px/1 Pretendard,sans-serif;color:#111;}',
    '.spq-tt:before{content:"";width:6px;height:6px;border-radius:50%;background:#111;}',
    '.spq-wc{display:flex;gap:8px;align-items:center;}',
    '.spq-wc i,.spq-x{width:24px;height:24px;border-radius:8px;background:#EEF1F4;box-shadow:-3px -3px 6px rgba(255,255,255,.9),3px 3px 6px rgba(26,31,36,.14);display:inline-flex;align-items:center;justify-content:center;border:0;padding:0;font:600 11px/1 Pretendard,sans-serif;color:#111;}',
    '.spq-wc i:nth-child(1):before{content:"";width:8px;height:1.5px;background:#111;}',
    '.spq-wc i:nth-child(2):before{content:"";width:7px;height:7px;border:1.5px solid #111;border-radius:2px;box-sizing:border-box;}',
    '.spq-x{cursor:pointer;font-size:12px;}',
    '.spq-bd{padding:26px 32px 32px;display:flex;flex-direction:column;gap:18px;background:#fff;border-radius:0 0 24px 24px;}',
    '.spq-box.wide .spq-bd{background:#EEF1F4;gap:22px;}',
    '.spq-head{display:flex;align-items:center;gap:14px;}',
    '.spq-ico{flex:none;width:52px;height:52px;border-radius:50%;background:linear-gradient(145deg,#F7F8FA,#E4E7EB);box-shadow:-5px -5px 10px rgba(255,255,255,.95),5px 5px 10px rgba(26,31,36,.14);display:flex;align-items:center;justify-content:center;}',
    '.spq-h{margin:0 0 4px;font:700 20px/1.35 Pretendard,sans-serif;color:#111;border:0;padding:0;}',
    '.spq-sub{margin:0;font:400 14px/1.65 Pretendard,sans-serif;color:#4A4F55;word-break:keep-all;}',
    '.spq-row{display:grid;grid-template-columns:1fr 1fr;gap:14px 12px;}',
    '.spq-f{display:flex;flex-direction:column;gap:6px;margin:0;min-width:0;}',
    '.spq-l{font:600 13px/1.3 Pretendard,sans-serif;color:#111;}',
    '.spq-l.opt{color:#4A4F55;}',
    '.spq-l b{color:#D6342C;font-weight:600;}',
    '.spq-in{display:block;width:100%;box-sizing:border-box;height:44px;border:0;border-radius:10px;background:#E4E7EB;box-shadow:inset 3px 3px 7px rgba(26,31,36,.14),inset -3px -3px 7px rgba(255,255,255,.9);color:#111;padding:0 16px;font:400 14px/1.4 Pretendard,sans-serif;margin:0;outline:none;-webkit-appearance:none;appearance:none;}',
    '.spq-in::placeholder{color:#9AA1AA;opacity:1;}',
    'textarea.spq-in{height:116px;padding:14px 16px;resize:vertical;line-height:1.6;}',
    'select.spq-in{padding-right:40px;background-image:url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 viewBox=%270 0 16 16%27%3E%3Cpath d=%27M4 6l4 4 4-4%27 fill=%27none%27 stroke=%27%23111%27 stroke-width=%271.5%27/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 14px center;cursor:pointer;}',
    '.spq-agree{display:flex;align-items:center;gap:10px;font:500 12px/1.5 Pretendard,sans-serif;color:#4A4F55;cursor:pointer;margin:0;}',
    '.spq-agree input{position:absolute;opacity:0;width:1px;height:1px;}',
    '.spq-agree .spq-cb{flex:none;width:20px;height:20px;border-radius:6px;background:#E4E7EB;box-shadow:inset 2px 2px 4px rgba(26,31,36,.16),inset -2px -2px 4px rgba(255,255,255,.95);display:flex;align-items:center;justify-content:center;}',
    '.spq-agree input:checked + .spq-cb:after{content:"";width:9px;height:5px;border-left:1.6px solid #111;border-bottom:1.6px solid #111;transform:rotate(-45deg) translate(1px,-1px);}',
    '.spq-agree input:focus-visible + .spq-cb{outline:2px solid #A3AAB3;outline-offset:2px;}',
    '.spq-tip{display:none;}',
    '.spq-cta,.spq-b1{display:flex;align-items:center;justify-content:center;width:100%;height:51px;border:0;border-radius:999px;background:#111;color:#fff;font:600 15px/1 Pretendard,sans-serif;cursor:pointer;box-shadow:5px 5px 12px rgba(26,31,36,.25);}',
    '.spq-cta[disabled]{opacity:.7;cursor:wait;}',
    '.spq-or{display:flex;align-items:center;gap:12px;font:500 12px/1.5 Pretendard,sans-serif;color:#7C828A;}',
    '.spq-or:before,.spq-or:after{content:"";flex:1;height:1px;background:#D3D8DE;}',
    '.spq-kakao,.spq-b2{display:flex;align-items:center;justify-content:center;gap:8px;height:49px;border:0;border-radius:999px;background:#EEF1F4;box-shadow:-5px -5px 10px rgba(255,255,255,.95),5px 5px 10px rgba(26,31,36,.14);color:#111 !important;text-decoration:none !important;font:600 15px/1 Pretendard,sans-serif;cursor:pointer;}',
    '.spq-note{margin:0;font:500 12px/1.5 Pretendard,sans-serif;color:#7C828A;text-align:center;word-break:keep-all;}',
    '.spq-sec{display:flex;flex-direction:column;gap:10px;}',
    '.spq-lb{margin:0;font:600 15px/1.45 Pretendard,sans-serif;color:#111;display:flex;align-items:baseline;gap:6px;}',
    '.spq-lb b{color:#D6342C;font-weight:600;}',
    '.spq-lb small{font:500 12px/1.5 Pretendard,sans-serif;color:#7C828A;margin:0;}',
    '.spq-chips{display:grid;grid-template-columns:1fr 1fr;gap:12px;}',
    '.spq-chips.c3{grid-template-columns:repeat(3,1fr);}',
    '.spq-chip,.spq-opt{position:relative;display:flex;align-items:center;gap:10px;min-height:48px;box-sizing:border-box;padding:10px 12px 10px 14px;border-radius:10px;background:#EEF1F4;box-shadow:-5px -5px 10px rgba(255,255,255,.95),5px 5px 10px rgba(26,31,36,.14);color:#111;cursor:pointer;margin:0;word-break:keep-all;}',
    '.spq-chip.on,.spq-opt.on{background:#E4E7EB;box-shadow:inset 3px 3px 7px rgba(26,31,36,.14),inset -3px -3px 7px rgba(255,255,255,.9);}',
    '.spq-chip input,.spq-opt input{position:absolute;opacity:0;width:1px;height:1px;margin:0;pointer-events:none;}',
    '.spq-ind{flex:none;width:18px;height:18px;border-radius:50%;background:#E4E7EB;box-shadow:inset 2px 2px 4px rgba(26,31,36,.16),inset -2px -2px 4px rgba(255,255,255,.95);display:flex;align-items:center;justify-content:center;}',
    '.spq-ind.sq{border-radius:5px;}',
    '.on > .spq-ind:not(.sq):after{content:"";width:8px;height:8px;border-radius:50%;background:#111;}',
    '.on > .spq-ind.sq:after{content:"";width:9px;height:5px;border-left:1.6px solid #111;border-bottom:1.6px solid #111;transform:rotate(-45deg) translate(1px,-1px);}',
    '.spq-ct{display:flex;flex-direction:column;gap:2px;min-width:0;}',
    '.spq-ct b{font:600 13px/1.3 Pretendard,sans-serif;color:#111;}',
    '.spq-ct small{font:500 12px/1.4 Pretendard,sans-serif;color:#7C828A;}',
    '.spq-opt{min-height:56px;padding:0 12px 0 16px;gap:8px;font:600 13px/1.4 Pretendard,sans-serif;}',
    '.spq-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}',
    '.spq-err{position:relative;display:flex;align-items:flex-start;gap:6px;margin:6px 0 0;background:#383838;color:#fff;font:600 11.5px/1.45 Pretendard,sans-serif;padding:6px 10px;border-radius:6px;word-break:keep-all;}',
    '.spq-err:before{content:"";position:absolute;top:-5px;left:16px;border-left:5px solid transparent;border-right:5px solid transparent;border-bottom:5px solid #383838;}',
    '.spq-done{display:flex;flex-direction:column;gap:14px;padding:28px 32px 32px;background:#fff;border-radius:0 0 24px 24px;text-align:center;}',
    '.spq-ok{align-self:center;margin:8px 0 6px;width:92px;height:92px;border-radius:50%;background:#EEF1F4;box-shadow:-10px -10px 20px rgba(255,255,255,.95),10px 10px 20px rgba(26,31,36,.14);display:flex;align-items:center;justify-content:center;}',
    '.spq-ok i{width:70px;height:70px;border-radius:50%;background:#E4E7EB;box-shadow:inset 4px 4px 8px rgba(26,31,36,.14),inset -4px -4px 8px rgba(255,255,255,.9);display:flex;align-items:center;justify-content:center;}',
    '.spq-ok b{width:48px;height:48px;border-radius:50%;background:#EEF1F4;box-shadow:-5px -5px 10px rgba(255,255,255,.95),5px 5px 10px rgba(26,31,36,.14);display:flex;align-items:center;justify-content:center;}',
    '.spq-done h3{margin:0;font:700 20px/1.35 Pretendard,sans-serif;color:#111;border:0;padding:0;}',
    '.spq-msg{font:400 14px/1.65 Pretendard,sans-serif;color:#4A4F55;word-break:keep-all;}',
    '.spq-msg b{font-weight:600;color:#111;}',
    '.spq-sum{text-align:left;border-radius:14px;background:#E4E7EB;box-shadow:inset 3px 3px 7px rgba(26,31,36,.14),inset -3px -3px 7px rgba(255,255,255,.9);padding:16px 18px;}',
    '.spq-sum p{margin:0 0 8px;font:600 13px/1.4 Pretendard,sans-serif;color:#111;}',
    '.spq-sum table{width:100%;border-collapse:collapse;}',
    '.spq-sum td{padding:6px 0;font:400 13px/1.5 Pretendard,sans-serif;color:#4A4F55;vertical-align:top;border-top:1px solid #D3D8DE;}',
    '.spq-sum tr:first-child td{border-top:0;}',
    '.spq-sum td:first-child{width:76px;font-weight:600;color:#111;}',
    '.spq-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:10px;}',
    '.spq-steps span{text-align:center;padding:7px 4px;border-radius:999px;background:#EEF1F4;font:500 11.5px/1.3 Pretendard,sans-serif;color:#4A4F55;}',
    '.spq-steps span.on{background:#111;color:#fff;}',
    '.spq-hr{height:1px;background:#D3D8DE;margin:0;}',
    '.spq-q{text-align:left;display:flex;flex-direction:column;gap:14px;}',
    '.spq-q .t{margin:0;font:600 15px/1.45 Pretendard,sans-serif;color:#111;}',
    '.spq-q .t span{font-weight:600 !important;color:#111 !important;}',
    '.spq-q .s{margin:-8px 0 0;font:500 12px/1.5 Pretendard,sans-serif;color:#7C828A;}',
    '.spq-kwl{margin:0 0 6px;font:500 12px/1.5 Pretendard,sans-serif;color:#4A4F55;}',
    '.spq-btns{display:flex;gap:12px;}',
    '.spq-btns .spq-b2{flex:0 0 140px;height:51px;}',
    '.spq-btns .spq-b1{flex:1;}',
    '.spq-dnote{display:none;}',
    '#spqD1 > .spq-btns{margin-top:14px;}',   // 181: 선택지(또는 입력칸)와 버튼 사이 28px
    '.spq-done .spq-b1[data-close]{width:auto;padding:0 48px;align-self:center;}',
    /* 167: 희망 일정 달력(뉴모피즘) — 입력란 오른쪽 볼록 달력 버튼, 눌러서 여는 달력 창(선택한 날 = 오목) */
    '.spq-dwrap{position:relative;}',
    '.spq-dwrap .spq-in{padding-right:56px;}',
    '.spq-calbtn{position:absolute;right:6px;top:5px;width:34px;height:34px;border:0;padding:0;border-radius:9px;background:#EEF1F4;box-shadow:-3px -3px 6px rgba(255,255,255,.95),3px 3px 6px rgba(26,31,36,.16);display:flex;align-items:center;justify-content:center;cursor:pointer;color:#111;}',
    '.spq-calbtn[aria-expanded="true"]{background:#E4E7EB;box-shadow:inset 2px 2px 5px rgba(26,31,36,.16),inset -2px -2px 5px rgba(255,255,255,.95);}',
    '.spq-calbtn:focus-visible,.spq-cal button:focus-visible{outline:2px solid #A3AAB3;outline-offset:2px;}',
    '.spq-cal{position:absolute;right:0;top:calc(100% + 12px);z-index:5;width:308px;box-sizing:border-box;padding:18px 18px 16px;border-radius:18px;background:#EEF1F4;box-shadow:-8px -8px 18px rgba(255,255,255,.9),10px 12px 28px rgba(26,31,36,.22);color:#3A3F45;}',
    '.spq-cal[hidden]{display:none;}',
    '.spq-calh{display:flex;align-items:center;justify-content:space-between;margin:0 0 14px;}',
    '.spq-calh b{font:700 15px/1.3 Pretendard,sans-serif;color:#111;}',
    '.spq-calnav{width:32px;height:32px;border:0;padding:0;border-radius:50%;background:#EEF1F4;box-shadow:-3px -3px 6px rgba(255,255,255,.95),3px 3px 6px rgba(26,31,36,.16);display:flex;align-items:center;justify-content:center;cursor:pointer;color:#111;}',
    '.spq-calnav[disabled]{opacity:.35;cursor:default;box-shadow:none;}',
    '.spq-calw,.spq-cald{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;text-align:center;}',
    '.spq-calw{margin:0 0 6px;}',
    '.spq-calw span{font:600 11.5px/24px Pretendard,sans-serif;color:#7C828A;}',
    '.spq-cald button,.spq-cald span{height:34px;border:0;padding:0;border-radius:10px;background:transparent;font:500 13px/34px Pretendard,sans-serif;color:#3A3F45;cursor:pointer;position:relative;}',
    '.spq-cald button:hover{background:#EEF1F4;box-shadow:-3px -3px 6px rgba(255,255,255,.95),3px 3px 6px rgba(26,31,36,.14);color:#111;}',
    '.spq-cald button.sun,.spq-cald button.sat{color:#7C828A;}',
    '.spq-cald button.today:after{content:"";position:absolute;left:50%;bottom:4px;width:4px;height:4px;margin-left:-2px;border-radius:50%;background:#111;}',
    '.spq-cald button.on{background:#E4E7EB;box-shadow:inset 3px 3px 6px rgba(26,31,36,.16),inset -3px -3px 6px rgba(255,255,255,.95);color:#111;font-weight:700;}',
    '.spq-cald button[disabled]{color:#C3C8CE;cursor:default;background:transparent;box-shadow:none;}',
    '.spq-calf{display:flex;gap:8px;margin:14px 0 0;padding:14px 0 0;border-top:1px solid #D3D8DE;}',
    '.spq-calf button{flex:1;height:36px;border:0;border-radius:999px;background:#EEF1F4;box-shadow:-3px -3px 6px rgba(255,255,255,.95),3px 3px 6px rgba(26,31,36,.14);font:600 12.5px/1 Pretendard,sans-serif;color:#111;cursor:pointer;}',
    '.spq-calf button.k{background:#111;color:#fff;box-shadow:3px 3px 8px rgba(26,31,36,.25);}',
    /* 198: 강의 신청 5단계 — 진행 막대(오목 트랙 + 검정 채움), 단계별 섹션, 이전(볼록)·다음(검정) 버튼 */
    '.spq-prog{display:flex;flex-direction:column;gap:10px;}',
    '.spq-prog-t{display:flex;align-items:baseline;justify-content:space-between;gap:12px;margin:0;font:600 13px/1.4 Pretendard,sans-serif;color:#111;}',
    '.spq-prog-t small{font:500 12px/1.4 Pretendard,sans-serif;color:#7C828A;}',
    '.spq-bar{height:8px;border-radius:999px;background:#E4E7EB;box-shadow:inset 2px 2px 4px rgba(26,31,36,.16),inset -2px -2px 4px rgba(255,255,255,.95);overflow:hidden;}',
    '.spq-bar i{display:block;height:100%;border-radius:999px;background:#111;transition:width .3s ease;}',
    '.spq-step{display:flex;flex-direction:column;gap:22px;}',
    '.spq-step[hidden]{display:none;}',
    '.spq-nav{display:flex;gap:12px;}',
    '.spq-nav .spq-b2{flex:0 0 140px;height:51px;}',
    '.spq-nav .spq-b2[hidden],.spq-nav .spq-cta[hidden],#splNote[hidden]{display:none;}',
    '.spq-nav .spq-cta{flex:1;width:auto;}',
    '#spqLec .spq-in::selection{background:#C9CFD6;color:#111;}',
    '#spqLecH:focus{outline:none;}',
    '#spqLec .spq-box{margin:0 0 auto;}',   /* 단계가 바뀌어도 창 위치 고정(위쪽 기준) */
    '@media (min-width:769px){.spq-box{zoom:var(--k,1);}}',
    '@media (max-width:600px){.spq-cal{left:0;right:auto;width:100%;max-width:308px;}.spq-ov{padding:16px 10px;}.spq-bd,.spq-done{padding:22px 18px 24px;}.spq-row,.spq-grid,.spq-chips,.spq-chips.c3{grid-template-columns:1fr;}.spq-btns .spq-b2{flex-basis:110px;}.spq-nav .spq-b2{flex-basis:104px;}}',
    '@media (max-width:600px){#spqLec .spq-chips,#spqLec .spq-chips.c3{grid-template-columns:1fr 1fr;gap:10px;}#spqLec .spq-chip{padding:10px 10px 10px 12px;}#spqLec .spq-ct b,#spqLec .spq-sub{text-wrap:balance;}#spqLec .spq-sub br{display:none;}}',   /* 198: 모바일 강의 신청 선택지 2열(한 단계가 한 화면에) */
    '@media (prefers-reduced-motion:reduce){.spq-ov *{transition:none !important;}}'
  ].join('\n');

  var SRC = [['google', '구글 검색'], ['naver', '네이버 검색'], ['ai', 'AI 추천<br>(챗GPT, 클로드 등)'], ['blog', '블로그 글'], ['referral', '지인·고객사 소개'], ['sns', 'SNS<br>(인스타, 스레드 등)'], ['press', '기사·언론 보도'], ['lecture', '강의·세미나 참석'], ['existing', '이전 거래·재문의'], ['etc', '기타 (직접 입력)']];
  var COURSES = { A: ['A코스', '실속형 · 2시간'], B: ['B코스', '입문형 · 5시간'], C: ['C코스', '심화형 · 8시간'], D: ['D코스', '확장형 · 12시간'], X: ['맞춤 설계', '상담 후 결정'] };
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
    return '<label class="spq-chip' + (checked ? ' on' : '') + '"><input type="' + type + '" name="' + name + '" value="' + esc(value) + '"' + (checked ? ' checked' : '') + '><span class="spq-ind' + (type === 'checkbox' ? ' sq' : '') + '"></span><span class="spq-ct"><b>' + String(label).replace(/([^\s·]+·)/g, '<span style="white-space:nowrap">$1</span>') + '</b>' + (sub ? '<small>' + sub + '</small>' : '') + '</span></label>';
  }
  function field(id, ph, type, extra) { return '<input class="spq-in" id="' + id + '" type="' + (type || 'text') + '" placeholder="' + ph + '"' + (extra || '') + '>'; }
  function lf(id, label, req, ph, type, extra) { return '<div class="spq-f"><label class="spq-l' + (req ? '' : ' opt') + '" for="' + id + '">' + label + (req ? ' <b>*</b>' : '') + '</label>' + field(id, ph, type, extra) + '</div>'; }
  function ctaBlock(id, text) { return '<div class="spq-ctaw"><span class="spq-tip">보통 10분 이내 응답</span><button type="button" class="spq-cta" id="' + id + '">' + text + '</button></div>'; }
  function agree(id) { return '<label class="spq-agree"><input type="checkbox" id="' + id + '" checked><span class="spq-cb" aria-hidden="true"></span>개인정보 수집 및 이용 동의 (필수)</label>'; }

  function build() {
    if (built) return; built = true;
    var st = document.createElement('style'); st.id = 'spq-style'; st.textContent = CSS; document.head.appendChild(st);
    var inq = '<div class="spq-ov" id="spqInq"><div class="spq-box" role="dialog" aria-modal="true" aria-labelledby="spqInqH">' + tbar('문의하기') +
      '<div class="spq-bd"><div class="spq-head"><span class="spq-ico">' + IC_MAIL + '</span><div><h3 class="spq-h" id="spqInqH">UX프로젝트 문의</h3><p class="spq-sub">친절한 실무진이 직접 빠르게 답변 드리겠습니다.</p></div></div>' +
      '<div class="spq-row">' + lf('spqName', '이름', true, '홍길동') + lf('spqCompany', '회사명 (선택)', false, '회사·기관명') + lf('spqEmail', '이메일', true, 'name@company.com', 'email') + lf('spqPhone', '연락처 (선택)', false, '010-0000-0000', 'tel') + '</div>' +
      '<div class="spq-f"><label class="spq-l" for="spqMsg">문의내용 <b>*</b></label><textarea class="spq-in" id="spqMsg" rows="4" placeholder="예: 앱 리뉴얼 전 UX진단 컨설팅, UX교육 상담, 웹/앱 개발 등"></textarea></div>' +
      agree('spqAgree') + ctaBlock('spqSend', '문의 등록하고 빠른 답변 받기') +
      '<div class="spq-or">또는</div><a class="spq-kakao" href="https://open.kakao.com/o/sovRKoMi" target="_blank" rel="noopener noreferrer">' + IC_KAKAO + '카카오톡 실시간 상담하기</a></div></div></div>';
    var types = ['1:1 개인 강의', '기업·기관 출강', '대학·공공기관 특강', '기타'].map(function (t) { return chip('radio', 'splType', t, t, '', t === '기업·기관 출강'); }).join('');
    var courses = Object.keys(COURSES).map(function (k) { return chip('radio', 'splCourse', k, COURSES[k][0], COURSES[k][1], false); }).join('');
    var jobs = ['취업·이직 준비', '주니어 기획자·디자이너', '기업 실무자', 'SI 개발자', '스타트업 대표·예비창업자', '교육 담당자(HRD)', '기타'].map(function (t) { return chip('radio', 'splJob', t, t, '', t === '교육 담당자(HRD)'); }).join('');
    var topics = TOPICS.map(function (t) { return chip('checkbox', 'splTopic', t, t, '', t === '맞춤설계 상담 후 결정'); }).join('');
    var methods = ['오프라인', '온라인(실시간)', '상담 후 결정'].map(function (t) { return chip('radio', 'splMethod', t, t, '', t === '오프라인'); }).join('');
    var lec = '<div class="spq-ov" id="spqLec"><div class="spq-box wide" role="dialog" aria-modal="true" aria-labelledby="spqLecH">' + tbar('강의 신청') +
      '<div class="spq-bd"><div class="spq-head"><span class="spq-ico">' + IC_BOOK + '</span><div><h3 class="spq-h" id="spqLecH" tabindex="-1">맞춤형 UX강의 신청하기</h3><p class="spq-sub">일정과 견적은 상담 후 확정됩니다.<br> 선택하신 내용으로 맞춤 커리큘럼을 안내해 드립니다.</p></div></div>' +
      '<div class="spq-prog"><p class="spq-prog-t"><span id="splStepT" aria-live="polite"></span><small id="splStepN"></small></p><div class="spq-bar" aria-hidden="true"><i id="splBar"></i></div></div>' +
      '<div class="spq-step" data-step="1">' +
      '<div class="spq-sec"><p class="spq-lb">1. 수강 형태 <small>(선택)</small></p><div class="spq-chips">' + types + '</div></div>' +
      '<div class="spq-sec"><p class="spq-lb">2. 코스 선택 <b>*</b> <small>선택하신 코스가 미리 체크됩니다</small></p><div class="spq-chips c3">' + courses + '</div></div></div>' +
      '<div class="spq-step" data-step="2" hidden>' +
      '<div class="spq-sec"><p class="spq-lb">3. 수강생 현재 직업 <small>(선택)</small></p><div class="spq-chips">' + jobs + '</div></div></div>' +
      '<div class="spq-step" data-step="3" hidden>' +
      '<div class="spq-sec"><p class="spq-lb">4. 희망 강의내용 <small>여러 개 선택 가능</small></p><div class="spq-chips c3">' + topics + '</div></div></div>' +
      '<div class="spq-step" data-step="4" hidden>' +
      '<div class="spq-row"><div class="spq-sec"><label class="spq-lb" for="splPeople">5. 예상 인원 <b>*</b></label><select class="spq-in" id="splPeople"><option selected>1명~5명</option><option>5명~10명</option><option>10명~30명</option><option>30명~50명</option><option>50명 이상</option></select></div>' +
      '<div class="spq-sec"><label class="spq-lb" for="splDate">6. 희망 일정 <b>*</b></label><div class="spq-dwrap">' + field('splDate', '예: 11월 중 평일 오후, 11/20(목)', 'text', ' value="상담 후 결정"') +
      '<button type="button" class="spq-calbtn" id="splCalBtn" aria-label="달력에서 희망 날짜 선택" aria-haspopup="dialog" aria-expanded="false" aria-controls="splCal">' + IC_CAL + '</button>' +
      '<div class="spq-cal" id="splCal" role="dialog" aria-label="희망 일정 달력" hidden></div></div></div></div>' +
      '<div class="spq-sec"><p class="spq-lb">7. 진행 방식 <b>*</b></p><div class="spq-chips c3">' + methods + '</div><div id="splPlaceW">' + field('splPlace', '오프라인 장소를 적어 주세요. 예: 서울 강남구 OO빌딩 교육장') + '</div></div></div>' +
      '<div class="spq-step" data-step="5" hidden>' +
      '<div class="spq-sec"><p class="spq-lb">8. 신청자 정보</p><div class="spq-row">' + lf('splName', '이름', true, '홍길동') + lf('splCompany', '회사·학교명 (선택)', false, '회사·기관·학교명') +
      lf('splEmail', '이메일', true, 'name@company.com', 'email') + lf('splPhone', '연락처 (일정 조율용, 선택)', false, '010-0000-0000', 'tel') + '</div>' +
      '<div class="spq-f"><label class="spq-l opt" for="splReq">요청사항 (선택)</label><textarea class="spq-in" id="splReq" rows="3" style="height:96px;" placeholder="수강 목적이나 현재 고민을 적어 주시면 커리큘럼에 반영합니다.&#10;예: 현업 기능정의서 작성법, 포트폴리오 완성"></textarea></div></div>' +
      agree('splAgree') + '</div>' +
      '<div class="spq-nav"><button type="button" class="spq-b2" id="splPrev" hidden>이전</button><button type="button" class="spq-cta" id="splNext">다음</button><button type="button" class="spq-cta" id="splSend" hidden>UX강의 신청 접수하기</button></div>' +
      '<p class="spq-note" id="splNote" hidden>신청하시면 담당자가 일정을 확인하고 연락드립니다.<br>결제는 상담 후 진행됩니다.</p></div></div></div>';
    var opts = SRC.map(function (o) { return '<label class="spq-opt"><input type="checkbox" value="' + o[0] + '"><span class="spq-ind sq"></span><span>' + o[1].replace('<br>', ' ').replace('인스타,', '인스타그램,') + '</span></label>'; }).join('');
    var done = '<div class="spq-ov" id="spqDone"><div class="spq-box" role="dialog" aria-modal="true" aria-labelledby="spqD1H">' + tbar('문의 접수 완료', 'spqDoneTb') +
      '<div class="spq-done" id="spqD1">' + ENV + '<h3 id="spqD1H"></h3><div class="spq-msg" id="spqD1M"></div><div id="spqSum"></div>' +
      '<div class="spq-hr"></div><div class="spq-q"><p class="t" id="spqQt"></p><p class="s" id="spqQs"></p><div class="spq-grid">' + opts + '</div>' +
      '<div id="spqEtcW" style="display:none;"><input type="text" class="spq-in" id="spqEtc" maxlength="200" placeholder="어떻게 알게 되셨는지 자유롭게 적어 주세요"></div>' +
      '<div id="spqKwW" style="display:none;"><p class="spq-kwl">검색어나 AI에 질문하신 내용이 기억나시면 적어 주세요 (선택)</p><input type="text" class="spq-in" id="spqKw" maxlength="200" placeholder="예: UX리서치, UX라이팅, UX디자인 등"></div></div>' +
      '<div class="spq-btns"><button type="button" class="spq-b2" id="spqSkip">건너뛰기</button><button type="button" class="spq-b1" id="spqSrcSend">답변 보내기</button></div><div class="spq-dnote" id="spqDn"></div></div>' +
      '<div class="spq-done" id="spqD2" style="display:none;">' + ENV + '<h3 id="spqD2H"></h3><div class="spq-msg" id="spqD2M"></div><button type="button" class="spq-b1" data-close>확인</button></div>' +
      '</div></div>';
    var wrap = document.createElement('div'); wrap.innerHTML = inq + lec + done; while (wrap.firstChild) document.body.appendChild(wrap.firstChild);

    ['spqInq', 'spqLec', 'spqDone'].forEach(function (id) {
      var ov = $(id);
      ov.addEventListener('click', function (e) { if (e.target === ov || (e.target.closest && e.target.closest('[data-close]'))) close(id); });
    });
    calInit();
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && calOpen()) { calClose(true); return; } if (e.key === 'Escape') { ['spqDone', 'spqLec', 'spqInq'].some(function (id) { if ($(id).classList.contains('open')) { close(id); return true; } }); } });
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
    $('splNext').addEventListener('click', function () { if (stepOk(step)) goStep(step + 1); });
    $('splPrev').addEventListener('click', function () { goStep(step - 1); });
    $('spqSrcSend').addEventListener('click', sendSource);
    $('spqSkip').addEventListener('click', function () { showD2(); });
  }

  /* 167: 희망 일정 달력 — 오늘 이후 날짜 선택, 고르면 '2026년 12월 3일(목)' 형식으로 입력란에 들어감(직접 입력도 그대로 가능) */
  var WD = ['일', '월', '화', '수', '목', '금', '토'];
  var calSel = null, calView = null;
  function ymd(d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
  function calOpen() { var c = $('splCal'); return !!(c && !c.hidden); }
  function calRender() {
    var c = $('splCal'), t = ymd(new Date()), y = calView.getFullYear(), m = calView.getMonth();
    var first = new Date(y, m, 1).getDay(), days = new Date(y, m + 1, 0).getDate();
    var atMin = y === t.getFullYear() && m === t.getMonth();
    var h = '<div class="spq-calh"><button type="button" class="spq-calnav" data-cal="-1" aria-label="이전 달"' + (atMin ? ' disabled' : '') + '>' + ARR_L + '</button><b aria-live="polite">' + y + '년 ' + (m + 1) + '월</b><button type="button" class="spq-calnav" data-cal="1" aria-label="다음 달">' + ARR_R + '</button></div>';
    h += '<div class="spq-calw" aria-hidden="true">' + WD.map(function (w) { return '<span>' + w + '</span>'; }).join('') + '</div><div class="spq-cald">';
    for (var i = 0; i < first; i++) h += '<span aria-hidden="true"></span>';
    for (var d = 1; d <= days; d++) {
      var dt = new Date(y, m, d), wd = dt.getDay(), past = dt < t;
      var on = calSel && +calSel === +dt, cls = (wd === 0 ? 'sun' : wd === 6 ? 'sat' : '') + (+dt === +t ? ' today' : '') + (on ? ' on' : '');
      h += '<button type="button" data-d="' + d + '" class="' + cls.trim() + '" aria-label="' + (m + 1) + '월 ' + d + '일 ' + WD[wd] + '요일' + (+dt === +t ? ' (오늘)' : '') + '"' + (on ? ' aria-pressed="true"' : '') + (past ? ' disabled' : '') + '>' + d + '</button>';
    }
    h += '</div><div class="spq-calf"><button type="button" data-cal="tbd">상담 후 결정</button><button type="button" class="k" data-cal="close">닫기</button></div>';
    c.innerHTML = h;
  }
  function calShow() {
    var t = ymd(new Date());
    calView = new Date((calSel || t).getFullYear(), (calSel || t).getMonth(), 1);
    calRender(); $('splCal').hidden = false; $('splCalBtn').setAttribute('aria-expanded', 'true');
    var f = $('splCal').querySelector('.spq-cald button.on') || $('splCal').querySelector('.spq-cald button.today') || $('splCal').querySelector('.spq-cald button:not([disabled])');
    try { if (f) f.focus({ preventScroll: true }); } catch (e) {}
  }
  function calClose(focusBtn) { var c = $('splCal'); if (!c || c.hidden) return; c.hidden = true; $('splCalBtn').setAttribute('aria-expanded', 'false'); if (focusBtn) try { $('splCalBtn').focus({ preventScroll: true }); } catch (e) {} }
  function calInit() {
    var btn = $('splCalBtn'), c = $('splCal'), inp = $('splDate');
    btn.addEventListener('click', function (e) { e.stopPropagation(); if (calOpen()) calClose(); else calShow(); });
    c.addEventListener('click', function (e) {
      e.stopPropagation();
      var b = e.target.closest ? e.target.closest('button') : null; if (!b || b.disabled) return;
      var a = b.getAttribute('data-cal');
      if (a === '-1' || a === '1') { calView = new Date(calView.getFullYear(), calView.getMonth() + (+a), 1); calRender(); var nb = c.querySelector('[data-cal="' + a + '"]'); try { (nb && !nb.disabled ? nb : c.querySelector('[data-cal="1"]')).focus({ preventScroll: true }); } catch (x) {} return; }
      if (a === 'tbd') { calSel = null; inp.value = '상담 후 결정'; calClose(true); return; }
      if (a === 'close') { calClose(true); return; }
      var d = b.getAttribute('data-d');
      if (d) { calSel = new Date(calView.getFullYear(), calView.getMonth(), +d); inp.value = calSel.getFullYear() + '년 ' + (calSel.getMonth() + 1) + '월 ' + calSel.getDate() + '일(' + WD[calSel.getDay()] + ')'; calClose(true); }
    });
    c.addEventListener('keydown', function (e) {
      var b = document.activeElement; if (!b || !b.getAttribute || !b.getAttribute('data-d')) return;
      var k = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key]; if (!k) return;
      e.preventDefault();
      var all = Array.prototype.slice.call(c.querySelectorAll('.spq-cald button:not([disabled])')), i = all.indexOf(b) + k;
      if (all[i]) all[i].focus();
    });
    document.getElementById('spqLec').addEventListener('click', function (e) { if (calOpen() && !(e.target.closest && e.target.closest('.spq-dwrap'))) calClose(); });
    inp.addEventListener('input', function () { calSel = null; });
  }

  /* 198: 강의 신청 5단계 */
  var STEPS = ['수강 형태·코스 선택', '수강생 현재 직업', '희망 강의내용', '인원·일정·진행 방식', '신청자 정보'];
  var step = 1;
  function goStep(n) {
    n = Math.max(1, Math.min(5, n)); step = n; calClose();
    document.querySelectorAll('#spqLec .spq-step').forEach(function (s) { s.hidden = +s.getAttribute('data-step') !== n; });
    $('splStepT').textContent = n + '단계 · ' + STEPS[n - 1];
    $('splStepN').textContent = n + ' / 5';
    $('splBar').style.width = (n * 20) + '%';
    $('splPrev').hidden = n === 1; $('splNext').hidden = n === 5; $('splSend').hidden = n !== 5; $('splNote').hidden = n !== 5;
    var ov = $('spqLec'); if (ov) ov.scrollTop = 0;
    try { $('spqLecH').focus({ preventScroll: true }); } catch (e) {}
  }
  function stepOk(n) {
    var miss = [], first = null;
    if (n === 1 && !val('splCourse')) miss.push('· 코스');
    if (n === 4) {
      if (!$('splDate').value.trim()) { miss.push('· 희망 일정'); first = 'splDate'; }
      if (!val('splMethod')) miss.push('· 진행 방식');
    }
    if (miss.length) { alert('아래 필수 항목을 선택해 주세요.\n\n' + miss.join('\n')); if (first) { try { $(first).focus(); } catch (e) {} } return false; }
    return true;
  }
  function open(id) { $(id).classList.add('open'); document.body.style.overflow = 'hidden'; }
  function close(id) {
    if (id === 'spqLec') calClose();
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
    var k = COURSES[courseKey] ? courseKey : 'A';
    var r = document.querySelector('#spqLec input[name="splCourse"][value="' + k + '"]');
    if (r) { r.checked = true; r.dispatchEvent(new Event('change')); }
    open('spqLec');
    goStep(1);   // 198: 항상 1단계부터(희망 일정 자동 포커스·전체 선택 제거 = 검정 선택 표시 오류 수정)
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
    var miss = [], first = null;
    [[!courseK, '코스'], [!date, '희망 일정', 'splDate'], [!method, '진행 방식'], [!name, '이름', 'splName'], [!email, '이메일', 'splEmail']].forEach(function (m) { if (m[0]) { miss.push('· ' + m[1]); if (!first && m[2]) first = m[2]; } });
    if (miss.length) { alert('아래 필수 항목을 입력해 주세요.\n\n' + miss.join('\n')); if (!courseK) goStep(1); else if (!date || !method) goStep(4); if (first) { try { $(first).focus(); } catch (e) {} } return; }
    if (needEmail($('splEmail'))) return;
    var course = COURSES[courseK][0] + ' · ' + COURSES[courseK][1];
    var methodTxt = method + (method === '오프라인' && place ? ' · ' + place : '');
    var lines = ['[코스] ' + course, '[수강 형태] ' + (type || '-'), '[현재 직업] ' + (job || '-'), '[희망 강의내용] ' + (topics.join(', ') || '-'), '[예상 인원] ' + people, '[희망 일정] ' + date, '[진행 방식] ' + methodTxt, '[요청사항] ' + (req || '-'), '[신청 페이지] ' + location.pathname];
    var btn = $('splSend'); btn.disabled = true; btn.textContent = '전송 중...';
    post({ name: name, phone: phone, company: company, email: email, message: lines.join('\n'), course: course, lecture_type: type, job: job, topics: topics.join(', '), people: people, schedule: date, method: methodTxt, form_page: location.pathname,
      _subject: '[슈퍼플래닝 강의 신청] ' + name + ' - ' + COURSES[courseK][0] + '·' + (type || '수강 형태 미선택'), _template: 'table', _captcha: 'false' }).then(function () {
      dl({ event: 'inquiry_submit', form_page: location.pathname, form_type: 'lecture' });
      btn.disabled = false; btn.textContent = 'UX강의 신청 접수하기';
      var sum = [['코스', course], ['수강 형태', type ? type + ' · ' + people : people], ['희망 일정', date], ['진행 방식', methodTxt]];
      ['splPlace', 'splName', 'splCompany', 'splEmail', 'splPhone', 'splReq'].forEach(function (id) { $(id).value = ''; }); $('splDate').value = '상담 후 결정'; calSel = null;
      close('spqLec'); goStep(1); showDone('lecture', name, email, sum);
    });
  }

  function showDone(mode, name, email, sum) {
    last = { name: name || '방문자', email: email, mode: mode };
    var N = '<b>' + esc(last.name) + '</b>';
    var L = mode === 'lecture';
    $('spqDoneTb').textContent = L ? '강의 신청 완료' : '문의 접수 완료';
    $('spqD1H').textContent = L ? '강의 신청이 접수되었습니다' : '문의가 정상 접수되었습니다';
    $('spqD1M').innerHTML = L ? N + '님, 신청해 주셔서 감사합니다.<br>담당자가 일정과 커리큘럼을 확인한 뒤<br>빠르게 연락드리겠습니다. (보통 10분 이내 회신)'
      : N + '님, 문의해 주셔서 감사합니다.<br>담당 실무진이 내용을 확인한 뒤 빠르게 연락드리겠습니다.<br>(보통 10분 이내 회신)';
    $('spqSum').innerHTML = L && sum ? '<div class="spq-sum"><p>신청 내용 확인</p><table>' + sum.map(function (r) { return '<tr><td>' + r[0] + '</td><td>' + esc(r[1]) + '</td></tr>'; }).join('') + '</table><div class="spq-steps"><span class="on">① 신청 접수</span><span>② 담당자 연락</span><span>③ 커리큘럼·견적 확정</span></div></div>' : '';
    $('spqQt').innerHTML = (L ? '슈퍼플래닝 강의를 어떻게 알게 되셨나요?' : '슈퍼플래닝을 어떻게 알게 되셨나요?') + ' (선택)';
    $('spqQs').textContent = (L ? '더 나은 강의 안내에 참고하겠습니다.' : '더 정확한 상담 준비에 참고하겠습니다.') + ' 여러 개 선택할 수 있습니다.';
    $('spqDn').textContent = L ? '답변하지 않으셔도 강의 신청은 정상 접수되었습니다.' : '답변하지 않으셔도 문의는 정상 접수되었습니다.';
    document.querySelectorAll('#spqDone .spq-opt input').forEach(function (c) { c.checked = false; c.parentNode.classList.remove('on'); });
    $('spqEtc').value = ''; $('spqKw').value = ''; $('spqEtcW').style.display = 'none'; $('spqKwW').style.display = 'none';
    $('spqD1').style.display = 'flex'; $('spqD2').style.display = 'none';
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
    var L = last.mode === 'lecture', N = '<b>' + esc(last.name) + '</b>';
    if (L) { $('spqD2H').textContent = '강의 신청이 완료되었습니다'; $('spqD2M').innerHTML = N + '님, 신청해 주셔서 감사합니다.<br>담당자가 일정과 커리큘럼을 확인한 뒤<br>빠르게 연락드리겠습니다.<br>(보통 10분 이내 회신)'; }
    else { $('spqD2H').textContent = '문의 접수가 완료되었습니다'; $('spqD2M').innerHTML = N + '님, 문의해 주셔서 감사합니다.<br>담당 실무진이 내용을 확인한 뒤<br>빠르게 연락드리겠습니다.<br>(보통 10분 이내 회신)'; }
    $('spqD1').style.display = 'none'; $('spqD2').style.display = 'flex';
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
    else { $('spqD2H').textContent = '소중한 답변 감사합니다'; $('spqD2M').innerHTML = '<b>' + esc(last.name) + '</b>님의 문의 내용을 확인한 뒤<br>담당 실무진이 빠르게 연락드리겠습니다.<br>(보통 10분 이내 회신)'; $('spqD1').style.display = 'none'; $('spqD2').style.display = 'flex'; }
  }
})();
