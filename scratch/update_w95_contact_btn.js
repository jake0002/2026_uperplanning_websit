const fs = require('fs');

const w95ButtonHTML = `<div style="margin-top: 12px;">
    <a href="/contact/" class="w95-btn" style="display: inline-flex; align-items: center; gap: 6px; padding: 5px 16px; background-color: #c0c0c0; color: #000000; text-decoration: none; font-weight: bold; font-size: 13px; border-top: 2px solid #ffffff; border-left: 2px solid #ffffff; border-right: 2px solid #404040; border-bottom: 2px solid #404040; box-shadow: inset -1px -1px #000000, inset 1px 1px #dfdfdf; cursor: pointer;">
      <span style="font-size: 14px;">✉️</span> <span>문의하기</span>
    </a>
  </div>`;

const files = [
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design\\index.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design_cleanroom\\index.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design_cleanroom.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux-design.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_plan\\index.html',
];

files.forEach(filepath => {
    if (fs.existsSync(filepath)) {
        let content = fs.readFileSync(filepath, 'utf8');
        let original = content;

        // Replace blue contact button div with W95 retro button div
        content = content.replace(/<div style="margin-top: 10px;">\s*<a href="\/contact\/"[\s\S]*?<\/a>\s*<\/div>/g, w95ButtonHTML);

        if (content !== original) {
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`Updated to Win95 retro Contact Us button in: ${filepath}`);
        } else {
            console.log(`Could not replace button in: ${filepath}`);
        }
    }
});
