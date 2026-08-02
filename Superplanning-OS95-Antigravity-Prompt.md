# [Antigravity용 초정밀 프롬프트] Superplanning OS95 — Windows 95 데스크톱 포트폴리오 1:1 재구현

> **사용 대상**: Google Antigravity (agent-first IDE, Repo / Artifacts / Browser / Editor 워크플로)
> **목표**: 슈퍼플래닝 UX 에이전시 포트폴리오 사이트를 Windows 95 데스크톱 인터페이스로 패키징한 SPA를, 아래 사양을 그대로 1:1로 재구현
> **언어**: 한국어 UI 기본 (`ko` 로케일), 영문(`en`) 보조 i18n 지원
> **로고**: base64 PNG 임베드(외부 의존 0개)

---

## 0. 사용자가 Antigravity 에이전트에 던지는 첫 메시지 (그대로 복사해 붙여넣기)

```
너는 Antigravity의 풀스택 디자이너-엔지니어다. 아래 명세를 토대로 "Superplanning OS95" 라는
단일 HTML 포트폴리오 SPA를 implementation/ 디렉토리에 만들어라. 외부 CDN 의존은 Pretendard 웹폰트
한 개뿐이며 나머지 모든 그래픽/사운드/이미지는 base64 + Web Audio로 인라인 처리한다.
브라우저 자동화(Playwright)로 1280px 데스크톱 / 980px 모바일 두 시나리오에서 캡처 검증까지
마치고, 두 캡처가 의도와 다르면 다음 액션을 스스로 결정해서 보정하라. 끝나면 마지막에
사용자가 보고를 가볍게 검토할 수 있도록 (1) 핵심 동작 체크리스트 self-test 결과
(2) 1366×800 데스크톱 캡처 URL (3) 390×844 모바일 캡처 URL 을 보고한다.
```

---

## 1. 프로젝트 컨텍스트

| 항목 | 값 |
|---|---|
| 클라이언트 | 슈퍼플래닝 UX 에이전시 (한국, UX라이팅 톤) |
| 컨셉 | Windows 95 데스크톱 OS 인터페이스를 웹 경험으로 패키징 (less but better) |
| 결과물 형태 | 단일 HTML 1개, 인라인 CSS + JS, 베이스64 로고 1개, 외부 폰트 1개만 허용 |
| 제외 | 디자인 시스템, 라우터, 백엔드, 실시간 통신, 사용자 인증, DB |
| 허용 외부 자원 | `https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css` 1건 |
| 비목표 | 키보드 풀 네비게이션(W95 키보드 모델 완전 복제는 범위 외), 다중 가상 데스크톱, 실제 오디오 PCM 샘플 |

---

## 2. 결과 파일 트리 (단일이지만 디렉토리 구조 명시)

```
implementation/
├── index.html          # 단일 사파이어 결과물. 인라인 <style> + <script>. 91KB 목표.
├── thumbnails.png      # 포트폴리오 6장 베이스64 묶음 또는 단일 PNG base64 → HTML에 직접 임베드
└── README.md           # 에이전트가 QA-한 self-test 결과 + 캡처 URL 기록
```

---

## 3. 디자인 토큰 (CSS 변수 그대로 사용)

```css
:root {
  --bg:#008080;            /* 라이트 테일 베이스. 윈도우95 화면 풀 배경 */
  --gnb-bg:rgba(0,0,0,.55); /* 상단 가로바 반투명 검정 */
  --gnb-fg:#f5f5f5;
  --gnb-bd:rgba(255,255,255,.18);
  --win-fg:#1a1a1a;
  --win-bg:#c0c0c0;        /* 윈도우 외곽 회색. 클래식 그레이 */
  --win-fg-dark:#0a0a0a;   /* 윈도우 타이틀바 텍스트 */
  --bg-light:#008080;
  --bg-dark:#1a1a1a;
  --bg-matrix:#0a0e0a;
  --txt-light:#1a1a1a;
  --txt-dark:#e8e8e8;
  --txt-matrix:#a0ffa0;
  --bevel-hi:#ffffff;      /* Win95 베벨 하이(좌상단) */
  --bevel-lo:#7b7b7b;
  --bevel-shadow:#3b3b3b;
  --accent:#ffd43b;        /* 타이틀바 노랑 */
  --accent2:#3aa6ff;
  --danger:#c0392b;
  --ok:#2c8a4a;
  --taskbar:#c0c0c0;
  --taskbar-h:36px;
  --gnb-h:34px;
  --logo-top:14px;
  --logo-left:14px;
  --logo-w:64px;
  --desktop-pad-top:118px;
  --font-mono:'IBM Plex Mono','Courier New',monospace;
  --font:'Pretendard','IBM Plex Mono',-apple-system,system-ui,sans-serif;
}
@media (max-width:980px){
  :root{ --logo-w:48px; --desktop-pad-top:96px; }
}
```

