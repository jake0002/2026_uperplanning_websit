const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..', 'implementation');

function getAllHtmlFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getAllHtmlFiles(filePath));
        } else if (file.endsWith('.html')) {
            results.push(filePath);
        }
    });
    return results;
}

const htmlFiles = getAllHtmlFiles(baseDir);
let updatedCount = 0;

const aboutBody = `      if (key === 'about') {
        return \`
          <div class="win-menu-bar" style="margin: -12px -12px 10px -12px; display:flex; gap:12px; background:#c0c0c0; padding:2px 6px; border-bottom:1px solid #808080; font-size:11px;">
            <div><span style="text-decoration:underline;">F</span>ile</div>
            <div><span style="text-decoration:underline;">E</span>dit</div>
            <div><span style="text-decoration:underline;">V</span>iew</div>
            <div><span style="text-decoration:underline;">H</span>elp</div>
          </div>
          
          <div class="brand-logo-card" style="background:#ffffff; border:2px solid #000000; box-shadow:inset 1px 1px 0 #ffffff, inset -1px -1px 0 #808080, 2px 2px 0 rgba(0,0,0,0.3); padding:10px 14px; margin-bottom:8px; display:flex; align-items:center; justify-content: center; border-radius:2px;">
            <img src="/images/superplanning_brand_logo.png" alt="SUPERPLANNING" style="max-width:100%; height:auto; max-height:48px; object-fit:contain;" onerror="if(!this.dataset.tried){this.dataset.tried='1';this.src='images/superplanning_brand_logo.png';}">
          </div>

          <div class="hero-banner-box" style="background:#0a0f0d; border:2px solid #000; box-shadow:inset 2px 2px 0 #000, inset -1px -1px 0 #222; padding:12px 14px; margin-bottom:8px; border-radius:3px;">
            <div class="cmd-prompt" style="font-family:monospace; font-size:12.5px; color:#ffffff; font-weight:700; margin-bottom:4px; display:flex; align-items:center; gap:6px;">
              <span>C:\\\\SUPERPLANNING&gt; <span>HELLO</span></span><span class="blink-cursor" style="height:13px; width:6px; background:#ffffff; display:inline-block;"></span>
            </div>

            <h2 style="font-size:21px; font-weight:900; margin:0 0 4px 0; line-height:1.3; color:#ffffff; letter-spacing:-0.02em; min-height:28px; word-break:keep-all;">
              UX디자인 에이전시, <span style="color:#ffffff; font-weight:900;">슈퍼플래닝입니다.</span>
            </h2>

            <p style="font-size:12.5px; font-weight:600; line-height:1.45; margin:0; color:#d8d8d8; min-height:18px; word-break:keep-all;">
              때로는 사용자 경험을 위해 예쁜 디자인은 과감히 포기할 수 있어야 하죠.
            </p>
          </div>

          <div style="margin-top:8px; margin-bottom:6px;">
            <h4 style="font-weight:900; font-size:12.5px; margin:0; color:#000000; letter-spacing:-0.01em;">UX프로젝트 수행원칙</h4>
          </div>

          <div style="display:flex; flex-direction:column; gap:4px; margin-bottom:8px;">
            <div class="info-card" style="padding:5px 8px; background:#ffffff; border:2px solid #000; box-shadow:inset 1px 1px 0 #fff, inset -1px -1px 0 #808080;">
              <h4 style="font-size:11.5px; font-weight:800; color:#000000; margin-bottom:2px;">1. 최근 사용자들의 3초 법칙</h4>
              <p style="font-size:11px; line-height:1.35; color:#222; margin:0;">사용자의 시선은 3초 안에 사로잡아야 합니다. 이탈을 막고 핵심 가치를 전하는 최초 사용자 경험이 무엇보다 중요합니다.</p>
            </div>
            <div class="info-card" style="padding:5px 8px; background:#ffffff; border:2px solid #000; box-shadow:inset 1px 1px 0 #fff, inset -1px -1px 0 #808080;">
              <h4 style="font-size:11.5px; font-weight:800; color:#000000; margin-bottom:2px;">2. 그렇게 쓰면 아무도 안읽습니다.</h4>
              <p style="font-size:11px; line-height:1.35; color:#222; margin:0;">사용자는 화면을 읽지 않고 '스캔'합니다. 불필요한 수식어를 덜어내고, 명확한 UX라이팅으로 다음 행동을 유도합니다.</p>
            </div>
            <div class="info-card" style="padding:5px 8px; background:#ffffff; border:2px solid #000; box-shadow:inset 1px 1px 0 #fff, inset -1px -1px 0 #808080;">
              <h4 style="font-size:11.5px; font-weight:800; color:#000000; margin-bottom:2px;">3. 더 적게 하지만 더 좋게</h4>
              <p style="font-size:11px; line-height:1.35; color:#222; margin:0;">디자인에서는 '무엇을 추가할까'가 아닌 '무엇을 덜어낼까' 고민해야 합니다. 'Less but better'</p>
            </div>
          </div>

          <div style="display:flex; gap:8px; margin-top:6px; margin-bottom:0; padding-top:0; flex-wrap:wrap;">
            <button class="w95-btn" style="padding:4px 10px; font-size:11px;" onclick="openWindow('brochure');">포트폴리오 보기</button>
            <button class="w95-btn" style="padding:4px 10px; font-size:11px;" onclick="openWindow('intro-video');">소개영상 보기</button>
            <button class="w95-btn" style="padding:4px 10px; font-size:11px;" onclick="openWindow('contact');">찾아오시는 길</button>
          </div>
        \`;`;

