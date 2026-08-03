# Project Rules for 2026 Super Planning Website

## Mandatory Deployment Rules (AWS EC2 Live Server)
1. **Live Server Deployment (CRITICAL)**: `superplanning.blog` is hosted on an **AWS EC2 Apache Server (`13.125.12.112`)`. `git push` to GitHub alone DOES NOT update the live site.
2. **Automatic Dual-Deployment**: Whenever any code changes are made to `implementation/index.html` or other website assets, you MUST ALWAYS upload updated files to `/var/www/html/index.html` on AWS (`admin@13.125.12.112`) using `shkey.pem` AND reload Apache (`sudo systemctl reload apache2`) in addition to Git commit & push. Alternatively, execute `npm run deploy` or `./deploy.ps1`.

## Git Version Control Rules
1. **Korean Commit Messages**: All Git commit messages must be written clearly in Korean (e.g. `기능 추가: 로그인 페이지 컴포넌트구현`, `수정: 헤더 반응형 레이아웃 개선`).
2. **Version Control Before Changes**: Always commit changes and maintain Git version history before completing work or pushing updates.
3. **Strict Security Exclusions (.gitignore)**: Ensure sensitive files (`*.pem`, `shkey.pem`, `.env*`, `AWS.txt`, API keys/credentials) are never committed to version control.
4. **No Vertical Scrollbars on Popups**: Always adjust popup window dimensions in `WINDOW_DEFS` so that popup window content fits comfortably without triggering vertical scrollbars.
