const fs = require('fs');

const masterPath = 'implementation/ux-academy/index.html';
const aliasPath1 = 'implementation/ux-academy.html';
const aliasPath2 = 'implementation/ux_academy.html';

let html = fs.readFileSync(masterPath, 'utf8');

// 1. Add CSS for Section 5 Pricing Layout
const cssAddition = `
    /* Section 5 Pricing Layout (Matching User Reference Image Exactly) */
    .course-pricing-container {
      width: 100% !important;
      margin: 20px 0 !important;
    }
    .course-cards-grid {
      display: grid !important;
      grid-template-columns: repeat(3, 1fr) !important;
      gap: 14px !important;
      margin-bottom: 16px !important;
    }
    .course-card-item {
      position: relative !important;
      background: #ffffff !important;
      border: 1px solid #e2e8f0 !important;
      border-radius: 10px !important;
      padding: 20px 14px 16px 14px !important;
      text-align: center !important;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03) !important;
      box-sizing: border-box !important;
    }
    .course-card-item .course-reco-badge {
      position: absolute !important;
      top: -11px !important;
      left: 50% !important;
      transform: translateX(-50%) !important;
      background: #000000 !important;
      color: #ffffff !important;
      border-radius: 12px !important;
      font-size: 11px !important;
      font-weight: 700 !important;
      padding: 3px 12px !important;
      white-space: nowrap !important;
      z-index: 2 !important;
    }
    .course-card-item h3 {
      font-size: 16px !important;
      font-weight: 800 !important;
      color: #111111 !important;
      margin: 0 0 6px 0 !important;
      letter-spacing: 0.02em !important;
      border-bottom: none !important;
      padding-bottom: 0 !important;
    }
    .course-card-item .course-origin-price {
      font-size: 13px !important;
      color: #888888 !important;
      text-decoration: line-through !important;
      margin: 2px 0 !important;
    }
    .course-card-item .course-sale-price {
      font-size: 18px !important;
      font-weight: 800 !important;
      color: #111111 !important;
      margin: 4px 0 10px 0 !important;
    }
    .course-card-item .course-tag-pill {
      display: inline-block !important;
      border: 1px solid #cbd5e1 !important;
      border-radius: 16px !important;
      padding: 4px 14px !important;
      font-size: 12px !important;
      color: #334155 !important;
      font-weight: 600 !important;
      background: #ffffff !important;
    }
    .course-compare-table {
      width: 100% !important;
      border-collapse: separate !important;
      border-spacing: 12px 10px !important;
      margin-left: -12px !important;
      margin-right: -12px !important;
    }
    .course-compare-table th.row-label {
      width: 110px !important;
      font-size: 13px !important;
      font-weight: 700 !important;
      color: #111111 !important;
      text-align: left !important;
      vertical-align: middle !important;
      padding: 8px 4px !important;
      white-space: nowrap !important;
    }
    .course-compare-table td.cell-box {
      background: #ffffff !important;
      border: 1px solid #e2e8f0 !important;
      border-radius: 8px !important;
      padding: 12px 14px !important;
      text-align: center !important;
      vertical-align: middle !important;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.02) !important;
      box-sizing: border-box !important;
      width: 30% !important;
    }
    .course-compare-table td.cell-box strong {
      display: block !important;
      font-size: 13.5px !important;
      font-weight: 700 !important;
      color: #111111 !important;
      margin-bottom: 4px !important;
    }
    .course-compare-table td.cell-box span.cell-desc {
      display: block !important;
      font-size: 12px !important;
      color: #666666 !important;
      line-height: 1.4 !important;
    }
    @media (max-width: 768px) {
      .course-cards-grid {
        grid-template-columns: 1fr !important;
      }
      .course-compare-table {
        display: block !important;
        overflow-x: auto !important;
        white-space: nowrap !important;
      }
    }
`;

if (!html.includes('.course-pricing-container {')) {
  const cssAnchor = `</style>`;
  html = html.replace(cssAnchor, cssAddition + '\n' + cssAnchor);
}

// 2. Replace Section 5 HTML
const oldSection5Start = html.indexOf('<section class="section" id="courses">');
const oldSection5End = html.indexOf('</section>', oldSection5Start) + 10;
const oldSection5Html = html.substring(oldSection5Start, oldSection5End);

