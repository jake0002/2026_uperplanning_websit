const fs = require('fs');

const masterPath = 'implementation/ux-academy/index.html';
const aliasPath1 = 'implementation/ux-academy.html';
const aliasPath2 = 'implementation/ux_academy.html';

let html = fs.readFileSync(masterPath, 'utf8');

// 1. CSS for Sticky Banner and Layout
const cssSticky = `
    /* Right Sticky Course Banner (Exact Attached Image Match) */
    .page-wrapper {
      padding: calc(var(--logo-top) + var(--gnb-h) + 20px) 24px 24px 24px;
      display: flex !important;
      justify-content: flex-start !important;
      align-items: flex-start !important;
      gap: 20px !important;
      width: 100% !important;
      max-width: 1460px !important;
      box-sizing: border-box !important;
    }
    .explorer-window {
      flex: 1 1 auto !important;
      max-width: 1080px !important;
      min-width: 0 !important;
    }
    .sticky-course-banner-wrap {
      position: sticky !important;
      top: 85px !important;
      width: 340px !important;
      flex: 0 0 340px !important;
      align-self: flex-start !important;
      z-index: 990 !important;
    }
    @media (max-width: 1150px) {
      .page-wrapper {
        flex-direction: column !important;
      }
      .explorer-window {
        max-width: 100% !important;
        width: 100% !important;
      }
      .sticky-course-banner-wrap {
        position: relative !important;
        top: 0 !important;
        width: 100% !important;
        max-width: 100% !important;
        flex: 1 1 100% !important;
        margin-top: 24px !important;
      }
    }

    .sticky-banner-card {
      background: #ffffff !important;
      border: 2px solid #0f172a !important;
      border-radius: 4px !important;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08), 2px 2px 0 rgba(0, 0, 0, 0.15) !important;
      overflow: hidden !important;
      box-sizing: border-box !important;
      font-family: var(--font, sans-serif) !important;
    }
    .sticky-tabs-header {
      display: flex !important;
      background: #f8fafc !important;
      border-bottom: 2px solid #0f172a !important;
    }
    .sticky-tab-btn {
      flex: 1 !important;
      padding: 12px 2px !important;
      font-size: 13.5px !important;
      font-weight: 700 !important;
      color: #64748b !important;
      background: #f1f5f9 !important;
      border: none !important;
      border-right: 1px solid #cbd5e1 !important;
      cursor: pointer !important;
      transition: all 0.15s ease !important;
      outline: none !important;
      text-align: center !important;
    }
    .sticky-tab-btn:last-child {
      border-right: none !important;
    }
    .sticky-tab-btn.is-active {
      background: #ffffff !important;
      color: #0f172a !important;
      font-weight: 800 !important;
      border-bottom: 3px solid #0f172a !important;
      margin-bottom: -2px !important;
    }
    .sticky-banner-body {
      padding: 20px 18px 18px 18px !important;
    }
    .sticky-timer-header {
      display: flex !important;
      align-items: center !important;
      gap: 10px !important;
      margin-bottom: 12px !important;
    }
    .sticky-badge-sale {
      display: inline-block !important;
      border: 1.5px solid #f43f5e !important;
      color: #e11d48 !important;
      background: #fff1f2 !important;
      padding: 3px 10px !important;
      border-radius: 14px !important;
      font-size: 12px !important;
      font-weight: 700 !important;
      white-space: nowrap !important;
    }
    .sticky-badge-normal {
      display: inline-block !important;
      border: 1.5px solid #475569 !important;
      color: #334155 !important;
      background: #f8fafc !important;
      padding: 3px 10px !important;
      border-radius: 14px !important;
      font-size: 12px !important;
      font-weight: 700 !important;
      white-space: nowrap !important;
    }
    .sticky-timer-clock {
      font-size: 16px !important;
      font-weight: 800 !important;
      color: #9f1239 !important;
      letter-spacing: -0.01em !important;
    }
    .sticky-price-row {
      display: flex !important;
      align-items: baseline !important;
      gap: 8px !important;
      margin-top: 4px !important;
    }
    .sticky-price-origin {
      font-size: 15px !important;
      color: #94a3b8 !important;
      text-decoration: line-through !important;
      font-weight: 500 !important;
    }
    .sticky-price-sale {
      font-size: 22px !important;
      font-weight: 900 !important;
      color: #0f172a !important;
    }
    .sticky-price-sub {
      font-size: 12px !important;
      color: #64748b !important;
      margin-top: 4px !important;
      margin-bottom: 16px !important;
    }
    .sticky-course-title {
      font-size: 16px !important;
      font-weight: 800 !important;
      color: #0f172a !important;
      margin: 0 0 6px 0 !important;
      line-height: 1.35 !important;
      border-bottom: none !important;
      padding-bottom: 0 !important;
    }
    .sticky-course-desc {
      font-size: 13px !important;
      color: #475569 !important;
      line-height: 1.45 !important;
      margin: 0 0 16px 0 !important;
    }
    .sticky-details-list {
      border-top: 1px solid #e2e8f0 !important;
      margin-bottom: 18px !important;
    }
    .sticky-detail-row {
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
      padding: 10px 0 !important;
      border-bottom: 1px solid #e2e8f0 !important;
      font-size: 13.5px !important;
    }
    .sticky-detail-label {
      font-weight: 700 !important;
      color: #0f172a !important;
    }
    .sticky-detail-val {
      color: #1e293b !important;
      font-weight: 500 !important;
    }
    .sticky-btn-kakao {
      width: 100% !important;
      background: #ffffff !important;
      border: 2px solid #0f172a !important;
      border-radius: 4px !important;
      padding: 12px 0 !important;
      font-size: 15px !important;
      font-weight: 800 !important;
      color: #0f172a !important;
      cursor: pointer !important;
      transition: all 0.15s ease !important;
      outline: none !important;
      margin-bottom: 10px !important;
      display: block !important;
      text-align: center !important;
    }
    .sticky-btn-kakao:hover {
      background: #f8fafc !important;
    }
    .sticky-btn-apply {
      width: 100% !important;
      background: #0f172a !important;
      border: 2px solid #0f172a !important;
      border-radius: 4px !important;
      padding: 12px 0 !important;
      font-size: 15px !important;
      font-weight: 800 !important;
      color: #ffffff !important;
      cursor: pointer !important;
      transition: all 0.15s ease !important;
      outline: none !important;
      display: block !important;
      text-align: center !important;
    }
    .sticky-btn-apply:hover {
      background: #1e293b !important;
    }
`;

