const fs = require('fs');
const path = require('path');

const pageConfig = [
  {
    path: 'implementation/ux-research/index.html',
    titleName: 'UX 리서치',
    aliases: ['implementation/ux-research.html', 'implementation/ux_research.html']
  },
  {
    path: 'implementation/ux-writing/index.html',
    titleName: 'UX 라이팅',
    aliases: ['implementation/ux-writing.html', 'implementation/ux_writing.html']
  },
  {
    path: 'implementation/ux-design/index.html',
    titleName: 'UX 기획/디자인',
    aliases: ['implementation/ux-design.html', 'implementation/ux_design.html']
  },
  {
    path: 'implementation/web-app-development/index.html',
    titleName: '웹/앱 개발',
    aliases: ['implementation/web-app-development.html', 'implementation/app_dev.html']
  },
  {
    path: 'implementation/ux-academy/index.html',
    titleName: 'AI-UX 강의',
    aliases: ['implementation/ux-academy.html', 'implementation/ux_academy.html']
  },
  {
    path: 'implementation/ux-company/index.html',
    titleName: '회사소개',
    aliases: ['implementation/ux-company.html', 'implementation/ux_company.html', 'implementation/company.html']
  },
  {
    path: 'implementation/contact/index.html',
    titleName: '문의하기',
    aliases: ['implementation/contact.html']
  }
];

pageConfig.forEach(item => {
  const filePath = path.resolve(item.path);
  if (!fs.existsSync(filePath)) {
    console.log('File missing:', item.path);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  const fullTitleText = `슈퍼플래닝 서비스 탐색기 — ${item.titleName}`;

  // 1. Update .titlebar CSS background to #000000
  content = content.replace(
    /\.titlebar\s*\{[\s\S]*?\}/g,
    `.titlebar {
      background: #000000;
      color: #ffffff;
      padding: 4px 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: bold;
      font-size: 13px;
      border-bottom: 2px solid #000000;
      user-select: none;
    }`
  );

  // 2. Update popup title bar inline style in openWindow JS
  content = content.replace(
    /background:#000080;\s*color:#fff;/g,
    'background:#000000; color:#ffffff;'
  );
  content = content.replace(
    /background:\s*#000080;\s*color:\s*#fff;/g,
    'background:#000000; color:#ffffff;'
  );
  content = content.replace(
    /background:#000080;\s*color:#ffffff;/g,
    'background:#000000; color:#ffffff;'
  );

  // 3. Update Titlebar Header Text in HTML
  const titlebarTextRegex = /<div class=["']titlebar-text["']>[\s\S]*?<\/div>/;
  const newTitlebarHtml = `<div class="titlebar-text">
          <span>📁</span>
          <span>${fullTitleText}</span>
        </div>`;
  if (titlebarTextRegex.test(content)) {
    content = content.replace(titlebarTextRegex, newTitlebarHtml);
  }

  // 4. Update fallback title in openWindow JS
  content = content.replace(
    /var def = WINDOW_DEFS\[key\] \|\| \{ w: \d+, h: \d+, title: ['"][^'"]*['"] \};/,
    `var def = WINDOW_DEFS[key] || { w: 600, h: 480, title: '📁 ${fullTitleText}' };`
  );

  // 5. Ensure TOC Item 1 has 'tree-link active'
  const tocUlRegex = /<ul class="tree-list toc">([\s\S]*?)<\/ul>/;
  const tocMatch = content.match(tocUlRegex);
  if (tocMatch) {
    let tocInner = tocMatch[1];
    // Remove active from any other item first if needed
    tocInner = tocInner.replace(/class="tree-link active"/g, 'class="tree-link"');
    // Add active to the first tree-link
    tocInner = tocInner.replace('class="tree-link"', 'class="tree-link active"');
    content = content.replace(tocMatch[1], tocInner);
  }

  // 6. Update CSS for .tree-item a:hover and .tree-item a.active
  const cssTreeLinkHoverRegex = /\.tree-item a:hover, \.tree-item a\.active\s*\{[\s\S]*?\}/g;
  if (cssTreeLinkHoverRegex.test(content)) {
    content = content.replace(cssTreeLinkHoverRegex, `.tree-item a:hover, .tree-item a.active {
      background: #000000 !important;
      color: #ffffff !important;
      font-weight: 700 !important;
    }`);
  }

  // 7. Update JS scroll & click handler
  const oldScriptRegex = /\/\/ Highlight active tree item on scroll[\s\S]*?\}\);/g;
  const oldScriptRegex2 = /\/\/ Highlight active tree item on scroll & click[\s\S]*?\}\);/g;

  const newScript = `// Highlight active tree item on scroll & click
    document.addEventListener('DOMContentLoaded', () => {
      const sections = document.querySelectorAll('main h2[id]');
      const navLinks = document.querySelectorAll('.tree-link');

      function updateActiveToc() {
        if (!sections.length || !navLinks.length) return;

        const scrollPosition = window.scrollY || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const fullHeight = Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight
        );

        let current = '';

        if (scrollPosition + windowHeight >= fullHeight - 50) {
          const lastSec = sections[sections.length - 1];
          if (lastSec) current = lastSec.getAttribute('id');
        } else {
          sections.forEach(section => {
            const sectionTop = section.offsetTop - 130;
            if (scrollPosition >= sectionTop) {
              current = section.getAttribute('id');
            }
          });
        }

        if (!current && sections.length > 0) {
          current = sections[0].getAttribute('id');
        }

        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === '#' + current) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }

      navLinks.forEach(link => {
        link.addEventListener('click', function() {
          navLinks.forEach(l => l.classList.remove('active'));
          this.classList.add('active');
        });
      });

      window.addEventListener('scroll', updateActiveToc, { passive: true });
      window.addEventListener('resize', updateActiveToc, { passive: true });
      updateActiveToc();
    });`;

  if (oldScriptRegex2.test(content)) {
    content = content.replace(oldScriptRegex2, newScript);
  } else if (oldScriptRegex.test(content)) {
    content = content.replace(oldScriptRegex, newScript);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully updated main file:', item.path);

  // Sync all alias files
  if (item.aliases && item.aliases.length > 0) {
    item.aliases.forEach(alias => {
      const aliasPath = path.resolve(alias);
      fs.writeFileSync(aliasPath, content, 'utf8');
      console.log('  Synced alias:', alias);
    });
  }
});
