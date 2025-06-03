# SmartList Deployment Setup Script
# Run this before deploying to test everything works locally

Write-Host "SmartList Deployment Setup Starting..." -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan

# Check if Docker is running
Write-Host "Checking Docker..." -ForegroundColor Yellow
try {
    docker --version | Out-Null
    Write-Host "Docker is available" -ForegroundColor Green
} catch {
    Write-Host "Docker not found. Please install Docker Desktop" -ForegroundColor Red
    Write-Host "Download from: https://www.docker.com/products/docker-desktop/" -ForegroundColor Cyan
}

# Test Backend Build
Write-Host "Testing Backend Build..." -ForegroundColor Yellow
Set-Location "c:\Users\VJ\Desktop\SmartList\backend"
$null = & .\mvnw clean package -DskipTests -q 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "Backend build successful!" -ForegroundColor Green
} else {
    Write-Host "Backend build failed!" -ForegroundColor Red
}

# Test Frontend Build  
Write-Host "Testing Frontend Build..." -ForegroundColor Yellow
Set-Location "c:\Users\VJ\Desktop\SmartList\frontend"
$null = npm run build --silent 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "Frontend build successful!" -ForegroundColor Green
    Write-Host "Build output ready in 'dist' folder" -ForegroundColor Cyan
} else {
    Write-Host "Frontend build failed!" -ForegroundColor Red
}

# Back to root
Set-Location "c:\Users\VJ\Desktop\SmartList"

Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Push your code to GitHub" -ForegroundColor White
Write-Host "2. Deploy Backend to Render.com" -ForegroundColor White  
Write-Host "3. Deploy Frontend to Netlify" -ForegroundColor White
Write-Host "4. Set up Keep-Alive monitoring" -ForegroundColor White
Write-Host "Setup completed! Check DEPLOYMENT-CHECKLIST.md for details." -ForegroundColor Green
