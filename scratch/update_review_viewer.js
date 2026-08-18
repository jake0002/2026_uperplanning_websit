const fs = require('fs');

const masterPath = 'implementation/ux-academy/index.html';
const aliasPath1 = 'implementation/ux-academy.html';
const aliasPath2 = 'implementation/ux_academy.html';

let html = fs.readFileSync(masterPath, 'utf8');

// 1. Add CSS for review-inline-viewer
const cssInsertion = `
    /* Review Image Viewer (Matching User Reference Image) */
    .review-inline-viewer {
      background: #ffffff !important;
      border: 1px solid #e2e8f0 !important;
      border-radius: 12px !important;
      padding: 20px 16px 16px 16px !important;
      margin: 24px auto !important;
      max-width: 880px !important;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04) !important;
      box-sizing: border-box !important;
    }
    .review-inline-stage {
      position: relative !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      width: 100% !important;
      min-height: 240px !important;
    }
    .review-inline-arrow {
      position: absolute !important;
      top: 50% !important;
      transform: translateY(-50%) !important;
      z-index: 10 !important;
      width: 34px !important;
      height: 38px !important;
      background: #ffffff !important;
      border: 1px solid #cbd5e1 !important;
      border-radius: 8px !important;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08) !important;
      color: #334155 !important;
      font-size: 18px !important;
      font-weight: bold !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      transition: all 0.15s ease !important;
      outline: none !important;
    }
    .review-inline-arrow:hover {
      background: #f8fafc !important;
      border-color: #94a3b8 !important;
      color: #0f172a !important;
    }
    .review-inline-arrow.prev {
      left: 6px !important;
    }
    .review-inline-arrow.next {
      right: 6px !important;
    }
    .review-inline-viewport {
      width: 100% !important;
      padding: 0 46px !important;
      box-sizing: border-box !important;
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
    }
    .review-inline-slide {
      display: none;
      width: 100% !important;
      text-align: center !important;
    }
    .review-inline-slide.is-active {
      display: block !important;
      animation: reviewFadeIn 0.25s ease-in-out !important;
    }
    @keyframes reviewFadeIn {
      from { opacity: 0.4; }
      to { opacity: 1; }
    }
    .review-inline-slide img {
      max-width: 100% !important;
      max-height: 520px !important;
      height: auto !important;
      display: block !important;
      margin: 0 auto !important;
      border-radius: 6px !important;
      object-fit: contain !important;
    }
    .review-inline-controls {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 8px !important;
      margin-top: 16px !important;
    }
    .review-inline-pagination {
      display: flex !important;
      align-items: center !important;
      gap: 6px !important;
    }
    .review-inline-page {
      width: 24px !important;
      height: 24px !important;
      border-radius: 3px !important;
      border: none !important;
      background: #94a3b8 !important;
      color: #ffffff !important;
      font-size: 13px !important;
      font-weight: 700 !important;
      line-height: 24px !important;
      padding: 0 !important;
      text-align: center !important;
      cursor: pointer !important;
      transition: background 0.15s ease !important;
      outline: none !important;
    }
    .review-inline-page:hover {
      background: #64748b !important;
    }
    .review-inline-page.is-active {
      background: #334155 !important;
      font-weight: 800 !important;
    }
    .review-inline-toggle {
      width: 26px !important;
      height: 26px !important;
      border-radius: 50% !important;
      border: 1.5px solid #475569 !important;
      background: #ffffff !important;
      color: #334155 !important;
      font-size: 11px !important;
      font-weight: bold !important;
      padding: 0 !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      cursor: pointer !important;
      transition: all 0.15s ease !important;
      outline: none !important;
    }
    .review-inline-toggle:hover {
      background: #f1f5f9 !important;
      border-color: #1e293b !important;
      color: #0f172a !important;
    }
`;

if (!html.includes('.review-inline-viewer {')) {
  const cssAnchor = `.review-copy-lead {`;
  html = html.replace(cssAnchor, cssInsertion + '\n    ' + cssAnchor);
}

// 2. Update Pagination HTML to have 7 page buttons (matching 7 slides)
const oldPagination = `<div class="review-inline-pagination" id="review-inline-pagination">
                  <button class="review-inline-page is-active" type="button" data-review-page="0" aria-label="후기 1 보기">1</button><button class="review-inline-page" type="button" data-review-page="1" aria-label="후기 2 보기">2</button><button class="review-inline-page" type="button" data-review-page="2" aria-label="후기 3 보기">3</button><button class="review-inline-page" type="button" data-review-page="3" aria-label="후기 4 보기">4</button><button class="review-inline-page" type="button" data-review-page="4" aria-label="후기 5 보기">5</button><button class="review-inline-page" type="button" data-review-page="5" aria-label="후기 6 보기">6</button>
                </div>`;

