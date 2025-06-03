# 🚀 Quick Deployment Setup Script
# Run this before deploying to test everything works locally

Write-Host "🎯 SmartList Deployment Setup Starting..." -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan

# Check if Docker is running
Write-Host "🐳 Checking Docker..." -ForegroundColor Yellow
try {
    docker --version | Out-Null
    Write-Host "✅ Docker is available" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Docker not found. Please install Docker Desktop" -ForegroundColor Red
    Write-Host "📥 Download from: https://www.docker.com/products/docker-desktop/" -ForegroundColor Cyan
}

# Test Backend Build
Write-Host "`n🔧 Testing Backend Build..." -ForegroundColor Yellow
Set-Location "c:\Users\VJ\Desktop\SmartList\backend"
$backendBuild = & .\mvnw clean package -DskipTests -q
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Backend build successful!" -ForegroundColor Green
} else {
    Write-Host "❌ Backend build failed!" -ForegroundColor Red
}

# Test Frontend Build  
Write-Host "`n🔧 Testing Frontend Build..." -ForegroundColor Yellow
Set-Location "c:\Users\VJ\Desktop\SmartList\frontend"
npm run build --silent
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Frontend build successful!" -ForegroundColor Green
    Write-Host "📁 Build output ready in 'dist' folder" -ForegroundColor Cyan
} else {
    Write-Host "❌ Frontend build failed!" -ForegroundColor Red
}

# Back to root
Set-Location "c:\Users\VJ\Desktop\SmartList"

Write-Host "`n📋 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Push your code to GitHub:" -ForegroundColor White
Write-Host "   git add ." -ForegroundColor Gray
Write-Host "   git commit -m 'Add deployment configuration'" -ForegroundColor Gray
Write-Host "   git push origin main" -ForegroundColor Gray
Write-Host "`n2. Deploy Backend to Render.com:" -ForegroundColor White
Write-Host "   - Go to render.com and create Web Service" -ForegroundColor Gray
Write-Host "   - Connect your GitHub repo" -ForegroundColor Gray
Write-Host "   - Use Docker environment with 'backend' root directory" -ForegroundColor Gray
Write-Host "`n3. Deploy Frontend to Netlify:" -ForegroundColor White
Write-Host "   - Go to netlify.com and import project" -ForegroundColor Gray
Write-Host "   - Set base directory to 'frontend'" -ForegroundColor Gray
Write-Host "   - Build command: npm run build" -ForegroundColor Gray
Write-Host "   - Publish directory: frontend/dist" -ForegroundColor Gray
Write-Host "`n4. Set up Keep-Alive:" -ForegroundColor White
Write-Host "   - Sign up at uptimerobot.com" -ForegroundColor Gray
Write-Host "   - Monitor your backend health endpoint every 5 minutes" -ForegroundColor Gray

Write-Host "`n🎉 Setup completed! Follow DEPLOYMENT-CHECKLIST.md for detailed steps." -ForegroundColor Green
