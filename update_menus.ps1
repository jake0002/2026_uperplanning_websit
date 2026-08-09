$base = 'd:\Dropbox\03_super planning\00_슈퍼플래닝\2026_uperplanning_website\implementation'
$files = @(
  'ux_research\index.html',
  'ux_plan\index.html',
  'ux_design_cleanroom.html',
  'ux_design_cleanroom\index.html',
  'ux_design_cleanroom_v2\index.html',
  'ux-design.html',
  'company.html',
  'company\index.html'
)

$addedItems = @"
      <div class="start-item" onclick="openWindow('brochure'); closeStart();">📁 포트폴리오 보기</div>
      <div class="start-item" onclick="openWindow('careers'); closeStart();">🤝 인재채용</div>
      <div class="start-item" onclick="openWindow('tweaks'); closeStart();">⚙️ 환경설정</div>
"@

$addedItemsMobile = @"
      <div class="start-item" onclick="openWindow('brochure'); toggleMobileMenu();">📁 포트폴리오 보기</div>
      <div class="start-item" onclick="openWindow('careers'); toggleMobileMenu();">🤝 인재채용</div>
      <div class="start-item" onclick="openWindow('tweaks'); toggleMobileMenu();">⚙️ 환경설정</div>
"@

$careersAndTweaksDefs = @"
      'careers': { w: 580, h: 400, title: '🤝 인재 채용' },
      'tweaks': { w: 480, h: 265, title: '⚙️ 환경 설정' }
    };
"@

$careersAndTweaksBody = @"
      } else if (key === 'careers') {
        return `
          <h3 style="font-size:15px; font-weight:800; margin-bottom:4px; color:#000080;">🤝 인재를 채용합니다 (상시 모집)</h3>
          <p style="font-size:12px; font-weight:700; color:#1a1a1a; margin-bottom:10px;">슈퍼플래닝과 함께 할 슈퍼크루를 모집합니다.</p>
          <div style="padding:10px 12px; margin-bottom:10px; font-size:11.5px; line-height:1.6; color:#1a1a1a; display:flex; flex-direction:column; gap:4px; background:#fff; border:2px solid #000; box-shadow:inset 1px 1px 0 #fff, inset -1px -1px 0 #808080;">
            <div>· 신입, 경력 / 연령 / 학력 / 국적 무관</div>
            <div>· 이력서 자유양식</div>
            <div style="margin-top:4px;">· <strong>우대조건 :</strong> 자신의 실무에 대해 원데이클래스 강의 가능하신 분!</div>
          </div>
          <div style="background:#dfdfdf; border:2px solid #000; padding:8px 12px; font-size:11.5px; display:flex; justify-content:space-between; align-items:center;">
            <span>📧 <strong>이메일 접수:</strong> <span style="font-weight:bold; color:#000080;">jake@superplanning.co.kr</span></span>
            <button class="w95-btn" style="padding:3px 10px; font-size:11px;" onclick="navigator.clipboard.writeText('jake@superplanning.co.kr'); alert('이메일 복사됨!');">복사</button>
          </div>
        `;
      } else if (key === 'tweaks') {
        return `
          <h3 style="font-size:14px; font-weight:700; margin-bottom:10px;">⚙️ 시스템 환경 설정</h3>
          <div style="margin-bottom:12px;">
            <label style="font-weight:700; display:block; margin-bottom:4px;">데스크톱 테마 선택:</label>
            <select style="padding:4px; font-size:12px; width:100%; border:2px solid #000; background:#fff;" onchange="if(window.setTheme) setTheme(this.value);">
              <option value="light">Teal Classic (기본 1995)</option>
              <option value="dark">Dark Slate (다크 모드)</option>
              <option value="matrix">Matrix Green (이스터에그)</option>
            </select>
          </div>
          <div><label style="font-weight:700; display:block; margin-bottom:4px;">사운드 효과:</label>
            <button class="w95-btn" onclick="alert('사운드 설정 완료!');">사운드: ON 🔊</button>
          </div>
        `;
      }
"@