const servicesBody = `      } else if (key === 'services') {
        return \`
          <h3 style="font-size:13px; font-weight:700; margin-bottom:8px;">이런 서비스를 제공합니다.</h3>
          <div class="card-grid" style="display:grid; grid-template-columns: repeat(2, 1fr); gap:6px;">
            <div class="info-card" style="padding:8px 10px; cursor:pointer; background:#fff; border:2px solid #000; box-shadow:inset 1px 1px 0 #fff, inset -1px -1px 0 #808080;" onclick="location.href='/ux-research/';">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                <h4 style="margin:0; font-size:12px; font-weight:bold;">UX 리서치</h4>
                <a href="/ux-research/" class="w95-btn" style="padding:1px 6px; font-size:10px; text-decoration:none; color:#000;" onclick="event.stopPropagation();">상세보기 →</a>
              </div>
              <p style="margin:0; font-size:11px;">FGI와 인뎁스 인터뷰, UT조사를 거쳐 가설을 검증하고 실패 리스크를 줄이는 근거를 만듭니다.</p>
            </div>

            <div class="info-card" style="padding:8px 10px; cursor:pointer; background:#fff; border:2px solid #000; box-shadow:inset 1px 1px 0 #fff, inset -1px -1px 0 #808080;" onclick="openWindow('contact');">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                <h4 style="margin:0; font-size:12px; font-weight:bold;">UX 라이팅</h4>
                <button class="w95-btn" style="padding:1px 6px; font-size:10px; pointer-events:none;">상세보기 →</button>
              </div>
              <p style="margin:0; font-size:11px;">보이스앤톤 설정과 UX라이팅 가이드라인을 통해 일관된 브랜드 경험을 전달합니다.</p>
            </div>

            <div class="info-card" style="padding:8px 10px; cursor:pointer; background:#fff; border:2px solid #000; box-shadow:inset 1px 1px 0 #fff, inset -1px -1px 0 #808080;" onclick="openWindow('contact');">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                <h4 style="margin:0; font-size:12px; font-weight:bold;">UX 기획 / 디자인</h4>
                <button class="w95-btn" style="padding:1px 6px; font-size:10px; pointer-events:none;">상세보기 →</button>
              </div>
              <p style="margin:0; font-size:11px;">사용자 인터뷰를 기반으로 핵심 문제를 해결하며, UI스토리보드와 디자인시스템 산출물을 구축합니다.</p>
            </div>

            <div class="info-card" style="padding:8px 10px; cursor:pointer; background:#fff; border:2px solid #000; box-shadow:inset 1px 1px 0 #fff, inset -1px -1px 0 #808080;" onclick="openWindow('contact');">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                <h4 style="margin:0; font-size:12px; font-weight:bold;">웹 / 앱 개발</h4>
                <button class="w95-btn" style="padding:1px 6px; font-size:10px; pointer-events:none;">상세보기 →</button>
              </div>
              <p style="margin:0; font-size:11px;">React와 Vue 등을 활용, 최적의 사용자경험을 제공하는 하이브리드 앱과 iOS/안드로이드 네이티브 앱을 개발합니다.</p>
            </div>

            <div class="info-card" style="padding:8px 10px; cursor:pointer; background:#fff; border:2px solid #000; box-shadow:inset 1px 1px 0 #fff, inset -1px -1px 0 #808080;" onclick="openWindow('contact');">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                <h4 style="margin:0; font-size:12px; font-weight:bold;">UX 컨설팅</h4>
                <button class="w95-btn" style="padding:1px 6px; font-size:10px; pointer-events:none;">상세보기 →</button>
              </div>
              <p style="margin:0; font-size:11px;">비즈니스 목표에 맞춘 앱 리뉴얼 전략을 수립하고, 근본적인 사용자 경험 개선 로드맵을 도출합니다.</p>
            </div>

            <div class="info-card" style="padding:8px 10px; cursor:pointer; background:#fff; border:2px solid #000; box-shadow:inset 1px 1px 0 #fff, inset -1px -1px 0 #808080;" onclick="location.href='/ux-academy/';">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                <h4 style="margin:0; font-size:12px; font-weight:bold;">AI-UX 강의</h4>
                <a href="/ux-academy/" class="w95-btn" style="padding:1px 6px; font-size:10px; text-decoration:none; color:#000;" onclick="event.stopPropagation();">상세보기 →</a>
              </div>
              <p style="margin:0; font-size:11px;">최신 AI를 활용한 서비스기획부터 피그마, 바이브코딩까지 실무에 즉시 적용 가능한 맞춤형 UX교육을 진행합니다.</p>
            </div>
          </div>
        \`;`;

