const fs = require('fs');
const src = 'implementation/ux_research/index.html';
const destDir = 'implementation/ux_design_cleanroom_v2';
const dest = destDir + '/index.html';

if (!fs.existsSync(destDir)) fs.mkdirSync(destDir);

let content = fs.readFileSync(src, 'utf-8');

// Remove JSON-LD
content = content.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, '');

// Empty TOC
content = content.replace(/(<ul class="tree-list toc">)[\s\S]*?(<\/ul>)/, '$1\n          $2');

// Empty main content
content = content.replace(/(<main class="main-content-pane">)[\s\S]*?(<\/main>)/, '$1\n        $2');

content = content.replace(/UX리서치 \| 슈퍼플래닝 UX스튜디오/g, 'UX기획/디자인 | 슈퍼플래닝 UX스튜디오');
content = content.replace(/C:\\SUPERPLANNING\\UX_서비스\\UX_리서치/g, 'C:\\SUPERPLANNING\\UX_서비스\\UX_기획_디자인');
content = content.replace(/UX서비스 &gt; UX리서치/g, 'UX서비스 &gt; UX기획/디자인');

fs.writeFileSync(dest, content);
console.log('Shell created successfully at ' + dest);
