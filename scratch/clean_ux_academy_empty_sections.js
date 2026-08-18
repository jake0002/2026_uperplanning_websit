const fs = require('fs');
const path = require('path');

const files = [
  'ux-academy/index.html',
  'ux-academy.html',
  'ux_academy.html'
];

const newMainContent = `        <main class="main-content-pane">

          <h1>AI-UX 강의</h1>

          <!-- 1. AI-UX강의소개 -->
          <h2 id="intro">1. AI-UX강의소개</h2>

          <!-- 2. 수강후기 -->
          <h2 id="reviews">2. 수강후기</h2>

          <!-- 3. 기업 출강 및 강의 이력 -->
          <h2 id="history">3. 기업 출강 및 강의 이력</h2>

          <!-- 4. 핵심 커리큘럼 -->
          <h2 id="curriculum">4. 핵심 커리큘럼</h2>

          <!-- 5. 코스 별 강의비용 -->
          <h2 id="pricing">5. 코스 별 강의비용</h2>

          <!-- 6. 수강 대상자 -->
          <h2 id="target">6. 수강 대상자</h2>

          <!-- 7. 수강생 혜택 -->
          <h2 id="benefits">7. 수강생 혜택</h2>

          <!-- 8. 자주 묻는 질문 (FAQ) -->
          <h2 id="faq">8. 자주 묻는 질문 (FAQ)</h2>

          <div class="bottom-nav">
            <p>이전 단계: <a href="/web-app-development/">웹/앱 개발</a> &nbsp;|&nbsp; 다음 단계: <a href="/company/">회사소개</a></p>
            <p>마크다운 미러: <a href="/services/ux-planning-design.md">/services/ux-planning-design.md</a> · AI 색인: <a href="/llms.txt">/llms.txt</a></p>
          </div>
        </main>`;

const mainRegex = /<main class="main-content-pane">[\s\S]*?<\/main>/;

files.forEach(f => {
  const fullPath = path.join(__dirname, '..', 'implementation', f);
  if (!fs.existsSync(fullPath)) return;

  let content = fs.readFileSync(fullPath, 'utf8');
  if (mainRegex.test(content)) {
    content = content.replace(mainRegex, newMainContent);
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log('Successfully cleaned section content in:', f);
  } else {
    console.error('Could not match main-content-pane in:', f);
  }
});
