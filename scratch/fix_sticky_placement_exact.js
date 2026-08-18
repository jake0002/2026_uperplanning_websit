const fs = require('fs');

const masterPath = 'implementation/ux-academy/index.html';
const aliasPath1 = 'implementation/ux-academy.html';
const aliasPath2 = 'implementation/ux_academy.html';

let html = fs.readFileSync(masterPath, 'utf8');

// 1. Remove any misplaced <aside class="sticky-course-banner-wrap">
const bannerStart = html.indexOf('<!-- Sticky Course Banner Sidebar (Exact Attached Image Match) -->');
if (bannerStart !== -1) {
  const bannerEnd = html.indexOf('</aside>', bannerStart) + 8;
  html = html.substring(0, bannerStart) + html.substring(bannerEnd);
}

const bannerHtml = `
    <!-- Sticky Course Banner Sidebar (Exact Attached Image Match) -->
    <aside class="sticky-course-banner-wrap" id="stickyCourseBanner" aria-label="UX강의 수강신청 스티키 배너">
      <div class="sticky-banner-card">
        <!-- Top 3 Course Tabs -->
        <div class="sticky-tabs-header">
          <button class="sticky-tab-btn is-active" type="button" onclick="switchStickyTab('A')" id="stickyTabA">A타입 코스</button>
          <button class="sticky-tab-btn" type="button" onclick="switchStickyTab('B')" id="stickyTabB">B타입 코스</button>
          <button class="sticky-tab-btn" type="button" onclick="switchStickyTab('C')" id="stickyTabC">C타입 코스</button>
        </div>

        <!-- Banner Content Body -->
        <div class="sticky-banner-body">
          <!-- Countdown Header -->
          <div class="sticky-timer-header">
            <span class="sticky-badge-sale" id="stickyTimerBadge">기간한정 할인</span>
            <span class="sticky-timer-clock" id="stickyTimerText">48시간00분00초</span>
          </div>

          <!-- Price Display -->
          <div class="sticky-price-row">
            <span class="sticky-price-origin" id="stickyPriceOrigin">660,000원</span>
            <span class="sticky-price-sale" id="stickyPriceSale">440,000원</span>
          </div>
          <div class="sticky-price-sub">세금계산서 · 수료증 발급 가능</div>

          <!-- Course Title & Description -->
          <h3 class="sticky-course-title" id="stickyCourseTitle">입문형 A코스 - 오프라인 5시간 강의</h3>
          <p class="sticky-course-desc" id="stickyCourseDesc">UX리서치, UX라이팅, 서비스기획, 바이브코딩까지 빠르게 익히고 싶은 입문형 코스</p>

          <!-- Details List -->
          <div class="sticky-details-list">
            <div class="sticky-detail-row">
              <span class="sticky-detail-label">장소</span>
              <span class="sticky-detail-val" id="stickyDetailLocation">기업/학교 출강(협의가능)</span>
            </div>
            <div class="sticky-detail-row">
              <span class="sticky-detail-label">총 강의시간</span>
              <span class="sticky-detail-val" id="stickyDetailDuration">5시간(협의가능)</span>
            </div>
            <div class="sticky-detail-row">
              <span class="sticky-detail-label">제공 자료</span>
              <span class="sticky-detail-val" id="stickyDetailMaterials">A코스 UX비밀자료 제공</span>
            </div>
          </div>

          <!-- Action Buttons -->
          <button class="sticky-btn-kakao" type="button" onclick="openWindow('kakao');">카카오채널 실시간 1:1상담</button>
          <button class="sticky-btn-apply" type="button" onclick="location.href='/contact/';">강의 신청하기</button>
        </div>
      </div>
    </aside>
`;

// Insert bannerHtml right after closing </div> of .explorer-window
// Search for line: <!-- START MENU -->
const startMenuIdx = html.indexOf('<!-- START MENU -->');
if (startMenuIdx !== -1) {
  // Find the two closing </div> tags right before <!-- START MENU -->
  const lastDiv2 = html.lastIndexOf('</div>', startMenuIdx); // closes .page-wrapper
  const lastDiv1 = html.lastIndexOf('</div>', lastDiv2 - 1); // closes .explorer-window
  
  if (lastDiv1 !== -1 && lastDiv2 !== -1) {
    html = html.substring(0, lastDiv1 + 6) + '\n' + bannerHtml + '\n' + html.substring(lastDiv1 + 6);
  }
}

fs.writeFileSync(masterPath, html, 'utf8');
console.log('Updated:', masterPath);

fs.writeFileSync(aliasPath1, html, 'utf8');
console.log('Updated:', aliasPath1);

fs.writeFileSync(aliasPath2, html, 'utf8');
console.log('Updated:', aliasPath2);
