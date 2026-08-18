const fs = require('fs');

const navHTML = `\n<div class="bottom-nav" style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #ddd;">
<p>이전 단계: <a href="/ux_writing/">UX라이팅</a> &nbsp;|&nbsp; 다음 단계: <a href="/app_dev/">웹/앱 개발</a></p>
</div>`;

const cleanroomFiles = [
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design_cleanroom\\index.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design_cleanroom.html'
];

cleanroomFiles.forEach(filepath => {
    if (fs.existsSync(filepath)) {
        let content = fs.readFileSync(filepath, 'utf8');
        let original = content;

        if (content.includes('이전 단계: <a href="/ux_writing/">UX라이팅</a>')) {
            return;
        }

        let sectionEnd = content.indexOf('</section>', content.indexOf('id="faq"'));
        if (sectionEnd !== -1) {
            content = content.substring(0, sectionEnd) + navHTML + '\n' + content.substring(sectionEnd);
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`Added bottom nav to cleanroom: ${filepath}`);
        }
    }
});
