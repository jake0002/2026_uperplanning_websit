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
ssh -i "shkey.pem" -o StrictHostKeyChecking=no admin@13.125.12.112 "rm -rf /tmp/deploy_stage && mkdir -p /tmp/deploy_stage/images /tmp/deploy_stage/services /tmp/deploy_stage/company"
scp -i "shkey.pem" -o StrictHostKeyChecking=no implementation/index.html admin@13.125.12.112:/tmp/deploy_stage/index.html
scp -i "shkey.pem" -o StrictHostKeyChecking=no implementation/ux_research.html admin@13.125.12.112:/tmp/deploy_stage/ux_research.html
scp -i "shkey.pem" -o StrictHostKeyChecking=no implementation/ux-research.html admin@13.125.12.112:/tmp/deploy_stage/ux-research.html
scp -i "shkey.pem" -o StrictHostKeyChecking=no implementation/ux_research/index.html admin@13.125.12.112:/tmp/deploy_stage/ux_research_index.html
scp -i "shkey.pem" -o StrictHostKeyChecking=no implementation/company.html admin@13.125.12.112:/tmp/deploy_stage/company.html
scp -i "shkey.pem" -o StrictHostKeyChecking=no implementation/company/index.html admin@13.125.12.112:/tmp/deploy_stage/company/index.html
scp -i "shkey.pem" -o StrictHostKeyChecking=no implementation/llms.txt admin@13.125.12.112:/tmp/deploy_stage/llms.txt
scp -i "shkey.pem" -o StrictHostKeyChecking=no implementation/services/ux-research.md admin@13.125.12.112:/tmp/deploy_stage/services/ux-research.md
scp -i "shkey.pem" -r -o StrictHostKeyChecking=no implementation/images/* admin@13.125.12.112:/tmp/deploy_stage/images/

ssh -i "shkey.pem" -o StrictHostKeyChecking=no admin@13.125.12.112 "sudo cp -f /tmp/deploy_stage/index.html /var/www/html/index.html && sudo cp -f /tmp/deploy_stage/ux_research.html /var/www/html/ux_research.html && sudo cp -f /tmp/deploy_stage/ux-research.html /var/www/html/ux-research.html && sudo cp -f /tmp/deploy_stage/company.html /var/www/html/company.html && sudo mkdir -p /var/www/html/company && sudo cp -f /tmp/deploy_stage/company/index.html /var/www/html/company/index.html && sudo cp -f /tmp/deploy_stage/llms.txt /var/www/html/llms.txt && sudo mkdir -p /var/www/html/services && sudo cp -f /tmp/deploy_stage/services/ux-research.md /var/www/html/services/ux-research.md && sudo mkdir -p /var/www/html/ux_research/images && sudo cp -f /tmp/deploy_stage/ux_research_index.html /var/www/html/ux_research/index.html && sudo cp -rf /tmp/deploy_stage/images/* /var/www/html/images/ && sudo cp -rf /tmp/deploy_stage/images/* /var/www/html/ux_research/images/ && sudo chmod -R 755 /var/www/html && sudo chown -R admin:www-data /var/www/html"

Write-Host "3. Reloading Apache Web Server..." -ForegroundColor Cyan
ssh -i "shkey.pem" -o StrictHostKeyChecking=no admin@13.125.12.112 "sudo systemctl reload apache2"

Write-Host "Deployment completed successfully to https://superplanning.blog!" -ForegroundColor Green
