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
  let content = fs.readFileSync(f, 'utf8');
  let original = content;

  // Fix drawerKo & drawerEn
  content = content.replace(
    /'• 회사소개',\s*'• 주요 고객사',\s*'• UX 서비스',\s*'• AI-UX 강의',\s*\n\s*'• UX 블로그',\s*'찾아오시는 길 & 문의',\s*'포트폴리오 보기',\s*\n\s*'인재채용',\s*'• 언어 변경 \(KOR \/ ENG\)'/g,
    "'• 회사소개', '• 주요 고객사', '• UX 서비스', '• AI-UX 강의', \n        '• UX 블로그', '• 찾아오시는 길 & 문의', '• 포트폴리오 보기', \n        '• 인재채용', '• 언어 변경 (KOR / ENG)'"
  );

  content = content.replace(
    /'• About Us',\s*'• Key Clients',\s*'• UX Services',\s*'• AI-UX Classes',\s*\n\s*'• UX Blog',\s*'Location & Inquiry',\s*'• Company Brochure',\s*\n\s*'• Careers',\s*'🌐 Language \(KOR \/ ENG\)'/g,
    "'• About Us', '• Key Clients', '• UX Services', '• AI-UX Classes', \n        '• UX Blog', '• Location & Inquiry', '• Company Brochure', \n        '• Careers', '• Language (KOR / ENG)'"
  );

  // Fix startKo & startEn
  content = content.replace(
    /'• 슈퍼플래닝',\s*'• 주요 고객사',\s*'• UX서비스',\s*'• 인스타그램',\s*'• 쓰레드',\s*'• 유튜브',\s*\n\s*'포트폴리오 보기',\s*'인재채용',\s*'환경설정',\s*'• 찾아오시는길',/g,
    "'• 슈퍼플래닝', '• 주요 고객사', '• UX서비스', '• 인스타그램', '• 쓰레드', '• 유튜브', \n        '• 포트폴리오 보기', '• 인재채용', '• 환경설정', '• 찾아오시는길',"
  );

  content = content.replace(
    /'• About Us',\s*'• Key Clients',\s*'• UX Services',\s*'• Instagram',\s*'• Threads',\s*'• YouTube',\s*\n\s*'View Portfolio',\s*'• Careers',\s*'• Tweaks',\s*'Location',/g,
    "'• About Us', '• Key Clients', '• UX Services', '• Instagram', '• Threads', '• YouTube', \n        '• View Portfolio', '• Careers', '• Tweaks', '• Location',"
  );

  if (content !== original) {
    fs.writeFileSync(f, content, 'utf8');
    console.log('Fixed language arrays in:', path.relative(dir, f));
  }
});
