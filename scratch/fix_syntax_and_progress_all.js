const fs = require('fs');
const path = require('path');

const files = [
  'ux-research/index.html', 'ux-research.html', 'ux_research.html',
  'ux-writing/index.html', 'ux-writing.html', 'ux_writing.html',
  'ux-design/index.html', 'ux-design.html', 'ux_design.html',
  'web-app-development/index.html', 'web-app-development.html', 'app_dev/index.html', 'app_dev.html',
  'ux-academy/index.html', 'ux-academy.html', 'ux_academy.html',
  'ux-company/index.html', 'ux-company.html', 'ux_company.html', 'company/index.html', 'company.html',
  'contact/index.html', 'contact.html'
];

const cleanBlock = `    // Highlight active tree item on scroll & click
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
    });

    // GNB Scroll Progress Gauge Handler (Exact Main Page Copy)
    let scrollTimer = null;
    function updateGnbScrollProgress() {
      const progressBar = document.getElementById('gnbProgressBar');
      const progressBadge = document.getElementById('gnbProgressBadge');
      if (!progressBar) return;

      // 1. Window scroll calculation
      const winScroll = Math.max(0, window.pageYOffset || window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0);
      const winDocHeight = Math.max(
        document.body.scrollHeight || 0,
        document.documentElement.scrollHeight || 0,
        document.body.offsetHeight || 0,
        document.documentElement.offsetHeight || 0
      );
      const winViewport = window.innerHeight || document.documentElement.clientHeight || 0;
      const winMaxScroll = Math.max(0, winDocHeight - winViewport);
      const winRatio = winMaxScroll > 5 ? (winScroll / winMaxScroll) : 0;

      // 2. Main content pane scroll calculation
      const mainPane = document.querySelector('.main-content-pane');
      let paneRatio = 0;
      let paneScroll = 0;
      if (mainPane) {
        paneScroll = mainPane.scrollTop || 0;
        const paneMaxScroll = Math.max(0, mainPane.scrollHeight - mainPane.clientHeight);
        if (paneMaxScroll > 5) {
          paneRatio = paneScroll / paneMaxScroll;
        }
      }

      // 3. Take active max scroll ratio & current scroll
      const activeRatio = Math.max(winRatio, paneRatio);
      const activeScroll = Math.max(winScroll, paneScroll);

      // 4. Compute final percentage
      const scrolled = Math.min(100, Math.max(0, activeRatio * 100));

      // 5. Update DOM
      progressBar.style.width = scrolled + '%';
      if (progressBadge) {
        progressBadge.textContent = Math.round(scrolled) + '%';
      }

      // 6. Active scrolling badge visibility timer (1200ms auto-fade, identical to main page)
      if (activeScroll > 10) {
        document.body.classList.add('is-scrolling');
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          document.body.classList.remove('is-scrolling');
        }, 1200);
      } else {
        document.body.classList.remove('is-scrolling');
      }
    }

    // Attach listeners to window, document, and main pane
    window.addEventListener('scroll', updateGnbScrollProgress, { passive: true, capture: true });
    window.addEventListener('resize', updateGnbScrollProgress, { passive: true });
    document.addEventListener('scroll', updateGnbScrollProgress, { passive: true, capture: true });

    const mainPaneEl = document.querySelector('.main-content-pane');
    if (mainPaneEl) {
      mainPaneEl.addEventListener('scroll', updateGnbScrollProgress, { passive: true });
    }

    // Fire initial update and heartbeat timer fallback
    updateGnbScrollProgress();
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', updateGnbScrollProgress);
    }
    window.addEventListener('load', updateGnbScrollProgress);
    setTimeout(updateGnbScrollProgress, 200);
    setTimeout(updateGnbScrollProgress, 800);
    setInterval(updateGnbScrollProgress, 250);

    setInterval(() => {
      const d = new Date();
      const clockEl = document.getElementById('taskClock');
      if (clockEl) {
        clockEl.textContent = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      }
    }, 1000);`;

files.forEach(f => {
  const fullPath = path.join(__dirname, '..', 'implementation', f);
  if (!fs.existsSync(fullPath)) return;

  let content = fs.readFileSync(fullPath, 'utf8');

  // Replace from "// Highlight active tree item" down to before "</script>"
  const targetRegex = /\/\/ Highlight active tree item[\s\S]*?(?=<\/script>)/;
  if (targetRegex.test(content)) {
    content = content.replace(targetRegex, cleanBlock + '\n  ');
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log('Fixed script block in:', f);
  } else {
    console.warn('Could not find target block in:', f);
  }
});
