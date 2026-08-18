const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'implementation', 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

const newIconsArea = `    <div id="iconsArea">
      <!-- 1. 슈퍼플래닝 소개 -->
      <div class="desktop-icon" onclick="selectIcon(this); blip(660, 0.04);" ondblclick="openWindow('about'); blip(880, 0.05);">
        <svg class="icon-svg" viewBox="0 0 36 36">
          <rect width="36" height="36" fill="#000000" rx="4"/>
          <path d="M6 30h24V14H6v16z" fill="#ffffff" />
          <path d="M10 17h4v4h-4zm6 0h4v4h-4zm6 0h4v4h-4zm-12 6h4v4h-4zm6 0h4v4h-4zm6 0h4v4h-4z" fill="#000000"/>
          <path d="M14 8h8v6h-8z" fill="#ffffff"/>
          <path d="M16 10h4v4h-4z" fill="#000000"/>
        </svg>
        <div class="icon-label">슈퍼플래닝</div>
      </div>

      <!-- 1-2. 주요 고객사 -->
      <div class="desktop-icon" onclick="selectIcon(this); blip(660, 0.04);" ondblclick="openWindow('clients'); blip(880, 0.05);">
        <svg class="icon-svg" viewBox="0 0 36 36">
          <rect width="36" height="36" fill="#000000" rx="4"/>
          <path d="M6 28h24V12H6v16z" fill="#ffffff"/>
          <path d="M9 15h4v10H9zm7 0h4v10h-4zm7 0h4v10h-4z" fill="#000000"/>
          <path d="M6 10l12-5 12 5v2H6z" fill="#ffffff"/>
        </svg>
        <div class="icon-label">주요 고객사</div>
      </div>

      <!-- 2. UX서비스 -->
      <div class="desktop-icon" onclick="selectIcon(this); blip(660, 0.04);" ondblclick="openWindow('services'); blip(880, 0.05);">
        <svg class="icon-svg" viewBox="0 0 36 36">
          <rect width="36" height="36" fill="#000000" rx="4"/>
          <rect x="6" y="6" width="24" height="24" fill="#ffffff"/>
          <rect x="9" y="9" width="8" height="8" fill="#000000"/>
          <rect x="19" y="9" width="8" height="8" stroke="#000000" stroke-width="2" fill="none"/>
          <rect x="9" y="19" width="18" height="8" fill="#000000"/>
          <rect x="11" y="21" width="14" height="4" fill="#ffffff"/>
        </svg>
        <div class="icon-label">UX서비스</div>
      </div>

      <!-- 5. 인스타그램 -->
      <div class="desktop-icon" onclick="selectIcon(this); blip(660, 0.04);" ondblclick="openWindow('instagram'); blip(880, 0.05);">
        <svg class="icon-svg" viewBox="0 0 36 36">
          <rect width="36" height="36" fill="#000000" rx="4"/>
          <rect x="7" y="7" width="22" height="22" rx="6" fill="#ffffff"/>
          <rect x="10" y="10" width="16" height="16" rx="4" stroke="#000000" stroke-width="2" fill="none"/>
          <circle cx="18" cy="18" r="4" stroke="#000000" stroke-width="2" fill="none"/>
          <circle cx="22.5" cy="13.5" r="1.5" fill="#000000"/>
        </svg>
        <div class="icon-label">인스타그램</div>
      </div>

      <!-- 6. 쓰레드 -->
      <div class="desktop-icon" onclick="selectIcon(this); blip(660, 0.04);" ondblclick="openWindow('threads'); blip(880, 0.05);">
        <svg class="icon-svg" viewBox="0 0 36 36">
          <rect width="36" height="36" fill="#000000" rx="4"/>
          <rect x="8" y="8" width="20" height="20" fill="#ffffff"/>
          <rect x="12" y="12" width="12" height="12" fill="#000000"/>
          <rect x="16" y="16" width="4" height="4" fill="#ffffff"/>
        </svg>
        <div class="icon-label">쓰레드</div>
      </div>

      <!-- 7. 소개영상 -->
      <div class="desktop-icon" onclick="selectIcon(this); blip(660, 0.04);" ondblclick="openWindow('intro-video'); blip(880, 0.05);">
        <svg class="icon-svg" viewBox="0 0 36 36">
          <rect width="36" height="36" fill="#000000" rx="4"/>
          <rect x="6" y="9" width="24" height="18" fill="#ffffff" rx="4"/>
          <path d="M15 13.5l8 4.5-8 4.5z" fill="#000000"/>
        </svg>
        <div class="icon-label">유튜브</div>
      </div>

      <!-- 8. 찾아오시는 길 -->
      <div class="desktop-icon" onclick="selectIcon(this); blip(660, 0.04);" ondblclick="openWindow('contact'); blip(880, 0.05);">
        <svg class="icon-svg" viewBox="0 0 36 36">
          <rect width="36" height="36" fill="#000000" rx="4"/>
          <path d="M18 6c-5.52 0-10 4.48-10 10 0 7.5 10 16 10 16s10-8.5 10-16c0-5.52-4.48-10-10-10zm0 13.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" fill="#ffffff"/>
          <circle cx="18" cy="16" r="2" fill="#000000"/>
        </svg>
        <div class="icon-label">찾아오시는 길</div>
      </div>

    </div>`;

const areaRegex = /<div id="iconsArea">[\s\S]*?<\/div>\s*<\/div>/;
if (areaRegex.test(content)) {
  content = content.replace(areaRegex, newIconsArea + '\n  </div>');
  fs.writeFileSync(indexPath, content, 'utf8');
  console.log('Successfully updated all desktop icons in index.html to Black & White SVG design!');
} else {
  console.error('Failed to match iconsArea regex in index.html');
}
