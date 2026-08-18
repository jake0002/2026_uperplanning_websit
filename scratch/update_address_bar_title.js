const fs = require('fs');
const path = require('path');

const POSTS_DATA = [
  { id: 1, title: "전환율보다 먼저 봐야 하는 버튼 문구의 명확성" },
  { id: 2, title: "인터뷰 질문 설계에서 자주 생기는 초보 실수" },
  { id: 3, title: "화면정의서가 예쁜데도 개발이 헷갈리는 이유" },
  { id: 4, title: "피그마를 디자인 툴이 아니라 협업 툴로 봐야 하는 이유" },
  { id: 5, title: "AI UX에서 프롬프트보다 먼저 정해야 하는 기준" },
  { id: 6, title: "바이브코딩으로 프로토타입 검증 속도를 높이는 방법" },
  { id: 7, title: "에러 메시지 작성 시 사용자 이탈을 막는 3가지 서술 규칙" },
  { id: 8, title: "UT(사용성 테스트) 진행 시 모더레이터가 절대 하지 말아야 할 말" },
  { id: 9, title: "디자인 시스템 구축 시 토큰과 컴포넌트를 분리해야 하는 이유" },
  { id: 10, title: "생성형 AI 인터페이스의 대화형 vs 캔버스형 선택 가이드" },
  { id: 11, title: "피그마 Auto Layout과 Component Properties로 제작속도 3배 올리기" },
  { id: 12, title: "프롬프트 기반 바이브코딩으로 10분 만에 랜딩페이지 MVP 검증하기" },
  { id: 13, title: "온보딩 과정에서 사용자의 인지 부하를 줄이는 마이크로카피" },
  { id: 14, title: "FGI 표적집단 면접조사에서 그룹 편향을 방지하는 구조화 기술" },
  { id: 15, title: "모바일 결제 단계에서 이탈을 줄이는 1-Page Checkout 동선 설계" },
  { id: 16, title: "LLM 에이전트 서비스의 로딩 대기 시간을 견디게 만드는 UI 패턴" },
  { id: 17, title: "Figma Variables를 활용한 다크모드 및 다국어 스위칭 구축법" },
  { id: 18, title: "디자이너가 바이브코딩으로 직접 코드형 프론트엔드를 구축할 때의 Gotchas" },
  { id: 19, title: "금융 & 커머스 앱에서 Trust(신뢰)를 구축하는 서술 톤앤매너" }
];

const baseDir = path.join(__dirname, '..', 'implementation');

POSTS_DATA.forEach(post => {
  const filePath = path.join(baseDir, 'ux-blog', `post-${post.id}`, 'index.html');
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  const oldAddrStr = `C:\\SUPERPLANNING\\UX_서비스\\UX_블로그\\post-${post.id}`;
  const newAddrStr = `C:\\SUPERPLANNING\\UX_서비스\\UX_블로그\\${post.title}`;

  content = content.split(oldAddrStr).join(newAddrStr);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated address bar path for post-${post.id}: ${newAddrStr}`);
});

// Update generator script as well
const genScriptPath = path.join(__dirname, 'generate_standalone_post_pages.js');
if (fs.existsSync(genScriptPath)) {
  let content = fs.readFileSync(genScriptPath, 'utf8');
  content = content.replace(
    /C:\\\\SUPERPLANNING\\\\UX_서비스\\\\UX_블로그\\\\post-\${post\.id}/g,
    'C:\\\\SUPERPLANNING\\\\UX_서비스\\\\UX_블로그\\\\\${post.title}'
  );
  fs.writeFileSync(genScriptPath, content, 'utf8');
  console.log('Updated generate_standalone_post_pages.js address bar template');
}

console.log('ALL ADDRESS BARS UPDATED WITH POST TITLES!');