| 토큰 그룹 | 값 / 의도 |
|---|---|
| Base 폰트 | Pretendard → IBM Plex Mono → system-ui fallback. 본문 11~13px |
| Mono 폰트 | IBM Plex Mono → Courier New fallback. 부팅, BSOD, 시계 |
| letter-spacing | 본문 `-0.01em` (UX 라이팅은 letter-spacing 음수로 답답함 제거) |
| 색 의도 | 라이트 테일 베이스는 1995 MS Paint 윈도우 기본. 다크/매트릭스는 옵션 |

---

## 4. 베벨/박스섀도우 규칙 (Win95 클래식 그대로)

모든 돌출 요소(윈도우, 버튼, 태스크바, GNB 카드, 입력)는 다음 베벨을 따른다:

| 상태 | box-shadow |
|---|---|
| Raised (기본) | `inset 1px 1px 0 var(--bevel-hi), inset -1px -1px 0 var(--bevel-shadow), 2px 2px 0 rgba(0,0,0,.35)` |
| Pressed/Active | `inset 1px 1px 0 var(--bevel-shadow)` |
| Sunken (입력 필드) | `inset 1px 1px 0 var(--bevel-shadow)` |
| 외곽선 | `border: 2px solid #000` (모든 돌출 박스) |

요구: GNB, 윈도우, 버튼, 셀렉트, 태스크바, 입력 필드까지 **모든** Z축 박스는 위 Raised 베벨을 1:1 적용. Active 시 box-shadow만 Inset로 바뀌고 외곽선 유지.

---

## 5. Z-인덱스 스택 (절대 규칙)

| 레이어 | z-index | 요소 |
|---|---|---|
| BSOD | 9999 | `#bsod` 이스터에그 풀스크린 |
| Boot | 10000 | `#boot` 부팅 화면 (BSOD보다 위) |
| Brand Logo | 1500 | 좌측 최상단 fixed 64×64, 클릭 시 새로고침 |
| GNB | 1400 | 상단 가로바 fixed |
| Welcome 다이얼로그 mask | 1300 | `#welcomeDlg` 모달 마스크 |
| Start Menu | 1100 | `#startMenu` 시작 메뉴 |
| Taskbar | 900 | 하단 고정 바 |
| Window 기본 | 200 | `.win` 기본값. 단, `zIndexSeed` 250부터 시작 |
| Contact Skyscraper | 100 | 우측 fixed 슬림 박스 |

윈도우가 포커스될 때마다 `zIndexSeed` 단조 증가. **항상 가장 큰 z가 위에 옴**. 동점 없음.

---

## 6. 타이포그래피

| 사용처 | 폰트/사이즈/굵기 |
|---|---|
| 윈도우 타이틀바 | Pretendard 12px / 700 / 검정 글자 (노란 배경) |
| 윈도우 본문 | Pretendard 12px / 400 / line-height 1.55 |
| 메뉴/버튼 | Pretendard 11~12px / 700 |
| 부팅/BSOD/시계 | IBM Plex Mono 13px |
| 데스크톱 아이콘 라벨 | Pretendard 11px / white + text-shadow 1px 1px 0 #000 |
| GNB 라벨 | Pretendard 12px / 500 |

---

## 7. 레이아웃 (px 단위 그대로)

| 영역 | 좌표 / 크기 |
|---|---|
| Brand logo | top 14, left 14, 64×64 (모바일 48) |
| GNB | top calc(14+64+12), left 14, right 14, height 34 |
| Desktop padding-top | 118 (모바일 96) — 콘텐츠가 GNB/로고에 안 가리도록 |
| Contact Skyscraper | width 300px, top calc(14+64+34+36), right 14, bottom calc(36+14) |
| Taskbar | bottom 0, left 0, right 0, height 36 |
| Welcome modal | max-width 480, 폭 90%, 중앙 |
| Window 초기 좌측 오프셋 | `50 + winSeq*24` px |
| Window 초기 상단 오프셋 | `160 + winSeq*24` px |

