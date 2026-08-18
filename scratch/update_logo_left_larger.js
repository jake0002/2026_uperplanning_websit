const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'implementation', 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// 1. Update WINDOW_DEFS height for 'about' from 465 to 480 (+15px for larger logo)
content = content.replace(
  /'about':\s*\{\s*w:\s*580,\s*h:\s*465,\s*title:\s*'슈퍼플래닝'\s*\}/g,
  "'about': { w: 580, h: 480, title: '슈퍼플래닝' }"
);

// 2. Change alignment to justify-content: flex-start and enlarge logo max-height from 36px to 48px
const oldCardHtml = `<div class="brand-logo-card" style="background:#ffffff; border:2px solid #000000; box-shadow:inset 1px 1px 0 #ffffff, inset -1px -1px 0 #808080, 2px 2px 0 rgba(0,0,0,0.3); padding:8px 14px; margin-bottom:8px; display:flex; align-items:center; justify-content:center; border-radius:2px;">
            <img src="/images/superplanning_brand_logo.png" alt="SUPERPLANNING" style="max-width:100%; height:auto; max-height:36px; object-fit:contain;" onerror="if(!this.dataset.tried){this.dataset.tried='1';this.src='images/superplanning_brand_logo.png';}">
          </div>`;

const newCardHtml = `<div class="brand-logo-card" style="background:#ffffff; border:2px solid #000000; box-shadow:inset 1px 1px 0 #ffffff, inset -1px -1px 0 #808080, 2px 2px 0 rgba(0,0,0,0.3); padding:10px 14px; margin-bottom:8px; display:flex; align-items:center; justify-content:flex-start; border-radius:2px;">
            <img src="/images/superplanning_brand_logo.png" alt="SUPERPLANNING" style="max-width:100%; height:auto; max-height:48px; object-fit:contain;" onerror="if(!this.dataset.tried){this.dataset.tried='1';this.src='images/superplanning_brand_logo.png';}">
          </div>`;

if (content.includes(oldCardHtml)) {
  content = content.replace(oldCardHtml, newCardHtml);
  fs.writeFileSync(indexPath, content, 'utf8');
  console.log('Successfully updated logo size to 48px and alignment to left in index.html!');
} else {
  console.error('Could not match oldCardHtml in index.html');
}
