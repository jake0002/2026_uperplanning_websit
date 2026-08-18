const fs = require('fs');

const processTableHTML = `
          <div style="width:100%; overflow-x:auto; margin-top: 24px;">
            <table class="compare-table">
              <caption>표 2. UX디자인 4단계 상세 프로세스 및 핵심 산출물</caption>
              <thead>
                <tr>
                  <th scope="col" style="width: 20%;">단계</th>
                  <th scope="col" style="width: 45%;">핵심 업무내용</th>
                  <th scope="col" style="width: 35%;">주요 산출물</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>1st 발견<br><span style="color:#666; font-weight:normal; font-size:12.5px;">Discover</span></strong></td>
                  <td>시장관점과 고객관점의 데스크 리서치로 출발해, 행동 기반 페르소나를 정리하고 내부·외부 인터뷰 시나리오를 설계합니다. 이후 FGI, IDI, UT 같은 사용자 리서치를 통해 사용자의 불편, 기대, 행동 패턴을 확인하며 서비스가 풀어야 할 문제를 구체적으로 발견합니다.</td>
                  <td>데스크 리서치, 행동 기반 페르소나, 인터뷰 시나리오, 사용자 리서치 결과</td>
                </tr>
                <tr>
                  <td><strong>2nd 정의<br><span style="color:#666; font-weight:normal; font-size:12.5px;">Define</span></strong></td>
                  <td>리서치에서 나온 인사이트를 어피니티 다이어그램으로 정리하고, 핵심 사용자 여정과 아하 모먼트를 도출합니다. 이어서 AARRR 관점의 전환 구조와 PRD 수준의 요구사항을 정의해, 어떤 사용자에게 어떤 가치를 어떤 흐름으로 제공할지 명확히 만듭니다.</td>
                  <td>어피니티 다이어그램, 핵심 사용자 여정, 아하 모먼트, AARRR, PRD</td>
                </tr>
                <tr>
                  <td><strong>3rd 설계<br><span style="color:#666; font-weight:normal; font-size:12.5px;">Develop</span></strong></td>
                  <td>정의된 요구사항을 실제 서비스 구조로 바꾸는 단계입니다. 서비스 플로우 차트, 디자인 컨셉, UX라이팅, 네이밍/슬로건, IA 설계, 기능정의서를 통해 서비스 구조와 커뮤니케이션 방식을 정리하고, 필요 시 페이퍼보드 스케치까지 포함해 사용자와 팀이 같은 기준으로 이해할 수 있는 설계 체계를 만듭니다.</td>
                  <td>서비스 플로우 차트, 디자인 컨셉 정의, UX라이팅, 네이밍/슬로건, IA 설계, 기능정의서, 페이퍼보드 스케치</td>
                </tr>
                <tr>
                  <td><strong>4th 구현<br><span style="color:#666; font-weight:normal; font-size:12.5px;">Deliver</span></strong></td>
                  <td>설계 내용을 실제 실행 가능한 형태로 구체화하는 단계입니다. 프로토타입(바이브코딩 & 피그마), 사용자 별 UI정의, 사용자 스토리보드, 관리자 스토리보드, 검수 시나리오를 통해 개발 전 합의를 높이고 구현 과정에서 발생할 오해를 줄입니다. 또한 디자인 시스템, 스타일 가이드 및 UI 키트, 고해상도 최종 화면 디자인, 인터랙티브 프로토타입까지 정리해 실제 서비스에 적용 가능한 UI디자인 기준을 완성합니다.</td>
                  <td>프로토타입(바이브코딩 & 피그마), 사용자 별 UI정의, 디자인 시스템, 스타일 가이드 및 UI 키트, 고해상도 최종 화면 디자인, 인터랙티브 프로토타입, 사용자 스토리보드, 관리자 스토리보드, 검수 시나리오</td>
                </tr>
              </tbody>
            </table>
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

        if (content.includes('표 2. UX디자인 4단계 상세 프로세스 및 핵심 산출물')) {
            console.log(`Table 2 already present in: ${filepath}`);
            return;
        }

        let captionIdx = content.indexOf('📷 슈퍼플래닝 UX디자인 진행 프로세스 (Double Diamond Framework)');
        if (captionIdx !== -1) {
            let divEndIdx = content.indexOf('</div>', captionIdx);
            if (divEndIdx !== -1) {
                let insertPos = divEndIdx + 6;
                content = content.substring(0, insertPos) + '\n' + processTableHTML + content.substring(insertPos);
            }
        }

        if (content !== original) {
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`Inserted 4-step process table in: ${filepath}`);
        } else {
            console.log(`Could not insert table in: ${filepath}`);
        }
    }
});