---

## 8. 윈도우 11개 정의 (W95 클래스 그대로)

| Key | width × height | title (Ko) | 비고 |
|---|---|---|---|
| welcome | 480×280 | 초기 안내 | 단순 안내 |
| services | 720×520 | UX서비스 안내 | 9개 서비스 카드 그리드 (auto-fill min 180) |
| portfolio | 760×520 | 포트폴리오 | 6개 썸네일 (단색 placeholder OK) |
| classes | 640×420 | AI-UX강의 안내 | 본문 + 대상 + CTA |
| blog | 600×420 | UX블로그 | 4개 드래프트 리스트 |
| contact | 540×360 | 프로젝트 문의 | hero 텍스트 |
| about | 620×440 | 회사소개 | 3가지 방침 |
| now-playing | 460×220 | 지금 듣는 곡 | 이퀄라이저 애니메이션 |
| links | 560×380 | 바로가기 모음 | 3 카테고리 그리드 |
| tweaks | 480×320 | 환경 설정 | 테마/사운드/밀도 + 이스터에그 버튼 |
| shut | 380×200 | 시스템 종료 | 확인 다이얼로그 |

윈도우 구조(HTML, 매번 같은 모양):
```html
<div class="win" style="width:480px; min-height:280px; left:...; top:...; z-index:..;">
  <div class="w-title">
    <span class="t-text" data-i18n="w.welcome">초기 안내</span>
    <div class="t-actions">
      <button class="t-min title="최소화">_</button>
      <button class="t-max title="최대화">▢</button>
      <button class="t-close title="닫기">✕</button>
    </div>
  </div>
  <div class="w-body">...</div>
</div>
```

각 윈도우 닫힘 시 `windows[key]` map에서 제거 + 태스크바 preview 제거. 최소화 시 `display:none`, 태스크바에서 preview 클릭 시 복귀.

---

## 9. 인터랙션 상태 머신 (오퍼레이션별)

### 9.1 Window Drag
```js
function makeDraggable(el){
  const head = el.querySelector('.w-title');
  let sx=0, sy=0, ox=0, oy=0, dragging=false;
  head.addEventListener('mousedown', e=>{
    if(e.target.tagName==='BUTTON') return;
    dragging=true; sx=e.clientX; sy=e.clientY;
    const r = el.getBoundingClientRect(); ox=r.left; oy=r.top;
    el.style.zIndex = ++zIndexSeed;
    document.body.style.userSelect='none';
  });
  document.addEventListener('mousemove', e=>{
    if(!dragging) return;
    let nx = ox + (e.clientX-sx);
    let ny = oy + (e.clientY-sy);
    nx = Math.max(0, Math.min(window.innerWidth-60, nx));
    ny = Math.max(0, Math.min(window.innerHeight-40, ny));
    el.style.left = nx+'px'; el.style.top = ny+'px';
  });
  document.addEventListener('mouseup', ()=>{ dragging=false; document.body.style.userSelect=''; });
}
```

에이전트 요구: 헤더 버튼 클릭은 드래그 시작 금지(`e.target.tagName==='BUTTON'` 가드). 경계 클램프는 좌우 0~viewport-60, 상하 0~viewport-40.

### 9.2 Focus / Z-Index Manager
- 윈도우 `mousedown` 발생 시 `el.style.zIndex = ++zIndexSeed`
- 동일 시점에서 다른 모든 윈도우의 태스크바 preview는 `.active` 토글 해제
- 새 윈도우 open 시 z-index 한 번 +1하여 활성 보장

```js
el.addEventListener('mousedown', ()=>{
  el.style.zIndex = ++zIndexSeed;
  updatePreview(key, true);
  for(const k in windows) if(k!==key) updatePreview(k, false);
});
```

### 9.3 Minimize / Maximize / Close

| 액션 | 동작 |
|---|---|
| Minimize | `display:none` + `minimized=true` + 태스크바에서 preview 제거 |
| Maximize | `.maximized` 클래스 토글. CSS: `position:fixed; inset:calc(logo+gnb+18) 14 calc(taskbar+14) 14` |
| Close | DOM에서 제거 + `windows[key]` 삭제 + preview 제거 |
| Toggle (재오픈) | `.el.style.display='flex'` + z-index 올림 |

