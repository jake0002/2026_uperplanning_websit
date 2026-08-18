const fs = require('fs');
const path = require('path');

const pageConfig = [
  { path: 'implementation/ux-research/index.html', aliases: ['implementation/ux-research.html', 'implementation/ux_research.html'] },
  { path: 'implementation/ux-writing/index.html', aliases: ['implementation/ux-writing.html', 'implementation/ux_writing.html', 'implementation/ux-writing/Superplanning-UX-Writing-Explorer-v14-patent-caption-edited-v3.html'] },
  { path: 'implementation/ux-design/index.html', aliases: ['implementation/ux-design.html', 'implementation/ux_design.html'] },
  { path: 'implementation/web-app-development/index.html', aliases: ['implementation/web-app-development.html', 'implementation/app_dev.html', 'implementation/app_dev/index.html'] },
  { path: 'implementation/ux-academy/index.html', aliases: ['implementation/ux-academy.html', 'implementation/ux_academy.html'] },
  { path: 'implementation/ux-company/index.html', aliases: ['implementation/ux-company.html', 'implementation/ux_company.html', 'implementation/company.html', 'implementation/company/index.html'] },
  { path: 'implementation/contact/index.html', aliases: ['implementation/contact.html'] }
];

const newProgressScript = `// GNB Scroll Progress Gauge Handler
      const progressBar = document.getElementById('gnbProgressBar');
      const progressBadge = document.getElementById('gnbProgressBadge');
      let scrollTimer = null;

      function updateGnbScrollProgress() {
        if (!progressBar) return;

        const mainPane = document.querySelector('.main-content-pane');
        const winScroll = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
        const paneScroll = mainPane ? mainPane.scrollTop : 0;
        const currentScroll = Math.max(winScroll, paneScroll);

        const docHeight = Math.max(
          document.documentElement.scrollHeight,
          document.body.scrollHeight,
          mainPane ? mainPane.scrollHeight : 0
        );
        const winHeight = window.innerHeight || document.documentElement.clientHeight;
        const paneHeight = mainPane ? mainPane.clientHeight : winHeight;
        const totalScrollable = Math.max(docHeight - winHeight, (mainPane ? mainPane.scrollHeight - paneHeight : 0));

        let scrolled = 0;
        if (totalScrollable > 0) {
          scrolled = Math.min(100, Math.max(0, (currentScroll / totalScrollable) * 100));
        } else {
          scrolled = 100;
        }

        progressBar.style.width = scrolled + '%';
        if (progressBadge) {
          progressBadge.textContent = Math.round(scrolled) + '%';
        }

        if (currentScroll > 10) {
          document.body.classList.add('is-scrolling');
          clearTimeout(scrollTimer);
          scrollTimer = setTimeout(() => {
            document.body.classList.remove('is-scrolling');
          }, 1200);
        } else {
          document.body.classList.remove('is-scrolling');
        }
      }

      window.addEventListener('scroll', updateGnbScrollProgress, { passive: true });
      window.addEventListener('resize', updateGnbScrollProgress, { passive: true });
      const mainPaneEl = document.querySelector('.main-content-pane');
      if (mainPaneEl) {
        mainPaneEl.addEventListener('scroll', updateGnbScrollProgress, { passive: true });
      }
      updateGnbScrollProgress();`;

const oldProgressRegex = /\/\/ GNB Scroll Progress Gauge Handler[\s\S]*?updateGnbScrollProgress\(\);/;

pageConfig.forEach(item => {
  const filePath = path.resolve(item.path);
  if (!fs.existsSync(filePath)) {
    console.log('File missing:', item.path);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  if (oldProgressRegex.test(content)) {
    content = content.replace(oldProgressRegex, newProgressScript);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated progress handler in main file:', item.path);

    if (item.aliases && item.aliases.length > 0) {
      item.aliases.forEach(alias => {
        const aliasPath = path.resolve(alias);
        const dir = path.dirname(aliasPath);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(aliasPath, content, 'utf8');
        console.log('  Synced progress handler in alias file:', alias);
      });
    }
  } else {
    console.log('Progress regex did not match in:', item.path);
  }
});