const newPagination = `<div class="review-inline-pagination" id="review-inline-pagination">
                  <button class="review-inline-page is-active" type="button" data-review-page="0" aria-label="후기 1 보기">1</button>
                  <button class="review-inline-page" type="button" data-review-page="1" aria-label="후기 2 보기">2</button>
                  <button class="review-inline-page" type="button" data-review-page="2" aria-label="후기 3 보기">3</button>
                  <button class="review-inline-page" type="button" data-review-page="3" aria-label="후기 4 보기">4</button>
                  <button class="review-inline-page" type="button" data-review-page="4" aria-label="후기 5 보기">5</button>
                  <button class="review-inline-page" type="button" data-review-page="5" aria-label="후기 6 보기">6</button>
                  <button class="review-inline-page" type="button" data-review-page="6" aria-label="후기 7 보기">7</button>
                </div>`;

if (html.includes(oldPagination)) {
  html = html.replace(oldPagination, newPagination);
}

// 3. Add JS script for Review Viewer
const jsBlock = `
  <!-- REVIEW VIEWER AUTO-ROLLING SCRIPT (1 SECOND INTERVAL) -->
  <script>
    (function initReviewViewer() {
      function setup() {
        const viewer = document.getElementById('review-inline-viewer');
        if (!viewer) return;

        const slides = viewer.querySelectorAll('.review-inline-slide');
        const pages = viewer.querySelectorAll('.review-inline-page');
        const prevBtn = document.getElementById('review-inline-prev');
        const nextBtn = document.getElementById('review-inline-next');
        const toggleBtn = document.getElementById('review-inline-toggle');

        if (!slides.length) return;

        let currentIndex = 0;
        let isPlaying = true;
        let timerId = null;

        function showSlide(index) {
          currentIndex = (index + slides.length) % slides.length;
          
          slides.forEach((slide, idx) => {
            if (idx === currentIndex) {
              slide.classList.add('is-active');
            } else {
              slide.classList.remove('is-active');
            }
          });

          pages.forEach((page, idx) => {
            if (idx === currentIndex) {
              page.classList.add('is-active');
            } else {
              page.classList.remove('is-active');
            }
          });
        }

        function startTimer() {
          stopTimer();
          isPlaying = true;
          if (toggleBtn) {
            toggleBtn.classList.remove('is-paused');
            toggleBtn.classList.add('is-playing');
            toggleBtn.innerHTML = '❚❚';
            toggleBtn.setAttribute('aria-label', '일시정지');
          }
          timerId = setInterval(() => {
            showSlide(currentIndex + 1);
          }, 1000); // 1초 마다 자동 롤링
        }

        function stopTimer() {
          if (timerId) {
            clearInterval(timerId);
            timerId = null;
          }
          isPlaying = false;
          if (toggleBtn) {
            toggleBtn.classList.remove('is-playing');
            toggleBtn.classList.add('is-paused');
            toggleBtn.innerHTML = '▶';
            toggleBtn.setAttribute('aria-label', '시작');
          }
        }

        function togglePlay() {
          if (isPlaying) {
            stopTimer();
          } else {
            startTimer();
          }
        }

        if (prevBtn) {
          prevBtn.addEventListener('click', () => {
            showSlide(currentIndex - 1);
            if (isPlaying) startTimer();
          });
        }

        if (nextBtn) {
          nextBtn.addEventListener('click', () => {
            showSlide(currentIndex + 1);
            if (isPlaying) startTimer();
          });
        }

        pages.forEach((page, idx) => {
          page.addEventListener('click', () => {
            showSlide(idx);
            if (isPlaying) startTimer();
          });
        });

        if (toggleBtn) {
          toggleBtn.addEventListener('click', togglePlay);
        }

        showSlide(0);
        startTimer();
      }

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setup);
      } else {
        setup();
      }
    })();
  </script>
`;

if (!html.includes('initReviewViewer')) {
  const closingBody = '</body>';
  html = html.replace(closingBody, jsBlock + '\n' + closingBody);
}

fs.writeFileSync(masterPath, html, 'utf8');
console.log('Updated:', masterPath);

fs.writeFileSync(aliasPath1, html, 'utf8');
console.log('Updated:', aliasPath1);

fs.writeFileSync(aliasPath2, html, 'utf8');
console.log('Updated:', aliasPath2);