### 9.4 Window Open (중복 방지)
같은 `key`로 두 번 호출되면 새 DOM 생성 대신 기존 윈도우를 표시·z-index 올림·preview 활성화.

### 9.5 Boot → Welcome 시퀀스
`#boot` 화면에 60ms 간격으로 `'▓▓▓▓...'` 글자 fill (36자) → 완료 후 `#boot` 숨김 → 400ms 뒤 `#welcomeDlg` 모달 표시.

### 9.6 Start menu Toggle
시작 버튼 클릭 → 모달 표시. 외부 영역 클릭 또는 메뉴 항목 클릭 시 자동 닫힘.

### 9.7 Brand Logo 클릭
`location.reload()`. 단, 그 직전 `blip(880, 0.07)` 한 번.

### 9.8 테마 / 사운드 / 밀도 변경
Tweaks 패널 또는 태스크바의 Tweaks pill로 접근. 변경 즉시 `body[data-theme=...]` 적용 및 `localStorage`에 저장. 

### 9.9 BSOD 이스터에그
키 시퀀스 `Ctrl+Alt+U` (한/영 무관) → `#bsod.show` 추가 + `blip(110, 0.4, 'sawtooth')`. ESC 키 → BSOD 해제.

---

## 10. 사운드 (Web Audio 블립)

```js
function blip(freq=440, dur=0.06, type='square'){
  if(!soundOn) return;
  const a = audioCtx||new (window.AudioContext||window.webkitAudioContext)();
  const o = a.createOscillator(); const g = a.createGain();
  o.type=type; o.frequency.value=freq;
  g.gain.value=0.04; o.connect(g); g.connect(a.destination);
  o.start(); o.stop(a.currentTime+dur);
}
```

| 이벤트 | freq / dur / type |
|---|---|
| 아이콘 클릭 | 660 / 0.04 |
| 아이콘 더블클릭(열기) | 880 / 0.05 |
| 윈도우 open | 660 / 0.06 |
| 윈도우 close | 220 / 0.07 |
| Minimize | 440 / 0.05 |
| Maximize | 700 / 0.05 |
| Preview 클릭 | 660 / 0.05 |
| Send | 880 / 0.08 |
| Logo 클릭 | 880 / 0.07 |
| BSOD | 110 / 0.4 / sawtooth |

사운드 토글이 OFF일 때 모든 blip 무시.

---

## 11. i18n (한국어 기본)

키 약 140개. 두 객체 상수 `STRINGS = { ko: {...}, en: {...} }` 정의. 모든 동적 텍스트는 `data-i18n="key"` 속성 보유, `applyI18n()` 호출 시 `[data-i18n] *` 요소의 `textContent`를 `STRINGS[lang][key]`로 갱신. 언어 변경 시 모든 open 윈도우의 `.w-body`를 재렌더링(`refreshAllWindowBodies()`).

요구 핵심 카피(스타일 가이드 — 평서체, "less but better" 톤):

| 화면명 | ko 카피 |
|---|---|
| Welcome 헤드 | 환영합니다, 슈퍼플래닝 UX스튜디오입니다 |
| Welcome 본문 | 복잡한 화면을 덜어내고, 진짜 필요한 것만 남깁니다. |
| About lead | UX 에이전시, 슈퍼플래닝입니다. |
| About body | 디자인을 잘한다는 건 화면을 화려하게 만드는 일이 아닙니다. 한 번에 한 걸음, 사용자가 자기 일을 끝까지 마치게 돕는 일입니다. |
| Services name (s1) | UX 리서치 / description: 사용자가 진짜 원하는 말을 듣습니다. 화면 이전의 화면을 먼저 그립니다. |
| Services name (s2) | UX 라이팅 / description: 고객이 쓰는 언어 그대로 화면 안에 넣습니다. 짧고 분명한 문장, 단호한 버튼. |
| Services name (s4) | UI 디자인 / description: less but better. 픽셀 단위로 절제된 인터페이스를 디자인합니다. |
| Sky hero | 한 줄만 남겨 주셔도 시작할 수 있습니다. |
| Sky hint | 응답 보통 1–3일 안에. 급하시면 hello@superplanning.kr 로 직접 주셔도 좋습니다. |

전체 i18n 문자열 사전은 첨부된 `index.html` 본문에서 그대로 옮긴다. 길이는 약 140개 키. 모두 직접 카피하자.

---

## 12. 데스크톱 아이콘 9개 (bout 완전 삭제)

