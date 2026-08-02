# Superplanning OS95 — Windows 95 데스크톱 포트폴리오 SPA

슈퍼플래닝 UX 에이전시의 포트폴리오 사이트를 Windows 95 데스크톱 인터페이스 디자인 시스템으로 1:1 패키징한 단일 HTML SPA(Single Page Application) 결과물입니다.

---

## 📌 산출물 구성
- **[index.html](file:///d:/Dropbox/03_super%20planning/00_%EC%8A%88%ED%8D%BC%ED%94%8C%EB%9E%98%EB%8B%9D/2026_uperplanning_website/implementation/index.html)**: 단일 파일 SPA (`<style>` 및 `<script>` 인라인, Base64 로고 및 Web Audio 사운드 인라인 포함, 파일 크기 약 64KB)
- 외부 의존성: Pretendard 웹폰트 1건만 사용 (`https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css`)

---

## 🔍 Playwright 자가 검증 (Self-Test) 결과 (6/6 PASS)

| 번호 | 테스트 항목 | 상태 | 비고 |
|---|---|---|---|
| 1 | Desktop 1366×800: Boot 시퀀스 → Welcome 모달 → '시작하기' 클릭 후 회사소개 자동 오픈 & 로고 z-index 1500 최상단 표시 | ✅ PASS | 정상 동작 확인 |
| 2 | Desktop 인터랙션: 다중 윈도우 오픈 및 드래그, 포커스 시 z-index 최상위 상승 및 태스크바 프리뷰 연동 | ✅ PASS | z-index 포커스 매니저 정상 |
| 3 | 테마 전환: Tweaks 환경설정에서 'Matrix Green' 선택 시 `body[data-theme="matrix"]` 실시간 반영 | ✅ PASS | 매트릭스 테마 적용 |
| 4 | BSOD 이스터에그: `Ctrl+Alt+U` 입력 시 치명적 오류 블루스크린 디스플레이 및 `ESC` 키 해제 | ✅ PASS | 사운드 + 오버레이 정상 |
| 5 | 모바일 390×844: Contact 스카이스크래퍼의 Bottom Sheet 변환 및 GNB 라벨 모바일 반응형 최적화 | ✅ PASS | 390px 뷰포트 레이아웃 정상 |
| 6 | `bout` 라벨 0건 검출: UI 노드 전체에서 오탈자/잘림 `bout` 라벨 0건 검출 | ✅ PASS | 0건 검출 확인 |

---

## 🖼 검증 캡처 이미지
- **데스크톱 (1366×800)**: ![Desktop 1366x800](file:///C:/Users/jake/.gemini/antigravity-ide/brain/eab30a05-d840-42b1-93a8-9756bff14b40/desktop_1366x800.png)
- **모바일 (390×844)**: ![Mobile 390x844](file:///C:/Users/jake/.gemini/antigravity-ide/brain/eab30a05-d840-42b1-93a8-9756bff14b40/mobile_390x844.png)

---

## 🎯 주요 기능 및 사양
- **GNB 메뉴 구조**: 홈, UX디자인 (UX리서치, UX라이팅, UX기획, 웹/앱개발), AI-UX강의, UX블로그, 프로젝트 문의
- **11개 W95 윈도우**: Welcome, Services, Portfolio, Classes, Blog, Contact, About, Now Playing, Links, Tweaks, Shutdown
- **i18n**: 한국어(`ko`, 기본) 및 영문(`en`) 실시간 전환
- **Web Audio Engine**: 880Hz, 660Hz, 220Hz square/sawtooth 오실레이터 블립 사운드 인라인 구현
- **Win95 Bevel & Z-Index Stack**: Raised/Sunken 입체 베벨 및 동적 z-index 스택 관리
