const fs = require('fs');

const masterPath = 'implementation/ux-academy/index.html';
const aliasPath1 = 'implementation/ux-academy.html';
const aliasPath2 = 'implementation/ux_academy.html';

let html = fs.readFileSync(masterPath, 'utf8');

// 1. Update CSS for .typewriter-quote to support multiline white-space: pre-line
const oldCss = `    .typewriter-quote {
      border-right: 2px solid #ffffff;
      white-space: normal;
      word-break: keep-all;
    }`;

const newCss = `    .typewriter-quote {
      border-right: 2px solid #ffffff;
      white-space: pre-line;
      word-break: keep-all;
    }`;

if (html.includes(oldCss)) {
  html = html.replace(oldCss, newCss);
}

// 2. Replace section 2 review lead text with typewriter quote box
const oldReviewLead = `<p class="review-copy-lead">IT를 몰라도 UX기획은 누구나 할 수 있습니다.<br/>입문자들이 가장 많이 선택한 AI-UX강의 1위!<br/>UX교육 최다 후기 달성<br/>오직 강의 후기만으로 검증 합니다.</p>`;

const newReviewTypewriter = `
          <p class="typewriter-review-wrap" style="margin: 16px 0 20px 0;">
            <span class="typewriter-quote" data-text="IT를 몰라도 UX기획은 누구나 할 수 있습니다.&#10;입문자들이 가장 많이 선택한 AI-UX강의 1위!&#10;UX교육 최다 후기 달성&#10;오직 강의 후기만으로 검증 합니다." style="display:inline-block; padding:8px 12px; color:#ffffff; background:#000000; border:2px solid #000000; border-radius:4px; box-decoration-break:clone; -webkit-box-decoration-break:clone; font-size:14px; line-height:1.7; font-weight:600; word-break:keep-all;"></span>
          </p>`;

if (html.includes(oldReviewLead)) {
  html = html.replace(oldReviewLead, newReviewTypewriter);
} else {
  console.log('WARNING: oldReviewLead not matched!');
}

// 3. Update JS for typewriter to use IntersectionObserver for smooth scroll trigger
const oldJsScript = `  <!-- TYPEWRITER ANIMATION SCRIPT (MATCHING UX-COMPANY) -->
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      function runTypewriter(el, startDelay) {
        if (!el || el.dataset.typed === 'done' || el.dataset.typed === 'running') return;

        const fullText = el.dataset.text || '';
        el.dataset.typed = 'running';
        el.textContent = '';
        el.classList.remove('is-done');
        el.classList.add('is-typing');

        let i = 0;
        const speed = 35;

        setTimeout(function typeNext() {
          if (i < fullText.length) {
            el.textContent += fullText.charAt(i);
            i += 1;
            setTimeout(typeNext, speed);
          } else {
            el.classList.remove('is-typing');
            el.classList.add('is-done');
            el.dataset.typed = 'done';
          }
        }, startDelay || 0);
      }

      const immediateQuotes = document.querySelectorAll('.typewriter-quote:not([data-typewriter-trigger])');
      immediateQuotes.forEach((el, index) => {
        runTypewriter(el, index * 300);
      });
    });
  </script>`;

const newJsScript = `  <!-- TYPEWRITER ANIMATION SCRIPT (MATCHING UX-COMPANY) -->
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      function runTypewriter(el, startDelay) {
        if (!el || el.dataset.typed === 'done' || el.dataset.typed === 'running') return;

        const fullText = el.dataset.text || '';
        el.dataset.typed = 'running';
        el.textContent = '';
        el.classList.remove('is-done');
        el.classList.add('is-typing');

        let i = 0;
        const speed = 35;

        setTimeout(function typeNext() {
          if (i < fullText.length) {
            el.textContent += fullText.charAt(i);
            i += 1;
            setTimeout(typeNext, speed);
          } else {
            el.classList.remove('is-typing');
            el.classList.add('is-done');
            el.dataset.typed = 'done';
          }
        }, startDelay || 0);
      }

      const quotes = document.querySelectorAll('.typewriter-quote');
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              runTypewriter(entry.target, 100);
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1 });

        quotes.forEach(el => observer.observe(el));
      } else {
        quotes.forEach((el, idx) => runTypewriter(el, idx * 350));
      }
    });
  </script>`;

if (html.includes(oldJsScript)) {
  html = html.replace(oldJsScript, newJsScript);
}

fs.writeFileSync(masterPath, html, 'utf8');
console.log('Updated:', masterPath);

fs.writeFileSync(aliasPath1, html, 'utf8');
console.log('Updated:', aliasPath1);

fs.writeFileSync(aliasPath2, html, 'utf8');
console.log('Updated:', aliasPath2);
