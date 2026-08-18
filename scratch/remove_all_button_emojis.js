const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'implementation');
const files = [];

function scanDir(d) {
  const list = fs.readdirSync(d);
  list.forEach(item => {
    const full = path.join(d, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      scanDir(full);
    } else if (item.endsWith('.html')) {
      files.push(full);
    }
  });
}

scanDir(dir);

files.forEach(f => {
  let html = fs.readFileSync(f, 'utf8');
  let original = html;

  // GNB buttons with <span>
  html = html.replace(/<span>📁<\/span>\s*<span>포트폴리오 보기<\/span>/g, '<span>포트폴리오 보기</span>');
  html = html.replace(/<span>🤝<\/span>\s*<span>인재채용<\/span>/g, '<span>인재채용</span>');
  html = html.replace(/<span>📄<\/span>\s*<span>회사소개서 보기<\/span>/g, '<span>포트폴리오 보기</span>');
  html = html.replace(/<span>📝<\/span>\s*<span>UX 블로그<\/span>/g, '<span>UX 블로그</span>');
  html = html.replace(/<span>📍<\/span>\s*<span>찾아오시는 길 & 문의<\/span>/g, '<span>찾아오시는 길 & 문의</span>');

  // Direct button labels with emojis
  html = html.replace(/📁 포트폴리오 보기/g, '포트폴리오 보기');
  html = html.replace(/📄 회사소개서 보기/g, '포트폴리오 보기');
  html = html.replace(/🎬 소개영상 보기/g, '소개영상 보기');
  html = html.replace(/📍 찾아오시는 길/g, '찾아오시는 길');
  html = html.replace(/🤝 인재채용/g, '인재채용');
  html = html.replace(/💾 파일 다운로드/g, '파일 다운로드');
  html = html.replace(/⚙️ 환경설정/g, '환경설정');
  html = html.replace(/🗺️ 네이버 지도/g, '네이버 지도');
  html = html.replace(/📁 View Portfolio/g, 'View Portfolio');
  html = html.replace(/🎬 Promo Video/g, 'Promo Video');
  html = html.replace(/📍 Location/g, 'Location');
  html = html.replace(/💾 Download PDF/g, 'Download PDF');

  if (html !== original) {
    fs.writeFileSync(f, html, 'utf8');
    console.log('Removed button emojis in:', path.relative(dir, f));
  }
});