const clientsBody = `      } else if (key === 'clients') {
        return \`
          <p style="font-size:12px; color:#1a1a1a; margin-bottom:12px; font-weight:600;">국내 주요 대기업, 공공기관, 스타트업의 UX리서치, UX라이팅, 앱기획, IT개발 프로젝트를 수행했습니다.</p>

          <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:8px; font-size:12px; font-weight:bold; text-align:center;">
            <div class="info-card" style="padding:10px 4px; background:#fff; border:2px solid #000; box-shadow:inset 1px 1px 0 #fff, inset -1px -1px 0 #808080;">SK텔레콤</div>
            <div class="info-card" style="padding:10px 4px; background:#fff; border:2px solid #000; box-shadow:inset 1px 1px 0 #fff, inset -1px -1px 0 #808080;">현대자동차</div>
            <div class="info-card" style="padding:10px 4px; background:#fff; border:2px solid #000; box-shadow:inset 1px 1px 0 #fff, inset -1px -1px 0 #808080;">롯데그룹</div>
            <div class="info-card" style="padding:10px 4px; background:#fff; border:2px solid #000; box-shadow:inset 1px 1px 0 #fff, inset -1px -1px 0 #808080;">LG유플러스</div>
            <div class="info-card" style="padding:10px 4px; background:#fff; border:2px solid #000; box-shadow:inset 1px 1px 0 #fff, inset -1px -1px 0 #808080;">비씨카드</div>
            <div class="info-card" style="padding:10px 4px; background:#fff; border:2px solid #000; box-shadow:inset 1px 1px 0 #fff, inset -1px -1px 0 #808080;">CJ올리브네트웍스</div>
            <div class="info-card" style="padding:10px 4px; background:#fff; border:2px solid #000; box-shadow:inset 1px 1px 0 #fff, inset -1px -1px 0 #808080;">KB국민은행</div>
            <div class="info-card" style="padding:10px 4px; background:#fff; border:2px solid #000; box-shadow:inset 1px 1px 0 #fff, inset -1px -1px 0 #808080;">NH농협은행</div>
            <div class="info-card" style="padding:10px 4px; background:#fff; border:2px solid #000; box-shadow:inset 1px 1px 0 #fff, inset -1px -1px 0 #808080;">서민금융진흥원</div>
            <div class="info-card" style="padding:10px 4px; background:#fff; border:2px solid #000; box-shadow:inset 1px 1px 0 #fff, inset -1px -1px 0 #808080;">제일기획</div>
            <div class="info-card" style="padding:10px 2px; font-size:11px; word-break:keep-all; background:#fff; border:2px solid #000; box-shadow:inset 1px 1px 0 #fff, inset -1px -1px 0 #808080;">한국식품안전관리인증원</div>
            <div class="info-card" style="padding:10px 4px; background:#fff; border:2px solid #000; box-shadow:inset 1px 1px 0 #fff, inset -1px -1px 0 #808080;">경기도일자리재단</div>
          </div>
        \`;`;

