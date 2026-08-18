const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'implementation', 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

const targetStr = `<div class="cmd-prompt" style="font-family:var(--font-mono); font-size:12.5px; color:#ffffff; font-weight:700; margin-bottom:4px; display:flex; align-items:center; gap:6px;">
              <span>C:\\\\SUPERPLANNING&gt; HELLO</span><span class="blink-cursor" style="height:13px; width:6px; background:#ffffff; display:inline-block;"></span>
            </div>`;

const logoBoxHtml = `<div class="cmd-prompt" style="font-family:var(--font-mono); font-size:12.5px; color:#ffffff; font-weight:700; margin-bottom:4px; display:flex; align-items:center; gap:6px;">
              <span>C:\\\\SUPERPLANNING&gt; HELLO</span><span class="blink-cursor" style="height:13px; width:6px; background:#ffffff; display:inline-block;"></span>
            </div>

            <!-- SUPERPLANNING BRAND LOGO BOX -->
            <div class="hero-logo-box" style="background:#ffffff; border:2px solid #000000; box-shadow:inset 1px 1px 0 #ffffff, inset -1px -1px 0 #808080, 2px 2px 0 rgba(0,0,0,0.4); padding:10px 16px; margin:8px 0 12px 0; display:flex; align-items:center; justify-content:center; border-radius:2px;">
              <img src="/images/superplanning_brand_logo.png" alt="SUPERPLANNING" style="max-width:100%; height:auto; max-height:36px; object-fit:contain;" onerror="if(!this.dataset.tried){this.dataset.tried='1';this.src='images/superplanning_brand_logo.png';}">
            </div>`;

if (content.indexOf('<div class="cmd-prompt"') !== -1) {
  const idx = content.indexOf('<div class="cmd-prompt"');
  const endIdx = content.indexOf('</div>', idx) + 6;
  const before = content.substring(0, endIdx);
  const after = content.substring(endIdx);
  content = before + `\n\n            <!-- SUPERPLANNING BRAND LOGO BOX -->\n            <div class="hero-logo-box" style="background:#ffffff; border:2px solid #000000; box-shadow:inset 1px 1px 0 #ffffff, inset -1px -1px 0 #808080, 2px 2px 0 rgba(0,0,0,0.4); padding:10px 16px; margin:8px 0 12px 0; display:flex; align-items:center; justify-content:center; border-radius:2px;">\n              <img src="/images/superplanning_brand_logo.png" alt="SUPERPLANNING" style="max-width:100%; height:auto; max-height:36px; object-fit:contain;" onerror="if(!this.dataset.tried){this.dataset.tried='1';this.src='images/superplanning_brand_logo.png';}">\n            </div>` + after;
  fs.writeFileSync(indexPath, content, 'utf8');
  console.log('Successfully inserted Superplanning brand logo box into index.html');
} else {
  console.error('Target string not found in index.html');
}
