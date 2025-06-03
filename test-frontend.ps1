# Frontend build test script
Write-Host "🚀 Testing frontend build for Netlify deployment..." -ForegroundColor Green

# Navigate to frontend directory
Set-Location "c:\Users\VJ\Desktop\SmartList\frontend"

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dependencies installed successfully!" -ForegroundColor Green
    
    # Build for production
    Write-Host "🏗️ Building for production..." -ForegroundColor Yellow
    npm run build
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Production build successful!" -ForegroundColor Green
        Write-Host "📁 Build output is in 'dist' folder" -ForegroundColor Cyan
        
        # Check if dist folder exists and show its contents
        if (Test-Path "dist") {
            Write-Host "📋 Build contents:" -ForegroundColor Cyan
            Get-ChildItem "dist" | ForEach-Object { Write-Host "  - $($_.Name)" -ForegroundColor White }
        }
        
        # Test local preview
        Write-Host "🧪 Starting local preview server..." -ForegroundColor Yellow
        Write-Host "💡 You can test the build by running 'npm run preview' manually" -ForegroundColor Cyan
        
    } else {
        Write-Host "❌ Production build failed!" -ForegroundColor Red
    }
} else {
    Write-Host "❌ Failed to install dependencies!" -ForegroundColor Red
}

# Navigate back
Set-Location "c:\Users\VJ\Desktop\SmartList"
Write-Host "🎯 Frontend test completed!" -ForegroundColor Green
