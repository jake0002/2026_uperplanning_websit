const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'implementation', 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// 1. Update WINDOW_DEFS for 'about' popup height from 395 to 465 (+70px for logo box)
content = content.replace(
  /'about':\s*\{\s*w:\s*580,\s*h:\s*\d+,\s*title:\s*'슈퍼플래닝'\s*\}/g,
  "'about': { w: 580, h: 465, title: '슈퍼플래닝' }"
);

// 2. Remove old hero-logo-box from inside hero-banner-box if present
const logoBoxRegex = /\s*<!-- SUPERPLANNING BRAND LOGO BOX -->[\s\S]*?<\/div>/;
content = content.replace(logoBoxRegex, '');

// 3. Insert brand logo box ABOVE hero-banner-box (above C:\SUPERPLANNING> HELLO box)
const heroBannerRegex = /<!-- RETRO IMPACTFUL HERO CONTAINER -->/;
const newLogoAndBanner = `<!-- BRAND LOGO CARD BOX (ABOVE C:\\SUPERPLANNING> HELLO BOX) -->
          <div class="brand-logo-card" style="background:#ffffff; border:2px solid #000000; box-shadow:inset 1px 1px 0 #ffffff, inset -1px -1px 0 #808080, 2px 2px 0 rgba(0,0,0,0.3); padding:8px 14px; margin-bottom:8px; display:flex; align-items:center; justify-content:center; border-radius:2px;">
            <img src="/images/superplanning_brand_logo.png" alt="SUPERPLANNING" style="max-width:100%; height:auto; max-height:36px; object-fit:contain;" onerror="if(!this.dataset.tried){this.dataset.tried='1';this.src='images/superplanning_brand_logo.png';}">
          </div>

          <!-- RETRO IMPACTFUL HERO CONTAINER -->`;

if (heroBannerRegex.test(content)) {
  content = content.replace(heroBannerRegex, newLogoAndBanner);
  fs.writeFileSync(indexPath, content, 'utf8');
  console.log('Successfully updated About popup height to 465 and placed logo box ABOVE C:\\SUPERPLANNING> HELLO box!');
} else {
  console.error('Could not find heroBannerRegex in index.html');
}