foreach ($f in $files) {
  $path = Join-Path $base $f
  if (-not (Test-Path $path)) { Write-Host "SKIP: $f"; continue }
  
  $c = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
  $modified = $false

  # 1. startMenu - add items after youtube (uses LF or CRLF)
  $ytStart = "openWindow('intro-video'); closeStart();"">▶️ 유튜브</div>"
  $contactStart = "`n      <div class=""start-item"" onclick=""openWindow('contact'); closeStart();"">📍 찾아오시는길</div>"
  $contactStartCRLF = "`r`n      <div class=""start-item"" onclick=""openWindow('contact'); closeStart();"">📍 찾아오시는길</div>"
  
  if ($c -like "*$ytStart*") {
    $addedLF = "`n      <div class=""start-item"" onclick=""openWindow('brochure'); closeStart();"">📁 포트폴리오 보기</div>`n      <div class=""start-item"" onclick=""openWindow('careers'); closeStart();"">🤝 인재채용</div>`n      <div class=""start-item"" onclick=""openWindow('tweaks'); closeStart();"">⚙️ 환경설정</div>"
    $addedCRLF = "`r`n      <div class=""start-item"" onclick=""openWindow('brochure'); closeStart();"">📁 포트폴리오 보기</div>`r`n      <div class=""start-item"" onclick=""openWindow('careers'); closeStart();"">🤝 인재채용</div>`r`n      <div class=""start-item"" onclick=""openWindow('tweaks'); closeStart();"">⚙️ 환경설정</div>"
    
    if ($c -like "*$ytStart$contactStartCRLF*") {
      $c = $c.Replace("$ytStart$contactStartCRLF", "$ytStart$addedCRLF$contactStartCRLF")
      $modified = $true
      Write-Host "  startMenu (CRLF) done"
    } elseif ($c -like "*$ytStart$contactStart*") {
      $c = $c.Replace("$ytStart$contactStart", "$ytStart$addedLF$contactStart")
      $modified = $true
      Write-Host "  startMenu (LF) done"
    }
  }

  # 2. mobileNavDrawer - add items after youtube
  $ytMobile = "openWindow('intro-video'); toggleMobileMenu();"">▶️ 유튜브</div>"
  $contactMobile = "`n      <div class=""start-item"" onclick=""openWindow('contact'); toggleMobileMenu();"">📍 찾아오시는길</div>"
  $contactMobileCRLF = "`r`n      <div class=""start-item"" onclick=""openWindow('contact'); toggleMobileMenu();"">📍 찾아오시는길</div>"
  
  if ($c -like "*$ytMobile*") {
    $addedMobileLF = "`n      <div class=""start-item"" onclick=""openWindow('brochure'); toggleMobileMenu();"">📁 포트폴리오 보기</div>`n      <div class=""start-item"" onclick=""openWindow('careers'); toggleMobileMenu();"">🤝 인재채용</div>`n      <div class=""start-item"" onclick=""openWindow('tweaks'); toggleMobileMenu();"">⚙️ 환경설정</div>"
    $addedMobileCRLF = "`r`n      <div class=""start-item"" onclick=""openWindow('brochure'); toggleMobileMenu();"">📁 포트폴리오 보기</div>`r`n      <div class=""start-item"" onclick=""openWindow('careers'); toggleMobileMenu();"">🤝 인재채용</div>`r`n      <div class=""start-item"" onclick=""openWindow('tweaks'); toggleMobileMenu();"">⚙️ 환경설정</div>"
    
    if ($c -like "*$ytMobile$contactMobileCRLF*") {
      $c = $c.Replace("$ytMobile$contactMobileCRLF", "$ytMobile$addedMobileCRLF$contactMobileCRLF")
      Write-Host "  mobileNavDrawer (CRLF) done"
    } elseif ($c -like "*$ytMobile$contactMobile*") {
      $c = $c.Replace("$ytMobile$contactMobile", "$ytMobile$addedMobileLF$contactMobile")
      Write-Host "  mobileNavDrawer (LF) done"
    }
  }

  # 3. WINDOW_DEFS - add careers/tweaks after brochure
  $brochureEntry = "'brochure': { w: 780, h: 560, title: '📄 회사소개서 뷰어' }"
  $newEntries = "'brochure': { w: 780, h: 560, title: '📄 회사소개서 뷰어' },`r`n      'careers': { w: 580, h: 400, title: '🤝 인재 채용' },`r`n      'tweaks': { w: 480, h: 265, title: '⚙️ 환경 설정' }"
  $newEntriesLF = "'brochure': { w: 780, h: 560, title: '📄 회사소개서 뷰어' },`n      'careers': { w: 580, h: 400, title: '🤝 인재 채용' },`n      'tweaks': { w: 480, h: 265, title: '⚙️ 환경 설정' }"
  
  if ($c -like "*$brochureEntry*" -and -not ($c -like "*'careers'*")) {
    if ($c -match [regex]::Escape($brochureEntry + "`r`n")) {
      $c = $c.Replace($brochureEntry + "`r`n    };", $newEntries + "`r`n    };")
    } else {
      $c = $c.Replace($brochureEntry + "`n    };", $newEntriesLF + "`n    };")
    }
    Write-Host "  WINDOW_DEFS done"
  }

  # 4. Add careers/tweaks to getSubpageWindowBody
  $introVideoEnd = "'intro-video') {`n        return ``
          <div style=""display:flex; flex-direction:column; gap:6px;"">"
  
  # Simple: insert careers/tweaks before closing "return '...'"
  $closingReturn = "`n      }`n      return '<div>"
  $closingReturnCRLF = "`r`n      }`r`n      return '<div>"
  
  if ($c -like "*key === 'intro-video'*" -and -not ($c -like "*key === 'careers'*")) {
    $careersTweaksBlock = @"

      } else if (key === 'careers') {
        return ``
          <h3 style="font-size:15px; font-weight:800; margin-bottom:4px; color:#000080;">🤝 인재를 채용합니다 (상시 모집)</h3>
          <p style="font-size:12px; font-weight:700; color:#1a1a1a; margin-bottom:10px;">슈퍼플래닝과 함께 할 슈퍼크루를 모집합니다.</p>
          <div style="padding:10px 12px; margin-bottom:10px; font-size:11.5px; line-height:1.6; background:#fff; border:2px solid #000; box-shadow:inset 1px 1px 0 #fff, inset -1px -1px 0 #808080;">
            <div>· 신입, 경력 / 연령 / 학력 / 국적 무관. 이력서 자유양식.</div>
            <div style="margin-top:4px;">· <strong>모집:</strong> 서비스기획, 프로덕트디자인, AI-UX강사, UI디자이너, 프론트/백엔드 개발자</div>
          </div>
          <div style="background:#dfdfdf; border:2px solid #000; padding:8px 12px; font-size:11.5px; display:flex; justify-content:space-between; align-items:center;">
            <span>📧 jake@superplanning.co.kr</span>
            <button class="w95-btn" style="padding:3px 10px; font-size:11px;" onclick="navigator.clipboard.writeText('jake@superplanning.co.kr'); alert('복사됨!');">복사</button>
          </div>
        ``;
      } else if (key === 'tweaks') {
        return ``
          <h3 style="font-size:14px; font-weight:700; margin-bottom:10px;">⚙️ 시스템 환경 설정</h3>
          <div style="margin-bottom:12px;">
            <label style="font-weight:700; display:block; margin-bottom:4px;">데스크톱 테마:</label>
            <select style="padding:4px; font-size:12px; width:100%; border:2px solid #000;" onchange="if(window.setTheme) setTheme(this.value);">
              <option value="light">Teal Classic (기본 1995)</option>
              <option value="dark">Dark Slate (다크 모드)</option>
              <option value="matrix">Matrix Green (이스터에그)</option>
            </select>
          </div>
          <button class="w95-btn" onclick="alert('사운드 설정 완료!');">사운드: ON 🔊</button>
        ``;
"@
    
    # Find the closing pattern and insert before it
    if ($c -match [regex]::Escape("      }`r`n      return '<div>내용을 불러올 수 없습니다.</div>")) {
      $c = $c.Replace("      }`r`n      return '<div>내용을 불러올 수 없습니다.</div>", $careersTweaksBlock.Replace("`n", "`r`n") + "      }`r`n      return '<div>내용을 불러올 수 없습니다.</div>")
    } elseif ($c -match [regex]::Escape("      }`n      return '<div>내용을 불러올 수 없습니다.</div>")) {
      $c = $c.Replace("      }`n      return '<div>내용을 불러올 수 없습니다.</div>", $careersTweaksBlock + "      }`n      return '<div>내용을 불러올 수 없습니다.</div>")
    }
    Write-Host "  careers/tweaks body done"
  }

  [System.IO.File]::WriteAllText($path, $c, [System.Text.Encoding]::UTF8)
  Write-Host "Saved: $f"
}
Write-Host "All done."
