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

  // 1. Change .start-banner background from blue gradient to solid black
  content = content.replace(
    /background:\s*linear-gradient\(180deg,\s*#000080\s*0%,\s*#1084d0\s*100%\);/g,
    'background: #000000;'
  );

  // 2. Change mobile drawer title color from #000080 to #000000 and remove emoji
  content = content.replace(/<strong style="font-size:13px; color:#000080;">📂 GNB 전체 메뉴<\/strong>/g, '<strong style="font-size:13px; color:#000000;">GNB 전체 메뉴</strong>');

  // 3. Update start-item entries: replace emojis and add bullet '• '
  const itemReplacements = [
    ['🏢 슈퍼플래닝', '• 슈퍼플래닝'],
    ['🏛️ 주요 고객사', '• 주요 고객사'],
    ['🎨 UX서비스', '• UX서비스'],
    ['🎨 UX 서비스', '• UX 서비스'],
    ['📷 인스타그램', '• 인스타그램'],
    ['🧵 쓰레드', '• 쓰레드'],
    ['▶️ 유튜브', '• 유튜브'],
    ['📍 찾아오시는길', '• 찾아오시는길'],
    ['📍 찾아오시는 길', '• 찾아오시는 길'],
    ['🔍 UX리서치', '• UX리서치'],
    ['✏️ UX라이팅', '• UX라이팅'],
    ['📐 UX기획/디자인', '• UX기획/디자인'],
    ['💻 웹/앱개발', '• 웹/앱개발'],
    ['🎓 AI-UX강의', '• AI-UX강의'],
    ['🎓 AI-UX 강의', '• AI-UX 강의'],
    ['📝 UX블로그', '• UX블로그'],
    ['📝 UX 블로그', '• UX 블로그'],
    ['🏢 회사소개', '• 회사소개'],
    ['✉️ 문의하기', '• 문의하기'],
    ['📍 찾아오시는 길 & 문의', '• 찾아오시는 길 & 문의'],
    ['🌐 언어 변경 (KOR / ENG)', '• 언어 변경 (KOR / ENG)'],
    ['🏢 About Us', '• About Us'],
    ['🏛️ Key Clients', '• Key Clients'],
    ['🎨 UX Services', '• UX Services'],
    ['📷 Instagram', '• Instagram'],
    ['🧵 Threads', '• Threads'],
    ['▶️ YouTube', '• YouTube'],
    ['📍 Location', '• Location'],
    ['🔍 UX Research', '• UX Research'],
    ['✏️ UX Writing', '• UX Writing'],
    ['📐 UX Design', '• UX Design'],
    ['💻 Web/App Dev', '• Web/App Dev'],
    ['🎓 AI-UX Classes', '• AI-UX Classes'],
    ['📝 UX Blog', '• UX Blog'],
    ['🏢 About Company', '• About Company'],
    ['📍 Location & Inquiry', '• Location & Inquiry'],
    ['📄 Company Brochure', '• Company Brochure'],
    ['🤝 Careers', '• Careers'],
    ['⚙️ Tweaks', '• Tweaks'],
    // Items without emoji in start-item: add bullet if missing
    ['>포트폴리오 보기</div>', '>• 포트폴리오 보기</div>'],
    ['>인재채용</div>', '>• 인재채용</div>'],
    ['>환경설정</div>', '>• 환경설정</div>']
  ];

  itemReplacements.forEach(([oldStr, newStr]) => {
    content = content.split(oldStr).join(newStr);
  });

  if (content !== original) {
    fs.writeFileSync(f, content, 'utf8');
    console.log('Updated start-banner & start-item bullets in:', path.relative(dir, f));
  }
});
