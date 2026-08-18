const fs = require('fs');
const path = require('path');

const POSTS_DATA = [
  {
    id: 1,
    category: "UX라이팅",
    title: "전환율보다 먼저 봐야 하는 버튼 문구의 명확성",
    excerpt: "좋아 보이는 문구보다 중요한 건 클릭 이후 어떤 일이 벌어지는지 바로 이해하게 만드는 일입니다. 확인, 제출 같은 추상 문구 대신 다음 행동을 예고하는 카피가 사용자 불안을 먼저 줄입니다.",
    readTime: 60,
    tags: ["#버튼카피", "#전환율", "#마이크로카피"],
    content: `
      <h3>클릭을 주저하게 만드는 대표적인 원인</h3>
      <p>사용자가 구매, 신청, 제출 버튼 앞에서 망설이는 이유는 결제가 두려워서라기보다 '이 버튼을 누르면 당장 돈이 빠져나가는가?' '수정이 가능한가?'라는 정보의 불확실성 때문입니다.</p>
      <blockquote>'확인' 대신 '결제 단계로 이동', '제출' 대신 '3분 만에 신청 완료'처럼 결과의 명확성을 제공해야 전환율이 오릅니다.</blockquote>
      <h3>실무 적용 체크리스트</h3>
      <p>1. 버튼 텍스트가 독립된 맥락으로 읽히는가?<br>2. 행동의 결과(페이지 이동 vs 즉시 제출)가 명확한가?<br>3. 사용자가 언제든 되돌릴 수 있다는 안도감을 주는가?</p>
    `
  },
  {
    id: 2,
    category: "UX리서치",
    title: "인터뷰 질문 설계에서 자주 생기는 초보 실수",
    excerpt: "질문이 부드럽다고 인터뷰가 잘 되는 건 아닙니다. 경험 확인 없이 의견부터 묻거나, 맥락과 감정을 한 질문에 섞는 순간 답변의 밀도가 급격히 떨어집니다. 실제 행동을 끌어내는 순서가 핵심입니다.",
    readTime: 90,
    tags: ["#인터뷰질문", "#UX리서치", "#사용자조사"],
    content: `
      <h3>가상의 질문 vs 과거 경험 질문</h3>
      <p>"만약 이런 기능이 나오면 쓰시겠어요?"라는 질문은 99% 긍정적 거짓 답변을 유도합니다. 사람들은 미래의 자신을 실제보다 관대하게 평가하기 때문입니다.</p>
      <blockquote>"지난 일주일 동안 이 문제를 해결하기 위해 실제로 어떤 앱을 사용하셨나요?"라고 과거 행동을 물어야 진짜 인사이트가 나옵니다.</blockquote>
      <h3>IDI 인터뷰 필수 규칙</h3>
      <p>· 왜(Why)라는 단어를 직접 남발하여 사용자를 방어적으로 만들지 않기<br>· 침묵의 3초를 기다려 사용자의 솔직한 추가 발화 유도하기</p>
    `
  },
  {
    id: 3,
    category: "UX기획/디자인",
    title: "화면정의서가 예쁜데도 개발이 헷갈리는 이유",
    excerpt: "보기 좋은 정의서가 곧 좋은 정의서는 아닙니다. 상태값, 예외 흐름, 연결 규칙이 비어 있으면 디자이너와 개발자, QA가 서로 다른 화면을 상상하게 됩니다. 미감보다 기준이 먼저입니다.",
    readTime: 60,
    tags: ["#화면정의서", "#서비스기획", "#예외흐름"],
    content: `
      <h3>정상 케이스 80% vs 예외 케이스 20%</h3>
      <p>대부분의 기획 오류는 데이터가 없거나(Empty state), 글자 수가 넘치거나, 서버 통신 오류가 날 때 발생합니다. 예쁜 Figma 시안만으로는 개발을 진행할 수 없습니다.</p>
      <blockquote>와이어프레임 작성 시 4대 상태(Default, Hover/Active, Disabled, Error)와 빈 화면 처리 기준을 반드시 명시해야 합니다.</blockquote>
    `
  },
  {
    id: 4,
    category: "피그마",
    title: "피그마를 디자인 툴이 아니라 협업 툴로 봐야 하는 이유",
    excerpt: "피그마의 핵심은 화면을 예쁘게 만드는 데 있지 않습니다. 코멘트 흐름, 컴포넌트 기준, 버전 공유 구조가 정리될 때 팀 전체의 의사결정 속도가 함께 빨라집니다.",
    readTime: 90,
    tags: ["#피그마", "#협업툴", "#컴포넌트"],
    content: `
      <h3>디자인 파일 구조화 방법론</h3>
      <p>Page 1: 🧹 Draft (아이디어 스케치)<br>Page 2: 🚀 Dev Ready (개발 전달용 검증 시안)<br>Page 3: ❖ Design System (공용 컴포넌트)</p>
      <p>구조화된 피그마 파일은 개발자와 기획자가 커뮤니케이션 비용을 70% 이상 절감시켜 줍니다.</p>
    `
  },
  {
    id: 5,
    category: "AI트랜드",
    title: "AI UX에서 프롬프트보다 먼저 정해야 하는 기준",
    excerpt: "프롬프트를 잘 쓰는 것보다 먼저 필요한 건 문제정의와 검증 기준입니다. 어떤 장면에서 AI를 쓸지, 결과를 누가 어떤 기준으로 확인하는지 정리되지 않으면 도입은 금방 흐려집니다.",
    readTime: 120,
    tags: ["#AIUX", "#문제정의", "#검증기준"],
    content: `
      <h3>AI 도구 도입 시 흔한 딜레마</h3>
      <p>AI가 생성한 답변의 할루시네이션(환각)을 사용자가 어떻게 감지하고 수정할 수 있게 만드느냐가 AI UI/UX의 핵심 설계 지점입니다.</p>
      <blockquote>AI 기능을 '전지전능한 유기체'가 아닌 '생산성을 5배 높이는 지능형 보조 도구'로 포지셔닝해야 기대치 불일치가 발생하지 않습니다.</blockquote>
    `
  },
  {
    id: 6,
    category: "바이브코딩",
    title: "바이브코딩으로 프로토타입 검증 속도를 높이는 방법",
    excerpt: "완성도 높은 제품을 만들기보다 작은 인터랙션을 빨리 확인하는 데 집중하면 검증 속도가 크게 빨라집니다. 기획자와 디자이너가 직접 프로토타입을 만져보는 순간 회의 시간이 줄어듭니다.",
    readTime: 90,
    tags: ["#바이브코딩", "#프로토타입", "#검증루프"],
    content: `
      <h3>자연어 프롬프트 기반 웹/앱 MVP 제작</h3>
      <p>코드 한 줄 몰라도 최신 AI 바이브코딩 도구와 HTML/CSS/JS 템플릿을 연동하면 10분 만에 동작 가능한 하이브리드 프로토타입을 구축할 수 있습니다.</p>
      <p>실제 동작하는 프로토타입으로 사용자 UT를 진행하면 static 피그마 시안 대비 3배 이상의 깊이 있는 반응 데이터를 수집할 수 있습니다.</p>
    `
  },
  {
    id: 7,
    category: "UX라이팅",
    title: "에러 메시지 작성 시 사용자 이탈을 막는 3가지 서술 규칙",
    excerpt: "시스템 오케스트레이션 코드 대신 사용자가 지금 무엇을 바로잡아야 하는지 친절하고 간결하게 설명할 때 탈퇴율을 극적으로 낮출 수 있습니다.",
    readTime: 90,
    tags: ["#에러메시지", "#UX라이팅", "#예외처리"],
    content: `
      <h3>에러 메시지 3대 작성 규칙</h3>
      <p>1. 탓하지 않기: '잘못된 입력입니다' (X) -> '비밀번호 8자 이상을 입력해 주세요' (O)<br>2. 원인 설명: 어떤 규칙이 충족되지 않았는지 명시<br>3. 다음 행동 제안: 어디로 이동해서 해결 가능한지 버튼 제공</p>
    `
  },
  {
    id: 8,
    category: "UX리서치",
    title: "UT(사용성 테스트) 진행 시 모더레이터가 절대 하지 말아야 할 말",
    excerpt: "사용자가 헤매는 순간 '오른쪽 상단 버튼을 누르시면 됩니다'라고 힌트를 주는 순간, 테스트의 모든 데이터는 왜곡됩니다.",
    readTime: 60,
    tags: ["#사용성테스트", "#UT", "#모더레이팅"],
    content: `
      <h3>관찰자의 중립 유지 원칙</h3>
      <p>사용자가 멈추었을 때는 "어떤 생각을 하고 계신가요?" "어디를 살펴보고 계신가요?"라고 씽크얼라우드(Think Aloud)를 유도해야 합니다.</p>
    `
  },
  {
    id: 9,
    category: "UX기획/디자인",
    title: "디자인 시스템 구축 시 토큰과 컴포넌트를 분리해야 하는 이유",
    excerpt: "컬러와 타이포그래피 변수(Token)를 컴포넌트 하드코딩 값과 독립시켜야 다크모드 및 모바일/데스크톱 파급 변경 시 오류가 생기지 않습니다.",
    readTime: 90,
    tags: ["#디자인시스템", "#디자인토큰", "#컴포넌트"],
    content: `
      <h3>Semantic Token 구조화</h3>
      <p>color-primary-500 -> color-bg-brand -> button-bg-default 형태의 3단계 토큰 위계 설정이 필수입니다.</p>
    `
  },
  {
    id: 10,
    category: "AI트랜드",
    title: "생성형 AI 인터페이스의 대화형 vs 캔버스형 선택 가이드",
    excerpt: "단순 질의응답은 대화형(Chatbot)이 유리하지만, 복잡한 문서 및 디자인 편집 작업은 캔버스(Canvas) 뷰 Split 구조가 훨씬 효율적입니다.",
    readTime: 90,
    tags: ["#생성형AI", "#캔버스UX", "#AI인터페이스"],
    content: `
      <h3>작업 맥락 유지를 위한 화면 split 패턴</h3>
      <p>왼쪽에서 프롬프트를 입력하고 오른쪽 캔버스에서 실시간 변경 결과를 시각화할 때 사용자 피로도가 급감합니다.</p>
    `
  },
  {
    id: 11,
    category: "피그마",
    title: "피그마 Auto Layout과 Component Properties로 제작속도 3배 올리기",
    excerpt: "오토 레이아웃의 Min/Max Width 설정과 컴포넌트 속성(Variant, Boolean, Instance Swap)을 정교하게 다루는 실무 테크닉.",
    readTime: 60,
    tags: ["#AutoLayout", "#피그마팁", "#생산성"],
    content: `
      <h3>피그마 꿀팁 모음</h3>
      <p>· Shift + A: Auto layout 적용<br>· Hug vs Fill container 설정을 통한 반응형 모바일 화면 즉시 대응</p>
    `
  },
  {
    id: 12,
    category: "바이브코딩",
    title: "프롬프트 기반 바이브코딩으로 10분 만에 랜딩페이지 MVP 검증하기",
    excerpt: "기획안 텍스트를 LLM 개발 프롬프트로 변환하여 실시간 브라우저 실행 코드로 구축하는 실전 절차 가이드.",
    readTime: 60,
    tags: ["#MVP", "#바이브코딩", "#프롬프트"],
    content: `
      <h3>초고속 검증 루프</h3>
      <p>와이어프레임 텍스트 -> AI HTML/CSS 코드 생성 -> 깃허브 페이지스/Netlify 배포 -> 사용자 반응 수집까지 단 하루 만에 완료하기.</p>
    `
  },
  {
    id: 13,
    category: "UX라이팅",
    title: "온보딩 과정에서 사용자의 인지 부하를 줄이는 마이크로카피",
    excerpt: "처음 앱을 켠 사용자에게 권한 요청(알림, 위치)을 받아낼 때 명백한 이득을 제시하는 혜택 중심 서술 기법.",
    readTime: 60,
    tags: ["#온보딩", "#마이크로카피", "#UX카피"],
    content: `
      <p>'위치 권한을 허용하시겠습니까?' 대신 '내 주변 500m 이내 맛집 쿠폰을 바로 받으려면 위치 확인이 필요해요'로 가치 전달하기.</p>
    `
  },
  {
    id: 14,
    category: "UX리서치",
    title: "FGI 표적집단 면접조사에서 그룹 편향을 방지하는 구조화 기술",
    excerpt: "목소리 큰 참석 한 명이 전체 분위기를 주도하는 현상을 막기 위해 사전 서면 작성과 독립 득표 방식을 병행하는 리서치 스킬.",
    readTime: 120,
    tags: ["#FGI", "#패널조사", "#리서치설계"],
    content: `
      <p>토론 전 3분 간 포스트잇 개인 의견 기재 후 제출하게 하면 발언 강자의 영향을 최소화할 수 있습니다.</p>
    `
  },
  {
    id: 15,
    category: "UX기획/디자인",
    title: "모바일 결제 단계에서 이탈을 줄이는 1-Page Checkout 동선 설계",
    excerpt: "주소 입력, 쿠폰 적용, 결제 수단 선택을 한 페이지 안에서 아코디언 컴포넌트로 처리하여 이탈률을 24% 감소시킨 사례.",
    readTime: 90,
    tags: ["#결제동선", "#1PageCheckout", "#전환개선"],
    content: `
      <h3>완벽한 결제 UX 동선</h3>
      <p>단계 이동 시 로딩 스피너를 제거하고 스무스 스크롤로 다음 입력 필드에 자동 포커스를 주는 UI 패턴.</p>
    `
  },
  {
    id: 16,
    category: "AI트랜드",
    title: "LLM 에이전트 서비스의 로딩 대기 시간을 견디게 만드는 UI 패턴",
    excerpt: "10초 이상 소요되는 복잡한 AI 추론 과정 동안 사용자에게 단계별 진행 상태(Progress Stage)를 투명하게 시각화하기.",
    readTime: 60,
    tags: ["#LLM", "#로딩패턴", "#대기시간UX"],
    content: `
      <p>'처리 중...' 대신 '1/3단계: 문서 데이터 분석 중', '2/3단계: 주요 키워드 추출 중'으로 안내하여 이탈 방지.</p>
    `
  },
  {
    id: 17,
    category: "피그마",
    title: "Figma Variables를 활용한 다크모드 및 다국어 스위칭 구축법",
    excerpt: "피그마 배리어블 모드를 활용해 버튼 클릭 한 번으로 국문/영문 및 라이트/다크모드 전체 시안을 전환하는 시스템 설계.",
    readTime: 120,
    tags: ["#Variables", "#다크모드", "#피그마수업"],
    content: `
      <p>String Variable과 Color Variable을 분리 등록하여 고도화된 글로벌 모바일 프로젝트 시안 구축하기.</p>
    `
  },
  {
    id: 18,
    category: "바이브코딩",
    title: "디자이너가 바이브코딩으로 직접 코드형 프론트엔드를 구축할 때의 Gotchas",
    excerpt: "디자인 시스템 tokens.css와 LLM 바이브코딩 프롬프트 사이의 세만틱 일관성을 유지하는 주의사항.",
    readTime: 120,
    tags: ["#프론트엔드", "#바이브코딩", "#디자이너개발"],
    content: `
      <p>CSS 클래스명을 하드코딩하지 않고 변수화된 토큰명(e.g., var(--w95-black))으로 AI에 요청하는 프롬프팅 스킬.</p>
    `
  },
  {
    id: 19,
    category: "UX라이팅",
    title: "금융 & 커머스 앱에서 Trust(신뢰)를 구축하는 서술 톤앤매너",
    excerpt: "과도한 혜택 과장이나 모호한 법적 경고 문구 대신 직관적이고 솔직한 텍스트로 사용자의 신뢰감을 극대화하는 법.",
    readTime: 120,
    tags: ["#신뢰디자인", "#톤앤매너", "#금융UX"],
    content: `
      <p>작은 글씨의 숨겨진 유의사항 대신 중요한 가입 해지 조건과 수수료 발생 기준을 첫 화면 굵은 글씨로 노출할 때 신뢰 지수가 대폭 상승합니다.</p>
    `
  }
];

