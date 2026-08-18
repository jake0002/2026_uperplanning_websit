const fs = require('fs');

const masterPath = 'implementation/ux-academy/index.html';
const aliasPath1 = 'implementation/ux-academy.html';
const aliasPath2 = 'implementation/ux_academy.html';

let html = fs.readFileSync(masterPath, 'utf8');

// 1. Add CSS for Section 7 Benefit Cards Grid
const cssAddition = `
    /* Section 7 Benefit Cards Grid (Matching Reference Screenshot) */
    .benefit-cards-grid {
      display: grid !important;
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 16px !important;
      margin: 20px 0 !important;
      width: 100% !important;
    }
    @media (max-width: 640px) {
      .benefit-cards-grid {
        grid-template-columns: 1fr !important;
      }
    }
    .benefit-card-item {
      background: #ffffff !important;
      border: 1px solid #dcdcdc !important;
      border-radius: 6px !important;
      padding: 20px 22px 18px 22px !important;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02) !important;
      box-sizing: border-box !important;
      display: flex !important;
      flex-direction: column !important;
    }
    .benefit-card-item .benefit-chip {
      display: inline-block !important;
      align-self: flex-start !important;
      border: 1px solid #717171 !important;
      border-radius: 3px !important;
      padding: 2px 10px !important;
      font-size: 12px !important;
      font-weight: 700 !important;
      color: #111111 !important;
      background: #ffffff !important;
      margin-bottom: 12px !important;
    }
    .benefit-card-item h3 {
      font-size: 15px !important;
      font-weight: 700 !important;
      color: #111111 !important;
      margin-top: 0 !important;
      margin-bottom: 12px !important;
      line-height: 1.35 !important;
      border-bottom: none !important;
      padding-bottom: 0 !important;
    }
    .benefit-card-item ul {
      list-style: none !important;
      padding-left: 0 !important;
      margin: 0 !important;
    }
    .benefit-card-item ul li {
      position: relative !important;
      padding-left: 16px !important;
      margin-bottom: 8px !important;
      font-size: 13.5px !important;
      line-height: 1.55 !important;
      color: #222222 !important;
      word-break: keep-all !important;
    }
    .benefit-card-item ul li::before {
      content: "•" !important;
      position: absolute !important;
      left: 0 !important;
      top: 0 !important;
      color: #111111 !important;
      font-size: 13.5px !important;
      font-weight: bold !important;
    }
    .benefit-card-item ul li:last-child {
      margin-bottom: 0 !important;
    }
`;

if (!html.includes('.benefit-cards-grid {')) {
  const cssAnchor = `</style>`;
  html = html.replace(cssAnchor, cssAddition + '\n' + cssAnchor);
}

// 2. Replace Section 7 HTML
const oldSection7Start = html.indexOf('<section class="section" id="benefits">');
const oldSection7End = html.indexOf('</section>', oldSection7Start) + 10;
const oldSection7Html = html.substring(oldSection7Start, oldSection7End);

const newSection7Html = `<section class="section" id="benefits">
          <!-- 7. 수강생 혜택 -->
          <h2 id="benefits">7. 수강생 혜택</h2>
          <p>강의를 듣는 것으로 끝나지 않고, 바로 실무와 포트폴리오에 연결할 수 있도록 아래 혜택을 함께 제공합니다.</p>

          <div class="benefit-cards-grid">
            <article class="benefit-card-item">
              <span class="benefit-chip">혜택 1</span>
              <h3>실제 현업에서 사용하는 UX 비밀 실무자료(예제포함)</h3>
              <ul>
                <li>UX리서치, UX라이팅, UX모델링, IA설계, PRD, 플로우차트</li>
                <li>기능정의서, 와이어프레임, UI스토리보드 템플릿</li>
                <li>100% 실무 개발자가 좋아하는 웹기획 설계문서 올인원 세트</li>
              </ul>
            </article>

            <article class="benefit-card-item">
              <span class="benefit-chip">혜택 2</span>
              <h3>평생 멤버십 등록</h3>
              <ul>
                <li>한번만 강의를 수강하셨어도 평생 멤버십 자동가입 무제한 AS</li>
                <li>1:1개별 과제 피드백 보장</li>
                <li>실제 5~6년 전 수강하셨던 분들도 아직까지 케어해드리고 있습니다.</li>
              </ul>
            </article>

            <article class="benefit-card-item">
              <span class="benefit-chip">혜택 3</span>
              <h3>무료 커피챗, UX컨설팅</h3>
              <ul>
                <li>스타트업 예비창업자 컨설팅</li>
                <li>진행 중인 프로젝트 고민상담</li>
                <li>취준생, 이직러 대상 UX커리어 컨설팅</li>
                <li>UX포트폴리오 템플릿 제공 및 모의면접 코칭</li>
              </ul>
            </article>

            <article class="benefit-card-item">
              <span class="benefit-chip">혜택 4</span>
              <h3>참석자 전원 증정</h3>
              <ul>
                <li>자체제작 와이어프레임 드로잉 굿즈 증정</li>
                <li>어디에도 없는 자체제작 UX포트폴리오 템플릿 증정</li>
                <li>AI-UX기획 프롬프트 자료모음집 증정</li>
              </ul>
            </article>
          </div>
        </section>`;

if (oldSection7Start !== -1) {
  html = html.substring(0, oldSection7Start) + newSection7Html + html.substring(oldSection7End);
}

fs.writeFileSync(masterPath, html, 'utf8');
console.log('Updated:', masterPath);

fs.writeFileSync(aliasPath1, html, 'utf8');
console.log('Updated:', aliasPath1);

fs.writeFileSync(aliasPath2, html, 'utf8');
console.log('Updated:', aliasPath2);
