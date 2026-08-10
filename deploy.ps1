# Automated Deployment Script for Superplanning Website (AWS EC2 + GitHub)
param(
    [string]$CommitMessage = ""
)

$OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "1. Staging and committing git changes locally..." -ForegroundColor Cyan
git add implementation/ .agents/AGENTS.md deploy.ps1 package.json

$hasChanges = (git status --porcelain)
if ($hasChanges) {
    if (-not $CommitMessage) {
        $CommitMessage = "수정: 웹사이트 최신 변경사항 반영 및 자동 배포"
    }
    git commit -m $CommitMessage
} else {
    Write-Host "No unstaged git changes found. Skipping git commit." -ForegroundColor Yellow
}

Write-Host "2. Deploying updated files to AWS EC2 Live Server (13.125.12.112)..." -ForegroundColor Cyan
if (Test-Path deploy.tar.gz) { Remove-Item deploy.tar.gz -Force }
tar -czf deploy.tar.gz -C implementation .

# SCP deploy archive to AWS EC2
scp -i "shkey.pem" -o StrictHostKeyChecking=no deploy.tar.gz admin@13.125.12.112:/tmp/

# Extract archive, sync all URL route aliases, fix permissions, and reload Apache
$remoteCmds = "sudo tar -xzf /tmp/deploy.tar.gz -C /var/www/html/ && " +
              "sudo mkdir -p /var/www/html/ux-design /var/www/html/ux_design /var/www/html/ux-research /var/www/html/ux_research /var/www/html/ux-writing /var/www/html/ux_writing /var/www/html/UX_Writing /var/www/html/ux-academy /var/www/html/ux_academy /var/www/html/ux_plan /var/www/html/contact /var/www/html/web-app-development /var/www/html/app_dev && " +
              "sudo cp -f /var/www/html/ux-academy/index.html /var/www/html/ux-academy.html 2>/dev/null || true && " +
              "sudo cp -f /var/www/html/ux-academy/index.html /var/www/html/ux_academy/index.html 2>/dev/null || true && " +
              "sudo cp -f /var/www/html/ux-academy/index.html /var/www/html/ux_academy.html 2>/dev/null || true && " +
              "sudo cp -f /var/www/html/ux-research/index.html /var/www/html/ux-research.html 2>/dev/null || true && " +
              "sudo cp -f /var/www/html/ux-research/index.html /var/www/html/ux_research.html 2>/dev/null || true && " +
              "sudo cp -f /var/www/html/ux-research/index.html /var/www/html/ux_research/index.html 2>/dev/null || true && " +
              "sudo cp -f /var/www/html/ux-writing/index.html /var/www/html/ux-writing.html 2>/dev/null || true && " +
              "sudo cp -f /var/www/html/ux-writing/index.html /var/www/html/ux_writing.html 2>/dev/null || true && " +
              "sudo cp -f /var/www/html/ux-writing/index.html /var/www/html/ux_writing/index.html 2>/dev/null || true && " +
              "sudo cp -f /var/www/html/ux-writing/index.html /var/www/html/UX_Writing/index.html 2>/dev/null || true && " +
              "sudo cp -f /var/www/html/ux-design/index.html /var/www/html/ux-design.html 2>/dev/null || true && " +
              "sudo cp -f /var/www/html/ux-design/index.html /var/www/html/ux_design.html 2>/dev/null || true && " +
              "sudo cp -f /var/www/html/ux-design/index.html /var/www/html/ux_design/index.html 2>/dev/null || true && " +
              "sudo cp -f /var/www/html/web-app-development/index.html /var/www/html/web-app-development.html 2>/dev/null || true && " +
              "sudo cp -f /var/www/html/web-app-development/index.html /var/www/html/app_dev/index.html 2>/dev/null || true && " +
              "sudo cp -f /var/www/html/web-app-development/index.html /var/www/html/app_dev.html 2>/dev/null || true && " +
              "sudo cp -f /var/www/html/contact/index.html /var/www/html/contact.html 2>/dev/null || true && " +
              "sudo mkdir -p /var/www/html/ux-research/images /var/www/html/ux_research/images /var/www/html/ux-design/images /var/www/html/ux_design/images /var/www/html/ux-writing/images /var/www/html/ux_writing/images /var/www/html/ux_plan/images && " +
              "sudo cp -rf /var/www/html/images/* /var/www/html/ux-research/images/ 2>/dev/null || true && " +
              "sudo cp -rf /var/www/html/images/* /var/www/html/ux_research/images/ 2>/dev/null || true && " +
              "sudo cp -rf /var/www/html/images/* /var/www/html/ux-design/images/ 2>/dev/null || true && " +
              "sudo cp -rf /var/www/html/images/* /var/www/html/ux_design/images/ 2>/dev/null || true && " +
              "sudo cp -rf /var/www/html/images/* /var/www/html/ux-writing/images/ 2>/dev/null || true && " +
              "sudo cp -rf /var/www/html/images/* /var/www/html/ux_plan/images/ 2>/dev/null || true && " +
              "sudo chmod -R 755 /var/www/html && " +
              "sudo chown -R admin:www-data /var/www/html && " +
              "sudo systemctl reload apache2"

ssh -i "shkey.pem" -o StrictHostKeyChecking=no admin@13.125.12.112 $remoteCmds

if (Test-Path deploy.tar.gz) { Remove-Item deploy.tar.gz -Force }

Write-Host "3. Pushing changes to GitHub (origin master)..." -ForegroundColor Cyan
git push origin master --quiet 2>&1 | Out-Null

Write-Host "Deployment completed successfully to https://superplanning.blog!" -ForegroundColor Green