const newSection5Html = `<section class="section" id="courses">
          <!-- 5. 코스 별 강의비용 -->
          <h2 id="pricing">5. 코스 별 강의비용</h2>

          <div class="course-feature-box">
            <h3>코스 선택 전 확인 포인트</h3>
            <ul>
              <li>모든 코스는 오프라인 대면 UX강의를 기본으로 합니다. (온라인 진행가능)</li>
              <li>모든 커리큘럼은 실무형 실습방식으로 진행 됩니다.</li>
              <li>스탠다드 코스를 선택 후 다음 코스를 이어서 신청도 가능합니다.</li>
            </ul>
          </div>

          <div class="course-pricing-container">
            <!-- Top 3 Pricing Cards -->
            <div class="course-cards-grid">
              <article class="course-card-item">
                <h3>STANDARD</h3>
                <p class="course-origin-price">660,000원</p>
                <p class="course-sale-price">440,000원</p>
                <span class="course-tag-pill">5시간 / 입문형</span>
              </article>

              <article class="course-card-item">
                <span class="course-reco-badge">가장 많이 선택</span>
                <h3>DELUXE</h3>
                <p class="course-origin-price">950,000원</p>
                <p class="course-sale-price">660,000원</p>
                <span class="course-tag-pill">8시간 / 심화형</span>
              </article>

              <article class="course-card-item">
                <h3>PREMIUM</h3>
                <p class="course-origin-price">1,350,000원</p>
                <p class="course-sale-price">990,000원</p>
                <span class="course-tag-pill">12시간 / 확장형</span>
              </article>
            </div>

            <!-- Comparison Table (Box Grid) -->
            <table class="course-compare-table">
              <tbody>
                <tr>
                  <th scope="row" class="row-label">패키지 설명</th>
                  <td class="cell-box">
                    <strong>오프라인 1:1대면 UX 강의 A코스</strong>
                    <span class="cell-desc">UX리서치 · UX라이팅 · 서비스기획 · 바이브코딩 · UX비밀자료A세트</span>
                  </td>
                  <td class="cell-box">
                    <strong>오프라인 1:1대면 UX 강의 B코스</strong>
                    <span class="cell-desc">UX리서치 · UX라이팅 · IA설계 · 피그마 · 바이브코딩 · UX비밀자료B세트</span>
                  </td>
                  <td class="cell-box">
                    <strong>오프라인 1:1대면 UX 강의 C코스</strong>
                    <span class="cell-desc">UX리서치 · UX라이팅 · PRD · 피그마 · 성과지표 · 바이브코딩 · UX비밀자료C세트</span>
                  </td>
                </tr>

                <tr>
                  <th scope="row" class="row-label">추천 대상</th>
                  <td class="cell-box">
                    <strong>UX왕초보 · 취준생</strong>
                    <span class="cell-desc">빠르게 UX기초와 실무 흐름을 잡고 싶은 경우</span>
                  </td>
                  <td class="cell-box">
                    <strong>주니어 실무자 · PM/PO</strong>
                    <span class="cell-desc">IA, 화면기획, 피그마까지 깊게 연결하고 싶은 경우</span>
                  </td>
                  <td class="cell-box">
                    <strong>창업자 · 신사업 담당자</strong>
                    <span class="cell-desc">PRD, 협업, AI활용 UX실무까지 폭넓게 다루고 싶은 경우</span>
                  </td>
                </tr>

                <tr>
                  <th scope="row" class="row-label">총 강의시간</th>
                  <td class="cell-box"><span style="font-size:13.5px; font-weight:600; color:#111;">5시간</span></td>
                  <td class="cell-box"><span style="font-size:13.5px; font-weight:600; color:#111;">8시간</span></td>
                  <td class="cell-box"><span style="font-size:13.5px; font-weight:600; color:#111;">12시간</span></td>
                </tr>

                <tr>
                  <th scope="row" class="row-label">장소</th>
                  <td class="cell-box"><span style="font-size:13px; color:#111;">오프라인 1:1 대면</span></td>
                  <td class="cell-box"><span style="font-size:13px; color:#111;">오프라인 1:1 대면</span></td>
                  <td class="cell-box"><span style="font-size:13px; color:#111;">오프라인 1:1 대면</span></td>
                </tr>

                <tr>
                  <th scope="row" class="row-label">강의실 제공</th>
                  <td class="cell-box"><span style="font-size:14px; font-weight:bold; color:#111;">✓</span></td>
                  <td class="cell-box"><span style="font-size:14px; font-weight:bold; color:#111;">✓</span></td>
                  <td class="cell-box"><span style="font-size:14px; font-weight:bold; color:#111;">✓</span></td>
                </tr>

                <tr>
                  <th scope="row" class="row-label">PC 대여 포함</th>
                  <td class="cell-box"><span style="font-size:14px; font-weight:bold; color:#111;">✓</span></td>
                  <td class="cell-box"><span style="font-size:14px; font-weight:bold; color:#111;">✓</span></td>
                  <td class="cell-box"><span style="font-size:14px; font-weight:bold; color:#111;">✓</span></td>
                </tr>

                <tr>
                  <th scope="row" class="row-label">제공 자료</th>
                  <td class="cell-box">
                    <strong>UX 비밀자료 A세트</strong>
                    <span class="cell-desc">입문자용 실습 자료와 핵심 템플릿 중심</span>
                  </td>
                  <td class="cell-box">
                    <strong>UX 비밀자료 B세트</strong>
                    <span class="cell-desc">피그마 · IA · 화면기획 심화 자료 포함</span>
                  </td>
                  <td class="cell-box">
                    <strong>UX 비밀자료 C세트</strong>
                    <span class="cell-desc">PRD · 피그마 · 성과지표 · 바이브코딩 확장 자료 포함</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>`;

if (oldSection5Start !== -1) {
  html = html.substring(0, oldSection5Start) + newSection5Html + html.substring(oldSection5End);
}

fs.writeFileSync(masterPath, html, 'utf8');
console.log('Updated:', masterPath);

fs.writeFileSync(aliasPath1, html, 'utf8');
console.log('Updated:', aliasPath1);

fs.writeFileSync(aliasPath2, html, 'utf8');
console.log('Updated:', aliasPath2);
