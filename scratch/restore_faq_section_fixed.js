const fs = require('fs');

const faqHTML = `\n          <!-- 7. 자주 묻는 질문 (FAQ) -->
          <h2 id="faq">7. 자주 묻는 질문 (FAQ)</h2>
          <dl class="faq">
            <dt>UX기획과 UX디자인은 무엇이 다른가요?</dt>
            <dd>UX기획은 서비스 구조, 사용자 흐름, 기능 우선순위를 설계하는 일에 가깝고 UX디자인은 그 구조를 실제 화면 경험으로 구현하는 단계에 가깝습니다. 실무에서는 두 영역이 분리되기보다 함께 움직일 때 완성도가 높아집니다.</dd>
            <dt>IA설계와 와이어프레임은 왜 필요한가요?</dt>
            <dd>IA설계는 서비스 정보를 어떻게 묶고 찾게 할지 정리하는 작업이고 와이어프레임은 사용자의 동선과 화면 구조를 빠르게 검증하는 작업입니다. 두 단계가 있어야 기능만 많은 서비스가 아니라 이해하기 쉬운 서비스가 됩니다.</dd>
            <dt>화면설계서에는 어떤 내용이 포함되나요?</dt>
            <dd>화면설계서에는 화면 목적, 구성 요소, 버튼과 입력 규칙, 상태 변화, 예외 처리, 전환 흐름, 개발 메모가 포함됩니다. 기획 의도를 디자이너와 개발자가 같은 기준으로 이해할 수 있습니다.</dd>
            <dt>앱 개발 전에 UX기획을 먼저 해야 하나요?</dt>
            <dd>가능하면 먼저 하는 편이 좋습니다. 기능 개발부터 시작하면 수정 비용이 커지기 쉽기 때문에 서비스 구조와 핵심 사용자 흐름을 먼저 정리하면 시행착오를 줄일 수 있습니다.</dd>
            <dt>스타트업도 UX기획이 꼭 필요한가요?</dt>
            <dd>네. 오히려 초기 스타트업일수록 예산과 시간이 제한되어 있기 때문에 어떤 기능을 먼저 만들고 어떤 흐름을 단순화할지 정하는 UX기획이 중요합니다.</dd>
            <dt>슈퍼플래닝의 UX 특허는 어떤 의미가 있나요?</dt>
            <dd>슈퍼플래닝은 애플리케이션 UI 작성툴과 모바일앱 UI·UX 기획을 위한 와이어프레임 설계용 UI 프로젝트 관리 장치 관련 특허를 보유하고 있습니다. 화면 설계를 감이 아닌 구조와 도구 관점으로 연구해 왔다는 의미입니다.</dd>
            <dt>개발사와 협업 중인데 화면설계서만 보완할 수 있나요?</dt>
            <dd>가능합니다. 이미 개발사가 있는 경우에도 IA 정리, 와이어프레임 수정, 화면설계서 보완, UX라이팅 정리처럼 필요한 구간만 부분적으로 지원할 수 있습니다.</dd>
            <dt>UX기획 강의나 앱 컨설팅도 함께 가능한가요?</dt>
            <dd>가능합니다. 슈퍼플래닝은 스타트업, 예비창업자, IT 비전공자, 기업 실무자를 대상으로 UX기획 강의와 앱 컨설팅을 진행하며 실제 화면 설계 기준과 프로젝트 적용 방법을 함께 설명합니다.</dd>
            <dt>프로젝트 견적 및 진행 신청은 어떻게 하나요?</dt>
            <dd>찾아오시는 길 및 문의 페이지를 통해 서비스 현황과 목표를 남겨주시면 전문 UX컨설턴트가 상세 상담과 견적안을 안내해 드립니다.</dd>
          </dl>

          <div class="bottom-nav">
            <p>이전 단계: <a href="/ux_research/">UX리서치</a></p>
            <p>마크다운 미러: <a href="/services/ux-planning-design.md">/services/ux-planning-design.md</a> · AI 색인: <a href="/llms.txt">/llms.txt</a></p>
          </div>`;