bout, About 아이콘 라벨 'i' 잘림 일절 금지. ko 기준 라벨:

| Key | ko 라벨 (ko/en 모두 정의) |
|---|---|
| welcome | 초기 안내 / Welcome |
| services | UX서비스 / Services |
| portfolio | 포트폴리오 / Portfolio |
| classes | AI-UX강의 / Classes |
| blog | UX블로그 / Blog |
| contact | 프로젝트 문의 / Contact |
| about | 회사소개 / About (단, ko는 '회사소개'로 사용, en은 'About') |
| np | 지금 듣는 곡 / Now playing |
| links | 바로가기 / Links |

`dblclick` 으로만 윈도우 열림. `click`은 사운드만 울림. GNB와 시작 메뉴에서 동일한 키로 호출 가능.

---

## 13. 4개 핵심 UX라이팅 톤 규칙 (에이전트 절대 준수)

1. **less but better**: 군더더기 없음. 불필요한 형용사·수식 금지.
2. **명사 종결체/평서체**: '합니다/입니다' 톤 회피. 자연스러운 단답 서술.
3. **고객이 쓰는 언어**: 전문 용어(Funnel, IA, KPI) 대신 일상 어휘.
4. **한 흐름으로**: 리서치 → 디자인 → 운영을 끊지 않는다는 메시지 일관성.

---

## 14. 시작 시퀀스 (픽셀 일치)

```
Boot (0~2.4초) → Welcome 모달 (사용자가 '시작하기' 클릭) → 회사소개 창 자동 오픈
```

---

## 15. 모바일 응답형

| 브레이크포인트 | 변경 |
|---|---|
| 980px | 로고 48×48, desktop padding-top 96, GNB 라벨 숨김(아이콘만), contact가 bottom sheet(좌우 14, 하단 테스크바 위 14, max-height 50vh) |
| 560px | Tweaks 2열→1열, Links 2열→1열, 스카이스크래퍼 bottom sheet |

---

## 16. 자가 검증 (Playwright 기반, 에이전트 무조건 마지막에 실행)

다음 시나리오를 자동화해서 PASS를 보고할 것. 실패 시 다음 액션을 스스로 결정해 보정.

1. **Desktop 1366×800**: Boot → Welcome → 버튼 클릭 → 회사소개 창 자동 오픈. z-index 1500의 로고가 모든 창 위에 떠 있는지 캡처.
2. **Desktop 인터랙션**: 윈도우 3개 동시 오픈 후 각각 드래그. 마지막 드래그한 윈도우가 항상 z-최상위인지 확인.
3. **테마 전환**: Tweaks → '매트릭스' 선택 시 body[data-theme=matrix] 적용, 캡처.
4. **모바일 390×844**: contact가 bottom sheet 형태로 정상화됐는지, GNB 라벨 숨김 처리됐는지 캡처.
5. **BSOD**: `Ctrl+Alt+U` 디스패치 후 BSOD 표시. ESC 후 해제.
6. **bout 라벨 0회 검출**: `document.querySelectorAll('*')` 전체에서 regex `/bout/` 일치 노드 없음. 0건이어야 PASS.

---

## 17. 산출물 보고 형식 (Antigravity → 사용자 마지막 메시지)

```
✅ superplanning-os95/ 빌드 완료 (index.html, 약 91KB)
🔍 self-test 결과: 6/6 PASS — [붙여넣기 캡처 URL들]
🖼 데스크톱 1366×800: [URL]
📱 모바일 390×844: [URL]
🎨 적용된 테마 토큰: light(기본), dark, matrix
📦 외부 의존: Pretendard 웹폰트 단 1건
✅ bout 라벨 0건 검출 (한/영 양쪽)
```

---

## 18. 에이전트가 절대 어기지 말 것

- bout 라벨 일절 생성/복원 금지 (ko/en 양쪽)
- 외부 폰트는 Pretendard 한 개만 허용 (IBM Plex Mono는 시스템 fallback으로 충분)
- 외부 이미지 호스팅 일절 금지. 로고/썸네일은 모두 base64 인라인
- 신설 윈도우 추가 시 위 9.1~9.4 상태 머신을 그대로 준수
- 사운드는 Web Audio로 인라인. PCM 파일 외부 호스팅 금지
- 라우팅/백엔드 금지. 단일 HTML + 단일 JS 블록

---

## 끝. 이 명세면 1:1 재현 가능합니다.
