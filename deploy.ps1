# Automated Deployment Script for Superplanning Website (AWS EC2 + GitHub)

Write-Host "1. Staging and committing git changes..." -ForegroundColor Cyan
git add implementation/index.html
git commit -m "수정: 자동 배포 스크립트 적용"
git push origin master

Write-Host "2. Deploying updated files to AWS EC2 (superplanning.blog)..." -ForegroundColor Cyan
scp -i "shkey.pem" -o StrictHostKeyChecking=no implementation/index.html admin@13.125.12.112:/var/www/html/index.html

Write-Host "3. Reloading Apache Web Server..." -ForegroundColor Cyan
ssh -i "shkey.pem" -o StrictHostKeyChecking=no admin@13.125.12.112 "sudo systemctl reload apache2"

Write-Host "Deployment completed successfully to https://superplanning.blog!" -ForegroundColor Green
