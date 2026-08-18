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

const allHtmlFiles = getFiles(baseDir);

const subpageWindowScript = `
    // SUBPAGE WINDOW MODAL SYSTEM (PORTFOLIO VIEWER)
    const WINDOW_DEFS = {
      'brochure': { w: 780, h: 560, title: '📄 포트폴리오 보기' }
    };

    function openWindow(key) {
      if (typeof closeStart === 'function') closeStart();
      var def = WINDOW_DEFS[key] || { w: 780, h: 560, title: '📄 포트폴리오 보기' };
      var titleText = def.title;

      var existing = document.getElementById('subpageModalOverlay');
      if (existing) existing.remove();

      var isMobile = window.innerWidth <= 768;

      var overlay = document.createElement('div');
      overlay.id = 'subpageModalOverlay';
      overlay.style.cssText = 'position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.5); z-index:9999999; display:flex; align-items:center; justify-content:center; padding:12px;';

      var win = document.createElement('div');
      var winW = isMobile ? '94vw' : def.w + 'px';
      var winH = isMobile ? 'min(' + def.h + 'px, 85vh)' : def.h + 'px';

      win.style.cssText = 'width:' + winW + '; height:' + winH + '; max-width:96vw; max-height:90vh; background:#c0c0c0; border:2px solid #000; box-shadow:inset 1px 1px 0 #fff, inset -1px -1px 0 #808080, 4px 4px 0 rgba(0,0,0,0.5); display:flex; flex-direction:column; overflow:hidden; font-family:sans-serif; color:#000;';

      win.innerHTML = \`
        <div style="background:#000000; color:#ffffff; padding:4px 8px; font-size:12px; font-weight:bold; display:flex; justify-content:space-between; align-items:center; user-select:none; flex-shrink:0;">
          <span>\${titleText}</span>
          <button class="w95-btn" onclick="closeSubpageWindow()" style="padding:1px 6px; font-size:11px; height:18px; line-height:1; font-weight:bold; cursor:pointer;">✕</button>
        </div>
        <div style="padding:14px; overflow-y:auto; flex:1; background:#c0c0c0; font-size:12px; line-height:1.5;">
          \${getSubpageWindowBody(key)}
        </div>
      \`;

      overlay.appendChild(win);
      document.body.appendChild(overlay);

      overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeSubpageWindow();
      });
    }

    function closeSubpageWindow() {
      var existing = document.getElementById('subpageModalOverlay');
      if (existing) existing.remove();
    }

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeSubpageWindow();
    });

    function getSubpageWindowBody(key) {
      return \`
        <div style="display:flex; flex-direction:column; height:100%; gap:6px;">
          <div style="display:flex; align-items:center; justify-content:space-between; background:#dfdfdf; padding:4px 8px; border:2px solid #000; box-shadow:inset -1px -1px #fff, inset 1px 1px #7b7b7b; font-size:11px; flex-shrink:0;">
            <span style="font-weight:bold; color:#000;">📄 슈퍼플래닝_회사소개서.pdf</span>
            <div style="display:flex; gap:6px;">
              <a href="/Superplanning_Company_Brochure.pdf" target="_blank" class="w95-btn" style="padding:2px 8px; font-size:11px; text-decoration:none; color:#000;">새 창에서 열기 ↗</a>
              <a href="/Superplanning_Company_Brochure.pdf" download="Superplanning_Company_Brochure.pdf" class="w95-btn" style="padding:2px 8px; font-size:11px; text-decoration:none; color:#000;">파일 다운로드</a>
            </div>
          </div>
          <div style="flex:1; min-height:430px; border:2px solid #000; box-shadow:inset 1px 1px 0 #7b7b7b; background:#525659; position:relative; overflow:hidden;">
            <iframe 
              src="/Superplanning_Company_Brochure.pdf#toolbar=1&navpanes=0&scrollbar=1" 
              style="width:100%; height:100%; border:0; display:block;" 
              title="슈퍼플래닝 포트폴리오 보기">
            </iframe>
          </div>
        </div>
      \`;
    }
`;

allHtmlFiles.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // 1. Replace GNB portfolio button onclick
  content = content.replace(
    /onclick="location\.href='https:\/\/superplanning\.blog\/'"/g,
    'onclick="openWindow(\'brochure\')"'
  );

  content = content.replace(
    /<span>포트폴리오 보기<\/span>\s*<\/button>/g,
    '<span>포트폴리오 보기</span></button>'
  );

  // Replace multi-line button pattern
  content = content.replace(
    /<button class="w95-btn" style="padding:2px 8px; font-size:11px;" onclick="location\.href='[^']+'">\s*<span>포트폴리오 보기<\/span>\s*<\/button>/g,
    `<button class="w95-btn" style="padding:2px 8px; font-size:11px;" onclick="openWindow('brochure')"><span>포트폴리오 보기</span></button>`
  );

  // 2. Ensure openWindow is defined if missing
  if (!content.includes('function openWindow(')) {
    content = content.replace(
      '</script>',
      `${subpageWindowScript}\n  </script>`
    );
    changed = true;
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Ensured openWindow("brochure") in:', path.relative(baseDir, filePath));
});

// Update generator script as well
const genScriptPath = path.join(__dirname, 'generate_standalone_post_pages.js');
if (fs.existsSync(genScriptPath)) {
  let content = fs.readFileSync(genScriptPath, 'utf8');
  content = content.replace(
    /onclick="location\.href='https:\/\/superplanning\.blog\/'"/g,
    'onclick="openWindow(\'brochure\')"'
  );
  if (!content.includes('function openWindow(')) {
    content = content.replace(
      '</script>',
      `${subpageWindowScript}\n  </script>`
    );
  }
  fs.writeFileSync(genScriptPath, content, 'utf8');
  console.log('Updated generate_standalone_post_pages.js subpage window script');
}

console.log('ALL SUBPAGE GNB PORTFOLIO BUTTONS AND POPUP WINDOW SYSTEMS SYNCHRONIZED PERFECTLY!');