if (!html.includes('.sticky-banner-card {')) {
  const cssAnchor = `</style>`;
  html = html.replace(cssAnchor, cssSticky + '\n' + cssAnchor);
}

// 2. HTML Banner Structure inside .page-wrapper
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

if (!html.includes('id="stickyCourseBanner"')) {
  const scrollTopBtnIdx = html.indexOf('<!-- RETRO WIN95 BACK TO TOP ANCHOR BUTTON');
  if (scrollTopBtnIdx !== -1) {
    const lastDivBeforeBtn = html.lastIndexOf('</div>', scrollTopBtnIdx);
    html = html.substring(0, lastDivBeforeBtn + 6) + '\n' + bannerHtml + html.substring(lastDivBeforeBtn + 6);
  }
}

// 3. JavaScript Logic for Tab Switching & 48h / 10m Loop Countdown Timer
const jsStickyScript = `
<script>
/* ==================================================== */
/* STICKY COURSE BANNER TAB & COUNTDOWN LOOP LOGIC      */
/* ==================================================== */
var STICKY_COURSE_DATA = {
  A: {
    tabName: "A타입 코스",
    originPrice: "660,000원",
    salePrice: "440,000원",
    title: "입문형 A코스 - 오프라인 5시간 강의",
    desc: "UX리서치, UX라이팅, 서비스기획, 바이브코딩까지 빠르게 익히고 싶은 입문형 코스",
    location: "기업/학교 출강(협의가능)",
    duration: "5시간(협의가능)",
    materials: "A코스 UX비밀자료 제공"
  },
  B: {
    tabName: "B타입 코스",
    originPrice: "950,000원",
    salePrice: "660,000원",
    title: "심화형 B코스 - 오프라인 8시간 강의",
    desc: "IA, 화면기획, 피그마까지 깊게 연결하고 커리어 레벨업을 원하는 심화형 코스",
    location: "기업/학교 출강(협의가능)",
    duration: "8시간(협의가능)",
    materials: "B코스 UX비밀자료 제공"
  },
  C: {
    tabName: "C타입 코스",
    originPrice: "1,350,000원",
    salePrice: "990,000원",
    title: "확장형 C코스 - 오프라인 12시간 강의",
    desc: "PRD, 협업, AI활용 UX실무부터 바이브코딩까지 마스터하는 확장형 코스",
    location: "기업/학교 출강(협의가능)",
    duration: "12시간(협의가능)",
    materials: "C코스 UX비밀자료 제공"
  }
};

window.currentStickyCourse = 'A';

function switchStickyTab(typeKey) {
  if (!STICKY_COURSE_DATA[typeKey]) return;
  window.currentStickyCourse = typeKey;

  ['A', 'B', 'C'].forEach(function(k) {
    var btn = document.getElementById('stickyTab' + k);
    if (btn) {
      if (k === typeKey) btn.classList.add('is-active');
      else btn.classList.remove('is-active');
    }
  });

  var data = STICKY_COURSE_DATA[typeKey];
  var titleEl = document.getElementById('stickyCourseTitle');
  var descEl = document.getElementById('stickyCourseDesc');
  var locationEl = document.getElementById('stickyDetailLocation');
  var durationEl = document.getElementById('stickyDetailDuration');
  var materialsEl = document.getElementById('stickyDetailMaterials');

  if (titleEl) titleEl.textContent = data.title;
  if (descEl) descEl.textContent = data.desc;
  if (locationEl) locationEl.textContent = data.location;
  if (durationEl) durationEl.textContent = data.duration;
  if (materialsEl) materialsEl.textContent = data.materials;

  if (window.updateStickyTimerGlobal) window.updateStickyTimerGlobal();
}

function initStickyTimer() {
  var CYCLE_MS = (48 * 3600 + 10 * 60) * 1000;
  var DISCOUNT_MS = 48 * 3600 * 1000;

  var startTime = localStorage.getItem('ux_academy_banner_timer');
  if (!startTime) {
    startTime = Date.now();
    localStorage.setItem('ux_academy_banner_timer', startTime);
  } else {
    startTime = parseInt(startTime, 10);
  }

  window.updateStickyTimerGlobal = function updateTimer() {
    var now = Date.now();
    var elapsed = (now - startTime) % CYCLE_MS;
    if (elapsed < 0) elapsed += CYCLE_MS;

    var badgeEl = document.getElementById('stickyTimerBadge');
    var timerTextEl = document.getElementById('stickyTimerText');
    var priceOriginEl = document.getElementById('stickyPriceOrigin');
    var priceSaleEl = document.getElementById('stickyPriceSale');

    if (!badgeEl || !timerTextEl) return;

    var activeCourseKey = window.currentStickyCourse || 'A';
    var courseData = STICKY_COURSE_DATA[activeCourseKey];

    function pad(n) {
      return String(n).padStart(2, '0');
    }

    if (elapsed < DISCOUNT_MS) {
      var remainingMs = DISCOUNT_MS - elapsed;
      var totalSec = Math.floor(remainingMs / 1000);
      var hours = Math.floor(totalSec / 3600);
      var mins = Math.floor((totalSec % 3600) / 60);
      var secs = totalSec % 60;

      badgeEl.className = 'sticky-badge-sale';
      badgeEl.textContent = '기간한정 할인';

      timerTextEl.textContent = hours + '시간' + pad(mins) + '분' + pad(secs) + '초';
      timerTextEl.style.color = '#9f1239';

      if (priceOriginEl) {
        priceOriginEl.style.display = 'inline';
        priceOriginEl.textContent = courseData.originPrice;
      }
      if (priceSaleEl) {
        priceSaleEl.textContent = courseData.salePrice;
      }
    } else {
      var remainingMs = CYCLE_MS - elapsed;
      var totalSec = Math.floor(remainingMs / 1000);
      var mins = Math.floor(totalSec / 60);
      var secs = totalSec % 60;

      badgeEl.className = 'sticky-badge-normal';
      badgeEl.textContent = '정상가 판매 중';

      timerTextEl.textContent = pad(mins) + '분' + pad(secs) + '초 후 할인가 재개';
      timerTextEl.style.color = '#1e293b';

      if (priceOriginEl) {
        priceOriginEl.style.display = 'none';
      }
      if (priceSaleEl) {
        priceSaleEl.textContent = courseData.originPrice;
      }
    }
  };

  window.updateStickyTimerGlobal();
  setInterval(window.updateStickyTimerGlobal, 1000);
}

document.addEventListener('DOMContentLoaded', function() {
  initStickyTimer();
});
</script>
`;

if (!html.includes('function initStickyTimer()')) {
  const bodyClose = `</body>`;
  html = html.replace(bodyClose, jsStickyScript + '\n' + bodyClose);
}

fs.writeFileSync(masterPath, html, 'utf8');
console.log('Updated:', masterPath);

fs.writeFileSync(aliasPath1, html, 'utf8');
console.log('Updated:', aliasPath1);

fs.writeFileSync(aliasPath2, html, 'utf8');
console.log('Updated:', aliasPath2);
