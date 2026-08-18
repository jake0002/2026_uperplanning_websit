const fs = require('fs');

const masterPath = 'implementation/ux-academy/index.html';
const aliasPath1 = 'implementation/ux-academy.html';
const aliasPath2 = 'implementation/ux_academy.html';

let html = fs.readFileSync(masterPath, 'utf8');

// 1. CSS for typewriter-quote
const cssAddition = `
    /* Typewriter Quote Styling (Matching UX-Company) */
    .typewriter-quote {
      border-right: 2px solid #ffffff;
      white-space: normal;
      word-break: keep-all;
    }
    .typewriter-quote.is-typing {
      animation: spCaretBlink 0.8s step-end infinite;
    }
    .typewriter-quote.is-done {
      border-right-color: transparent;
      animation: none;
    }
    @keyframes spCaretBlink {
      0%, 49% { border-right-color: #ffffff; }
      50%, 100% { border-right-color: transparent; }
    }
`;

if (!html.includes('.typewriter-quote {')) {
  const cssAnchor = `</style>`;
  html = html.replace(cssAnchor, cssAddition + '\n' + cssAnchor);
}

// 2. JS for typewriter-quote
const jsAddition = `
  <!-- TYPEWRITER ANIMATION SCRIPT (MATCHING UX-COMPANY) -->
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
  </script>
`;

if (!html.includes('runTypewriter')) {
  const closingBody = '</body>';
  html = html.replace(closingBody, jsAddition + '\n' + closingBody);
}

// 3. Move text above figure and wrap in typewriter span
const oldLead = `<p class="lead">슈퍼플래닝의 UX강의는 UX리서치, UX라이팅, 서비스기획, 피그마, AI 활용 UX실무, 바이브코딩까지 실제 웹·앱 프로젝트 흐름에 맞춰 연결하는 실무형 교육입니다.</p>`;

const typewriterHtml = `
          <p class="lead-typewriter-wrap" style="margin: 18px 0 20px 0;">
            <span class="typewriter-quote" data-text="슈퍼플래닝의 UX강의는 UX리서치, UX라이팅, 서비스기획, 피그마, AI 활용 UX실무, 바이브코딩까지 실제 웹·앱 프로젝트 흐름에 맞춰 연결하는 실무형 교육입니다." style="display:inline; padding:6px 10px 7px 10px; color:#ffffff; background:#000000; border:2px solid #000000; box-decoration-break:clone; -webkit-box-decoration-break:clone; font-size:14.5px; line-height:1.7; font-weight:600; word-break:keep-all;"></span>
          </p>`;

// Remove oldLead from below figure if present
if (html.includes(oldLead)) {
  html = html.replace(oldLead, '');
}

// Place typewriterHtml right under <h2 id="intro">1. AI-UX강의소개</h2>
const h2Target = `<h2 id="intro">1. AI-UX강의소개</h2>`;
if (html.includes(h2Target) && !html.includes('lead-typewriter-wrap')) {
  html = html.replace(h2Target, h2Target + '\n' + typewriterHtml);
}

fs.writeFileSync(masterPath, html, 'utf8');
console.log('Updated:', masterPath);

fs.writeFileSync(aliasPath1, html, 'utf8');
console.log('Updated:', aliasPath1);

fs.writeFileSync(aliasPath2, html, 'utf8');
console.log('Updated:', aliasPath2);
