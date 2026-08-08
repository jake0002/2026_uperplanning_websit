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
ssh -i "shkey.pem" -o StrictHostKeyChecking=no admin@13.125.12.112 "rm -rf /tmp/index.html /tmp/ux_research.html /tmp/ux-research.html /tmp/ux_research_index.html /tmp/images"
scp -i "shkey.pem" -o StrictHostKeyChecking=no implementation/index.html admin@13.125.12.112:/tmp/index.html
scp -i "shkey.pem" -o StrictHostKeyChecking=no implementation/ux_research.html admin@13.125.12.112:/tmp/ux_research.html
scp -i "shkey.pem" -o StrictHostKeyChecking=no implementation/ux-research.html admin@13.125.12.112:/tmp/ux-research.html
scp -i "shkey.pem" -o StrictHostKeyChecking=no implementation/ux_research/index.html admin@13.125.12.112:/tmp/ux_research_index.html
scp -i "shkey.pem" -r -o StrictHostKeyChecking=no implementation/images admin@13.125.12.112:/tmp/images

ssh -i "shkey.pem" -o StrictHostKeyChecking=no admin@13.125.12.112 "sudo cp -f /tmp/index.html /var/www/html/index.html && sudo cp -f /tmp/ux_research.html /var/www/html/ux_research.html && sudo cp -f /tmp/ux-research.html /var/www/html/ux-research.html && sudo mkdir -p /var/www/html/ux_research && sudo cp -f /tmp/ux_research_index.html /var/www/html/ux_research/index.html && sudo cp -rf /tmp/images /var/www/html/ && sudo cp -rf /tmp/images /var/www/html/ux_research/ && sudo chmod -R 755 /var/www/html/ux_research /var/www/html/images && sudo chown -R admin:www-data /var/www/html/"

Write-Host "3. Reloading Apache Web Server..." -ForegroundColor Cyan
ssh -i "shkey.pem" -o StrictHostKeyChecking=no admin@13.125.12.112 "sudo systemctl reload apache2"

Write-Host "Deployment completed successfully to https://superplanning.blog!" -ForegroundColor Green
