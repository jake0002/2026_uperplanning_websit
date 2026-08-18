const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'implementation');

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const targetHtmlFiles = [
  path.join(baseDir, 'ux-blog.html'),
  path.join(baseDir, 'ux_blog.html'),
  ...getFiles(path.join(baseDir, 'ux-blog'))
];

const scrollTopCss = `
    /* RETRO BACK TO TOP ANCHOR BUTTON (EXACT UX-RESEARCH MATCH) */
    #scrollTopBtn {
      position: fixed !important;
      bottom: 48px !important;
      right: 20px !important;
      z-index: 999999 !important;
      background: #c0c0c0 !important;
      color: #000000 !important;
      border: 2px solid #000000 !important;
      box-shadow: inset 1px 1px 0 #ffffff, inset -1px -1px 0 #7b7b7b, 2px 2px 0 rgba(0,0,0,0.35) !important;
      padding: 6px 14px !important;
      font-weight: bold !important;
      font-size: 12px !important;
      font-family: var(--font, sans-serif) !important;
      cursor: pointer !important;
      display: none;
      align-items: center !important;
      gap: 5px !important;
      user-select: none !important;
    }
    #scrollTopBtn:hover {
      background: #dfdfdf !important;
    }
    #scrollTopBtn:active {
      box-shadow: inset 1px 1px 0 #7b7b7b !important;
      transform: translate(1px, 1px) !important;
    }
    @media (max-width: 900px) {
      #scrollTopBtn {
        display: none !important;
      }
    }
`;

const scrollTopHtmlJs = `
  <!-- RETRO BACK TO TOP ANCHOR BUTTON (EXACT UX-RESEARCH MATCH) -->
  <button id="scrollTopBtn" title="페이지 최상단으로 이동" aria-label="위로 가기" onclick="window.scrollTo({top:0, behavior:'smooth'});">
    <span>▲</span> <span>TOP</span>
  </button>
  <script>
    (function() {
      function initScrollTopBtn() {
        const scrollTopBtn = document.getElementById('scrollTopBtn');
        if (scrollTopBtn) {
          const updateVisibility = () => {
            if (window.innerWidth > 900) {
              scrollTopBtn.style.display = (window.scrollY > 80) ? 'inline-flex' : 'none';
            } else {
              scrollTopBtn.style.display = 'none';
            }
          };
          window.addEventListener('scroll', updateVisibility, { passive: true });
          window.addEventListener('resize', updateVisibility, { passive: true });
          updateVisibility();
        }
      }
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollTopBtn);
      } else {
        initScrollTopBtn();
      }
    })();
  </script>
`;

targetHtmlFiles.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Inject CSS before </style> if not already present
  if (!content.includes('#scrollTopBtn')) {
    content = content.replace('</style>', `${scrollTopCss.trim()}\n  </style>`);
  }

  // 2. Inject HTML & JS before </body> if not already present
  if (!content.includes('id="scrollTopBtn"')) {
    content = content.replace('</body>', `${scrollTopHtmlJs.trim()}\n</body>`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Added #scrollTopBtn to:', path.relative(baseDir, filePath));
});

// Update generator script as well
const genScriptPath = path.join(__dirname, 'generate_standalone_post_pages.js');
if (fs.existsSync(genScriptPath)) {
  let content = fs.readFileSync(genScriptPath, 'utf8');
  if (!content.includes('#scrollTopBtn')) {
    content = content.replace('</style>', `${scrollTopCss.trim()}\n  </style>`);
    content = content.replace('</body>', `${scrollTopHtmlJs.trim()}\n</body>`);
  }
  fs.writeFileSync(genScriptPath, content, 'utf8');
  console.log('Updated generate_standalone_post_pages.js with #scrollTopBtn template');
}

console.log('ALL UX BLOG PAGES UPDATED WITH BACK TO TOP ANCHOR BUTTON (#scrollTopBtn)!');