const baseDir = path.join(__dirname, '..', 'implementation');

POSTS_DATA.forEach((post, index) => {
  const postDir = path.join(baseDir, 'ux-blog', `post-${post.id}`);
  if (!fs.existsSync(postDir)) return;

  const prevPost = index > 0 ? POSTS_DATA[index - 1] : null;
  const nextPost = index < POSTS_DATA.length - 1 ? POSTS_DATA[index + 1] : null;

  const filePath = path.join(postDir, 'index.html');
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Prev Post & Next Post on EXACT SAME HORIZONTAL ROW
  const newPostNavHtml = `<!-- BOTTOM NAV WITH PREV & NEXT POST ON THE EXACT SAME HORIZONTAL ROW -->
          <section class="post-nav-section" style="margin-top:36px; padding-top:20px; border-top:2px solid #000000; display:flex; flex-direction:column; gap:14px;">
            <div style="display:flex; justify-content:space-between; align-items:center; gap:16px; font-size:13.5px; font-weight:700;">
              <!-- Prev Post (Left) -->
              <div style="flex:1; min-width:0; text-align:left;">
                ${prevPost ? `<a href="/ux-blog/post-${prevPost.id}/" style="color:#000000; text-decoration:none; display:inline-flex; align-items:center; gap:6px; max-width:100%;"><span style="white-space:nowrap; font-weight:800; color:#444;">⬅ 이전글:</span> <span style="text-decoration:underline; overflow:hidden; white-space:nowrap; text-overflow:ellipsis;">${prevPost.title}</span></a>` : '<span style="color:#999999; font-weight:500; font-size:13px;">이전 글이 없습니다.</span>'}
              </div>

              <!-- Next Post (Right) -->
              <div style="flex:1; min-width:0; text-align:right;">
                ${nextPost ? `<a href="/ux-blog/post-${nextPost.id}/" style="color:#000000; text-decoration:none; display:inline-flex; align-items:center; justify-content:flex-end; gap:6px; max-width:100%;"><span style="text-decoration:underline; overflow:hidden; white-space:nowrap; text-overflow:ellipsis;">${nextPost.title}</span> <span style="white-space:nowrap; font-weight:800; color:#444;">:다음글 ➡</span></a>` : '<span style="color:#999999; font-weight:500; font-size:13px;">다음 글이 없습니다.</span>'}
              </div>
            </div>

            <!-- 목록보기 Button at Far Right -->
            <div style="display:flex; justify-content:flex-end; border-top:1px dashed #e0e0e0; padding-top:12px;">
              <a href="/ux-blog/" class="w95-btn" style="padding:6px 20px; font-size:12.5px;">목록보기</a>
            </div>
          </section>`;

  content = content.replace(
    /<section class="post-nav-section">[\s\S]*?<\/section>/g,
    newPostNavHtml
  );

  content = content.replace(
    /<!-- BOTTOM NAV WITH PREV\/NEXT POST FULL TITLES & FAR-RIGHT LIST VIEW BUTTON -->[\s\S]*?<\/section>/g,
    newPostNavHtml
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated post nav (same line for prev/next) for post-${post.id}`);
});

console.log('ALL POST DETAIL PAGES UPDATED: PREV & NEXT POST ON SAME HORIZONTAL LINE!');
