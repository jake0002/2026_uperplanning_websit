const fs = require('fs');

const files = [
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_research\\index.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_research.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux-research.html',
];

const oldNav = `<p>다음 단계: <a href="https://superplanning.blog/#services">UX기획·디자인</a> </p>`;
const newNav = `<p>이전 단계: <a href="/ux_design/">UX기획/디자인</a> &nbsp;|&nbsp; 다음 단계: <a href="/ux_writing/">UX라이팅</a></p>`;

files.forEach(filepath => {
    if (fs.existsSync(filepath)) {
        let content = fs.readFileSync(filepath, 'utf8');
        let original = content;

        content = content.replace(
            /<p>다음 단계: <a href="https:\/\/superplanning\.blog\/#services">UX기획·디자인<\/a> <\/p>/g,
            newNav
        );

        if (content !== original) {
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`Updated bottom-nav in: ${filepath}`);
        } else {
            console.log(`No match found in: ${filepath}`);
            // Try broader pattern
            let idx = content.indexOf('class="bottom-nav"');
            if (idx !== -1) {
                console.log('Found bottom-nav at idx:', idx);
                console.log(content.substring(idx, idx + 300));
            }
        }
    }
});
