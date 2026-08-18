const fs = require('fs');
const path = require('path');

const targetSubpages = [
  'implementation/ux-research/index.html',
  'implementation/ux-writing/index.html',
  'implementation/ux-design/index.html',
  'implementation/web-app-development/index.html',
  'implementation/ux-academy/index.html',
  'implementation/ux-company/index.html'
];

targetSubpages.forEach(filePath => {
  const absolutePath = path.resolve(filePath);
  if (!fs.existsSync(absolutePath)) {
    console.log('File not found:', filePath);
    return;
  }

  let content = fs.readFileSync(absolutePath, 'utf8');

  // 1. Ensure first tree-link in <ul class="tree-list toc"> has 'active' class by default
  const tocUlRegex = /<ul class="tree-list toc">([\s\S]*?)<\/ul>/;
  const tocMatch = content.match(tocUlRegex);
  if (tocMatch) {
    let tocInner = tocMatch[1];
    // Replace first occurrence of class="tree-link" with class="tree-link active" if not active
    if (!tocInner.includes('tree-link active')) {
      tocInner = tocInner.replace('class="tree-link"', 'class="tree-link active"');
      content = content.replace(tocMatch[1], tocInner);
    }
  }

  // 2. Ensure CSS for .tree-item a:hover and .tree-item a.active has black background, white text, bold font
  const cssRegex = /\.tree-item a:hover, \.tree-item a\.active\s*\{[\s\S]*?\}/g;
  content = content.replace(cssRegex, `.tree-item a:hover, .tree-item a.active {
      background: #000000 !important;
      color: #ffffff !important;
      font-weight: 700 !important;
    }`);

  // 3. Update the scroll and click handler script for TOC
  const oldScriptRegex = /\/\/ Highlight active tree item on scroll[\s\S]*?\}\);/g;
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

  if (oldScriptRegex.test(content)) {
    content = content.replace(oldScriptRegex, newScript);
  }

  fs.writeFileSync(absolutePath, content, 'utf8');
  console.log('Updated:', filePath);

  // Sync alias files if present
  const dir = path.dirname(filePath);
  const baseFolder = path.basename(dir);
  if (baseFolder !== 'implementation') {
    const aliasHtml = path.join('implementation', baseFolder + '.html');
    const aliasUnderscoreHtml = path.join('implementation', baseFolder.replace(/-/g, '_') + '.html');

    if (fs.existsSync(aliasHtml)) {
      fs.writeFileSync(aliasHtml, content, 'utf8');
      console.log('Synced alias:', aliasHtml);
    }
    if (fs.existsSync(aliasUnderscoreHtml)) {
      fs.writeFileSync(aliasUnderscoreHtml, content, 'utf8');
      console.log('Synced alias:', aliasUnderscoreHtml);
    }
  }
});