const faqCleanroomHTML = `\n<section id="faq">
<h2 id="faq">7. 자주 묻는 질문 (FAQ)</h2>
<dl class="faq">
  <dt>UX기획과 UX디자인은 무엇이 다른가요?</dt>
  <dd>UX기획은 서비스 구조, 사용자 흐름, 기능 우선순위를 설계하는 일에 가깝고 UX디자인은 그 구조를 실제 화면 경험으로 구현하는 단계에 가깝습니다. 실무에서는 두 영역이 분리되기보다 함께 움직일 때 완성도가 높아집니다.</dd>
  <dt>IA설계와 와이어프레임은 왜 필요한가요?</dt>
  <dd>IA설계는 서비스 정보를 어떻게 묶고 찾게 할지 정리하는 작업이고 와이어프레임은 사용자의 동선과 화면 구조를 빠르게 검증하는 작업입니다. 두 단계가 있어야 기능만 많은 서비스가 아니라 이해하기 쉬운 서비스가 됩니다.</dd>
  <dt>화면설계서에는 어떤 내용이 포함되나요?</dt>
  <dd>화면설계서에는 화면 목적, 구성 요소, 버튼과 입력 규칙, 상태 변화, 예외 처리, 전환 흐름, 개발 메모가 포함됩니다. 기획 의도를 디자이너와 개발자가 같은 기준으로 이해할 수 있습니다.</dd>
  <dt>앱 개발 전에 UX기획을 먼저 해야 하나요?</dt>
  <dd>가능하면 먼저 하는 편이 좋습니다. 기능 개발부터 시작하면 수정 비용이 커지기 쉽기 때문에 서비스 구조와 핵심 사용자 흐름을 먼저 정리하면 시행착오를 줄일 수 있습니다.</dd>
  <dt>스타트업도 UX기획이 꼭 필요한가요?</dt>
  <dd>네. 오히려 초기 스타트업일수록 예산과 시간이 제한되어 있기 때문에 어떤 기능을 먼저 만들고 어떤 흐름을 단순화할지 정하는 UX기획이 중요합니다.</dd>
  <dt>슈퍼플래닝의 UX 특허는 어떤 의미가 있나요?</dt>
  <dd>슈퍼플래닝은 애플리케이션 UI 작성툴과 모바일앱 UI·UX 기획을 위한 와이어프레임 설계용 UI 프로젝트 관리 장치 관련 특허를 보유하고 있습니다. 화면 설계를 감이 아닌 구조와 도구 관점으로 연구해 왔다는 의미입니다.</dd>
  <dt>개발사와 협업 중인데 화면설계서만 보완할 수 있나요?</dt>
  <dd>가능합니다. 이미 개발사가 있는 경우에도 IA 정리, 와이어프레임 수정, 화면설계서 보완, UX라이팅 정리처럼 필요한 구간만 부분적으로 지원할 수 있습니다.</dd>
  <dt>UX기획 강의나 앱 컨설팅도 함께 가능한가요?</dt>
  <dd>가능합니다. 슈퍼플래닝은 스타트업, 예비창업자, IT 비전공자, 기업 실무자를 대상으로 UX기획 강의와 앱 컨설팅을 진행하며 실제 화면 설계 기준과 프로젝트 적용 방법을 함께 설명합니다.</dd>
  <dt>프로젝트 견적 및 진행 신청은 어떻게 하나요?</dt>
  <dd>찾아오시는 길 및 문의 페이지를 통해 서비스 현황과 목표를 남겨주시면 전문 UX컨설턴트가 상세 상담과 견적안을 안내해 드립니다.</dd>
</dl>
</section>`;

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

        if (content.includes('<h2 id="faq">')) {
            console.log(`FAQ section body already exists in: ${filepath}`);
            return;
        }

        let mainEnd = content.indexOf('</main>');
        if (mainEnd !== -1) {
            let toInsert = filepath.includes('cleanroom') ? faqCleanroomHTML : faqHTML;
            content = content.substring(0, mainEnd) + toInsert + '\n\n        ' + content.substring(mainEnd);
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`Restored FAQ Section in: ${filepath}`);
        } else {
            console.log(`Could not find </main> in: ${filepath}`);
        }
    }
});