const careersBody = `      } else if (key === 'careers') {
        return \`
          <h3 style="font-size:15px; font-weight:800; margin-bottom:4px; color:#000080;">🤝 인재를 채용합니다 (상시 모집)</h3>
          <p style="font-size:12px; font-weight:700; color:#1a1a1a; margin-bottom:10px;">슈퍼플래닝과 함께 할 슈퍼크루를 모집합니다.</p>
          <div class="info-card" style="margin-bottom:8px; padding:10px; background:#fff; border:2px solid #000; box-shadow:inset 1px 1px 0 #fff, inset -1px -1px 0 #808080;">
            <h4 style="font-size:12.5px; font-weight:800; margin-bottom:4px;">1. UX/UI 디자이너 (경력 3년 이상)</h4>
            <p style="font-size:11px; line-height:1.4; margin:0;">모바일 앱/웹 UX 기획, 디자인 시스템 구축, 피그마 Pro 사용 우대</p>
          </div>
          <div class="info-card" style="margin-bottom:8px; padding:10px; background:#fff; border:2px solid #000; box-shadow:inset 1px 1px 0 #fff, inset -1px -1px 0 #808080;">
            <h4 style="font-size:12.5px; font-weight:800; margin-bottom:4px;">2. 프론트엔드 개발자 (경력 2년 이상)</h4>
            <p style="font-size:11px; line-height:1.4; margin:0;">React, Vue.js, TypeScript 기반 모바일 웹/앱 인터페이스 구축 경험자</p>
          </div>
          <div class="info-card" style="margin-bottom:12px; padding:10px; background:#fff; border:2px solid #000; box-shadow:inset 1px 1px 0 #fff, inset -1px -1px 0 #808080;">
            <h4 style="font-size:12.5px; font-weight:800; margin-bottom:4px;">3. 지원 방법</h4>
            <p style="font-size:11px; line-height:1.4; margin:0;">이력서 및 포트폴리오(PDF/URL)를 <strong>jake@superplanning.co.kr</strong> 로 제출해주세요.</p>
          </div>
          <button class="w95-btn" style="padding:4px 12px; font-size:11px;" onclick="openWindow('contact');">채용 관련 문의하기</button>
        \`;`;

const tweaksBody = `      } else if (key === 'tweaks') {
        return \`
          <h3 style="font-size:14px; font-weight:700; margin-bottom:10px;">시스템 환경 설정 (Tweaks)</h3>
          <div style="margin-bottom:12px;">
            <label style="font-weight:700; display:block; margin-bottom:4px;">데스크톱 테마 선택:</label>
            <select class="w95-box-sunken" style="padding:4px; font-size:12px; width:100%;" onchange="if(typeof setTheme==='function') setTheme(this.value)">
              <option value="light">Teal Classic (기본 1995)</option>
              <option value="dark">Dark Slate (다크 모드)</option>
              <option value="matrix">Matrix Green (이스터에그 테마)</option>
            </select>
          </div>
          <div style="margin-bottom:12px;">
            <label style="font-weight:700; display:block; margin-bottom:4px;">사운드 효과:</label>
            <button class="w95-btn" id="tweakSoundBtn" onclick="if(typeof toggleSound==='function') toggleSound();">사운드: ON 🔊</button>
          </div>
          <hr style="margin:10px 0;">
          <button class="w95-btn" style="background:#cc0000; color:#fff;" onclick="if(typeof triggerBSOD==='function') triggerBSOD();">갑자기 PC가 이상해요 (블루스크린 호출)</button>
        \`;`;

htmlFiles.forEach(file => {
    // Exclude index.html
    if (file.endsWith('implementation\\index.html') || file.endsWith('implementation/index.html')) {
        return;
    }

    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('getSubpageWindowBody')) return;

    let modified = false;

    // 1. Replace about block
    const aboutRegex = /if \(key === 'about'\) \{[\s\S]*?(?=\} else if|\} else|\n    \})/g;
    if (aboutRegex.test(content)) {
        content = content.replace(aboutRegex, aboutBody);
        modified = true;
    }

    // 2. Replace services block
    const servicesRegex = /\} else if \(key === 'services'\) \{[\s\S]*?(?=\} else if|\} else|\n    \})/g;
    if (servicesRegex.test(content)) {
        content = content.replace(servicesRegex, servicesBody);
        modified = true;
    }

    // 3. Replace clients block
    const clientsRegex = /\} else if \(key === 'clients'\) \{[\s\S]*?(?=\} else if|\} else|\n    \})/g;
    if (clientsRegex.test(content)) {
        content = content.replace(clientsRegex, clientsBody);
        modified = true;
    }

    // 4. Replace careers block
    const careersRegex = /\} else if \(key === 'careers'\) \{[\s\S]*?(?=\} else if|\} else|\n    \})/g;
    if (careersRegex.test(content)) {
        content = content.replace(careersRegex, careersBody);
        modified = true;
    }

    // 5. Replace tweaks block
    const tweaksRegex = /\} else if \(key === 'tweaks'\) \{[\s\S]*?(?=\} else if|\} else|\n    \})/g;
    if (tweaksRegex.test(content)) {
        content = content.replace(tweaksRegex, tweaksBody);
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        updatedCount++;
    }
});

console.log(`Synced remaining popups (about, services, clients, careers, tweaks) across ${updatedCount} subpage HTML files.`);
