# Automated Deployment Script for Superplanning Website (AWS EC2 + GitHub)
param(
    [string]$CommitMessage = ""
)

$OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "1. Staging and committing git changes..." -ForegroundColor Cyan
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

git push origin master

Write-Host "2. Deploying updated files to AWS EC2 (superplanning.blog)..." -ForegroundColor Cyan
ssh -i "shkey.pem" -o StrictHostKeyChecking=no admin@13.125.12.112 "rm -rf /tmp/deploy_stage && mkdir -p /tmp/deploy_stage"
scp -r -i "shkey.pem" -o StrictHostKeyChecking=no implementation/* admin@13.125.12.112:/tmp/deploy_stage/

ssh -i "shkey.pem" -o StrictHostKeyChecking=no admin@13.125.12.112 "sudo cp -a /tmp/deploy_stage/. /var/www/html/ && sudo cp -f /tmp/deploy_stage/ux_design_cleanroom.html /var/www/html/ux-design-cleanroom.html && sudo mkdir -p /var/www/html/ux_research/images && sudo cp -rf /tmp/deploy_stage/images/* /var/www/html/ux_research/images/ && sudo chmod -R 755 /var/www/html && sudo chown -R admin:www-data /var/www/html"

Write-Host "3. Reloading Apache Web Server..." -ForegroundColor Cyan
ssh -i "shkey.pem" -o StrictHostKeyChecking=no admin@13.125.12.112 "sudo systemctl reload apache2"

Write-Host "Deployment completed successfully to https://superplanning.blog!" -ForegroundColor Green
