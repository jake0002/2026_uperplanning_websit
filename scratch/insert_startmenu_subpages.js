const fs = require('fs');

const startMenuHTML = `  <!-- START MENU (전체메뉴보기 팝업) -->
  <div id="startMenu">
    <div class="start-banner">SUPERPLANNING</div>
    <div class="start-items">
      <div class="start-item" onclick="openWindow('about'); closeStart();">🏢 슈퍼플래닝</div>
      <div class="start-item" onclick="openWindow('clients'); closeStart();">🏛️ 주요 고객사</div>
      <div class="start-item" onclick="openWindow('services'); closeStart();">🎨 UX서비스</div>
      <div class="start-item" onclick="openWindow('instagram'); closeStart();">📷 인스타그램</div>
      <div class="start-item" onclick="openWindow('threads'); closeStart();">🧵 쓰레드</div>
      <div class="start-item" onclick="openWindow('intro-video'); closeStart();">▶️ 유튜브</div>
      <div class="start-item" onclick="openWindow('brochure'); closeStart();">📁 포트폴리오 보기</div>
      <div class="start-item" onclick="openWindow('careers'); closeStart();">🤝 인재채용</div>
      <div class="start-item" onclick="openWindow('tweaks'); closeStart();">⚙️ 환경설정</div>
      <div class="start-item" onclick="openWindow('contact'); closeStart();">📍 찾아오시는길</div>
      <hr style="margin:4px 0; border:0; border-top:1px solid #7b7b7b;">
      <div class="start-item" onclick="location.href='/ux_research/'; closeStart();">🔍 UX리서치</div>
      <div class="start-item" onclick="openWindow('services'); closeStart();">✏️ UX라이팅</div>
      <div class="start-item" onclick="location.href='/ux_design/'; closeStart();">📐 UX기획/디자인</div>
      <div class="start-item" onclick="openWindow('services'); closeStart();">💻 웹/앱개발</div>
      <div class="start-item" onclick="openWindow('classes'); closeStart();">🎓 AI-UX강의</div>
      <div class="start-item" onclick="openWindow('blog'); closeStart();">📝 UX블로그</div>
      <div class="start-item" onclick="location.href='/company/'; closeStart();">🏢 회사소개</div>
    </div>
  </div>\n\n`;

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

        if (content.includes('id="startMenu"')) {
            console.log(`#startMenu already exists in: ${filepath}`);
            return;
        }

        let taskbarIdx = content.indexOf('<div id="taskbar">');
        if (taskbarIdx === -1) taskbarIdx = content.indexOf('<!-- TASKBAR');
        if (taskbarIdx === -1) taskbarIdx = content.indexOf('<!-- 9. TASKBAR');

        if (taskbarIdx !== -1) {
            content = content.substring(0, taskbarIdx) + startMenuHTML + content.substring(taskbarIdx);
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`Inserted #startMenu DOM in: ${filepath}`);
        } else {
            console.log(`Could not find taskbar target in: ${filepath}`);
        }
    }
});
