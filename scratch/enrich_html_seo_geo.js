const fs = require('fs');

const enrichedKeywords = "UI/UX외주업체, UX디자인 에이전시, UX리서치 회사, UX라이팅 회사, UX컨설팅 회사, UX강의, UX강의학원, 기업출강, 앱개발 외주업체, UX기획, UX디자인, IA설계, 와이어프레임, 화면설계서, UX 특허, 모바일앱 기획, 스타트업 UX컨설팅, 슈퍼플래닝, Superplanning";

const enrichedDesc = "슈퍼플래닝은 UI/UX외주업체, UX디자인 에이전시, UX리서치 회사, UX라이팅 회사, UX컨설팅 회사, UX강의 및 기업출강, 앱개발 외주업체 전문 특허 5건 보유 UX 전문 에이전시입니다.";

const files = [
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design\\index.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design_cleanroom\\index.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_design_cleanroom.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux-design.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\ux_plan\\index.html',
    'd:\\Dropbox\\03_super planning\\00_슈퍼플래닝\\2026_uperplanning_website\\implementation\\index.html',
];

files.forEach(filepath => {
    if (fs.existsSync(filepath)) {
        let content = fs.readFileSync(filepath, 'utf8');
        let original = content;

        content = content.replace(/<meta name="keywords" content="[^"]+">/g, `<meta name="keywords" content="${enrichedKeywords}">`);

        if (content !== original) {
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`Updated meta keywords for GEO & SEO in: ${filepath}`);
        } else {
            console.log(`No keywords meta tag replaced in: ${filepath}`);
        }
    }
});
