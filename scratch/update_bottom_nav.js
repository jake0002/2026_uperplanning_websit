const fs = require('fs');

const oldNavPattern = /<div class="bottom-nav">\s*<p>이전 단계: <a href="\/ux_research\/">UX리서치<\/a><\/p>/g;
const newNavHTML = `<div class="bottom-nav">
            <p>이전 단계: <a href="/ux_writing/">UX라이팅</a> &nbsp;|&nbsp; 다음 단계: <a href="/app_dev/">웹/앱 개발</a></p>`;

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

        if (content.includes('이전 단계: <a href="/ux_writing/">UX라이팅</a>')) {
            console.log(`Bottom nav already updated in: ${filepath}`);
            return;
        }

        content = content.replace(/<p>이전 단계: <a href="\/ux_research\/">UX리서치<\/a><\/p>/g, '<p>이전 단계: <a href="/ux_writing/">UX라이팅</a> &nbsp;|&nbsp; 다음 단계: <a href="/app_dev/">웹/앱 개발</a></p>');

        if (content !== original) {
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`Updated bottom nav in: ${filepath}`);
        } else {
            console.log(`Could not find old bottom nav in: ${filepath}`);
        }
    }
});
